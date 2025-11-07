"use server";

import { db } from "@/firebase/admin";
import { requireUserIdFromCookie } from "@/lib/auth.server";
import { logEvent } from "@/lib/telemetry.server";
import { evaluateAnswer, QuestionEvaluation } from "@/lib/evaluation-engine";
import { generateFollowUps } from "@/lib/followup-generator";
import { CompanyType } from "@/lib/company-profiles";
import { getInterviewById } from "./general.action";

/**
 * Enhanced interview feedback structure with per-question STAR analysis
 */
export interface EnhancedFeedback {
  id?: string;
  interviewId: string;
  userId: string;
  company?: CompanyType;
  questionEvaluations: QuestionEvaluation[];
  summaryFeedback: SummaryFeedback;
  metadata: {
    totalTokensUsed: number;
    totalCost: number;
    totalLatencyMs: number;
    evaluatedAt: string;
  };
  createdAt: string;
}

export interface SummaryFeedback {
  overallSTARScore: number; // Average across all questions
  overallConfidence: number;
  strengthAreas: string[];
  improvementAreas: string[];
  criticalIssues: string[];
  companyAlignmentSummary?: string;
  nextSteps: string[];
}

/**
 * Create enhanced feedback with STAR analysis for each question
 */
export async function createEnhancedFeedback(params: {
  interviewId: string;
  transcript: Array<{ role: string; content: string }>;
  feedbackId?: string;
}): Promise<{ success: boolean; feedbackId?: string; error?: string }> {
  const { interviewId, transcript, feedbackId } = params;

  console.log('🔍 [ENHANCED-FEEDBACK] createEnhancedFeedback started:', {
    interviewId,
    transcriptLength: transcript?.length || 0,
    feedbackId
  });

  try {
    // Get interview details
    console.log('🔍 [ENHANCED-FEEDBACK] Fetching interview details...');
    const interview = await getInterviewById(interviewId);
    
    if (!interview) {
      console.error('❌ [ENHANCED-FEEDBACK] Interview not found:', interviewId);
      return { success: false, error: "Interview not found" };
    }
    
    console.log('✅ [ENHANCED-FEEDBACK] Interview found:', {
      company: interview.company,
      questionsCount: interview.questions?.length || 0
    });
    
    const userId = interview.userId;
    if (!userId) {
      console.error('❌ [ENHANCED-FEEDBACK] No userId in interview');
      return { success: false, error: "User ID not found in interview" };
    }

    const company = interview.company as CompanyType | undefined;
    const questions = interview.questions;
    const questionDetails = interview.questionDetails;

    console.log('🔍 [ENHANCED-FEEDBACK] Interview data:', {
      company,
      questionsCount: questions?.length || 0,
      hasQuestionDetails: !!questionDetails
    });

    if (!questions || questions.length === 0) {
      console.error('❌ [ENHANCED-FEEDBACK] No questions in interview');
      return { success: false, error: "No questions found in interview" };
    }

    logEvent("feedback.generation.start", {
      userId,
      interviewId,
      questionCount: questions.length,
      company,
    });

    // Parse transcript into question-answer pairs
    console.log('🔍 [ENHANCED-FEEDBACK] Parsing transcript to Q&A pairs...');
    const qaMap = parseTranscriptToQA(transcript, questions);
    console.log('✅ [ENHANCED-FEEDBACK] Parsed Q&A map size:', qaMap.size);

    // Build all Q&A pairs for improvement plan context
    const allQuestionsAndAnswers = Array.from(qaMap.entries()).map(([index, qaData]) => ({
      question: questions[index],
      answer: qaData.mainAnswer,
    }));

    // Evaluate each question
    const questionEvaluations: QuestionEvaluation[] = [];
    let totalTokens = 0;
    let totalLatency = 0;
    const startTime = Date.now();

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const qaData = qaMap.get(i);
      
      if (!qaData) {
        console.warn(`No answer found for question ${i}`);
        continue;
      }

      const principle = questionDetails?.[i]?.principle;

      // Evaluate this question's answer with full interview context
      const evaluation = await evaluateAnswer(
        i.toString(),
        question,
        qaData.mainAnswer,
        qaData.followUps,
        company,
        principle,
        {
          role: interview.role || 'Unknown Role',
          level: interview.level || 'mid',
          allQuestionsAndAnswers,
        }
      );

      questionEvaluations.push(evaluation);
      totalTokens += evaluation.metadata.totalTokensUsed;
      totalLatency += evaluation.metadata.totalLatencyMs;

      logEvent("feedback.question.evaluated", {
        questionId: i,
        starScore: evaluation.starAnalysis.overallSTARScore,
        confidence: evaluation.starAnalysis.overallConfidence,
      });
    }

    // Generate summary feedback
    const summaryFeedback = generateSummaryFeedback(
      questionEvaluations,
      company
    );

    const totalCost = questionEvaluations.reduce(
      (sum, q) => sum + q.metadata.totalCost,
      0
    );

    const enhancedFeedback: EnhancedFeedback = {
      interviewId,
      userId,
      company,
      questionEvaluations,
      summaryFeedback,
      metadata: {
        totalTokensUsed: totalTokens,
        totalCost,
        totalLatencyMs: Date.now() - startTime,
        evaluatedAt: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
    };

    // Save to Firestore (using "feedback" collection for compatibility)
    console.log('🔍 [ENHANCED-FEEDBACK] Saving to Firestore...');
    let feedbackRef;
    if (feedbackId) {
      console.log('🔍 [ENHANCED-FEEDBACK] Using existing feedbackId:', feedbackId);
      feedbackRef = db.collection("feedback").doc(feedbackId);
    } else {
      console.log('🔍 [ENHANCED-FEEDBACK] Creating new feedback document');
      feedbackRef = db.collection("feedback").doc();
    }

    console.log('🔍 [ENHANCED-FEEDBACK] Attempting Firestore write to collection: feedback');
    await feedbackRef.set(enhancedFeedback);
    console.log('✅ [ENHANCED-FEEDBACK] Feedback saved successfully! ID:', feedbackRef.id);

    logEvent("feedback.generation.complete", {
      feedbackId: feedbackRef.id,
      overallScore: summaryFeedback.overallSTARScore,
      totalCost,
      totalLatency,
    });

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("❌ [ENHANCED-FEEDBACK] Error creating enhanced feedback:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    });
    logEvent("feedback.generation.error", { error: String(error) });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Parse transcript into question-answer pairs with follow-ups
 * Improved matching algorithm to handle variations in question phrasing
 */
function parseTranscriptToQA(
  transcript: Array<{ role: string; content: string }>,
  questions: string[]
): Map<
  number,
  {
    mainAnswer: string;
    followUps: Array<{ question: string; answer: string; reason: string }>;
  }
> {
  const qaMap = new Map();
  let currentQuestionIndex = -1;
  let mainAnswer = "";
  const followUps: Array<{ question: string; answer: string; reason: string }> = [];
  let lastAssistantMessage = "";
  let isFollowUp = false;
  
  // Track which questions have been matched to avoid duplicates
  const matchedQuestionIndices = new Set<number>();
  
  // Pre-process questions for better matching
  const questionKeywords = questions.map((q, idx) => {
    const words = q.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 3) // Only meaningful words
      .slice(0, 5); // First 5 meaningful words
    return { index: idx, keywords: words, fullText: q.toLowerCase() };
  });

  console.log('🔍 [PARSE-TRANSCRIPT] Starting parse with', questions.length, 'questions');
  console.log('🔍 [PARSE-TRANSCRIPT] Transcript has', transcript.length, 'messages');

  for (const message of transcript) {
    if (message.role === "assistant") {
      const messageLower = message.content.toLowerCase();
      let questionIndex = -1;
      
      // Strategy 1: Try exact substring match (first 40 chars for better coverage)
      questionIndex = questions.findIndex((q, idx) => {
        if (matchedQuestionIndices.has(idx)) return false; // Skip already matched
        const qLower = q.toLowerCase();
        // Check if message contains significant portion of question
        return messageLower.includes(qLower.substring(0, Math.min(40, qLower.length)));
      });

      // Strategy 2: If no exact match, try keyword matching
      if (questionIndex === -1) {
        let bestMatch = { index: -1, score: 0 };
        
        for (const qData of questionKeywords) {
          if (matchedQuestionIndices.has(qData.index)) continue;
          
          // Count how many keywords match
          const matchingKeywords = qData.keywords.filter(kw => 
            messageLower.includes(kw)
          ).length;
          
          // Also check for longer phrases (3+ word sequences)
          const phraseMatch = qData.fullText.length > 20 && 
            messageLower.includes(qData.fullText.substring(0, Math.min(30, qData.fullText.length)));
          
          const score = matchingKeywords + (phraseMatch ? 2 : 0);
          
          if (score > bestMatch.score && score >= 2) { // Need at least 2 keywords
            bestMatch = { index: qData.index, score };
          }
        }
        
        if (bestMatch.index !== -1) {
          questionIndex = bestMatch.index;
          console.log(`✅ [PARSE-TRANSCRIPT] Matched question ${questionIndex} via keyword matching (score: ${bestMatch.score})`);
        }
      } else {
        console.log(`✅ [PARSE-TRANSCRIPT] Matched question ${questionIndex} via exact substring`);
      }

      if (questionIndex !== -1) {
        // Save previous question's data before starting new one
        if (currentQuestionIndex !== -1 && !qaMap.has(currentQuestionIndex)) {
          qaMap.set(currentQuestionIndex, {
            mainAnswer: mainAnswer || "No answer provided",
            followUps: [...followUps],
          });
          console.log(`💾 [PARSE-TRANSCRIPT] Saved question ${currentQuestionIndex}`);
        }

        // Start new question
        currentQuestionIndex = questionIndex;
        matchedQuestionIndices.add(questionIndex);
        mainAnswer = "";
        followUps.length = 0;
        isFollowUp = false;
        console.log(`🆕 [PARSE-TRANSCRIPT] Starting question ${questionIndex}: "${questions[questionIndex].substring(0, 50)}..."`);
      } else {
        // This is likely a follow-up question or acknowledgment
        // Only mark as follow-up if we have an active question
        if (currentQuestionIndex !== -1) {
          isFollowUp = true;
        }
      }

      lastAssistantMessage = message.content;
    } else if (message.role === "user") {
      if (currentQuestionIndex === -1) {
        // Skip user messages before first question is identified
        continue;
      }

      if (!isFollowUp) {
        // Main answer
        mainAnswer += (mainAnswer ? " " : "") + message.content;
      } else {
        // Follow-up answer
        followUps.push({
          question: lastAssistantMessage,
          answer: message.content,
          reason: "Probing for more details",
        });
        isFollowUp = false;
      }
    }
  }

  // Save last question's data
  if (currentQuestionIndex !== -1 && !qaMap.has(currentQuestionIndex)) {
    qaMap.set(currentQuestionIndex, {
      mainAnswer: mainAnswer || "No answer provided",
      followUps: [...followUps],
    });
    console.log(`💾 [PARSE-TRANSCRIPT] Saved final question ${currentQuestionIndex}`);
  }

  console.log(`✅ [PARSE-TRANSCRIPT] Parse complete. Found ${qaMap.size} questions out of ${questions.length} total.`);
  console.log(`📊 [PARSE-TRANSCRIPT] Matched question indices:`, Array.from(qaMap.keys()).sort((a, b) => a - b));
  
  // Log missing questions
  const missingQuestions = [];
  for (let i = 0; i < questions.length; i++) {
    if (!qaMap.has(i)) {
      missingQuestions.push(i);
    }
  }
  if (missingQuestions.length > 0) {
    console.warn(`⚠️ [PARSE-TRANSCRIPT] Missing questions:`, missingQuestions);
  }

  return qaMap;
}

/**
 * Generate summary feedback across all questions
 */
function generateSummaryFeedback(
  questionEvaluations: QuestionEvaluation[],
  company?: CompanyType
): SummaryFeedback {
  if (questionEvaluations.length === 0) {
    return {
      overallSTARScore: 0,
      overallConfidence: 0,
      strengthAreas: [],
      improvementAreas: [],
      criticalIssues: [],
      nextSteps: ["Complete the interview to receive feedback"],
    };
  }

  // Calculate averages
  const avgSTARScore =
    questionEvaluations.reduce(
      (sum, q) => sum + q.starAnalysis.overallSTARScore,
      0
    ) / questionEvaluations.length;

  const avgConfidence =
    questionEvaluations.reduce(
      (sum, q) => sum + q.starAnalysis.overallConfidence,
      0
    ) / questionEvaluations.length;

  // Identify strength areas (components scoring > 75)
  const strengthAreas: string[] = [];
  const improvementAreas: string[] = [];
  const componentScores = {
    situation: 0,
    task: 0,
    action: 0,
    result: 0,
  };

  questionEvaluations.forEach((q) => {
    componentScores.situation += q.starAnalysis.situation.score;
    componentScores.task += q.starAnalysis.task.score;
    componentScores.action += q.starAnalysis.action.score;
    componentScores.result += q.starAnalysis.result.score;
  });

  const avgScores = {
    situation: componentScores.situation / questionEvaluations.length,
    task: componentScores.task / questionEvaluations.length,
    action: componentScores.action / questionEvaluations.length,
    result: componentScores.result / questionEvaluations.length,
  };

  if (avgScores.situation > 75) strengthAreas.push("Setting context (Situation)");
  else if (avgScores.situation < 60) improvementAreas.push("Setting clear context (Situation)");

  if (avgScores.task > 75) strengthAreas.push("Defining goals (Task)");
  else if (avgScores.task < 60) improvementAreas.push("Clarifying objectives (Task)");

  if (avgScores.action > 75) strengthAreas.push("Describing personal actions (Action)");
  else if (avgScores.action < 60) improvementAreas.push("Articulating personal contribution (Action)");

  if (avgScores.result > 75) strengthAreas.push("Quantifying outcomes (Result)");
  else if (avgScores.result < 60) improvementAreas.push("Adding measurable results (Result)");

  // Collect critical issues
  const criticalIssues: string[] = [];
  const issueCount: Record<string, number> = {};

  questionEvaluations.forEach((q) => {
    q.starAnalysis.criticalIssues.forEach((issue) => {
      issueCount[issue] = (issueCount[issue] || 0) + 1;
    });
  });

  // Include issues that appear in >50% of answers
  Object.entries(issueCount).forEach(([issue, count]) => {
    if (count > questionEvaluations.length / 2) {
      criticalIssues.push(issue);
    }
  });

  // Company alignment summary - Enhanced with detailed feedback
  let companyAlignmentSummary: string | undefined;
  if (company && company !== "generic") {
    const companyName = company.charAt(0).toUpperCase() + company.slice(1);
    
    // Company-specific expectations
    const companyExpectations: Record<string, string> = {
      amazon: "Amazon looks for candidates who demonstrate their 16 Leadership Principles through concrete examples. They expect data-driven decision making, customer obsession, ownership mentality, and the ability to deliver results under constraints. Interviewers probe deeply for metrics, trade-offs, and personal contribution.",
      google: "Google seeks candidates who show strong collaboration skills, ability to handle ambiguity, innovative thinking, and Googleyness (humility, conscientiousness, comfort with ambiguity). They value technical depth, problem-solving ability, and how you work with diverse teams to achieve impact.",
      meta: "Meta values candidates who demonstrate high impact, move fast, are bold in their decisions, and focus on ROI. They look for people who can prioritize ruthlessly, ship quickly, iterate based on data, and aren't afraid to take calculated risks. Quantifiable business impact is crucial.",
    };
    
    const expectations = companyExpectations[company] || `${companyName} values specific, measurable examples that demonstrate their core principles.`;
    
    // Analyze what candidate demonstrated
    const demonstrated: string[] = [];
    const missed: string[] = [];
    
    if (avgScores.result > 70) {
      demonstrated.push("quantifiable outcomes");
    } else {
      missed.push("specific metrics and measurable results");
    }
    
    if (avgScores.action > 70) {
      demonstrated.push("clear personal contribution");
    } else {
      missed.push("distinction between team actions and personal actions");
    }
    
    if (avgScores.situation > 70 && avgScores.task > 70) {
      demonstrated.push("good context setting");
    } else {
      missed.push("clear problem definition and objectives");
    }
    
    const demonstratedText = demonstrated.length > 0 
      ? `Your answers demonstrated ${demonstrated.join(", ")}.` 
      : "Your answers lacked clear structure.";
    
    const missedText = missed.length > 0
      ? ` However, you could improve by adding ${missed.join(", ")}.`
      : " Continue refining your examples with more specific details.";
    
    companyAlignmentSummary = `${expectations}\n\n${demonstratedText}${missedText}`;
  }

  // Next steps
  const nextSteps: string[] = [];
  if (improvementAreas.length > 0) {
    nextSteps.push(`Focus on improving: ${improvementAreas.slice(0, 2).join(", ")}`);
  }
  if (criticalIssues.length > 0) {
    nextSteps.push(`Address critical issues: ${criticalIssues[0]}`);
  }
  nextSteps.push("Practice 2-3 more questions targeting your weak areas");
  if (company) {
    nextSteps.push(`Review ${company.toUpperCase()} specific interview tips`);
  }

  return {
    overallSTARScore: Math.round(avgSTARScore),
    overallConfidence: Math.round(avgConfidence * 100) / 100,
    strengthAreas,
    improvementAreas,
    criticalIssues,
    companyAlignmentSummary,
    nextSteps,
  };
}

/**
 * Get enhanced feedback by interview ID
 */
export async function getEnhancedFeedbackByInterviewId(
  interviewId: string,
  userId: string
): Promise<EnhancedFeedback | null> {
  try {
    const querySnapshot = await db
      .collection("feedback")
      .where("interviewId", "==", interviewId)
      .where("userId", "==", userId)
      .limit(1)
      .get();

    if (querySnapshot.empty) return null;

    const feedbackDoc = querySnapshot.docs[0];
    return { id: feedbackDoc.id, ...feedbackDoc.data() } as EnhancedFeedback;
  } catch (error) {
    console.error("Error fetching enhanced feedback:", error);
    return null;
  }
}

/**
 * Generate follow-up questions during interview (real-time)
 */
export async function generateInterviewFollowUps(params: {
  question: string;
  answer: string;
  company?: CompanyType;
}): Promise<{
  success: boolean;
  followUps?: Array<{ question: string; reason: string; priority: number }>;
  error?: string;
}> {
  const { question, answer, company } = params;

  try {
    // First analyze the answer with STAR
    const { analyzeSTAR } = await import("@/lib/star-analyzer");
    const starAnalysis = await analyzeSTAR(question, answer, company);

    // Generate follow-ups based on gaps
    const followUpResponse = await generateFollowUps(
      question,
      answer,
      starAnalysis,
      company
    );

    return {
      success: true,
      followUps: followUpResponse.followUps.map((f) => ({
        question: f.question,
        reason: f.reason,
        priority: f.priority,
      })),
    };
  } catch (error) {
    console.error("Error generating follow-ups:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
