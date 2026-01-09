
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { OrchestratorRequestSchema } from "../_shared/validation.ts";

declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const json = await req.json();
    const validation = OrchestratorRequestSchema.safeParse(json);
    
    if (!validation.success) {
      return new Response(JSON.stringify({ error: "Validation Error", details: validation.error.format() }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { phases, industry, projectId } = validation.data;
    const ai = createGeminiClient();

    // Initialize Supabase (Service Role for writes)
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get User from Auth Header
    const authHeader = req.headers.get('Authorization');
    let userId = null;
    let orgId = null;
    
    if (authHeader) {
        const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
        userId = user?.id;
        
        // Fetch Org ID
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

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        tasks: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              priority: { type: Type.STRING, enum: ['high', 'medium', 'low'] },
              phase: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["title", "description", "priority", "phase", "tags"]
          }
        }
      },
      required: ["tasks"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        You are a Senior Strategic Partner managing execution.
        Convert this roadmap for a ${industry} company into granular tasks.
        Break down strategy into clear, actionable steps that a business owner understands.
        
        Roadmap: ${JSON.stringify(phases)}

        Rules:
        1. Break down broad items into specific actions.
        2. Assign priority based on phase (Phase 1 = High).
        3. Write 1-sentence descriptions focusing on the outcome.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    const result = JSON.parse(response.text);
    const generatedTasks = result.tasks;

    // PERSISTENCE LOGIC
    if (userId && generatedTasks.length > 0) {
        let targetProjectId = projectId;

        // If no projectId provided, find the active draft
        if (!targetProjectId) {
             const { data: projects } = await supabase
                .from('projects')
                .select('id, org_id')
                .eq('user_id', userId)
                .eq('status', 'draft')
                .limit(1);
             
             if (projects && projects.length > 0) {
                 targetProjectId = projects[0].id;
                 if (!orgId) orgId = projects[0].org_id;
             }
        }

        if (targetProjectId) {
            const tasksPayload = generatedTasks.map((t: any) => ({
                project_id: targetProjectId,
                org_id: orgId, // Can be null if personal project
                title: t.title,
                description: t.description,
                priority: t.priority,
                status: 'todo',
                tags: t.tags,
                phase: t.phase,
                ai_generated: true,
                created_by: userId
            }));

            const { error: insertError } = await supabase
                .from('tasks')
                .insert(tasksPayload);
            
            if (insertError) {
                console.error("Failed to save tasks:", insertError);
            }
        }
    }

    return new Response(JSON.stringify(result), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    console.error("Orchestrator Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
