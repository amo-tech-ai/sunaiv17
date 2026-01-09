
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
    const { wizardState } = json; 
    
    // Initialize Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get('Authorization');
    let userId = null;
    let orgId = null;

    if (authHeader) {
        const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
        userId = user?.id;
        
        // Fetch Org ID if possible, otherwise rely on RLS logic or default
        if (userId) {
             const { data: members } = await supabase
                .from('team_members')
                .select('org_id')
                .eq('user_id', userId)
                .limit(1)
                .single();
            orgId = members?.org_id;
        }
    }

    const ai = createGeminiClient();
    const pack = getIndustryPack(wizardState.data.industry);
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
        You are a Senior Strategic Partner.
        Design a clear 90-day execution plan for a ${pack.industry} company.
        Use business goals (e.g., 'Launch Foundation') rather than technical tasks. Ensure the tone is confident and directive.
        
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

    // PERSISTENCE: Save Roadmap to Database
    if (userId && !isScenario) {
        // 1. Get Project ID
        const { data: projects } = await supabase
            .from('projects')
            .select('id')
            .eq('user_id', userId)
            .eq('status', 'draft')
            .limit(1);
        
        const projectId = projects?.[0]?.id;

        if (projectId) {
            // 2. Create Roadmap Record
            const { data: roadmap, error: mapError } = await supabase
                .from('roadmaps')
                .insert({
                    project_id: projectId,
                    org_id: orgId, // Can be null
                    title: `Strategic Plan - ${new Date().toLocaleDateString()}`,
                    is_active: true
                })
                .select()
                .single();

            if (mapError) console.error("Roadmap insert error:", mapError);

            if (roadmap && roadmapData.phases) {
                // 3. Create Phases
                const phasesPayload = roadmapData.phases.map((phase: any, index: number) => ({
                    roadmap_id: roadmap.id,
                    org_id: orgId,
                    name: phase.phaseName,
                    duration_label: phase.duration,
                    order_index: index,
                    status: index === 0 ? 'active' : 'locked',
                    tasks: phase.items, // Storing as JSONB arrays
                    goals: phase.deliverables,
                    kpis: phase.kpis
                }));

                const { error: phaseError } = await supabase
                    .from('roadmap_phases')
                    .insert(phasesPayload);
                
                if (phaseError) console.error("Phase insert error:", phaseError);
            }
        }
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
