
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
    const { industry, selectedServices, docInsights, analysis } = validation.data;

    // 1. Load Industry Pack (Single Source of Truth)
    const pack = getIndustryPack(industry);
    const validSystemIds = Object.keys(pack.systemNames);
    const defaultSystemId = validSystemIds[0] || 'conversion_booster';

    const ai = createGeminiClient();
    
    // Build context string from Step 1 Analysis
    let analysisContext = "Maturity Level: Unknown";
    if (analysis) {
        analysisContext = `
        Business Model: ${analysis.business_model || "Unknown"}
        Digital Maturity Score: ${analysis.maturity_score || 1}/5
        Key Observations:
          - Revenue Mechanic: ${analysis.observations?.revenue_mechanic || "N/A"}
          - Time Drains: ${analysis.observations?.likely_time_waste || "N/A"}
          - Scaling Risk: ${analysis.observations?.scalability_risk || "N/A"}
        `;
    }

    // Define Strict Schema for 4-Block Structure
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
                        required: ['label', 'mapped_system_id', 'pain_point_tag', 'priority_weight', 'ai_explanation']
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

    // Construct Prompt: SELECT & RANK (Do not invent)
    const prompt = `
      You are a Senior Consultant specializing in the ${industry} industry.
      
      CONTEXT (Step 1 Findings):
      - Industry: ${industry}
      - Tech Stack: ${selectedServices && selectedServices.length > 0 ? selectedServices.join(', ') : 'Standard'}
      - Document Insights: ${docInsights || 'None'}
      ${analysisContext}
      
      SOURCE MATERIAL (Industry Pack):
      ${JSON.stringify(pack.diagnostics)}
      
      TASK:
      1. Load the 4 standard diagnostic sections from the Source Material.
      2. For each section, select the MOST RELEVANT options based on the User Context.
         - **Maturity Filter:** If Maturity is Low (1-2), prioritize "Foundational" pain points. If High (4-5), prioritize "Optimization".
         - **Tech Stack Filter:** If they use specific tools (e.g. WhatsApp), include relevant options from the pack.
         - **Limit:** Select a MAXIMUM of 5 options per question block. Do not overwhelm the user.
      
      CONSTRAINTS:
      - **DO NOT INVENT QUESTIONS.** Use the IDs and Texts provided in the pack.
      - **DO NOT INVENT OPTIONS.** Select strictly from the pack.
      - **STRICT MAPPING:** 'mapped_system_id' MUST be one of: [${validSystemIds.join(', ')}].
      - **EXPLANATIONS:** 'ai_explanation' must explain WHY this matters to their specific business context.
      
      OUTPUT:
      Strict JSON matching the schema.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        thinkingConfig: { thinkingBudget: 2048 }
      }
    });

    const generatedData = JSON.parse(response.text);

    // Validation Pass: Enforce System ID Integrity
    if (generatedData.sections) {
        generatedData.sections.forEach((section: any) => {
            section.questions.forEach((question: any) => {
                // Filter out invalid options first
                question.options = question.options.filter((opt: any) => {
                    if (!validSystemIds.includes(opt.mapped_system_id)) {
                        console.warn(`[Validator] Removing invalid System ID: ${opt.mapped_system_id}`);
                        // Optional: Could attempt to remap to defaultSystemId instead of removing
                        // opt.mapped_system_id = defaultSystemId;
                        return false; 
                    }
                    return true;
                });

                // If filtering emptied the options, fallback to pack defaults for this section
                if (question.options.length === 0) {
                     console.warn(`[Validator] Question ${question.id} empty after validation. Applying fallback.`);
                     const genericSection = pack.diagnostics.find(s => s.id === section.id);
                     if (genericSection && genericSection.questions[0]) {
                         question.options = genericSection.questions[0].options.slice(0, 5); // Fallback limit
                     } else {
                         // Emergency fallback
                         question.options = [{
                             label: "Improve Efficiency",
                             mapped_system_id: defaultSystemId,
                             pain_point_tag: "Efficiency",
                             priority_weight: "High",
                             ai_explanation: "General operational improvement."
                         }];
                     }
                }
            });
        });
    }

    return new Response(JSON.stringify(generatedData), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    console.error("Extractor Function Error:", error);
    
    // Fallback: Return the raw pack diagnostics (Safe Mode)
    try {
        const reqJson = await req.clone().json().catch(() => ({ industry: 'other' }));
        const pack = getIndustryPack(reqJson.industry || 'other');
        return new Response(JSON.stringify({ sections: pack.diagnostics || [] }), { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
    } catch (fallbackError) {
        return new Response(JSON.stringify({ error: error.message }), { 
            status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
    }
  }
});
