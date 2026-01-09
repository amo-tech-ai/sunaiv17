
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { AnalyticsRequestSchema } from "../_shared/validation.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const json = await req.json();
    const validation = AnalyticsRequestSchema.safeParse(json);

    if (!validation.success) {
      return new Response(JSON.stringify({ error: "Validation Error", details: validation.error.format() }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { metrics, type } = validation.data;
    const ai = createGeminiClient();

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        headline: { type: Type.STRING },
        insights: { type: Type.ARRAY, items: { type: Type.STRING } },
        trend_analysis: { type: Type.STRING },
        recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
        alerts: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["headline", "insights", "trend_analysis", "recommendations"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Role: Senior Strategic Partner.
        Data: ${JSON.stringify(metrics)}
        Analysis Type: ${type || 'general'}
        
        Task:
        1. Interpret data into business insights. Don't just list numbers; explain what they mean for growth.
        2. Identify growth trends and anomalies.
        3. Provide strategic recommendations.
        4. Use the code execution tool to calculate percentage growth if historical data is present.
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
