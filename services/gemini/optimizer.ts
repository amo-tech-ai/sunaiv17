
import { supabase } from "../supabase";
import { AppState } from "../../types";

export const optimizer = {
  async recommendSystems(
    industry: string, 
    priorities: AppState['data']['priorities']
  ): Promise<{ systemIds: string[], impacts: Record<string, string>, summary?: string }> {
    try {
      const { data, error } = await supabase.functions.invoke('optimizer', {
        body: {
          industry,
          priorities,
          painPoints: [] // Future: Aggregated pain point tags
        }
      });

      if (error) throw error;
      
      return {
        systemIds: data.recommended_ids || [],
        impacts: data.custom_impacts || {},
        summary: data.synergy_notes
      };
    } catch (error) {
      console.error("Optimizer Function Error:", error);
      // Fail gracefully with empty recs (UI will show standard list)
      return { systemIds: [], impacts: {} };
    }
  }
};
