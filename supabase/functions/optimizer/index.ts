
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getIndustryPack } from "../_shared/industryPacks.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { industry, priorities, painPoints } = await req.json();
    const pack = getIndustryPack(industry);
    const ai = createGeminiClient();

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        recommended_ids: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        custom_impacts: {
          type: Type.OBJECT,
          // Map of SystemID -> String
          properties: {
            lead_gen: { type: Type.STRING },
            content_studio: { type: Type.STRING },
            conversion_booster: { type: Type.STRING },
            crm_autopilot: { type: Type.STRING },
            whatsapp_assistant: { type: Type.STRING },
          }
        }
      },
      required: ["recommended_ids", "custom_impacts"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Pro for ranking logic
      contents: `
        Industry: ${pack.industry}
        Priorities: ${JSON.stringify(priorities)}
        Pain Points: ${JSON.stringify(painPoints)}
        System Formulas: ${JSON.stringify(pack.roiFormulas)}

        Task:
        1. Select top 3 systems from [lead_gen, content_studio, conversion_booster, crm_autopilot, whatsapp_assistant].
        2. Rewrite the ROI impact string using the industry formulas provided.
      `,
      config: {
        thinkingConfig: { thinkingBudget: 1024 }, // Light thinking for ranking
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
