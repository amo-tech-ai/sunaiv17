
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Type, Schema } from "npm:@google/genai";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { wizardState } = await req.json();
    const data = wizardState.data;
    const ai = createGeminiClient();

    // 1. Deterministic Scoring Logic
    let score = 0;
    
    // Base: Maturity Score (1-5) * 15. Max 75.
    const maturity = data.analysis?.maturity_score || 1;
    score += maturity * 15;

    // Bonus: Clarity of Vision (Step 2)
    // If they selected specific priorities, they are more ready.
    if (data.priorities?.mainPriority) {
      score += 10;
    }

    // Bonus: Existing Tech Stack (Step 1)
    // Up to 10 points for having existing services (2 points each)
    const serviceCount = data.selectedServices?.length || 0;
    score += Math.min(serviceCount * 2, 10);

    // Adjustment: Implementation Complexity (Step 3)
    // Slight penalty for more complex stacks to manage expectations
    const systemCount = data.selectedSystems?.length || 0;
    score -= (systemCount * 5);

    // Clamp score between 15 and 95 (never 0, never 100)
    score = Math.max(15, Math.min(score, 95));

    // 2. AI Narrative Generation
    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        headline: { type: Type.STRING, description: "A punchy, 3-5 word strategic title." },
        narrative: { type: Type.STRING, description: "2 paragraphs explaining the strategy." },
        strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 key strengths identified." },
        risks: { type: Type.ARRAY, items: { type: Type.STRING }, description: "2 potential implementation risks." }
      },
      required: ["headline", "narrative", "strengths", "risks"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        You are a Senior Strategic Partner for the ${data.industry} industry.
        
        Client Context:
        - Business: ${data.businessName}
        - Current Tech: ${data.selectedServices?.join(', ') || 'None'}
        - Core Pain Point: ${data.priorities?.mainPriority || 'Growth'}
        - Selected Systems: ${data.selectedSystems?.join(', ')}
        - Calculated Readiness Score: ${score}/100

        Task:
        1. Generate a "Strategic Narrative" (2 paragraphs).
           - Paragraph 1: Acknowledge their specific pain point and industry context. Validate why this is a common bottleneck.
           - Paragraph 2: Explain how the selected AI systems specifically address this. Focus on the outcome (e.g., "Recovering lost leads", "Automating inventory").
        2. Identify 3 "Key Strengths" based on their current tech stack or clarity of vision.
        3. Identify 2 "Implementation Risks" (e.g., Data integration, Change management).

        Tone: Professional, encouraging, expert. Use ${data.industry} terminology.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    // Parse the response text to JSON
    const aiData = JSON.parse(response.text);

    // 3. Return Combined Result
    return new Response(JSON.stringify({
      score, // Deterministic score calculated in code
      headline: aiData.headline,
      summary: aiData.narrative, // Mapped to 'summary' for frontend compatibility
      wins: aiData.strengths,    // Mapped to 'wins'
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
