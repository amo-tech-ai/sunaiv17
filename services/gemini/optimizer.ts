
import { supabase } from "../supabase";
import { AppState } from "../../types";
import { retryWithBackoff } from "../../utils/retry";

export const optimizer = {
  async recommendSystems(
    industry: string, 
    priorities: AppState['data']['priorities'],
    services: string[] = []
  ): Promise<{ systemIds: string[], impacts: Record<string, string>, summary?: string }> {
    try {
      const data = await retryWithBackoff(async () => {
        const { data, error } = await supabase.functions.invoke('optimizer', {
          body: {
            industry,
            priorities,
            services,
            painPoints: [] 
          }
        });

        if (error) throw error;
        return data;
      });
      
      return {
        systemIds: data.recommended_ids || [],
        impacts: data.custom_impacts || {},
        summary: data.synergy_notes
      };
    } catch (error) {
      console.error("Optimizer Function Error after retries:", error);
      // Fail gracefully with empty recs (UI will show standard list)
      return { systemIds: [], impacts: {} };
    }
  }
};
