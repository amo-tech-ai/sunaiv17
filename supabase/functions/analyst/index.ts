
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { businessName, website, selectedServices, description, docInsights } = await req.json();
    const ai = createGeminiClient();

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
        Analyze this business: ${businessName} (${website || 'No URL'}).
        
        CONTEXT:
        - User Description: ${description || 'N/A'}
        - Selected Tech/Services: ${selectedServices ? selectedServices.join(', ') : 'None'}
        - Document Insights: ${docInsights || 'None'}
        
        TASK:
        1. Verify if it exists via Google Search (if URL/Name allows).
        2. Classify into [saas, fashion, real_estate, tourism, events, other].
        3. Assess digital maturity (1-5). 
           - High maturity signals: 'AI Agents', 'Web Apps' in services, sophisticated tech stack.
           - Low maturity signals: 'WhatsApp' only, manual processes mentioned in docs.
        4. Provide industry specific observations based on the uploaded documents and services.
      `,
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
    console.error("Analyst Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
