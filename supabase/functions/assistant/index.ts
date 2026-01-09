
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { AssistantRequestSchema } from "../_shared/validation.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const json = await req.json();
    const validation = AssistantRequestSchema.safeParse(json);

    if (!validation.success) {
      return new Response(JSON.stringify({ error: "Validation Error", details: validation.error.format() }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { task, content, context } = validation.data;
    const ai = createGeminiClient();

    let systemPrompt = "";
    let userContent = "";
    let responseSchema: Schema = { type: Type.OBJECT, properties: {}, required: [] };

    // 1. Document Analysis Mode
    if (task === 'analyze_document' || !task) {
      systemPrompt = `
        Role: Senior Strategic Partner.
        Task: Analyze the uploaded document text and compare it to the current brief context.
        Output: Summarize the document, extract key themes, and suggest specific updates to the project brief. Avoid technical jargon.
      `;
      userContent = `Brief Context: ${JSON.stringify(context)}\nDocument Content: ${content ? content.substring(0, 30000) : "No text"}`;
      
      responseSchema = {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          key_themes: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          integration_notes: { type: Type.STRING }
        },
        required: ["summary", "key_themes", "suggestions"]
      };
    } 
    // 2. Brief Summarization Mode
    else if (task === 'summarize_brief') {
      systemPrompt = `
        Role: Senior Strategic Partner.
        Task: Analyze the current project brief. Provide a concise executive summary and strategic recommendations to improve clarity or completeness. Focus on business goals.
      `;
      userContent = `Project Context: ${JSON.stringify(context)}\nBrief Content: ${content}`;
      
      responseSchema = {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "Executive summary of the brief" },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Suggestions to improve the brief" },
          completeness_score: { type: Type.INTEGER, description: "0-100 score of brief quality" }
        },
        required: ["summary", "recommendations", "completeness_score"]
      };
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + "\n\n" + userContent }] }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema
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
