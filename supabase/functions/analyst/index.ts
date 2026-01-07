
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = await req.json();
    const { mode } = body;
    const ai = createGeminiClient();

    // MODE 1: RESEARCH (Streaming)
    if (mode === 'research') {
        const { businessName, website } = body;
        const response = await ai.models.generateContentStream({
            model: 'gemini-3-flash-preview',
            contents: `
            System context: Role as senior business analyst.
            Task: Research and verify business, detect industry, assess maturity.
            Input: Company: "${businessName}", URL: "${website}".
            
            Key Instructions:
            - Verify business existence before making claims.
            - Use industry-specific search queries.
            - Stream observations in real-time.
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
        
        // Explicitly type the array to allow both text and inlineData parts to prevent TS inference errors
        const parts: { text?: string; inlineData?: { mimeType: string; data: string } }[] = [{
            text: `Analyze the attached business documents. Extract key insights about:
            1. Business Model & Strategy
            2. Current Challenges or Goals
            
            Provide a concise summary to help tailor a consulting engagement.`
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
