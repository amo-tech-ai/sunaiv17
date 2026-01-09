
import { IndustryPack } from "./interfaces.ts";

export const TOURISM_PACK: IndustryPack = {
  industry: 'tourism',
  systemNames: {
    'lead_gen': 'Direct Booking Pipeline',
    'content_studio': 'Travel Content Studio',
    'conversion_booster': 'Itinerary Conversion Engine',
    'crm_autopilot': 'Review & Referral Flywheel',
    'whatsapp_assistant': '24/7 Guest Concierge'
  },
  roiFormulas: {
    'lead_gen': 'Increases direct bookings, saving 20-30% on OTA commissions.',
    'content_studio': 'Generates viral reels/TikToks to drive organic traffic.',
    'conversion_booster': 'Increases conversion on itinerary pages and upsells add-ons.',
    'crm_autopilot': 'Automates review collection (TripAdvisor/Google) and repeat bookings.',
    'whatsapp_assistant': 'Responds to international inquiries instantly while you sleep.'
  },
  diagnosticTemplates: { 'sales': '', 'marketing': '', 'speed': '', 'priority': '' },
  kpis: ['Direct Booking %', 'Review Count', 'RevPAR', 'Inquiry Response Time'],
  riskFactors: ['OTA Dependency', 'Seasonality', 'Staff Burnout', 'Low Review Volume'],
  diagnostics: [
    {
      id: 'block_a_focus',
      title: 'Primary Focus',
      description: 'What is the biggest priority for your business right now?',
      questions: [{
        id: 'primary_focus',
        text: 'What is the biggest priority for your business right now?',
        ai_hint: 'Identifying the bottleneck allows us to deploy the right automation.',
        type: 'single',
        options: [
          { label: "Increase sales & revenue (Direct Bookings)", mapped_system_id: "lead_gen", pain_point_tag: "Revenue", priority_weight: "Critical" },
          { label: "Save time through automation", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Efficiency", priority_weight: "High" },
          { label: "Improve marketing performance", mapped_system_id: "content_studio", pain_point_tag: "Marketing", priority_weight: "Medium" },
          { label: "Improve inquiry response time", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Speed", priority_weight: "Critical" },
          { label: "Prepare the business to scale", mapped_system_id: "crm_autopilot", pain_point_tag: "Scale", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_b_pain',
      title: 'Industry Pain Points',
      description: 'Where are you losing bookings or money today?',
      questions: [{
        id: 'tourism_pain_points',
        text: 'Where are you losing bookings or money today?',
        ai_hint: 'Direct bookings are the highest margin revenue. Let’s protect them.',
        type: 'multi',
        options: [
          { label: "Losing margins to OTAs (Viator/TripAdvisor)", mapped_system_id: "lead_gen", pain_point_tag: "Commissions", priority_weight: "Critical", ai_explanation: "OTAs are great for exposure but kill profitability. We need to own the customer." },
          { label: "Overwhelmed by manual inquiries", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Admin", priority_weight: "High" },
          { label: "High traffic but low direct booking rate", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "Critical" },
          { label: "Losing international bookings while sleeping", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Speed", priority_weight: "Critical", ai_explanation: "Travelers book when they are awake. 24/7 AI covers the night shift." },
          { label: "Guests ghost after asking for price", mapped_system_id: "conversion_booster", pain_point_tag: "FollowUp", priority_weight: "High" }
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
        ai_hint: 'Operations should be automated so you can focus on the guest experience.',
        type: 'multi',
        options: [
          { label: "Manual lead follow-ups", mapped_system_id: "conversion_booster", pain_point_tag: "FollowUp", priority_weight: "High" },
          { label: "Repetitive customer questions", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "High" },
          { label: "Posting content manually", mapped_system_id: "content_studio", pain_point_tag: "Social", priority_weight: "Medium" },
          { label: "Coordinating guides and schedules", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Logistics", priority_weight: "High" },
          { label: "Chasing guests for reviews", mapped_system_id: "crm_autopilot", pain_point_tag: "Reviews", priority_weight: "Low" }
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