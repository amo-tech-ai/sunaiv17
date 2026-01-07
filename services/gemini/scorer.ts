
import { supabase } from "../supabase";
import { AppState } from "../../types";

export const scorer = {
  async analyzeReadiness(
    readiness: AppState['data']['readiness'],
    industry: string,
    selectedSystems: string[]
  ): Promise<{ score: number, risks: string[], wins: string[], summary: string }> {
    try {
      const { data, error } = await supabase.functions.invoke('scorer', {
        body: {
          checklist: readiness,
          industry,
          selectedSystems
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Scorer Function Error:", error);
      // Fallback calculation if AI fails
      const fallbackScore = Object.values(readiness).filter(Boolean).length * 25;
      return {
        score: fallbackScore,
        risks: ["Consultant unavailable. Check your data readiness manually."],
        wins: ["Review the checklist above."],
        summary: "We couldn't connect to the specialized audit agent, but your raw score is calculated above."
      };
    }
  }
};
