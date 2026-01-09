
import { IndustryPack } from "./interfaces.ts";

export const GENERIC_PACK: IndustryPack = {
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
      id: 'block_a_focus',
      title: 'Primary Focus',
      description: 'What is the biggest priority for your business right now?',
      questions: [{
        id: 'primary_focus',
        text: 'What is the biggest priority for your business right now?',
        ai_hint: 'Focusing on the main bottleneck will yield the highest ROI.',
        type: 'single',
        options: [
          { label: "Increase sales & revenue", mapped_system_id: "lead_gen", pain_point_tag: "Growth", priority_weight: "Critical" },
          { label: "Save time through automation", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Efficiency", priority_weight: "High" },
          { label: "Improve marketing performance", mapped_system_id: "content_studio", pain_point_tag: "Marketing", priority_weight: "Medium" },
          { label: "Improve sales follow-up", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "Critical" },
          { label: "Prepare the business to scale", mapped_system_id: "crm_autopilot", pain_point_tag: "Scale", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_b_pain',
      title: 'Industry Pain Points',
      description: 'Where do you feel stuck today?',
      questions: [{
        id: 'generic_pain_points',
        text: 'Where do you feel stuck today?',
        ai_hint: 'Plugging leaks is cheaper than filling the bucket.',
        type: 'multi',
        options: [
          { label: "Visitors/Leads don't convert", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "High" },
          { label: "Customers/Clients drop off", mapped_system_id: "crm_autopilot", pain_point_tag: "Churn", priority_weight: "Critical" },
          { label: "Sales rely too heavily on paid ads", mapped_system_id: "content_studio", pain_point_tag: "Ads", priority_weight: "High" },
          { label: "Past customers don't return", mapped_system_id: "crm_autopilot", pain_point_tag: "Retention", priority_weight: "Medium" },
          { label: "Promotions/Offers aren't working", mapped_system_id: "lead_gen", pain_point_tag: "Offers", priority_weight: "Medium" }
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
        ai_hint: 'Your team should be focused on high-value work, not admin.',
        type: 'multi',
        options: [
          { label: "Manual follow-ups/Data entry", mapped_system_id: "crm_autopilot", pain_point_tag: "Admin", priority_weight: "High" },
          { label: "Repetitive customer questions", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "Medium" },
          { label: "Creating content consistently", mapped_system_id: "content_studio", pain_point_tag: "Content", priority_weight: "High" },
          { label: "Lead qualification/sorting", mapped_system_id: "lead_gen", pain_point_tag: "Qualification", priority_weight: "Medium" },
          { label: "Reporting & performance tracking", mapped_system_id: "conversion_booster", pain_point_tag: "Reporting", priority_weight: "Low" }
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
          { label: "Just researching", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Not Ready", priority_weight: "Low" }
        ]
      }]
    }
  ]
};