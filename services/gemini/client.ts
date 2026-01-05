import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.error("API_KEY is missing. AI features will not work.");
}

export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
