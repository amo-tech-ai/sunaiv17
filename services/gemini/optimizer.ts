
import { ai } from "./client";
import { Type, Schema } from "@google/genai";
import { AppState } from "../../types";

const MODEL_NAME = "gemini-3-flash-preview";

export const optimizer = {
  async recommendSystems(
    industry: string, 
    priorities: AppState['data']['priorities']
  ): Promise<{ systemIds: string[], impacts: Record<string, string> }> {
    try {
      const schema: Schema = {
        type: Type.OBJECT,
        properties: {
          recommended_ids: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Array of system IDs (lead_gen, content_studio, conversion_booster, crm_autopilot, whatsapp_assistant)"
          },
          custom_impacts: {
            type: Type.OBJECT,
            description: "Map of system ID to a specific revenue impact sentence.",
            properties: {
              lead_gen: { type: Type.STRING },
              content_studio: { type: Type.STRING },
              conversion_booster: { type: Type.STRING },
              crm_autopilot: { type: Type.STRING },
              whatsapp_assistant: { type: Type.STRING },
            }
          }
        },
        required: ["recommended_ids", "custom_impacts"],
      };

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `Given a '${industry}' business with these priorities:
        - Financial: ${priorities.moneyFocus}
        - Marketing: ${priorities.marketingFocus}
        - Operations: ${priorities.responseSpeed}
        - Main Goal: ${priorities.mainPriority}

        Recommend the top 3 AI systems from this list:
        [lead_gen, content_studio, conversion_booster, crm_autopilot, whatsapp_assistant]

        For EACH system (all 5), write a short 1-sentence "Revenue Impact" specific to their industry/problems.
        `,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });

      if (response.text) {
        const data = JSON.parse(response.text);
        return {
          systemIds: data.recommended_ids || [],
          impacts: data.custom_impacts || {}
        };
      }
      return { systemIds: [], impacts: {} };
    } catch (error) {
      console.error("Optimizer Agent Error:", error);
      return { systemIds: [], impacts: {} };
    }
  }
};
