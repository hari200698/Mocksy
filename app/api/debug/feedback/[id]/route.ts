import { db } from "@/firebase/admin";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if feedback exists for this interview
    const feedbackQuery = await db
      .collection("feedback")
      .where("interviewId", "==", id)
      .get();

    const feedbacks = feedbackQuery.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      interviewId: id,
      feedbackCount: feedbacks.length,
      feedbacks: feedbacks,
      message: feedbacks.length > 0 
        ? "✅ Feedback found!" 
        : "❌ No feedback found for this interview"
    });
  } catch (error) {
    console.error("Error checking feedback:", error);
    return NextResponse.json(
      { error: "Failed to check feedback", details: error },
      { status: 500 }
    );
  }
}
