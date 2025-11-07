"use client";

import { SummaryFeedback, QuestionEvaluation } from "@/types/index";

interface SummaryViewProps {
  summaryFeedback: SummaryFeedback;
  questionEvaluations: QuestionEvaluation[];
  company?: 'amazon' | 'google' | 'meta' | 'generic';
}

const SummaryView = ({ summaryFeedback, questionEvaluations, company }: SummaryViewProps) => {
  const companyName = company 
    ? company.charAt(0).toUpperCase() + company.slice(1)
    : 'General';

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 75) return 'bg-green-50 border-green-300';
    if (score >= 60) return 'bg-yellow-50 border-yellow-300';
    return 'bg-red-50 border-red-300';
  };

  return (
    <div className="space-y-6">
      {/* Overall Performance */}
      <div className="rounded-xl p-8 bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Overall Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-gray-700 mb-2">Overall Score</p>
            <p className={`text-6xl font-bold ${getScoreColor(summaryFeedback.overallSTARScore)}`}>
              {summaryFeedback.overallSTARScore}/100
            </p>
            <p className="text-sm text-gray-600 mt-3">
              Evaluated on STAR framework
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-gray-700 mb-2">AI Confidence</p>
            <p className="text-5xl font-bold text-blue-700">
              {Math.round(summaryFeedback.overallConfidence * 100)}%
            </p>
            <p className="text-sm text-gray-600 mt-3">
              How confident the AI is in its evaluation
            </p>
          </div>
        </div>
      </div>

      {/* Company Alignment */}
      {summaryFeedback.companyAlignmentSummary && company && (
        <div className="border-2 border-purple-300 rounded-lg p-6 bg-purple-50">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={`/covers/${company}.png`}
              alt={`${companyName} logo`}
              className="w-10 h-10 object-contain rounded-lg bg-white p-1.5"
            />
            <h3 className="text-xl font-bold text-purple-700">
              {companyName?.toUpperCase()} ALIGNMENT
            </h3>
          </div>
          <div className="space-y-3 text-gray-700 whitespace-pre-line leading-relaxed">
            {summaryFeedback.companyAlignmentSummary}
          </div>
        </div>
      )}



      {/* Strength Areas */}
      {summaryFeedback.strengthAreas.length > 0 && (
        <div className="border-2 border-green-300 rounded-lg p-6 bg-green-50">
          <h3 className="text-xl font-bold text-green-700 mb-3">
            💪 Your Strengths
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {summaryFeedback.strengthAreas.map((strength, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-white rounded">
                <span className="text-green-600 text-xl">✓</span>
                <p className="text-sm text-gray-700">{strength}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Critical Issues */}
      {summaryFeedback.criticalIssues.length > 0 && (
        <div className="border-2 border-red-300 rounded-lg p-6 bg-red-50">
          <h3 className="text-xl font-bold text-red-700 mb-3">
            🚨 Critical Issues (Appearing in Multiple Answers)
          </h3>
          <ul className="list-disc list-inside space-y-2">
            {summaryFeedback.criticalIssues.map((issue, index) => (
              <li key={index} className="text-sm text-red-700">{issue}</li>
            ))}
          </ul>
          <p className="text-xs text-red-600 mt-3">
            These issues appeared in more than half of your answers. Addressing them will significantly improve your performance.
          </p>
        </div>
      )}



      {/* Next Steps */}
      <div className="border-2 border-blue-300 rounded-lg p-6 bg-blue-50">
        <h3 className="text-xl font-bold text-blue-700 mb-3">
          🎯 Your Next Steps
        </h3>
        <ol className="list-decimal list-inside space-y-2">
          {summaryFeedback.nextSteps.map((step, index) => (
            <li key={index} className="text-sm text-gray-700 pl-2">{step}</li>
          ))}
        </ol>
      </div>

      {/* Personalized Improvement Plan */}
      {questionEvaluations.length > 0 && questionEvaluations[0].improvementPlan && (
        <div className="border-2 border-indigo-300 rounded-lg p-6 bg-indigo-50">
          <h3 className="text-xl font-bold text-indigo-700 mb-4">
            📚 Personalized Improvement Plan
          </h3>
          
          {/* Weakest Areas */}
          {questionEvaluations[0].improvementPlan.weakestAreas.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Focus Areas:</h4>
              <ul className="list-disc list-inside space-y-1">
                {questionEvaluations[0].improvementPlan.weakestAreas.map((area, index) => (
                  <li key={index} className="text-sm text-gray-700">{area}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Practice Questions */}
          {questionEvaluations[0].improvementPlan.practiceQuestions.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Practice Questions:</h4>
              <ul className="list-decimal list-inside space-y-1">
                {questionEvaluations[0].improvementPlan.practiceQuestions.map((question, index) => (
                  <li key={index} className="text-sm text-gray-700">{question}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Resources */}
          {questionEvaluations[0].improvementPlan.resources.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Recommended Resources:</h4>
              <div className="space-y-2">
                {questionEvaluations[0].improvementPlan.resources.map((resource, index) => (
                  <div key={index} className="p-3 bg-white rounded border border-indigo-200">
                    <p className="font-semibold text-sm text-indigo-700">{resource.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{resource.description}</p>
                    {resource.url && (
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline mt-1 block font-medium"
                      >
                        View Resource →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reflection Exercise */}
          {questionEvaluations[0].improvementPlan.reflectionExercise && (
            <div className="p-3 bg-white rounded border border-indigo-200">
              <h4 className="font-semibold text-gray-800 mb-2">💭 Reflection Exercise:</h4>
              <p className="text-sm text-gray-700">{questionEvaluations[0].improvementPlan.reflectionExercise}</p>
            </div>
          )}
        </div>
      )}

      {/* Performance Insights */}
      <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
        <h3 className="text-xl font-bold text-gray-700 mb-3">
          📊 Performance Insights
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white rounded">
            <p className="text-2xl font-bold text-primary-200">
              {questionEvaluations.length}
            </p>
            <p className="text-xs text-gray-600">Questions Answered</p>
          </div>
          <div className="text-center p-3 bg-white rounded">
            <p className="text-2xl font-bold text-green-600">
              {questionEvaluations.filter(q => q.starAnalysis.overallSTARScore >= 75).length}
            </p>
            <p className="text-xs text-gray-600">Strong Answers (≥75)</p>
          </div>
          <div className="text-center p-3 bg-white rounded">
            <p className="text-2xl font-bold text-yellow-600">
              {questionEvaluations.filter(q => 
                q.starAnalysis.overallSTARScore >= 60 && 
                q.starAnalysis.overallSTARScore < 75
              ).length}
            </p>
            <p className="text-xs text-gray-600">Moderate (60-74)</p>
          </div>
          <div className="text-center p-3 bg-white rounded">
            <p className="text-2xl font-bold text-red-600">
              {questionEvaluations.filter(q => q.starAnalysis.overallSTARScore < 60).length}
            </p>
            <p className="text-xs text-gray-600">Needs Work (&lt;60)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryView;
