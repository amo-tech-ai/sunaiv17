
import { supabase } from "../supabase";
import { AppState } from "../../types";
import { retryWithBackoff } from "../../utils/retry";
import { getIndustryPack } from "../../data/industryPacks";

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
      
      // Fallback Strategy
      try {
        const pack = getIndustryPack(industry);
        // Provide the industry-specific ROI formulas even if ranking failed
        return { 
            systemIds: [], // Empty lets UI show all, or we could pick top 3 hardcoded
            impacts: pack.roiFormulas || {},
            summary: "Unable to connect to optimization agent. These systems are selected based on your industry profile."
        };
      } catch (fallbackError) {
        return { systemIds: [], impacts: {} };
      }
    }
  }
};
