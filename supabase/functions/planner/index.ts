
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getIndustryPack } from "../_shared/industryPacks.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";

declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { wizardState } = await req.json();
    
    // Initialize Supabase Client (Service Role for Admin Writes)
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get User from Auth Header (CRITICAL SECURITY)
    const authHeader = req.headers.get('Authorization');
    let userId = null;
    if (authHeader) {
        const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
        userId = user?.id;
    }

    if (!userId) {
        throw new Error("Unauthorized: User not authenticated");
    }

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

    const roadmapData = JSON.parse(response.text);

    // PERSISTENCE LOGIC
    // 1. Find or Create Project (Scoped to User)
    const { data: userProjects } = await supabase
      .from('projects')
      .select('id, org_id')
      .eq('user_id', userId) // Security Filter
      .eq('status', 'draft') 
      .limit(1);

    let projectId = userProjects?.[0]?.id;
    let orgId = userProjects?.[0]?.org_id;

    if (!projectId && wizardState.data.businessName) {
       // Create new project if none exists (Safety fallback)
       const { data: newProject } = await supabase.from('projects').insert({
           user_id: userId,
           name: wizardState.data.businessName,
           status: 'draft'
       }).select().single();
       projectId = newProject?.id;
       orgId = newProject?.org_id;
    }

    // If we have a project ID, save the roadmap
    if (projectId) {
        // Create Roadmap Record
        const { data: roadmap, error: mapError } = await supabase
            .from('roadmaps')
            .insert({
                project_id: projectId,
                org_id: orgId,
                ai_metadata: { model: 'gemini-3-pro-preview', thinking_budget: 4096 }
            })
            .select()
            .single();

        if (!mapError && roadmap) {
            // Create Phases
            const phasesPayload = roadmapData.phases.map((p: any, idx: number) => ({
                roadmap_id: roadmap.id,
                org_id: orgId,
                name: p.phaseName,
                order_index: idx,
                duration_label: p.duration,
                goals: p.deliverables,
                tasks: p.items
            }));

            await supabase.from('roadmap_phases').insert(phasesPayload);
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
