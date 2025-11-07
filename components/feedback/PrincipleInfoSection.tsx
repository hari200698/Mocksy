"use client";

import { getPrincipleDescription, formatPrincipleName } from "@/lib/principle-descriptions";

interface PrincipleInfoSectionProps {
  company: 'amazon' | 'google' | 'meta' | 'generic';
  principle: string;
}

const PrincipleInfoSection = ({ company, principle }: PrincipleInfoSectionProps) => {
  const principleInfo = getPrincipleDescription(company, principle);
  
  if (!principleInfo) {
    // Fallback if principle description not found
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 rounded-2xl border border-blue-200/60 shadow-md">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
              <span className="text-white text-xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              Principle Being Tested
            </h3>
          </div>
          <p className="text-gray-700 text-base leading-relaxed">
            {formatPrincipleName(principle)}
          </p>
        </div>
      </div>
    );
  }

  // Company-specific colors
  const companyColors = {
    amazon: {
      gradient: 'from-orange-50 via-yellow-50 to-orange-50',
      border: 'border-orange-200/60',
      iconGradient: 'from-orange-500 to-yellow-600',
      textGradient: 'from-orange-700 to-yellow-700',
      bulletBg: 'bg-orange-100',
      bulletText: 'text-orange-700',
    },
    google: {
      gradient: 'from-blue-50 via-green-50 to-blue-50',
      border: 'border-blue-200/60',
      iconGradient: 'from-blue-500 to-green-600',
      textGradient: 'from-blue-700 to-green-700',
      bulletBg: 'bg-blue-100',
      bulletText: 'text-blue-700',
    },
    meta: {
      gradient: 'from-blue-50 via-indigo-50 to-blue-50',
      border: 'border-blue-200/60',
      iconGradient: 'from-blue-600 to-indigo-600',
      textGradient: 'from-blue-700 to-indigo-700',
      bulletBg: 'bg-blue-100',
      bulletText: 'text-blue-700',
    },
    generic: {
      gradient: 'from-purple-50 via-pink-50 to-purple-50',
      border: 'border-purple-200/60',
      iconGradient: 'from-purple-500 to-pink-600',
      textGradient: 'from-purple-700 to-pink-700',
      bulletBg: 'bg-purple-100',
      bulletText: 'text-purple-700',
    },
  };

  const colors = companyColors[company];

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${colors.gradient} p-6 rounded-2xl border ${colors.border} shadow-md hover:shadow-lg transition-all duration-300`}>
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${colors.iconGradient} shadow-md`}>
            <span className="text-white text-xl">🎯</span>
          </div>
          <h3 className={`text-xl font-bold bg-gradient-to-r ${colors.textGradient} bg-clip-text text-transparent`}>
            Principle Being Tested
          </h3>
        </div>

        {/* Principle Name */}
        <div className="mb-4 pb-4 border-b border-gray-200/60">
          <h4 className="text-2xl font-bold text-gray-900 mb-1">
            {principleInfo.name}
          </h4>
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            {company === 'amazon' && 'Amazon Leadership Principle'}
            {company === 'google' && 'Google Core Value'}
            {company === 'meta' && 'Meta Core Value'}
            {company === 'generic' && 'Core Competency'}
          </p>
        </div>

        {/* Description */}
        <div className="mb-5">
          <p className="text-gray-800 text-base leading-relaxed font-normal">
            {principleInfo.description}
          </p>
        </div>

        {/* What Interviewers Look For */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/40">
          <h5 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-lg">✨</span>
            What Interviewers Look For:
          </h5>
          <ul className="space-y-2">
            {principleInfo.whatInterviewersLookFor.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-6 h-6 rounded-full ${colors.bulletBg} flex items-center justify-center mt-0.5`}>
                  <span className={`text-xs font-bold ${colors.bulletText}`}>
                    {index + 1}
                  </span>
                </span>
                <span className="text-gray-800 text-sm leading-relaxed font-normal flex-1">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrincipleInfoSection;
