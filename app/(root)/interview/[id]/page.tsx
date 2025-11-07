import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getCompanyLogo } from "@/constants";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { requireUserIdFromCookie } from "@/lib/auth.server";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  let userId: string;
  try {
    userId = await requireUserIdFromCookie();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage === "NO_SESSION" || errorMessage === "INVALID_SESSION") {
      redirect("/sign-in");
    }
    throw error;
  }

  const user = await getCurrentUser();
  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId,
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Professional Header - Enhanced Design */}
      <div className="mb-8 relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/20 p-6 rounded-2xl shadow-lg shadow-indigo-100/30 border border-indigo-100/50">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,rgb(0,0,0)_1px,transparent_0)] bg-[length:24px_24px]"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="relative w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center p-3 border border-indigo-200/50 shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-xl"></div>
              <Image
                src={getCompanyLogo(interview.company || 'generic')}
                alt="company-logo"
                width={40}
                height={40}
                className="object-contain relative z-10"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent tracking-tight">
                {interview.role}
              </h1>
              <div className="flex items-center gap-2 mt-1.5">
                {interview.company && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-100/60 border border-indigo-200/50">
                    <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                      {interview.company.charAt(0).toUpperCase() + interview.company.slice(1)}
                    </span>
                  </span>
                )}
                {interview.personality && (
                  <span className="text-xs font-medium text-gray-600">
                    {interview.personality.charAt(0).toUpperCase() + interview.personality.slice(1)} Mode
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {feedback && (
            <div className="px-5 py-2.5 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200/60 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-sm font-semibold text-emerald-700">Completed</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Agent Component */}
      <Agent
        userName={user?.name!}
        userId={userId}
        interviewId={id}
        type="interview"
        questions={interview.questions}
        feedbackId={feedback?.id}
        company={interview.company as 'amazon' | 'google' | 'meta' | 'generic' | undefined}
        personality={interview.personality as 'friendly' | 'neutral' | 'skeptical' | undefined}
      />
    </div>
  );
};

export default InterviewDetails;
