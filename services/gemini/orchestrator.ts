
import { ai } from "./client";
import { Type, Schema } from "@google/genai";
import { RoadmapPhase, Task } from "../../types";

const MODEL_NAME = "gemini-3-flash-preview";

export const orchestrator = {
  /**
   * Expands the high-level roadmap items into detailed, actionable tasks.
   */
  async generateTasks(phases: RoadmapPhase[], industry: string): Promise<Task[]> {
    try {
      const schema: Schema = {
        type: Type.OBJECT,
        properties: {
          tasks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                priority: { type: Type.STRING, enum: ['high', 'medium', 'low'] },
                phase: { type: Type.STRING },
                tags: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["title", "description", "priority", "phase", "tags"]
            }
          }
        },
        required: ["tasks"]
      };

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `You are a Project Manager. Convert this high-level AI implementation roadmap for a ${industry} company into granular, actionable tasks.
        
        Roadmap:
        ${JSON.stringify(phases)}

        Rules:
        1. Break down broad items (e.g., "Setup CRM") into specific actions (e.g., "Import contacts", "Configure API keys").
        2. Assign a priority based on the phase (Phase 1 = High).
        3. Write a 1-sentence description for the assignee.
        4. Generate 2-3 relevant tags (e.g., "Technical", "Content", "Admin").
        `,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });

      if (response.text) {
        const data = JSON.parse(response.text);
        // Transform and add IDs/Status
        return data.tasks.map((t: any, idx: number) => ({
          id: `task-${Date.now()}-${idx}`,
          title: t.title,
          description: t.description,
          status: 'todo',
          priority: t.priority,
          phase: t.phase,
          tags: t.tags || []
        }));
      }
      return [];
    } catch (error) {
      console.error("Orchestrator Agent Error:", error);
      // Fallback: Just map the existing items if AI fails
      return phases.flatMap((p, pIdx) => 
        p.items.map((item, iIdx) => ({
          id: `fallback-${pIdx}-${iIdx}`,
          title: item,
          description: "Manual execution required.",
          status: 'todo',
          priority: pIdx === 0 ? 'high' : 'medium',
          phase: p.phaseName,
          tags: ['General']
        }))
      );
    }
  }
};
