export type CompanyType = 'amazon' | 'google' | 'meta' | 'generic';

export interface CompanyProfile {
  name: string;
  displayName: string;
  principleCount: number;
  principles: Record<string, PrincipleDetail>;
  focusAreas: string[];
  interviewStyle: string;
  feedbackEmphasis: string[];
}

export interface PrincipleDetail {
  name: string;
  description: string;
  keyIndicators: string[];
}

export const COMPANY_PROFILES: Record<CompanyType, CompanyProfile> = {
  amazon: {
    name: 'amazon',
    displayName: 'Amazon',
    principleCount: 16,
    principles: {
      customerObsession: {
        name: 'Customer Obsession',
        description: 'Leaders start with the customer and work backwards',
        keyIndicators: ['customer focus', 'user needs', 'customer feedback', 'customer experience']
      },
      ownership: {
        name: 'Ownership',
        description: 'Leaders are owners. They think long term and act on behalf of the entire company',
        keyIndicators: ['taking initiative', 'accountability', 'long-term thinking', 'beyond job scope']
      },
      inventAndSimplify: {
        name: 'Invent and Simplify',
        description: 'Leaders expect and require innovation and invention from their teams',
        keyIndicators: ['innovation', 'simplification', 'creative solutions', 'process improvement']
      },
      areRightALot: {
        name: 'Are Right, A Lot',
        description: 'Leaders are right a lot. They have strong judgment and good instincts',
        keyIndicators: ['good judgment', 'data-driven decisions', 'learning from mistakes', 'seeking diverse perspectives']
      },
      learnAndBeCurious: {
        name: 'Learn and Be Curious',
        description: 'Leaders are never done learning and always seek to improve themselves',
        keyIndicators: ['continuous learning', 'curiosity', 'self-improvement', 'exploring new ideas']
      },
      hireAndDevelopTheBest: {
        name: 'Hire and Develop the Best',
        description: 'Leaders raise the performance bar with every hire and promotion',
        keyIndicators: ['mentoring', 'talent development', 'raising standards', 'coaching others']
      },
      insistOnHighestStandards: {
        name: 'Insist on the Highest Standards',
        description: 'Leaders have relentlessly high standards',
        keyIndicators: ['quality focus', 'high standards', 'attention to detail', 'excellence']
      },
      thinkBig: {
        name: 'Think Big',
        description: 'Thinking small is a self-fulfilling prophecy',
        keyIndicators: ['bold vision', 'ambitious goals', 'big picture thinking', 'scalability']
      },
      biasForAction: {
        name: 'Bias for Action',
        description: 'Speed matters in business. Many decisions are reversible',
        keyIndicators: ['quick decisions', 'calculated risks', 'moving fast', 'not waiting for perfect information']
      },
      frugality: {
        name: 'Frugality',
        description: 'Accomplish more with less. Constraints breed resourcefulness',
        keyIndicators: ['resourcefulness', 'cost consciousness', 'efficiency', 'doing more with less']
      },
      earnTrust: {
        name: 'Earn Trust',
        description: 'Leaders listen attentively, speak candidly, and treat others respectfully',
        keyIndicators: ['building trust', 'transparency', 'respectful communication', 'self-criticism']
      },
      diveDeep: {
        name: 'Dive Deep',
        description: 'Leaders operate at all levels, stay connected to the details',
        keyIndicators: ['attention to detail', 'deep understanding', 'data analysis', 'root cause analysis']
      },
      haveBackbone: {
        name: 'Have Backbone; Disagree and Commit',
        description: 'Leaders respectfully challenge decisions when they disagree',
        keyIndicators: ['speaking up', 'constructive disagreement', 'commitment after decision', 'conviction']
      },
      deliverResults: {
        name: 'Deliver Results',
        description: 'Leaders focus on the key inputs and deliver them with the right quality and in a timely fashion',
        keyIndicators: ['meeting deadlines', 'achieving goals', 'overcoming obstacles', 'measurable outcomes']
      },
      striveToBeEarthsBestEmployer: {
        name: "Strive to be Earth's Best Employer",
        description: 'Leaders work to create a safer, more productive, higher performing, more diverse, and more just work environment',
        keyIndicators: ['employee development', 'inclusive culture', 'work environment', 'team wellbeing']
      },
      successAndScale: {
        name: 'Success and Scale Bring Broad Responsibility',
        description: 'We started in a garage, but we are not small anymore',
        keyIndicators: ['social responsibility', 'environmental impact', 'community engagement', 'ethical decisions']
      }
    },
    focusAreas: ['metrics and data', 'ownership', 'customer obsession', 'bias for action'],
    interviewStyle: 'Deep dive with extensive follow-ups. Expects specific data, metrics, and detailed examples.',
    feedbackEmphasis: ['quantifiable results', 'personal ownership', 'data-driven decisions', 'long-term impact']
  },

  google: {
    name: 'google',
    displayName: 'Google',
    principleCount: 5,
    principles: {
      collaboration: {
        name: 'Collaboration & Teamwork',
        description: 'Ability to work effectively with diverse teams and build consensus',
        keyIndicators: ['cross-functional work', 'team dynamics', 'conflict resolution', 'building consensus']
      },
      ambiguity: {
        name: 'Handling Ambiguity',
        description: 'Comfort with uncertainty and ability to navigate unclear situations',
        keyIndicators: ['unclear requirements', 'adapting to change', 'decision making with incomplete info', 'flexibility']
      },
      innovation: {
        name: 'Innovation & Creativity',
        description: 'Thinking differently and bringing fresh perspectives to problems',
        keyIndicators: ['creative solutions', 'new approaches', 'challenging status quo', 'experimentation']
      },
      impact: {
        name: 'Impact & Results',
        description: 'Focus on meaningful outcomes and measurable contributions',
        keyIndicators: ['measurable impact', 'prioritization', 'results orientation', 'efficiency']
      },
      growth: {
        name: 'Growth Mindset & Learning',
        description: 'Continuous learning, feedback receptiveness, and personal development',
        keyIndicators: ['learning from failure', 'seeking feedback', 'skill development', 'adaptability']
      }
    },
    focusAreas: ['collaboration', 'handling ambiguity', 'innovation', 'Googleyness'],
    interviewStyle: 'Conversational and collaborative. Tests adaptability, teamwork, and problem-solving approach.',
    feedbackEmphasis: ['collaborative approach', 'adaptability', 'innovative thinking', 'learning orientation']
  },

  meta: {
    name: 'meta',
    displayName: 'Meta',
    principleCount: 6,
    principles: {
      moveFast: {
        name: 'Move Fast',
        description: 'Bias for action, rapid iteration, and learning through doing',
        keyIndicators: ['speed', 'iteration', 'quick decisions', 'experimentation']
      },
      beBold: {
        name: 'Be Bold',
        description: 'Taking risks, thinking big, and pushing boundaries',
        keyIndicators: ['risk-taking', 'ambitious goals', 'challenging assumptions', 'bold decisions']
      },
      focusOnImpact: {
        name: 'Focus on Impact',
        description: 'Prioritizing work that creates the most value',
        keyIndicators: ['prioritization', 'measurable impact', 'value creation', 'results focus']
      },
      beOpen: {
        name: 'Be Open',
        description: 'Transparency, feedback culture, and open communication',
        keyIndicators: ['transparency', 'giving/receiving feedback', 'open communication', 'sharing information']
      },
      buildSocialValue: {
        name: 'Build Social Value',
        description: 'Creating products that bring people together and build community',
        keyIndicators: ['user impact', 'community building', 'social good', 'connecting people']
      },
      metaMetamatesMe: {
        name: 'Meta, Metamates, Me',
        description: 'Company first, team second, self last',
        keyIndicators: ['team over self', 'company priorities', 'collaboration', 'selflessness']
      }
    },
    focusAreas: ['impact', 'speed', 'boldness', 'collaboration'],
    interviewStyle: 'Fast-paced and impact-focused. Expects concrete metrics and evidence of moving quickly.',
    feedbackEmphasis: ['measurable impact', 'speed of execution', 'bold thinking', 'team collaboration']
  },

  generic: {
    name: 'generic',
    displayName: 'Other Companies',
    principleCount: 8,
    principles: {
      leadership: {
        name: 'Leadership & Influence',
        description: 'Ability to lead projects and influence others',
        keyIndicators: ['taking initiative', 'influencing others', 'project leadership', 'decision making']
      },
      teamwork: {
        name: 'Teamwork & Collaboration',
        description: 'Working effectively with others toward common goals',
        keyIndicators: ['team collaboration', 'supporting others', 'building relationships', 'cooperation']
      },
      problemSolving: {
        name: 'Problem-Solving & Decision Making',
        description: 'Analytical thinking and effective decision making',
        keyIndicators: ['analytical thinking', 'problem analysis', 'decision making', 'critical thinking']
      },
      conflict: {
        name: 'Conflict Resolution',
        description: 'Handling disagreements and difficult situations',
        keyIndicators: ['managing conflict', 'difficult conversations', 'finding compromise', 'diplomacy']
      },
      adaptability: {
        name: 'Adaptability & Change',
        description: 'Flexibility and resilience in changing environments',
        keyIndicators: ['adapting to change', 'flexibility', 'resilience', 'handling uncertainty']
      },
      communication: {
        name: 'Communication',
        description: 'Clear and effective communication with stakeholders',
        keyIndicators: ['clear communication', 'stakeholder management', 'presentation skills', 'active listening']
      },
      timeManagement: {
        name: 'Time Management & Prioritization',
        description: 'Managing workload and prioritizing effectively',
        keyIndicators: ['prioritization', 'meeting deadlines', 'workload management', 'efficiency']
      },
      failure: {
        name: 'Failure & Learning',
        description: 'Learning from mistakes and demonstrating growth',
        keyIndicators: ['learning from failure', 'resilience', 'self-reflection', 'continuous improvement']
      }
    },
    focusAreas: ['general behavioral competencies', 'STAR framework', 'professional skills'],
    interviewStyle: 'Standard behavioral interview format with focus on STAR framework.',
    feedbackEmphasis: ['clear STAR structure', 'specific examples', 'measurable outcomes', 'personal growth']
  }
};

export function getCompanyProfile(company: CompanyType): CompanyProfile {
  return COMPANY_PROFILES[company];
}

export function getPrincipleDetails(company: CompanyType, principleKey: string): PrincipleDetail | undefined {
  return COMPANY_PROFILES[company]?.principles[principleKey];
}
