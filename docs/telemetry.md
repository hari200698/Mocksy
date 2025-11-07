# Telemetry & Observability Plan

## Overview

This document outlines what data we collect, how we log it, and how we use it to monitor system health, debug issues, and improve the user experience.

## Data Collection Principles

1. **Privacy First**: No PII logged to external services without consent
2. **Purpose-Driven**: Only collect data that serves a specific purpose
3. **Transparency**: Users know what data is collected
4. **Security**: All logs encrypted in transit and at rest
5. **Retention**: Clear data retention policies

## What We Log

### 1. Interview Session Data

**Stored in**: Firestore (`interviews` collection)

**Fields**:
```typescript
{
  id: string;                    // Unique interview ID
  userId: string;                // User who took interview
  role: string;                  // Job role
  company?: string;              // Target company
  personality?: string;          // Interviewer personality
  questions: string[];           // Questions asked
  createdAt: Timestamp;          // When interview was created
  finalized: boolean;            // Whether interview was completed
}
```

**Purpose**:
- Track interview history
- Enable resume functionality
- Analyze popular companies/roles
- Calculate completion rates

**Retention**: Indefinite (user can delete)

### 2. Feedback & Evaluation Data

**Stored in**: Firestore (`feedback` collection)

**Fields**:
```typescript
{
  id: string;
  interviewId: string;
  userId: string;
  transcript: Message[];         // Full conversation
  questionEvaluations: Array<{
    questionId: string;
    question: string;
    mainAnswer: string;
    followUps: Array<{
      question: string;
      answer: string;
      reason: string;
    }>;
    starAnalysis: STARAnalysis;
    redFlags?: RedFlagAnalysis;
    companyFeedback?: CompanyFeedbackAnalysis;
    improvementPlan: ImprovementPlan;
    metadata: {
      totalTokensUsed: number;
      totalCost: number;
      totalLatencyMs: number;
      modelVersions: {
        starDetection: string;
      };
      timestamp: string;
    };
  }>;
  summaryFeedback: {
    overallSTARScore: number;
    averageConfidence: number;
    totalQuestions: number;
    // ... other summary fields
  };
  createdAt: Timestamp;
}
```

**Purpose**:
- Provide feedback to users
- Track AI performance
- Monitor costs
- Debug evaluation issues
- Improve prompts

**Retention**: Indefinite (user can delete)

### 3. AI Evaluation Metadata

**Logged in**: Feedback metadata (see above)

**Metrics Tracked**:
- **Tokens Used**: Total tokens per evaluation
- **Estimated Cost**: USD cost per interview
- **Latency**: Processing time in milliseconds
- **Model Version**: Which prompt version was used
- **Timestamp**: When evaluation occurred

**Purpose**:
- Cost monitoring and optimization
- Performance tracking
- A/B testing of prompts
- Capacity planning

**Example**:
```typescript
{
  totalTokensUsed: 4523,
  totalCost: 0.23,
  totalLatencyMs: 12450,
  modelVersions: {
    starDetection: "star-detection-v1",
    improvementPlan: "improvement-plan-v1"
  },
  timestamp: "2025-11-07T10:30:00Z"
}
```

### 4. STAR Analysis Details

**Stored in**: Feedback → questionEvaluations → starAnalysis

**Fields**:
```typescript
{
  situation: {
    present: boolean;
    score: number;              // 0-100
    confidence: number;         // 0.0-1.0
    excerpt: string;
    feedback: string;
    reasoning: string;
  };
  // ... same for task, action, result
  overallSTARScore: number;
  overallConfidence: number;
  criticalIssues: string[];
  metadata: {
    promptVersion: string;
    modelUsed: string;
    tokensUsed: number;
    latencyMs: number;
    timestamp: string;
    aiError?: string;
  };
}
```

**Purpose**:
- Provide detailed feedback
- Track AI confidence
- Identify low-confidence evaluations
- Debug AI failures

### 5. Application Logs

**Logged in**: Browser console (development) / Server logs (production)

**Log Levels**:
- **ERROR**: Critical failures
- **WARN**: Recoverable issues
- **INFO**: Important events
- **DEBUG**: Detailed debugging info

**Examples**:

```typescript
// Interview start
console.log("🔵 Starting call...");
console.log("- Type:", type);
console.log("- Company:", company);
console.log("- Personality:", personality);

// Evaluation start
console.log("=== handleGenerateFeedback START ===");
console.log("- Interview ID:", interviewId);
console.log("- Messages count:", messages.length);

// Success
console.log("✅ Feedback saved successfully!");

// Error
console.error("❌ Error starting VAPI call:", error);
```

**Purpose**:
- Real-time debugging
- Error tracking
- Performance monitoring
- User support

### 6. User Authentication Events

**Logged by**: Firebase Authentication

**Events**:
- Sign up
- Sign in
- Sign out
- Password reset
- Email verification

**Purpose**:
- Security monitoring
- User growth tracking
- Fraud detection

**Retention**: 180 days (Firebase default)

### 7. Error Events

**Logged in**: Console + Future: Sentry/Error tracking service

**Error Types**:
- VAPI connection failures
- AI API errors (rate limits, timeouts)
- Firebase errors
- Client-side JavaScript errors
- Network errors

**Error Format**:
```typescript
{
  type: "start-method-error",
  stage: "unknown",
  error: Response,
  totalDuration: number,
  timestamp: string,
  context: {
    userId: string,
    interviewId: string,
    company: string,
    personality: string
  }
}
```

**Purpose**:
- Identify and fix bugs
- Monitor service health
- Improve error messages
- User support

## What We DON'T Log

❌ **Never Logged**:
- Passwords (hashed by Firebase)
- Payment information (if added in future)
- Sensitive personal information beyond what's needed
- Third-party API keys
- Private keys or secrets

⚠️ **Logged but Protected**:
- Interview transcripts (encrypted, user-owned)
- Email addresses (for authentication only)
- User names (for personalization)

## Monitoring & Alerting

### Current Monitoring

**Manual Monitoring**:
- Check Firebase Console for errors
- Review Vercel deployment logs
- Monitor VAPI dashboard for usage
- Check Google Cloud Console for Gemini API usage

**Metrics Tracked**:
- Total interviews conducted
- Average STAR scores
- AI API costs
- Error rates

### Future Monitoring (Recommended)

**Error Tracking**: Sentry
- Automatic error capture
- Stack traces
- User context
- Release tracking

**Performance Monitoring**: Vercel Analytics
- Page load times
- API response times
- Core Web Vitals
- User sessions

**Application Monitoring**: Custom Dashboard
- Real-time interview count
- Average evaluation time
- Cost per interview
- Success/failure rates

**Alerts**:
- Error rate > 5%
- API costs > $100/day
- Evaluation latency > 60s
- VAPI connection failures > 10%

## Debugging Workflows

### Debug Scenario 1: User Reports "Interview Won't Start"

**Steps**:
1. Check browser console logs
2. Look for VAPI error messages
3. Verify environment variables
4. Check VAPI dashboard for API status
5. Review user's interview document in Firestore
6. Check for rate limiting

**Logs to Review**:
```
🔵 Starting call...
- Type: interview
- Company: meta
- Personality: friendly
❌ Error starting VAPI call: [error details]
```

### Debug Scenario 2: Feedback Not Generating

**Steps**:
1. Check if interview was explicitly ended
2. Review evaluation logs
3. Check Gemini API quota
4. Verify transcript was captured
5. Check for AI errors in metadata

**Logs to Review**:
```
=== handleGenerateFeedback START ===
- Interview ID: abc123
- Messages count: 12
Running STAR analysis...
❌ Error in createFeedback: [error details]
```

### Debug Scenario 3: Low STAR Scores

**Steps**:
1. Review actual transcript
2. Check AI confidence scores
3. Compare with rule-based fallback
4. Review prompt version used
5. Check for edge cases (very short answers, off-topic)

**Data to Review**:
```typescript
starAnalysis: {
  action: {
    score: 30,
    confidence: 0.45,  // Low confidence!
    reasoning: "Vague actions, no specifics"
  }
}
```

## Cost Tracking

### Current Cost Structure

**Per Interview**:
- VAPI (voice): ~$0.05-0.10
- Gemini API (evaluation): ~$0.05-0.20
- Firebase (storage): negligible
- **Total**: ~$0.10-0.30 per interview

**Monthly Estimates** (100 interviews/month):
- VAPI: $5-10
- Gemini: $5-20
- Firebase: $0-5
- Vercel: $0 (free tier)
- **Total**: ~$10-35/month

### Cost Optimization Strategies

1. **Prompt Optimization**
   - Reduce prompt length
   - Use more efficient models
   - Cache common responses

2. **Batch Processing**
   - Evaluate multiple questions together
   - Reduce API calls

3. **Smart Fallbacks**
   - Use rule-based for simple cases
   - Only use AI for complex analysis

4. **Rate Limiting**
   - Limit interviews per user per day
   - Prevent abuse

## Privacy & Compliance

### GDPR Compliance

**User Rights**:
- **Right to Access**: Users can view all their data
- **Right to Delete**: Users can delete their account and all data
- **Right to Export**: Users can download their data (future)
- **Right to Rectify**: Users can update their information

**Implementation**:
```typescript
// Delete user data
async function deleteUserData(userId: string) {
  // Delete all interviews
  await deleteCollection(`interviews`, { userId });
  // Delete all feedback
  await deleteCollection(`feedback`, { userId });
  // Delete user profile
  await deleteDoc(`users/${userId}`);
  // Delete auth account
  await admin.auth().deleteUser(userId);
}
```

### Data Retention

**Active Users**: Indefinite
**Deleted Accounts**: 30 days grace period, then permanent deletion
**Logs**: 90 days
**Analytics**: Aggregated only, no PII

## Performance Metrics

### Target SLAs

- **Availability**: 99.5% uptime
- **Evaluation Latency**: <60 seconds (p95)
- **Page Load Time**: <3 seconds (p95)
- **Error Rate**: <1%

### Current Performance

**Measured**:
- Average evaluation time: 30-45 seconds
- VAPI connection success: ~95%
- Firebase read/write: <500ms

**To Improve**:
- Add caching for repeated evaluations
- Optimize prompt lengths
- Implement request queuing

## Future Enhancements

### Phase 1: Basic Monitoring (Next 1-2 months)
- [ ] Integrate Sentry for error tracking
- [ ] Add Vercel Analytics
- [ ] Create cost monitoring dashboard
- [ ] Set up basic alerts

### Phase 2: Advanced Analytics (3-6 months)
- [ ] User behavior analytics (PostHog/Mixpanel)
- [ ] A/B testing framework
- [ ] Custom metrics dashboard
- [ ] Automated performance reports

### Phase 3: ML Observability (6-12 months)
- [ ] Prompt performance tracking
- [ ] Model drift detection
- [ ] Automated prompt optimization
- [ ] Feedback loop for model improvement

## Appendix: Log Examples

### Successful Interview Flow
```
🔵 Starting call...
- Type: interview
- Company: google
- Personality: friendly
- Starting VAPI with config: {hasCompany: true, hasPersonality: true, questionsCount: 3}
✅ VAPI started successfully
speech start
speech end
=== handleGenerateFeedback START ===
- Interview ID: abc123
- User ID: user456
- Messages count: 14
Running STAR analysis...
Detecting red flags...
Generating google specific feedback...
Creating improvement plan...
✅ Enhanced feedback created successfully!
✅ Feedback saved successfully! Redirecting to feedback page...
```

### Error Flow
```
🔵 Starting call...
- Type: interview
- Company: meta
- Personality: friendly
- Starting VAPI with config: {hasCompany: true, hasPersonality: true, questionsCount: 3}
❌ Error starting VAPI call: Error: 400 Bad Request
Error: {type: 'start-method-error', stage: 'unknown', error: Response, totalDuration: 413}
```
