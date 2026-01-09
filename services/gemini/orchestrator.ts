
import { supabase } from "../supabase";
import { RoadmapPhase, Task } from "../../types";
import { retryWithBackoff } from "../../utils/retry";

export const orchestrator = {
  async generateTasks(phases: RoadmapPhase[], industry: string): Promise<Task[]> {
    try {
      const data = await retryWithBackoff(async () => {
        const { data, error } = await supabase.functions.invoke('orchestrator', {
          body: {
            phases,
            industry
          }
        });

        if (error) throw error;
        return data;
      });
      
      return data.tasks.map((t: any, idx: number) => ({
        id: `task-${Date.now()}-${idx}`,
        title: t.title,
        description: t.description,
        status: 'todo',
        priority: t.priority,
        phase: t.phase,
        tags: t.tags || []
      }));
    } catch (error) {
      console.error("Orchestrator Function Error:", error);
      return [];
    }
  }
};
