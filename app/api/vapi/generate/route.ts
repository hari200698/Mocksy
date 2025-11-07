import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";
import { getQuestionsForInterview } from "@/lib/faang-questions";
import { CompanyType } from "@/lib/company-profiles";

export async function POST(request: Request) {
  const { company, role, level, amount, personality, userid } = await request.json();

  try {
    // Get curated questions from our FAANG question bank
    const selectedQuestions = getQuestionsForInterview(
      company as CompanyType,
      parseInt(amount) || 5
    );

    const interview = {
      role: role,
      company: company, // Store company for feedback generation
      personality: personality || 'neutral', // Store personality for interview style
      type: "Behavioral", // Now exclusively behavioral
      level: level,
      techstack: [], // No longer needed for behavioral interviews
      questions: selectedQuestions.map(q => q.text),
      questionDetails: selectedQuestions, // Store full details including principle mapping
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection("interviews").add(interview);

    return Response.json({ success: true, interviewId: docRef.id }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
