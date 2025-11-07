import { CompanyType } from './company-profiles';

export interface BehavioralQuestion {
  text: string;
  principle: string;
  difficulty?: 'entry' | 'mid' | 'senior';
}

export type QuestionBank = Record<CompanyType, Record<string, string[]>>;

export const FAANG_QUESTIONS: QuestionBank = {
  amazon: {
    customerObsession: [
      "Tell me about a time when you went above and beyond for a customer.",
      "Describe a situation where you had to balance customer needs with business constraints.",
      "Give me an example of when you used customer feedback to drive a decision.",
      "Tell me about a time when you had to say no to a customer request. How did you handle it?",
      "Describe a situation where you had to advocate for the customer against internal resistance.",
      "Tell me about a time when you identified and solved a customer problem before they noticed it."
    ],
    ownership: [
      "Tell me about a time you took on something outside your area of responsibility.",
      "Describe a situation where you had to make a difficult decision without approval from your manager.",
      "Give me an example of when you took ownership of a problem that wasn't originally yours.",
      "Tell me about a time when you had to take accountability for a failure.",
      "Describe a situation where you acted on behalf of the entire company, not just your team.",
      "Tell me about a time when you had to think long-term despite short-term pressures."
    ],
    inventAndSimplify: [
      "Tell me about a time when you invented a creative solution to a complex problem.",
      "Describe a situation where you simplified a process or system.",
      "Give me an example of when you challenged the status quo with a new idea.",
      "Tell me about a time when you had to innovate with limited resources.",
      "Describe a situation where you removed unnecessary complexity from a project.",
      "Tell me about a time when you automated or improved an inefficient process."
    ],
    areRightALot: [
      "Tell me about a time when you made a difficult decision with incomplete information.",
      "Describe a situation where you had to change your mind based on new data.",
      "Give me an example of when your judgment or instinct proved correct despite opposition.",
      "Tell me about a time when you made a wrong decision. What did you learn?",
      "Describe a situation where you sought diverse perspectives before making a decision.",
      "Tell me about a time when you had to make a decision that went against popular opinion."
    ],
    learnAndBeCurious: [
      "Tell me about a time when you taught yourself a new skill to complete a project.",
      "Describe a situation where your curiosity led to an important discovery or improvement.",
      "Give me an example of when you sought out learning opportunities outside your comfort zone.",
      "Tell me about a time when you applied learning from one area to solve a problem in another.",
      "Describe a situation where you challenged yourself to learn something completely new.",
      "Tell me about a time when you identified a knowledge gap and took action to fill it."
    ],
    hireAndDevelopTheBest: [
      "Tell me about a time when you mentored someone and helped them grow.",
      "Describe a situation where you raised the bar in hiring or performance standards.",
      "Give me an example of when you identified and developed talent in someone.",
      "Tell me about a time when you had to give difficult feedback to help someone improve.",
      "Describe a situation where you coached someone through a challenging situation.",
      "Tell me about a time when you invested in someone's development despite time constraints."
    ],
    insistOnHighestStandards: [
      "Tell me about a time when you refused to compromise on quality.",
      "Describe a situation where you identified and fixed a quality issue others missed.",
      "Give me an example of when you raised the bar for your team's work.",
      "Tell me about a time when you had to push back on a deadline to maintain standards.",
      "Describe a situation where your attention to detail prevented a major problem.",
      "Tell me about a time when you implemented higher standards despite resistance."
    ],
    thinkBig: [
      "Tell me about a time when you proposed a bold or ambitious idea.",
      "Describe a situation where you thought beyond the immediate problem to create lasting impact.",
      "Give me an example of when you challenged conventional thinking with a bigger vision.",
      "Tell me about a time when you scaled a solution beyond its original scope.",
      "Describe a situation where you convinced others to think bigger.",
      "Tell me about a time when you took a calculated risk on a big idea."
    ],
    biasForAction: [
      "Tell me about a time when you had to make a quick decision with limited information.",
      "Describe a situation where you took action despite uncertainty or risk.",
      "Give me an example of when speed was critical and how you delivered.",
      "Tell me about a time when waiting for perfect information would have been costly.",
      "Describe a situation where you moved forward despite incomplete consensus.",
      "Tell me about a time when you had to act quickly to prevent a problem."
    ],
    frugality: [
      "Tell me about a time when you accomplished more with less.",
      "Describe a situation where you found a cost-effective solution to a problem.",
      "Give me an example of when you had to be resourceful due to budget constraints.",
      "Tell me about a time when you eliminated waste or unnecessary spending.",
      "Describe a situation where constraints led you to a better solution.",
      "Tell me about a time when you optimized resources to maximize impact."
    ],
    earnTrust: [
      "Tell me about a time when you had to build trust with a skeptical stakeholder.",
      "Describe a situation where you admitted a mistake and rebuilt trust.",
      "Give me an example of when you had to have a difficult but honest conversation.",
      "Tell me about a time when you demonstrated integrity despite personal cost.",
      "Describe a situation where you built trust across teams or organizations.",
      "Tell me about a time when you were transparent about bad news."
    ],
    diveDeep: [
      "Tell me about a time when you identified a problem by diving into the details.",
      "Describe a situation where your deep analysis uncovered the root cause of an issue.",
      "Give me an example of when you had to understand technical details outside your expertise.",
      "Tell me about a time when surface-level information wasn't enough.",
      "Describe a situation where you audited or validated data to ensure accuracy.",
      "Tell me about a time when you stayed connected to details while managing at a high level."
    ],
    haveBackbone: [
      "Tell me about a time when you disagreed with your manager or senior leadership.",
      "Describe a situation where you challenged a decision you thought was wrong.",
      "Give me an example of when you stood up for your convictions despite opposition.",
      "Tell me about a time when you committed to a decision you initially disagreed with.",
      "Describe a situation where you had to deliver unpopular feedback or news.",
      "Tell me about a time when you respectfully pushed back on a directive."
    ],
    deliverResults: [
      "Tell me about a time when you delivered results despite significant obstacles.",
      "Describe a situation where you had to meet a challenging deadline.",
      "Give me an example of when you turned around a failing project.",
      "Tell me about a time when you exceeded expectations on a deliverable.",
      "Describe a situation where you had to prioritize to ensure key results were delivered.",
      "Tell me about a time when you recovered from a setback to still deliver results."
    ],
    striveToBeEarthsBestEmployer: [
      "Tell me about a time when you improved the work environment for your team.",
      "Describe a situation where you promoted diversity and inclusion.",
      "Give me an example of when you supported a colleague's growth or wellbeing.",
      "Tell me about a time when you created a safer or more productive workplace.",
      "Describe a situation where you addressed an unfair or unjust situation.",
      "Tell me about a time when you prioritized team morale or work-life balance."
    ],
    successAndScale: [
      "Tell me about a time when you considered the broader impact of your work on society.",
      "Describe a situation where you made an ethical decision despite business pressure.",
      "Give me an example of when you thought about environmental or social responsibility.",
      "Tell me about a time when you balanced business goals with community impact.",
      "Describe a situation where you advocated for responsible practices.",
      "Tell me about a time when you considered long-term societal implications of a decision."
    ]
  },

  google: {
    collaboration: [
      "Tell me about a time when you worked with a difficult team member.",
      "Describe a situation where you had to build consensus across multiple teams.",
      "Give me an example of when you influenced someone without having authority over them.",
      "Tell me about a time when you had to collaborate with someone from a very different background.",
      "Describe a situation where you resolved a conflict within your team.",
      "Tell me about a time when you helped a team member succeed.",
      "Give me an example of when you had to compromise to move a project forward.",
      "Tell me about a time when you built a strong working relationship with a cross-functional partner.",
      "Describe a situation where you facilitated collaboration between conflicting parties.",
      "Tell me about a time when you contributed to team success by supporting others."
    ],
    ambiguity: [
      "Tell me about a time when you had to make a decision with incomplete information.",
      "Describe a situation where the requirements or goals were unclear.",
      "Give me an example of when you navigated a rapidly changing situation.",
      "Tell me about a time when you had to adapt your approach mid-project.",
      "Describe a situation where you brought clarity to an ambiguous problem.",
      "Tell me about a time when you succeeded despite unclear direction.",
      "Give me an example of when you had to pivot based on new information.",
      "Tell me about a time when you thrived in an unstructured environment.",
      "Describe a situation where you defined the path forward when none existed.",
      "Tell me about a time when you managed uncertainty effectively."
    ],
    innovation: [
      "Tell me about a time when you came up with a creative solution to a problem.",
      "Describe a situation where you challenged the conventional approach.",
      "Give me an example of when you experimented with a new idea.",
      "Tell me about a time when you thought outside the box to solve a challenge.",
      "Describe a situation where you introduced a novel approach or technology.",
      "Tell me about a time when you turned a constraint into an opportunity for innovation.",
      "Give me an example of when you questioned assumptions and found a better way.",
      "Tell me about a time when you took a creative risk that paid off.",
      "Describe a situation where you combined ideas from different domains.",
      "Tell me about a time when you innovated to improve user experience."
    ],
    impact: [
      "Tell me about a time when you delivered significant measurable impact.",
      "Describe a situation where you had to prioritize between competing important tasks.",
      "Give me an example of when you focused on what mattered most.",
      "Tell me about a time when you maximized the value of your work.",
      "Describe a situation where you measured and improved the impact of a project.",
      "Tell me about a time when you said no to good ideas to focus on great ones.",
      "Give me an example of when you optimized for impact over effort.",
      "Tell me about a time when you identified and pursued a high-impact opportunity.",
      "Describe a situation where you demonstrated results-oriented thinking.",
      "Tell me about a time when you created lasting value for users or the business."
    ],
    growth: [
      "Tell me about a time when you learned from a significant failure.",
      "Describe a situation where you actively sought feedback to improve.",
      "Give me an example of when you stepped outside your comfort zone to grow.",
      "Tell me about a time when you changed your approach based on feedback.",
      "Describe a situation where you developed a new skill to meet a challenge.",
      "Tell me about a time when you helped someone else learn and grow.",
      "Give me an example of when you reflected on your performance and made changes.",
      "Tell me about a time when you embraced a growth opportunity despite fear or doubt.",
      "Describe a situation where you turned criticism into improvement.",
      "Tell me about a time when you demonstrated intellectual humility."
    ]
  },

  meta: {
    moveFast: [
      "Tell me about a time when you shipped something quickly despite uncertainty.",
      "Describe a situation where you iterated rapidly to find the right solution.",
      "Give me an example of when speed was more important than perfection.",
      "Tell me about a time when you made a fast decision that had significant impact.",
      "Describe a situation where you learned by doing rather than planning extensively.",
      "Tell me about a time when you accelerated a project's timeline.",
      "Give me an example of when you took a shortcut that was the right call.",
      "Tell me about a time when you moved forward despite incomplete information.",
      "Describe a situation where you experimented quickly to validate an idea.",
      "Tell me about a time when you prioritized speed of learning over avoiding mistakes."
    ],
    beBold: [
      "Tell me about a time when you took a significant risk.",
      "Describe a situation where you proposed an ambitious or unconventional idea.",
      "Give me an example of when you challenged a widely-held belief or practice.",
      "Tell me about a time when you pushed for a bold decision despite skepticism.",
      "Describe a situation where you thought bigger than others expected.",
      "Tell me about a time when you bet on an unproven approach.",
      "Give me an example of when you advocated for a transformative change.",
      "Tell me about a time when you took on a project others thought was impossible.",
      "Describe a situation where you made a bold call that paid off.",
      "Tell me about a time when you encouraged others to think more boldly."
    ],
    focusOnImpact: [
      "Tell me about a time when you prioritized work based on potential impact.",
      "Describe a situation where you measured and optimized for impact.",
      "Give me an example of when you chose the highest-leverage work.",
      "Tell me about a time when you delivered measurable business results.",
      "Describe a situation where you focused resources on what mattered most.",
      "Tell me about a time when you killed a project to focus on higher impact work.",
      "Give me an example of when you quantified the impact of your work.",
      "Tell me about a time when you maximized value with limited resources.",
      "Describe a situation where you aligned your work with company priorities.",
      "Tell me about a time when you demonstrated clear ROI on your efforts."
    ],
    beOpen: [
      "Tell me about a time when you gave difficult feedback to someone.",
      "Describe a situation where you received critical feedback and acted on it.",
      "Give me an example of when you shared information transparently despite risk.",
      "Tell me about a time when you admitted you were wrong publicly.",
      "Describe a situation where you fostered open communication in your team.",
      "Tell me about a time when you encouraged others to speak up.",
      "Give me an example of when you shared a failure openly to help others learn.",
      "Tell me about a time when you challenged someone's idea constructively.",
      "Describe a situation where you created psychological safety for your team.",
      "Tell me about a time when you were transparent about bad news."
    ],
    buildSocialValue: [
      "Tell me about a time when you built something that brought people together.",
      "Describe a situation where you considered the social impact of your work.",
      "Give me an example of when you created value for a community.",
      "Tell me about a time when you prioritized user wellbeing over metrics.",
      "Describe a situation where you thought about how your work connects people.",
      "Tell me about a time when you made a product more inclusive or accessible.",
      "Give me an example of when you balanced business goals with social responsibility.",
      "Tell me about a time when you advocated for users' best interests.",
      "Describe a situation where you built features that strengthened relationships.",
      "Tell me about a time when you considered the broader societal impact of your decisions."
    ],
    metaMetamatesMe: [
      "Tell me about a time when you put the team's needs before your own.",
      "Describe a situation where you prioritized company goals over personal recognition.",
      "Give me an example of when you helped a teammate succeed at your own expense.",
      "Tell me about a time when you made a sacrifice for the greater good of the team.",
      "Describe a situation where you supported a company decision that didn't benefit you directly.",
      "Tell me about a time when you shared credit for your work with others.",
      "Give me an example of when you stepped back to let someone else lead.",
      "Tell me about a time when you took on unglamorous work for the team's benefit.",
      "Describe a situation where you put collaboration over competition.",
      "Tell me about a time when you demonstrated selflessness in your work."
    ]
  },

  generic: {
    leadership: [
      "Tell me about a time when you led a project from start to finish.",
      "Describe a situation where you had to lead without formal authority.",
      "Give me an example of when you motivated a team during a difficult time.",
      "Tell me about a time when you made a tough decision as a leader.",
      "Describe a situation where you delegated effectively.",
      "Tell me about a time when you took initiative to solve a problem.",
      "Give me an example of when you influenced others to follow your vision.",
      "Tell me about a time when you stepped up to lead in a crisis.",
      "Describe a situation where you developed others' leadership skills.",
      "Tell me about a time when you led a team through change."
    ],
    teamwork: [
      "Tell me about a time when you worked effectively as part of a team.",
      "Describe a situation where you helped a struggling team member.",
      "Give me an example of when you collaborated across departments.",
      "Tell me about a time when you contributed to team success.",
      "Describe a situation where you built strong working relationships.",
      "Tell me about a time when you resolved a team conflict.",
      "Give me an example of when you supported your team during a challenge.",
      "Tell me about a time when you worked with someone very different from you.",
      "Describe a situation where you put team goals ahead of personal goals.",
      "Tell me about a time when you improved team dynamics or morale."
    ],
    problemSolving: [
      "Tell me about a time when you solved a complex problem.",
      "Describe a situation where you used data to make a decision.",
      "Give me an example of when you identified the root cause of an issue.",
      "Tell me about a time when you developed a creative solution.",
      "Describe a situation where you analyzed multiple options before deciding.",
      "Tell me about a time when you solved a problem with limited resources.",
      "Give me an example of when you prevented a problem before it occurred.",
      "Tell me about a time when you used analytical thinking to drive results.",
      "Describe a situation where you broke down a complex problem into manageable parts.",
      "Tell me about a time when you made a difficult trade-off decision."
    ],
    conflict: [
      "Tell me about a time when you disagreed with a colleague.",
      "Describe a situation where you managed a difficult conversation.",
      "Give me an example of when you resolved a conflict between team members.",
      "Tell me about a time when you had to deliver bad news.",
      "Describe a situation where you dealt with an angry customer or stakeholder.",
      "Tell me about a time when you found common ground in a disagreement.",
      "Give me an example of when you stood your ground in a conflict.",
      "Tell me about a time when you mediated between conflicting parties.",
      "Describe a situation where you turned a conflict into a positive outcome.",
      "Tell me about a time when you handled criticism professionally."
    ],
    adaptability: [
      "Tell me about a time when you had to adapt to a major change.",
      "Describe a situation where your plans were disrupted and how you responded.",
      "Give me an example of when you learned a new skill quickly.",
      "Tell me about a time when you thrived in a changing environment.",
      "Describe a situation where you had to change your approach mid-project.",
      "Tell me about a time when you handled unexpected challenges.",
      "Give me an example of when you remained flexible under pressure.",
      "Tell me about a time when you embraced a change you initially resisted.",
      "Describe a situation where you helped others adapt to change.",
      "Tell me about a time when you pivoted successfully."
    ],
    communication: [
      "Tell me about a time when you had to explain something complex to a non-expert.",
      "Describe a situation where you persuaded someone to see your point of view.",
      "Give me an example of when you communicated effectively under pressure.",
      "Tell me about a time when you tailored your message to different audiences.",
      "Describe a situation where you improved communication within a team.",
      "Tell me about a time when you had to communicate bad news.",
      "Give me an example of when you listened actively to understand someone's perspective.",
      "Tell me about a time when you presented to senior leadership.",
      "Describe a situation where miscommunication caused a problem and how you fixed it.",
      "Tell me about a time when you built alignment through communication."
    ],
    timeManagement: [
      "Tell me about a time when you managed multiple competing priorities.",
      "Describe a situation where you had to meet a tight deadline.",
      "Give me an example of when you prioritized effectively under pressure.",
      "Tell me about a time when you improved your productivity or efficiency.",
      "Describe a situation where you had to say no to requests to focus on priorities.",
      "Tell me about a time when you managed your time to deliver quality work.",
      "Give me an example of when you balanced short-term and long-term priorities.",
      "Tell me about a time when you helped others manage their time better.",
      "Describe a situation where you recovered from falling behind schedule.",
      "Tell me about a time when you optimized a process to save time."
    ],
    failure: [
      "Tell me about a time when you failed at something important.",
      "Describe a situation where you made a mistake and how you handled it.",
      "Give me an example of when you learned from a setback.",
      "Tell me about a time when you took responsibility for a failure.",
      "Describe a situation where you bounced back from disappointment.",
      "Tell me about a time when you helped someone learn from their mistakes.",
      "Give me an example of when you turned a failure into a success.",
      "Tell me about a time when you reflected on what went wrong and improved.",
      "Describe a situation where you admitted you were wrong.",
      "Tell me about a time when failure taught you an important lesson."
    ]
  }
};

// Helper function to get random questions for an interview
export function getQuestionsForInterview(
  company: CompanyType,
  numQuestions: number,
  specificPrinciples?: string[]
): BehavioralQuestion[] {
  const companyQuestions = FAANG_QUESTIONS[company];
  
  if (!companyQuestions) {
    throw new Error(`No questions found for company: ${company}`);
  }

  const principles = specificPrinciples || Object.keys(companyQuestions);
  const questions: BehavioralQuestion[] = [];
  
  // Distribute questions across principles
  const questionsPerPrinciple = Math.ceil(numQuestions / principles.length);
  
  for (const principle of principles) {
    const principleQuestions = companyQuestions[principle];
    if (!principleQuestions || principleQuestions.length === 0) continue;
    
    // Randomly select questions from this principle
    const shuffled = [...principleQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(questionsPerPrinciple, shuffled.length));
    
    questions.push(...selected.map(text => ({
      text,
      principle,
      company
    })));
    
    if (questions.length >= numQuestions) break;
  }
  
  // Shuffle final questions and return requested amount
  return questions.sort(() => Math.random() - 0.5).slice(0, numQuestions);
}

// Helper to get all questions for a specific principle
export function getQuestionsByPrinciple(
  company: CompanyType,
  principle: string
): string[] {
  return FAANG_QUESTIONS[company]?.[principle] || [];
}

// Helper to get total question count
export function getQuestionCount(company: CompanyType): number {
  const companyQuestions = FAANG_QUESTIONS[company];
  if (!companyQuestions) return 0;
  
  return Object.values(companyQuestions).reduce(
    (total, questions) => total + questions.length,
    0
  );
}
