
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getIndustryPack } from "../_shared/industryPacks.ts";
import { ExtractorRequestSchema } from "../_shared/validation.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const json = await req.json();
    
    // Validation
    const validation = ExtractorRequestSchema.safeParse(json);
    if (!validation.success) {
      return new Response(JSON.stringify({ error: "Validation Error", details: validation.error.format() }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const { industry, selectedServices, docInsights } = validation.data;

    const pack = getIndustryPack(industry);
    const ai = createGeminiClient();

    // Define Schema for Structured Output (DiagnosticSection[])
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
                          mapped_system_id: { type: Type.STRING },
                          pain_point_tag: { type: Type.STRING },
                          ai_explanation: { type: Type.STRING },
                          priority_weight: { type: Type.STRING, enum: ['Critical', 'High', 'Medium', 'Low'] }
                        },
                        required: ['label', 'mapped_system_id', 'pain_point_tag', 'priority_weight']
                      }
                    }
                  },
                  required: ['id', 'text', 'ai_hint', 'type', 'options']
                }
              }
            },
            required: ['id', 'title', 'description', 'questions']
          }
        }
      },
      required: ['sections']
    };

    // Construct the prompt with Industry Pack context
    const prompt = `
      You are a Senior Strategy Consultant specializing in the ${industry} industry.
      
      CONTEXT:
      - Industry: ${industry}
      - Tech Stack: ${selectedServices && selectedServices.length > 0 ? selectedServices.join(', ') : 'Standard/None'}
      - Document Insights: ${docInsights || 'None'}
      
      REFERENCE MATERIAL (Industry Pack):
      ${JSON.stringify(pack.diagnostics)}
      
      TASK:
      Generate a diagnostic questionnaire tailored to this specific client.
      
      GUIDELINES:
      1. **Tech Stack Adaptation (HIGHEST PRIORITY):**
         - The user uses: [${selectedServices && selectedServices.length > 0 ? selectedServices.join(', ') : 'Standard Tools'}].
         - You MUST rewrite the reference questions to specifically mention these tools where relevant.
         - Example: If 'WhatsApp' is present, change "How do you handle leads?" to "How do you manage high-volume WhatsApp inquiries?"
         - Example: If 'Shopify' is present, ask about "Shopify cart recovery" or "Shopify data".
      2. **Industry Jargon:** Use high-signal terms.
         - For Tourism: 'Guest Satisfaction', 'Booking Velocity'.
         - For Real Estate: 'Listing Velocity', 'Showings', 'GCI'.
         - For Fashion: 'Drop Cadence', 'AOV', 'Return Rate'.
      3. **System Mapping (CRITICAL):**
         - The 'mapped_system_id' MUST be one of the keys found in the Industry Pack: [${Object.keys(pack.systemNames).join(', ')}].
         - Do not invent new system IDs.
      4. **Prioritization:** Ensure the options cover Revenue, Speed, and Operations.
      
      OUTPUT:
      Return strictly JSON matching the schema.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        thinkingConfig: { thinkingBudget: 2048 } // Allow thinking for context mapping
      }
    });

    const generatedData = JSON.parse(response.text);

    return new Response(JSON.stringify(generatedData), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    console.error("Extractor Function Error:", error);
    
    // Fallback: If AI fails, return the static pack (safe mode)
    try {
        const reqJson = await req.clone().json().catch(() => ({ industry: 'other' })); // Safety clone
        const pack = getIndustryPack(reqJson.industry || 'other');
        return new Response(JSON.stringify({ sections: pack.diagnostics || [] }), { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
    } catch (fallbackError) {
        return new Response(JSON.stringify({ error: error.message, fallbackError: fallbackError.message }), { 
            status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
    }
  }
});
