"use client";

import { RedFlagAnalysis } from "@/types/index";

interface RedFlagsSectionProps {
  redFlags: RedFlagAnalysis;
}

const RedFlagsSection = ({ redFlags }: RedFlagsSectionProps) => {
  if (redFlags.redFlags.length === 0) return null;

  const getSeverityColor = (severity: 'critical' | 'major' | 'minor') => {
    switch (severity) {
      case 'critical': return 'bg-red-50 border-red-400 text-gray-900';
      case 'major': return 'bg-orange-50 border-orange-400 text-gray-900';
      case 'minor': return 'bg-yellow-50 border-yellow-400 text-gray-900';
    }
  };

  const getSeverityEmoji = (severity: 'critical' | 'major' | 'minor') => {
    switch (severity) {
      case 'critical': return '🚨';
      case 'major': return '⚠️';
      case 'minor': return '⚡';
    }
  };

  return (
    <div className="border-2 border-red-300 rounded-lg p-6 bg-red-50">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        🚩 Red Flags Detected
      </h3>
      
      <p className="text-sm text-gray-800 mb-4">
        {redFlags.summary}
      </p>

      <div className="space-y-3">
        {redFlags.redFlags.map((flag, index) => (
          <div 
            key={index}
            className={`border-l-4 p-4 rounded ${getSeverityColor(flag.severity)}`}
          >
            <div className="flex items-start gap-2">
              <span className="text-xl">{getSeverityEmoji(flag.severity)}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold capitalize text-gray-900">
                    {flag.type.replace(/_/g, ' ')}
                  </h4>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-white text-gray-800">
                    {flag.severity.toUpperCase()}
                  </span>
                </div>
                
                {flag.evidence && (
                  <p className="text-sm mb-2 text-gray-800">
                    <span className="font-semibold">Evidence:</span> {flag.evidence}
                  </p>
                )}
                
                <p className="text-sm mb-2 text-gray-800">
                  <span className="font-semibold">Why this matters:</span> {flag.explanation}
                </p>
                
                <div className="mt-2 p-2 bg-white rounded">
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold">💡 How to fix:</span> {flag.suggestion}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {redFlags.positiveSignals.length > 0 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-300 rounded">
          <h4 className="font-semibold text-gray-900 mb-2">✅ Positive Signals:</h4>
          <ul className="list-disc list-inside space-y-1">
            {redFlags.positiveSignals.map((signal, index) => (
              <li key={index} className="text-sm text-gray-800">{signal}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RedFlagsSection;
