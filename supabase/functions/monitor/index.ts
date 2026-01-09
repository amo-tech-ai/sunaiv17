
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { MonitorRequestSchema } from "../_shared/validation.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const json = await req.json();
    const validation = MonitorRequestSchema.safeParse(json);

    if (!validation.success) {
      return new Response(JSON.stringify({ error: "Validation Error", details: validation.error.format() }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { timelineData, projectContext } = validation.data;
    const ai = createGeminiClient();

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        status: { type: Type.STRING, enum: ['on_track', 'at_risk', 'delayed'] },
        summary: { type: Type.STRING },
        risks: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              impact: { type: Type.STRING },
              severity: { type: Type.STRING, enum: ['low', 'medium', 'high'] }
            }
          }
        },
        prediction: { type: Type.STRING, description: "Estimated completion date forecast" }
      },
      required: ["status", "summary", "risks", "prediction"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Role: Senior Strategic Partner.
        Context: ${JSON.stringify(projectContext)}
        Timeline Data: ${JSON.stringify(timelineData)}
        
        Task:
        1. Proactive timeline management. Analyze task completion velocity.
        2. Identify stalled tasks or dependencies.
        3. Predict completion date.
        4. Explain risks in terms of business impact.
      `,
      config: {
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
