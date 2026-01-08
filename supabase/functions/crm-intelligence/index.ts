
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";

declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { clientId, recentHistory, clientDetails } = await req.json();
    const ai = createGeminiClient();

    // Initialize Supabase Client to fetch data if not provided
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    let historyText = recentHistory;
    
    // If no history provided, fetch from DB
    if (!historyText && clientId) {
       const { data: interactions, error } = await supabase
         .from('crm_interactions')
         .select('type, content, created_at')
         .eq('contact_id', clientId)
         .order('created_at', { ascending: false })
         .limit(5);
       
       if (interactions && interactions.length > 0) {
         historyText = interactions.map((i: any) => `[${new Date(i.created_at).toLocaleDateString()}] ${i.type.toUpperCase()}: ${i.content}`).join('\n');
       } else {
         historyText = "No prior interactions found. This is a new contact.";
       }
    } else if (!historyText) {
        historyText = "No prior interaction history available.";
    }

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        health_score: { type: Type.INTEGER, description: "0-100 score indicating relationship strength." },
        summary: { type: Type.STRING, description: "Concise summary of the relationship status." },
        news_snippet: { type: Type.STRING, description: "Relevant news about the company or industry found via search." },
        suggested_action: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            draft_content: { type: Type.STRING, description: "Draft email or note for the user." },
            reasoning: { type: Type.STRING }
          },
          required: ["title", "draft_content", "reasoning"]
        }
      },
      required: ["health_score", "summary", "suggested_action"]
    };

    const prompt = `
      You are a Senior Account Manager AI. Analyze this client relationship.
      
      Client: ${clientDetails?.name} (${clientDetails?.role} at ${clientDetails?.company})
      Status: ${clientDetails?.status}
      History: 
      ${historyText}

      Task:
      1. Determine the Relationship Health Score (0-100).
         - High engagement, positive sentiment = High Score.
         - Ghosting, negative sentiment, long gaps = Low Score.
         - New lead = Neutral (50).
      2. Summarize the current status.
      3. Use Google Search to find any recent news about ${clientDetails?.company || 'their industry'}.
      4. Suggest the single best Next Action.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    return new Response(response.text, { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    console.error("CRM Intelligence Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
