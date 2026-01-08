
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getIndustryPack } from "../_shared/industryPacks.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { wizardState } = await req.json();
    const pack = getIndustryPack(wizardState.data.industry);
    const ai = createGeminiClient();

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        phases: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              phaseName: { type: Type.STRING },
              duration: { type: Type.STRING },
              items: { type: Type.ARRAY, items: { type: Type.STRING } },
              deliverables: { type: Type.ARRAY, items: { type: Type.STRING } },
              kpis: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["phaseName", "duration", "items", "deliverables", "kpis"]
          }
        }
      },
      required: ["phases"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `
        Create a Strategic Roadmap for a ${pack.industry} company.
        
        Inputs:
        - Systems: ${wizardState.data.selectedSystems.join(', ')}
        - Gaps: ${JSON.stringify(wizardState.aiState.readinessAnalysis.risks)}
        - KPIs: ${JSON.stringify(pack.kpis)}

        Task:
        1. Analyze dependencies: If they have a 'Data Gap' (from readiness), Phase 1 MUST be 'Foundation'.
        2. Sequence the selected systems logically.
        3. Define specific deliverables and KPIs for each phase.
        4. **Integration Rule**: If 'whatsapp_assistant' and 'crm_autopilot' are selected, include a specific task: "Configure WhatsApp-to-CRM Lead Sync".
      `,
      config: {
        thinkingConfig: { thinkingBudget: 4096 }, // Deep strategy
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
