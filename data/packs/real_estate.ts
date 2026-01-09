
import { IndustryPack } from "./interfaces";

export const REAL_ESTATE_PACK: IndustryPack = {
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
    'crm_autopilot': 'Auto-syncs WhatsApp leads to CRM & revives cold leads from 6+ months ago.',
    'whatsapp_assistant': 'Responds to leads in <2 mins (Speed to Lead).'
  },
  diagnosticTemplates: { 'sales': '', 'marketing': '', 'speed': '', 'priority': '' },
  kpis: ['Speed to Lead', 'Tour Conversion', 'GCI', 'Referral Rate'],
  riskFactors: ['Slow Response Time', 'Unqualified Tours', 'Manual Follow-up'],
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
          { label: "Increase sales & revenue", mapped_system_id: "lead_gen", pain_point_tag: "Revenue", priority_weight: "Critical" },
          { label: "Save time through automation", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Time", priority_weight: "High" },
          { label: "Improve marketing performance", mapped_system_id: "content_studio", pain_point_tag: "Marketing", priority_weight: "Medium" },
          { label: "Improve sales follow-up & conversion", mapped_system_id: "crm_autopilot", pain_point_tag: "FollowUp", priority_weight: "Critical" },
          { label: "Prepare the business to scale", mapped_system_id: "conversion_booster", pain_point_tag: "Scale", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_b_pain',
      title: 'Industry Pain Points',
      description: 'Where are opportunities being lost?',
      questions: [{
        id: 'real_estate_pain_points',
        text: 'Where are opportunities being lost?',
        ai_hint: 'Speed to lead is everything in real estate.',
        type: 'multi',
        options: [
          { label: "Leads respond too slowly", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Speed", priority_weight: "Critical", ai_explanation: "5 minutes delay can cost the commission. We need instant response." },
          { label: "Follow-ups are manual and inconsistent", mapped_system_id: "crm_autopilot", pain_point_tag: "Consistency", priority_weight: "High" },
          { label: "Low-quality leads waste time", mapped_system_id: "lead_gen", pain_point_tag: "Quality", priority_weight: "High", ai_explanation: "Automated qualification ensures you only meet serious buyers." },
          { label: "Inquiries after hours are missed", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Availability", priority_weight: "Critical" },
          { label: "No clear view of the sales pipeline", mapped_system_id: "conversion_booster", pain_point_tag: "Pipeline", priority_weight: "Medium" }
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
        ai_hint: 'Agents should spend time negotiating, not scheduling.',
        type: 'multi',
        options: [
          { label: "Manual lead follow-ups", mapped_system_id: "crm_autopilot", pain_point_tag: "Nurture", priority_weight: "High" },
          { label: "Repetitive customer questions", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "Medium" },
          { label: "Scheduling and coordination", mapped_system_id: "conversion_booster", pain_point_tag: "Scheduling", priority_weight: "High" },
          { label: "Posting listings manually", mapped_system_id: "content_studio", pain_point_tag: "Listings", priority_weight: "Low" },
          { label: "Tracking performance across tools", mapped_system_id: "crm_autopilot", pain_point_tag: "Admin", priority_weight: "Low" }
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
