
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getIndustryPack } from "../_shared/industryPacks.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { industry, priorities, services } = await req.json();
    const pack = getIndustryPack(industry);
    const ai = createGeminiClient();

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        recommended_ids: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "List of system IDs to recommend (max 3), ranked by relevance."
        },
        custom_impacts: {
          type: Type.OBJECT,
          description: "Map of system ID to a specific, benefit-oriented ROI projection string.",
          properties: {
            lead_gen: { type: Type.STRING },
            content_studio: { type: Type.STRING },
            conversion_booster: { type: Type.STRING },
            crm_autopilot: { type: Type.STRING },
            whatsapp_assistant: { type: Type.STRING },
          }
        },
        synergy_notes: {
          type: Type.STRING,
          description: "A short strategic insight highlighting system dependencies (e.g. why Lead Gen needs CRM) or stack synergies."
        }
      },
      required: ["recommended_ids", "custom_impacts", "synergy_notes"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `
        You are a Solution Architect for the ${pack.industry} industry.
        
        User Context:
        - Primary Goal: ${priorities.mainPriority || 'Growth'}
        - Pain Points: ${priorities.moneyFocus}, ${priorities.marketingFocus}, ${priorities.responseSpeed}
        - Current Tech Stack: ${services ? services.join(', ') : 'None'}

        Available Systems (Generic ID -> Specific Name):
        ${JSON.stringify(pack.systemNames)}

        ROI Formulas (Base):
        ${JSON.stringify(pack.roiFormulas)}

        Task:
        1. **Rank** the top 2-3 systems. 
           - **CRITICAL:** Prioritize systems that natively integrate with their 'Current Tech Stack'.
             (e.g., If 'WhatsApp' is listed, 'whatsapp_assistant' should likely be #1).
             (e.g., If 'Shopify' is listed, 'conversion_booster' is high value).
           - Solve their specific Pain Points.
        2. **Rewrite** the ROI text for EVERY system to be hyper-specific. 
           - **MUST** reference their specific tools in the text where relevant (e.g., "Since you use Shopify, this will...").
           - Focus on the 'Benefit' not the 'Feature'.
           - Use industry jargon (e.g., 'AOV' for Fashion, 'Showings' for Real Estate).
        3. **Analyze Dependencies**:
           - If recommending 'lead_gen' (traffic), check if they need 'crm_autopilot' (retention) to catch the value.
           - Highlight specific stack integrations in 'synergy_notes'.
           - **Upgrade**: If 'whatsapp_assistant' and 'crm_autopilot' are both candidates, explicitly mention "Automatic Lead Sync" in the synergy notes.
      `,
      config: {
        thinkingConfig: { thinkingBudget: 1024 },
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    return new Response(response.text, { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
