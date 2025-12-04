"use client";

import { ImprovementPlan } from "@/types/index";

interface ImprovementPlanSectionProps {
  improvementPlan: ImprovementPlan;
}

// Component to render structured reflection content
const ReflectionContent = ({ content }: { content: string }) => {
  // Parse the content to find STAR components
  const starKeywords = [
    { key: 'SITUATION', icon: '📍', color: 'blue' },
    { key: 'TASK', icon: '🎯', color: 'green' },
    { key: 'ACTION', icon: '⚡', color: 'orange' },
    { key: 'RESULT', icon: '📊', color: 'purple' },
  ];

  // Check if content has STAR structure
  const hasStarStructure = starKeywords.some(({ key }) => 
    content.toUpperCase().includes(key)
  );

  if (!hasStarStructure) {
    // If no STAR structure, just display the content nicely
    return (
      <div className="bg-white rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
        {content}
      </div>
    );
  }

  // Extract the intro text (before first STAR keyword)
  const introMatch = content.match(/^(.*?)(?=First,|SITUATION|Situation)/is);
  const introText = introMatch ? introMatch[1].trim() : '';

  // Parse sections based on STAR keywords
  const sections: { title: string; icon: string; color: string; content: string }[] = [];
  
  // Split by STAR-related phrases
  const patterns = [
    { regex: /(?:First,?\s*)?(?:clearly\s+)?(?:define\s+the\s+)?SITUATION[:\s]*(.*?)(?=(?:Then,?\s*)?(?:state\s+the\s+)?(?:precise\s+)?TASK|$)/is, title: 'Situation', icon: '📍', color: 'blue' },
    { regex: /(?:Then,?\s*)?(?:state\s+the\s+)?(?:precise\s+)?TASK[:\s]*(.*?)(?=(?:Next,?\s*)?(?:detail\s+the\s+)?ACTION|$)/is, title: 'Task', icon: '🎯', color: 'green' },
    { regex: /(?:Next,?\s*)?(?:detail\s+the\s+)?ACTION[:\s]*(.*?)(?=(?:Finally,?\s*)?(?:explain\s+the\s+)?RESULT|$)/is, title: 'Action', icon: '⚡', color: 'amber' },
    { regex: /(?:Finally,?\s*)?(?:explain\s+the\s+)?RESULT[:\s]*(.*?)(?=Focus on|$)/is, title: 'Result', icon: '📊', color: 'purple' },
  ];

  patterns.forEach(({ regex, title, icon, color }) => {
    const match = content.match(regex);
    if (match && match[1]?.trim()) {
      sections.push({ title, icon, color, content: match[1].trim() });
    }
  });

  // Get the closing advice
  const closingMatch = content.match(/Focus on making this answer.*$/is);
  const closingText = closingMatch ? closingMatch[0].trim() : '';

  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
  };

  return (
    <div className="space-y-4">
      {/* Intro */}
      {introText && (
        <div className="bg-white rounded-lg p-4 text-sm text-gray-700 leading-relaxed border border-gray-100">
          {introText}
        </div>
      )}

      {/* STAR Sections */}
      {sections.length > 0 ? (
        <div className="grid gap-3">
          {sections.map((section, index) => {
            const colors = colorClasses[section.color] || colorClasses.blue;
            return (
              <div 
                key={index} 
                className={`${colors.bg} ${colors.border} border rounded-lg p-4`}
              >
                <div className={`flex items-center gap-2 font-semibold ${colors.text} mb-2`}>
                  <span>{section.icon}</span>
                  <span>{section.title}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
          {content}
        </div>
      )}

      {/* Closing Advice */}
      {closingText && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
          <div className="flex items-start gap-2">
            <span className="text-lg">💡</span>
            <p className="text-sm text-indigo-700 font-medium leading-relaxed">
              {closingText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

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
        <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-lg">
          <h4 className="font-semibold text-purple-700 mb-4 flex items-center gap-2">
            <span className="text-xl">💭</span> Reflection Exercise
          </h4>
          <ReflectionContent content={improvementPlan.reflectionExercise} />
        </div>
      )}
    </div>
  );
};

export default ImprovementPlanSection;
