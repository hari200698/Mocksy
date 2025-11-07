# Use Cases

## User Personas

### Persona 1: Sarah - New Graduate
- **Background**: Recent CS graduate preparing for first FAANG interviews
- **Goals**: Learn STAR framework, build confidence, get specific feedback
- **Pain Points**: Doesn't know what "good" answers look like, nervous about interviews
- **Tech Comfort**: High

### Persona 2: Mike - Mid-Level Engineer
- **Background**: 3 years experience, switching companies
- **Goals**: Refresh interview skills, practice company-specific questions
- **Pain Points**: Rusty on behavioral interviews, limited time to prepare
- **Tech Comfort**: High

### Persona 3: Priya - Career Switcher
- **Background**: Bootcamp graduate transitioning from non-tech background
- **Goals**: Learn how to structure answers, understand what interviewers want
- **Pain Points**: Lacks professional examples, unsure about answer quality
- **Tech Comfort**: Medium

## Core Use Cases

### Use Case 1: First-Time Interview Practice

**Actor**: Sarah (New Graduate)

**Preconditions**:
- User has created an account
- User is logged in

**Main Flow**:
1. Sarah navigates to the dashboard
2. Clicks "Start New Interview"
3. Selects:
   - Company: Google
   - Role: Software Engineer
   - Personality: Friendly
4. System generates 3 behavioral questions focused on Google's values
5. Sarah clicks "Start Interview"
6. AI interviewer greets her warmly
7. Asks first question: "Tell me about a time you collaborated with a difficult team member"
8. Sarah answers (takes 2-3 minutes, pauses to think)
9. AI waits patiently, doesn't interrupt
10. AI acknowledges answer: "Thank you for sharing that!"
11. Moves to next question
12. After all questions, Sarah clicks "End Interview"
13. System generates comprehensive feedback
14. Sarah reviews:
    - STAR breakdown showing she missed quantifiable results
    - Comparison with strong example answer
    - Improvement plan with specific practice questions
    - Curated resources for learning

**Postconditions**:
- Interview saved to dashboard
- Feedback accessible anytime
- Sarah understands her weak areas

**Alternative Flows**:
- **A1**: Sarah accidentally closes browser mid-interview
  - System does NOT save incomplete interview
  - Sarah can restart fresh

### Use Case 2: Company-Specific Preparation

**Actor**: Mike (Mid-Level Engineer)

**Preconditions**:
- User has account
- Has done 2-3 generic interviews already

**Main Flow**:
1. Mike selects Amazon as target company
2. Chooses "Skeptical" personality (Bar Raiser simulation)
3. System generates questions focused on Amazon Leadership Principles
4. Interview begins with challenging tone
5. Mike answers question about ownership
6. AI gives minimal feedback: "Noted. Moving on."
7. Mike feels the pressure (realistic simulation)
8. Completes all questions
9. Reviews feedback showing:
    - Strong alignment with "Ownership" principle
    - Weak on "Dive Deep" - lacked specific data
    - Comparison with Amazon-style strong answer
    - Specific metrics he should have included

**Postconditions**:
- Mike understands Amazon's specific expectations
- Has concrete examples of what to improve
- Feels more prepared for real Amazon interview

### Use Case 3: Iterative Improvement

**Actor**: Priya (Career Switcher)

**Preconditions**:
- Has completed 3 interviews
- Reviewed feedback from all

**Main Flow**:
1. Priya reviews her dashboard showing interview history
2. Notices pattern: consistently low scores on "Result" component
3. Reads improvement plan from latest interview
4. Practices with recommended questions
5. Studies the strong example answers
6. Takes new interview focusing on including metrics
7. Sees improved Result score (45 → 72)
8. Gains confidence from measurable progress

**Postconditions**:
- Priya has documented improvement
- Understands the importance of quantifiable results
- Ready for real interviews

## Edge Cases & Error Scenarios

### Edge Case 1: Very Short Answers

**Scenario**: User gives one-sentence answers

**System Behavior**:
- STAR analysis flags missing components
- Scores appropriately low (20-40 range)
- Feedback explicitly states: "Your answer was too brief"
- Improvement plan focuses on expanding answers
- Shows example of complete STAR answer

### Edge Case 2: Off-Topic Answers

**Scenario**: User answers a different question than asked

**System Behavior**:
- STAR analysis may still detect components
- Red flag detection identifies misalignment
- Feedback notes: "Answer didn't directly address the question"
- Lower overall score

### Edge Case 3: Technical Jargon Overload

**Scenario**: User uses excessive technical terms without context

**System Behavior**:
- Communication score penalized
- Feedback suggests: "Explain technical concepts for non-technical interviewers"
- Clarity score reduced

### Edge Case 4: "I Don't Know" Answers

**Scenario**: User says "I don't have an example for this"

**System Behavior**:
- All STAR components marked as missing
- Score: 0-10
- Feedback: "Prepare examples for common question types"
- Improvement plan includes question bank to prepare

### Edge Case 5: Network Disconnection

**Scenario**: Internet drops during interview

**System Behavior**:
- VAPI call ends automatically
- `isExplicitEnd` remains false
- No feedback generated
- User can restart interview
- No partial data saved

### Edge Case 6: VAPI API Failure

**Scenario**: VAPI service is down

**System Behavior**:
- Error message displayed: "Unable to connect to interview service"
- User can retry
- Fallback: Text-based interview mode (future enhancement)

### Edge Case 7: Gemini API Rate Limit

**Scenario**: Too many requests to Gemini API

**System Behavior**:
- Evaluation falls back to rule-based analysis
- User still gets feedback (lower quality)
- System logs error for monitoring
- Retry logic with exponential backoff

## Success Criteria

### For Users
- **Completion Rate**: >80% of started interviews are completed
- **Improvement**: Users show measurable score improvement over 3+ interviews
- **Satisfaction**: Users report feeling more prepared for real interviews
- **Learning**: Users understand STAR framework after 2-3 interviews

### For System
- **Reliability**: 99% uptime for core features
- **Performance**: Feedback generated within 60 seconds
- **Accuracy**: STAR detection confidence >0.7 for 80% of answers
- **Cost**: <$0.50 per interview in AI API costs

## User Journeys

### Journey 1: Complete Beginner → Confident Interviewer

**Timeline**: 2-3 weeks

1. **Week 1**: Discovery & Learning
   - Takes first interview (Friendly mode)
   - Scores low (40-50 overall)
   - Reads all feedback carefully
   - Studies strong example answers
   - Learns what STAR framework means

2. **Week 2**: Practice & Iteration
   - Takes 3-4 more interviews
   - Tries different companies
   - Sees gradual improvement (50 → 60 → 65)
   - Focuses on weak areas (Results with metrics)
   - Uses recommended practice questions

3. **Week 3**: Mastery & Confidence
   - Takes Skeptical mode interview
   - Scores 75-80
   - Feels ready for real interviews
   - Has 5-6 polished STAR stories prepared

### Journey 2: Experienced Engineer → Company-Specific Expert

**Timeline**: 1 week

1. **Day 1-2**: Baseline & Assessment
   - Takes generic interview (scores 70-75)
   - Identifies strong areas (Action, Task)
   - Identifies weak area (company-specific alignment)

2. **Day 3-5**: Company-Specific Practice
   - Takes Amazon interview (Leadership Principles)
   - Takes Google interview (Googleyness)
   - Takes Meta interview (Impact focus)
   - Learns different company expectations

3. **Day 6-7**: Final Preparation
   - Takes Skeptical mode for target company
   - Scores 80+
   - Has company-specific examples ready
   - Confident about real interview

## Typical Workflows

### Workflow 1: Quick Practice Session (15-20 minutes)

```
Login → Start Interview → Select Company/Personality → 
Interview (10 min) → End Interview → Review Feedback (5 min)
```

### Workflow 2: Deep Learning Session (45-60 minutes)

```
Login → Review Past Interviews → Identify Patterns → 
Study Strong Examples → Take New Interview → 
Detailed Feedback Review → Practice Reflection Exercise → 
Read Recommended Resources
```

### Workflow 3: Pre-Interview Warm-up (30 minutes)

```
Login → Select Target Company → Skeptical Mode → 
Complete Interview → Quick Feedback Scan → 
Mental Preparation for Real Interview
```

## Feature Coverage

### Implemented Features (Checkpoint 3)

✅ **Core Interview Flow**
- Voice-based interviews with VAPI
- Real-time transcription
- Multiple question support
- Explicit end detection

✅ **STAR Framework Analysis**
- AI-powered component detection
- Weighted scoring system
- Confidence ratings
- Detailed feedback per component

✅ **Company-Specific Training**
- Amazon (Leadership Principles)
- Google (Googleyness)
- Meta (Impact focus)
- Generic (universal STAR)

✅ **Personality Modes**
- Friendly (encouraging)
- Neutral (professional)
- Skeptical (Bar Raiser)

✅ **Comprehensive Feedback**
- Overall STAR score
- Component breakdown
- Secondary metrics
- Red flag detection
- Principle information
- Answer comparisons
- Improvement plans

✅ **User Management**
- Authentication (Firebase)
- Interview history
- Dashboard
- Progress tracking

### Future Enhancements (Post-Checkpoint 3)

🔮 **Advanced Features**
- Video recording of practice sessions
- Peer review system
- Interview scheduling with reminders
- Mobile app
- Team/cohort features for bootcamps
- Integration with job application tracking

🔮 **AI Enhancements**
- Multi-language support
- Industry-specific questions (not just tech)
- Resume-based question generation
- Adaptive difficulty
- Sentiment analysis

🔮 **Analytics**
- Progress charts over time
- Benchmark against other users
- Weak area identification across interviews
- Recommended focus areas

## Metrics & KPIs

### User Engagement
- Daily Active Users (DAU)
- Weekly Active Users (WAU)
- Average interviews per user
- Completion rate
- Return rate (users who come back)

### Quality Metrics
- Average STAR score improvement
- Feedback helpfulness rating
- Feature usage (which feedback sections viewed most)
- Time spent reviewing feedback

### Technical Metrics
- API success rate
- Average response time
- Error rate
- Cost per interview
- Token usage efficiency

## Accessibility Considerations

### Current Support
- Keyboard navigation
- Screen reader compatible (semantic HTML)
- High contrast mode support
- Responsive design (mobile-friendly)

### Future Improvements
- Closed captions for AI voice
- Text-based interview mode
- Adjustable font sizes
- Color blind friendly design
