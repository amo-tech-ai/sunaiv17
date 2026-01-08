
import { IndustryPack } from "./interfaces.ts";

export const SAAS_PACK: IndustryPack = {
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
