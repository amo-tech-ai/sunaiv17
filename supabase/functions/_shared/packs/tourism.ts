
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
      id: 'block_a_constraint',
      title: 'Primary Growth Constraint',
      description: 'What is the biggest thing holding your tour business back right now?',
      questions: [{
        id: 'tourism_primary_constraint',
        text: 'What is the biggest thing holding your business back right now?',
        ai_hint: 'Identifying the bottleneck allows us to deploy the right automation.',
        type: 'single',
        options: [
          { label: "Losing 25-30% margins to OTAs (Viator/GetYourGuide)", mapped_system_id: "lead_gen", pain_point_tag: "Commissions", priority_weight: "Critical", ai_explanation: "OTAs are great for exposure but kill profitability. We need to own the customer." },
          { label: "Overwhelmed by manual WhatsApp/Email inquiries", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Admin", priority_weight: "High", ai_explanation: "You shouldn't be glued to your phone answering 'is this available?' all day." },
          { label: "High website traffic but low direct booking rate", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "Critical", ai_explanation: "If traffic isn't booking directly, your itinerary presentation or checkout flow has friction." },
          { label: "Cash flow dries up during low season", mapped_system_id: "crm_autopilot", pain_point_tag: "Seasonality", priority_weight: "High", ai_explanation: "We need a database strategy to market pre-season offers and gift cards." },
          { label: "Great experience but low review volume (TripAdvisor)", mapped_system_id: "crm_autopilot", pain_point_tag: "Reputation", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_b_revenue',
      title: 'Revenue & Sales Friction',
      description: 'Where are you losing bookings or money today?',
      questions: [{
        id: 'tourism_revenue_friction',
        text: 'Where are you losing bookings or money today?',
        ai_hint: 'Direct bookings are the highest margin revenue. Let’s protect them.',
        type: 'multi',
        options: [
          { label: "Losing international bookings while sleeping (Time Zone Gap)", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Speed", priority_weight: "Critical", ai_explanation: "Travelers book when they are awake. 24/7 AI covers the night shift." },
          { label: "Guests ghost after asking for price/availability", mapped_system_id: "conversion_booster", pain_point_tag: "FollowUp", priority_weight: "High", ai_explanation: "Price shoppers need instant nurturing to convert into bookers." },
          { label: "Missed revenue from add-ons (Private transfers, upgrades)", mapped_system_id: "conversion_booster", pain_point_tag: "Upsells", priority_weight: "Medium", ai_explanation: "Automated upsells are pure profit margin." },
          { label: "CAC is too high on Google/Meta ads", mapped_system_id: "content_studio", pain_point_tag: "CAC", priority_weight: "High" },
          { label: "One-time guests never book again", mapped_system_id: "crm_autopilot", pain_point_tag: "LTV", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_c_time',
      title: 'Time & Automation Drain',
      description: 'What is consuming your team’s time?',
      questions: [{
        id: 'tourism_time_drain',
        text: 'What is consuming your team’s time?',
        ai_hint: 'Operations should be automated so you can focus on the guest experience.',
        type: 'multi',
        options: [
          { label: "Manually sending confirmations & pickup details", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Ops", priority_weight: "High", ai_explanation: "Transactional messages should be 100% automated." },
          { label: "Coordinating guides and schedules", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Logistics", priority_weight: "High" },
          { label: "Creating social content (Reels/TikTok)", mapped_system_id: "content_studio", pain_point_tag: "Content", priority_weight: "Medium", ai_explanation: "Visuals sell travel. AI can edit and post content at scale." },
          { label: "Chasing guests for reviews", mapped_system_id: "crm_autopilot", pain_point_tag: "Reviews", priority_weight: "Low" },
          { label: "Updating pricing across platforms", mapped_system_id: "conversion_booster", pain_point_tag: "Admin", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_d_marketing',
      title: 'Marketing Bottlenecks',
      description: 'What’s hardest about getting new guests?',
      questions: [{
        id: 'tourism_marketing_bottleneck',
        text: 'What’s hardest about getting new guests?',
        ai_hint: 'Dependence on one channel (like Viator) is a risk.',
        type: 'multi',
        options: [
          { label: "Standing out in a crowded market", mapped_system_id: "content_studio", pain_point_tag: "Brand", priority_weight: "High" },
          { label: "Driving direct website traffic", mapped_system_id: "lead_gen", pain_point_tag: "Traffic", priority_weight: "Critical", ai_explanation: "Building your own traffic engine reduces commission dependency." },
          { label: "Getting guests to post/tag us (UGC)", mapped_system_id: "crm_autopilot", pain_point_tag: "UGC", priority_weight: "Medium" },
          { label: "Tracking where bookings come from", mapped_system_id: "conversion_booster", pain_point_tag: "Attribution", priority_weight: "Medium" },
          { label: "Consistent email marketing", mapped_system_id: "crm_autopilot", pain_point_tag: "Nurture", priority_weight: "Low" }
        ]
      }]
    },
    {
      id: 'block_e_readiness',
      title: 'Scale Readiness',
      description: 'How ready are you to automate and scale?',
      questions: [{
        id: 'tourism_scale_readiness',
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
