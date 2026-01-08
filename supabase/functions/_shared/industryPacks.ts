
export interface DiagnosticOption {
  label: string;
  mapped_system_id: string;
  pain_point_tag: string;
  ai_explanation?: string;
  priority_weight?: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface DiagnosticQuestion {
  id: string;
  text: string;
  ai_hint: string;
  type: 'single' | 'multi';
  options: DiagnosticOption[];
}

export interface DiagnosticSection {
  id: string;
  title: string;
  description: string;
  questions: DiagnosticQuestion[];
}

export interface IndustryPack {
  industry: string;
  systemNames: Record<string, string>;
  roiFormulas: Record<string, string>;
  diagnosticTemplates: Record<string, string>;
  kpis: string[];
  riskFactors: string[];
  diagnostics: DiagnosticSection[];
}

// --- FASHION & RETAIL (DTC) ---
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
    'crm_autopilot': 'Increases repeat purchase rate (LTV) and reduces churn.',
    'whatsapp_assistant': 'Reduces returns by answering sizing queries instantly.'
  },
  diagnosticTemplates: { 'sales': '', 'marketing': '', 'speed': '', 'priority': '' }, // Deprecated in favor of diagnostics array
  kpis: ['Return Rate', 'AOV', 'Repeat Purchase Rate', 'CAC'],
  riskFactors: ['High Returns', 'Creative Fatigue', 'Inventory Deadstock'],
  diagnostics: [
    {
      id: 'north_star',
      title: 'The North Star',
      description: 'Select your absolute priority for the next quarter.',
      questions: [{
        id: 'primary_goal',
        text: 'What is your absolute priority for the next quarter?',
        ai_hint: 'This defines the "Theme" of your roadmap.',
        type: 'single',
        options: [
          { label: "Scale revenue aggressively", mapped_system_id: "conversion_booster", pain_point_tag: "Growth", priority_weight: "Critical" },
          { label: "Protect margins (reduce returns/costs)", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Margins", priority_weight: "Critical" },
          { label: "Launch new collections faster", mapped_system_id: "lead_gen", pain_point_tag: "Speed", priority_weight: "High" },
          { label: "Automate customer operations", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Ops", priority_weight: "High" },
          { label: "Build brand authority", mapped_system_id: "content_studio", pain_point_tag: "Brand", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'revenue_friction',
      title: 'Revenue Friction',
      description: 'Where are you losing money right now?',
      questions: [{
        id: 'revenue_leaks',
        text: 'Where are you losing money right now?',
        ai_hint: 'Pinpointing leaks often yields higher ROI than seeking new traffic.',
        type: 'multi',
        options: [
          { label: "High traffic, but low add-to-cart rate", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "High", ai_explanation: "Traffic without conversion is wasted ad spend. We need to optimize the PDP." },
          { label: "Customers abandon checkout at the last step", mapped_system_id: "crm_autopilot", pain_point_tag: "Abandonment", priority_weight: "High", ai_explanation: "Recovering abandoned carts is the lowest hanging fruit in ecommerce." },
          { label: "Return rates are eating into our profits", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Returns", priority_weight: "Critical", ai_explanation: "Returns in fashion are often a data problem. We need to solve sizing confusion pre-purchase." },
          { label: "Ad costs (CAC) are rising too high", mapped_system_id: "content_studio", pain_point_tag: "CAC", priority_weight: "Medium", ai_explanation: "Combating ad fatigue requires a high-velocity creative testing engine." },
          { label: "VIPs and repeat customers aren't buying enough", mapped_system_id: "crm_autopilot", pain_point_tag: "Retention", priority_weight: "Medium", ai_explanation: "Increasing LTV is the key to sustainable growth." }
        ]
      }]
    },
    {
      id: 'time_blockers',
      title: 'Time Blockers',
      description: 'What creates the most manual work for your team?',
      questions: [{
        id: 'manual_work',
        text: 'What creates the most manual work for your team?',
        ai_hint: 'Operational drag prevents you from working on strategy.',
        type: 'multi',
        options: [
          { label: "Answering 'Where is my order?' & sizing questions", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "High", ai_explanation: "Your support team shouldn't be answering basic sizing queries. Automating this frees up 20+ hours a week." },
          { label: "Creating content for Instagram/TikTok", mapped_system_id: "content_studio", pain_point_tag: "Content", priority_weight: "High", ai_explanation: "Automating asset production allows you to post 3x more often with less effort." },
          { label: "Updating product catalogs & descriptions", mapped_system_id: "content_studio", pain_point_tag: "Admin", priority_weight: "Medium", ai_explanation: "AI can rewrite descriptions for SEO instantly." },
          { label: "Managing inventory & dead stock", mapped_system_id: "conversion_booster", pain_point_tag: "Inventory", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'scale_readiness',
      title: 'Scale Readiness',
      description: 'How fast do you want to implement these changes?',
      questions: [{
        id: 'velocity',
        text: 'How fast do you want to implement these changes?',
        ai_hint: 'This helps us calibrate the intensity of the roadmap.',
        type: 'single',
        options: [
          { label: "Aggressive: Fix it yesterday.", mapped_system_id: "lead_gen", pain_point_tag: "Fast", priority_weight: "Critical" },
          { label: "Measured: One system at a time.", mapped_system_id: "crm_autopilot", pain_point_tag: "Steady", priority_weight: "Medium" },
          { label: "Exploratory: Just looking for options.", mapped_system_id: "content_studio", pain_point_tag: "Slow", priority_weight: "Low" }
        ]
      }]
    }
  ]
};

// --- REAL ESTATE ---
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
  diagnosticTemplates: { 'sales': '', 'marketing': '', 'speed': '', 'priority': '' },
  kpis: ['Speed to Lead', 'Tour Conversion', 'GCI', 'Referral Rate'],
  riskFactors: ['Slow Response Time', 'Unqualified Tours', 'Manual Follow-up'],
  diagnostics: [
    {
      id: 'north_star',
      title: 'The North Star',
      description: 'What is your main objective right now?',
      questions: [{
        id: 'primary_goal',
        text: 'What is your main objective right now?',
        ai_hint: 'Focusing on one metric helps us choose the right lever.',
        type: 'single',
        options: [
          { label: "Close more deals (Volume)", mapped_system_id: "lead_gen", pain_point_tag: "Volume", priority_weight: "High" },
          { label: "Increase commission per deal (Value)", mapped_system_id: "conversion_booster", pain_point_tag: "Value", priority_weight: "High" },
          { label: "Save time on admin & scheduling", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Time", priority_weight: "Critical" },
          { label: "Recruit more agents", mapped_system_id: "content_studio", pain_point_tag: "Recruiting", priority_weight: "Medium" },
          { label: "Dominate local market presence", mapped_system_id: "content_studio", pain_point_tag: "Brand", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'revenue_friction',
      title: 'Revenue Friction',
      description: 'Where does the pipeline break?',
      questions: [{
        id: 'revenue_leaks',
        text: 'Where does the pipeline break?',
        ai_hint: 'Identifying leakage points prevents wasted ad spend.',
        type: 'multi',
        options: [
          { label: "We miss leads because we respond too slowly", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Speed", priority_weight: "Critical", ai_explanation: "Speed to lead is the #1 driver of conversion in real estate. 5 minutes of delay can cost the commission." },
          { label: "Too many 'tire kickers' (unqualified leads)", mapped_system_id: "lead_gen", pain_point_tag: "Quality", priority_weight: "High", ai_explanation: "Your agents should only speak to buyers with approved budgets." },
          { label: "Leads ghost us after the first viewing", mapped_system_id: "crm_autopilot", pain_point_tag: "Retention", priority_weight: "High", ai_explanation: "Ghosting usually means they found another option. Automated nurture keeps you top of mind." },
          { label: "Our follow-up process is inconsistent", mapped_system_id: "crm_autopilot", pain_point_tag: "Process", priority_weight: "High" },
          { label: "Past clients forget us (lost referrals)", mapped_system_id: "crm_autopilot", pain_point_tag: "Referrals", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'time_blockers',
      title: 'Time Blockers',
      description: 'Where is your time being wasted?',
      questions: [{
        id: 'manual_work',
        text: 'Where is your time being wasted?',
        ai_hint: 'Agents should be negotiating, not doing admin.',
        type: 'multi',
        options: [
          { label: "Texting back-and-forth to schedule viewings", mapped_system_id: "conversion_booster", pain_point_tag: "Scheduling", priority_weight: "Medium", ai_explanation: "Scheduling friction kills momentum. Let buyers book directly into your calendar." },
          { label: "Answering the same questions about listings", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "Medium" },
          { label: "Writing listing descriptions and social posts", mapped_system_id: "content_studio", pain_point_tag: "Marketing", priority_weight: "Medium", ai_explanation: "Agents should be negotiating, not writing copy. Automating listings ensures consistency and SEO performance." },
          { label: "Manually entering data into the CRM", mapped_system_id: "crm_autopilot", pain_point_tag: "Data", priority_weight: "Low" }
        ]
      }]
    },
    {
      id: 'scale_readiness',
      title: 'Scale Readiness',
      description: 'How fast do you want to implement these changes?',
      questions: [{
        id: 'velocity',
        text: 'How fast do you want to implement these changes?',
        ai_hint: 'This helps us calibrate the intensity of the roadmap.',
        type: 'single',
        options: [
          { label: "Aggressive: Fix it yesterday.", mapped_system_id: "lead_gen", pain_point_tag: "Fast", priority_weight: "Critical" },
          { label: "Measured: One system at a time.", mapped_system_id: "crm_autopilot", pain_point_tag: "Steady", priority_weight: "Medium" },
          { label: "Exploratory: Just looking for options.", mapped_system_id: "content_studio", pain_point_tag: "Slow", priority_weight: "Low" }
        ]
      }]
    }
  ]
};

// --- EVENTS & EXPERIENCES ---
const EVENTS_PACK: IndustryPack = {
  industry: 'events',
  systemNames: {
    'lead_gen': 'Sponsor Outreach Copilot',
    'content_studio': 'Event Content Supply Chain',
    'conversion_booster': 'Ticket Funnel Optimizer',
    'crm_autopilot': 'Attendee Retention System',
    'whatsapp_assistant': 'Event Ops Concierge'
  },
  roiFormulas: {
    'lead_gen': 'Fills Expo Hall 30% faster than manual outreach.',
    'content_studio': 'Generates all promotional assets for the event lifecycle.',
    'conversion_booster': 'Increases ticket page conversion by optimizing checkout flow.',
    'crm_autopilot': 'Boosts repeat attendance for annual events.',
    'whatsapp_assistant': 'Reduces support tickets by answering FAQ instantly.'
  },
  diagnosticTemplates: { 'sales': '', 'marketing': '', 'speed': '', 'priority': '' },
  kpis: ['Ticket Velocity', 'Sponsor Revenue', 'Attendee NPS', 'Show-up Rate'],
  riskFactors: ['Late Ticket Sales', 'Vendor Chaos', 'Low Engagement'],
  diagnostics: [
    {
      id: 'north_star',
      title: 'The North Star',
      description: 'What defines success for your next event?',
      questions: [{
        id: 'primary_goal',
        text: 'What defines success for your next event?',
        ai_hint: 'Focusing on the main goal helps prioritize systems.',
        type: 'single',
        options: [
          { label: "Selling out tickets fast", mapped_system_id: "conversion_booster", pain_point_tag: "Sales", priority_weight: "Critical" },
          { label: "Maximizing sponsor revenue", mapped_system_id: "lead_gen", pain_point_tag: "Revenue", priority_weight: "High" },
          { label: "Flawless attendee experience", mapped_system_id: "whatsapp_assistant", pain_point_tag: "CX", priority_weight: "High" },
          { label: "Reducing operational chaos", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Ops", priority_weight: "Medium" },
          { label: "Building a year-round community", mapped_system_id: "crm_autopilot", pain_point_tag: "Community", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'revenue_friction',
      title: 'Revenue Friction',
      description: 'What is stopping revenue growth?',
      questions: [{
        id: 'revenue_leaks',
        text: 'What is stopping revenue growth?',
        ai_hint: 'Events have a hard deadline; revenue leaks must be plugged early.',
        type: 'multi',
        options: [
          { label: "Traffic hits the page, but doesn't buy tickets", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "Critical", ai_explanation: "If traffic isn't converting, we need to optimize the checkout flow and urgency triggers." },
          { label: "Sponsor outreach is manual and slow", mapped_system_id: "lead_gen", pain_point_tag: "Sponsors", priority_weight: "High", ai_explanation: "Sponsorships are high-value but require high-volume outreach. Automation ensures no partner slips through." },
          { label: "We aren't selling enough VIP upgrades/add-ons", mapped_system_id: "crm_autopilot", pain_point_tag: "Upsell", priority_weight: "Medium" },
          { label: "Last-minute ticket sales are stressful", mapped_system_id: "content_studio", pain_point_tag: "Stress", priority_weight: "Medium" },
          { label: "Post-event engagement drops to zero", mapped_system_id: "crm_autopilot", pain_point_tag: "Retention", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'time_blockers',
      title: 'Time Blockers',
      description: 'What operational tasks are overwhelming?',
      questions: [{
        id: 'manual_work',
        text: 'What operational tasks are overwhelming?',
        ai_hint: 'Event teams burn out on logistics. Automate the chaos.',
        type: 'multi',
        options: [
          { label: "Answering repetitive attendee FAQs (parking, etc.)", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "High", ai_explanation: "Your team shouldn't answer 'where do I park?' 500 times. An event bot handles this instantly." },
          { label: "Coordinating vendors and logistics", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Logistics", priority_weight: "Medium", ai_explanation: "Centralizing vendor comms prevents day-of chaos." },
          { label: "Creating promotional content and reels", mapped_system_id: "content_studio", pain_point_tag: "Promo", priority_weight: "High" },
          { label: "Managing check-in and registration lists", mapped_system_id: "crm_autopilot", pain_point_tag: "Check-in", priority_weight: "Low" }
        ]
      }]
    },
    {
      id: 'scale_readiness',
      title: 'Scale Readiness',
      description: 'How fast do you want to implement these changes?',
      questions: [{
        id: 'velocity',
        text: 'How fast do you want to implement these changes?',
        ai_hint: 'This helps us calibrate the intensity of the roadmap.',
        type: 'single',
        options: [
          { label: "Aggressive: Fix it yesterday.", mapped_system_id: "lead_gen", pain_point_tag: "Fast", priority_weight: "Critical" },
          { label: "Measured: One system at a time.", mapped_system_id: "crm_autopilot", pain_point_tag: "Steady", priority_weight: "Medium" },
          { label: "Exploratory: Just looking for options.", mapped_system_id: "content_studio", pain_point_tag: "Slow", priority_weight: "Low" }
        ]
      }]
    }
  ]
};

// --- SAAS / B2B ---
const SAAS_PACK: IndustryPack = {
  industry: 'saas',
  systemNames: {
    'lead_gen': 'Demo Show-Rate Bot',
    'content_studio': 'Sales Enablement Generator',
    'conversion_booster': 'Trial Conversion Chat',
    'crm_autopilot': 'Churn Prevention Engine',
    'whatsapp_assistant': 'Support Deflection Agent'
  },
  roiFormulas: {
    'lead_gen': 'Reduces demo no-shows by 40%.',
    'content_studio': 'Creates personalized sales assets at scale.',
    'conversion_booster': 'Converts 20% more free trials to paid.',
    'crm_autopilot': 'Identifies at-risk accounts before they churn.',
    'whatsapp_assistant': 'Resolves 60% of L1 support tickets automatically.'
  },
  diagnosticTemplates: { 'sales': '', 'marketing': '', 'speed': '', 'priority': '' },
  kpis: ['MRR Growth', 'Churn Rate', 'LTV:CAC', 'NPS'],
  riskFactors: ['High Churn', 'Low Adoption', 'Support Overload'],
  diagnostics: [
    {
      id: 'north_star',
      title: 'The North Star',
      description: 'What is the primary lever for growth?',
      questions: [{
        id: 'primary_goal',
        text: 'What is the primary lever for growth?',
        ai_hint: 'SaaS growth levers are distinct: Acquisition vs Retention vs Expansion.',
        type: 'single',
        options: [
          { label: "Acquire more new logos", mapped_system_id: "lead_gen", pain_point_tag: "Acquisition", priority_weight: "High" },
          { label: "Reduce churn / Increase retention", mapped_system_id: "crm_autopilot", pain_point_tag: "Retention", priority_weight: "Critical" },
          { label: "Expand Average Revenue Per User (ARPU)", mapped_system_id: "crm_autopilot", pain_point_tag: "Expansion", priority_weight: "Medium" },
          { label: "Improve sales team efficiency", mapped_system_id: "content_studio", pain_point_tag: "Efficiency", priority_weight: "High" },
          { label: "Automate onboarding", mapped_system_id: "conversion_booster", pain_point_tag: "Onboarding", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'revenue_friction',
      title: 'Revenue Friction',
      description: 'Where is the leak in the bucket?',
      questions: [{
        id: 'revenue_leaks',
        text: 'Where is the leak in the bucket?',
        ai_hint: 'Plugging the leak is cheaper than filling the bucket.',
        type: 'multi',
        options: [
          { label: "Demo requests don't show up (Ghosting)", mapped_system_id: "lead_gen", pain_point_tag: "Ghosting", priority_weight: "High", ai_explanation: "Booking a meeting is only half the battle. Automated reminders reduce no-show rates by 40%." },
          { label: "Qualified leads slip through the cracks", mapped_system_id: "crm_autopilot", pain_point_tag: "Process", priority_weight: "High" },
          { label: "Free trial users don't convert to paid", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "Critical", ai_explanation: "Users need guidance. Automated triggers based on usage behavior drive conversion." },
          { label: "Churn is high in the first 90 days", mapped_system_id: "crm_autopilot", pain_point_tag: "Churn", priority_weight: "Critical", ai_explanation: "Churn is the silent killer in SaaS. Identifying at-risk users early is key." },
          { label: "Upsell opportunities are missed", mapped_system_id: "crm_autopilot", pain_point_tag: "Upsell", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'time_blockers',
      title: 'Time Blockers',
      description: 'Where is your team stuck?',
      questions: [{
        id: 'manual_work',
        text: 'Where is your team stuck?',
        ai_hint: 'Highly paid talent shouldn\'t do low-value admin.',
        type: 'multi',
        options: [
          { label: "Manually qualifying inbound leads", mapped_system_id: "lead_gen", pain_point_tag: "Qualifying", priority_weight: "High", ai_explanation: "Let AI score and route leads so sales only talks to closable deals." },
          { label: "Writing cold outreach emails", mapped_system_id: "content_studio", pain_point_tag: "Outreach", priority_weight: "Medium" },
          { label: "Repetitive customer support tickets", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "Medium", ai_explanation: "Deflect Tier-1 tickets with an intelligent KB bot." },
          { label: "Manual onboarding/training sessions", mapped_system_id: "conversion_booster", pain_point_tag: "Onboarding", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'scale_readiness',
      title: 'Scale Readiness',
      description: 'How fast do you want to implement these changes?',
      questions: [{
        id: 'velocity',
        text: 'How fast do you want to implement these changes?',
        ai_hint: 'This helps us calibrate the intensity of the roadmap.',
        type: 'single',
        options: [
          { label: "Aggressive: Fix it yesterday.", mapped_system_id: "lead_gen", pain_point_tag: "Fast", priority_weight: "Critical" },
          { label: "Measured: One system at a time.", mapped_system_id: "crm_autopilot", pain_point_tag: "Steady", priority_weight: "Medium" },
          { label: "Exploratory: Just looking for options.", mapped_system_id: "content_studio", pain_point_tag: "Slow", priority_weight: "Low" }
        ]
      }]
    }
  ]
};

// --- GENERIC / OTHER ---
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
    'conversion_booster': 'Uplift in conversion rates.',
    'crm_autopilot': 'Recovers lost leads automatically.',
    'whatsapp_assistant': '24/7 response capability.'
  },
  diagnosticTemplates: { 'sales': '', 'marketing': '', 'speed': '', 'priority': '' },
  kpis: ['Revenue Growth', 'Efficiency Score', 'CAC', 'LTV'],
  riskFactors: ['Data Silos', 'Manual Processes', 'Lack of Ownership'],
  diagnostics: [
    {
      id: 'north_star',
      title: 'The North Star',
      description: 'Select your primary focus.',
      questions: [{
        id: 'primary_goal',
        text: 'What is your primary focus?',
        ai_hint: 'Defining the goal aligns the system recommendation.',
        type: 'single',
        options: [
          { label: "Increase Revenue", mapped_system_id: "lead_gen", pain_point_tag: "Revenue", priority_weight: "Critical" },
          { label: "Reduce Costs/Time", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Efficiency", priority_weight: "High" },
          { label: "Improve Customer Experience", mapped_system_id: "crm_autopilot", pain_point_tag: "CX", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'bottlenecks',
      title: 'Bottlenecks',
      description: 'What is slowing you down?',
      questions: [{
        id: 'blocker',
        text: 'What is slowing you down?',
        ai_hint: 'Identifying the blocker helps us remove it.',
        type: 'multi',
        options: [
          { label: "Not enough leads", mapped_system_id: "lead_gen", pain_point_tag: "Traffic", priority_weight: "High" },
          { label: "Leads not converting", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "High" },
          { label: "Too much manual work", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Ops", priority_weight: "High" }
        ]
      }]
    }
  ]
};

const TOURISM_PACK: IndustryPack = {
  ...GENERIC_PACK,
  industry: 'tourism',
  diagnostics: GENERIC_PACK.diagnostics // Use generic for now, can be updated later if copy provided
};

export const INDUSTRY_PACKS: Record<string, IndustryPack> = {
  'fashion': FASHION_PACK,
  'real_estate': REAL_ESTATE_PACK,
  'tourism': TOURISM_PACK,
  'saas': SAAS_PACK,
  'events': EVENTS_PACK,
  'other': GENERIC_PACK
};

export const getIndustryPack = (industry: string): IndustryPack => {
  const keys = Object.keys(INDUSTRY_PACKS);
  const matched = keys.find(k => k === industry.toLowerCase()) || 'other';
  return INDUSTRY_PACKS[matched];
};
