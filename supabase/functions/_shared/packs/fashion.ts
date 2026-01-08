
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
      id: 'block_a_constraint',
      title: 'Primary Growth Constraint',
      description: 'What is the biggest thing holding your business back right now?',
      questions: [{
        id: 'fashion_primary_constraint',
        text: 'What is the biggest thing holding your business back right now?',
        ai_hint: 'Identifying the root cause allows us to prioritize the right system architecture.',
        type: 'single',
        options: [
          { label: "Revenue Growth is stalling", mapped_system_id: "conversion_booster", pain_point_tag: "Growth", priority_weight: "Critical", ai_explanation: "When growth stalls, we need to look at conversion efficiency first." },
          { label: "High Return Rates are killing margins", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Margins", priority_weight: "Critical", ai_explanation: "Returns are the silent killer in fashion. Reducing them directly boosts net profit." },
          { label: "Operations are too manual/slow", mapped_system_id: "crm_autopilot", pain_point_tag: "Ops", priority_weight: "High", ai_explanation: "Operational drag prevents you from focusing on strategy and creative." },
          { label: "Marketing costs (CAC) are too high", mapped_system_id: "content_studio", pain_point_tag: "CAC", priority_weight: "High", ai_explanation: "High CAC usually means creative fatigue. You need more assets, faster." },
          { label: "Hard to scale without hiring", mapped_system_id: "lead_gen", pain_point_tag: "Scale", priority_weight: "Medium", ai_explanation: "Automation is the only way to scale output without scaling headcount linearly." }
        ]
      }]
    },
    {
      id: 'block_b_revenue',
      title: 'Revenue & Sales Friction',
      description: 'Where are you losing money or sales today?',
      questions: [{
        id: 'fashion_revenue_friction',
        text: 'Where are you losing money or sales today?',
        ai_hint: 'Plug the leaks in your bucket before pouring in more water (traffic).',
        type: 'multi',
        options: [
          { label: "Visitors browse but don't buy", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "High", ai_explanation: "Low conversion often indicates friction in the buying journey or lack of trust signals." },
          { label: "Customers abandon carts at checkout", mapped_system_id: "crm_autopilot", pain_point_tag: "Abandonment", priority_weight: "High", ai_explanation: "Recovering abandoned carts is the lowest hanging fruit for immediate revenue." },
          { label: "Sales rely too heavily on paid ads", mapped_system_id: "content_studio", pain_point_tag: "Dependency", priority_weight: "Critical", ai_explanation: "Paid dependency is risky. We need to build organic/owned channels." },
          { label: "Past customers don't return to buy again", mapped_system_id: "crm_autopilot", pain_point_tag: "Retention", priority_weight: "High", ai_explanation: "Increasing LTV is easier than acquiring new customers. Retention is key." },
          { label: "Promotions work once, then stop", mapped_system_id: "lead_gen", pain_point_tag: "Fatigue", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_c_time',
      title: 'Time & Automation Drain',
      description: 'What is consuming your team’s time?',
      questions: [{
        id: 'fashion_time_drain',
        text: 'What is consuming your team’s time?',
        ai_hint: 'Your team should be focused on high-value creative work, not admin.',
        type: 'multi',
        options: [
          { label: "Answering repetitive sizing/shipping questions", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "High", ai_explanation: "Support automation can free up 20+ hours a week immediately." },
          { label: "Manually updating product catalogs", mapped_system_id: "content_studio", pain_point_tag: "Admin", priority_weight: "Medium" },
          { label: "Creating content consistently for social", mapped_system_id: "content_studio", pain_point_tag: "Content", priority_weight: "Critical", ai_explanation: "Feeding the content beast is exhausting. AI can automate asset production." },
          { label: "Handling returns and exchanges manually", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Returns", priority_weight: "High" },
          { label: "Reporting & performance tracking", mapped_system_id: "crm_autopilot", pain_point_tag: "Reporting", priority_weight: "Low" }
        ]
      }]
    },
    {
      id: 'block_d_marketing',
      title: 'Marketing Bottlenecks',
      description: 'What’s hardest about growing consistently?',
      questions: [{
        id: 'fashion_marketing_bottleneck',
        text: 'What’s hardest about growing consistently?',
        ai_hint: 'Sustainable growth requires a predictable marketing engine.',
        type: 'multi',
        options: [
          { label: "Generating enough qualified traffic", mapped_system_id: "lead_gen", pain_point_tag: "Traffic", priority_weight: "High", ai_explanation: "Traffic is fuel. We need a reliable way to bring new eyes to the brand." },
          { label: "Turning attention into revenue", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "High" },
          { label: "Maintaining brand consistency at scale", mapped_system_id: "content_studio", pain_point_tag: "Brand", priority_weight: "Medium" },
          { label: "Scaling campaigns without losing ROI", mapped_system_id: "lead_gen", pain_point_tag: "Scaling", priority_weight: "Critical" },
          { label: "Measuring what actually works", mapped_system_id: "crm_autopilot", pain_point_tag: "Attribution", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_e_readiness',
      title: 'Scale Readiness',
      description: 'How ready are you to automate and scale?',
      questions: [{
        id: 'fashion_scale_readiness',
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
