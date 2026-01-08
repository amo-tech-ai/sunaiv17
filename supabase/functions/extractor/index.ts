
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createGeminiClient } from "../_shared/gemini.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getIndustryPack } from "../_shared/industryPacks.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { industry } = await req.json();
    const pack = getIndustryPack(industry);
    
    // STRATEGIC CHANGE: 
    // Instead of generating questions from scratch (risk of hallucination), 
    // we serve the high-signal, verified templates from the Industry Pack.
    // The Frontend will handle the rendering logic.
    
    if (pack.diagnostics && pack.diagnostics.length > 0) {
      return new Response(JSON.stringify({ sections: pack.diagnostics }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    // Fallback if no static diagnostics exist (should not happen with new packs, but safe)
    // We construct a basic structure using the old templates if needed, or return empty.
    return new Response(JSON.stringify({ sections: [] }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    console.error("Extractor Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
