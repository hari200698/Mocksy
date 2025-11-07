# 🎯 AI Interview Coach

An advanced AI-powered interview preparation platform that helps candidates master behavioral interviews for top tech companies (FAANG) using real-time voice AI and comprehensive STAR framework analysis.

<div align="center">
  <img src="https://img.shields.io/badge/-Next.JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=black" alt="next.js" />
  <img src="https://img.shields.io/badge/-Vapi-white?style=for-the-badge&color=5dfeca" alt="vapi" />
  <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  <img src="https://img.shields.io/badge/-Firebase-black?style=for-the-badge&logoColor=white&logo=firebase&color=DD2C00" alt="firebase" />
  <img src="https://img.shields.io/badge/-Google_Gemini-black?style=for-the-badge&logoColor=white&logo=google&color=4285F4" alt="gemini" />
</div>

---

## 📋 Table of Contents

1. [Introduction](#-introduction)
2. [Key Features](#-key-features)
3. [Tech Stack](#️-tech-stack)
4. [Architecture](#-architecture)
5. [Getting Started](#-getting-started)
6. [Environment Setup](#-environment-setup)
7. [Project Structure](#-project-structure)
8. [AI Features](#-ai-features)
9. [Contributing](#-contributing)
10. [License](#-license)

---

## 🤖 Introduction

AI Interview Coach is a comprehensive platform designed to help job seekers prepare for behavioral interviews at top tech companies. Using advanced AI technologies including voice agents, natural language processing, and the STAR framework analysis, the platform provides realistic interview practice with detailed, actionable feedback.

### What Makes This Different?

- **Real-time Voice Interviews**: Practice with AI voice agents that simulate real interviewers
- **STAR Framework Analysis**: Detailed breakdown of Situation, Task, Action, and Result components
- **Company-Specific Preparation**: Tailored questions and feedback for Amazon, Google, Meta, and more
- **Personality Modes**: Choose from Friendly, Neutral, or Skeptical (Bar Raiser) interviewer styles
- **Comprehensive Feedback**: AI-powered analysis with improvement plans, practice questions, and curated resources

---

## ✨ Key Features

### 🎙️ Voice-Powered Interviews
- Real-time AI voice conversations using VAPI
- Natural speech recognition and transcription
- Intelligent pause detection to prevent interruptions
- Live transcript display during interviews

### 📊 Advanced STAR Analysis
- Automated detection and scoring of STAR components
- Confidence scoring for each component
- Weighted scoring (Action: 60%, Situation: 15%, Task: 10%, Result: 15%)
- AI + rule-based hybrid evaluation system

### 🏢 Company-Specific Training
- **Amazon**: Leadership Principles focus with data-driven examples
- **Google**: Googleyness, collaboration, and handling ambiguity
- **Meta**: Impact, speed, and measurable ROI
- **Generic**: Universal STAR framework best practices

### 🎭 Interviewer Personalities
- **Friendly**: Encouraging and supportive with hints
- **Neutral**: Professional and balanced standard style
- **Skeptical**: Challenging Bar Raiser style with minimal feedback

### 📈 Comprehensive Feedback System
- Overall STAR score with component breakdown
- Secondary metrics (Structure, Communication, Clarity, Confidence)
- Red flag detection (vague answers, lack of metrics, team vs personal contribution)
- Principle-specific feedback with example comparisons
- Personalized improvement plans with curated resources

### 🎯 Smart Features
- Answer comparison with strong examples
- Principle information cards explaining what interviewers look for
- Practice question recommendations
- Reflection exercises based on actual performance
- Progress tracking across multiple interviews

---

## ⚙️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component library

### Backend & AI
- **Firebase** - Authentication and Firestore database
- **Google Gemini 2.5 Flash** - AI evaluation and analysis
- **VAPI** - Voice AI agent platform
- **Vercel AI SDK** - AI integration utilities
- **Zod** - Schema validation

### Key Libraries
- `@ai-sdk/google` - Google AI integration
- `@vapi-ai/web` - VAPI SDK
- `dayjs` - Date formatting
- `firebase-admin` - Server-side Firebase

---

## 🏗️ Architecture

### AI Evaluation Pipeline

```
User Answer → VAPI Transcription → Combined Transcript
                                          ↓
                    ┌─────────────────────┴─────────────────────┐
                    ↓                                             ↓
            STAR Analysis                              Secondary Metrics
         (Gemini 2.5 Flash)                          (AI + Rule-based)
                    ↓                                             ↓
            ┌───────┴────────┐                                   ↓
            ↓                ↓                                    ↓
    Red Flag Detection   Company Feedback                        ↓
            ↓                ↓                                    ↓
            └────────────────┴────────────────────────────────────┘
                                    ↓
                          Improvement Plan Generation
                                    ↓
                          Comprehensive Feedback
```

### Prompt Versioning System
All AI prompts are versioned (e.g., `star-detection-v1.md`) enabling:
- A/B testing of different prompt strategies
- Systematic iteration and improvement
- Tracking which prompt version was used per evaluation

---

## � Ge>tting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ai-interview-coach
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables** (see [Environment Setup](#-environment-setup))

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Setup

Create a `.env.local` file in the root directory with the following variables:

### VAPI Configuration
```env
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_vapi_workflow_id
```
Get your VAPI credentials from [vapi.ai](https://vapi.ai)

### Google Gemini API
```env
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
```
Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Firebase Configuration
```env
# Client-side Firebase config
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Server-side Firebase config (for Admin SDK)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```
Get Firebase credentials from [Firebase Console](https://console.firebase.google.com/)

### Application URL
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
Update this to your production URL when deploying

---

## 📁 Project Structure

```
ai-interview-coach/
├── app/                          # Next.js App Router
│   ├── (root)/                   # Main application routes
│   │   ├── page.tsx             # Dashboard
│   │   ├── interview/           # Interview pages
│   │   │   ├── page.tsx         # Interview setup
│   │   │   └── [id]/            # Dynamic interview routes
│   │   │       ├── page.tsx     # Interview session
│   │   │       └── feedback/    # Feedback page
│   │   └── debug/               # Debug utilities
│   └── api/                     # API routes
│       ├── auth/                # Authentication endpoints
│       └── debug/               # Debug endpoints
├── components/                   # React components
│   ├── feedback/                # Feedback display components
│   │   ├── STARBreakdown.tsx
│   │   ├── AnswerComparisonSection.tsx
│   │   ├── ImprovementPlanSection.tsx
│   │   └── ...
│   ├── Agent.tsx                # VAPI voice agent component
│   ├── InterviewSetupForm.tsx
│   └── ...
├── lib/                         # Core business logic
│   ├── actions/                 # Server actions
│   │   ├── general.action.ts
│   │   └── interview-feedback.action.ts
│   ├── prompts/                 # Versioned AI prompts
│   │   ├── star-detection-v1.md
│   │   ├── improvement-plan-v1.md
│   │   ├── company-feedback-v1.md
│   │   └── ...
│   ├── evaluation-engine.ts     # Main evaluation logic
│   ├── star-analyzer.ts         # STAR framework analysis
│   ├── followup-generator.ts    # Follow-up question generation
│   ├── company-profiles.ts      # Company-specific data
│   ├── example-answers.ts       # Example answer database
│   └── principle-descriptions.ts # Principle explanations
├── constants/                   # Configuration constants
│   └── index.ts                 # VAPI interviewer configs
├── types/                       # TypeScript type definitions
│   └── index.d.ts
└── public/                      # Static assets
    └── covers/                  # Company logos
```

---

## 🤖 AI Features

### STAR Framework Analysis
The system uses a sophisticated AI-powered analysis engine:

1. **Component Detection**: Identifies Situation, Task, Action, and Result in answers
2. **Scoring**: Rates each component 0-100 with calibrated guidelines
3. **Confidence Rating**: AI rates its own confidence (0.0-1.0) for each detection
4. **Feedback Generation**: Provides specific, actionable improvement suggestions

### Scoring Calibration
To prevent score inflation, the system uses:
- Explicit score ranges for each quality level
- Strict calibration guidelines (most answers should score 50-75)
- Consistency requirements (same answer = same score ±5 points)
- Lower temperature (0.3) for deterministic outputs

### Hybrid Evaluation
- **AI Analysis**: Gemini 2.5 Flash for nuanced understanding
- **Rule-based Fallback**: Ensures feedback even if AI fails
- **Dual Scoring**: Takes minimum of AI and rule-based scores for conservative evaluation

### Improvement Plan Generation
Personalized plans include:
- Top 3 weakest areas with specific context
- 3-5 targeted practice questions
- 2-3 curated learning resources (verified URLs only)
- Reflection exercises based on actual answers

---

## 🎨 Key Components

### Agent Component (`components/Agent.tsx`)
Manages VAPI voice agent integration:
- Call state management (INACTIVE, CONNECTING, ACTIVE, FINISHED)
- Real-time transcript display
- Explicit end detection (only saves when user clicks "End Interview")
- Error handling and logging

### Evaluation Engine (`lib/evaluation-engine.ts`)
Core evaluation logic:
- Orchestrates STAR analysis, red flag detection, and company feedback
- Generates improvement plans
- Tracks telemetry (tokens, cost, latency)
- Handles fallback mechanisms

### STAR Analyzer (`lib/star-analyzer.ts`)
Specialized STAR framework analysis:
- Weighted scoring system
- Confidence-based detection
- Fallback rule-based analysis
- Batch processing support

---

## 🔧 Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- VAPI for voice AI infrastructure
- Google Gemini for AI evaluation capabilities
- Firebase for authentication and database
- The open-source community for amazing tools and libraries

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation in `/lib/prompts/` for AI prompt details
- Review `FEATURES.md` for detailed feature documentation

---

**Built with ❤️ for helping candidates ace their interviews**
