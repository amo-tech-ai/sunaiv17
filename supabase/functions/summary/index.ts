
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
        paragraph_1_diagnosis: { type: Type.STRING, description: "Paragraph 1: What we learned. Validate their situation." },
        paragraph_2_strategy: { type: Type.STRING, description: "Paragraph 2: Why this approach works. Explain the system fit." },
        
        signals: {
          type: Type.OBJECT,
          properties: {
            ai_readiness: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
            marketing_leverage: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
            sales_automation: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
            operational_efficiency: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] }
          },
          required: ["ai_readiness", "marketing_leverage", "sales_automation", "operational_efficiency"]
        },

        how_ai_helps: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "5 plain language bullet points on how AI helps."
        }
      },
      required: ["headline", "paragraph_1_diagnosis", "paragraph_2_strategy", "signals", "how_ai_helps"]
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
        Write an Executive Strategic Summary.
        1. **Paragraph 1 (Diagnosis):** Based on their website, industry, and diagnostic answers, summarize their current state. Validate their potential but acknowledge manual limits.
        2. **Paragraph 2 (Strategy):** Explain why the selected systems improve what already exists (traffic, leads) without adding complexity.
        3. **Signals:** Rate their potential in 4 areas based on their Digital Maturity (${maturity}/5).
        4. **How AI Helps:** 5 simple, non-technical bullet points.
        
        TONE: Calm, Clear, Confident. No fake numbers. No hype.
      `,
      config: {
        thinkingConfig: { thinkingBudget: 2048 },
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    const aiData = JSON.parse(response.text);

    return new Response(JSON.stringify({
      score, // Calculated in code
      headline: aiData.headline,
      summary: aiData.paragraph_1_diagnosis + "\n\n" + aiData.paragraph_2_strategy, // Legacy support
      analysis: {
        p1: aiData.paragraph_1_diagnosis,
        p2: aiData.paragraph_2_strategy,
        signals: aiData.signals,
        how_ai_helps: aiData.how_ai_helps
      }
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