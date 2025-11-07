"use client";

import { ImprovementPlan } from "@/types/index";

interface ImprovementPlanSectionProps {
  improvementPlan: ImprovementPlan;
}

const ImprovementPlanSection = ({ improvementPlan }: ImprovementPlanSectionProps) => {
  return (
    <div className="border-2 border-blue-400 rounded-lg p-6 bg-blue-50">
      <h3 className="text-xl font-bold text-blue-700 mb-4">
        🎯 Your Personalized Improvement Plan
      </h3>

      {/* Weakest Areas */}
      {improvementPlan.weakestAreas.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-blue-700 mb-2">Focus Areas:</h4>
          <div className="space-y-2">
            {improvementPlan.weakestAreas.map((area, index) => (
              <div key={index} className="flex items-start gap-2 p-2 bg-white rounded">
                <span className="text-blue-600 font-bold">{index + 1}.</span>
                <p className="text-sm text-gray-700">{area}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Practice Questions */}
      {improvementPlan.practiceQuestions.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-blue-700 mb-2">
            📝 Recommended Practice Questions:
          </h4>
          <ul className="list-disc list-inside space-y-1 bg-white p-3 rounded">
            {improvementPlan.practiceQuestions.map((question, index) => (
              <li key={index} className="text-sm text-gray-700">{question}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Resources */}
      {improvementPlan.resources.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-blue-700 mb-2">
            📚 Learning Resources:
          </h4>
          <div className="space-y-2">
            {improvementPlan.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-white border border-blue-200 rounded hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <span className="text-xl">
                    {resource.type === 'video' ? '🎥' : resource.type === 'article' ? '📄' : '✏️'}
                  </span>
                  <div>
                    <p className="font-semibold text-blue-700">{resource.title}</p>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Reflection Exercise */}
      {improvementPlan.reflectionExercise && (
        <div className="p-4 bg-yellow-50 border border-yellow-300 rounded">
          <h4 className="font-semibold text-yellow-700 mb-3">
            🤔 Reflection Exercise:
          </h4>
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {improvementPlan.reflectionExercise}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImprovementPlanSection;
