
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getIndustryPack } from "../_shared/industryPacks.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { OptimizerRequestSchema } from "../_shared/validation.ts";

declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const json = await req.json();
    
    const validation = OptimizerRequestSchema.safeParse(json);
    if (!validation.success) {
      return new Response(JSON.stringify({ error: "Validation Error", details: validation.error.format() }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const { industry, priorities, services } = validation.data;

    const pack = getIndustryPack(industry);
    const ai = createGeminiClient();

    // Initialize Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get User
    const authHeader = req.headers.get('Authorization');
    let userId = null;
    if (authHeader) {
        const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
        userId = user?.id;
    }

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
          description: "Map of system ID to a specific, benefit-oriented ROI projection string.",
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
          description: "A short strategic insight highlighting system dependencies or stack synergies."
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
        - Pain Points: ${priorities.moneyFocus}, ${priorities.marketingFocus}, ${priorities.responseSpeed}
        - Current Tech Stack: ${services ? services.join(', ') : 'None'}
        Available Systems: ${JSON.stringify(pack.systemNames)}
        ROI Formulas: ${JSON.stringify(pack.roiFormulas)}

        Task: Rank top 2-3 systems. Rewrite ROI text to be specific.
      `,
      config: {
        thinkingConfig: { thinkingBudget: 1024 },
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    const result = JSON.parse(response.text);

    // PERSISTENCE
    if (userId) {
        const { data: projects } = await supabase
            .from('projects')
            .select('id')
            .eq('user_id', userId)
            .eq('status', 'draft')
            .limit(1);
        
        const projectId = projects?.[0]?.id;

        if (projectId && result.recommended_ids) {
            // Save Recommendations
            const systemPayloads = result.recommended_ids.map((sysId: string) => ({
                project_id: projectId,
                system_id: sysId,
                is_recommended: true,
                is_selected: false, // User hasn't selected yet in UI
                custom_impact: result.custom_impacts[sysId],
                updated_at: new Date().toISOString()
            }));

            // Upsert based on project_id + system_id
            await supabase
                .from('project_systems')
                .upsert(systemPayloads, { onConflict: 'project_id, system_id' });
        }
    }

    return new Response(response.text, { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
