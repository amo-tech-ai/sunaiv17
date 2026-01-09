
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
      id: 'block_a_focus',
      title: 'Primary Focus',
      description: 'What is the biggest priority for your business right now?',
      questions: [{
        id: 'primary_focus',
        text: 'What is the biggest priority for your business right now?',
        ai_hint: 'This choice becomes the main lens for our recommendations.',
        type: 'single',
        options: [
          { label: "Increase sales & revenue", mapped_system_id: "conversion_booster", pain_point_tag: "Revenue", priority_weight: "Critical" },
          { label: "Save time through automation", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Efficiency", priority_weight: "High" },
          { label: "Improve marketing performance", mapped_system_id: "content_studio", pain_point_tag: "Marketing", priority_weight: "High" },
          { label: "Reduce return rates", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Returns", priority_weight: "Critical", ai_explanation: "Returns are the silent killer in fashion. Reducing them boosts net profit immediately." },
          { label: "Prepare the business to scale", mapped_system_id: "crm_autopilot", pain_point_tag: "Scale", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_b_pain',
      title: 'Industry Pain Points',
      description: 'Where do you feel stuck today?',
      questions: [{
        id: 'fashion_pain_points',
        text: 'Where do you feel stuck today?',
        ai_hint: 'Plug the leaks in your bucket before pouring in more traffic.',
        type: 'multi',
        options: [
          { label: "Visitors browse but don't buy", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "Critical", ai_explanation: "Low conversion indicates friction. We need to optimize the PDP journey." },
          { label: "Content creation takes too much time", mapped_system_id: "content_studio", pain_point_tag: "Content", priority_weight: "High", ai_explanation: "Feeding the social algorithm is exhausting. Automating assets saves days." },
          { label: "Customers ask sizing questions repeatedly", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "High" },
          { label: "Sales depend too much on paid ads", mapped_system_id: "lead_gen", pain_point_tag: "Ads", priority_weight: "Critical" },
          { label: "Past customers don't return", mapped_system_id: "crm_autopilot", pain_point_tag: "Retention", priority_weight: "High" }
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
        ai_hint: 'Your team should be focused on creative work, not admin.',
        type: 'multi',
        options: [
          { label: "Manual lead follow-ups", mapped_system_id: "crm_autopilot", pain_point_tag: "FollowUp", priority_weight: "High" },
          { label: "Repetitive customer questions", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "Medium" },
          { label: "Posting content manually", mapped_system_id: "content_studio", pain_point_tag: "Social", priority_weight: "Medium" },
          { label: "Tracking performance across tools", mapped_system_id: "conversion_booster", pain_point_tag: "Analytics", priority_weight: "Low" },
          { label: "Scheduling and coordination", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Admin", priority_weight: "Low" }
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