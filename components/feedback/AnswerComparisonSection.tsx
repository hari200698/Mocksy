"use client";

import { useState } from "react";
import { STARAnalysis } from "@/types/index";
import { getExampleAnswer, compareAnswers } from "@/lib/example-answers";

interface AnswerComparisonSectionProps {
  userAnswer: string;
  starAnalysis: STARAnalysis;
  company: 'amazon' | 'google' | 'meta' | 'generic';
  principle: string;
}

const AnswerComparisonSection = ({ 
  userAnswer, 
  starAnalysis, 
  company, 
  principle 
}: AnswerComparisonSectionProps) => {
  const [showComparison, setShowComparison] = useState(true); // Changed to true - show by default
  
  const exampleAnswer = getExampleAnswer(company, principle);
  
  if (!exampleAnswer) return null;

  const comparison = compareAnswers(userAnswer, starAnalysis, exampleAnswer);

  return (
    <div className="border-2 border-green-300 rounded-lg p-6 bg-green-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">
          📊 Compare with Strong Example
        </h3>
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm"
        >
          {showComparison ? 'Hide Comparison' : 'Show Example Answer'}
        </button>
      </div>

      {showComparison && (
        <div className="space-y-4">
          {/* Overall Gap */}
          <div className="p-3 bg-white border border-green-300 rounded">
            <p className="font-semibold text-gray-900 mb-1">Overall Assessment:</p>
            <p className="text-sm text-gray-800">{comparison.overallGap}</p>
          </div>

          {/* Side-by-Side Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Your Answer */}
            <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">Your Answer</h4>
              <p className="text-sm text-gray-800 whitespace-pre-wrap max-h-96 overflow-y-auto">
                {comparison.userAnswer}
              </p>
            </div>

            {/* Example Answer */}
            <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">Strong Example Answer</h4>
              <p className="text-sm text-gray-800 whitespace-pre-wrap max-h-96 overflow-y-auto">
                {comparison.exampleAnswer.strongAnswer}
              </p>
            </div>
          </div>

          {/* Why It's Strong */}
          <div className="p-4 bg-white border border-green-300 rounded">
            <h4 className="font-semibold text-gray-900 mb-2">
              ✨ Why This Example is Strong:
            </h4>
            <ul className="list-disc list-inside space-y-1">
              {comparison.exampleAnswer.whyItsStrong.map((reason, index) => (
                <li key={index} className="text-sm text-gray-800">{reason}</li>
              ))}
            </ul>
          </div>

          {/* STAR Breakdown of Example */}
          <div className="p-4 bg-white border border-green-300 rounded">
            <h4 className="font-semibold text-gray-900 mb-3">
              🎯 STAR Breakdown of Example:
            </h4>
            <div className="space-y-2">
              <div>
                <p className="text-xs font-semibold text-gray-600">Situation (15%):</p>
                <p className="text-sm text-gray-700 bg-blue-50 p-2 rounded">
                  {comparison.exampleAnswer.starBreakdown.situation}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600">Task (10%):</p>
                <p className="text-sm text-gray-700 bg-blue-50 p-2 rounded">
                  {comparison.exampleAnswer.starBreakdown.task}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600">Action (60%):</p>
                <p className="text-sm text-gray-700 bg-blue-50 p-2 rounded">
                  {comparison.exampleAnswer.starBreakdown.action}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600">Result (15%):</p>
                <p className="text-sm text-gray-700 bg-blue-50 p-2 rounded">
                  {comparison.exampleAnswer.starBreakdown.result}
                </p>
              </div>
            </div>
          </div>

          {/* Specific Differences */}
          {comparison.differences.length > 0 && (
            <div className="p-4 bg-orange-50 border border-orange-300 rounded">
              <h4 className="font-semibold text-gray-900 mb-2">
                🔍 Specific Gaps to Address:
              </h4>
              <div className="space-y-3">
                {comparison.differences.map((diff, index) => (
                  <div key={index} className="p-3 bg-white rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{diff.userHas ? '✅' : '❌'}</span>
                      <p className="font-semibold text-gray-900">{diff.category}</p>
                    </div>
                    <p className="text-sm text-gray-800 ml-7">{diff.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnswerComparisonSection;
