# MockSy - Enhanced Features Documentation

## 🎯 Overview

MockSy is an AI-powered behavioral interview preparation platform specifically designed for FAANG (Facebook/Meta, Amazon, Apple, Netflix, Google) and other top tech companies. Unlike generic interview prep tools, MockSy provides **structured STAR framework analysis** with **company-specific feedback** and **adaptive follow-up questions**.

---

## 🌟 Key Differentiators

### 1. **STAR Framework Enforcement (Primary Focus)**

**What it is:** Every answer is analyzed using the STAR framework with weighted scoring:
- **Situation** (15%): Context and background
- **Task** (10%): Specific goal or responsibility  
- **Action** (60%): Personal actions taken (most important!)
- **Result** (15%): Measurable outcomes

**Why it matters:** FAANG interviews heavily emphasize the STAR framework. Most candidates fail because they:
- Use too much "we" instead of "I" (unclear personal contribution)
- Miss quantifiable results
- Provide vague actions without specifics

**What you get:**
- Per-component scoring with confidence levels
- Detailed feedback on each STAR element
- Excerpts from your answer showing what was detected
- Critical issues flagged (e.g., "Missing metrics", "Too much 'we' language")
- Actionable rewrites: "Instead of 'we did X', say 'I led the effort to X, which resulted in Y% improvement'"

---

### 2. **Company-Specific Question Banks & Feedback**

**Curated Question Libraries:**
- **Amazon**: 96 questions across 16 Leadership Principles
- **Google**: 50 questions testing Googleyness and core attributes
- **Meta**: 60 questions aligned with 6 core values
- **Generic**: 80 universal behavioral questions

**Company-Specific Evaluation:**
- **Amazon**: Feedback emphasizes data, metrics, ownership, and customer obsession
- **Google**: Feedback focuses on collaboration, handling ambiguity, and innovation
- **Meta**: Feedback highlights impact, speed, boldness, and ROI
- **Generic**: Pure STAR framework evaluation without company bias

**Principle Mapping:**
- Each question is tagged with the specific principle it tests
- Feedback shows which principles you demonstrated (or missed)
- Example: "This answer demonstrates Amazon's 'Bias for Action' principle" ✅
- Or: "Missing demonstration of 'Dive Deep' - add data analysis details" ❌

---

### 3. **Dynamic Follow-Up Questions**

**How it works:**
1. You answer the main question
2. AI analyzes your answer in real-time
3. AI generates 1-2 follow-up questions targeting:
   - Missing STAR components
   - Vague claims needing clarification
   - Personal contribution (if you said "we" too much)
   - Measurable outcomes

**Example Flow:**
```
Q: "Tell me about a time you failed"
A: "We launched a feature that didn't work well..."

Follow-up 1: "What was YOUR specific role in this project?"
Follow-up 2: "How did you measure the failure? What were the specific metrics?"
```

**Why it's unique:** Most AI interview tools ask canned questions and move on. Real FAANG interviews are **conversations** with probing follow-ups. This trains you for that reality.

---

### 4. **Interviewer Personality Modes**

Choose your interviewer's style:

**😊 Friendly Mode**
- Encouraging and supportive
- Gives hints when you struggle
- Best for: Building confidence, first-time practice
- Example: "That's a great start! Now, can you tell me more about YOUR specific actions?"

**😐 Neutral Mode** (Default)
- Professional and balanced
- Standard interview style
- Best for: Realistic interview simulation
- Example: "I see. What was the measurable outcome?"

**🤨 Skeptical Mode** (Bar Raiser)
- Challenging and probing
- Tests your answers thoroughly
- Best for: Advanced prep, stress testing
- Example: "I'm not sure I understand how that demonstrates leadership. What would your manager say about your role?"

---

### 5. **Per-Question Detailed Feedback**

**Tabbed Interface:**
- Summary tab: Overall performance across all questions
- Q1, Q2, Q3... tabs: Detailed feedback per question

**Each Question Shows:**
1. **STAR Breakdown** (Primary)
   - Visual color-coded scores (green/yellow/red)
   - Confidence levels for each component
   - Excerpts from your answer
   - Detailed improvement suggestions

2. **Red Flags** (If detected)
   - Severity: Critical / Major / Minor
   - Evidence from your answer
   - Why it matters
   - How to fix it

3. **Company-Specific Feedback** (For FAANG)
   - Principles demonstrated
   - Principles missed
   - Company-specific tips
   - What interviewers will likely ask next

4. **Secondary Metrics** (1-5 stars)
   - Structure & Organization
   - Communication
   - Clarity
   - Confidence

5. **Answer Comparison**
   - Side-by-side with strong example answer
   - Why the example is strong
   - Specific gaps in your answer
   - STAR breakdown of example

6. **Improvement Plan**
   - Top 3 focus areas
   - Practice questions targeting weaknesses
   - Learning resources (videos, articles)
   - Reflection exercises

---

### 6. **Summary Dashboard**

**Overall Performance:**
- Aggregate STAR score across all questions
- AI confidence in evaluation
- Company alignment summary

**Question Breakdown:**
- Visual list of all questions with scores
- Quick identification of strong vs weak answers

**Strengths & Improvements:**
- What you're doing well
- What needs work
- Critical issues appearing in multiple answers

**Performance Insights:**
- How many strong answers (≥75)
- How many moderate (60-74)
- How many need work (<60)

**Next Steps:**
- Actionable recommendations
- Specific practice areas
- Company-specific tips

---

## 🔧 Technical Features

### Prompt Versioning System
- All AI prompts are versioned (`star-detection-v1.md`, etc.)
- Enables A/B testing and systematic iteration
- Track which prompt version was used per evaluation

### Confidence Scoring
- AI rates its own confidence (0.0-1.0) for each STAR component
- Flags low-confidence detections
- Shows when AI is uncertain vs certain

### Telemetry & Cost Tracking
- Tokens used per evaluation
- Estimated cost (in USD)
- Latency (processing time)
- Model versions used

### Fallback Mechanisms
- If AI fails, rule-based analysis kicks in
- Ensures you always get feedback
- Graceful degradation

### Hybrid Approach
- Curated questions (quality control)
- AI-generated follow-ups (flexibility)
- Structured evaluation (consistency)

---

## 📊 Use Cases

### For Job Seekers
- **Preparing for FAANG interviews**: Get company-specific practice
- **Learning STAR framework**: Structured feedback teaches the method
- **Building confidence**: Start with Friendly mode, progress to Skeptical
- **Identifying weak areas**: See exactly what to improve

### For Career Coaches
- **Assessing client readiness**: Objective STAR scoring
- **Tracking progress**: Compare scores over time
- **Targeted coaching**: Focus on specific STAR components

### For Students
- **Interview skill development**: Learn professional communication
- **Real-world practice**: Simulate actual interview pressure
- **Portfolio building**: Document your stories and improvements

---

## 🎓 Educational Value

### What You Learn
1. **STAR Framework Mastery**: Understand the structure FAANG expects
2. **Quantifying Impact**: Learn to add metrics to every answer
3. **Personal Contribution**: Distinguish "I" from "we"
4. **Company Values**: Understand what each company prioritizes
5. **Follow-up Handling**: Practice responding to probing questions

### Skills Developed
- Structured storytelling
- Data-driven communication
- Confidence under pressure
- Adaptability (different interviewer styles)
- Self-reflection and improvement

---

## 🚀 Roadmap (Future Enhancements)

### Planned Features
- [ ] Story Bank: Pre-load your experiences, map to questions
- [ ] Principle Mastery Tracker: Progress bars for each company principle
- [ ] Voice Tone Analysis: Detect confidence, filler words, pacing
- [ ] Interview Replay: Playback with annotations
- [ ] Peer Practice: Match with other candidates
- [ ] Mobile App: Practice on the go

### Research Features
- [ ] Predictive scoring: "You're ready for L5 at Amazon"
- [ ] Benchmarking: Compare to other candidates
- [ ] Success correlation: Track offer rates

---

## 📈 Success Metrics

**What Good Looks Like:**
- STAR Score ≥75: Strong, interview-ready answers
- STAR Score 60-74: Moderate, needs refinement
- STAR Score <60: Needs significant work

**Component Targets:**
- Situation: ≥70 (clear context)
- Task: ≥70 (defined goal)
- Action: ≥75 (specific personal actions) ← Most important!
- Result: ≥70 (quantifiable outcomes)

**Red Flags to Avoid:**
- ❌ Blaming others
- ❌ Taking undue credit
- ❌ No metrics/data
- ❌ Hypothetical answers
- ❌ Unclear personal contribution

---

## 🎯 Best Practices

### Before Interview
1. Select the right company (Amazon/Google/Meta/Generic)
2. Choose appropriate personality (Friendly → Neutral → Skeptical)
3. Start with 3-5 questions, not 10

### During Interview
1. Use STAR framework consciously
2. Say "I" not "we"
3. Include specific numbers and metrics
4. Answer follow-ups directly

### After Interview
1. Review per-question feedback carefully
2. Focus on lowest-scoring STAR component
3. Practice 2-3 more questions targeting weakness
4. Compare your answer with strong examples

### Progression Path
1. **Week 1**: Friendly mode, 3 questions, Generic company
2. **Week 2**: Neutral mode, 5 questions, Target company
3. **Week 3**: Skeptical mode, 5 questions, Target company
4. **Week 4**: Neutral mode, 7 questions, Multiple companies

---

## 💡 Tips for Maximum Benefit

### Getting Better Feedback
- Speak clearly and at moderate pace
- Aim for 2-3 minute answers
- Include specific dates, numbers, and names
- Describe YOUR actions, not the team's

### Common Mistakes to Avoid
- Don't memorize answers word-for-word (sounds robotic)
- Don't skip the Result (most common mistake)
- Don't use "we" without clarifying "I"
- Don't give hypothetical answers ("I would...")

### Leveraging AI Feedback
- Read the "reasoning" field to understand scoring
- Check confidence levels - low confidence = ambiguous answer
- Use actionable rewrites as templates
- Compare with strong examples to see patterns

---

## 🔒 Privacy & Data

- Interviews are stored per-user in Firebase
- Transcripts are processed for feedback only
- No data is shared with third parties
- You can delete your interviews anytime

---

## 🤝 Contributing

This is an academic project for IS492 - GenAI for Human-AI Collaboration.

**Team Members:** [Your names]
**Institution:** [Your university]
**Course:** IS492
**Semester:** [Current semester]

---

## 📞 Support

For issues or questions:
- Check INSTALL.md for setup instructions
- Review this FEATURES.md for usage guidance
- Open an issue on GitHub
- Contact: [Your contact info]

---

**Built with:** Next.js, Firebase, Vapi AI, Google Gemini, TailwindCSS, shadcn/ui
