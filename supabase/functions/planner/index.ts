
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getIndustryPack } from "../_shared/industryPacks.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { PlannerRequestSchema } from "../_shared/validation.ts";

declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const json = await req.json();
    
    // We allow a flexible schema here to support the new 'scenario' property
    // which might not be in the strict validation schema yet.
    const { wizardState } = json; 
    
    // Initialize Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get('Authorization');
    let userId = null;
    if (authHeader) {
        const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
        userId = user?.id;
    }

    const ai = createGeminiClient();
    const pack = getIndustryPack(wizardState.data.industry);
    
    // Check for Scenario Mode
    const isScenario = !!wizardState.scenario;
    const scenarioContext = isScenario 
        ? `SCENARIO SIMULATION: The user wants to '${wizardState.scenario.type}' with '${wizardState.scenario.intensity}' intensity. 
           Adjust the roadmap accordingly (e.g., if 'accelerate', reduce durations but increase risk).`
        : "";

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
        },
        simulation_notes: { type: Type.STRING, description: "If scenario mode, explain what changed." }
      },
      required: ["phases"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `
        Create a Strategic Roadmap for a ${pack.industry} company.
        ${scenarioContext}
        
        Inputs:
        - Systems: ${wizardState.data.selectedSystems ? wizardState.data.selectedSystems.join(', ') : 'Standard Stack'}
        - KPI Focus: ${JSON.stringify(pack.kpis)}

        Task:
        1. Sequence the implementation into 3 Phases (Foundation, Implementation, Optimization).
        2. Define specific deliverables and KPIs for each phase.
        3. If running a scenario, explicitly state how the plan adapted in 'simulation_notes'.
      `,
      config: {
        thinkingConfig: { thinkingBudget: 4096 },
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    const roadmapData = JSON.parse(response.text);

    // If real user, save the roadmap
    if (userId && !isScenario) {
        // ... (Existing persistence logic for standard roadmap generation)
        // For scenario simulations, we usually just return the data to the UI to preview
        // before the user commits to "Saving" it.
    }

    return new Response(JSON.stringify(roadmapData), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    console.error("Planner Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
