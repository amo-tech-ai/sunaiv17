
import { ai } from "./client";
import { Type, Schema } from "@google/genai";
import { AppState } from "../../types";

const MODEL_NAME = "gemini-3-flash-preview";

export const scorer = {
  async analyzeReadiness(
    readiness: AppState['data']['readiness'],
    industry: string
  ): Promise<{ score: number, risks: string[], wins: string[], summary: string }> {
    try {
      const schema: Schema = {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER, description: "0-100 integer" },
          risks: { type: Type.ARRAY, items: { type: Type.STRING } },
          wins: { type: Type.ARRAY, items: { type: Type.STRING } },
          summary: { type: Type.STRING, description: "A encouraging but realistic summary paragraph." }
        },
        required: ["score", "risks", "wins", "summary"],
      };

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `Analyze the AI readiness for a ${industry} company.
        Checklist status:
        - Data Centralized: ${readiness.dataReady}
        - Project Lead: ${readiness.teamOwner}
        - Tech Stack Documented: ${readiness.toolsReady}
        - Budget Approved: ${readiness.budgetApproved}

        Calculate a score (weighted: Budget/Data are high impact).
        Identify 2 major risks and 2 quick wins.
        `,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });

      if (response.text) {
        return JSON.parse(response.text);
      }
      throw new Error("No response");
    } catch (error) {
      console.error("Scorer Agent Error:", error);
      // Fallback calculation
      const score = Object.values(readiness).filter(Boolean).length * 25;
      return {
        score,
        risks: ["Manual analysis required"],
        wins: ["Standard deployment possible"],
        summary: "We have calculated a baseline score based on your inputs."
      };
    }
  }
};
