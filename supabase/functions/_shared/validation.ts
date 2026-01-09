
import { z } from "npm:zod@3.22.4";

// Step 1: Analyst
export const AnalystRequestSchema = z.object({
  mode: z.enum(['research', 'summarize_docs', 'classify']).optional(),
  businessName: z.string().min(2).optional(),
  website: z.string().optional(),
  description: z.string().optional(),
  selectedServices: z.array(z.string()).optional(),
  docInsights: z.string().optional(),
  documents: z.array(z.object({
    name: z.string(),
    mimeType: z.string().optional(),
    base64: z.string().optional(),
    textContent: z.string().optional()
  })).optional()
});

// Step 2: Extractor
export const ExtractorRequestSchema = z.object({
  industry: z.string().min(1),
  selectedServices: z.array(z.string()).optional(),
  docInsights: z.string().optional(),
  wizard_session_id: z.string().optional(),
  analysis: z.object({
    business_model: z.string().nullable().optional(),
    maturity_score: z.number().optional(),
    observations: z.object({
      revenue_mechanic: z.string().nullable().optional(),
      likely_time_waste: z.string().nullable().optional(),
      scalability_risk: z.string().nullable().optional()
    }).optional()
  }).optional()
});

// Step 3: Optimizer
export const OptimizerRequestSchema = z.object({
  industry: z.string().min(1),
  priorities: z.object({
    moneyFocus: z.string().optional(),
    marketingFocus: z.string().optional(),
    responseSpeed: z.string().optional(),
    mainPriority: z.string().optional()
  }),
  services: z.array(z.string()).optional(),
  painPoints: z.array(z.string()).optional()
});

// Step 4: Scorer
export const ScorerRequestSchema = z.object({
  checklist: z.record(z.boolean()),
  industry: z.string().min(1),
  selectedSystems: z.array(z.string())
});

// Step 5: Planner
export const PlannerRequestSchema = z.object({
  wizardState: z.object({
    data: z.object({
      businessName: z.string().optional(),
      industry: z.string(),
      selectedSystems: z.array(z.string()),
    }),
    aiState: z.object({
      readinessAnalysis: z.object({
        risks: z.array(z.string()).optional()
      }).optional()
    }).optional()
  })
});

// Orchestrator (Dashboard Tasks)
export const OrchestratorRequestSchema = z.object({
  phases: z.array(z.any()).optional(),
  industry: z.string().optional(),
  projectId: z.string().optional(),
  roadmap_id: z.string().optional(),
  phase_id: z.string().optional()
});

// Monitor (Timeline Risk)
export const MonitorRequestSchema = z.object({
  timelineData: z.any(), // Flexible for now, can be tightened
  projectContext: z.object({
    industry: z.string().optional(),
    startDate: z.string().optional()
  }).optional()
});

// Analytics (BI)
export const AnalyticsRequestSchema = z.object({
  metrics: z.object({
    revenue: z.array(z.any()).optional(),
    clients: z.array(z.any()).optional(),
    team: z.array(z.any()).optional()
  }).optional(),
  type: z.enum(['revenue', 'client', 'general']).optional()
});

// Assistant (Client Brief / RAG)
export const AssistantRequestSchema = z.object({
  task: z.enum(['analyze_document', 'summarize_brief']).optional(),
  content: z.string().optional(),
  context: z.any().optional()
});

// CRM Intelligence
export const CRMIntelligenceRequestSchema = z.object({
  clientId: z.string().optional(),
  clientDetails: z.object({
    name: z.string().optional(),
    company: z.string().optional(),
    role: z.string().optional(),
    status: z.string().optional()
  }).optional(),
  recentHistory: z.string().nullable().optional()
});
