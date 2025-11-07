# System Architecture

## Overview

AI Interview Coach is built as a full-stack Next.js application with AI-powered evaluation capabilities. The system integrates multiple AI services (VAPI for voice, Google Gemini for analysis) with Firebase for data persistence and authentication.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Interface                           │
│                    (Next.js 15 + React 19)                      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                     Application Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Interview  │  │   Feedback   │  │     Auth     │         │
│  │   Management │  │   Display    │  │   Management │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Business Logic Layer                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Evaluation Engine                            │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │  │
│  │  │    STAR    │  │  Red Flag  │  │  Company   │         │  │
│  │  │  Analyzer  │  │  Detection │  │  Feedback  │         │  │
│  │  └────────────┘  └────────────┘  └────────────┘         │  │
│  │  ┌────────────┐  ┌────────────┐                          │  │
│  │  │ Secondary  │  │Improvement │                          │  │
│  │  │  Metrics   │  │    Plan    │                          │  │
│  │  └────────────┘  └────────────┘                          │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    External Services Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │     VAPI     │  │    Google    │  │   Firebase   │         │
│  │  Voice AI    │  │  Gemini AI   │  │  Auth + DB   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### 1. Frontend Layer

#### Pages (`/app`)
- **Dashboard** (`/app/(root)/page.tsx`): Interview list and management
- **Interview Setup** (`/app/(root)/interview/page.tsx`): Create new interviews
- **Interview Session** (`/app/(root)/interview/[id]/page.tsx`): Live voice interview
- **Feedback** (`/app/(root)/interview/[id]/feedback/page.tsx`): Detailed results

#### Components (`/components`)
- **Agent.tsx**: VAPI voice agent integration
  - Manages call state (INACTIVE → CONNECTING → ACTIVE → FINISHED)
  - Real-time transcript display
  - Explicit end detection (prevents accidental saves)
  
- **Feedback Components** (`/components/feedback/`)
  - STARBreakdown: Visual STAR component analysis
  - AnswerComparisonSection: Side-by-side with strong examples
  - ImprovementPlanSection: Personalized action plans
  - PrincipleInfoSection: Educational cards
  - QuestionFeedbackView: Per-question detailed feedback
  - SummaryView: Overall performance overview

### 2. Business Logic Layer

#### Evaluation Engine (`/lib/evaluation-engine.ts`)
Main orchestrator for AI evaluation:

```typescript
evaluateAnswer() {
  1. Combine main answer + follow-ups → transcript
  2. Run STAR analysis (Gemini 2.5 Flash)
  3. Detect red flags (AI-powered)
  4. Generate company-specific feedback
  5. Create improvement plan
  6. Track telemetry (tokens, cost, latency)
  7. Return comprehensive evaluation
}
```

#### STAR Analyzer (`/lib/star-analyzer.ts`)
Specialized STAR framework analysis:
- **AI Analysis**: Gemini 2.5 Flash with structured prompts
- **Weighted Scoring**: Action (60%), Situation (15%), Task (10%), Result (15%)
- **Confidence Rating**: AI self-assessment (0.0-1.0)
- **Fallback**: Rule-based analysis if AI fails

#### Follow-up Generator (`/lib/followup-generator.ts`)
Generates contextual follow-up questions:
- Probes for missing STAR components
- Clarifies vague statements
- Asks for metrics and specifics

### 3. Data Layer

#### Firebase Integration
- **Authentication**: Email/password via Firebase Auth
- **Firestore Collections**:
  - `users`: User profiles
  - `interviews`: Interview sessions
  - `feedback`: Evaluation results with full transcripts

#### Data Flow
```
User Action → Server Action → Firebase Admin SDK → Firestore
                                                  ↓
                                            Real-time Sync
                                                  ↓
                                            Client SDK → UI Update
```

### 4. AI Integration Layer

#### VAPI Voice AI
```
User Speech → VAPI Transcription → Deepgram Nova-2
                                         ↓
                                   Final Transcript
                                         ↓
                                   Message Event
                                         ↓
                                   React State Update
```

**Configuration**:
- Provider: Deepgram
- Model: nova-2
- Language: en
- Voice: ElevenLabs (sarah)

#### Google Gemini AI
```
Transcript → Prompt Template → Gemini 2.5 Flash
                                      ↓
                                 JSON Response
                                      ↓
                              Structured Evaluation
```

**Usage**:
- STAR component detection
- Red flag identification
- Improvement plan generation
- Temperature: 0.3 (for consistency)

## Data Flow Diagrams

### Interview Creation Flow
```
User → Interview Setup Form
         ↓
     Validation
         ↓
     Firebase (create interview doc)
         ↓
     Redirect to Interview Session
```

### Interview Session Flow
```
User clicks "Start Interview"
         ↓
     VAPI.start(assistantConfig)
         ↓
     Call Status: CONNECTING → ACTIVE
         ↓
     User speaks ↔ AI responds
         ↓
     Transcripts captured in real-time
         ↓
     User clicks "End Interview"
         ↓
     isExplicitEnd = true
         ↓
     Call Status: FINISHED
         ↓
     Generate Feedback (if explicit end)
         ↓
     Save to Firebase
         ↓
     Redirect to Feedback Page
```

### Evaluation Pipeline
```
Raw Transcript
     ↓
Combine main + follow-ups
     ↓
┌────┴────┬────────┬──────────┐
↓         ↓        ↓          ↓
STAR    Red Flag  Company  Secondary
Analysis Detection Feedback Metrics
     ↓         ↓        ↓          ↓
     └─────────┴────────┴──────────┘
                 ↓
         Improvement Plan
                 ↓
         Complete Feedback
                 ↓
         Save to Firestore
```

## Security Architecture

### Authentication Flow
```
User Sign Up/In → Firebase Auth
                      ↓
                  ID Token
                      ↓
              Server Verification
                      ↓
              Session Cookie
                      ↓
          Protected Route Access
```

### Data Access Control
- **Client-side**: Firebase Security Rules enforce user-level access
- **Server-side**: Firebase Admin SDK with service account
- **API Routes**: Verify authentication before processing

### PII Handling
- Transcripts stored in Firestore (encrypted at rest)
- No transcripts sent to third parties except AI providers
- User can delete their data (GDPR compliance ready)

## Scalability Considerations

### Current Architecture
- **Serverless**: Next.js on Vercel (auto-scaling)
- **Database**: Firestore (auto-scaling, pay-per-use)
- **AI APIs**: Rate-limited by provider quotas

### Bottlenecks & Solutions
1. **AI API Rate Limits**
   - Solution: Implement request queuing
   - Solution: Add caching for similar answers

2. **Cost (AI API calls)**
   - Current: ~$0.10-0.30 per interview
   - Solution: Batch processing
   - Solution: Optimize prompt lengths

3. **Real-time Transcript Processing**
   - Current: Client-side state management
   - Solution: WebSocket for multi-user scenarios

## Technology Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend
- Next.js API Routes
- Firebase Admin SDK
- Server Actions

### AI/ML
- VAPI (voice agents)
- Google Gemini 2.5 Flash
- Vercel AI SDK

### Database
- Firebase Firestore
- Firebase Authentication

### Deployment
- Vercel (recommended)
- Environment variables for secrets

## Monitoring & Observability

### Current Logging
- Console logs for debugging
- Firebase Analytics (optional)
- Error boundaries in React

### Telemetry Tracked
- Tokens used per evaluation
- Estimated cost per interview
- Latency (processing time)
- Model versions used
- Timestamp of evaluations

### Future Enhancements
- Structured logging (Winston/Pino)
- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- User analytics (PostHog/Mixpanel)

## Deployment Architecture

### Development
```
Local Machine → npm run dev → http://localhost:3000
```

### Production (Vercel)
```
GitHub Push → Vercel Build → Edge Network → Users
                    ↓
            Environment Variables
                    ↓
            Firebase/VAPI/Gemini
```

## Future Architecture Considerations

### Potential Enhancements
1. **Caching Layer**: Redis for frequently accessed data
2. **Queue System**: Bull/BullMQ for async job processing
3. **CDN**: For static assets and media
4. **Microservices**: Separate evaluation engine as standalone service
5. **Real-time Collaboration**: WebRTC for multi-user interviews
6. **Mobile Apps**: React Native with shared business logic

### Migration Path
- Current: Monolithic Next.js app
- Phase 1: Extract evaluation engine to separate API
- Phase 2: Add caching and queue layers
- Phase 3: Microservices architecture if needed
