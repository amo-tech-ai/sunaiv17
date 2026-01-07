
import { supabase } from "../supabase";
import { AppState, RoadmapPhase } from "../../types";

export const planner = {
  async generateRoadmap(state: AppState): Promise<RoadmapPhase[]> {
    try {
      const { data, error } = await supabase.functions.invoke('planner', {
        body: {
          wizardState: state
        }
      });

      if (error) throw error;
      if (!data?.phases) throw new Error("Invalid roadmap format");

      return data.phases as RoadmapPhase[];
    } catch (error) {
      console.error("Planner Function Error:", error);
      return [
        { phaseName: "Foundation", duration: "Week 1", items: ["Data Audit", "Account Setup"] },
        { phaseName: "Implementation", duration: "Week 2-3", items: ["System Config", "Integration"] },
        { phaseName: "Launch", duration: "Week 4", items: ["Go Live", "Training"] }
      ];
    }
  }
};
