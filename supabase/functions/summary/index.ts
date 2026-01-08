
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getIndustryPack } from "../_shared/industryPacks.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { wizardState } = await req.json();
    const data = wizardState.data;
    const ai = createGeminiClient();
    const pack = getIndustryPack(data.industry);

    // 1. Deterministic Scoring Logic (Base Calculation)
    let score = 0;
    const maturity = data.analysis?.maturity_score || 1;
    score += maturity * 15;
    if (data.priorities?.mainPriority) score += 10;
    const serviceCount = data.selectedServices?.length || 0;
    score += Math.min(serviceCount * 2, 10);
    const systemCount = data.selectedSystems?.length || 0;
    score -= (systemCount * 5);
    score = Math.max(15, Math.min(score, 95));

    // 2. Advanced Strategic Analysis (Gemini 3 Pro)
    // Using Code Execution to calculate realistic impact metrics
    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        headline: { type: Type.STRING, description: "A punchy, 3-5 word strategic title focusing on growth." },
        executive_brief: { type: Type.STRING, description: "2 paragraphs. Incorporate the Step 1 Research findings (Business Model, Maturity) and explain how the selected systems specifically improve Sales & Marketing." },
        
        impact_metrics: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING, description: "e.g. Sales Velocity, Marketing Reach" },
              before: { type: Type.NUMBER, description: "Baseline score (0-100)" },
              after: { type: Type.NUMBER, description: "Projected score (0-100)" },
              unit: { type: Type.STRING, enum: ['%', 'x', 'hrs'] },
              changeLabel: { type: Type.STRING, description: "e.g. +40%" },
              description: { type: Type.STRING, description: "Short explanation of the lift" }
            },
            required: ["category", "before", "after", "unit", "changeLabel", "description"]
          }
        },

        key_strategies: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING }, 
          description: "3 strategic bullet points blending their tech stack with the solution." 
        },
        risks: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["headline", "executive_brief", "impact_metrics", "key_strategies", "risks"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `
        You are a Senior Strategic Consultant for the ${data.industry} industry.
        
        CLIENT BRIEF:
        - Business: ${data.businessName}
        - Verified Model (Step 1): ${data.analysis?.business_model || 'Unknown'}
        - Research Observations: ${data.analysis?.observations?.join('; ') || 'None'}
        - Current Tech: ${data.selectedServices?.join(', ') || 'None'}
        - Core Pain Points: ${data.priorities?.moneyFocus}, ${data.priorities?.marketingFocus}
        - Selected Systems: ${data.selectedSystems?.join(', ')}
        
        TASK:
        1. **Strategic Narrative:** Write an Executive Brief. It MUST reference the "Verified Model" or "Research Observations" found in Step 1 to show we understand their business. Connect this to their selected systems.
        
        2. **Impact Calculation (Code Execution):**
           - Use Python to calculate "Before" vs "After" scores for 3 categories: "Sales Efficiency", "Marketing Reach", and "Operational Speed".
           - Baseline (Before) = (Digital Maturity Score / 5) * 100.
           - Uplift (After) = Add 15 points for each selected system relevant to that category.
           - Cap at 95.
           - Return the JSON structure with these calculated values.
      `,
      config: {
        thinkingConfig: { thinkingBudget: 2048 },
        tools: [{ codeExecution: {} }],
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    const aiData = JSON.parse(response.text);

    return new Response(JSON.stringify({
      score,
      headline: aiData.headline,
      summary: aiData.executive_brief,
      impactScores: aiData.impact_metrics,
      wins: aiData.key_strategies,
      risks: aiData.risks
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    console.error("Summary Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
