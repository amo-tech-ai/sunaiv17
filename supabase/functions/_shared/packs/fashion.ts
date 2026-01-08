
import { IndustryPack } from "./interfaces.ts";

export const FASHION_PACK: IndustryPack = {
  industry: 'fashion',
  systemNames: {
    'lead_gen': 'VIP Drop Waitlist',
    'content_studio': 'UGC Content Supply Chain',
    'conversion_booster': 'PDP Conversion Optimizer',
    'crm_autopilot': 'Retention & LTV Engine',
    'whatsapp_assistant': 'Fit & Sizing Concierge'
  },
  roiFormulas: {
    'lead_gen': 'Increases drop-day revenue by capturing high-intent traffic.',
    'content_studio': 'Reduces creative production costs by 40%.',
    'conversion_booster': 'Increases Add-to-Cart rate on product pages.',
    'crm_autopilot': 'Increases repeat purchase rate (LTV) and reduces churn.',
    'whatsapp_assistant': 'Reduces returns by answering sizing queries instantly.'
  },
  diagnosticTemplates: { 'sales': '', 'marketing': '', 'speed': '', 'priority': '' },
  kpis: ['Return Rate', 'AOV', 'Repeat Purchase Rate', 'CAC'],
  riskFactors: ['High Returns', 'Creative Fatigue', 'Inventory Deadstock'],
  diagnostics: [
    {
      id: 'north_star',
      title: 'The North Star',
      description: 'Select your absolute priority for the next quarter.',
      questions: [{
        id: 'primary_goal',
        text: 'What is your absolute priority for the next quarter?',
        ai_hint: 'This defines the "Theme" of your roadmap.',
        type: 'single',
        options: [
          { label: "Scale revenue aggressively", mapped_system_id: "conversion_booster", pain_point_tag: "Growth", priority_weight: "Critical" },
          { label: "Protect margins (reduce returns/costs)", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Margins", priority_weight: "Critical" },
          { label: "Launch new collections faster", mapped_system_id: "lead_gen", pain_point_tag: "Speed", priority_weight: "High" },
          { label: "Automate customer operations", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Ops", priority_weight: "High" },
          { label: "Build brand authority", mapped_system_id: "content_studio", pain_point_tag: "Brand", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'revenue_friction',
      title: 'Revenue Friction',
      description: 'Where are you losing money right now?',
      questions: [{
        id: 'revenue_leaks',
        text: 'Where are you losing money right now?',
        ai_hint: 'Pinpointing leaks often yields higher ROI than seeking new traffic.',
        type: 'multi',
        options: [
          { label: "High traffic, but low add-to-cart rate", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "High", ai_explanation: "Traffic without conversion is wasted ad spend. We need to optimize the PDP." },
          { label: "Customers abandon checkout at the last step", mapped_system_id: "crm_autopilot", pain_point_tag: "Abandonment", priority_weight: "High", ai_explanation: "Recovering abandoned carts is the lowest hanging fruit in ecommerce." },
          { label: "Return rates are eating into our profits", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Returns", priority_weight: "Critical", ai_explanation: "Returns in fashion are often a data problem. We need to solve sizing confusion pre-purchase." },
          { label: "Ad costs (CAC) are rising too high", mapped_system_id: "content_studio", pain_point_tag: "CAC", priority_weight: "Medium", ai_explanation: "Combating ad fatigue requires a high-velocity creative testing engine." },
          { label: "VIPs and repeat customers aren't buying enough", mapped_system_id: "crm_autopilot", pain_point_tag: "Retention", priority_weight: "Medium", ai_explanation: "Increasing LTV is the key to sustainable growth." }
        ]
      }]
    },
    {
      id: 'time_blockers',
      title: 'Time Blockers',
      description: 'What creates the most manual work for your team?',
      questions: [{
        id: 'manual_work',
        text: 'What creates the most manual work for your team?',
        ai_hint: 'Operational drag prevents you from working on strategy.',
        type: 'multi',
        options: [
          { label: "Answering 'Where is my order?' & sizing questions", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "High", ai_explanation: "Your support team shouldn't be answering basic sizing queries. Automating this frees up 20+ hours a week." },
          { label: "Creating content for Instagram/TikTok", mapped_system_id: "content_studio", pain_point_tag: "Content", priority_weight: "High", ai_explanation: "Automating asset production allows you to post 3x more often with less effort." },
          { label: "Updating product catalogs & descriptions", mapped_system_id: "content_studio", pain_point_tag: "Admin", priority_weight: "Medium", ai_explanation: "AI can rewrite descriptions for SEO instantly." },
          { label: "Managing inventory & dead stock", mapped_system_id: "conversion_booster", pain_point_tag: "Inventory", priority_weight: "Medium" }
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
