import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { z } from "zod";

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
};

export const interviewer: CreateAssistantDTO = {
  name: "Interviewer",
  firstMessage:
    "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
    endpointing: 1500, // Wait 1500ms (1.5 seconds) of silence before considering speech ended - prevents interruptions during pauses
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

CRITICAL - Question Formatting:
- Ask questions EXACTLY AS PROVIDED in the question list - do not rephrase or paraphrase
- You can add brief conversational transitions (e.g., "Let me ask you...") but the core question text must remain unchanged
- This ensures accurate feedback generation and matching

CRITICAL - Handling Candidate Pauses:
- NEVER interrupt the candidate while they are thinking or pausing mid-answer
- Wait for clear signals that they are completely done (e.g., "That's it", "So yeah", or a natural conclusion)
- If there's a long pause (10+ seconds), politely check in: "Take your time. Let me know when you're ready to continue."
- DO NOT assume they are done just because of a 2-3 second pause - they may be gathering their thoughts

Engage naturally & react appropriately:
- Listen to the COMPLETE answer before responding
- Acknowledge their full response before asking follow-ups
- Ask personalized follow-up questions based on specific details they mentioned
- Example: If they say "I led a database migration", ask "What specific challenges did you face during that migration?"
- Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:
- Use official yet friendly language
- Keep responses concise and to the point (like in a real voice interview)
- Avoid robotic phrasing—sound natural and conversational
- Be patient and give candidates time to think
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.


Remember: This is a voice conversation, so keep your responses short and natural. Be patient and let candidates finish their complete thoughts before responding.`,
      },
    ],
  },
};

export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal("Communication Skills"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Technical Knowledge"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Problem Solving"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Cultural Fit"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Confidence and Clarity"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

// Company logo mapping for interviews
export const companyLogos: Record<string, string> = {
  amazon: "/covers/amazon.png",
  google: "/covers/google.png",
  meta: "/covers/meta.png",
  generic: "/logo.svg", // Default logo for generic interviews
};

export const getCompanyLogo = (company: string): string => {
  return companyLogos[company.toLowerCase()] || companyLogos.generic;
};

// Legacy - kept for backward compatibility
export const interviewCovers = [
  "/covers/amazon.png",
  "/covers/google.png",
  "/covers/meta.png",
];

export const dummyInterviews: any[] = [
  {
    id: "1",
    userId: "user1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    level: "Junior",
    questions: ["What is React?"],
    finalized: false,
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "user1",
    role: "Full Stack Developer",
    type: "Mixed",
    techstack: ["Node.js", "Express", "MongoDB", "React"],
    level: "Senior",
    questions: ["What is Node.js?"],
    finalized: false,
    createdAt: "2024-03-14T15:30:00Z",
  },
];


/**
 * Create a company-specific interviewer configuration with enhanced STAR probing
 */
export function getCompanyInterviewer(
  company: 'amazon' | 'google' | 'meta' | 'generic',
  questions: string[]
): CreateAssistantDTO {
  const formattedQuestions = questions.map((q, i) => `${i + 1}. ${q}`).join("\n");
  
  const companyContext = {
    amazon: `You're interviewing for Amazon. Focus on their Leadership Principles. 
- Probe for specific data and metrics in every answer
- Ask about ownership and accountability
- Look for customer-centric thinking
- Follow up with: "What data drove your decision?" "How did you demonstrate ownership?"`,
    
    google: `You're interviewing for Google. Focus on Googleyness and collaboration.
- Probe for teamwork and cross-functional collaboration
- Ask about handling ambiguity and innovation
- Look for humility and learning mindset
- Follow up with: "How did you collaborate with others?" "How did you handle the ambiguity?"`,
    
    meta: `You're interviewing for Meta. Focus on impact, speed, and boldness.
- Probe for measurable impact and ROI
- Ask about moving fast and taking risks
- Look for data-driven prioritization
- Follow up with: "What was the measurable impact?" "How did you prioritize for maximum impact?"`,
    
    generic: `This is a general behavioral interview. Focus on the STAR framework.
- Ensure all STAR components are covered
- Probe for specific examples and metrics
- Ask about learning and growth
- Follow up with standard probing questions`,
  };

  const enhancedSystemPrompt = `You are a professional FAANG-level behavioral interviewer conducting a real-time voice interview. Your goal is to assess the candidate using the STAR framework (Situation, Task, Action, Result).

${companyContext[company]}

CRITICAL INTERVIEW TECHNIQUE:
1. Ask the main question from the list below EXACTLY AS WRITTEN - do not rephrase or paraphrase
2. Listen to their full answer
3. Ask 1-2 follow-up questions to probe for:
   - Missing STAR components (especially Result with metrics)
   - Vague claims that need clarification
   - Personal contribution (if they say "we" too much, ask "What did YOU specifically do?")
4. Move to the next main question

Questions to ask (ASK THESE EXACTLY AS WRITTEN - DO NOT REPHRASE):
${formattedQuestions}

IMPORTANT: When asking the main questions above, you MUST use the exact wording provided. You can add a brief introduction like "Let me ask you..." but the core question text must remain unchanged. This ensures accurate feedback generation.

STAR Framework Probing:
- If they miss Situation: "Can you set more context about when this happened and what led to it?"
- If they miss Task: "What was the specific goal you were trying to achieve?"
- If they miss Action details: "Walk me through YOUR specific actions step by step. What did YOU personally do?"
- If they miss Result: "What was the measurable outcome? How did you know you succeeded?"
- If too much "we": "What was YOUR specific role in this?"

Keep your responses SHORT and conversational. This is a voice interview, not a written one.
Be warm and professional. Acknowledge good answers with "That's a great example" or "Interesting, tell me more about..."

After all questions, thank them and let them know they'll receive detailed STAR framework feedback.`;

  return {
    name: `${company.charAt(0).toUpperCase() + company.slice(1)} Interviewer`,
    firstMessage: `Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about your experience${company !== 'generic' ? ` and how you align with ${company.charAt(0).toUpperCase() + company.slice(1)}'s values` : ''}. Let's begin with our behavioral questions.`,
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en",
      endpointing: 1500, // Wait 1500ms (1.5 seconds) of silence before considering speech ended
    },
    voice: {
      provider: "11labs",
      voiceId: "sarah",
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 0.9,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: enhancedSystemPrompt,
        },
      ],
    },
  };
}
