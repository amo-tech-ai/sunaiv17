
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

export const TOURISM_PACK: IndustryPack = {
  ...GENERIC_PACK,
  industry: 'tourism',
  diagnostics: GENERIC_PACK.diagnostics // Use generic for now, can be updated later if copy provided
};
