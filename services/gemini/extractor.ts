
import { ai } from "./client";
import { Type, Schema } from "@google/genai";
import { DiagnosticQuestion, IndustryType } from "../../types";

// Switching to Pro for Reasoning capabilities
const MODEL_NAME = "gemini-3-pro-preview";

export const extractor = {
  async generateQuestions(
    industry: IndustryType,
    services: string[] = [],
    docInsights: string = ""
  ): Promise<DiagnosticQuestion[]> {
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
                category: { type: Type.STRING, enum: ['sales', 'marketing', 'speed', 'priority'] },
                title: { type: Type.STRING },
                context_reasoning: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      label: { type: Type.STRING },
                      mapped_system_id: { type: Type.STRING },
                      pain_point_tag: { type: Type.STRING },
                    },
                    required: ["id", "label", "mapped_system_id", "pain_point_tag"]
                  }
                }
              },
              required: ["id", "category", "title", "context_reasoning", "options"],
            },
          },
        },
        required: ["questions"],
      };

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `You are a Senior Industry Consultant for the '${industry}' sector.
        
        CONTEXT:
        - Client Industry: ${industry}
        - Current Tech Stack/Services: ${services.length > 0 ? services.join(', ') : "None specified"}
        - Internal Document Insights: ${docInsights || "None provided"}
        - Valid System IDs to map to: [lead_gen, content_studio, conversion_booster, crm_autopilot, whatsapp_assistant]

        TASK:
        Generate 4 deep-dive diagnostic questions to uncover bottlenecks in:
        1. Sales/Revenue (Category: sales)
        2. Marketing/Content (Category: marketing)
        3. Operational Speed (Category: speed)
        4. Strategic Priority (Category: priority)

        CRITICAL RULES:
        1. Context Aware: If they use 'WhatsApp' (in Services), ask about response times or automation, do NOT ask "Do you use WhatsApp?".
        2. Document Aware: If doc insights mention "returns" or "churn", ensure a question addresses that specific pain.
        3. Jargon: Use industry-specific terms (e.g., "AOV" for Retail, "Showing" for Real Estate).
        4. Mapping: Every answer option MUST map to one of the Valid System IDs provided above that helps solve that specific problem.
        `,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
          thinkingConfig: { thinkingBudget: 2048 } // Enable thinking for context mapping
        },
      });

      if (response.text) {
        const data = JSON.parse(response.text);
        return data.questions as DiagnosticQuestion[];
      }
      throw new Error("No questions generated");
    } catch (error) {
      console.error("Extractor Agent Error:", error);
      // Fallback
      return [
        { 
          id: "q1", 
          category: 'sales',
          title: "What is your primary revenue bottleneck?", 
          context_reasoning: "Identifying bottlenecks helps us target high-ROI AI.",
          options: [
            { id: "o1", label: "Not enough leads", mapped_system_id: "lead_gen", pain_point_tag: "Low Volume" },
            { id: "o2", label: "Low conversion rate", mapped_system_id: "conversion_booster", pain_point_tag: "Low Conversion" },
            { id: "o3", label: "High churn", mapped_system_id: "crm_autopilot", pain_point_tag: "Churn" },
            { id: "o4", label: "Slow sales cycle", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Slow Sales" }
          ]
        },
        // Add minimal fallbacks for other categories if needed, relying on AI for the rest
      ];
    }
  },
};
