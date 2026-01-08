
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
    'crm_autopilot': 'Revives cold leads from 6+ months ago.',
    'whatsapp_assistant': 'Responds to leads in <2 mins (Speed to Lead).'
  },
  diagnosticTemplates: { 'sales': '', 'marketing': '', 'speed': '', 'priority': '' },
  kpis: ['Speed to Lead', 'Tour Conversion', 'GCI', 'Referral Rate'],
  riskFactors: ['Slow Response Time', 'Unqualified Tours', 'Manual Follow-up'],
  diagnostics: [
    {
      id: 'north_star',
      title: 'The North Star',
      description: 'What is your main objective right now?',
      questions: [{
        id: 'primary_goal',
        text: 'What is your main objective right now?',
        ai_hint: 'Focusing on one metric helps us choose the right lever.',
        type: 'single',
        options: [
          { label: "Close more deals (Volume)", mapped_system_id: "lead_gen", pain_point_tag: "Volume", priority_weight: "High" },
          { label: "Increase commission per deal (Value)", mapped_system_id: "conversion_booster", pain_point_tag: "Value", priority_weight: "High" },
          { label: "Save time on admin & scheduling", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Time", priority_weight: "Critical" },
          { label: "Recruit more agents", mapped_system_id: "content_studio", pain_point_tag: "Recruiting", priority_weight: "Medium" },
          { label: "Dominate local market presence", mapped_system_id: "content_studio", pain_point_tag: "Brand", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'revenue_friction',
      title: 'Revenue Friction',
      description: 'Where does the pipeline break?',
      questions: [{
        id: 'revenue_leaks',
        text: 'Where does the pipeline break?',
        ai_hint: 'Identifying leakage points prevents wasted ad spend.',
        type: 'multi',
        options: [
          { label: "We miss leads because we respond too slowly", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Speed", priority_weight: "Critical", ai_explanation: "Speed to lead is the #1 driver of conversion in real estate. 5 minutes of delay can cost the commission." },
          { label: "Too many 'tire kickers' (unqualified leads)", mapped_system_id: "lead_gen", pain_point_tag: "Quality", priority_weight: "High", ai_explanation: "Your agents should only speak to buyers with approved budgets." },
          { label: "Leads ghost us after the first viewing", mapped_system_id: "crm_autopilot", pain_point_tag: "Retention", priority_weight: "High", ai_explanation: "Ghosting usually means they found another option. Automated nurture keeps you top of mind." },
          { label: "Our follow-up process is inconsistent", mapped_system_id: "crm_autopilot", pain_point_tag: "Process", priority_weight: "High" },
          { label: "Past clients forget us (lost referrals)", mapped_system_id: "crm_autopilot", pain_point_tag: "Referrals", priority_weight: "Medium" }
        ]
      }]
    },
    {
      id: 'time_blockers',
      title: 'Time Blockers',
      description: 'Where is your time being wasted?',
      questions: [{
        id: 'manual_work',
        text: 'Where is your time being wasted?',
        ai_hint: 'Agents should be negotiating, not doing admin.',
        type: 'multi',
        options: [
          { label: "Texting back-and-forth to schedule viewings", mapped_system_id: "conversion_booster", pain_point_tag: "Scheduling", priority_weight: "Medium", ai_explanation: "Scheduling friction kills momentum. Let buyers book directly into your calendar." },
          { label: "Answering the same questions about listings", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support", priority_weight: "Medium" },
          { label: "Writing listing descriptions and social posts", mapped_system_id: "content_studio", pain_point_tag: "Marketing", priority_weight: "Medium", ai_explanation: "Agents should be negotiating, not writing copy. Automating listings ensures consistency and SEO performance." },
          { label: "Manually entering data into the CRM", mapped_system_id: "crm_autopilot", pain_point_tag: "Data", priority_weight: "Low" }
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
