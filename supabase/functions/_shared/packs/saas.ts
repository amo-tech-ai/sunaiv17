
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
      id: 'block_a_constraint',
      title: 'Primary Growth Constraint',
      description: 'What is the biggest thing holding your business back right now?',
      questions: [{
        id: 'saas_primary_constraint',
        text: 'What is the biggest thing holding your business back right now?',
        ai_hint: 'SaaS growth levers are distinct: Acquisition, Retention, or Efficiency.',
        type: 'single',
        options: [
          { label: "Acquiring new customers (Logos)", mapped_system_id: "lead_gen", pain_point_tag: "Acquisition", priority_weight: "High", ai_explanation: "Acquisition problems usually point to top-of-funnel or qualification issues." },
          { label: "Retaining existing customers (Churn)", mapped_system_id: "crm_autopilot", pain_point_tag: "Churn", priority_weight: "Critical", ai_explanation: "Churn is the silent killer in SaaS. Fixing this has the highest long-term ROI." },
          { label: "Converting trials to paid users", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "Critical", ai_explanation: "Activation is key. If they don't see value in the trial, they won't pay." },
          { label: "Sales team efficiency & manual work", mapped_system_id: "content_studio", pain_point_tag: "Efficiency", priority_weight: "Medium" },
          { label: "Scaling support without hiring", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_b_revenue',
      title: 'Revenue & Sales Friction',
      description: 'Where are you losing money or sales today?',
      questions: [{
        id: 'saas_revenue_friction',
        text: 'Where are you losing money or sales today?',
        ai_hint: 'Plugging leaks is cheaper than filling the bucket.',
        type: 'multi',
        options: [
          { label: "Demo requests ghost/don't show up", mapped_system_id: "lead_gen", pain_point_tag: "NoShows", priority_weight: "High", ai_explanation: "No-shows waste expensive rep time. Automated reminders can reduce this by 40%." },
          { label: "Free trial users don't active/convert", mapped_system_id: "conversion_booster", pain_point_tag: "Activation", priority_weight: "Critical", ai_explanation: "Users need guidance. In-app nudges or automated outreach can drive activation." },
          { label: "High churn in the first 90 days", mapped_system_id: "crm_autopilot", pain_point_tag: "Onboarding", priority_weight: "Critical" },
          { label: "Missing upsell/expansion opportunities", mapped_system_id: "crm_autopilot", pain_point_tag: "Expansion", priority_weight: "Medium" },
          { label: "Long sales cycles", mapped_system_id: "content_studio", pain_point_tag: "Velocity", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_c_time',
      title: 'Time & Automation Drain',
      description: 'What is consuming your team’s time?',
      questions: [{
        id: 'saas_time_drain',
        text: 'What is consuming your team’s time?',
        ai_hint: 'Your team should be building and selling, not doing admin.',
        type: 'multi',
        options: [
          { label: "Manually qualifying inbound leads", mapped_system_id: "lead_gen", pain_point_tag: "Qualification", priority_weight: "High", ai_explanation: "Let AI score and route leads so sales only talks to closable deals." },
          { label: "Answering repetitive support tickets", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "Medium", ai_explanation: "Deflect Tier-1 tickets with an intelligent KB bot." },
          { label: "Creating sales assets & personalized outreach", mapped_system_id: "content_studio", pain_point_tag: "Outreach", priority_weight: "Medium" },
          { label: "Manual onboarding/training sessions", mapped_system_id: "conversion_booster", pain_point_tag: "Onboarding", priority_weight: "Medium" },
          { label: "Chasing payments/renewals", mapped_system_id: "crm_autopilot", pain_point_tag: "Finance", priority_weight: "Low" }
        ]
      }]
    },
    {
      id: 'block_d_marketing',
      title: 'Marketing Bottlenecks',
      description: 'What’s hardest about growing consistently?',
      questions: [{
        id: 'saas_marketing_bottleneck',
        text: 'What’s hardest about growing consistently?',
        ai_hint: 'Predictable growth needs a predictable engine.',
        type: 'multi',
        options: [
          { label: "Generating qualified leads (MQLs)", mapped_system_id: "lead_gen", pain_point_tag: "MQLs", priority_weight: "High" },
          { label: "Creating thought leadership content", mapped_system_id: "content_studio", pain_point_tag: "Content", priority_weight: "Medium" },
          { label: "Nurturing cold leads", mapped_system_id: "crm_autopilot", pain_point_tag: "Nurture", priority_weight: "High" },
          { label: "Differentiating from competitors", mapped_system_id: "content_studio", pain_point_tag: "Positioning", priority_weight: "Medium" },
          { label: "Attributing marketing ROI", mapped_system_id: "conversion_booster", pain_point_tag: "Attribution", priority_weight: "Low" }
        ]
      }]
    },
    {
      id: 'block_e_readiness',
      title: 'Scale Readiness',
      description: 'How ready are you to automate and scale?',
      questions: [{
        id: 'saas_scale_readiness',
        text: 'How ready are you to automate and scale?',
        ai_hint: 'This helps us calibrate the pace of the roadmap.',
        type: 'single',
        options: [
          { label: "Ready to implement now", mapped_system_id: "lead_gen", pain_point_tag: "Ready", priority_weight: "Critical" },
          { label: "Interested but need guidance", mapped_system_id: "crm_autopilot", pain_point_tag: "Guidance", priority_weight: "Medium" },
          { label: "Exploring options", mapped_system_id: "content_studio", pain_point_tag: "Exploring", priority_weight: "Low" },
          { label: "Not ready yet", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Not Ready", priority_weight: "Low" }
        ]
      }]
    }
  ]
};
