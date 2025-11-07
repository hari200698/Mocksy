"use client";

import { CompanyFeedbackAnalysis } from "@/types/index";

interface CompanyFeedbackSectionProps {
  companyFeedback: CompanyFeedbackAnalysis;
  company: 'amazon' | 'google' | 'meta';
}

const CompanyFeedbackSection = ({ companyFeedback, company }: CompanyFeedbackSectionProps) => {
  const companyName = company.charAt(0).toUpperCase() + company.slice(1);
  
  const getAlignmentColor = (alignment: 'strong' | 'moderate' | 'weak') => {
    switch (alignment) {
      case 'strong': return 'text-green-600 bg-green-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'weak': return 'text-red-600 bg-red-50';
    }
  };

  return (
    <div className="border-2 border-purple-400 rounded-lg p-6 bg-purple-50">
      <h3 className="text-xl font-bold text-purple-700 mb-4">
        🏢 {companyName}-Specific Feedback
      </h3>

      {/* What Company Looks For */}
      <div className="mb-4 p-3 bg-white rounded border border-purple-200">
        <p className="text-sm font-semibold text-purple-700 mb-1">
          What {companyName} looks for:
        </p>
        <p className="text-sm text-gray-700">{companyFeedback.whatCompanyLooksFor}</p>
      </div>

      {/* Alignment Score */}
      <div className={`mb-4 p-4 rounded-lg ${getAlignmentColor(companyFeedback.companyAlignment.overallAlignment)}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-lg">
              Alignment: {companyFeedback.companyAlignment.overallAlignment.toUpperCase()}
            </p>
            <p className="text-sm">
              Score: {companyFeedback.companyAlignment.alignmentScore}/100
            </p>
          </div>
        </div>
      </div>

      {/* Principles Met */}
      {companyFeedback.companyAlignment.principlesMet.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-green-700 mb-2">
            ✅ Principles Demonstrated:
          </h4>
          <div className="space-y-2">
            {companyFeedback.companyAlignment.principlesMet.map((principle, index) => (
              <div key={index} className="p-3 bg-green-50 border border-green-200 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-green-700">{principle.principle}</p>
                  <span className="text-xs px-2 py-1 bg-green-200 rounded">
                    {principle.strength.toUpperCase()}
                  </span>
                </div>
                {principle.evidence && (
                  <p className="text-sm text-gray-700 italic mb-1">
                    "{principle.evidence}"
                  </p>
                )}
                <p className="text-sm text-gray-700">{principle.feedback}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Principles Missed */}
      {companyFeedback.companyAlignment.principlesMissed.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-red-700 mb-2">
            ❌ Principles Not Demonstrated:
          </h4>
          <div className="space-y-2">
            {companyFeedback.companyAlignment.principlesMissed.map((principle, index) => (
              <div key={index} className="p-3 bg-red-50 border border-red-200 rounded">
                <p className="font-semibold text-red-700 mb-1">{principle.principle}</p>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Why:</span> {principle.reason}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">💡 Suggestion:</span> {principle.suggestion}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {companyFeedback.companySpecificFeedback.strengths.length > 0 && (
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <h4 className="font-semibold text-green-700 mb-2">💪 Strengths:</h4>
            <ul className="list-disc list-inside space-y-1">
              {companyFeedback.companySpecificFeedback.strengths.map((strength, index) => (
                <li key={index} className="text-sm text-gray-700">{strength}</li>
              ))}
            </ul>
          </div>
        )}

        {companyFeedback.companySpecificFeedback.improvements.length > 0 && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
            <h4 className="font-semibold text-yellow-700 mb-2">📈 Areas to Improve:</h4>
            <ul className="list-disc list-inside space-y-1">
              {companyFeedback.companySpecificFeedback.improvements.map((improvement, index) => (
                <li key={index} className="text-sm text-gray-700">{improvement}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Interview Tips */}
      {companyFeedback.companySpecificFeedback.interviewTips.length > 0 && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded">
          <h4 className="font-semibold text-blue-700 mb-2">
            💡 {companyName} Interview Tips:
          </h4>
          <ul className="list-disc list-inside space-y-1">
            {companyFeedback.companySpecificFeedback.interviewTips.map((tip, index) => (
              <li key={index} className="text-sm text-gray-700">{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CompanyFeedbackSection;
