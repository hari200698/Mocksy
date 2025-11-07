"use client";

import { STARAnalysis } from "@/types/index";

interface STARBreakdownProps {
  starAnalysis: STARAnalysis;
}

const STARBreakdown = ({ starAnalysis }: STARBreakdownProps) => {
  const components = [
    { key: 'situation', label: 'Situation', weight: 15, emoji: '📍' },
    { key: 'task', label: 'Task', weight: 10, emoji: '🎯' },
    { key: 'action', label: 'Action', weight: 60, emoji: '⚡' },
    { key: 'result', label: 'Result', weight: 15, emoji: '📊' },
  ] as const;

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-gray-800 bg-green-50 border-green-300';
    if (score >= 60) return 'text-gray-800 bg-yellow-50 border-yellow-300';
    return 'text-gray-800 bg-red-50 border-red-300';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="border-2 border-blue-300 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* AI Error Warning */}
      {starAnalysis.metadata.modelUsed === 'rule-based' && starAnalysis.metadata.aiError && (
        <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <div className="flex items-start gap-2">
            <span className="text-yellow-600 text-lg flex-shrink-0">⚠️</span>
            <div>
              <p className="text-sm font-semibold text-yellow-900">AI Analysis Unavailable</p>
              <p className="text-xs text-yellow-800 mt-1">
                Using rule-based fallback. Error: {starAnalysis.metadata.aiError}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-900">STAR Framework Analysis</h3>
        <div className="text-right">
          <p className="text-3xl font-bold text-blue-600">
            {starAnalysis.overallSTARScore}/100
          </p>
          <p className="text-sm text-gray-700">
            Confidence: {Math.round(starAnalysis.overallConfidence * 100)}%
          </p>
        </div>
      </div>

      {/* STAR Components */}
      <div className="space-y-4">
        {components.map(({ key, label, weight, emoji }) => {
          const component = starAnalysis[key];
          const scoreColor = getScoreColor(component.score);
          const confidenceColor = getConfidenceColor(component.confidence);

          return (
            <div key={key} className={`border-2 rounded-lg p-4 ${scoreColor}`}>
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{emoji}</span>
                  <h4 className="text-xl font-bold text-gray-900">{label}</h4>
                  <span className="text-base font-semibold text-gray-700">({weight}% weight)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{component.score}/100</p>
                    <p className={`text-xs font-semibold ${confidenceColor}`}>
                      {component.present ? '✓ Present' : '✗ Missing'}
                      {' • '}
                      {Math.round(component.confidence * 100)}% confident
                    </p>
                  </div>
                </div>
              </div>

              {/* Excerpt (if present) */}
              {component.excerpt && (
                <div className="mb-3 p-2 bg-white rounded border border-gray-200">
                  <p className="text-sm font-semibold text-gray-600 mb-1">Your answer:</p>
                  <p className="text-base italic text-gray-700">"{component.excerpt}"</p>
                </div>
              )}

              {/* Feedback */}
              <div className="mb-2">
                <p className="text-base font-semibold text-gray-900 mb-1">Feedback:</p>
                <p className="text-base text-gray-800">{component.feedback}</p>
              </div>

              {/* Reasoning */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Why this score:</p>
                <p className="text-sm text-gray-800">{component.reasoning}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Critical Issues */}
      {starAnalysis.criticalIssues.length > 0 && (
        <div className="mt-4 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
          <h4 className="font-bold text-red-700 mb-2">⚠️ Critical Issues to Address:</h4>
          <ul className="list-disc list-inside space-y-1">
            {starAnalysis.criticalIssues.map((issue, index) => (
              <li key={index} className="text-sm text-red-700">{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Score Breakdown Explanation */}
      <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200 text-sm">
        <p className="font-semibold text-gray-900 mb-1">How your score is calculated:</p>
        <p className="text-gray-800">
          Situation ({components[0].weight}%) × {starAnalysis.situation.score} + 
          Task ({components[1].weight}%) × {starAnalysis.task.score} + 
          Action ({components[2].weight}%) × {starAnalysis.action.score} + 
          Result ({components[3].weight}%) × {starAnalysis.result.score} = 
          <span className="font-bold text-blue-700"> {starAnalysis.overallSTARScore}/100</span>
        </p>
        <p className="text-xs text-gray-700 mt-2">
          Note: Action is weighted most heavily (60%) because interviewers want to understand YOUR specific contributions.
        </p>
      </div>
    </div>
  );
};

export default STARBreakdown;
