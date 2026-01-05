export type IndustryType = 'fashion' | 'saas' | 'tourism' | 'real_estate' | 'other';

export interface AppState {
  step: number;
  completed: boolean;
  data: {
    businessName: string;
    website: string;
    description: string;
    industry: IndustryType;
    priorities: {
      moneyFocus: string;
      marketingFocus: string;
      responseSpeed: string;
      mainPriority: string;
    };
    selectedSystems: string[];
    readiness: {
      dataReady: boolean;
      teamOwner: boolean;
      toolsReady: boolean;
      budgetApproved: boolean;
    };
  };
}

export const INITIAL_STATE: AppState = {
  step: 1,
  completed: false,
  data: {
    businessName: '',
    website: '',
    description: '',
    industry: 'saas',
    priorities: {
      moneyFocus: '',
      marketingFocus: '',
      responseSpeed: '',
      mainPriority: '',
    },
    selectedSystems: [],
    readiness: {
      dataReady: false,
      teamOwner: false,
      toolsReady: false,
      budgetApproved: false,
    },
  },
};

export const SYSTEMS = [
  {
    id: 'lead_gen',
    title: 'Lead Generation Engine',
    description: 'Automated outreach and inbound qualification.',
    revenueImpact: 'Increases pipeline volume by 40% in 30 days.'
  },
  {
    id: 'content_studio',
    title: 'Content Studio',
    description: 'AI-driven content production for social & blog.',
    revenueImpact: 'Reduces CAC by organic brand authority.'
  },
  {
    id: 'conversion_booster',
    title: 'Conversion Booster',
    description: 'CRO systems and dynamic landing page copy.',
    revenueImpact: 'Upsizes average deal value and conversion rates.'
  },
  {
    id: 'crm_autopilot',
    title: 'CRM Follow-up Autopilot',
    description: 'Never let a lead go cold with AI sequences.',
    revenueImpact: 'Recovers 20% of lost leads automatically.'
  },
  {
    id: 'whatsapp_assistant',
    title: 'WhatsApp Sales Assistant',
    description: 'Instant 24/7 concierge for high-intent queries.',
    revenueImpact: 'Doubles speed-to-lead and booking rates.'
  },
];