import { GoogleGenAI } from "npm:@google/genai";

// Fix: Declare Deno global to resolve type errors in non-Deno environments
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

export const createGeminiClient = () => {
  const apiKey = Deno.env.get("GOOGLE_API_KEY");
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};