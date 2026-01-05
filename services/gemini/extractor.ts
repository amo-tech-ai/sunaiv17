
import { ai } from "./client";
import { Type, Schema } from "@google/genai";
import { DiagnosticQuestion, IndustryType } from "../../types";

const MODEL_NAME = "gemini-3-flash-preview";

export const extractor = {
  async generateQuestions(industry: IndustryType): Promise<DiagnosticQuestion[]> {
    try {
      const schema: Schema = {
        type: Type.OBJECT,
        properties: {
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                label: { type: Type.STRING },
                placeholder: { type: Type.STRING },
                context: { type: Type.STRING },
              },
              required: ["id", "label", "context"],
            },
          },
        },
        required: ["questions"],
      };

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `Generate 3 high-impact diagnostic questions for a business in the '${industry}' industry.
        
        The questions should uncover pain points related to:
        1. Revenue/Financial Goals
        2. Marketing/Growth Challenges
        3. Operational Speed/Efficiency

        Also provide a 'context' string for each question explaining why this metric matters for AI automation.
        `,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });

      if (response.text) {
        const data = JSON.parse(response.text);
        return data.questions as DiagnosticQuestion[];
      }
      return [];
    } catch (error) {
      console.error("Extractor Agent Error:", error);
      // Fallback
      return [
        { id: "q1", label: "What is your primary revenue bottleneck?", context: "Identifying bottlenecks helps us target high-ROI AI." },
        { id: "q2", label: "How do you currently handle lead volume?", context: "Manual lead handling is the #1 cause of lost revenue." },
        { id: "q3", label: "What is your average response time?", context: "Speed to lead correlates directly with conversion rates." }
      ];
    }
  },
};
