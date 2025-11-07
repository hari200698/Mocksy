import { CompanyType } from "./company-profiles";

export interface PrincipleDescription {
  name: string;
  description: string;
  whatInterviewersLookFor: string[];
}

/**
 * Get principle description and interviewer expectations
 */
export function getPrincipleDescription(
  company: CompanyType,
  principle: string
): PrincipleDescription | null {
  const key = `${company}_${principle}`;
  return PRINCIPLE_DESCRIPTIONS[key] || null;
}

/**
 * Comprehensive principle descriptions for all companies
 */
const PRINCIPLE_DESCRIPTIONS: Record<string, PrincipleDescription> = {
  // ============================================
  // AMAZON LEADERSHIP PRINCIPLES
  // ============================================

  amazon_customerObsession: {
    name: "Customer Obsession",
    description: "Leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust. Although leaders pay attention to competitors, they obsess over customers.",
    whatInterviewersLookFor: [
      "Specific examples of prioritizing customer needs over short-term metrics or convenience",
      "Data showing measurable customer impact (satisfaction scores, retention, feedback)",
      "Difficult trade-offs made in favor of customers despite internal resistance",
      "Long-term customer thinking rather than quick wins",
    ],
  },

  amazon_ownership: {
    name: "Ownership",
    description: "Leaders are owners. They think long term and don't sacrifice long-term value for short-term results. They act on behalf of the entire company, beyond just their own team. They never say 'that's not my job.'",
    whatInterviewersLookFor: [
      "Taking initiative on problems outside your direct responsibility",
      "Making decisions without waiting for approval when appropriate",
      "Taking accountability for failures, not blaming others or circumstances",
      "Acting on behalf of the company, not just your team or personal goals",
    ],
  },

  amazon_inventAndSimplify: {
    name: "Invent and Simplify",
    description: "Leaders expect and require innovation and invention from their teams and always find ways to simplify. They are externally aware, look for new ideas from everywhere, and are not limited by 'not invented here.'",
    whatInterviewersLookFor: [
      "Creative solutions to complex problems that others missed",
      "Simplifying processes or systems to remove unnecessary complexity",
      "Challenging the status quo with innovative approaches",
      "Measurable improvements in efficiency, speed, or user experience",
    ],
  },

  amazon_areRightALot: {
    name: "Are Right, A Lot",
    description: "Leaders are right a lot. They have strong judgment and good instincts. They seek diverse perspectives and work to disconfirm their beliefs.",
    whatInterviewersLookFor: [
      "Making difficult decisions with incomplete information that proved correct",
      "Seeking diverse perspectives before deciding, not just confirming your bias",
      "Changing your mind when presented with better data or arguments",
      "Learning from wrong decisions and improving judgment over time",
    ],
  },

  amazon_learnAndBeCurious: {
    name: "Learn and Be Curious",
    description: "Leaders are never done learning and always seek to improve themselves. They are curious about new possibilities and act to explore them.",
    whatInterviewersLookFor: [
      "Teaching yourself new skills to solve problems or advance projects",
      "Curiosity leading to important discoveries or improvements",
      "Seeking learning opportunities outside your comfort zone",
      "Applying knowledge from one domain to solve problems in another",
    ],
  },

  amazon_hireAndDevelopTheBest: {
    name: "Hire and Develop the Best",
    description: "Leaders raise the performance bar with every hire and promotion. They recognize exceptional talent, and willingly move them throughout the organization. Leaders develop leaders and take seriously their role in coaching others.",
    whatInterviewersLookFor: [
      "Mentoring someone and helping them grow significantly",
      "Raising hiring or performance standards, not lowering the bar",
      "Identifying and developing talent in others",
      "Giving difficult feedback that helped someone improve",
    ],
  },

  amazon_insistOnHighestStandards: {
    name: "Insist on the Highest Standards",
    description: "Leaders have relentlessly high standards — many people may think these standards are unreasonably high. Leaders are continually raising the bar and drive their teams to deliver high quality products, services, and processes.",
    whatInterviewersLookFor: [
      "Refusing to compromise on quality despite pressure",
      "Identifying and fixing quality issues others missed or accepted",
      "Raising the bar for your team's work and holding them accountable",
      "Attention to detail that prevented major problems",
    ],
  },

  amazon_thinkBig: {
    name: "Think Big",
    description: "Thinking small is a self-fulfilling prophecy. Leaders create and communicate a bold direction that inspires results. They think differently and look around corners for ways to serve customers.",
    whatInterviewersLookFor: [
      "Proposing bold or ambitious ideas that others thought impossible",
      "Thinking beyond immediate problems to create lasting impact",
      "Challenging conventional thinking with a bigger vision",
      "Scaling solutions beyond their original scope to maximize impact",
    ],
  },

  amazon_biasForAction: {
    name: "Bias for Action",
    description: "Speed matters in business. Many decisions and actions are reversible and do not need extensive study. We value calculated risk taking.",
    whatInterviewersLookFor: [
      "Making quick decisions with limited information when speed was critical",
      "Taking action despite uncertainty or risk",
      "Moving forward without perfect consensus when delay would be costly",
      "Calculated risk-taking that paid off, not recklessness",
    ],
  },

  amazon_frugality: {
    name: "Frugality",
    description: "Accomplish more with less. Constraints breed resourcefulness, self-sufficiency, and invention. There are no extra points for growing headcount, budget size, or fixed expense.",
    whatInterviewersLookFor: [
      "Accomplishing more with less resources (budget, time, people)",
      "Finding cost-effective solutions without sacrificing quality",
      "Being resourceful due to constraints leading to better solutions",
      "Eliminating waste or unnecessary spending",
    ],
  },

  amazon_earnTrust: {
    name: "Earn Trust",
    description: "Leaders listen attentively, speak candidly, and treat others respectfully. They are vocally self-critical, even when doing so is awkward or embarrassing. Leaders do not believe their or their team's body odor smells of perfume.",
    whatInterviewersLookFor: [
      "Building trust with skeptical stakeholders through transparency",
      "Admitting mistakes and rebuilding trust after failures",
      "Having difficult but honest conversations",
      "Demonstrating integrity despite personal cost",
    ],
  },

  amazon_diveDeep: {
    name: "Dive Deep",
    description: "Leaders operate at all levels, stay connected to the details, audit frequently, and are skeptical when metrics and anecdote differ. No task is beneath them.",
    whatInterviewersLookFor: [
      "Identifying problems by diving into details others overlooked",
      "Deep analysis uncovering root causes of issues",
      "Understanding technical details outside your expertise",
      "Staying connected to details while managing at a high level",
    ],
  },

  amazon_haveBackbone: {
    name: "Have Backbone; Disagree and Commit",
    description: "Leaders are obligated to respectfully challenge decisions when they disagree, even when doing so is uncomfortable or exhausting. Leaders have conviction and are tenacious. They do not compromise for the sake of social cohesion. Once a decision is determined, they commit wholly.",
    whatInterviewersLookFor: [
      "Disagreeing with managers or senior leadership respectfully",
      "Challenging decisions you thought were wrong with conviction",
      "Standing up for your beliefs despite opposition",
      "Committing fully to decisions you initially disagreed with",
    ],
  },

  amazon_deliverResults: {
    name: "Deliver Results",
    description: "Leaders focus on the key inputs for their business and deliver them with the right quality and in a timely fashion. Despite setbacks, they rise to the occasion and never settle.",
    whatInterviewersLookFor: [
      "Delivering results despite significant obstacles or setbacks",
      "Meeting challenging deadlines without sacrificing quality",
      "Turning around failing projects to successful outcomes",
      "Exceeding expectations on key deliverables",
    ],
  },

  amazon_striveToBeEarthsBestEmployer: {
    name: "Strive to be Earth's Best Employer",
    description: "Leaders work every day to create a safer, more productive, higher performing, more diverse, and more just work environment. They lead with empathy, have fun at work, and make it easy for others to have fun.",
    whatInterviewersLookFor: [
      "Improving work environment for your team (safety, productivity, morale)",
      "Promoting diversity and inclusion through specific actions",
      "Supporting colleagues' growth or wellbeing",
      "Addressing unfair or unjust situations",
    ],
  },

  amazon_successAndScale: {
    name: "Success and Scale Bring Broad Responsibility",
    description: "We started in a garage, but we're not there anymore. We are big, we impact the world, and we are far from perfect. We must be humble and thoughtful about even the secondary effects of our actions.",
    whatInterviewersLookFor: [
      "Considering broader societal impact of your work",
      "Making ethical decisions despite business pressure",
      "Thinking about environmental or social responsibility",
      "Balancing business goals with community impact",
    ],
  },

  // ============================================
  // GOOGLE PRINCIPLES
  // ============================================

  google_collaboration: {
    name: "Collaboration",
    description: "Google values teamwork and the ability to work effectively with diverse groups. This principle evaluates your ability to build consensus, influence without authority, resolve conflicts, and contribute to team success.",
    whatInterviewersLookFor: [
      "Working effectively with difficult team members or across conflicting priorities",
      "Building consensus across multiple teams or stakeholders",
      "Influencing others without having direct authority over them",
      "Resolving conflicts constructively and strengthening relationships",
    ],
  },

  google_ambiguity: {
    name: "Navigating Ambiguity",
    description: "Google operates in fast-changing environments with unclear requirements. This principle tests your ability to make decisions with incomplete information, adapt to change, and bring clarity to ambiguous situations.",
    whatInterviewersLookFor: [
      "Making sound decisions with incomplete or unclear information",
      "Adapting quickly when requirements or situations change",
      "Bringing structure and clarity to ambiguous problems",
      "Thriving in unstructured environments without clear direction",
    ],
  },

  google_innovation: {
    name: "Innovation",
    description: "Google seeks creative problem-solvers who challenge conventional approaches and experiment with new ideas. This principle evaluates your ability to think outside the box and drive innovation.",
    whatInterviewersLookFor: [
      "Creative solutions to problems that others didn't see",
      "Challenging conventional approaches with better alternatives",
      "Experimenting with new ideas and learning from failures",
      "Combining ideas from different domains in novel ways",
    ],
  },

  google_impact: {
    name: "Impact",
    description: "Google values results-oriented thinking and the ability to prioritize work based on potential impact. This principle tests your focus on what matters most and your ability to deliver measurable results.",
    whatInterviewersLookFor: [
      "Delivering significant measurable impact (users, revenue, efficiency)",
      "Prioritizing high-impact work over low-impact busy work",
      "Saying no to good ideas to focus on great ones",
      "Demonstrating clear ROI and business value",
    ],
  },

  google_growth: {
    name: "Growth Mindset",
    description: "Google values continuous learning and the ability to grow from failures. This principle evaluates your intellectual humility, openness to feedback, and commitment to self-improvement.",
    whatInterviewersLookFor: [
      "Learning from significant failures and applying those lessons",
      "Actively seeking and acting on feedback",
      "Stepping outside your comfort zone to develop new skills",
      "Demonstrating intellectual humility and openness to being wrong",
    ],
  },

  // ============================================
  // META PRINCIPLES
  // ============================================

  meta_moveFast: {
    name: "Move Fast",
    description: "Meta values speed and iteration over perfection. This principle evaluates your ability to ship quickly, learn from real-world feedback, and iterate rapidly rather than planning extensively.",
    whatInterviewersLookFor: [
      "Shipping products or features quickly despite uncertainty",
      "Iterating rapidly based on real user feedback",
      "Prioritizing speed of learning over avoiding mistakes",
      "Making fast decisions when speed matters more than perfection",
    ],
  },

  meta_beBold: {
    name: "Be Bold",
    description: "Meta encourages taking significant risks and thinking bigger than others expect. This principle tests your willingness to propose ambitious ideas and bet on unproven approaches.",
    whatInterviewersLookFor: [
      "Taking significant risks that had high potential payoff",
      "Proposing ambitious or unconventional ideas despite skepticism",
      "Challenging widely-held beliefs or practices",
      "Thinking bigger than others expected or suggested",
    ],
  },

  meta_focusOnImpact: {
    name: "Focus on Impact",
    description: "Meta values prioritizing work based on potential impact and demonstrating measurable results. This principle evaluates your ability to focus resources on what matters most.",
    whatInterviewersLookFor: [
      "Prioritizing work based on potential impact, not politics or ease",
      "Measuring and optimizing for impact metrics",
      "Killing projects to focus on higher-impact work",
      "Demonstrating clear, measurable business results",
    ],
  },

  meta_beOpen: {
    name: "Be Open",
    description: "Meta values transparency, direct feedback, and open communication. This principle tests your ability to give and receive difficult feedback and share information openly.",
    whatInterviewersLookFor: [
      "Giving difficult feedback directly and constructively",
      "Receiving critical feedback and acting on it",
      "Sharing information transparently despite risk",
      "Admitting mistakes publicly to help others learn",
    ],
  },

  meta_buildSocialValue: {
    name: "Build Social Value",
    description: "Meta's mission is to bring people together. This principle evaluates your focus on creating products and features that strengthen human connections and community.",
    whatInterviewersLookFor: [
      "Building features that genuinely connect people",
      "Considering social impact and user wellbeing, not just engagement",
      "Prioritizing meaningful connections over vanity metrics",
      "Thinking about how your work affects communities and relationships",
    ],
  },

  meta_metaMetamatesMe: {
    name: "Meta, Metamates, Me",
    description: "This principle emphasizes putting the company first, then your teammates, and yourself last. It tests your willingness to make personal sacrifices for team and company success.",
    whatInterviewersLookFor: [
      "Putting team or company needs before personal goals",
      "Making personal sacrifices for the greater good",
      "Helping teammates succeed even at your own expense",
      "Prioritizing collaboration over individual recognition",
    ],
  },

  // ============================================
  // GENERIC PRINCIPLES
  // ============================================

  generic_leadership: {
    name: "Leadership",
    description: "This principle evaluates your ability to lead projects, motivate teams, make tough decisions, and take initiative. Leadership can be demonstrated at any level, with or without formal authority.",
    whatInterviewersLookFor: [
      "Leading projects from start to finish with clear outcomes",
      "Motivating and inspiring others during difficult times",
      "Making tough decisions and taking accountability",
      "Taking initiative to solve problems without being asked",
    ],
  },

  generic_teamwork: {
    name: "Teamwork & Collaboration",
    description: "This principle tests your ability to work effectively as part of a team, support colleagues, resolve conflicts, and contribute to collective success rather than just individual achievement.",
    whatInterviewersLookFor: [
      "Contributing to team success, not just individual goals",
      "Helping struggling team members succeed",
      "Collaborating effectively across different functions or departments",
      "Resolving team conflicts constructively",
    ],
  },

  generic_problemSolving: {
    name: "Problem Solving",
    description: "This principle evaluates your analytical thinking, ability to identify root causes, develop creative solutions, and make data-driven decisions when facing complex challenges.",
    whatInterviewersLookFor: [
      "Solving complex problems through systematic analysis",
      "Identifying root causes, not just treating symptoms",
      "Using data to inform decisions and validate solutions",
      "Developing creative solutions to difficult challenges",
    ],
  },

  generic_conflict: {
    name: "Conflict Resolution",
    description: "This principle tests your ability to handle disagreements professionally, have difficult conversations, find common ground, and turn conflicts into positive outcomes.",
    whatInterviewersLookFor: [
      "Handling disagreements professionally and constructively",
      "Having difficult conversations with empathy and directness",
      "Finding common ground between conflicting parties",
      "Turning conflicts into better solutions or stronger relationships",
    ],
  },

  generic_adaptability: {
    name: "Adaptability & Change Management",
    description: "This principle evaluates your ability to adapt to change, learn new skills quickly, remain flexible under pressure, and help others navigate transitions.",
    whatInterviewersLookFor: [
      "Adapting quickly to major changes (tech stack, org structure, priorities)",
      "Learning new skills rapidly when needed",
      "Remaining flexible and positive during uncertainty",
      "Helping others adapt to change successfully",
    ],
  },

  generic_communication: {
    name: "Communication",
    description: "This principle tests your ability to communicate complex ideas clearly, tailor messages to different audiences, listen actively, and build alignment through effective communication.",
    whatInterviewersLookFor: [
      "Explaining complex technical concepts to non-technical audiences",
      "Tailoring communication style to different stakeholders",
      "Persuading others through clear, logical arguments",
      "Active listening and incorporating others' perspectives",
    ],
  },

  generic_timeManagement: {
    name: "Time Management & Prioritization",
    description: "This principle evaluates your ability to manage multiple priorities, meet deadlines, say no to low-priority work, and optimize your time for maximum impact.",
    whatInterviewersLookFor: [
      "Managing multiple competing priorities effectively",
      "Meeting tight deadlines without sacrificing quality",
      "Saying no to low-priority requests to focus on what matters",
      "Optimizing processes to save time and increase efficiency",
    ],
  },

  generic_failure: {
    name: "Learning from Failure",
    description: "This principle tests your ability to take responsibility for failures, learn from mistakes, demonstrate resilience, and use setbacks as opportunities for growth.",
    whatInterviewersLookFor: [
      "Taking responsibility for failures without blaming others",
      "Learning specific lessons from mistakes and applying them",
      "Demonstrating resilience and bouncing back from setbacks",
      "Showing growth and improvement after failures",
    ],
  },
};

/**
 * Format principle name for display (convert camelCase to Title Case)
 */
export function formatPrincipleName(principle: string): string {
  return principle
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
