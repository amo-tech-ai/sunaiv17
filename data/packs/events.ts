
import { IndustryPack } from "./interfaces";

export const EVENTS_PACK: IndustryPack = {
  industry: 'events',
  systemNames: {
    'lead_gen': 'Sponsor Outreach Copilot',
    'content_studio': 'Event Content Supply Chain',
    'conversion_booster': 'Ticket Funnel Optimizer',
    'crm_autopilot': 'Attendee Retention System',
    'whatsapp_assistant': 'Event Ops Concierge'
  },
  roiFormulas: {
    'lead_gen': 'Fills Expo Hall 30% faster than manual outreach.',
    'content_studio': 'Generates all promotional assets for the event lifecycle.',
    'conversion_booster': 'Increases ticket page conversion by optimizing checkout flow.',
    'crm_autopilot': 'Boosts repeat attendance for annual events.',
    'whatsapp_assistant': 'Reduces support tickets by answering FAQ instantly.'
  },
  diagnosticTemplates: { 'sales': '', 'marketing': '', 'speed': '', 'priority': '' },
  kpis: ['Ticket Velocity', 'Sponsor Revenue', 'Attendee NPS', 'Show-up Rate'],
  riskFactors: ['Late Ticket Sales', 'Vendor Chaos', 'Low Engagement'],
  diagnostics: [
    {
      id: 'block_a_focus',
      title: 'Primary Focus',
      description: 'What is the biggest priority for your business right now?',
      questions: [{
        id: 'primary_focus',
        text: 'What is the biggest priority for your business right now?',
        ai_hint: 'Events are time-bound. Identifying the critical path is key.',
        type: 'single',
        options: [
          { label: "Increase sales & revenue (Tickets)", mapped_system_id: "conversion_booster", pain_point_tag: "Sales", priority_weight: "Critical" },
          { label: "Save time through automation", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Efficiency", priority_weight: "High" },
          { label: "Improve marketing performance", mapped_system_id: "content_studio", pain_point_tag: "Marketing", priority_weight: "Medium" },
          { label: "Improve sponsor acquisition", mapped_system_id: "lead_gen", pain_point_tag: "Sponsors", priority_weight: "High" },
          { label: "Prepare the business to scale", mapped_system_id: "crm_autopilot", pain_point_tag: "Scale", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_b_pain',
      title: 'Industry Pain Points',
      description: 'What limits results?',
      questions: [{
        id: 'events_pain_points',
        text: 'What limits results?',
        ai_hint: 'Plugging leaks in the funnel maximizes event profitability.',
        type: 'multi',
        options: [
          { label: "Ticket page converts poorly", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "Critical", ai_explanation: "If traffic isn't converting, we need to fix the funnel flow." },
          { label: "Attendees ask the same questions", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "High" },
          { label: "Promotion is manual and inconsistent", mapped_system_id: "content_studio", pain_point_tag: "Promo", priority_weight: "Medium" },
          { label: "Sponsors don’t see clear value", mapped_system_id: "lead_gen", pain_point_tag: "Sponsors", priority_weight: "High" },
          { label: "Too much coordination work", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Logistics", priority_weight: "High", ai_explanation: "Last-minute chaos is a symptom of poor systems." }
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
        ai_hint: 'Event teams burn out on logistics. Automate the repetitive tasks.',
        type: 'multi',
        options: [
          { label: "Manual lead follow-ups", mapped_system_id: "lead_gen", pain_point_tag: "FollowUp", priority_weight: "High" },
          { label: "Repetitive customer questions", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "High" },
          { label: "Posting content manually", mapped_system_id: "content_studio", pain_point_tag: "Social", priority_weight: "Medium" },
          { label: "Scheduling and coordination", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Ops", priority_weight: "High" },
          { label: "Managing check-in lists manually", mapped_system_id: "crm_autopilot", pain_point_tag: "CheckIn", priority_weight: "Low" }
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
