
import { supabase } from "../supabase";
import { AppState } from "../../types";

export const scorer = {
  async analyzeReadiness(
    readiness: AppState['data']['readiness'],
    industry: string
  ): Promise<{ score: number, risks: string[], wins: string[], summary: string }> {
    try {
      const { data, error } = await supabase.functions.invoke('scorer', {
        body: {
          checklist: readiness,
          industry
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Scorer Function Error:", error);
      return {
        score: 50,
        risks: ["Analysis unavailable"],
        wins: ["Keep moving forward"],
        summary: "Could not calculate live score."
      };
    }
  }
};
