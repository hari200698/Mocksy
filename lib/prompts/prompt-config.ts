/**
 * Prompt Version Configuration
 * 
 * This file manages which prompt versions are active in the system.
 * Allows for A/B testing and systematic prompt iteration.
 */

export interface PromptVersion {
  version: string;
  filePath: string;
  description: string;
  activatedAt: string;
  metrics?: {
    avgConfidence?: number;
    avgAccuracy?: number;
    avgLatency?: number;
    tokenUsage?: number;
  };
}

export interface PromptConfig {
  starDetection: PromptVersion;
  followupGeneration: PromptVersion;
  redFlagDetection: PromptVersion;
  companyFeedback: PromptVersion;
}

export const ACTIVE_PROMPTS: PromptConfig = {
  starDetection: {
    version: 'v1',
    filePath: 'lib/prompts/star-detection-v1.md',
    description: 'Initial STAR detection with confidence scoring',
    activatedAt: '2025-01-15',
  },
  followupGeneration: {
    version: 'v1',
    filePath: 'lib/prompts/followup-generation-v1.md',
    description: 'Dynamic follow-up generation based on STAR gaps',
    activatedAt: '2025-01-15',
  },
  redFlagDetection: {
    version: 'v1',
    filePath: 'lib/prompts/redflag-detection-v1.md',
    description: 'Detects FAANG interview red flags',
    activatedAt: '2025-01-15',
  },
  companyFeedback: {
    version: 'v1',
    filePath: 'lib/prompts/company-feedback-v1.md',
    description: 'Company-specific principle mapping and feedback',
    activatedAt: '2025-01-15',
  },
};

/**
 * Get the active prompt version for a specific type
 */
export function getActivePromptVersion(type: keyof PromptConfig): PromptVersion {
  return ACTIVE_PROMPTS[type];
}

/**
 * Update metrics for a prompt version (for tracking performance)
 */
export function updatePromptMetrics(
  type: keyof PromptConfig,
  metrics: Partial<PromptVersion['metrics']>
): void {
  if (ACTIVE_PROMPTS[type].metrics) {
    ACTIVE_PROMPTS[type].metrics = {
      ...ACTIVE_PROMPTS[type].metrics,
      ...metrics,
    };
  } else {
    ACTIVE_PROMPTS[type].metrics = metrics;
  }
}

/**
 * Get all prompt versions for documentation/comparison
 */
export function getAllPromptVersions(): PromptConfig {
  return ACTIVE_PROMPTS;
}
