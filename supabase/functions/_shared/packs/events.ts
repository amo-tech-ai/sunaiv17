
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
      id: 'block_a_constraint',
      title: 'Primary Growth Constraint',
      description: 'What is the biggest thing holding your business back right now?',
      questions: [{
        id: 'events_primary_constraint',
        text: 'What is the biggest thing holding your business back right now?',
        ai_hint: 'Events are time-bound. Identifying the critical path is key.',
        type: 'single',
        options: [
          { label: "Ticket sales spike too late (Cash flow stress)", mapped_system_id: "conversion_booster", pain_point_tag: "Sales", priority_weight: "Critical", ai_explanation: "Unpredictable ticket velocity creates operational risk. Optimization brings stability." },
          { label: "Sponsorship pipeline is manual and slow", mapped_system_id: "lead_gen", pain_point_tag: "Revenue", priority_weight: "High", ai_explanation: "Sponsorships are high-margin. Automating outreach can fill the pipeline faster." },
          { label: "Vendor/Speaker coordination is chaotic", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Ops", priority_weight: "High", ai_explanation: "Last-minute chaos is a symptom of poor systems. AI can handle logistics at scale." },
          { label: "Creating content for the whole lifecycle is exhausting", mapped_system_id: "content_studio", pain_point_tag: "Marketing", priority_weight: "Medium" },
          { label: "Low attendee engagement/retention year-over-year", mapped_system_id: "crm_autopilot", pain_point_tag: "Engagement", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_b_revenue',
      title: 'Revenue & Sales Friction',
      description: 'Where are you losing money or sales today?',
      questions: [{
        id: 'events_revenue_friction',
        text: 'Where are you losing money or sales today?',
        ai_hint: 'Plugging leaks in the funnel maximizes event profitability.',
        type: 'multi',
        options: [
          { label: "High page views but low ticket checkout rate", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "Critical", ai_explanation: "If traffic isn't converting, we need to fix the funnel flow." },
          { label: "Missed sponsorship opportunities due to lack of follow-up", mapped_system_id: "lead_gen", pain_point_tag: "Sponsors", priority_weight: "High", ai_explanation: "Manual outreach limits your reach. Automation ensures no partner slips through." },
          { label: "Leaving money on the table (VIP upgrades, Merch)", mapped_system_id: "crm_autopilot", pain_point_tag: "Upsell", priority_weight: "Medium" },
          { label: "Struggle to resell to past attendees", mapped_system_id: "crm_autopilot", pain_point_tag: "Retention", priority_weight: "High", ai_explanation: "It's cheaper to retain an attendee than find a new one." },
          { label: "Early bird pricing didn't drive enough volume", mapped_system_id: "conversion_booster", pain_point_tag: "Pricing", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_c_time',
      title: 'Time & Automation Drain',
      description: 'What is consuming your team’s time?',
      questions: [{
        id: 'events_time_drain',
        text: 'What is consuming your team’s time?',
        ai_hint: 'Event teams burn out on logistics. Automate the repetitive tasks.',
        type: 'multi',
        options: [
          { label: "Answering repetitive attendee FAQs (Parking, Schedule)", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "High", ai_explanation: "Your team shouldn't answer 'where do I park?' 500 times. An event bot handles this instantly." },
          { label: "Coordinating load-in/load-out with vendors", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Logistics", priority_weight: "Medium", ai_explanation: "Centralizing vendor comms prevents day-of chaos." },
          { label: "Creating promotional content/reels", mapped_system_id: "content_studio", pain_point_tag: "Promo", priority_weight: "High" },
          { label: "Managing check-in lists manually", mapped_system_id: "crm_autopilot", pain_point_tag: "CheckIn", priority_weight: "Low" },
          { label: "Chasing speaker/sponsor assets", mapped_system_id: "lead_gen", pain_point_tag: "Assets", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_d_marketing',
      title: 'Marketing Bottlenecks',
      description: 'What’s hardest about growing consistently?',
      questions: [{
        id: 'events_marketing_bottleneck',
        text: 'What’s hardest about growing consistently?',
        ai_hint: 'Consistent growth requires year-round engagement.',
        type: 'multi',
        options: [
          { label: "Maintaining buzz between events", mapped_system_id: "content_studio", pain_point_tag: "Community", priority_weight: "High" },
          { label: "Reaching new audiences", mapped_system_id: "lead_gen", pain_point_tag: "Reach", priority_weight: "Medium" },
          { label: "Creating enough content to sell out", mapped_system_id: "content_studio", pain_point_tag: "Content", priority_weight: "High" },
          { label: "Tracking marketing ROI", mapped_system_id: "conversion_booster", pain_point_tag: "Attribution", priority_weight: "Medium" },
          { label: "Building a community", mapped_system_id: "crm_autopilot", pain_point_tag: "Community", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_e_readiness',
      title: 'Scale Readiness',
      description: 'How ready are you to automate and scale?',
      questions: [{
        id: 'events_scale_readiness',
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
