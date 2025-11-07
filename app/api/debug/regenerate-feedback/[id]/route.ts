import { db } from "@/firebase/admin";
import { NextResponse } from "next/server";
import { createEnhancedFeedback } from "@/lib/actions/interview-feedback.action";

/**
 * Debug endpoint to regenerate feedback for an existing interview
 * This allows testing new prompts and logic without conducting a new interview
 * 
 * Usage: GET /api/debug/regenerate-feedback/[interviewId]
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: interviewId } = await params;

    console.log("🔄 [REGENERATE-FEEDBACK] Starting for interview:", interviewId);

    // 1. Get the interview
    const interviewDoc = await db.collection("interviews").doc(interviewId).get();
    
    if (!interviewDoc.exists) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    const interview = { id: interviewDoc.id, ...interviewDoc.data() };
    console.log("✅ [REGENERATE-FEEDBACK] Interview found:", {
      role: interview.role,
      company: interview.company,
      userId: interview.userId
    });

    // 2. Get existing feedback to extract transcript
    const feedbackQuery = await db
      .collection("feedback")
      .where("interviewId", "==", interviewId)
      .limit(1)
      .get();

    if (feedbackQuery.empty) {
      return NextResponse.json(
        { 
          error: "No existing feedback found. Cannot regenerate without transcript.",
          suggestion: "Complete the interview first to generate initial feedback."
        },
        { status: 404 }
      );
    }

    const existingFeedback = feedbackQuery.docs[0].data();
    console.log("✅ [REGENERATE-FEEDBACK] Found existing feedback");

    // 3. Extract transcript from existing feedback
    // The transcript might be in different formats depending on feedback type
    let transcript: any[] = [];
    
    if (existingFeedback.questionEvaluations) {
      // Enhanced feedback format - reconstruct transcript from Q&A
      console.log("📝 [REGENERATE-FEEDBACK] Reconstructing transcript from enhanced feedback");
      const questions = interview.questions || [];
      existingFeedback.questionEvaluations.forEach((evaluation: any, index: number) => {
        // Add question
        transcript.push({
          role: "assistant",
          content: questions[index] || evaluation.question
        });
        // Add answer
        transcript.push({
          role: "user",
          content: evaluation.mainAnswer
        });
      });
    } else if (existingFeedback.transcript) {
      // Legacy format - use stored transcript
      console.log("📝 [REGENERATE-FEEDBACK] Using stored transcript");
      transcript = existingFeedback.transcript;
    } else {
      return NextResponse.json(
        { 
          error: "Cannot extract transcript from existing feedback",
          feedbackStructure: Object.keys(existingFeedback)
        },
        { status: 400 }
      );
    }

    console.log("✅ [REGENERATE-FEEDBACK] Transcript extracted:", {
      messageCount: transcript.length,
      firstMessage: transcript[0]
    });

    // 4. Delete old feedback
    const oldFeedbackId = feedbackQuery.docs[0].id;
    await db.collection("feedback").doc(oldFeedbackId).delete();
    console.log("🗑️ [REGENERATE-FEEDBACK] Deleted old feedback:", oldFeedbackId);

    // 5. Generate new feedback with latest prompts and logic
    console.log("🤖 [REGENERATE-FEEDBACK] Generating new feedback with latest prompts...");
    const result = await createEnhancedFeedback({
      interviewId,
      transcript,
      feedbackId: oldFeedbackId, // Reuse same ID
    });

    if (!result.success) {
      return NextResponse.json(
        { 
          error: "Failed to generate new feedback",
          details: result.error
        },
        { status: 500 }
      );
    }

    console.log("✅ [REGENERATE-FEEDBACK] New feedback generated successfully!");

    // 6. Get the new feedback to return
    const newFeedbackDoc = await db.collection("feedback").doc(result.feedbackId!).get();
    const newFeedback = newFeedbackDoc.data();

    return NextResponse.json({
      success: true,
      message: "Feedback regenerated successfully with latest prompts and logic",
      interviewId,
      oldFeedbackId,
      newFeedbackId: result.feedbackId,
      changes: {
        promptVersions: "Updated to latest",
        model: "gemini-2.5-pro-latest",
        features: [
          "AI-powered secondary metrics",
          "Enhanced improvement plan",
          "Updated company alignment feedback"
        ]
      },
      newFeedback: {
        overallScore: newFeedback?.summaryFeedback?.overallSTARScore,
        questionCount: newFeedback?.questionEvaluations?.length,
        timestamp: newFeedback?.createdAt
      },
      viewUrl: `/interview/${interviewId}/feedback`
    });

  } catch (error) {
    console.error("❌ [REGENERATE-FEEDBACK] Error:", error);
    return NextResponse.json(
      { 
        error: "Failed to regenerate feedback",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
