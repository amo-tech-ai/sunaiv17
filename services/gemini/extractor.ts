
import { supabase } from "../supabase";
import { DiagnosticQuestion, IndustryType } from "../../types";

export const extractor = {
  async generateQuestions(
    industry: IndustryType,
    services: string[] = [],
    docInsights: string = ""
  ): Promise<DiagnosticQuestion[]> {
    try {
      const { data, error } = await supabase.functions.invoke('extractor', {
        body: {
          industry,
          selectedServices: services,
          docInsights
        }
      });

      if (error) throw error;
      if (!data?.questions) throw new Error("Invalid format from Extractor Agent");

      return data.questions as DiagnosticQuestion[];
    } catch (error) {
      console.error("Extractor Function Error:", error);
      // Fallback
      return [
        { 
          id: "fb_1", 
          category: 'priority',
          title: "What is your main focus?", 
          context_reasoning: "We couldn't reach the Extractor agent.",
          options: [
            { id: "o1", label: "More Revenue", mapped_system_id: "lead_gen", pain_point_tag: "Growth" },
            { id: "o2", label: "Efficiency", mapped_system_id: "crm_autopilot", pain_point_tag: "Time" }
          ]
        }
      ];
    }
  },
};
