"use client";

import { useState } from "react";
import { QuestionEvaluation, SummaryFeedback } from "@/types/index";
import QuestionFeedbackView from "./QuestionFeedbackView";
import SummaryView from "./SummaryView";

interface FeedbackTabsProps {
  questionEvaluations: QuestionEvaluation[];
  summaryFeedback: SummaryFeedback;
  company?: 'amazon' | 'google' | 'meta' | 'generic';
}

const FeedbackTabs = ({ questionEvaluations, summaryFeedback, company }: FeedbackTabsProps) => {
  const [activeTab, setActiveTab] = useState<'summary' | number>('summary');

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-2">
        {/* Summary Tab */}
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-4 py-2 rounded-t-lg font-semibold transition-colors ${
            activeTab === 'summary'
              ? 'bg-primary-200 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📊 Summary
        </button>

        {/* Question Tabs */}
        {questionEvaluations.map((evaluation, index) => {
          const starScore = evaluation.starAnalysis.overallSTARScore;
          const emoji = starScore >= 75 ? '✅' : starScore >= 60 ? '⚠️' : '❌';
          
          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-t-lg font-semibold transition-colors ${
                activeTab === index
                  ? 'bg-primary-200 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {emoji} Q{index + 1}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'summary' ? (
          <SummaryView 
            summaryFeedback={summaryFeedback}
            questionEvaluations={questionEvaluations}
            company={company}
          />
        ) : (
          <QuestionFeedbackView 
            evaluation={questionEvaluations[activeTab as number]}
            questionNumber={activeTab as number + 1}
            company={company}
          />
        )}
      </div>
    </div>
  );
};

export default FeedbackTabs;
