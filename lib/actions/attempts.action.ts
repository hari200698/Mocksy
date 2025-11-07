"use server";

import { db } from "@/firebase/admin";
import { RUBRIC, RubricKey } from "@/lib/rubric";
import { buildEvaluatePrompt } from "@/lib/prompts/coach";
import { requireUserIdFromCookie } from "@/lib/auth.server";
import { logEvent } from "@/lib/telemetry.server";
import { getInterviewById } from "./general.action";

interface SubmitAttemptAndEvaluateParams {
  interviewId: string;
  questionId: string;
  answerText: string;
}

interface DimensionScore {
  score: number;
  feedback: string;
}

interface EvaluationResponse {
  summary: string;
  dimensions: Record<RubricKey, DimensionScore>;
  total: number;
}

interface AttemptData {
  userId: string;
  questionId: string;
  attemptNo: number;
  answerText: string;
  feedback: EvaluationResponse;
  modelInfo: {
    model: string;
    provider: string;
  };
  createdAt: string;
}

interface SubmitAttemptResult {
  newAttempt: AttemptData;
  previousAttempt: AttemptData | null;
  deltas: Record<RubricKey, number> | null;
}

/**
 * Calculate weighted total score based on RUBRIC weights
 */
function weightedTotal(dimensions: Record<RubricKey, DimensionScore>): number {
  return Object.entries(RUBRIC).reduce((total, [key, { weight }]) => {
    const dimensionKey = key as RubricKey;
    return total + dimensions[dimensionKey].score * weight;
  }, 0);
}

/**
 * Safe default evaluation response
 */
function createSafeDefault(): EvaluationResponse {
  const defaultDimensions: Record<RubricKey, DimensionScore> = {} as Record<
    RubricKey,
    DimensionScore
  >;
  for (const key of Object.keys(RUBRIC) as RubricKey[]) {
    defaultDimensions[key] = {
      score: 0,
      feedback: "Unable to parse evaluation feedback.",
    };
  }
  return {
    summary:
      "The model response could not be parsed. Please try submitting again.",
    dimensions: defaultDimensions,
    total: 0,
  };
}

/**
 * Parse JSON from model response with robust error handling
 */
function parseModelResponse(text: string): EvaluationResponse | null {
  try {
    // Try direct JSON parse
    const parsed = JSON.parse(text);
    return parsed;
  } catch (firstError) {
    try {
      // Try to extract JSON block with regex
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed;
      }
    } catch (secondError) {
      // Both parsing attempts failed
      return null;
    }
  }
  return null;
}

/**
 * Coerce raw model response to EvaluationResponse format
 */
function coerceToEvaluationResponse(
  raw: any
): EvaluationResponse | null {
  if (!raw || typeof raw !== "object") return null;

  const dimensions: Record<RubricKey, DimensionScore> = {} as Record<
    RubricKey,
    DimensionScore
  >;

  // Extract dimensions with robust parsing
  for (const key of Object.keys(RUBRIC) as RubricKey[]) {
    let score = 0;
    let feedback = "";

    if (raw.dimensions && raw.dimensions[key]) {
      const dim = raw.dimensions[key];
      if (typeof dim === "object") {
        score = typeof dim.score === "number" ? dim.score : 0;
        feedback =
          typeof dim.feedback === "string"
            ? dim.feedback
            : `Evaluation for ${key} dimension.`;
      } else if (typeof dim === "number") {
        score = dim;
        feedback = `Evaluation for ${key} dimension.`;
      }
    } else if (
      raw.dimensions &&
      typeof raw.dimensions[key] === "number"
    ) {
      score = raw.dimensions[key];
      feedback = `Evaluation for ${key} dimension.`;
    }

    // Ensure score is in valid range
    score = Math.max(0, Math.min(100, isNaN(score) ? 0 : Math.round(score)));

    dimensions[key] = {
      score,
      feedback: feedback || `Evaluation for ${key} dimension.`,
    };
  }

  const summary =
    typeof raw.summary === "string"
      ? raw.summary
      : "Evaluation completed.";

  return {
    summary,
    dimensions,
    total: 0, // Will be computed via weightedTotal
  };
}

/**
 * Call Gemini API to evaluate an answer
 */
async function callGemini(prompt: string): Promise<EvaluationResponse> {
  const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  
  if (!API_KEY) {
    console.error(
      "GOOGLE_GENERATIVE_AI_API_KEY is missing from environment variables"
    );
    return createSafeDefault();
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2 },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      return createSafeDefault();
    }

    const data = await response.json();
    
    // Extract text from response
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      data.candidates?.[0]?.content?.parts?.[0] ||
      "";

    if (!text) {
      console.error("No text content in Gemini response:", data);
      return createSafeDefault();
    }

    // Parse the response
    const parsed = parseModelResponse(text);
    if (!parsed) {
      console.error("Failed to parse Gemini response:", text);
      return createSafeDefault();
    }

    // Coerce to EvaluationResponse format
    const evaluationResponse = coerceToEvaluationResponse(parsed);
    if (!evaluationResponse) {
      console.error("Failed to coerce parsed response:", parsed);
      return createSafeDefault();
    }

    // Compute total server-side (ignore model's total if present)
    evaluationResponse.total = weightedTotal(evaluationResponse.dimensions);

    return evaluationResponse;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return createSafeDefault();
  }
}

/**
 * Submit an attempt and evaluate it using the rubric
 */
export async function submitAttemptAndEvaluate(
  params: SubmitAttemptAndEvaluateParams
): Promise<SubmitAttemptResult | { success: false; error: string }> {
  const { interviewId, questionId, answerText } = params;

  try {
    // Get verified userId from session cookie
    const userId = await requireUserIdFromCookie();

    // Get the interview to retrieve the question
    const interview = await getInterviewById(interviewId);
    if (!interview) {
      return { success: false, error: "Interview not found" };
    }

    // Validate questionId and get the question text
    const questionIndex = parseInt(questionId, 10);
    if (
      isNaN(questionIndex) ||
      questionIndex < 0 ||
      questionIndex >= interview.questions.length
    ) {
      return { success: false, error: "Invalid questionId" };
    }
    const question = interview.questions[questionIndex];

    // Get the latest attempt for this question
    const attemptsSnapshot = await db
      .collection("interviews")
      .doc(interviewId)
      .collection("attempts")
      .where("userId", "==", userId)
      .where("questionId", "==", questionId)
      .get();

    // Sort in JavaScript to avoid index requirement
    let previousAttempt: AttemptData | null = null;
    if (!attemptsSnapshot.empty) {
      const attempts = attemptsSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as AttemptData))
        .sort((a, b) => b.attemptNo - a.attemptNo); // Descending order
      previousAttempt = attempts[0];
    }
    
    const nextAttemptNo = previousAttempt ? previousAttempt.attemptNo + 1 : 1;
    const previousAnswer = previousAttempt?.answerText;

    // Log attempt submission
    logEvent("attempt.submit", {
      userId,
      interviewId,
      questionId,
      attemptNo: nextAttemptNo,
    });

    // Build evaluation prompt
    const prompt = buildEvaluatePrompt(question, answerText, previousAnswer);

    // Call Gemini (stubbed for now)
    const evaluationResponse = await callGemini(prompt);
    
    // Compute weighted total
    const computedTotal = weightedTotal(evaluationResponse.dimensions);
    evaluationResponse.total = computedTotal;

    // Log attempt scoring
    logEvent("attempt.scored", {
      total: computedTotal,
      dimensions: evaluationResponse.dimensions,
    });

    // Prepare attempt data (userId from verified session cookie)
    const attemptData: AttemptData = {
      userId, // Set from verified session cookie, not from client input
      questionId,
      attemptNo: nextAttemptNo,
      answerText,
      feedback: evaluationResponse,
      modelInfo: {
        model: "gemini-2.0-flash-001",
        provider: "google",
      },
      createdAt: new Date().toISOString(),
    };

    // Write to Firestore: interviews/{interviewId}/attempts
    const attemptsCollectionRef = db
      .collection("interviews")
      .doc(interviewId)
      .collection("attempts");
    
    const newAttemptRef = await attemptsCollectionRef.add(attemptData);
    const newAttempt = { id: newAttemptRef.id, ...attemptData };

    // Calculate deltas if previous attempt exists
    let deltas: Record<RubricKey, number> | null = null;
    if (previousAttempt) {
      deltas = {} as Record<RubricKey, number>;
      for (const key of Object.keys(RUBRIC) as RubricKey[]) {
        deltas[key] =
          evaluationResponse.dimensions[key].score -
          previousAttempt.feedback.dimensions[key].score;
      }
    }

    return {
      newAttempt,
      previousAttempt,
      deltas,
    };
  } catch (error) {
    console.error("Error submitting attempt:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Handle session errors
    if (errorMessage === "NO_SESSION" || errorMessage === "INVALID_SESSION") {
      return {
        success: false,
        error: "Session expired. Please sign in again.",
      };
    }
    
    return {
      success: false,
      error: errorMessage === "Unknown error occurred" ? errorMessage : errorMessage,
    };
  }
}

