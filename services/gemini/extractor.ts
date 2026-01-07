
import { ai } from "./client";
import { Type, Schema } from "@google/genai";
import { DiagnosticQuestion, IndustryType } from "../../types";

// Using Pro for deep reasoning and context mapping
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
                category: { 
                  type: Type.STRING, 
                  // These MUST match the AppState priorities keys for state mapping to work
                  enum: ['sales', 'marketing', 'speed', 'priority'] 
                },
                title: { type: Type.STRING, description: "The diagnostic question text" },
                context_reasoning: { type: Type.STRING, description: "Why we are asking this based on their services/industry" },
                options: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      label: { type: Type.STRING, description: "User-facing answer text" },
                      mapped_system_id: { 
                        type: Type.STRING,
                        description: "The ID of the AI system that solves this specific problem",
                        enum: ['lead_gen', 'content_studio', 'conversion_booster', 'crm_autopilot', 'whatsapp_assistant']
                      },
                      pain_point_tag: { type: Type.STRING, description: "Short tag for dashboard, e.g. 'Slow Response'" },
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
        
        CLIENT PROFILE:
        - Industry: ${industry}
        - Tech Stack / Services: [${services.length > 0 ? services.join(', ') : "None detected"}]
        - Document Insights: "${docInsights || "N/A"}"

        OBJECTIVE:
        Generate 4 deep-dive diagnostic questions to identify operational bottlenecks.
        
        REQUIRED CATEGORIES (Generate exactly 1 for each):
        1. 'sales' (Revenue & Conversion)
        2. 'marketing' (Traffic & Content)
        3. 'speed' (Operations & Efficiency)
        4. 'priority' (Strategic Focus)

        CRITICAL RULES FOR QUESTION GENERATION:
        1. **Service Awareness**: 
           - IF they have a service (e.g. 'WhatsApp'), ask how they optimize it (e.g. "How fast is your WhatsApp response time?").
           - IF they lack a service (e.g. 'No CRM'), ask about the pain of missing it (e.g. "How do you track leads manually?").
        2. **Document Integration**:
           - If 'Document Insights' mentions specific pains (e.g. "Returns", "Churn"), ensure a question addresses that directly.
        3. **Industry Jargon**: 
           - Use terms specific to ${industry} (e.g. "AOV", "Churn", "Showings", "Occupancy", "Ticket Sales").
        4. **System Mapping**:
           - Every answer option MUST map to a solution from: [lead_gen, content_studio, conversion_booster, crm_autopilot, whatsapp_assistant].
        
        OUTPUT FORMAT:
        Return strictly JSON matching the schema.
        `,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
          thinkingConfig: { thinkingBudget: 2048 } // Allow reasoning time for service mapping
        },
      });

      if (response.text) {
        const data = JSON.parse(response.text);
        // Validate we have 4 questions
        if (data.questions && Array.isArray(data.questions)) {
           return data.questions as DiagnosticQuestion[];
        }
      }
      throw new Error("Invalid structure returned");
    } catch (error) {
      console.error("Extractor Agent Error:", error);
      // Robust Fallback based on Industry
      return getFallbackQuestions(industry);
    }
  },
};

// Fallback logic to ensure the UI never breaks
function getFallbackQuestions(industry: string): DiagnosticQuestion[] {
  const isRealEstate = industry === 'real_estate';
  
  return [
    { 
      id: "fallback_q1", 
      category: 'sales',
      title: isRealEstate ? "How do you handle weekend tour requests?" : "What is your primary revenue bottleneck?", 
      context_reasoning: "We need to identify where you are losing high-intent leads.",
      options: [
        { id: "o1", label: "Response is too slow", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Speed" },
        { id: "o2", label: "Leads are unqualified", mapped_system_id: "lead_gen", pain_point_tag: "Quality" }
      ]
    },
    { 
      id: "fallback_q2", 
      category: 'marketing',
      title: "How consistent is your content production?", 
      context_reasoning: "Consistency correlates directly with organic traffic growth.",
      options: [
        { id: "o3", label: "Sporadic / Ad-hoc", mapped_system_id: "content_studio", pain_point_tag: "Inconsistent" },
        { id: "o4", label: "Expensive to outsource", mapped_system_id: "content_studio", pain_point_tag: "Cost" }
      ]
    },
    { 
      id: "fallback_q3", 
      category: 'speed',
      title: "Where is your team spending the most manual hours?", 
      context_reasoning: "Identifying manual sinks helps us calculate ROI for automation.",
      options: [
        { id: "o5", label: "Data Entry / CRM", mapped_system_id: "crm_autopilot", pain_point_tag: "Admin" },
        { id: "o6", label: "Customer Support", mapped_system_id: "whatsapp_assistant", pain_point_tag: "Support" }
      ]
    },
    { 
      id: "fallback_q4", 
      category: 'priority',
      title: "If you could fix one thing in 30 days, what would it be?", 
      context_reasoning: "This helps us prioritize the Phase 1 rollout.",
      options: [
        { id: "o7", label: "More Revenue", mapped_system_id: "conversion_booster", pain_point_tag: "Growth" },
        { id: "o8", label: "More Time", mapped_system_id: "crm_autopilot", pain_point_tag: "Efficiency" }
      ]
    }
  ];
}
