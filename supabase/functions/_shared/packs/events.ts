
import { IndustryPack } from "./interfaces.ts";

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
      id: 'north_star',
      title: 'The North Star',
      description: 'What defines success for your next event?',
      questions: [{
        id: 'primary_goal',
        text: 'What defines success for your next event?',
        ai_hint: 'Focusing on the main goal helps prioritize systems.',
        type: 'single',
        options: [
          { label: "Selling out tickets fast", mapped_system_id: "conversion_booster", pain_point_tag: "Sales", priority_weight: "Critical" },
          { label: "Maximizing sponsor revenue", mapped_system_id: "lead_gen", pain_point_tag: "Revenue", priority_weight: "High" },
          { label: "Flawless attendee experience", mapped_system_id: "whatsapp_assistant", pain_point_tag: "CX", priority_weight: "High" },
          { label: "Reducing operational chaos", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Ops", priority_weight: "Medium" },
          { label: "Building a year-round community", mapped_system_id: "crm_autopilot", pain_point_tag: "Community", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'revenue_friction',
      title: 'Revenue Friction',
      description: 'What is stopping revenue growth?',
      questions: [{
        id: 'revenue_leaks',
        text: 'What is stopping revenue growth?',
        ai_hint: 'Events have a hard deadline; revenue leaks must be plugged early.',
        type: 'multi',
        options: [
          { label: "Traffic hits the page, but doesn't buy tickets", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "Critical", ai_explanation: "If traffic isn't converting, we need to optimize the checkout flow and urgency triggers." },
          { label: "Sponsor outreach is manual and slow", mapped_system_id: "lead_gen", pain_point_tag: "Sponsors", priority_weight: "High", ai_explanation: "Sponsorships are high-value but require high-volume outreach. Automation ensures no partner slips through." },
          { label: "We aren't selling enough VIP upgrades/add-ons", mapped_system_id: "crm_autopilot", pain_point_tag: "Upsell", priority_weight: "Medium" },
          { label: "Last-minute ticket sales are stressful", mapped_system_id: "content_studio", pain_point_tag: "Stress", priority_weight: "Medium" },
          { label: "Post-event engagement drops to zero", mapped_system_id: "crm_autopilot", pain_point_tag: "Retention", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'time_blockers',
      title: 'Time Blockers',
      description: 'What operational tasks are overwhelming?',
      questions: [{
        id: 'manual_work',
        text: 'What operational tasks are overwhelming?',
        ai_hint: 'Event teams burn out on logistics. Automate the chaos.',
        type: 'multi',
        options: [
          { label: "Answering repetitive attendee FAQs (parking, etc.)", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "High", ai_explanation: "Your team shouldn't answer 'where do I park?' 500 times. An event bot handles this instantly." },
          { label: "Coordinating vendors and logistics", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Logistics", priority_weight: "Medium", ai_explanation: "Centralizing vendor comms prevents day-of chaos." },
          { label: "Creating promotional content and reels", mapped_system_id: "content_studio", pain_point_tag: "Promo", priority_weight: "High" },
          { label: "Managing check-in and registration lists", mapped_system_id: "crm_autopilot", pain_point_tag: "Check-in", priority_weight: "Low" }
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
