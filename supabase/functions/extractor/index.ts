
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getIndustryPack } from "../_shared/industryPacks.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { industry, selectedServices, docInsights } = await req.json();
    const pack = getIndustryPack(industry);
    const ai = createGeminiClient();

    // Strict Schema Enforcement
    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        questions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              category: { type: Type.STRING, enum: ['sales', 'marketing', 'speed', 'priority'] },
              title: { type: Type.STRING },
              context_reasoning: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    label: { type: Type.STRING },
                    mapped_system_id: { 
                      type: Type.STRING,
                      enum: ['lead_gen', 'content_studio', 'conversion_booster', 'crm_autopilot', 'whatsapp_assistant']
                    },
                    pain_point_tag: { type: Type.STRING }
                  },
                  required: ["id", "label", "mapped_system_id", "pain_point_tag"]
                }
              }
            },
            required: ["id", "category", "title", "context_reasoning", "options"]
          }
        }
      },
      required: ["questions"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Using Pro for deep context mapping
      contents: `
        You are a Senior Consultant for the ${pack.industry} industry.
        
        Context:
        - Services: ${selectedServices?.join(', ') || 'None'}
        - Docs: ${docInsights || 'None'}
        - Pack Definitions: ${JSON.stringify(pack)}

        Task:
        Generate exactly 4 diagnostic questions (Sales, Marketing, Speed, Priority).
        
        Constraints:
        1. Use the 'diagnosticTemplates' from the pack as a base but customize for the user's services.
        2. Ensure every option maps to a valid system ID from: [lead_gen, content_studio, conversion_booster, crm_autopilot, whatsapp_assistant].
        3. If they use a service (e.g. WhatsApp), ask how they optimize it.
      `,
      config: {
        thinkingConfig: { thinkingBudget: 2048 },
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
