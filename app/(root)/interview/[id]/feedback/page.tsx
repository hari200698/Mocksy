import dayjs from "dayjs";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getInterviewById } from "@/lib/actions/general.action";
import { getEnhancedFeedbackByInterviewId } from "@/lib/actions/interview-feedback.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { Button } from "@/components/ui/button";
import FeedbackTabs from "@/components/feedback/FeedbackTabs";
import LoadingSpinner from "@/components/LoadingSpinner";

const Feedback = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user?.id) redirect("/sign-in");

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const enhancedFeedback = await getEnhancedFeedbackByInterviewId(id, user.id);
  
  // If no enhanced feedback exists yet, show a loading state
  if (!enhancedFeedback) {
    return (
      <section className="section-feedback">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl font-semibold text-center">
            Analyzing Your Interview...
          </h1>
          <LoadingSpinner 
            message="Our AI is performing detailed STAR framework analysis on each of your answers. This typically takes 30-60 seconds."
            size="lg"
          />
          <div className="max-w-md text-center space-y-2">
            <p className="text-sm text-gray-600">
              ✨ Analyzing STAR components (Situation, Task, Action, Result)
            </p>
            <p className="text-sm text-gray-600">
              🔍 Detecting red flags and areas for improvement
            </p>
            <p className="text-sm text-gray-600">
              📊 Generating company-specific feedback
            </p>
            <p className="text-sm text-gray-600">
              💡 Creating personalized improvement plans
            </p>
          </div>
          <Button
            onClick={() => window.location.reload()}
            className="btn-primary mt-4"
          >
            Refresh Page
          </Button>
        </div>
      </section>
    );
  }

  const companyName = enhancedFeedback.company 
    ? enhancedFeedback.company.charAt(0).toUpperCase() + enhancedFeedback.company.slice(1)
    : null;

  return (
    <section className="section-feedback">
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-semibold text-center">
          Interview Feedback - <span className="capitalize">{interview.role}</span>
          {companyName && <span className="text-primary-200"> @ {companyName}</span>}
        </h1>
        
        <div className="flex flex-row gap-6 items-center flex-wrap justify-center">
          {/* Overall Score */}
          <div className="flex flex-row gap-2 items-center">
            <span className="text-xl">⭐</span>
            <p className="text-base">
              Overall Score:{" "}
              <span className="text-primary-200 font-bold">
                {enhancedFeedback.summaryFeedback.overallSTARScore}
              </span>
              /100
            </p>
          </div>

          {/* Date */}
          <div className="flex flex-row gap-2 items-center">
            <span className="text-xl">📅</span>
            <p className="text-base">
              {dayjs(enhancedFeedback.createdAt).format("MMM D, YYYY h:mm A")}
            </p>
          </div>
        </div>
      </div>

      <hr className="my-6" />

      {/* Main Content: Tabs for per-question feedback + Summary */}
      <FeedbackTabs 
        questionEvaluations={enhancedFeedback.questionEvaluations}
        summaryFeedback={enhancedFeedback.summaryFeedback}
        company={enhancedFeedback.company}
      />

      {/* Action Buttons */}
      <div className="flex justify-center mt-8">
        <Button className="btn-primary">
          <Link href="/" className="flex w-full justify-center">
            <p className="text-sm font-semibold text-black text-center">
              Return to Dashboard
            </p>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Feedback;
