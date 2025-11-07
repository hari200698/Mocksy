import { RUBRIC, RubricKey } from "@/lib/rubric";

/**
 * Builds a prompt for evaluating an answer using the rubric.
 * @param question - The interview question being answered
 * @param currentAnswer - The current answer to evaluate
 * @param previousAnswer - Optional previous answer to compare against
 * @returns A formatted prompt string for the AI model
 */
export function buildEvaluatePrompt(
  question: string,
  currentAnswer: string,
  previousAnswer?: string
): string {
  const rubricInstructions = Object.entries(RUBRIC)
    .map(
      ([key, { weight, description }]) =>
        `- **${key}** (${(weight * 100).toFixed(0)}%): ${description}`
    )
    .join("\n");

  let prompt = `You are an AI coach evaluating an interview answer. Evaluate the candidate's response using the following rubric:

${rubricInstructions}

**Question:** ${question}

**Answer to Evaluate:** ${currentAnswer}

Please evaluate this answer and provide a JSON response with the following structure:
{
  "summary": "A brief overall summary of the answer's quality",
  "dimensions": {
    "structure": { "score": <0-100>, "feedback": "<detailed feedback>" },
    "communication": { "score": <0-100>, "feedback": "<detailed feedback>" },
    "impact": { "score": <0-100>, "feedback": "<detailed feedback>" },
    "empathy": { "score": <0-100>, "feedback": "<detailed feedback>" },
    "relevance": { "score": <0-100>, "feedback": "<detailed feedback>" }
  },
  "total": <weighted average score 0-100>
}

Be thorough and constructive in your feedback. Point out specific strengths and areas for improvement in each dimension.`;

  if (previousAnswer) {
    prompt += `

**Previous Answer (for comparison):** ${previousAnswer}

Compare the current answer with the previous answer. In your evaluation, highlight:
- Specific improvements made in the current answer
- Areas where the candidate has made progress
- Any remaining areas that need work
- How the overall quality has changed between the two attempts`;
  }

  return prompt;
}




