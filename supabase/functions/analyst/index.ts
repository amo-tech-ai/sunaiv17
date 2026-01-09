
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { AnalystRequestSchema } from "../_shared/validation.ts";

declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const json = await req.json();
    
    // Validate Request
    const validation = AnalystRequestSchema.safeParse(json);
    if (!validation.success) {
      return new Response(JSON.stringify({ error: "Validation Error", details: validation.error.format() }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const body = validation.data;
    const { mode } = body;
    const ai = createGeminiClient();
    
    // Initialize Supabase (Service Role)
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get User from Auth Header
    const authHeader = req.headers.get('Authorization');
    let userId = null;
    if (authHeader) {
        const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
        userId = user?.id;
    }

    // MODE 1: RESEARCH (Streaming)
    if (mode === 'research') {
        const { businessName, website } = body;
        if (!businessName) throw new Error("Business Name required for research mode");

        const response = await ai.models.generateContentStream({
            model: 'gemini-3-flash-preview',
            contents: `
            Role: Senior Strategic Partner at Sun AI Agency.
            Task: Verify the business context to build a solid foundation for growth strategy.
            Input: Company: "${businessName}", URL: "${website || ''}".
            
            Key Instructions:
            - Adopt a professional, consultative tone.
            - Avoid AI jargon (e.g., "tokens", "latency", "agents"). Speak in terms of business value, market position, and growth potential.
            - Verify business existence before making claims.
            - Stream observations in real-time as if you are a consultant reviewing their file.
            - Start with "Analyzing digital footprint for ${businessName}..."
            `,
            config: {
                tools: [{ googleSearch: {} }],
            }
        });

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of response) {
                        if (chunk.text) {
                            controller.enqueue(new TextEncoder().encode(chunk.text));
                        }
                    }
                    controller.close();
                } catch (e) {
                    controller.error(e);
                }
            }
        });

        return new Response(stream, { 
            headers: { ...corsHeaders, 'Content-Type': 'text/plain' } 
        });
    }

    // MODE 2: DOCUMENT SUMMARY
    if (mode === 'summarize_docs') {
        const { documents } = body;
        if (!documents || documents.length === 0) throw new Error("No documents provided");
        
        const parts: { text?: string; inlineData?: { mimeType: string; data: string } }[] = [{
            text: `You are a Senior Strategic Partner. Analyze the attached business documents. Extract key strategic insights about:
            1. Business Model & Strategy
            2. Current Challenges or Goals
            
            Provide a concise, executive-level summary to help tailor a consulting engagement. Avoid technical jargon.`
        }];

        for (const doc of documents) {
            if (doc.base64) {
                parts.push({
                    inlineData: {
                        mimeType: doc.mimeType || 'application/pdf',
                        data: doc.base64
                    }
                });
            } else if (doc.textContent) {
                parts.push({
                    text: `Document: ${doc.name}\nContent:\n${doc.textContent}`
                });
            }
        }

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: { parts },
        });

        return new Response(JSON.stringify({ summary: response.text }), { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
    }

    // MODE 3: CLASSIFY (Default)
    const { businessName, website, selectedServices, description, docInsights } = body;
    if (!businessName) throw new Error("Business Name required for classification");
    
    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        detected_industry: {
          type: Type.STRING,
          enum: ['saas', 'fashion', 'real_estate', 'tourism', 'events', 'other'],
        },
        industry_confidence: {
          type: Type.INTEGER,
          description: "0 to 100 confidence score",
        },
        business_model: { type: Type.STRING },
        maturity_score: { type: Type.INTEGER, description: "1 to 5" },
        industry_signals: { type: Type.ARRAY, items: { type: Type.STRING } },
        observations: { type: Type.ARRAY, items: { type: Type.STRING } },
        verified: { type: Type.BOOLEAN }
      },
      required: ["detected_industry", "industry_confidence", "business_model", "maturity_score", "verified"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        You are a Senior Strategic Partner.
        Analyze this business: ${businessName} (${website || 'No URL'}).
        
        CONTEXT:
        - User Description: ${description || 'N/A'}
        - Selected Tech/Services: ${selectedServices ? selectedServices.join(', ') : 'None'}
        - Document Insights: ${docInsights || 'None'}
        
        TASK:
        1. Verify if it exists via Google Search (if URL/Name allows).
        2. Classify into [saas, fashion, real_estate, tourism, events, other].
        3. Assess digital maturity (1-5). 
           - High maturity signals: Complex tech stack, modern tools.
           - Low maturity signals: Manual processes, limited digital presence.
        4. Provide industry specific observations. Use professional business language. Focus on revenue opportunities and operational efficiency.
      `,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    const analysisData = JSON.parse(response.text);
    let projectId = null;
    let snapshotId = null;

    // PERSISTENCE LOGIC
    if (userId) {
        // 1. Find or create Project
        const { data: projects } = await supabase
            .from('projects')
            .select('id')
            .eq('user_id', userId) // Security: Scope to user
            .eq('status', 'draft')
            .limit(1);
        
        projectId = projects?.[0]?.id;

        // If no draft project, create one (this is Step 1, so entry point)
        if (!projectId) {
            const { data: newProject } = await supabase
                .from('projects')
                .insert({
                    user_id: userId,
                    name: businessName,
                    website: website,
                    industry: analysisData.detected_industry,
                    status: 'draft',
                    wizard_data: { step1: body } // Initial dump
                })
                .select()
                .single();
            projectId = newProject?.id;
        } else {
            // Update existing draft with new findings
            await supabase.from('projects').update({
                name: businessName,
                industry: analysisData.detected_industry,
                wizard_data: { step1: body } // simplified merge
            }).eq('id', projectId);
        }

        // 2. Save Context Snapshot
        if (projectId) {
            const { data: snap } = await supabase.from('context_snapshots').insert({
                project_id: projectId,
                org_id: null,
                snapshot_type: 'business_analysis',
                snapshot_data: analysisData,
                is_active: true
            }).select().single();
            snapshotId = snap?.id;
        }

        // 3. Log Run
        await supabase.from('ai_run_logs').insert({
            project_id: projectId,
            model: 'gemini-3-flash-preview',
            token_count: 0,
            operation: 'classify_business',
            metadata: { business: businessName, industry: analysisData.detected_industry }
        });
    }

    return new Response(JSON.stringify({ ...analysisData, projectId, snapshotId }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    console.error("Analyst Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
