"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RegenerateFeedbackPage() {
  const [interviewId, setInterviewId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRegenerate = async () => {
    if (!interviewId.trim()) {
      setError("Please enter an interview ID");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`/api/debug/regenerate-feedback/${interviewId}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to regenerate feedback");
        return;
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">
          🔄 Regenerate Interview Feedback
        </h1>
        <p className="text-gray-600 mb-6">
          Test new prompts and feedback logic without conducting a new interview
        </p>

        <div className="space-y-4">
          {/* Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Interview ID
            </label>
            <input
              type="text"
              value={interviewId}
              onChange={(e) => setInterviewId(e.target.value)}
              placeholder="Enter interview ID (e.g., MvZp4MzBMLqGPbnIF6Pl)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              You can find the interview ID in the URL: /interview/[ID]/feedback
            </p>
          </div>

          {/* Button */}
          <Button
            onClick={handleRegenerate}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Regenerating..." : "Regenerate Feedback"}
          </Button>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-300 rounded-lg">
              <p className="text-sm font-semibold text-red-700">Error:</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Success */}
          {result && (
            <div className="p-4 bg-green-50 border border-green-300 rounded-lg space-y-3">
              <div>
                <p className="text-sm font-semibold text-green-700">✅ Success!</p>
                <p className="text-sm text-gray-700">{result.message}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded">
                  <p className="text-xs text-gray-600">Overall Score</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {result.newFeedback.overallScore}/100
                  </p>
                </div>
                <div className="p-3 bg-white rounded">
                  <p className="text-xs text-gray-600">Questions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {result.newFeedback.questionCount}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  New Features Applied:
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {result.changes.features.map((feature: string, index: number) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => window.open(result.viewUrl, '_blank')}
                className="btn-primary w-full"
              >
                View Updated Feedback
              </Button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            📋 How to Use:
          </h3>
          <ol className="text-xs text-gray-700 space-y-1 list-decimal list-inside">
            <li>Complete an interview to generate initial feedback</li>
            <li>Copy the interview ID from the URL</li>
            <li>Paste it here and click "Regenerate Feedback"</li>
            <li>The system will use the existing transcript but apply latest prompts</li>
            <li>View the updated feedback to see changes</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
