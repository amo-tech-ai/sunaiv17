
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
      id: 'block_a_focus',
      title: 'Primary Focus',
      description: 'What is the biggest priority for your business right now?',
      questions: [{
        id: 'primary_focus',
        text: 'What is the biggest priority for your business right now?',
        ai_hint: 'SaaS growth levers are distinct: Acquisition, Retention, or Efficiency.',
        type: 'single',
        options: [
          { label: "Increase sales & revenue", mapped_system_id: "lead_gen", pain_point_tag: "Acquisition", priority_weight: "High" },
          { label: "Save time through automation", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Efficiency", priority_weight: "Medium" },
          { label: "Improve marketing performance", mapped_system_id: "content_studio", pain_point_tag: "Marketing", priority_weight: "Medium" },
          { label: "Reduce churn & improve retention", mapped_system_id: "crm_autopilot", pain_point_tag: "Churn", priority_weight: "Critical", ai_explanation: "Churn is the silent killer in SaaS. Fixing this has the highest long-term ROI." },
          { label: "Prepare the business to scale", mapped_system_id: "conversion_booster", pain_point_tag: "Scale", priority_weight: "High" }
        ]
      }]
    },
    {
      id: 'block_b_pain',
      title: 'Industry Pain Points',
      description: 'What’s slowing growth?',
      questions: [{
        id: 'saas_pain_points',
        text: 'What’s slowing growth?',
        ai_hint: 'Plugging leaks is cheaper than filling the bucket.',
        type: 'multi',
        options: [
          { label: "Website visitors don’t convert", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "High" },
          { label: "Trials don’t turn into paid users", mapped_system_id: "crm_autopilot", pain_point_tag: "Activation", priority_weight: "Critical", ai_explanation: "Activation is key. If they don't see value in the trial, they won't pay." },
          { label: "Sales cycles take too long", mapped_system_id: "lead_gen", pain_point_tag: "Velocity", priority_weight: "Medium" },
          { label: "Users drop off after onboarding", mapped_system_id: "crm_autopilot", pain_point_tag: "Retention", priority_weight: "Critical" },
          { label: "Marketing and sales feel disconnected", mapped_system_id: "content_studio", pain_point_tag: "Alignment", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_c_time',
      title: 'Time & Automation Blockers',
      description: 'What is consuming time your team shouldn’t be spending?',
      questions: [{
        id: 'time_blockers',
        text: 'What is consuming time your team shouldn’t be spending?',
        ai_hint: 'Your team should be building and selling, not doing admin.',
        type: 'multi',
        options: [
          { label: "Manual lead follow-ups", mapped_system_id: "lead_gen", pain_point_tag: "FollowUp", priority_weight: "High" },
          { label: "Repetitive customer support tickets", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "Medium" },
          { label: "Creating sales assets manually", mapped_system_id: "content_studio", pain_point_tag: "Content", priority_weight: "Medium" },
          { label: "Tracking performance across tools", mapped_system_id: "conversion_booster", pain_point_tag: "Reporting", priority_weight: "Low" },
          { label: "Scheduling demos and meetings", mapped_system_id: "conversion_booster", pain_point_tag: "Scheduling", priority_weight: "Low" }
        ]
      }]
    },
    {
      id: 'block_d_readiness',
      title: 'Confidence & Readiness',
      description: 'How comfortable are you with automating parts of your business?',
      questions: [{
        id: 'readiness_check',
        text: 'How comfortable are you with automating parts of your business?',
        ai_hint: 'This helps us calibrate the pace of the roadmap.',
        type: 'single',
        options: [
          { label: "Ready to automate now", mapped_system_id: "lead_gen", pain_point_tag: "Ready", priority_weight: "Critical" },
          { label: "Interested but need guidance", mapped_system_id: "crm_autopilot", pain_point_tag: "Guidance", priority_weight: "Medium" },
          { label: "Exploring options", mapped_system_id: "content_studio", pain_point_tag: "Exploring", priority_weight: "Low" },
          { label: "Just researching", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Researching", priority_weight: "Low" }
        ]
      }]
    }
  ]
};