"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";
import { Feedback } from "@/types";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  console.log("=== createFeedback START ===");
  console.log("- Interview ID:", interviewId);
  console.log("- User ID:", userId);
  console.log("- Transcript length:", transcript?.length);
  console.log("- Feedback ID:", feedbackId);

  try {
    // Use enhanced feedback system with STAR analysis
    const { createEnhancedFeedback } = await import("./interview-feedback.action");
    
    console.log("Calling createEnhancedFeedback...");
    const result = await createEnhancedFeedback({
      interviewId,
      transcript,
      feedbackId,
    });

    console.log("Enhanced feedback result:", result);

    if (!result.success) {
      // Fallback to old system if enhanced fails
      console.warn("Enhanced feedback failed, using fallback:", result.error);
      return await createLegacyFeedback(params);
    }

    console.log("✅ Enhanced feedback created successfully!");
    return result;
  } catch (error) {
    console.error("❌ Error in createFeedback:", error);
    console.log("Falling back to legacy feedback...");
    // Fallback to old system
    return await createLegacyFeedback(params);
  }
}

/**
 * Legacy feedback system (fallback)
 */
async function createLegacyFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  console.log("=== createLegacyFeedback START ===");

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    console.log("Formatted transcript length:", formattedTranscript.length);

    const { object } = await generateObject({
      model: google("gemini-2.5-pro-latest", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const feedback = {
      interviewId: interviewId,
      userId: userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    let feedbackRef;

    if (feedbackId) {
      feedbackRef = db.collection("feedback").doc(feedbackId);
    } else {
      feedbackRef = db.collection("feedback").doc();
    }

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving legacy feedback:", error);
    return { success: false };
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  const querySnapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const feedbackDoc = querySnapshot.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  // Get user's interviews
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .where("finalized", "==", true)
    .get();

  // Get feedbacks to check which interviews have been started
  const feedbacks = await db
    .collection("feedback")
    .where("userId", "==", userId)
    .get();
  
  const completedInterviewIds = new Set(
    feedbacks.docs.map(doc => doc.data().interviewId)
  );

  // Filter to only show interviews that DON'T have feedback (not started yet)
  const interviewsData = interviews.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((interview) => !completedInterviewIds.has(interview.id)) as Interview[];

  return interviewsData
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA; // Descending order (newest first)
    })
    .slice(0, limit); // Limit to requested amount
}

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .get();

  // Get all feedbacks for this user to check which interviews have been completed
  const feedbacks = await db
    .collection("feedback")
    .where("userId", "==", userId)
    .get();
  
  const completedInterviewIds = new Set(
    feedbacks.docs.map(doc => doc.data().interviewId)
  );

  console.log("DEBUG getInterviewsByUserId:");
  console.log("- Total interviews:", interviews.docs.length);
  console.log("- Total feedbacks:", feedbacks.docs.length);
  console.log("- Completed interview IDs:", Array.from(completedInterviewIds));

  // Filter to only show interviews that have feedback (completed)
  const interviewsData = interviews.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((interview) => {
      const hasCompleted = completedInterviewIds.has(interview.id);
      console.log(`- Interview ${interview.id} (${interview.role}): hasCompleted=${hasCompleted}`);
      return hasCompleted;
    }) as Interview[];

  console.log("- Filtered completed interviews:", interviewsData.length);

  return interviewsData.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA; // Descending order (newest first)
  });
}

interface ListAttemptsByQuestionParams {
  userId: string;
  interviewId: string;
  questionId: string;
}

interface AttemptListItem {
  id: string;
  attemptNo: number;
  feedback: {
    summary: string;
    dimensions: Record<string, { score: number; feedback: string }>;
    total: number;
  };
}

export async function listAttemptsByQuestion(
  params: ListAttemptsByQuestionParams
): Promise<AttemptListItem[]> {
  const { userId, interviewId, questionId } = params;

  try {
    const attemptsSnapshot = await db
      .collection("interviews")
      .doc(interviewId)
      .collection("attempts")
      .where("userId", "==", userId)
      .where("questionId", "==", questionId)
      .get();

    // Sort in JavaScript to avoid index requirement
    const attempts = attemptsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        attemptNo: data.attemptNo,
        feedback: data.feedback,
      } as AttemptListItem;
    });

    return attempts.sort((a, b) => a.attemptNo - b.attemptNo); // Ascending order
  } catch (error) {
    console.error("Error fetching attempts:", error);
    return [];
  }
}
