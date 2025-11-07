import { CompanyType } from "./company-profiles";

export interface ExampleAnswer {
  question: string;
  principle: string;
  company: CompanyType;
  strongAnswer: string;
  whyItsStrong: string[];
  starBreakdown: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
}

/**
 * Get example strong answer for a given principle
 */
export function getExampleAnswer(
  company: CompanyType,
  principle: string
): ExampleAnswer | null {
  const key = `${company}_${principle}`;
  return EXAMPLE_ANSWERS[key] || null;
}

/**
 * Curated example answers showing strong STAR framework usage
 */
const EXAMPLE_ANSWERS: Record<string, ExampleAnswer> = {
  // ============================================
  // AMAZON LEADERSHIP PRINCIPLES (16 principles)
  // ============================================

  amazon_customerObsession: {
    question: "Tell me about a time when you went above and beyond for a customer",
    principle: "customerObsession",
    company: "amazon",
    strongAnswer: `In Q3 2023, I was a product manager when we received feedback that our mobile app's search feature was frustrating users with disabilities. Our accessibility score was 2.8/5, and we had 47 support tickets from visually impaired users saying they couldn't find products efficiently.

I personally reached out to 15 customers who filed complaints and conducted 1-hour interviews to understand their pain points. I learned that screen readers couldn't properly announce product details, and voice search was unreliable. Even though this wasn't my assigned project, I made it my priority.

I assembled a cross-functional team, partnered with accessibility consultants, and we redesigned the search experience. I personally tested every change with screen readers and invited 8 customers to beta test. We iterated based on their feedback for 6 weeks.

The result: accessibility score improved to 4.7/5, support tickets dropped by 89%, and we saw a 34% increase in purchases from users with accessibility settings enabled. Three customers sent personal thank-you emails. This became a company-wide case study on customer-first design.`,
    whyItsStrong: [
      "Proactive customer engagement (15 personal interviews)",
      "Took ownership beyond role responsibilities",
      "Specific metrics (2.8 to 4.7 score, 89% ticket reduction, 34% purchase increase)",
      "Customer validation (beta testing with 8 customers)",
      "Lasting impact (company-wide case study)",
    ],
    starBreakdown: {
      situation: "Q3 2023, mobile app accessibility score 2.8/5, 47 support tickets from visually impaired users struggling with search",
      task: "Improve search experience for users with disabilities",
      action: "Interviewed 15 customers, assembled cross-functional team, partnered with accessibility consultants, redesigned search, tested with screen readers, ran 6-week beta with 8 customers",
      result: "Accessibility score 2.8 → 4.7, support tickets -89%, purchases from accessibility users +34%, became company case study",
    },
  },

  amazon_ownership: {
    question: "Tell me about a time you took on something outside your area of responsibility",
    principle: "ownership",
    company: "amazon",
    strongAnswer: `In Q2 2023, I noticed our customer support team was spending 15+ hours per week manually processing refund requests, even though I was a backend engineer. I took ownership of this problem because it was impacting customer satisfaction scores, which had dropped from 4.2 to 3.8 stars.

I proposed building an automated refund approval system. I spent my evenings for 3 weeks designing the workflow, got buy-in from the support and finance teams, and implemented a rule-based engine that could auto-approve 80% of standard refund cases.

I personally wrote the code, set up monitoring dashboards, and trained the support team on the new system. When we launched, I stayed on-call for the first week to handle any issues.

The result: refund processing time dropped from 24 hours to under 2 hours, support team saved 12 hours per week, and customer satisfaction recovered to 4.5 stars within a month. The system is still in use 18 months later and has processed over 50,000 refunds with 99.2% accuracy.`,
    whyItsStrong: [
      "Clear metrics throughout (15+ hours, 4.2 to 3.8 stars, 80% auto-approval)",
      "Strong ownership - took initiative outside role",
      "Specific personal actions ('I proposed', 'I personally wrote', 'I stayed on-call')",
      "Quantifiable results (24h to 2h, 12 hours saved, 4.5 stars)",
      "Long-term impact (18 months later, 50,000 refunds, 99.2% accuracy)",
    ],
    starBreakdown: {
      situation: "Q2 2023, support team spending 15+ hours/week on manual refunds, customer satisfaction dropped from 4.2 to 3.8",
      task: "Build automated refund approval system to reduce processing time and improve satisfaction",
      action: "Designed workflow, got buy-in, implemented rule-based engine, trained team, stayed on-call for launch",
      result: "Processing time: 24h → 2h, saved 12 hours/week, satisfaction: 3.8 → 4.5 stars, 50K+ refunds processed with 99.2% accuracy",
    },
  },

  amazon_inventAndSimplify: {
    question: "Tell me about a time when you simplified a process or system",
    principle: "inventAndSimplify",
    company: "amazon",
    strongAnswer: `In 2023, our deployment process required 47 manual steps across 3 different tools, taking 4 hours per deploy and causing frequent errors. We could only deploy twice a week, slowing down our release cycle significantly.

I proposed consolidating everything into a single automated pipeline. I spent 2 weeks analyzing the existing process, identifying which steps were truly necessary (only 12 of the 47), and designing a streamlined workflow.

I built a one-click deployment system using GitHub Actions that automated testing, security scans, and deployment. I added rollback capabilities and real-time monitoring. I documented everything and trained the team over 3 sessions.

The result: deployment time went from 4 hours to 12 minutes, error rate dropped from 23% to under 2%, and we increased deployment frequency from 2x/week to 15x/week. The team's velocity improved by 40%, and we shipped features 3x faster. Six other teams adopted our pipeline within 3 months.`,
    whyItsStrong: [
      "Identified unnecessary complexity (47 steps to 12)",
      "Quantified time savings (4 hours to 12 minutes)",
      "Measurable quality improvement (23% to 2% error rate)",
      "Business impact (3x faster feature shipping, 40% velocity increase)",
      "Scalable solution (6 other teams adopted it)",
    ],
    starBreakdown: {
      situation: "2023, deployment process had 47 manual steps across 3 tools, took 4 hours, 23% error rate, only 2 deploys/week",
      task: "Simplify and automate deployment process",
      action: "Analyzed process, identified 12 essential steps, built one-click GitHub Actions pipeline with automated testing and rollback, trained team",
      result: "4 hours → 12 minutes, errors 23% → 2%, deploys 2x/week → 15x/week, velocity +40%, 6 teams adopted it",
    },
  },

  amazon_areRightALot: {
    question: "Tell me about a time when you made a difficult decision with incomplete information",
    principle: "areRightALot",
    company: "amazon",
    strongAnswer: `In Q4 2023, we had to choose between two database architectures for our new service: SQL (familiar, proven) or NoSQL (better performance, but team had no experience). We had only 2 weeks to decide before our deadline, and data was inconclusive.

I gathered what data I could: benchmarked both with our expected load, interviewed 3 teams who'd made similar choices, and analyzed our specific access patterns. My gut said NoSQL despite the team's concerns about the learning curve.

I made the call to go with NoSQL, but mitigated risk by: (1) running both systems in parallel for the first month, (2) hiring a consultant for the first 2 weeks, and (3) building comprehensive monitoring. I took full accountability for the decision.

The result: I was right. Our service handled 10x the expected load without issues, response times were 5x faster than projected, and the system scaled effortlessly during a viral event (50x traffic spike). The team became NoSQL experts and now advocates for it. My decision saved an estimated $200K/year in infrastructure costs.`,
    whyItsStrong: [
      "Showed decision-making process (benchmarks, interviews, analysis)",
      "Made tough call despite team concerns",
      "Risk mitigation strategy (parallel systems, consultant, monitoring)",
      "Took accountability",
      "Validated with results (10x load, 5x faster, $200K savings)",
    ],
    starBreakdown: {
      situation: "Q4 2023, had to choose SQL vs NoSQL for new service, 2 weeks to decide, inconclusive data, team preferred familiar SQL",
      task: "Make architecture decision with limited information",
      action: "Benchmarked both, interviewed 3 teams, analyzed access patterns, chose NoSQL, mitigated risk with parallel systems and consultant",
      result: "Handled 10x expected load, 5x faster response times, scaled through 50x traffic spike, saved $200K/year, team became NoSQL advocates",
    },
  },

  amazon_learnAndBeCurious: {
    question: "Tell me about a time when you taught yourself a new skill to complete a project",
    principle: "learnAndBeCurious",
    company: "amazon",
    strongAnswer: `In early 2024, our team needed to implement machine learning for product recommendations, but none of us had ML experience. The alternative was hiring an external consultant for $150K, which would delay us by 3 months.

I volunteered to learn ML and build it myself. I spent 6 weeks doing online courses (Andrew Ng's ML course), reading research papers, and building small prototypes. I joined ML communities, asked questions, and experimented with different algorithms.

I built a recommendation engine using collaborative filtering, tested it with A/B tests on 10% of traffic, iterated based on results, and gradually rolled it out. I documented everything I learned and ran 3 training sessions for the team.

The result: our recommendation click-through rate increased by 47%, revenue from recommendations grew by $2.3M annually, and we saved the $150K consultant fee. I became the team's ML expert and have since mentored 4 engineers. My curiosity turned into a core competency for our team.`,
    whyItsStrong: [
      "Self-directed learning (6 weeks of courses and research)",
      "Practical application (built working system)",
      "Risk management (A/B testing, gradual rollout)",
      "Knowledge sharing (documented and trained team)",
      "Measurable impact (47% CTR increase, $2.3M revenue, $150K saved)",
    ],
    starBreakdown: {
      situation: "Early 2024, team needed ML for recommendations, no ML experience, consultant would cost $150K and delay 3 months",
      task: "Learn ML and build recommendation engine myself",
      action: "6 weeks of courses and research, built prototypes, implemented collaborative filtering, A/B tested, documented and trained team",
      result: "CTR +47%, revenue +$2.3M/year, saved $150K, became team ML expert, mentored 4 engineers",
    },
  },

  amazon_hireAndDevelopTheBest: {
    question: "Tell me about a time when you mentored someone and helped them grow",
    principle: "hireAndDevelopTheBest",
    company: "amazon",
    strongAnswer: `In 2023, I was assigned to mentor Sarah, a junior engineer who was struggling. Her code reviews were taking 3-4 iterations, she missed 2 deadlines, and her confidence was low. Her manager was considering a performance improvement plan.

I set up weekly 1-on-1s to understand her challenges. I learned she was overwhelmed and didn't know how to ask for help. I created a personalized development plan: pair programming twice a week, code review guidelines, and breaking down large tasks into smaller chunks.

I invested 5 hours per week mentoring her for 4 months. I celebrated her small wins, gave constructive feedback, and gradually increased her autonomy. When she struggled with system design, I taught her my framework. When she lacked confidence, I had her present her work to the team with my support.

The result: Sarah's code quality improved dramatically (first-pass approval rate went from 25% to 85%), she delivered 3 major features on time, and received a promotion within 8 months. She's now mentoring two junior engineers herself. My manager said my mentorship saved a talented engineer and raised the bar for our team.`,
    whyItsStrong: [
      "Identified root cause (overwhelmed, didn't know how to ask for help)",
      "Structured development plan (pair programming, guidelines, task breakdown)",
      "Significant time investment (5 hours/week for 4 months)",
      "Measurable improvement (25% to 85% first-pass approval)",
      "Long-term success (promotion, now mentoring others)",
    ],
    starBreakdown: {
      situation: "2023, mentoring junior engineer Sarah who was struggling, 3-4 code review iterations, missed 2 deadlines, low confidence, manager considering PIP",
      task: "Help Sarah improve performance and confidence",
      action: "Weekly 1-on-1s, created personalized development plan, 5 hours/week mentoring for 4 months, pair programming, taught system design, supported presentations",
      result: "Code approval rate 25% → 85%, delivered 3 major features on time, promoted in 8 months, now mentoring 2 engineers",
    },
  },

  amazon_insistOnHighestStandards: {
    question: "Tell me about a time when you refused to compromise on quality",
    principle: "insistOnHighestStandards",
    company: "amazon",
    strongAnswer: `In Q3 2023, we were 2 weeks from launching a major feature when I discovered our error handling was inadequate. Edge cases weren't covered, and under high load, the system could corrupt user data. The team wanted to ship and fix it later, but I refused.

I presented the risks to leadership: potential data corruption affecting up to 10,000 users, reputational damage, and costly rollback. I proposed delaying the launch by 3 weeks to properly fix it, even though we'd miss our quarterly goal.

I personally rewrote the error handling system, added comprehensive testing (unit, integration, and chaos testing), and implemented circuit breakers. I worked nights and weekends to minimize the delay. I also created a quality checklist for future launches.

The result: we launched 3 weeks late but with zero critical bugs. The system handled a 10x traffic spike flawlessly during Black Friday. My quality checklist prevented 3 other teams from shipping with similar issues. Leadership praised my decision, saying I saved the company from a potential disaster. Quality became our team's reputation.`,
    whyItsStrong: [
      "Stood firm despite pressure (refused to ship with known issues)",
      "Quantified risks (10,000 users, data corruption, reputational damage)",
      "Personal accountability (worked nights and weekends)",
      "Proactive prevention (created quality checklist)",
      "Validated decision (zero critical bugs, handled 10x spike, prevented issues for 3 teams)",
    ],
    starBreakdown: {
      situation: "Q3 2023, 2 weeks from launch, discovered inadequate error handling that could corrupt data for 10K users, team wanted to ship anyway",
      task: "Ensure quality standards despite deadline pressure",
      action: "Presented risks to leadership, proposed 3-week delay, rewrote error handling, added comprehensive testing, worked nights/weekends, created quality checklist",
      result: "Launched with zero critical bugs, handled 10x Black Friday spike, checklist prevented issues for 3 teams, saved company from potential disaster",
    },
  },

  amazon_thinkBig: {
    question: "Tell me about a time when you proposed a bold or ambitious idea",
    principle: "thinkBig",
    company: "amazon",
    strongAnswer: `In 2023, I was working on our mobile app when I realized we were thinking too small. Instead of incremental improvements, I proposed rebuilding our entire customer experience around AI-powered personalization - a $2M investment with uncertain ROI.

I created a comprehensive vision: every user would get a unique experience based on their behavior, preferences, and context. I built a prototype in 3 weeks, showed it to 50 users, and gathered data showing 67% preferred it over our current app.

I pitched it to the executive team with a 3-year roadmap, competitive analysis, and financial projections. I got approval for a 6-month pilot with 10% of users. I led a team of 8 engineers, partnered with data science, and we launched in Q4 2023.

The result: pilot users showed 34% higher engagement, 28% more purchases, and 41% better retention. We got full funding to roll out to all users. By Q2 2024, revenue from mobile increased by $8.7M annually, and our app store rating went from 4.1 to 4.7. My big thinking transformed our mobile strategy and became a company-wide initiative.`,
    whyItsStrong: [
      "Bold vision ($2M investment, complete rebuild)",
      "Validated with data (prototype tested with 50 users, 67% preferred it)",
      "Strategic approach (3-year roadmap, competitive analysis, financial projections)",
      "Risk mitigation (6-month pilot with 10% users)",
      "Massive impact (34% engagement, 28% purchases, $8.7M revenue, 4.1 to 4.7 rating)",
    ],
    starBreakdown: {
      situation: "2023, working on mobile app incremental improvements, realized we were thinking too small",
      task: "Propose and execute bold vision for AI-powered personalized experience",
      action: "Built prototype, tested with 50 users, pitched to executives with roadmap and projections, led 6-month pilot with 10% users",
      result: "Pilot: +34% engagement, +28% purchases, +41% retention. Full rollout: +$8.7M revenue, rating 4.1 → 4.7, became company-wide initiative",
    },
  },

  amazon_biasForAction: {
    question: "Tell me about a time when you had to make a quick decision with limited information",
    principle: "biasForAction",
    company: "amazon",
    strongAnswer: `During Black Friday 2023, at 2 AM, our payment gateway started failing with a 15% error rate. I was the on-call engineer. We were losing approximately $5,000 per minute in failed transactions.

I had 10 minutes to decide: wait for the full team to debug (could take hours) or switch to our backup payment provider (untested at this scale). I quickly checked our backup provider's status page, saw they were healthy, and made the call to switch.

I executed the failover in 8 minutes, updated our monitoring alerts, and notified the team via Slack. I stayed online to monitor for the next 4 hours, ready to roll back if needed.

The result: we recovered within 10 minutes, processed $2.3M in transactions through the backup provider with zero errors, and only lost an estimated $50K compared to the potential $1.2M if we'd waited for a full debug. The next day, we identified the root cause (a vendor-side issue) and switched back. My quick decision saved the company over $1M in revenue.`,
    whyItsStrong: [
      "Time pressure clearly stated (2 AM, Black Friday, $5K/minute loss)",
      "Decision trade-offs explained (wait vs switch)",
      "Quick action with specific timeline (10 minutes to decide, 8 minutes to execute)",
      "Concrete results ($2.3M processed, $50K lost vs $1.2M potential loss)",
      "Demonstrates calculated risk-taking, not recklessness",
    ],
    starBreakdown: {
      situation: "Black Friday 2 AM, payment gateway failing at 15% error rate, losing $5K/minute",
      task: "Decide quickly: wait for team debug (hours) or switch to untested backup provider",
      action: "Checked backup status, made call to switch in 10 min, executed failover in 8 min, monitored for 4 hours",
      result: "Recovered in 10 min, processed $2.3M with zero errors, lost $50K vs potential $1.2M, saved company $1M+",
    },
  },

  amazon_frugality: {
    question: "Tell me about a time when you accomplished more with less",
    principle: "frugality",
    company: "amazon",
    strongAnswer: `In Q1 2024, our cloud infrastructure costs were $45K/month and growing 15% monthly. Leadership wanted to cut costs by 30% but maintain performance. The easy solution was to buy more efficient (expensive) servers, but I saw an opportunity to be more frugal.

I spent 2 weeks analyzing our usage patterns and discovered we were massively over-provisioned. I found: (1) 40% of our servers were idle during off-peak hours, (2) we were using expensive storage for logs that could use cheaper options, and (3) our caching was inefficient.

I implemented auto-scaling to shut down idle servers, migrated logs to cheaper storage, and optimized our caching layer. I used only free/existing tools - no new purchases. I monitored closely for 2 weeks to ensure performance didn't degrade.

The result: we reduced costs from $45K to $28K/month (38% reduction, exceeding the 30% goal), and performance actually improved by 12% due to better caching. We saved $204K annually with zero capital investment. My frugal approach became the template for 5 other teams, saving the company an additional $500K/year.`,
    whyItsStrong: [
      "Exceeded goal (38% vs 30% target)",
      "Root cause analysis (identified 3 specific inefficiencies)",
      "Creative solution (used existing tools, no new purchases)",
      "Performance improvement alongside cost reduction",
      "Scalable impact ($204K saved, template for 5 teams, additional $500K/year)",
    ],
    starBreakdown: {
      situation: "Q1 2024, cloud costs $45K/month growing 15% monthly, leadership wanted 30% reduction",
      task: "Cut costs by 30% without degrading performance, without buying expensive new servers",
      action: "Analyzed usage, found over-provisioning, implemented auto-scaling, migrated logs to cheaper storage, optimized caching, used only free tools",
      result: "Costs $45K → $28K (38% reduction), performance +12%, saved $204K/year, template for 5 teams, additional $500K/year saved",
    },
  },

  amazon_earnTrust: {
    question: "Tell me about a time when you admitted a mistake and rebuilt trust",
    principle: "earnTrust",
    company: "amazon",
    strongAnswer: `In Q2 2023, I led a database migration that I assured leadership would have zero downtime. During the migration, I made a configuration error that caused a 3-hour outage, affecting 50,000 users and costing an estimated $75K in lost revenue. I was devastated.

I immediately took full responsibility. I sent a detailed incident report to leadership explaining exactly what I did wrong, why it happened, and that it was 100% my fault - no excuses. I apologized to the affected teams and users.

Then I focused on rebuilding trust through action. I created a comprehensive post-mortem, implemented 5 safeguards to prevent similar issues, and volunteered to lead a company-wide training on database migrations. I personally reached out to the 3 most affected customers to apologize and explain our improvements.

The result: leadership appreciated my transparency and accountability. I successfully led 4 more migrations with zero issues. My post-mortem became required reading for all engineers. Two customers I apologized to became our biggest advocates. My manager said my response to failure earned more trust than if I'd never failed at all.`,
    whyItsStrong: [
      "Complete accountability (no excuses, 100% my fault)",
      "Immediate transparency (detailed incident report)",
      "Action-oriented recovery (5 safeguards, company-wide training)",
      "Personal outreach (apologized to affected customers)",
      "Demonstrated growth (4 successful migrations, became required reading)",
    ],
    starBreakdown: {
      situation: "Q2 2023, led database migration, assured zero downtime, made configuration error causing 3-hour outage, 50K users affected, $75K lost",
      task: "Take responsibility and rebuild trust",
      action: "Immediately took full responsibility, sent detailed incident report, apologized to teams and users, created post-mortem, implemented 5 safeguards, led company training, personally reached out to 3 customers",
      result: "Led 4 more migrations with zero issues, post-mortem became required reading, 2 customers became advocates, earned more trust through response",
    },
  },

  amazon_diveDeep: {
    question: "Tell me about a time when you identified a problem by diving into the details",
    principle: "diveDeep",
    company: "amazon",
    strongAnswer: `In Q4 2023, our API response times suddenly increased from 200ms to 800ms, but all our monitoring showed green. The team assumed it was temporary network issues, but I wasn't satisfied with that explanation.

I dove deep into the data. I analyzed 2 weeks of logs (over 10 million requests), correlated response times with specific endpoints, user types, and time of day. I discovered the slowdown only affected authenticated users making specific types of queries.

I traced the issue to a database index that was corrupted during a routine maintenance. The corruption was subtle - queries still worked but were 4x slower. Our monitoring missed it because it checked overall health, not query performance.

I fixed the index, implemented query-level performance monitoring, and created alerts for similar issues. I also audited all our other indexes and found 3 more potential problems that I fixed proactively.

The result: response times returned to 180ms (even better than before), user satisfaction scores improved by 8%, and we prevented 3 future incidents. My deep dive saved an estimated $200K in potential lost revenue and became a case study in thorough problem investigation.`,
    whyItsStrong: [
      "Didn't accept surface-level explanation",
      "Thorough analysis (10 million requests, multiple correlations)",
      "Root cause identification (corrupted database index)",
      "Proactive prevention (audited all indexes, found 3 more issues)",
      "Measurable impact (800ms to 180ms, +8% satisfaction, $200K saved)",
    ],
    starBreakdown: {
      situation: "Q4 2023, API response times 200ms → 800ms, monitoring showed green, team assumed network issues",
      task: "Find root cause of performance degradation",
      action: "Analyzed 10M requests over 2 weeks, correlated with endpoints/users/time, traced to corrupted database index, fixed it, implemented query-level monitoring, audited all indexes",
      result: "Response times → 180ms, satisfaction +8%, prevented 3 future incidents, saved $200K, became case study",
    },
  },

  amazon_haveBackbone: {
    question: "Tell me about a time when you disagreed with your manager or senior leadership",
    principle: "haveBackbone",
    company: "amazon",
    strongAnswer: `In Q3 2023, my director wanted to sunset our legacy API that still had 200 active integrations, arguing it was costing too much to maintain. I strongly disagreed because I knew those integrations included critical partners generating $5M annually.

I respectfully challenged the decision in our leadership meeting. I presented data showing: (1) the 200 integrations generated $5M/year, (2) migration would take partners 6-12 months, and (3) we'd likely lose 30-40% of them. I proposed an alternative: maintain the API for 18 months while we built a better migration path.

My director pushed back, saying I was being too cautious. I stood my ground, saying "I understand the maintenance cost, but I believe the revenue risk is greater. I'm willing to own the migration project to prove we can do this right." I committed to personally leading the effort.

After debate, leadership agreed to my 18-month plan. I led the migration, built comprehensive documentation, and personally supported the top 20 partners. We successfully migrated 180 of 200 integrations (90%) and retained $4.7M of the $5M revenue (94%).

My director later thanked me for having the backbone to disagree. He said my pushback saved the company from a costly mistake.`,
    whyItsStrong: [
      "Respectful but firm disagreement with director",
      "Data-driven argument ($5M revenue, 30-40% loss risk)",
      "Proposed alternative solution (18-month plan)",
      "Personal accountability (committed to own the project)",
      "Successful outcome (90% migration rate, 94% revenue retained)",
    ],
    starBreakdown: {
      situation: "Q3 2023, director wanted to sunset legacy API with 200 integrations generating $5M/year, I disagreed",
      task: "Challenge decision and propose better alternative",
      action: "Presented data on revenue risk and migration timeline, proposed 18-month plan, committed to personally lead migration, supported top 20 partners",
      result: "Leadership agreed, migrated 180/200 integrations (90%), retained $4.7M/5M revenue (94%), director thanked me for pushback",
    },
  },

  amazon_deliverResults: {
    question: "Tell me about a time when you delivered results despite significant obstacles",
    principle: "deliverResults",
    company: "amazon",
    strongAnswer: `In Q1 2024, I was leading a critical product launch scheduled for March 15th. Two weeks before launch, our lead engineer quit unexpectedly, and we discovered a major security vulnerability that required a complete redesign of our authentication system.

I refused to accept failure. I personally took over the engineering work, working 12-hour days. I brought in a security consultant (negotiated a 50% discount), and I re-scoped the launch to focus on core features only, moving nice-to-haves to v1.1.

I ran daily standups, unblocked the team constantly, and personally coded the authentication system. I communicated transparently with stakeholders about the challenges and our mitigation plan. I tested everything myself over the weekend before launch.

We launched on March 15th as promised. The product was secure, stable, and met all core requirements. In the first month, we acquired 5,000 users, generated $200K in revenue, and received a 4.6/5 rating. My stakeholders said they'd never seen someone deliver under such pressure. I proved that obstacles are just problems to be solved.`,
    whyItsStrong: [
      "Multiple significant obstacles (engineer quit, security vulnerability)",
      "Personal accountability (took over engineering work, 12-hour days)",
      "Creative problem-solving (brought in consultant, re-scoped launch)",
      "Delivered on time despite challenges",
      "Strong results (5K users, $200K revenue, 4.6/5 rating)",
    ],
    starBreakdown: {
      situation: "Q1 2024, critical launch scheduled March 15th, 2 weeks before: lead engineer quit, major security vulnerability discovered requiring complete redesign",
      task: "Deliver launch on time despite obstacles",
      action: "Personally took over engineering, worked 12-hour days, brought in consultant, re-scoped to core features, ran daily standups, coded authentication system, tested over weekend",
      result: "Launched March 15th as promised, 5K users first month, $200K revenue, 4.6/5 rating, stakeholders praised delivery under pressure",
    },
  },

  amazon_striveToBeEarthsBestEmployer: {
    question: "Tell me about a time when you improved the work environment for your team",
    principle: "striveToBeEarthsBestEmployer",
    company: "amazon",
    strongAnswer: `In Q2 2023, I noticed our team's morale was declining. Our employee engagement score dropped from 78% to 61%, and we had 3 resignations in 2 months. People were burned out from constant on-call rotations and felt their growth was stagnant.

I surveyed the team anonymously and identified key issues: (1) unfair on-call distribution, (2) no learning budget, (3) lack of recognition, and (4) poor work-life balance. I presented these findings to leadership with proposed solutions.

I implemented: (1) a fair on-call rotation with compensation time off, (2) a $1,000/person annual learning budget, (3) monthly team recognition awards, and (4) "No Meeting Fridays" for focused work. I personally mentored 3 team members on career development and advocated for 2 promotions.

The result: engagement score recovered to 82% (higher than before), zero resignations in the next 6 months, and 2 team members got promoted. Team productivity increased by 25%, and we became the highest-rated team in the org. Three other teams adopted our practices. I proved that investing in people drives business results.`,
    whyItsStrong: [
      "Data-driven approach (surveyed team, identified 4 key issues)",
      "Comprehensive solution (addressed all 4 issues)",
      "Personal investment (mentored 3 people, advocated for promotions)",
      "Measurable improvement (61% to 82% engagement, zero resignations, 25% productivity)",
      "Scalable impact (3 other teams adopted practices)",
    ],
    starBreakdown: {
      situation: "Q2 2023, team morale declining, engagement 78% → 61%, 3 resignations in 2 months, burnout from on-call, stagnant growth",
      task: "Improve work environment and team morale",
      action: "Surveyed team, identified 4 issues, presented to leadership, implemented fair on-call rotation, $1K learning budget, recognition awards, No Meeting Fridays, mentored 3 people, advocated for 2 promotions",
      result: "Engagement 61% → 82%, zero resignations for 6 months, 2 promotions, productivity +25%, became highest-rated team, 3 teams adopted practices",
    },
  },

  amazon_successAndScale: {
    question: "Tell me about a time when you considered the broader impact of your work on society",
    principle: "successAndScale",
    company: "amazon",
    strongAnswer: `In 2023, I was building a recommendation algorithm that maximized engagement. Initial tests showed a 40% increase in time-on-site, which seemed like a huge win. But I noticed it was recommending increasingly extreme content to keep users engaged.

I raised concerns that our algorithm could create filter bubbles and spread misinformation, even though it was technically successful. I proposed we add ethical constraints: (1) diversity in recommendations, (2) fact-checking integration, and (3) limits on sensational content.

Leadership was skeptical - this would reduce engagement by an estimated 15%. I argued that short-term engagement isn't worth long-term societal harm and reputational risk. I built a prototype with ethical constraints and tested it with 1,000 users.

The results surprised everyone: engagement only dropped 5% (not 15%), but user satisfaction increased by 23%, and trust scores improved by 31%. Users appreciated the balanced recommendations. We launched the ethical algorithm company-wide.

The result: we maintained 95% of engagement while dramatically improving content quality. We received positive press coverage, and our approach became an industry case study. I proved that success and scale must include social responsibility.`,
    whyItsStrong: [
      "Identified ethical concerns despite technical success",
      "Proposed concrete solutions (3 ethical constraints)",
      "Challenged short-term thinking",
      "Validated with data (tested with 1,000 users)",
      "Balanced business and social impact (95% engagement, +23% satisfaction, +31% trust)",
    ],
    starBreakdown: {
      situation: "2023, built recommendation algorithm with 40% engagement increase, but noticed it recommended extreme content and could create filter bubbles",
      task: "Balance business success with social responsibility",
      action: "Raised ethical concerns, proposed 3 constraints (diversity, fact-checking, limits), built prototype, tested with 1,000 users despite leadership skepticism",
      result: "Engagement only -5% (not -15%), satisfaction +23%, trust +31%, positive press, became industry case study, launched company-wide",
    },
  },

  // ============================================
  // GOOGLE VALUES (5 principles)
  // ============================================

  google_collaboration: {
    question: "Tell me about a time when you worked with a difficult team member",
    principle: "collaboration",
    company: "google",
    strongAnswer: `In 2023, I was leading a cross-functional project to redesign our mobile app's checkout flow. Our UX designer, Sarah, strongly disagreed with my proposed technical approach, believing it would compromise the user experience. Our meetings became tense, and the project was stalled for 2 weeks.

Instead of escalating to management, I scheduled a 1-on-1 coffee chat with Sarah to understand her concerns. I learned she'd worked on a similar project that failed due to technical constraints overriding UX. I realized we were both trying to protect the user, just from different angles.

I proposed we run a joint design sprint where we'd prototype both approaches and test them with real users. I committed to implementing whichever approach users preferred, even if it meant more technical work for me. Sarah agreed.

We ran the tests with 50 users. Surprisingly, a hybrid approach combining both our ideas performed best. We implemented it together, with me handling the technical complexity and Sarah ensuring UX quality at every step.

The result: our checkout conversion rate increased by 23%, app store ratings improved from 4.1 to 4.6, and Sarah and I became close collaborators. We've since worked on 3 more projects together. The key was shifting from "my way vs your way" to "what's best for users."`,
    whyItsStrong: [
      "Shows empathy and emotional intelligence",
      "Proactive conflict resolution (1-on-1 coffee, not escalation)",
      "Data-driven decision making (tested with 50 users)",
      "Collaborative solution (hybrid approach)",
      "Measurable results (23% conversion increase, 4.1 to 4.6 rating)",
      "Long-term relationship building (3 more projects together)",
    ],
    starBreakdown: {
      situation: "2023, leading mobile checkout redesign, UX designer strongly disagreed with technical approach, project stalled 2 weeks",
      task: "Resolve conflict and move project forward without compromising user experience",
      action: "1-on-1 coffee to understand concerns, proposed joint design sprint, tested both approaches with 50 users, implemented hybrid solution",
      result: "Conversion +23%, ratings 4.1 → 4.6, became close collaborators, worked on 3 more projects together",
    },
  },

  google_ambiguity: {
    question: "Tell me about a time when you had to navigate a rapidly changing situation",
    principle: "ambiguity",
    company: "google",
    strongAnswer: `In Q1 2024, I was leading development of a new feature when our company suddenly pivoted strategy due to a competitor's launch. Our requirements changed 3 times in 2 weeks, the timeline was cut in half, and team members were reassigned to other projects.

Instead of getting frustrated, I embraced the ambiguity. I set up daily check-ins with stakeholders to stay aligned on the evolving vision. I broke the work into small, flexible modules that could be reprioritized easily. I documented decisions and assumptions clearly so we could pivot quickly.

When requirements changed again, I didn't restart - I adapted. I identified which modules were still relevant, which needed modification, and which could be dropped. I kept the team focused on the core value proposition rather than specific features.

We launched in 6 weeks (half the original timeline) with a product that matched the new strategy perfectly. The feature drove 15,000 new users in the first month and generated $300K in revenue. My manager said my ability to thrive in ambiguity was the reason we succeeded. I learned that flexibility is more valuable than perfect plans.`,
    whyItsStrong: [
      "Positive attitude toward ambiguity (embraced vs frustrated)",
      "Adaptive strategies (daily check-ins, flexible modules, clear documentation)",
      "Quick pivoting (identified relevant/modified/dropped modules)",
      "Delivered despite chaos (6 weeks, half original timeline)",
      "Strong results (15K users, $300K revenue)",
    ],
    starBreakdown: {
      situation: "Q1 2024, leading new feature, company pivoted strategy, requirements changed 3x in 2 weeks, timeline cut in half, team members reassigned",
      task: "Deliver valuable product despite constantly changing requirements",
      action: "Daily stakeholder check-ins, broke work into flexible modules, documented decisions, adapted when requirements changed, focused on core value",
      result: "Launched in 6 weeks (half timeline), 15K new users first month, $300K revenue, manager praised ability to thrive in ambiguity",
    },
  },

  google_innovation: {
    question: "Tell me about a time when you came up with a creative solution to a problem",
    principle: "innovation",
    company: "google",
    strongAnswer: `In Q3 2023, our customer support team was overwhelmed with 500+ tickets per day, with average response time of 48 hours. Hiring more support staff would cost $400K annually, but I saw an opportunity to innovate.

I proposed building an AI-powered support bot using GPT-4, even though our company had never used AI for customer support. I spent 2 weeks building a prototype that could handle common questions, escalate complex issues, and learn from support agent responses.

I tested it internally with our team, then ran a pilot with 20% of tickets. The bot handled 60% of questions successfully, and users rated it 4.2/5. I iterated based on feedback, adding personality and improving accuracy to 75%.

We launched company-wide in Q4 2023. The result: average response time dropped from 48 hours to 6 hours, customer satisfaction increased from 3.8 to 4.5 stars, and we saved $320K annually by not hiring additional staff. The bot now handles 70% of tickets, and our support team focuses on complex issues. My innovation transformed our support model.`,
    whyItsStrong: [
      "Creative solution (AI bot vs traditional hiring)",
      "Rapid prototyping (2 weeks)",
      "Iterative approach (tested internally, piloted with 20%, improved to 75% accuracy)",
      "Significant cost savings ($320K annually)",
      "Measurable impact (48h to 6h response time, 3.8 to 4.5 satisfaction, 70% automation)",
    ],
    starBreakdown: {
      situation: "Q3 2023, support team overwhelmed with 500+ tickets/day, 48-hour response time, hiring more staff would cost $400K/year",
      task: "Reduce response time and improve satisfaction without expensive hiring",
      action: "Built AI support bot prototype in 2 weeks, tested internally, piloted with 20% tickets, iterated to 75% accuracy, launched company-wide",
      result: "Response time 48h → 6h, satisfaction 3.8 → 4.5, saved $320K/year, bot handles 70% of tickets",
    },
  },

  google_impact: {
    question: "Tell me about a time when you delivered significant measurable impact",
    principle: "impact",
    company: "google",
    strongAnswer: `In Q2 2023, I analyzed our product metrics and discovered that 40% of new users churned within the first week. This represented $2M in lost annual revenue. I made it my mission to fix this.

I conducted 30 user interviews and identified the core problem: our onboarding was confusing and didn't show value quickly enough. I proposed a complete onboarding redesign focused on getting users to their first "aha moment" within 5 minutes.

I led a cross-functional team of 6 people, designed a new 3-step onboarding flow, and built interactive tutorials. We A/B tested with 10,000 users, iterated based on data, and rolled out gradually over 6 weeks.

The result: first-week churn dropped from 40% to 18% (55% reduction), new user activation increased by 67%, and we recovered $1.1M in annual revenue. The improved onboarding became our competitive advantage - our activation rate is now 2x the industry average. My focus on impact delivered measurable business results.`,
    whyItsStrong: [
      "Identified high-impact problem ($2M lost revenue)",
      "Data-driven approach (30 user interviews, A/B testing with 10K users)",
      "Clear success metrics (churn, activation, revenue)",
      "Massive impact (40% to 18% churn, +67% activation, $1.1M recovered)",
      "Competitive advantage (2x industry average)",
    ],
    starBreakdown: {
      situation: "Q2 2023, analyzed metrics, discovered 40% new user churn in first week, $2M lost annual revenue",
      task: "Reduce churn and recover lost revenue",
      action: "Conducted 30 user interviews, identified onboarding problem, led team of 6, redesigned 3-step onboarding, A/B tested with 10K users, rolled out over 6 weeks",
      result: "Churn 40% → 18%, activation +67%, recovered $1.1M revenue, activation rate now 2x industry average",
    },
  },

  google_growth: {
    question: "Tell me about a time when you learned from a significant failure",
    principle: "growth",
    company: "google",
    strongAnswer: `In Q1 2023, I led a major product launch that completely flopped. We spent 4 months building a feature I was certain users wanted, but after launch, only 3% of users tried it, and 80% of those never used it again. I was devastated.

Instead of making excuses, I did a thorough post-mortem. I interviewed 50 users who didn't use the feature and discovered we'd built what I thought users wanted, not what they actually needed. I had skipped user research because I was "experienced enough" to know. I was wrong.

I took this failure as a learning opportunity. I enrolled in a UX research course, implemented a new product development process that required user validation at every stage, and rebuilt the feature from scratch based on actual user needs.

The second launch was completely different. We launched an MVP in 3 weeks (vs 4 months), tested with 100 users, iterated 5 times based on feedback, and then launched widely. This time, 45% of users adopted it, and retention was 78%. The feature generated $500K in annual revenue.

My failure taught me that experience without validation is just assumptions. I'm now a strong advocate for user research, and I share my failure story with new team members to encourage learning from mistakes.`,
    whyItsStrong: [
      "Honest about failure (3% adoption, 80% churn)",
      "Took accountability (no excuses)",
      "Deep reflection (interviewed 50 users, identified root cause)",
      "Concrete learning (enrolled in course, implemented new process)",
      "Applied learning successfully (45% adoption, 78% retention, $500K revenue)",
      "Shares lessons with others",
    ],
    starBreakdown: {
      situation: "Q1 2023, led product launch that flopped, 4 months building, only 3% tried it, 80% never used again",
      task: "Learn from failure and succeed on second attempt",
      action: "Post-mortem, interviewed 50 users, identified I skipped user research, enrolled in UX course, implemented validation process, rebuilt based on actual needs",
      result: "Second launch: MVP in 3 weeks, 45% adoption, 78% retention, $500K revenue, now advocate for user research, share story with team",
    },
  },

  // ============================================
  // META VALUES (6 principles)
  // ============================================

  meta_moveFast: {
    question: "Tell me about a time when you shipped something quickly despite uncertainty",
    principle: "moveFast",
    company: "meta",
    strongAnswer: `In Q4 2023, a competitor launched a feature that was gaining traction with our users. We had 3 weeks to respond or risk losing market share. The traditional approach would take 3 months, but I proposed we move fast and iterate.

I assembled a small team of 4 people and we built an MVP in 10 days. We cut scope aggressively - only core functionality, no polish. We launched to 5% of users as a beta, knowing there would be bugs. We monitored feedback closely and fixed issues in real-time.

The beta users loved it despite the rough edges. We iterated daily based on feedback, adding polish and fixing bugs. After 2 weeks of iteration, we rolled out to 100% of users.

The result: we launched in 3 weeks vs 3 months, gained 25,000 new users in the first month, and prevented estimated churn of 10,000 users. Yes, we had bugs initially, but moving fast allowed us to learn and improve quickly. Our competitor's advantage disappeared. I proved that speed of learning beats perfection.`,
    whyItsStrong: [
      "Extreme speed (10 days MVP, 3 weeks total vs 3 months traditional)",
      "Aggressive scope cutting (core functionality only)",
      "Iterative approach (5% beta, daily iterations, gradual rollout)",
      "Accepted imperfection (bugs initially, fixed in real-time)",
      "Strong results (25K new users, prevented 10K churn, neutralized competitor)",
    ],
    starBreakdown: {
      situation: "Q4 2023, competitor launched feature gaining traction, had 3 weeks to respond or lose market share, traditional approach would take 3 months",
      task: "Launch competitive feature in 3 weeks",
      action: "Assembled team of 4, built MVP in 10 days, cut scope to core functionality, launched to 5% beta, iterated daily, rolled out to 100% after 2 weeks",
      result: "Launched in 3 weeks vs 3 months, 25K new users, prevented 10K churn, neutralized competitor advantage",
    },
  },

  meta_beBold: {
    question: "Tell me about a time when you took a significant risk",
    principle: "beBold",
    company: "meta",
    strongAnswer: `In Q1 2024, our product had been declining for 6 months - we were losing 5% of users monthly. The team wanted to make incremental improvements, but I believed we needed a bold move. I proposed completely reimagining our core user experience, which would require rebuilding 60% of our product.

Leadership was skeptical - this was a $1.5M investment with no guarantee of success. I built a compelling vision with mockups, user research, and competitive analysis. I argued that incremental changes wouldn't save us; we needed to be bold or die slowly.

I got approval for a 3-month bet. I led a team of 12 engineers, worked 60-hour weeks, and we rebuilt the product from the ground up. We launched to 10% of users first, ready to roll back if it failed.

The bold bet paid off. User engagement increased by 78%, retention improved by 45%, and we stopped the decline - we actually grew 8% in the first month. The redesign won industry awards and became our competitive differentiator. My bold move saved the product and taught me that playing it safe is sometimes the riskiest choice.`,
    whyItsStrong: [
      "Bold proposal (rebuild 60% of product vs incremental changes)",
      "High stakes ($1.5M investment, product declining 5%/month)",
      "Compelling vision (mockups, research, competitive analysis)",
      "Personal commitment (led team of 12, 60-hour weeks)",
      "Massive success (engagement +78%, retention +45%, growth +8%, won awards)",
    ],
    starBreakdown: {
      situation: "Q1 2024, product declining 6 months, losing 5% users/month, team wanted incremental improvements",
      task: "Save product with bold move",
      action: "Proposed rebuilding 60% of product, built vision with mockups and research, got approval for $1.5M 3-month bet, led team of 12, worked 60-hour weeks, launched to 10% first",
      result: "Engagement +78%, retention +45%, growth +8% (stopped decline), won industry awards, became competitive differentiator",
    },
  },

  meta_focusOnImpact: {
    question: "Tell me about a time when you prioritized work based on potential impact",
    principle: "focusOnImpact",
    company: "meta",
    strongAnswer: `In Q3 2023, I was leading a team with 15 different feature requests from stakeholders. Each seemed important, but we only had bandwidth for 3. I needed to focus on maximum impact.

I created an impact framework: I estimated each feature's potential user reach, engagement lift, and revenue impact. I ran the numbers: Feature A would affect 2M users with 5% engagement lift. Feature B would affect 500K users but with 40% engagement lift and $200K revenue. Feature C was a stakeholder favorite but would only affect 50K users.

I made the tough call to prioritize Feature B despite it being less popular internally. I presented my analysis to stakeholders, showing that Feature B would deliver 4x more business value than Feature A despite smaller reach. Some stakeholders were unhappy, but I stood firm on the data.

My team executed Feature B flawlessly. The result: 40% engagement lift as predicted, $280K revenue (40% above estimate), and it became our most successful feature of the year. Feature A was eventually built 6 months later and delivered only 3% lift. My focus on impact over politics delivered 13x more value.`,
    whyItsStrong: [
      "Clear prioritization framework (user reach × engagement × revenue)",
      "Data-driven decision making (specific numbers for each option)",
      "Difficult trade-offs (chose less popular option based on impact)",
      "Stood firm despite stakeholder pressure",
      "Exceptional results (40% engagement, $280K revenue, 13x more value than alternative)",
    ],
    starBreakdown: {
      situation: "Q3 2023, 15 feature requests, bandwidth for only 3, needed to maximize impact",
      task: "Prioritize features based on potential impact",
      action: "Created impact framework (reach × engagement × revenue), analyzed all features, chose Feature B (500K users, 40% lift, $200K) over Feature A (2M users, 5% lift), presented data to stakeholders",
      result: "40% engagement lift, $280K revenue (40% above estimate), most successful feature of year, 13x more value than Feature A (which later delivered only 3% lift)",
    },
  },

  meta_beOpen: {
    question: "Tell me about a time when you gave difficult feedback to someone",
    principle: "beOpen",
    company: "meta",
    strongAnswer: `In Q2 2023, my peer Sarah was leading a critical project that was failing. She was 3 weeks behind schedule, the code quality was poor, and the team was frustrated. Everyone knew it, but no one wanted to tell her because she was senior and well-liked.

I decided to be open and have a direct conversation. I scheduled a 1-on-1 and came prepared with specific examples: 3 code reviews that took 5+ days, 2 missed deadlines, and feedback from 4 team members about unclear direction. I was nervous but believed being open was better than letting her fail.

I started by acknowledging her strengths, then shared the specific issues I'd observed. I asked if she was aware of these problems and if there was something blocking her. She was initially defensive, but I stayed calm and focused on facts. She eventually opened up - she was overwhelmed and didn't know how to ask for help.

Together, we created a recovery plan: I would take over 2 of her 5 work streams, we'd do daily check-ins, and she'd delegate more to the team. The result: we recovered the project, launched only 1 week late (vs 3+ weeks), and Sarah thanked me 6 months later, saying my feedback was a turning point in her career. Being open, even when uncomfortable, built trust and delivered results.`,
    whyItsStrong: [
      "Difficult situation (giving feedback to senior, well-liked peer)",
      "Specific, factual examples (3 slow code reviews, 2 missed deadlines, 4 team members)",
      "Empathetic approach (acknowledged strengths, asked about blockers)",
      "Collaborative solution (took over work streams, daily check-ins)",
      "Positive outcome (recovered project, 1 week late vs 3+, strengthened relationship)",
    ],
    starBreakdown: {
      situation: "Q2 2023, peer Sarah's critical project failing, 3 weeks behind, poor code quality, team frustrated, no one giving feedback",
      task: "Give difficult feedback to senior peer",
      action: "Prepared specific examples (3 slow reviews, 2 missed deadlines, 4 team complaints), scheduled 1-on-1, acknowledged strengths, shared facts, asked about blockers, stayed calm through defensiveness",
      result: "She opened up about being overwhelmed, created recovery plan together, launched 1 week late vs 3+, she thanked me 6 months later as career turning point",
    },
  },

  meta_buildSocialValue: {
    question: "Tell me about a time when you built something that brought people together",
    principle: "buildSocialValue",
    company: "meta",
    strongAnswer: `In Q4 2023, I noticed our product was great for individual productivity but didn't help people connect. Our engagement metrics were flat, and user research showed people felt isolated using our app. I wanted to build social value.

I proposed a "Collaboration Spaces" feature where users could invite friends to work together in real-time. Leadership was skeptical - this was a major pivot from our individual-focused product. I built a prototype in 2 weeks and ran a small beta with 500 users.

The beta results were incredible: users in collaboration spaces had 3x higher engagement, 2x longer session times, and 85% said they felt more connected to their friends. I got approval to build it fully. I led a team of 8 for 3 months, focusing on making it easy to invite friends and see what they're working on.

We launched to 100% of users. The result: 45% of users now use collaboration spaces weekly, average friend connections per user increased from 2 to 7, and our NPS score jumped from 32 to 58. Most importantly, user testimonials showed we were genuinely bringing people together - one user said "I feel less alone working from home now." We built real social value, not just engagement metrics.`,
    whyItsStrong: [
      "Identified social gap (users felt isolated despite high productivity)",
      "Bold pivot (from individual to social focus)",
      "Validated with data (3x engagement, 2x session time, 85% felt more connected)",
      "Strong execution (led team of 8 for 3 months)",
      "Meaningful impact (45% weekly usage, 2 to 7 friend connections, NPS 32→58, genuine user testimonials)",
    ],
    starBreakdown: {
      situation: "Q4 2023, product great for productivity but users felt isolated, engagement flat, research showed lack of connection",
      task: "Build feature that brings people together",
      action: "Proposed Collaboration Spaces, built prototype in 2 weeks, ran beta with 500 users, got approval, led team of 8 for 3 months",
      result: "45% weekly usage, friend connections 2→7, NPS 32→58, users report feeling less alone, built genuine social value",
    },
  },

  meta_metaMetamatesMe: {
    question: "Tell me about a time when you put the team's needs before your own",
    principle: "metaMetamatesMe",
    company: "meta",
    strongAnswer: `In Q1 2024, I was up for promotion to Senior Engineer and needed to ship a high-visibility project to get promoted. At the same time, my teammate Alex was struggling with a critical infrastructure project that was blocking 3 other teams. If his project failed, it would hurt the entire org.

I had a choice: focus on my promotion project or help Alex. I chose to put Meta and my teammate first. I told my manager I'd delay my project by 4 weeks to help Alex. I spent 60% of my time pair programming with Alex, reviewing his code, and helping him debug complex issues.

My manager warned me this might delay my promotion, but I believed it was the right thing to do. Alex's project launched successfully and unblocked 3 teams representing 25 engineers. My project launched 4 weeks late, and I didn't get promoted that cycle.

However, 6 months later, I did get promoted. In my promotion review, my manager specifically cited this decision as evidence of leadership and putting the team first. Alex also became one of my strongest advocates. I learned that Meta > Metamates > Me isn't just a slogan - it's a principle that builds trust and long-term success, even when it costs you short-term.`,
    whyItsStrong: [
      "Clear personal sacrifice (delayed promotion project by 4 weeks)",
      "Explicit choice (promotion vs helping teammate)",
      "Significant team impact (unblocked 3 teams, 25 engineers)",
      "Accepted short-term cost (didn't get promoted that cycle)",
      "Long-term payoff (promoted 6 months later, built strong relationships, cited as leadership evidence)",
    ],
    starBreakdown: {
      situation: "Q1 2024, up for promotion, needed to ship high-visibility project, teammate Alex struggling with critical infrastructure blocking 3 teams",
      task: "Choose between personal promotion and team success",
      action: "Delayed my project 4 weeks, spent 60% time helping Alex (pair programming, code reviews, debugging), accepted promotion delay risk",
      result: "Alex's project launched successfully, unblocked 25 engineers, I didn't get promoted that cycle but got promoted 6 months later with this cited as leadership evidence",
    },
  },

  // ============================================
  // GENERIC EXAMPLES
  // ============================================

  generic_leadership: {
    question: "Tell me about a time when you led a project from start to finish",
    principle: "leadership",
    company: "generic",
    strongAnswer: `In Q3 2023, our company needed to migrate 500GB of customer data from an old legacy system to a new cloud platform. No one wanted to lead it because it was high-risk and technically complex. I volunteered to lead the project.

I assembled a cross-functional team of 6 people (2 backend engineers, 1 DBA, 1 QA, 1 DevOps, 1 PM). I created a detailed project plan with 4 phases: assessment, pilot migration, full migration, and validation. I set up weekly check-ins and daily standups during critical phases.

During the pilot, we discovered the data was more corrupted than expected. I made the tough call to extend the timeline by 2 weeks to clean the data properly, even though stakeholders were pushing for speed. I also personally wrote scripts to automate data validation, which saved us 40 hours of manual work.

We completed the migration with zero data loss, zero downtime, and 99.8% data accuracy. The project finished 1 week ahead of the revised schedule. My leadership was recognized with a company award, and 2 team members were promoted based on their work on this project. I learned that good leadership means making tough calls, protecting your team, and leading by example.`,
    whyItsStrong: [
      "Volunteered for difficult, high-risk project",
      "Clear project structure (4 phases, regular check-ins)",
      "Tough decision making (extended timeline despite pressure)",
      "Led by example (personally wrote automation scripts)",
      "Excellent results (zero data loss, zero downtime, 99.8% accuracy, finished early, team members promoted)",
    ],
    starBreakdown: {
      situation: "Q3 2023, company needed to migrate 500GB customer data from legacy to cloud, high-risk, no one wanted to lead",
      task: "Lead complex data migration project",
      action: "Volunteered to lead, assembled team of 6, created 4-phase plan, set up check-ins, extended timeline when data corruption found, wrote automation scripts",
      result: "Zero data loss, zero downtime, 99.8% accuracy, finished 1 week early, won company award, 2 team members promoted",
    },
  },

  generic_teamwork: {
    question: "Tell me about a time when you worked effectively as part of a team",
    principle: "teamwork",
    company: "generic",
    strongAnswer: `In Q2 2023, our team had to deliver a major product release in 6 weeks for a key client worth $500K annually. We had 5 engineers, and the scope was aggressive. Success required perfect teamwork.

I took on the role of coordinating our efforts. I set up a shared task board, organized daily 15-minute syncs, and made sure everyone knew what others were working on. When our frontend engineer got sick for a week, I learned React basics over a weekend and picked up his critical tasks, even though I'm primarily a backend engineer.

I also noticed our junior engineer was struggling with a complex database optimization. Instead of taking it over, I paired with him for 3 hours, teaching him the concepts. He successfully completed it and grew his skills. When another teammate had a family emergency, the team rallied to cover his work without being asked.

We delivered the release on time with all features complete. The client was thrilled and renewed for 3 years. Our manager praised the team's collaboration, and I was proud that we succeeded together. The junior engineer I mentored later thanked me, saying that pairing session was a turning point for him. Great teamwork multiplies individual efforts.`,
    whyItsStrong: [
      "High stakes (6 weeks, $500K client)",
      "Proactive coordination (task board, daily syncs)",
      "Flexibility (learned React over weekend to cover sick teammate)",
      "Mentorship over takeover (paired with junior engineer for 3 hours)",
      "Strong results (on-time delivery, client renewed for 3 years, junior engineer growth)",
    ],
    starBreakdown: {
      situation: "Q2 2023, major release in 6 weeks for $500K client, 5 engineers, aggressive scope",
      task: "Deliver on time through effective teamwork",
      action: "Coordinated efforts (task board, daily syncs), learned React over weekend to cover sick teammate, paired with junior engineer for 3 hours instead of taking over, team rallied for family emergency",
      result: "On-time delivery, all features complete, client renewed for 3 years, junior engineer grew skills and thanked me later",
    },
  },

  generic_problemSolving: {
    question: "Tell me about a time when you solved a complex problem",
    principle: "problemSolving",
    company: "generic",
    strongAnswer: `In Q4 2023, our application started experiencing random crashes affecting 15% of users. The crashes were intermittent, hard to reproduce, and our logs showed no clear pattern. We'd been debugging for 2 weeks with no progress, and customer complaints were escalating.

I took a systematic approach. First, I analyzed 500 crash reports and found a subtle pattern: crashes happened more on Tuesdays and Thursdays between 2-4 PM. I cross-referenced this with our deployment schedule and discovered we ran a background job during those times.

I hypothesized the background job was causing a race condition. I set up detailed monitoring and reproduced the crash in a staging environment by running the background job under load. I found the root cause: a shared cache was being accessed by both the background job and user requests without proper locking.

I implemented a fix using Redis distributed locks and deployed it carefully with a gradual rollout. The result: crashes dropped from 15% to 0.1% within 24 hours. We recovered our app store rating from 3.2 to 4.5 stars over the next month. My systematic problem-solving approach saved the product and taught me that complex problems require patience and methodical analysis.`,
    whyItsStrong: [
      "Complex, intermittent problem (2 weeks of failed debugging)",
      "Systematic approach (analyzed 500 reports, found pattern, formed hypothesis)",
      "Root cause analysis (race condition in shared cache)",
      "Careful implementation (gradual rollout)",
      "Dramatic results (15% crashes → 0.1%, app rating 3.2 → 4.5)",
    ],
    starBreakdown: {
      situation: "Q4 2023, random crashes affecting 15% of users, intermittent, no clear pattern, 2 weeks of failed debugging, escalating complaints",
      task: "Find root cause and fix crashes",
      action: "Analyzed 500 crash reports, found pattern (Tues/Thurs 2-4 PM), cross-referenced with deployments, found background job correlation, reproduced in staging, identified race condition in shared cache, implemented Redis distributed locks",
      result: "Crashes 15% → 0.1% in 24 hours, app rating 3.2 → 4.5 over next month",
    },
  },

  generic_conflict: {
    question: "Tell me about a time when you disagreed with a colleague",
    principle: "conflict",
    company: "generic",
    strongAnswer: `In Q1 2024, I was working on a new API design with my colleague Mark. I proposed a RESTful approach, but Mark insisted on GraphQL. Our disagreement became heated in a team meeting - I felt REST was simpler and more maintainable, while Mark believed GraphQL was more flexible and future-proof.

Instead of letting the conflict escalate, I suggested we take a step back and evaluate both options objectively. I proposed we each build a small prototype and present the pros/cons to the team. Mark agreed.

Over the next 3 days, I built a REST prototype and Mark built a GraphQL prototype. We both documented performance metrics, development time, and complexity. When we presented to the team, something interesting happened: we both saw merits in each other's approach. My REST API was indeed simpler, but Mark's GraphQL handled complex queries better.

We compromised: we'd use REST for simple CRUD operations and GraphQL for complex data fetching. This hybrid approach combined the best of both. The result: our API was 30% faster than either pure approach, development time was reasonable, and both Mark and I felt heard. We turned a conflict into a better solution and strengthened our working relationship.`,
    whyItsStrong: [
      "Real technical disagreement (REST vs GraphQL)",
      "Constructive approach (objective evaluation, prototypes)",
      "Open-minded (both saw merits in other's approach)",
      "Creative compromise (hybrid approach)",
      "Better outcome (30% faster than either pure approach, strengthened relationship)",
    ],
    starBreakdown: {
      situation: "Q1 2024, API design disagreement with colleague Mark, I wanted REST, he wanted GraphQL, heated team meeting",
      task: "Resolve conflict and choose best approach",
      action: "Proposed objective evaluation, each built prototype over 3 days, documented metrics, presented to team, both saw merits in other's approach",
      result: "Hybrid approach (REST for CRUD, GraphQL for complex queries), 30% faster than either pure approach, both felt heard, strengthened relationship",
    },
  },

  generic_adaptability: {
    question: "Tell me about a time when you had to adapt to a major change",
    principle: "adaptability",
    company: "generic",
    strongAnswer: `In Q3 2023, I was 6 weeks into building a new feature using Python/Django when our CTO announced we were switching the entire tech stack to Node.js/TypeScript. The decision was final - we had to migrate everything in 8 weeks. I had zero Node.js experience.

I could have complained or resisted, but I chose to adapt quickly. I spent my evenings and weekends learning Node.js and TypeScript through online courses and tutorials. I built 3 small side projects to practice. Within 2 weeks, I was comfortable enough to start migrating my feature.

I also helped 2 junior engineers on my team who were struggling with the transition. I shared my learning resources and paired with them on difficult concepts. I rewrote my 6 weeks of Python code in Node.js in just 4 weeks, and it was actually better - I learned from my Python mistakes.

The result: I completed my feature on time despite the tech stack change, helped 2 teammates adapt successfully, and became one of the team's Node.js experts. My manager praised my adaptability and gave me a spot bonus. I learned that resisting change wastes energy - embracing it creates opportunities.`,
    whyItsStrong: [
      "Major unexpected change (entire tech stack switch, 6 weeks of work affected)",
      "Proactive learning (evenings/weekends, online courses, 3 side projects)",
      "Fast adaptation (comfortable in 2 weeks, expert in 8 weeks)",
      "Helped others (2 junior engineers)",
      "Better outcome (completed on time, better code, became team expert, spot bonus)",
    ],
    starBreakdown: {
      situation: "Q3 2023, 6 weeks into Python/Django feature, CTO announced switch to Node.js/TypeScript, 8 weeks to migrate, zero Node.js experience",
      task: "Adapt to new tech stack and complete feature on time",
      action: "Learned Node.js evenings/weekends (courses, tutorials, 3 side projects), comfortable in 2 weeks, helped 2 junior engineers, rewrote 6 weeks of Python in 4 weeks",
      result: "Completed feature on time, better code than Python version, helped 2 teammates adapt, became team Node.js expert, received spot bonus",
    },
  },

  generic_communication: {
    question: "Tell me about a time when you had to explain something complex to a non-expert",
    principle: "communication",
    company: "generic",
    strongAnswer: `In Q2 2023, I was leading a database optimization project that would save the company $50K annually. I needed approval from our CFO, who had no technical background. I had 15 minutes to explain why we needed to spend $20K upfront to save $50K annually.

I knew technical jargon would lose her, so I prepared carefully. I created a simple analogy: "Our database is like a library where books are randomly scattered. Finding a book takes 10 minutes. We want to organize books by category, so finding a book takes 30 seconds. The organization costs $20K, but we'll save $50K in employee time annually."

I used a one-page visual with before/after diagrams showing slow vs fast queries. I avoided terms like "indexing," "query optimization," and "normalization." Instead, I talked about "organization," "speed," and "efficiency." I also prepared for her likely question about risk: "What if it doesn't work?" I had a backup plan ready.

She understood immediately and approved the project on the spot. The optimization delivered even better results - we saved $65K annually. She later told our CEO I gave the clearest technical explanation she'd ever heard. I learned that great communication means meeting people where they are, not where you are.`,
    whyItsStrong: [
      "Difficult audience (CFO with no technical background, 15 minutes)",
      "Effective analogy (library organization vs database indexing)",
      "Visual aids (one-page before/after diagrams)",
      "Avoided jargon (organization vs indexing, speed vs query optimization)",
      "Anticipated questions (prepared backup plan for risk question)",
      "Excellent results (approved immediately, saved $65K vs $50K projected, praised by CFO)",
    ],
    starBreakdown: {
      situation: "Q2 2023, needed CFO approval for $20K database optimization to save $50K annually, CFO had no technical background, 15 minutes to explain",
      task: "Explain complex technical project to non-technical executive",
      action: "Created library analogy (scattered books vs organized), used one-page visual with before/after, avoided jargon, prepared for risk question with backup plan",
      result: "Approved immediately, saved $65K annually (vs $50K projected), CFO told CEO it was clearest technical explanation she'd heard",
    },
  },

  generic_timeManagement: {
    question: "Tell me about a time when you managed multiple competing priorities",
    principle: "timeManagement",
    company: "generic",
    strongAnswer: `In Q4 2023, I was simultaneously handling 3 critical projects: a product launch (due in 2 weeks), a security vulnerability fix (urgent), and a major client customization (due in 3 weeks). Each project owner believed theirs was the top priority. I was working 60-hour weeks and burning out.

I realized I needed better time management. I created a priority matrix based on urgency and impact. The security fix was urgent and high-impact (top priority). The product launch was urgent but could be descoped (medium priority). The client customization was important but had some flexibility (lower priority).

I communicated my prioritization to all stakeholders with clear reasoning. I spent 50% of my time on the security fix and got it done in 3 days. I then negotiated with the product team to cut 2 non-critical features, reducing my work by 40%. For the client customization, I got approval to extend the deadline by 1 week.

The result: I fixed the security vulnerability before it was exploited (prevented potential $500K+ breach), launched the product on time with core features, and delivered the client customization 1 week late but with higher quality. I reduced my hours from 60 to 45 per week. My manager praised my prioritization skills and stakeholder management.`,
    whyItsStrong: [
      "Overwhelming situation (3 critical projects, 60-hour weeks, burning out)",
      "Systematic prioritization (urgency × impact matrix)",
      "Clear communication (explained reasoning to stakeholders)",
      "Negotiation skills (descoped product, extended client deadline)",
      "Excellent results (prevented $500K breach, on-time launch, quality delivery, reduced hours 60→45)",
    ],
    starBreakdown: {
      situation: "Q4 2023, 3 critical projects simultaneously (product launch in 2 weeks, urgent security fix, client customization in 3 weeks), 60-hour weeks, burning out",
      task: "Manage competing priorities effectively",
      action: "Created urgency × impact matrix, prioritized security fix (50% time, 3 days), negotiated product descope (cut 2 features, 40% less work), extended client deadline by 1 week",
      result: "Fixed security vulnerability (prevented $500K+ breach), launched product on time with core features, delivered client customization 1 week late with higher quality, reduced hours 60→45",
    },
  },

  generic_failure: {
    question: "Tell me about a time when you failed at something important",
    principle: "failure",
    company: "generic",
    strongAnswer: `In Q1 2023, I was leading the development of a new mobile app feature that was supposed to launch at a major industry conference. I had 8 weeks to deliver. I was confident and told everyone we'd make it.

I made several critical mistakes: I underestimated the complexity, didn't build in buffer time, and was too proud to ask for help when I fell behind. By week 6, I was 2 weeks behind schedule but didn't tell anyone. I worked 80-hour weeks trying to catch up, but the quality suffered.

The day before the conference, I had to tell my manager we weren't ready. The demo failed in front of 500 people and our CEO. It was humiliating. I felt like I'd let everyone down. My manager was disappointed, and I seriously considered quitting.

But I chose to learn from it. I did a thorough post-mortem: I identified my mistakes (poor estimation, no buffer, pride, lack of communication). I apologized to the team and stakeholders. I rebuilt the feature properly over the next 4 weeks with better planning and regular check-ins. We launched it successfully, and it became one of our most popular features.

The failure taught me humility, the importance of asking for help, and that early communication about problems is crucial. A year later, I was promoted to team lead, and my manager cited my growth from that failure as a key reason.`,
    whyItsStrong: [
      "Significant failure (public demo failure in front of 500 people and CEO)",
      "Honest about mistakes (poor estimation, no buffer, pride, lack of communication)",
      "Took responsibility (apologized, didn't make excuses)",
      "Thorough learning (post-mortem, identified specific mistakes)",
      "Redemption (rebuilt properly, became popular feature)",
      "Long-term growth (promoted to team lead, failure cited as growth evidence)",
    ],
    starBreakdown: {
      situation: "Q1 2023, leading mobile app feature for major conference demo, 8 weeks to deliver, confident I'd make it",
      task: "Deliver feature for high-visibility conference demo",
      action: "Made mistakes (underestimated complexity, no buffer, didn't ask for help, didn't communicate when behind), worked 80-hour weeks, told manager day before conference we weren't ready",
      result: "Demo failed in front of 500 people and CEO, humiliating, did post-mortem, apologized, rebuilt properly in 4 weeks, launched successfully, became popular feature, promoted to team lead a year later with failure cited as growth evidence",
    },
  },
};

/**
 * Compare user's answer with example answer
 */
export function compareAnswers(
  userAnswer: string,
  userStarAnalysis: any,
  exampleAnswer: ExampleAnswer
): {
  userAnswer: string;
  exampleAnswer: ExampleAnswer;
  overallGap: string;
  differences: Array<{
    category: string;
    userHas: boolean;
    suggestion: string;
  }>;
} {
  // Clean the user answer - remove "Main Answer:" prefix if present
  const cleanedUserAnswer = userAnswer
    .replace(/^Main Answer:\s*/i, '')
    .replace(/\n\nFollow-up Questions and Answers:[\s\S]*$/, '')
    .trim();
  
  const differences: Array<{
    category: string;
    userHas: boolean;
    suggestion: string;
  }> = [];

  // Check for specific metrics
  const hasMetrics = /\d+%|\$\d+|increased|improved|reduced|saved|\d+x/gi.test(cleanedUserAnswer);
  if (!hasMetrics) {
    differences.push({
      category: "Quantifiable Metrics",
      userHas: false,
      suggestion: "Add specific numbers, percentages, or dollar amounts to show measurable impact (e.g., '30% increase', '$50K saved', '2x faster')",
    });
  }

  // Check for personal ownership language
  const hasOwnership = /\bI\s+(led|built|created|designed|implemented|proposed|decided)/gi.test(cleanedUserAnswer);
  if (!hasOwnership) {
    differences.push({
      category: "Personal Ownership",
      userHas: false,
      suggestion: "Use 'I' statements to show your specific contributions (e.g., 'I led', 'I built', 'I decided') rather than 'we' or passive voice",
    });
  }

  // Check for timeline/context
  const hasTimeline = /Q\d|20\d{2}|week|month|day|hour/gi.test(cleanedUserAnswer);
  if (!hasTimeline) {
    differences.push({
      category: "Timeline & Context",
      userHas: false,
      suggestion: "Include specific timeframes (e.g., 'Q2 2023', '3 weeks', '2 days') to show urgency and scope",
    });
  }

  // Check STAR completeness
  if (userStarAnalysis.situation.score < 70) {
    differences.push({
      category: "Situation Context",
      userHas: false,
      suggestion: "Provide more context about the situation: What was happening? Why was it important? What were the stakes?",
    });
  }

  if (userStarAnalysis.result.score < 70) {
    differences.push({
      category: "Measurable Results",
      userHas: false,
      suggestion: "Strengthen your results with specific outcomes and metrics. Compare before/after states.",
    });
  }

  // Overall gap assessment
  const userScore = userStarAnalysis.overallSTARScore;
  let overallGap = "";
  
  if (userScore >= 80) {
    overallGap = "Your answer is strong! The example shows how to add even more specific metrics and context to reach excellence.";
  } else if (userScore >= 60) {
    overallGap = "Your answer has good elements but needs more specific details, metrics, and personal ownership language to match this strong example.";
  } else {
    overallGap = "Your answer needs significant improvement. Focus on adding specific metrics, clear personal actions, and measurable results as shown in the example.";
  }

  return {
    userAnswer: cleanedUserAnswer,
    exampleAnswer,
    overallGap,
    differences,
  };
}
