
import { supabase } from "../supabase";
import { DiagnosticSection, IndustryType } from "../../types";

export const extractor = {
  async generateQuestions(
    industry: IndustryType,
    services: string[] = [],
    docInsights: string = ""
  ): Promise<DiagnosticSection[]> {
    try {
      const { data, error } = await supabase.functions.invoke('extractor', {
        body: {
          industry,
          selectedServices: services,
          docInsights
        }
      });

      if (error) throw error;
      
      // Validation: Ensure we got a valid array of sections
      if (data && data.sections) {
          return data.sections as DiagnosticSection[];
      }
      
      console.warn("Invalid format from Extractor Agent, using empty.");
      return [];
    } catch (error) {
      console.error("Extractor Agent Error:", error);
      // Return empty array to handle UI gracefully (could trigger fallback UI)
      return [];
    }
  },
};
