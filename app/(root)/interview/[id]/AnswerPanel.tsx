"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { submitAttemptAndEvaluate } from "@/lib/actions/attempts.action";
import { RubricKey, RUBRIC } from "@/lib/rubric";
import { cn } from "@/lib/utils";

interface AnswerPanelProps {
  userId: string;
  interviewId: string;
  questionId: string;
}

export default function AnswerPanel({
  userId,
  interviewId,
  questionId,
}: AnswerPanelProps) {
  const [answerText, setAnswerText] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    summary: string;
    dimensions: Record<RubricKey, { score: number; feedback: string }>;
    total: number;
    deltas: Record<RubricKey, number> | null;
  } | null>(null);

  const handleSubmit = () => {
    if (!answerText.trim()) {
      toast.error("Please enter an answer before submitting");
      return;
    }

    // Clear any previous errors
    setError(null);

    startTransition(async () => {
      try {
        const result = await submitAttemptAndEvaluate({
          interviewId,
          questionId,
          answerText: answerText.trim(),
        });

        if ("success" in result && !result.success) {
          const errorMessage = result.error || "Failed to submit attempt";
          setError(errorMessage);
          toast.error(errorMessage);
          return;
        }

        if ("newAttempt" in result) {
          setFeedback({
            summary: result.newAttempt.feedback.summary,
            dimensions: result.newAttempt.feedback.dimensions,
            total: result.newAttempt.feedback.total,
            deltas: result.deltas,
          });
          toast.success("Answer submitted successfully!");
          // Clear the textarea after successful submission
          setAnswerText("");
          // Clear any errors on success
          setError(null);
        }
      } catch (error) {
        console.error("Error submitting answer:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An error occurred while submitting your answer";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="card-border">
        <div className="card p-6">
          <h3 className="mb-4">Submit Your Answer</h3>
          <textarea
            value={answerText}
            onChange={(e) => {
              setAnswerText(e.target.value);
              // Clear error when user starts typing
              if (error) setError(null);
            }}
            placeholder="Type your answer here..."
            className="w-full min-h-[150px] p-4 rounded-lg bg-dark-200 border border-input text-light-100 placeholder:text-light-400 resize-y focus:outline-none focus:ring-2 focus:ring-primary-200/50"
            disabled={isPending}
          />
          {error && (
            <div className="mt-2 p-3 rounded-lg bg-destructive-100/20 border border-destructive-100/50">
              <p className="text-sm text-destructive-100">{error}</p>
            </div>
          )}
          <Button
            onClick={handleSubmit}
            disabled={isPending || !answerText.trim()}
            className="btn-primary mt-4"
          >
            {isPending ? "Submitting..." : "Submit & Get Feedback"}
          </Button>
        </div>
      </div>

      {feedback && (
        <div className="card-border">
          <div className="card p-6 space-y-6">
            <div>
              <h3 className="mb-2">Feedback Summary</h3>
              <p className="text-light-100">{feedback.summary}</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold">Overall Score</h3>
                <span className="text-3xl font-bold text-primary-200">
                  {Math.round(feedback.total)}/100
                </span>
              </div>
            </div>

            <div>
              <h3 className="mb-4">Dimension Scores</h3>
              <div className="space-y-4">
                {(Object.keys(RUBRIC) as RubricKey[]).map((key) => {
                  const dimension = feedback.dimensions[key];
                  const delta = feedback.deltas?.[key];
                  const hasDelta = delta !== undefined && delta !== null && delta !== 0;
                  
                  return (
                    <div
                      key={key}
                      className="p-4 rounded-lg bg-dark-200 border border-input"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold capitalize">
                            {key}
                          </span>
                          <span className="text-xs text-light-400">
                            ({RUBRIC[key].weight * 100}%)
                          </span>
                          {hasDelta && (
                            <span
                              className={cn(
                                "text-xs px-2 py-1 rounded",
                                delta > 0
                                  ? "bg-success-100/20 text-success-100"
                                  : "bg-destructive-100/20 text-destructive-100"
                              )}
                            >
                              {delta > 0 ? "+" : ""}
                              {Math.round(delta)}
                            </span>
                          )}
                        </div>
                        <span className="font-bold text-primary-200">
                          {Math.round(dimension.score)}/100
                        </span>
                      </div>
                      <p className="text-sm text-light-100 mt-2">
                        {dimension.feedback}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {feedback.deltas && (
              <div className="mt-4 p-4 rounded-lg bg-dark-200/50 border border-primary-200/20">
                <p className="text-sm text-light-100">
                  <strong>Note:</strong> Comparison with your previous attempt
                  is shown above. Positive numbers indicate improvement.
                </p>
              </div>
            )}

            {feedback.deltas && (() => {
              // Calculate total delta (sum of all dimension deltas)
              const totalDelta = Object.values(feedback.deltas).reduce(
                (sum, delta) => sum + delta,
                0
              );

              // Find the weakest dimension (lowest score)
              if (totalDelta <= 0) {
                const weakestDimension = (Object.keys(RUBRIC) as RubricKey[]).reduce(
                  (weakest, key) => {
                    const currentScore = feedback.dimensions[key].score;
                    const weakestScore = feedback.dimensions[weakest].score;
                    return currentScore < weakestScore ? key : weakest;
                  }
                );

                return (
                  <div className="mt-4 p-4 rounded-lg bg-primary-200/10 border border-primary-200/30">
                    <p className="text-sm text-light-100">
                      <strong>💡 Tip:</strong> Your overall score hasn't improved
                      compared to your previous attempt. Consider focusing your next
                      revision on improving your <strong className="capitalize">{weakestDimension}</strong>{" "}
                      dimension, which currently has the lowest score (
                      {Math.round(feedback.dimensions[weakestDimension].score)}/100).
                    </p>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

