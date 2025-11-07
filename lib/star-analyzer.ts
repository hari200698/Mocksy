import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { readFileSync } from "fs";
import { join } from "path";
import { getActivePromptVersion } from "./prompts/prompt-config";

export interface STARComponent {
  present: boolean;
  score: number; // 0-100
  confidence: number; // 0.0-1.0
  excerpt: string;
  feedback: string;
  reasoning: string;
}

export interface STARAnalysis {
  situation: STARComponent;
  task: STARComponent;
  action: STARComponent;
  result: STARComponent;
  overallSTARScore: number; // Weighted: S(15%) + T(10%) + A(60%) + R(15%)
  overallConfidence: number; // Average confidence across components
  criticalIssues: string[];
  metadata: {
    promptVersion: string;
    modelUsed: string;
    tokensUsed: number;
    latencyMs: number;
    timestamp: string;
    aiError?: string; // Added for debugging AI failures
  };
}

/**
 * Analyzes an answer using the STAR framework
 */
export async function analyzeSTAR(
  question: string,
  answer: string,
  company?: string
): Promise<STARAnalysis> {
  const startTime = Date.now();
  const promptVersion = getActivePromptVersion('starDetection');

  try {
    // Load the prompt template
    const promptTemplate = readFileSync(
      join(process.cwd(), promptVersion.filePath),
      'utf-8'
    );

    // Build the full prompt
    const fullPrompt = `${promptTemplate}

---

## Interview Context
${company ? `**Company**: ${company.toUpperCase()} - Evaluate with their standards in mind` : '**Company**: Generic'}

## Question
${question}

## Candidate's Answer
${answer}

---

Analyze this answer and return the JSON response as specified in the prompt above.`;

    // Call the AI model - Using Gemini 2.0 Flash for analysis
    const { text, usage } = await generateText({
      model: google("gemini-2.0-flash-exp"),
      prompt: fullPrompt,
      temperature: 0.3, // Lower temperature for more consistent structured output
    });

    const latencyMs = Date.now() - startTime;

    // Parse the response
    let parsedResponse: any;
    try {
      // Remove markdown code blocks if present
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedResponse = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse STAR analysis response:', text);
      throw new Error('Invalid JSON response from STAR analysis');
    }

    // Calculate weighted STAR score
    const weightedScore = calculateWeightedSTARScore(parsedResponse);

    // Calculate average confidence
    const avgConfidence = (
      parsedResponse.situation.confidence +
      parsedResponse.task.confidence +
      parsedResponse.action.confidence +
      parsedResponse.result.confidence
    ) / 4;

    const analysis: STARAnalysis = {
      situation: parsedResponse.situation,
      task: parsedResponse.task,
      action: parsedResponse.action,
      result: parsedResponse.result,
      overallSTARScore: weightedScore,
      overallConfidence: avgConfidence,
      criticalIssues: parsedResponse.criticalIssues || [],
      metadata: {
        promptVersion: promptVersion.version,
        modelUsed: 'gemini-2.5-pro',
        tokensUsed: usage?.totalTokens || 0,
        latencyMs,
        timestamp: new Date().toISOString(),
      },
    };

    return analysis;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error('❌ [STAR-AI-ERROR] AI analysis failed:', {
      error: errorMessage,
      stack: errorStack,
      question: question.substring(0, 100),
      answerLength: answer.length,
      company
    });
    
    // Fallback to rule-based analysis if AI fails
    const fallbackResult = fallbackSTARAnalysis(question, answer, Date.now() - startTime);
    
    // Add error info to metadata for debugging
    fallbackResult.metadata.aiError = errorMessage;
    
    return fallbackResult;
  }
}

/**
 * Calculate weighted STAR score: S(15%) + T(10%) + A(60%) + R(15%)
 */
function calculateWeightedSTARScore(analysis: any): number {
  const weights = {
    situation: 0.15,
    task: 0.10,
    action: 0.60,
    result: 0.15,
  };

  const score =
    analysis.situation.score * weights.situation +
    analysis.task.score * weights.task +
    analysis.action.score * weights.action +
    analysis.result.score * weights.result;

  return Math.round(score);
}

/**
 * Fallback rule-based STAR analysis if AI fails
 * Uses simple keyword matching and heuristics
 */
function fallbackSTARAnalysis(
  question: string,
  answer: string,
  latencyMs: number
): STARAnalysis {
  const answerLower = answer.toLowerCase();
  const wordCount = answer.split(/\s+/).length;

  // Simple heuristics
  const hasSituation = /when|where|context|background|situation|at the time/i.test(answer);
  const hasTask = /goal|objective|responsibility|needed to|had to|task was/i.test(answer);
  const hasAction = /\bi\b.*\b(did|implemented|created|designed|built|analyzed|decided)/i.test(answer);
  const hasResult = /result|outcome|impact|improved|increased|decreased|reduced|achieved|\d+%/i.test(answer);
  
  const hasMetrics = /\d+%|\$\d+|saved \d+|increased by|decreased by/i.test(answer);
  const usesWeLanguage = (answer.match(/\bwe\b/gi) || []).length > (answer.match(/\bi\b/gi) || []).length;

  const criticalIssues: string[] = [];
  if (!hasMetrics) criticalIssues.push('Missing quantifiable metrics in results');
  if (usesWeLanguage) criticalIssues.push('Overuse of "we" - unclear personal contribution');
  if (wordCount < 50) criticalIssues.push('Answer is too brief - lacks detail');

  return {
    situation: {
      present: hasSituation,
      score: hasSituation ? 70 : 20,
      confidence: 0.6,
      excerpt: '',
      feedback: hasSituation 
        ? 'Situation detected but using fallback analysis - may be inaccurate'
        : 'No clear situation context detected',
      reasoning: 'Fallback rule-based detection',
    },
    task: {
      present: hasTask,
      score: hasTask ? 65 : 15,
      confidence: 0.6,
      excerpt: '',
      feedback: hasTask
        ? 'Task detected but using fallback analysis - may be inaccurate'
        : 'No clear task or goal stated',
      reasoning: 'Fallback rule-based detection',
    },
    action: {
      present: hasAction,
      score: hasAction ? (usesWeLanguage ? 50 : 70) : 10,
      confidence: 0.6,
      excerpt: '',
      feedback: hasAction
        ? usesWeLanguage
          ? 'Actions detected but too much "we" language - clarify YOUR role'
          : 'Actions detected but using fallback analysis - may be inaccurate'
        : 'No clear personal actions described',
      reasoning: 'Fallback rule-based detection',
    },
    result: {
      present: hasResult,
      score: hasResult ? (hasMetrics ? 75 : 40) : 10,
      confidence: 0.6,
      excerpt: '',
      feedback: hasResult
        ? hasMetrics
          ? 'Results with metrics detected but using fallback analysis'
          : 'Results mentioned but missing specific metrics'
        : 'No measurable results provided',
      reasoning: 'Fallback rule-based detection',
    },
    overallSTARScore: Math.round(
      (hasSituation ? 70 : 20) * 0.15 +
      (hasTask ? 65 : 15) * 0.10 +
      (hasAction ? (usesWeLanguage ? 50 : 70) : 10) * 0.60 +
      (hasResult ? (hasMetrics ? 75 : 40) : 10) * 0.15
    ),
    overallConfidence: 0.6,
    criticalIssues,
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
 * Batch analyze multiple answers (for efficiency)
 */
export async function batchAnalyzeSTAR(
  questionAnswerPairs: Array<{ question: string; answer: string; company?: string }>
): Promise<STARAnalysis[]> {
  // Process in parallel for speed
  const analyses = await Promise.all(
    questionAnswerPairs.map(({ question, answer, company }) =>
      analyzeSTAR(question, answer, company)
    )
  );

  return analyses;
}
