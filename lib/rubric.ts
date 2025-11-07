export type RubricKey = "structure" | "communication" | "impact" | "empathy" | "relevance";

export const RUBRIC: Record<RubricKey, { weight: number; description: string }> = {
  structure: {
    weight: 0.25,
    description: "Organization, clarity, logical flow, and structure of the response",
  },
  communication: {
    weight: 0.2,
    description: "Clarity, articulation, effective use of language, and ability to convey ideas",
  },
  impact: {
    weight: 0.2,
    description: "Significance, value, and measurable results of the response",
  },
  empathy: {
    weight: 0.15,
    description: "Understanding, consideration of others' perspectives, and emotional intelligence",
  },
  relevance: {
    weight: 0.2,
    description: "How well the answer addresses the question and stays on topic",
  },
} as const;




