
import { IndustryPack } from "./interfaces.ts";

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
      id: 'block_a_constraint',
      title: 'Primary Growth Constraint',
      description: 'What is the biggest thing holding your business back right now?',
      questions: [{
        id: 'real_estate_primary_constraint',
        text: 'What is the biggest thing holding your business back right now?',
        ai_hint: 'Focusing on the main bottleneck will yield the highest ROI.',
        type: 'single',
        options: [
          { label: "Not enough leads coming in", mapped_system_id: "lead_gen", pain_point_tag: "Volume", priority_weight: "Critical", ai_explanation: "Pipeline volume is the lifeblood of real estate. We need to open the tap." },
          { label: "Leads aren't converting to deals", mapped_system_id: "conversion_booster", pain_point_tag: "Conversion", priority_weight: "Critical", ai_explanation: "If leads aren't closing, we have a qualification or follow-up issue." },
          { label: "Agents spending too much time on admin", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Ops", priority_weight: "High", ai_explanation: "Agents should be negotiating, not doing paperwork or basic replies." },
          { label: "Marketing performance is inconsistent", mapped_system_id: "content_studio", pain_point_tag: "Marketing", priority_weight: "Medium" },
          { label: "Difficulty scaling the team", mapped_system_id: "crm_autopilot", pain_point_tag: "Scale", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_b_revenue',
      title: 'Revenue & Sales Friction',
      description: 'Where are you losing money or sales today?',
      questions: [{
        id: 'real_estate_revenue_friction',
        text: 'Where are you losing money or sales today?',
        ai_hint: 'Lost deals are often due to speed or follow-up failures.',
        type: 'multi',
        options: [
          { label: "We respond too slowly to new leads", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Speed", priority_weight: "Critical", ai_explanation: "Speed to lead is everything. 5 minutes delay can cost the commission." },
          { label: "Too many unqualified viewings/tours", mapped_system_id: "lead_gen", pain_point_tag: "Quality", priority_weight: "High", ai_explanation: "Tire kickers waste time. Automated qualification ensures you only meet serious buyers." },
          { label: "Past clients forget us (lost referrals)", mapped_system_id: "crm_autopilot", pain_point_tag: "Referrals", priority_weight: "Medium", ai_explanation: "Referrals are free money. Staying top-of-mind should be automated." },
          { label: "Leads ghost after the first interaction", mapped_system_id: "crm_autopilot", pain_point_tag: "FollowUp", priority_weight: "High" },
          { label: "Listings sit on the market too long", mapped_system_id: "content_studio", pain_point_tag: "Listings", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'block_c_time',
      title: 'Time & Automation Drain',
      description: 'What is consuming your team’s time?',
      questions: [{
        id: 'real_estate_time_drain',
        text: 'What is consuming your team’s time?',
        ai_hint: 'Automating these tasks frees up agents to sell.',
        type: 'multi',
        options: [
          { label: "Scheduling and coordinating viewings", mapped_system_id: "conversion_booster", pain_point_tag: "Scheduling", priority_weight: "High", ai_explanation: "Scheduling tag is a massive time sink. Let buyers book directly." },
          { label: "Answering the same listing questions", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "Medium" },
          { label: "Writing listing descriptions/social posts", mapped_system_id: "content_studio", pain_point_tag: "Content", priority_weight: "Medium", ai_explanation: "AI can write SEO-optimized listing copy instantly." },
          { label: "Manually entering data into CRM", mapped_system_id: "crm_autopilot", pain_point_tag: "Data", priority_weight: "Low" },
          { label: "Following up with cold leads", mapped_system_id: "crm_autopilot", pain_point_tag: "Nurture", priority_weight: "High" }
        ]
      }]
    },
    {
      id: 'block_d_marketing',
      title: 'Marketing Bottlenecks',
      description: 'What’s hardest about growing consistently?',
      questions: [{
        id: 'real_estate_marketing_bottleneck',
        text: 'What’s hardest about growing consistently?',
        ai_hint: 'Consistent growth needs consistent marketing.',
        type: 'multi',
        options: [
          { label: "Generating exclusive leads", mapped_system_id: "lead_gen", pain_point_tag: "Leads", priority_weight: "High" },
          { label: "Staying visible on social media", mapped_system_id: "content_studio", pain_point_tag: "Visibility", priority_weight: "Medium" },
          { label: "Differentiating our brand", mapped_system_id: "content_studio", pain_point_tag: "Brand", priority_weight: "Medium" },
          { label: "Tracking ROI on ad spend", mapped_system_id: "conversion_booster", pain_point_tag: "ROI", priority_weight: "High" },
          { label: "Recruiting top performing agents", mapped_system_id: "lead_gen", pain_point_tag: "Recruiting", priority_weight: "Low" }
        ]
      }]
    },
    {
      id: 'block_e_readiness',
      title: 'Scale Readiness',
      description: 'How ready are you to automate and scale?',
      questions: [{
        id: 'real_estate_scale_readiness',
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
