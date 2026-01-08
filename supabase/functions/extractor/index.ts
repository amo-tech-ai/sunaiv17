
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
                            // Strict Enum mapping to ensure frontend compatibility
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
        You are a Senior Strategy Consultant specializing in the ${pack.industry} industry.
        
        **User Context:**
        - **Tech Stack:** ${selectedServices?.length > 0 ? selectedServices.join(', ') : 'No specific tools selected'}
        - **Business Insights (from Docs):** ${docInsights || 'None provided'}
        - **Industry Systems:** ${JSON.stringify(pack.systemNames)}

        **Goal:**
        Generate a dynamic diagnostic survey to identify their specific growth bottlenecks. 
        The questions must feel bespoke to their stack and industry.

        **Reasoning Requirements (Thinking Mode):**
        1. **Analyze Context:** Look at the 'Tech Stack'. If they use 'WhatsApp', you MUST ask about response time or message volume. If they use 'Shopify', ask about conversion or returns.
        2. **Analyze Docs:** If 'Business Insights' mentions specific pains (e.g. "low engagement"), frame a question around that.
        3. **Map Solutions:** Every answer option must logically lead to recommending one of our AI Systems (mapped_system_id).

        **Output Requirements:**
        Generate 3 Sections:
        1. **Revenue & Growth:** Identify sales bottlenecks.
        2. **Operations & Speed:** Identify time sinks and efficiency gaps.
        3. **Readiness:** Assess their timeline and willingness to automate.

        **Constraint:**
        - Ensure 'mapped_system_id' is ALWAYS one of: ['lead_gen', 'content_studio', 'conversion_booster', 'crm_autopilot', 'whatsapp_assistant'].
        - 'pain_point_tag' should be short (e.g. "High Churn", "Slow Comms").
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
