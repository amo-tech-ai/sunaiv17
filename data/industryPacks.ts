
import { IndustryType, DiagnosticSection } from "../types";

// Helper to create standard structure
const createSection = (industry: string, questions: any[]): DiagnosticSection[] => [
  {
    id: 'core_diagnosis',
    title: `${industry.charAt(0).toUpperCase() + industry.slice(1)} Growth Diagnostics`,
    description: "Identify your primary bottlenecks to unlock system recommendations.",
    questions: questions
  }
];

export interface IndustryPack {
  industry: IndustryType | string;
  systemNames: Record<string, string>;
  roiFormulas: Record<string, string>;
  diagnosticTemplates: Record<string, string>;
  kpis: string[];
  riskFactors: string[];
  fallbackQuestions: DiagnosticSection[];
}

const GENERIC_PACK: IndustryPack = {
  industry: 'other',
  systemNames: {
    'lead_gen': 'Growth Engine',
    'content_studio': 'Content System',
    'conversion_booster': 'CRO Suite',
    'crm_autopilot': 'CRM Automation',
    'whatsapp_assistant': 'AI Chatbot'
  },
  roiFormulas: {
    'lead_gen': 'Projected 20% increase in lead volume.',
    'content_studio': 'Saves 15+ hours/week in manual creation.',
    'conversion_booster': 'uplift in conversion rates.',
    'crm_autopilot': 'Recovers lost leads automatically.',
    'whatsapp_assistant': '24/7 response capability.'
  },
  diagnosticTemplates: {
    'sales': 'What is limiting your current revenue growth?',
    'marketing': 'How effective is your current traffic acquisition?',
    'speed': 'Where is your team spending the most manual effort?',
    'priority': 'What is the single most important goal for this quarter?'
  },
  kpis: ['Revenue Growth', 'Efficiency Score', 'CAC', 'LTV'],
  riskFactors: ['Data Silos', 'Manual Processes', 'Lack of Ownership'],
  fallbackQuestions: createSection('General', [
    {
      id: 'revenue_blocker',
      text: "What is your primary revenue bottleneck?",
      ai_hint: "Identifying the choke point allows us to deploy the right accelerator.",
      type: 'single',
      options: [
        { label: "Not enough leads", mapped_system_id: "lead_gen", pain_point_tag: "Low Volume" },
        { label: "Low conversion rate", mapped_system_id: "conversion_booster", pain_point_tag: "Low Conversion" },
        { label: "High customer churn", mapped_system_id: "crm_autopilot", pain_point_tag: "High Churn" }
      ]
    },
    {
      id: 'time_sink',
      text: "Where do you spend the most manual time?",
      ai_hint: "Automation should focus on repetitive, high-volume tasks first.",
      type: 'multi',
      options: [
        { label: "Answering FAQs/Support", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support Drag" },
        { label: "Creating Content", mapped_system_id: "content_studio", pain_point_tag: "Content Burnout" },
        { label: "Managing Data/Admin", mapped_system_id: "crm_autopilot", pain_point_tag: "Admin Drag" }
      ]
    }
  ])
};

const FASHION_PACK: IndustryPack = {
  industry: 'fashion',
  systemNames: {
    'lead_gen': 'VIP Drop Waitlist',
    'content_studio': 'UGC Content Supply Chain',
    'conversion_booster': 'PDP Conversion Optimizer',
    'crm_autopilot': 'Retention & LTV Engine',
    'whatsapp_assistant': 'Fit & Sizing Concierge'
  },
  roiFormulas: {
    'lead_gen': 'Increases drop-day revenue by capturing high-intent traffic.',
    'content_studio': 'Reduces creative production costs by 40%.',
    'conversion_booster': 'Increases Add-to-Cart rate on product pages.',
    'crm_autopilot': 'Increases repeat purchase rate (LTV).',
    'whatsapp_assistant': 'Reduces returns by answering sizing queries instantly.'
  },
  diagnosticTemplates: {
    'sales': 'What is your primary bottleneck in scaling sales?',
    'marketing': 'How sustainable is your current content production?',
    'speed': 'Which operational task slows down your seasonal drops?',
    'priority': 'What is your main focus for the next collection?'
  },
  kpis: ['Return Rate', 'AOV', 'Repeat Purchase Rate', 'CAC'],
  riskFactors: ['High Returns', 'Creative Fatigue', 'Inventory Deadstock'],
  fallbackQuestions: createSection('Fashion', [
    {
      id: 'fashion_returns',
      text: "What is impacting your margins the most?",
      ai_hint: "Returns in fashion are the silent profit killer. Reducing them is often easier than finding new customers.",
      type: 'single',
      options: [
        { label: "High Return Rates", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Returns" },
        { label: "Low Add-to-Cart", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion" },
        { label: "Creative Fatigue (Ad Costs)", mapped_system_id: "content_studio", pain_point_tag: "CAC" }
      ]
    },
    {
      id: 'fashion_ops',
      text: "Where is your team blocked?",
      ai_hint: "Fashion operations often break during seasonal drops.",
      type: 'multi',
      options: [
        { label: "Sourcing UGC Content", mapped_system_id: "content_studio", pain_point_tag: "Content" },
        { label: "Answering Sizing Questions", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support" },
        { label: "Retargeting Past Buyers", mapped_system_id: "crm_autopilot", pain_point_tag: "LTV" }
      ]
    }
  ])
};

const REAL_ESTATE_PACK: IndustryPack = {
  industry: 'real_estate',
  systemNames: {
    'lead_gen': 'Buyer Qualification Bot',
    'content_studio': 'Listing Description Generator',
    'conversion_booster': 'Tour Scheduling Engine',
    'crm_autopilot': 'Lead Nurture Sequence',
    'whatsapp_assistant': 'Instant Lead Concierge'
  },
  roiFormulas: {
    'lead_gen': 'Pre-qualifies buyers to save agent time.',
    'content_studio': 'Automates listing marketing assets.',
    'conversion_booster': 'Increases tour booking rate from web traffic.',
    'crm_autopilot': 'Revives cold leads from 6+ months ago.',
    'whatsapp_assistant': 'Responds to leads in <2 mins (Speed to Lead).'
  },
  diagnosticTemplates: {
    'sales': 'Where do you lose the most deals in your pipeline?',
    'marketing': 'How do you currently handle new listing promotion?',
    'speed': 'What is your average response time to a new lead?',
    'priority': 'What would have the biggest impact on your GCI?'
  },
  kpis: ['Speed to Lead', 'Tour Conversion', 'GCI', 'Referral Rate'],
  riskFactors: ['Slow Response Time', 'Unqualified Tours', 'Manual Follow-up'],
  fallbackQuestions: createSection('Real Estate', [
    {
      id: 're_speed',
      text: "What is your biggest lead leakage point?",
      ai_hint: "Speed to lead is the #1 driver of conversion in real estate.",
      type: 'single',
      options: [
        { label: "Slow Response on Weekends", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Speed" },
        { label: "Unqualified Viewings", mapped_system_id: "lead_gen", pain_point_tag: "Quality" },
        { label: "Ghosting after Viewing", mapped_system_id: "crm_autopilot", pain_point_tag: "Follow-up" }
      ]
    },
    {
      id: 're_admin',
      text: "What prevents you from closing more deals?",
      ai_hint: "Agents should spend time negotiating, not scheduling.",
      type: 'multi',
      options: [
        { label: "Scheduling Friction", mapped_system_id: "conversion_booster", pain_point_tag: "Admin" },
        { label: "Writing Listing Descriptions", mapped_system_id: "content_studio", pain_point_tag: "Marketing" },
        { label: "Database Management", mapped_system_id: "crm_autopilot", pain_point_tag: "Data" }
      ]
    }
  ])
};

export const INDUSTRY_PACKS: Record<IndustryType, IndustryPack> = {
  'fashion': FASHION_PACK,
  'real_estate': REAL_ESTATE_PACK,
  'tourism': { ...GENERIC_PACK, industry: 'tourism', fallbackQuestions: GENERIC_PACK.fallbackQuestions }, // TODO: Add Tourism specifics
  'saas': { ...GENERIC_PACK, industry: 'saas' }, 
  'events': { ...GENERIC_PACK, industry: 'events' },
  'other': GENERIC_PACK
};

export const getIndustryPack = (industry: string): IndustryPack => {
  const normalized = industry.toLowerCase() as IndustryType;
  return INDUSTRY_PACKS[normalized] || GENERIC_PACK;
};
