
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { checklist, industry } = await req.json();
    const ai = createGeminiClient();

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER },
        risks: { type: Type.ARRAY, items: { type: Type.STRING } },
        wins: { type: Type.ARRAY, items: { type: Type.STRING } },
        summary: { type: Type.STRING }
      },
      required: ["score", "risks", "wins", "summary"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Flash is sufficient if we use Code Execution tool
      contents: `
        Calculate readiness score for ${industry}.
        Checklist: ${JSON.stringify(checklist)}
        
        Rules:
        - dataReady = 30 points
        - teamOwner = 20 points
        - toolsReady = 20 points
        - budgetApproved = 30 points
        
        Task:
        1. Use Python to calculate the exact weighted score.
        2. Identify missing items as 'Risks'.
        3. Identify present items as 'Wins'.
      `,
      config: {
        tools: [{ codeExecution: {} }],
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
