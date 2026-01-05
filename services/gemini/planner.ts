import { ai } from "./client";
import { Type, Schema } from "@google/genai";
import { AppState, RoadmapPhase } from "../../types";

const MODEL_NAME = "gemini-3-pro-preview"; // Using Pro for Thinking

export const planner = {
  async generateRoadmap(state: AppState): Promise<RoadmapPhase[]> {
    try {
      const schema: Schema = {
        type: Type.OBJECT,
        properties: {
          phases: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                phaseName: { type: Type.STRING },
                duration: { type: Type.STRING },
                items: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["phaseName", "duration", "items"]
            }
          }
        },
        required: ["phases"]
      };

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `Create a 30-day AI Implementation Plan for a ${state.data.industry} company.
        
        Context:
        - Business: ${state.data.businessName}
        - Priorities: ${JSON.stringify(state.data.priorities)}
        - Selected Systems: ${state.data.selectedSystems.join(', ')}
        - Readiness Score: ${state.aiState.readinessAnalysis.score}
        - Identified Risks: ${state.aiState.readinessAnalysis.risks.join(', ')}

        Create 3 phases (Foundation, Implementation, Optimization).
        Tailor the specific tasks to the selected systems and readiness gaps.
        `,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
          thinkingConfig: { thinkingBudget: 1024 } // Enable thinking for better planning
        },
      });

      if (response.text) {
        const data = JSON.parse(response.text);
        return data.phases as RoadmapPhase[];
      }
      return [];
    } catch (error) {
      console.error("Planner Agent Error:", error);
      return [
        { phaseName: "Foundation", duration: "Week 1", items: ["Data Audit", "Account Setup"] },
        { phaseName: "Implementation", duration: "Week 2-3", items: ["System Config", "Integration"] },
        { phaseName: "Launch", duration: "Week 4", items: ["Go Live", "Training"] }
      ];
    }
  }
};
