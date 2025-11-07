import { analyzeSTAR, STARAnalysis } from "./star-analyzer";
import { generateFollowUps, FollowUpResponse } from "./followup-generator";
import { CompanyType } from "./company-profiles";
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface QuestionEvaluation {
  questionId: string;
  question: string;
  principle?: string; // Which principle this question tests
  mainAnswer: string;
  followUps: Array<{
    question: string;
    answer: string;
    reason: string;
  }>;
  combinedTranscript: string;
  starAnalysis: STARAnalysis;
  followUpSuggestions?: FollowUpResponse;
  redFlags?: RedFlagAnalysis;
  companyFeedback?: CompanyFeedbackAnalysis;
  improvementPlan?: ImprovementPlan;
  metadata: EvaluationMetadata;
}

export interface RedFlagAnalysis {
  redFlags: Array<{
    type: string;
    severity: 'critical' | 'major' | 'minor';
    evidence: string;
    explanation: string;
    suggestion: string;
  }>;
  overallConcern: 'critical' | 'major' | 'minor' | 'none';
  summary: string;
  positiveSignals: string[];
  metadata?: {
    tokensUsed?: number;
  };
}

export interface CompanyFeedbackAnalysis {
  companyAlignment: {
    principlesMet: Array<{
      principle: string;
      evidence: string;
      strength: 'high' | 'medium' | 'low';
      feedback: string;
    }>;
    principlesMissed: Array<{
      principle: string;
      reason: string;
      suggestion: string;
    }>;
    overallAlignment: 'strong' | 'moderate' | 'weak';
    alignmentScore: number;
  };
  companySpecificFeedback: {
    strengths: string[];
    improvements: string[];
    interviewTips: string[];
  };
  whatCompanyLooksFor: string;
}

export interface ImprovementPlan {
  weakestAreas: string[];
  practiceQuestions: string[];
  resources: Array<{
    type: 'video' | 'article' | 'exercise';
    title: string;
    url: string;
    description: string;
  }>;
  reflectionExercise: string;
}

export interface EvaluationMetadata {
  totalTokensUsed: number;
  totalCost: number; // Estimated in USD
  totalLatencyMs: number;
  modelVersions: {
    starDetection: string;
    followupGeneration?: string;
    redFlagDetection?: string;
    companyFeedback?: string;
  };
  timestamp: string;
}

/**
 * Main evaluation engine - orchestrates all analysis
 */
export async function evaluateAnswer(
  questionId: string,
  question: string,
  mainAnswer: string,
  followUpQAs: Array<{ question: string; answer: string; reason: string }>,
  company?: CompanyType,
  principle?: string,
  interviewContext?: {
    role: string;
    level: string;
    allQuestionsAndAnswers?: Array<{ question: string; answer: string }>;
  }
): Promise<QuestionEvaluation> {
  const startTime = Date.now();
  let totalTokens = 0;

  // Combine main answer and follow-ups into one transcript
  const combinedTranscript = buildCombinedTranscript(mainAnswer, followUpQAs);

  // 1. STAR Analysis (Primary evaluation)
  console.log('Running STAR analysis...');
  const starAnalysis = await analyzeSTAR(question, combinedTranscript, company);
  totalTokens += starAnalysis.metadata.tokensUsed;

  // 2. Red Flag Detection (if needed)
  console.log('Detecting red flags...');
  const redFlags = await detectRedFlags(combinedTranscript);
  if (redFlags) {
    totalTokens += redFlags.metadata?.tokensUsed || 0;
  }

  // 3. Company-Specific Feedback (if company is specified)
  let companyFeedback: CompanyFeedbackAnalysis | undefined;
  if (company && company !== 'generic') {
    console.log(`Generating ${company} specific feedback...`);
    companyFeedback = await generateCompanyFeedback(
      question,
      combinedTranscript,
      starAnalysis,
      company,
      principle
    );
    if (companyFeedback) {
      totalTokens += (companyFeedback as any).metadata?.tokensUsed || 0;
    }
  }

  // 4. Improvement Plan (AI-powered if context available)
  console.log('Creating improvement plan...');
  const improvementPlan = await createImprovementPlan(
    starAnalysis,
    redFlags,
    company,
    principle,
    interviewContext ? {
      ...interviewContext,
      question,
      answer: combinedTranscript,
    } : undefined
  );

  const totalLatency = Date.now() - startTime;
  const estimatedCost = calculateCost(totalTokens);

  const evaluation: QuestionEvaluation = {
    questionId,
    question,
    principle,
    mainAnswer,
    followUps: followUpQAs,
    combinedTranscript,
    starAnalysis,
    redFlags,
    companyFeedback,
    improvementPlan,
    metadata: {
      totalTokensUsed: totalTokens,
      totalCost: estimatedCost,
      totalLatencyMs: totalLatency,
      modelVersions: {
        starDetection: starAnalysis.metadata.promptVersion,
      },
      timestamp: new Date().toISOString(),
    },
  };

  return evaluation;
}

/**
 * Build combined transcript from main answer and follow-ups
 */
function buildCombinedTranscript(
  mainAnswer: string,
  followUpQAs: Array<{ question: string; answer: string }>
): string {
  let transcript = `Main Answer:\n${mainAnswer}\n`;

  if (followUpQAs.length > 0) {
    transcript += '\nFollow-up Questions and Answers:\n';
    followUpQAs.forEach((qa, index) => {
      transcript += `\nFollow-up ${index + 1}: ${qa.question}\nAnswer: ${qa.answer}\n`;
    });
  }

  return transcript;
}

/**
 * Detect red flags in the answer
 */
async function detectRedFlags(answer: string): Promise<RedFlagAnalysis | undefined> {
  // Simple rule-based detection for now
  // Can be enhanced with AI later
  
  const redFlags: RedFlagAnalysis['redFlags'] = [];

  // Check for blaming language
  if (/(manager|team|they) (didn't|wouldn't|failed to|refused)/i.test(answer)) {
    redFlags.push({
      type: 'blaming_others',
      severity: 'major',
      evidence: 'Uses language that shifts blame to others',
      explanation: 'Shows lack of ownership and accountability',
      suggestion: 'Focus on what YOU could control and how YOU adapted',
    });
  }

  // Check for lack of metrics
  if (!/\d+%|\$\d+|saved|increased|decreased|improved by/i.test(answer)) {
    redFlags.push({
      type: 'no_metrics',
      severity: 'major',
      evidence: 'No quantifiable metrics mentioned',
      explanation: 'FAANG companies expect data-driven results',
      suggestion: 'Add specific numbers: percentages, dollar amounts, time saved',
    });
  }

  // Check for hypothetical language
  if (/(would|could|should|might) (do|approach|handle)/i.test(answer)) {
    redFlags.push({
      type: 'hypothetical',
      severity: 'critical',
      evidence: 'Uses hypothetical language instead of describing actual experience',
      explanation: 'Suggests lack of real experience',
      suggestion: 'Describe what you actually DID, not what you would do',
    });
  }

  const overallConcern = redFlags.some(f => f.severity === 'critical') ? 'critical'
    : redFlags.some(f => f.severity === 'major') ? 'major'
    : redFlags.length > 0 ? 'minor'
    : 'none';

  return {
    redFlags,
    overallConcern,
    summary: redFlags.length > 0 
      ? `Found ${redFlags.length} concern(s) that should be addressed`
      : 'No major red flags detected',
    positiveSignals: [],
  };
}

/**
 * Generate company-specific feedback
 */
async function generateCompanyFeedback(
  question: string,
  answer: string,
  starAnalysis: STARAnalysis,
  company: CompanyType,
  principle?: string
): Promise<CompanyFeedbackAnalysis | undefined> {
  // Simplified version - can be enhanced with AI
  // For now, return basic company-specific guidance
  
  return {
    companyAlignment: {
      principlesMet: [],
      principlesMissed: [],
      overallAlignment: 'moderate',
      alignmentScore: starAnalysis.overallSTARScore,
    },
    companySpecificFeedback: {
      strengths: [],
      improvements: [],
      interviewTips: [],
    },
    whatCompanyLooksFor: `${company} values specific, measurable examples that demonstrate their core principles.`,
  };
}

/**
 * Create personalized improvement plan using AI
 */
async function createImprovementPlan(
  starAnalysis: STARAnalysis,
  redFlags?: RedFlagAnalysis,
  company?: CompanyType,
  principle?: string,
  interviewContext?: {
    role: string;
    level: string;
    question: string;
    answer: string;
    allQuestionsAndAnswers?: Array<{ question: string; answer: string }>;
  }
): Promise<ImprovementPlan> {
  // If no interview context, return basic plan
  if (!interviewContext) {
    return createBasicImprovementPlan(starAnalysis, redFlags);
  }

  try {
    console.log('🤖 [IMPROVEMENT-PLAN] Starting AI generation...');
    
    // Load the prompt template
    const promptTemplate = readFileSync(
      join(process.cwd(), 'lib/prompts/improvement-plan-v1.md'),
      'utf-8'
    );
    
    console.log('✅ [IMPROVEMENT-PLAN] Prompt template loaded');

    // Build weakness summary
    const weaknesses: string[] = [];
    if (starAnalysis.situation.score < 70) weaknesses.push(`Situation (${starAnalysis.situation.score}/100): ${starAnalysis.situation.feedback}`);
    if (starAnalysis.task.score < 70) weaknesses.push(`Task (${starAnalysis.task.score}/100): ${starAnalysis.task.feedback}`);
    if (starAnalysis.action.score < 70) weaknesses.push(`Action (${starAnalysis.action.score}/100): ${starAnalysis.action.feedback}`);
    if (starAnalysis.result.score < 70) weaknesses.push(`Result (${starAnalysis.result.score}/100): ${starAnalysis.result.feedback}`);

    // Build full context
    const fullPrompt = `${promptTemplate}

---

## Candidate Context

**Target Company**: ${company?.toUpperCase() || 'Generic'}
**Target Role**: ${interviewContext.role}
**Experience Level**: ${interviewContext.level}

## Interview Performance

**Questions Asked**: ${interviewContext.allQuestionsAndAnswers?.length || 1}

### Complete Transcript:
${interviewContext.allQuestionsAndAnswers?.map((qa, i) => `
**Question ${i + 1}**: ${qa.question}
**Answer**: ${qa.answer}
`).join('\n') || `**Question**: ${interviewContext.question}\n**Answer**: ${interviewContext.answer}`}

## Analysis Results

### STAR Scores:
- Situation: ${starAnalysis.situation.score}/100 (${starAnalysis.situation.present ? 'Present' : 'Missing'})
- Task: ${starAnalysis.task.score}/100 (${starAnalysis.task.present ? 'Present' : 'Missing'})
- Action: ${starAnalysis.action.score}/100 (${starAnalysis.action.present ? 'Present' : 'Missing'})
- Result: ${starAnalysis.result.score}/100 (${starAnalysis.result.present ? 'Present' : 'Missing'})
- **Overall**: ${starAnalysis.overallSTARScore}/100

### Identified Weaknesses:
${weaknesses.join('\n')}

### Critical Issues:
${starAnalysis.criticalIssues.length > 0 ? starAnalysis.criticalIssues.join('\n') : 'None'}

### Red Flags:
${redFlags?.redFlags.map(f => `- ${f.type} (${f.severity}): ${f.explanation}`).join('\n') || 'None'}

---

Generate a personalized improvement plan in JSON format as specified above.`;

    // Call AI
    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt: fullPrompt,
      temperature: 0.3, // Lower temperature for consistent, calibrated scoring
    });

    // Parse response
    const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleanedText);

    return {
      weakestAreas: parsed.weakestAreas || [],
      practiceQuestions: parsed.practiceQuestions || [],
      resources: parsed.resources || [],
      reflectionExercise: parsed.reflectionExercise || '',
    };
  } catch (error) {
    console.error('Error generating AI improvement plan:', error);
    // Fallback to basic plan
    return createBasicImprovementPlan(starAnalysis, redFlags);
  }
}

/**
 * Fallback: Create basic improvement plan without AI
 */
function createBasicImprovementPlan(
  starAnalysis: STARAnalysis,
  redFlags?: RedFlagAnalysis
): ImprovementPlan {
  const weakestAreas: string[] = [];

  if (starAnalysis.situation.score < 70) weakestAreas.push('Situation - Setting context');
  if (starAnalysis.task.score < 70) weakestAreas.push('Task - Defining clear goals');
  if (starAnalysis.action.score < 70) weakestAreas.push('Action - Describing personal actions');
  if (starAnalysis.result.score < 70) weakestAreas.push('Result - Quantifying outcomes');

  redFlags?.redFlags.forEach(flag => {
    if (flag.severity === 'critical' || flag.severity === 'major') {
      weakestAreas.push(flag.type.replace(/_/g, ' '));
    }
  });

  return {
    weakestAreas: weakestAreas.slice(0, 3),
    practiceQuestions: ['Practice more behavioral questions focusing on your weak areas'],
    resources: [
      {
        type: 'article',
        title: 'STAR Method Guide',
        url: 'https://www.themuse.com/advice/star-interview-method',
        description: 'Learn the STAR framework for behavioral interviews',
      },
    ],
    reflectionExercise: 'Rewrite your answers focusing on the weakest areas identified above. Add specific metrics and clarify your personal contribution.',
  };
}

/**
 * Calculate estimated cost based on tokens
 * Gemini 2.0 Flash pricing: ~$0.075 per 1M input tokens, ~$0.30 per 1M output tokens
 */
function calculateCost(tokens: number): number {
  // Rough estimate: assume 70% input, 30% output
  const inputTokens = tokens * 0.7;
  const outputTokens = tokens * 0.3;
  
  const inputCost = (inputTokens / 1000000) * 0.075;
  const outputCost = (outputTokens / 1000000) * 0.30;
  
  return inputCost + outputCost;
}

/**
 * Batch evaluate multiple questions
 */
export async function batchEvaluateAnswers(
  evaluations: Array<{
    questionId: string;
    question: string;
    mainAnswer: string;
    followUpQAs: Array<{ question: string; answer: string; reason: string }>;
    company?: CompanyType;
    principle?: string;
  }>
): Promise<QuestionEvaluation[]> {
  // Process in parallel for efficiency
  const results = await Promise.all(
    evaluations.map(evaluation => 
      evaluateAnswer(
        evaluation.questionId,
        evaluation.question,
        evaluation.mainAnswer,
        evaluation.followUpQAs,
        evaluation.company,
        evaluation.principle
      )
    )
  );

  return results;
}
