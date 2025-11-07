import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { readFileSync } from "fs";
import { join } from "path";
import { getActivePromptVersion } from "./prompts/prompt-config";
import { STARAnalysis } from "./star-analyzer";

export interface FollowUpQuestion {
  question: string;
  reason: string;
  priority: 1 | 2 | 3;
  targetComponent: 'situation' | 'task' | 'action' | 'result';
  type: 'missing_component' | 'personal_contribution' | 'missing_metrics' | 'depth_probe' | 'clarification';
}

export interface FollowUpResponse {
  followUps: FollowUpQuestion[];
  maxFollowUps: number;
  reasoning: string;
  metadata: {
    promptVersion: string;
    modelUsed: string;
    tokensUsed: number;
    latencyMs: number;
    timestamp: string;
  };
}

/**
 * Generates follow-up questions based on STAR analysis
 */
export async function generateFollowUps(
  question: string,
  answer: string,
  starAnalysis: STARAnalysis,
  company?: string
): Promise<FollowUpResponse> {
  const startTime = Date.now();
  const promptVersion = getActivePromptVersion('followupGeneration');

  try {
    // Load the prompt template
    const promptTemplate = readFileSync(
      join(process.cwd(), promptVersion.filePath),
      'utf-8'
    );

    // Build context about what's missing
    const gaps = identifyGaps(starAnalysis);

    // Build the full prompt
    const fullPrompt = `${promptTemplate}

---

## Interview Context
**Company**: ${company ? company.toUpperCase() : 'Generic'}
**Original Question**: ${question}

## Candidate's Answer
${answer}

## STAR Analysis Results
${JSON.stringify({
  situation: {
    present: starAnalysis.situation.present,
    score: starAnalysis.situation.score,
    confidence: starAnalysis.situation.confidence,
  },
  task: {
    present: starAnalysis.task.present,
    score: starAnalysis.task.score,
    confidence: starAnalysis.task.confidence,
  },
  action: {
    present: starAnalysis.action.present,
    score: starAnalysis.action.score,
    confidence: starAnalysis.action.confidence,
  },
  result: {
    present: starAnalysis.result.present,
    score: starAnalysis.result.score,
    confidence: starAnalysis.result.confidence,
  },
  criticalIssues: starAnalysis.criticalIssues,
}, null, 2)}

## Identified Gaps
${gaps.join('\n')}

---

Generate 1-3 follow-up questions to address the most critical gaps. Return the JSON response as specified in the prompt above.`;

    // Call the AI model - Using Gemini 2.0 Flash for analysis
    const { text, usage } = await generateText({
      model: google("gemini-2.0-flash-exp"),
      prompt: fullPrompt,
      temperature: 0.4, // Slightly higher for more natural question variety
    });

    const latencyMs = Date.now() - startTime;

    // Parse the response
    let parsedResponse: any;
    try {
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedResponse = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse follow-up response:', text);
      throw new Error('Invalid JSON response from follow-up generation');
    }

    const response: FollowUpResponse = {
      followUps: parsedResponse.followUps || [],
      maxFollowUps: parsedResponse.maxFollowUps || 2,
      reasoning: parsedResponse.reasoning || '',
      metadata: {
        promptVersion: promptVersion.version,
        modelUsed: 'gemini-1.5-pro-latest',
        tokensUsed: usage?.totalTokens || 0,
        latencyMs,
        timestamp: new Date().toISOString(),
      },
    };

    // Limit to maxFollowUps
    response.followUps = response.followUps.slice(0, response.maxFollowUps);

    return response;
  } catch (error) {
    console.error('Error generating follow-ups:', error);
    
    // Fallback to rule-based follow-ups
    return fallbackFollowUps(question, answer, starAnalysis, company, Date.now() - startTime);
  }
}

/**
 * Identify gaps in the STAR framework
 */
function identifyGaps(starAnalysis: STARAnalysis): string[] {
  const gaps: string[] = [];

  if (!starAnalysis.situation.present || starAnalysis.situation.score < 60) {
    gaps.push('- Situation: Missing or weak context setting');
  }

  if (!starAnalysis.task.present || starAnalysis.task.score < 60) {
    gaps.push('- Task: Unclear goal or responsibility');
  }

  if (!starAnalysis.action.present || starAnalysis.action.score < 60) {
    gaps.push('- Action: Missing personal actions or too much "we" language');
  }

  if (!starAnalysis.result.present || starAnalysis.result.score < 60) {
    gaps.push('- Result: Missing measurable outcomes or metrics');
  }

  starAnalysis.criticalIssues.forEach(issue => {
    gaps.push(`- Critical: ${issue}`);
  });

  return gaps;
}

/**
 * Fallback rule-based follow-up generation
 */
function fallbackFollowUps(
  question: string,
  answer: string,
  starAnalysis: STARAnalysis,
  company: string | undefined,
  latencyMs: number
): FollowUpResponse {
  const followUps: FollowUpQuestion[] = [];

  // Priority 1: Missing or weak Result
  if (!starAnalysis.result.present || starAnalysis.result.score < 60) {
    followUps.push({
      question: "What was the measurable outcome of your actions? Can you share specific metrics or data?",
      reason: "Result component is missing or lacks quantifiable metrics",
      priority: 1,
      targetComponent: 'result',
      type: 'missing_metrics',
    });
  }

  // Priority 1: Weak Action or "we" language
  if (!starAnalysis.action.present || starAnalysis.action.score < 60 || 
      starAnalysis.criticalIssues.some(issue => issue.includes('we'))) {
    followUps.push({
      question: "What was YOUR specific role in this? Walk me through the actions YOU personally took.",
      reason: "Action component needs clarification on personal contribution",
      priority: 1,
      targetComponent: 'action',
      type: 'personal_contribution',
    });
  }

  // Priority 2: Missing Situation
  if (!starAnalysis.situation.present || starAnalysis.situation.score < 60) {
    followUps.push({
      question: "Can you set more context about the situation? When did this happen and what led to it?",
      reason: "Situation component is missing or weak",
      priority: 2,
      targetComponent: 'situation',
      type: 'missing_component',
    });
  }

  // Priority 2: Depth probe
  if (followUps.length < 2) {
    followUps.push({
      question: "What was the biggest challenge you faced, and how did you overcome it?",
      reason: "Testing depth of experience and problem-solving",
      priority: 2,
      targetComponent: 'action',
      type: 'depth_probe',
    });
  }

  return {
    followUps: followUps.slice(0, 2), // Limit to 2
    maxFollowUps: 2,
    reasoning: 'Using fallback rule-based follow-up generation',
    metadata: {
      promptVersion: 'fallback',
      modelUsed: 'rule-based',
      tokensUsed: 0,
      latencyMs,
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * Generate company-specific follow-ups
 */
export function getCompanySpecificFollowUp(
  company: string,
  starAnalysis: STARAnalysis
): FollowUpQuestion | null {
  const companyLower = company.toLowerCase();

  if (companyLower === 'amazon') {
    if (starAnalysis.result.score < 70) {
      return {
        question: "What data or metrics drove your decision-making in this situation?",
        reason: "Amazon values data-driven decisions (Dive Deep principle)",
        priority: 1,
        targetComponent: 'action',
        type: 'clarification',
      };
    }
  } else if (companyLower === 'google') {
    if (starAnalysis.action.score < 70) {
      return {
        question: "How did you collaborate with other teams or stakeholders on this?",
        reason: "Google values collaboration and cross-functional work",
        priority: 1,
        targetComponent: 'action',
        type: 'clarification',
      };
    }
  } else if (companyLower === 'meta') {
    if (starAnalysis.result.score < 70) {
      return {
        question: "How did you prioritize this work for maximum impact? What was the ROI?",
        reason: "Meta values focus on impact and measurable results",
        priority: 1,
        targetComponent: 'result',
        type: 'missing_metrics',
      };
    }
  }

  return null;
}
