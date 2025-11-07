"use client";

import { QuestionEvaluation } from "@/types/index";
import STARBreakdown from "./STARBreakdown";
import RedFlagsSection from "./RedFlagsSection";
import CompanyFeedbackSection from "./CompanyFeedbackSection";
import ImprovementPlanSection from "./ImprovementPlanSection";
import AnswerComparisonSection from "./AnswerComparisonSection";
import PrincipleInfoSection from "./PrincipleInfoSection";

interface QuestionFeedbackViewProps {
  evaluation: QuestionEvaluation;
  questionNumber: number;
  company?: 'amazon' | 'google' | 'meta' | 'generic';
}

const QuestionFeedbackView = ({ evaluation, questionNumber, company }: QuestionFeedbackViewProps) => {
  return (
    <div className="space-y-6">
      {/* Question Header - Modern Gradient Design */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-6 rounded-2xl border border-indigo-100/50 shadow-lg shadow-indigo-100/20">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
              <span className="text-white font-bold text-lg">{questionNumber}</span>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              Question {questionNumber}
            </h2>
          </div>
          
          <p className="text-gray-800 text-lg leading-relaxed font-medium mb-4 pl-1">
            {evaluation.question}
          </p>
          
          {evaluation.principle && (
            <div className="mt-4 pt-4 border-t border-indigo-200/60">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/60 backdrop-blur-sm border border-indigo-200/40">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Evaluates:</span>
                <span className="text-sm font-semibold text-indigo-800 capitalize">
                  {evaluation.principle
                    .replace(/([A-Z])/g, ' $1')
                    .trim()
                    .replace(/\s+/g, ' ')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Your Answer - Elegant Card Design */}
      <div className="relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-200/60 shadow-md hover:shadow-lg transition-all duration-300">
        {/* Subtle left border accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400"></div>
        
        <div className="pl-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Your Answer</h3>
          </div>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-7 whitespace-pre-wrap font-normal">
              {evaluation.mainAnswer}
            </p>
          </div>
        </div>
      </div>

      {/* STAR Breakdown - PRIMARY FOCUS */}
      <STARBreakdown starAnalysis={evaluation.starAnalysis} />

      {/* Principle Being Tested */}
      {company && evaluation.principle && (
        <PrincipleInfoSection 
          company={company}
          principle={evaluation.principle}
        />
      )}

      {/* Answer Comparison */}
      {(() => {
        console.log('🔍 [ANSWER-COMPARISON] Check:', {
          hasCompany: !!company,
          company,
          hasPrinciple: !!evaluation.principle,
          principle: evaluation.principle
        });
        
        return company && evaluation.principle ? (
          <AnswerComparisonSection 
            userAnswer={evaluation.combinedTranscript}
            starAnalysis={evaluation.starAnalysis}
            company={company}
            principle={evaluation.principle}
          />
        ) : (
          <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
            <p className="text-sm text-gray-700">
              ℹ️ Answer comparison not available 
              {!company && ' (no company specified)'}
              {!evaluation.principle && ' (no principle mapped)'}
            </p>
          </div>
        );
      })()}
    </div>
  );
};

export default QuestionFeedbackView;
