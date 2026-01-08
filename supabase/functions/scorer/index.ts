import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getIndustryPack } from "../_shared/industryPacks.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { checklist, industry, selectedSystems } = await req.json();
    const pack = getIndustryPack(industry);
    const ai = createGeminiClient();

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER, description: "The calculated readiness score (0-100)" },
        headline: { type: Type.STRING, description: "Short strategic assessment title e.g. 'High Risk', 'Ready to Scale'" },
        risks: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific implementation risks based on gaps." },
        wins: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Immediate low-hanging fruit based on current strengths." },
        summary: { type: Type.STRING, description: "A strategic summary of their readiness state." }
      },
      required: ["score", "headline", "risks", "wins", "summary"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `
        You are a Senior Implementation Audit Agent for the ${pack.industry} industry.
        
        Context:
        - Current Checklist Status: ${JSON.stringify(checklist)}
        - Selected AI Systems: ${JSON.stringify(selectedSystems)}
        - Industry Context: ${JSON.stringify(pack.riskFactors)}

        Task:
        1. **Reasoning (Thinking Mode):** Analyze the gaps. 
           - IF they selected 'Data-Heavy' systems (like 'Prediction' or 'CRM') BUT 'dataReady' is false, flag this as a CRITICAL risk.
           - Determine if the team structure ('teamOwner') supports the selected systems.
        
        2. **Scoring (Code Execution):** 
           - Use Python to calculate a WEIGHTED score.
           - Base Weights:
             - Data Ready: 35%
             - Team Owner: 25%
             - Tools Ready: 20%
             - Budget Approved: 20%
           - Adjust weights slightly based on industry (e.g., Data is higher for SaaS/Fintech).
           - Return the final integer score (0-100).

        3. **Output:** Generate the JSON response with the calculated score, a short headline, 2 specific risks, 2 quick wins, and a summary.
      `,
      config: {
        thinkingConfig: { thinkingBudget: 2048 },
        tools: [{ codeExecution: {} }],
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    return new Response(response.text, { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    console.error("Scorer Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});