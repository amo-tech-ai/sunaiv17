
export interface IndustryPack {
  industry: string;
  systemNames: Record<string, string>;
  roiFormulas: Record<string, string>;
  diagnosticTemplates: Record<string, string>;
  kpis: string[];
  riskFactors: string[];
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
  riskFactors: ['Data Silos', 'Manual Processes', 'Lack of Ownership']
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
  riskFactors: ['High Returns', 'Creative Fatigue', 'Inventory Deadstock']
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
  riskFactors: ['Slow Response Time', 'Unqualified Tours', 'Manual Follow-up']
};

const TOURISM_PACK: IndustryPack = {
  industry: 'tourism',
  systemNames: {
    'lead_gen': 'WhatsApp Booking Concierge',
    'content_studio': 'Review-to-Reputation Flywheel',
    'conversion_booster': 'Itinerary Builder & Upsell Engine',
    'crm_autopilot': 'Follow-Up & Referral Automations',
    'whatsapp_assistant': 'Day-Of Ops Runbook Generator'
  },
  roiFormulas: {
    'lead_gen': 'Expected 60% faster response time.',
    'content_studio': 'Increases review volume by 30%.',
    'conversion_booster': 'Increases booking value by 25% through upsells.',
    'crm_autopilot': 'Boosts repeat booking rate.',
    'whatsapp_assistant': 'Streamlines daily operations.'
  },
  diagnosticTemplates: {
    'sales': 'What is blocking your booking conversion?',
    'marketing': 'How effective is your current review collection?',
    'speed': 'Which operational task consumes the most time?',
    'priority': 'What is your biggest operational challenge?'
  },
  kpis: ['Response Time', 'Booking Value', 'Review Rating', 'Repeat Rate'],
  riskFactors: ['Manual Booking Entry', 'Slow Response', 'Seasonality']
};

export const INDUSTRY_PACKS: Record<string, IndustryPack> = {
  'fashion': FASHION_PACK,
  'real_estate': REAL_ESTATE_PACK,
  'tourism': TOURISM_PACK,
  'saas': { ...GENERIC_PACK, industry: 'saas' },
  'events': { ...GENERIC_PACK, industry: 'events' },
  'other': GENERIC_PACK
};

export const getIndustryPack = (industry: string): IndustryPack => {
  const keys = Object.keys(INDUSTRY_PACKS);
  const matched = keys.find(k => k === industry.toLowerCase()) || 'other';
  return INDUSTRY_PACKS[matched];
};
