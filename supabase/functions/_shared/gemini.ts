import { GoogleGenAI } from "npm:@google/genai";

// Fix: Declare Deno global to resolve type errors in non-Deno environments
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

export const createGeminiClient = () => {
  // Support standard naming conventions for Supabase Secrets
  const apiKey = 
    Deno.env.get("GEMINI_API_KEY") || 
    Deno.env.get("GOOGLE_API_KEY") || 
    Deno.env.get("API_KEY");

  if (!apiKey) {
    throw new Error("Missing API Key: Please set GEMINI_API_KEY in Supabase Dashboard > Settings > Secrets");
  }
  
  return new GoogleGenAI({ apiKey });
};