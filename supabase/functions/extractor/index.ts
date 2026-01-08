
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getIndustryPack } from "../_shared/industryPacks.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { industry, selectedServices, docInsights } = await req.json();
    const pack = getIndustryPack(industry);
    const ai = createGeminiClient();

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        sections: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    text: { type: Type.STRING },
                    ai_hint: { type: Type.STRING },
                    type: { type: Type.STRING, enum: ['single', 'multi'] },
                    options: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          label: { type: Type.STRING },
                          mapped_system_id: { 
                            type: Type.STRING,
                            // Must match industryPacks.ts system keys
                            enum: ['lead_gen', 'content_studio', 'conversion_booster', 'crm_autopilot', 'whatsapp_assistant']
                          },
                          pain_point_tag: { type: Type.STRING }
                        },
                        required: ["label", "mapped_system_id", "pain_point_tag"]
                      }
                    }
                  },
                  required: ["id", "text", "ai_hint", "type", "options"]
                }
              }
            },
            required: ["id", "title", "description", "questions"]
          }
        }
      },
      required: ["sections"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `
        You are a Senior Industry Consultant for the ${pack.industry} industry.
        
        Context:
        - Tech Stack: ${selectedServices?.join(', ') || 'None'}
        - Document Insights: ${docInsights || 'No documents provided'}
        - Industry Definitions (System Names/KPIs): ${JSON.stringify(pack)}

        Task:
        Generate a dynamic diagnostic form with 3 distinct sections:
        1. 'revenue' (Focus on Growth, Sales, Marketing)
        2. 'operations' (Focus on Efficiency, Speed, Admin)
        3. 'readiness' (Focus on Implementation Timeline & Strategy)

        Logic Constraints:
        1. **Context-Aware:** If 'docInsights' mentions a specific pain (e.g. "inventory chaos"), generate a question addressing it in 'operations'.
        2. **Tech-Aware:** If 'selectedServices' includes a tool (e.g. "WhatsApp"), ask about optimizing it (e.g. "How fast do you reply on WhatsApp?").
        3. **Readiness Check:** The 'readiness' section must ask about their timeline (e.g. "When are you looking to launch?").
        4. **System Mapping:** EVERY option must map to a valid 'mapped_system_id' from our catalog: [lead_gen, content_studio, conversion_booster, crm_autopilot, whatsapp_assistant].
           - Examples:
             - "I want more leads" -> 'lead_gen'
             - "I want to automate posts" -> 'content_studio'
             - "I want instant replies" -> 'whatsapp_assistant'
             - "I want to increase LTV" -> 'crm_autopilot'
             - "I want to improve conversion" -> 'conversion_booster'
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
    console.error("Extractor Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
