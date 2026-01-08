
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
      id: 'block_a_constraint',
      title: 'Primary Growth Constraint',
      description: 'What is the biggest thing holding your business back right now?',
      questions: [{
        id: 'generic_primary_constraint',
        text: 'What is the biggest thing holding your business back right now?',
        ai_hint: 'Focusing on the main bottleneck will yield the highest ROI.',
        type: 'single',
        options: [
          { label: "Revenue Growth is stalling", mapped_system_id: "lead_gen", pain_point_tag: "Growth", priority_weight: "Critical" },
          { label: "Sales conversion is too low", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "Critical" },
          { label: "Operations are too manual/slow", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Ops", priority_weight: "High" },
          { label: "Marketing performance is inconsistent", mapped_system_id: "content_studio", pain_point_tag: "Marketing", priority_weight: "Medium" },
          { label: "Hard to scale without hiring", mapped_system_id: "crm_autopilot", pain_point_tag: "Scale", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_b_revenue',
      title: 'Revenue & Sales Friction',
      description: 'Where are you losing money or sales today?',
      questions: [{
        id: 'generic_revenue_friction',
        text: 'Where are you losing money or sales today?',
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
      title: 'Time & Automation Drain',
      description: 'What is consuming your team’s time?',
      questions: [{
        id: 'generic_time_drain',
        text: 'What is consuming your team’s time?',
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
      id: 'block_d_marketing',
      title: 'Marketing Bottlenecks',
      description: 'What’s hardest about growing consistently?',
      questions: [{
        id: 'generic_marketing_bottleneck',
        text: 'What’s hardest about growing consistently?',
        ai_hint: 'Consistent growth requires a predictable engine.',
        type: 'multi',
        options: [
          { label: "Generating enough leads/traffic", mapped_system_id: "lead_gen", pain_point_tag: "Traffic", priority_weight: "High" },
          { label: "Turning attention into revenue", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "High" },
          { label: "Maintaining brand consistency", mapped_system_id: "content_studio", pain_point_tag: "Brand", priority_weight: "Medium" },
          { label: "Scaling campaigns", mapped_system_id: "lead_gen", pain_point_tag: "Scaling", priority_weight: "Medium" },
          { label: "Measuring what works", mapped_system_id: "crm_autopilot", pain_point_tag: "ROI", priority_weight: "Low" }
        ]
      }]
    },
    {
      id: 'block_e_readiness',
      title: 'Scale Readiness',
      description: 'How ready are you to automate and scale?',
      questions: [{
        id: 'generic_scale_readiness',
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
