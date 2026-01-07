
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getIndustryPack } from "../_shared/industryPacks.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { industry, priorities } = await req.json();
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
          description: "Map of system ID to a specific, one-sentence ROI projection string.",
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
          description: "A short insight explaining why these specific systems work well together for this user."
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
        - Sales Bottleneck: ${priorities.moneyFocus || 'Unknown'}
        - Marketing Struggle: ${priorities.marketingFocus || 'Unknown'}
        - Speed Bump: ${priorities.responseSpeed || 'Unknown'}

        Available Systems:
        ${JSON.stringify(pack.systemNames)}

        System ROI Formulas (Use these as a base):
        ${JSON.stringify(pack.roiFormulas)}

        Task:
        1. Rank the top 2-3 systems that best solve the user's specific bottlenecks.
        2. Mark these as 'recommended_ids'.
        3. Rewrite the generic ROI formula for EVERY system to be hyper-specific to the user's situation. 
           - E.g. Instead of "Increases leads", say "Captures missed leads from ${priorities.marketingFocus}".
        4. Generate a 'synergy_notes' string explaining the strategy.
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
