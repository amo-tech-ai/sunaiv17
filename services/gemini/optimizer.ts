
import { supabase } from "../supabase";
import { AppState } from "../../types";

export const optimizer = {
  async recommendSystems(
    industry: string, 
    priorities: AppState['data']['priorities']
  ): Promise<{ systemIds: string[], impacts: Record<string, string> }> {
    try {
      const { data, error } = await supabase.functions.invoke('optimizer', {
        body: {
          industry,
          priorities,
          painPoints: [] // Can be passed if we aggregated them from Step 2
        }
      });

      if (error) throw error;
      
      return {
        systemIds: data.recommended_ids || [],
        impacts: data.custom_impacts || {}
      };
    } catch (error) {
      console.error("Optimizer Function Error:", error);
      return { systemIds: [], impacts: {} };
    }
  }
};
