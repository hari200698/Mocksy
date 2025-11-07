export interface Feedback {
  id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

// Enhanced feedback with STAR analysis
export interface EnhancedFeedback {
  id?: string;
  interviewId: string;
  userId: string;
  company?: 'amazon' | 'google' | 'meta' | 'generic';
  questionEvaluations: QuestionEvaluation[];
  summaryFeedback: SummaryFeedback;
  metadata: {
    totalTokensUsed: number;
    totalCost: number;
    totalLatencyMs: number;
    evaluatedAt: string;
  };
  createdAt: string;
}

export interface QuestionEvaluation {
  questionId: string;
  question: string;
  principle?: string;
  mainAnswer: string;
  followUps: Array<{
    question: string;
    answer: string;
    reason: string;
  }>;
  combinedTranscript: string;
  starAnalysis: STARAnalysis;
  redFlags?: RedFlagAnalysis;
  companyFeedback?: CompanyFeedbackAnalysis;
  improvementPlan?: ImprovementPlan;
  metadata: EvaluationMetadata;
}

export interface STARAnalysis {
  situation: STARComponent;
  task: STARComponent;
  action: STARComponent;
  result: STARComponent;
  overallSTARScore: number;
  overallConfidence: number;
  criticalIssues: string[];
  metadata: {
    promptVersion: string;
    modelUsed: string;
    tokensUsed: number;
    latencyMs: number;
    timestamp: string;
    aiError?: string; // Error message if AI analysis failed
  };
}

export interface STARComponent {
  present: boolean;
  score: number;
  confidence: number;
  excerpt: string;
  feedback: string;
  reasoning: string;
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
  totalCost: number;
  totalLatencyMs: number;
  modelVersions: {
    starDetection: string;
    followupGeneration?: string;
    redFlagDetection?: string;
    companyFeedback?: string;
  };
  timestamp: string;
}

export interface SummaryFeedback {
  overallSTARScore: number;
  overallConfidence: number;
  strengthAreas: string[];
  improvementAreas: string[];
  criticalIssues: string[];
  companyAlignmentSummary?: string;
  nextSteps: string[];
}

interface Interview {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
  company?: 'amazon' | 'google' | 'meta' | 'generic'; // Company for behavioral interviews
  personality?: 'friendly' | 'neutral' | 'skeptical'; // Interviewer personality
  questionDetails?: Array<{
    text: string;
    principle: string;
    company: string;
  }>;
}

interface CreateFeedbackParams {
  interviewId: string;
  userId: string;
  transcript: { role: string; content: string }[];
  feedbackId?: string;
}

interface User {
  name: string;
  email: string;
  id: string;
}

interface InterviewCardProps {
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
  company?: string;
  showActions?: boolean;
}

interface AgentProps {
  userName: string;
  userId?: string;
  interviewId?: string;
  feedbackId?: string;
  type: "generate" | "interview";
  questions?: string[];
}

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface GetFeedbackByInterviewIdParams {
  interviewId: string;
  userId: string;
}

interface GetLatestInterviewsParams {
  userId: string;
  limit?: number;
}

interface SignInParams {
  email: string;
  idToken: string;
}

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password: string;
}

type FormType = "sign-in" | "sign-up";

interface InterviewFormProps {
  interviewId: string;
  role: string;
  level: string;
  type: string;
  techstack: string[];
  amount: number;
  company?: 'amazon' | 'google' | 'meta' | 'generic';
}

interface TechIconProps {
  techStack: string[];
}


// Global type for Firebase initialization tracking
declare global {
  var _firestoreInitialized: boolean | undefined;
}

export {};
