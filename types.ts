
export type IndustryType = 'fashion' | 'saas' | 'tourism' | 'real_estate' | 'events' | 'other';

export interface DiagnosticOption {
  id: string;
  label: string;
  mapped_system_id: string; // The system this problem suggests
  pain_point_tag: string;
}

export interface DiagnosticQuestion {
  id: string;
  category: 'sales' | 'marketing' | 'speed' | 'priority'; // Maps to AppState priorities keys
  title: string; // Replaces label
  context_reasoning: string; // Context for the Right Panel
  options: DiagnosticOption[];
}

export interface RoadmapPhase {
  phaseName: string;
  duration: string;
  items: string[]; // Legacy support
  deliverables?: string[]; // Enhanced schema
  kpis?: string[]; // Enhanced schema
}

export interface AIState {
  questions: DiagnosticQuestion[];
  recommendations: {
    systemIds: string[];
    impacts: Record<string, string>;
    summary?: string;
  };
  readinessAnalysis: {
    score: number;
    risks: string[];
    wins: string[];
    summary: string;
  };
  roadmap: RoadmapPhase[];
  documentInsights?: string; // Insights from uploaded documents
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'high' | 'medium' | 'low';
  phase: string;
  tags: string[];
}

export interface DashboardState {
  tasks: Task[];
  initialized: boolean;
}

export interface BusinessAnalysis {
  detected_industry: IndustryType;
  industry_confidence: number; // 0-100
  business_model: string;
  maturity_score: number;
  industry_signals: string[];
  observations: string[];
  verified: boolean;
}

export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  base64?: string; // Stored for analysis
  content?: string; // Text content if applicable
}

export interface IndustryPack {
  industry: IndustryType;
  systemNames: Record<string, string>; // Maps generic ID to industry specific name
  roiFormulas: Record<string, string>; // Text template for ROI calculation
  diagnosticTemplates: Record<string, string>; // Template strings for questions
  kpis: string[];
  riskFactors: string[];
}

export interface AppState {
  step: number;
  completed: boolean;
  aiState: AIState;
  dashboardState: DashboardState;
  data: {
    fullName: string; // User's name
    businessName: string;
    website: string;
    description: string;
    industry: IndustryType;
    selectedServices: string[]; // Services currently used or planned
    uploadedDocuments: UploadedDocument[]; // New: Documents
    analysis?: BusinessAnalysis; // New field for deep analysis
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
  aiState: {
    questions: [],
    recommendations: { systemIds: [], impacts: {} },
    readinessAnalysis: { score: 0, risks: [], wins: [], summary: "" },
    roadmap: [],
    documentInsights: ""
  },
  dashboardState: {
    tasks: [],
    initialized: false
  },
  data: {
    fullName: '',
    businessName: '',
    website: '',
    description: '',
    industry: 'saas',
    selectedServices: [],
    uploadedDocuments: [],
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
    title: 'Automated Lead Pipeline',
    description: 'Stop chasing unqualified prospects. Automatically capture, filter, and route high-value leads 24/7 so your team only talks to buyers.',
    revenueImpact: 'Increases qualified pipeline volume by ~40% in 30 days.'
  },
  {
    id: 'content_studio',
    title: 'Strategic Content Engine',
    description: 'Eliminate creative burnout. Generate high-converting, on-brand assets for social, email, and web at scale to dominate your niche.',
    revenueImpact: 'Reduces CAC by building organic brand authority.'
  },
  {
    id: 'conversion_booster',
    title: 'Revenue Conversion Suite',
    description: 'Turn traffic into revenue. Use dynamic offers and personalized funnels to capture the 98% of visitors who usually leave without buying.',
    revenueImpact: 'Directly uplifts average order value and conversion rates.'
  },
  {
    id: 'crm_autopilot',
    title: 'Customer Retention System',
    description: 'Maximize lifetime value (LTV). Automatically nurture existing clients and predict churn before it happens.',
    revenueImpact: 'Recovers ~20% of lost revenue automatically.'
  },
  {
    id: 'whatsapp_assistant',
    title: 'Smart Concierge Agent',
    description: 'Instant gratification for your customers. Human-like responses across chat channels to book meetings and close deals instantly.',
    revenueImpact: 'Doubles speed-to-lead and booking rates instantly.'
  },
];
