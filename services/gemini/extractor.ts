
import { supabase } from "../supabase";
import { DiagnosticSection, IndustryType } from "../../types";
import { getIndustryPack } from "../../data/industryPacks";

export const extractor = {
  async generateQuestions(
    industry: IndustryType,
    services: string[] = [],
    docInsights: string = ""
  ): Promise<DiagnosticSection[]> {
    try {
      // Attempt to call the AI Edge Function
      const { data, error } = await supabase.functions.invoke('extractor', {
        body: {
          industry,
          selectedServices: services,
          docInsights
        }
      });

      if (error) {
        console.warn("Extractor Edge Function failed:", error);
        throw error;
      }
      
      // Validation: Ensure we got a valid array of sections
      if (data && data.sections && Array.isArray(data.sections) && data.sections.length > 0) {
          return data.sections as DiagnosticSection[];
      }
      
      throw new Error("Invalid or empty format from Extractor Agent");

    } catch (error) {
      console.warn("Extractor Agent Offline/Error. Engaging Fallback Strategy.", error);
      
      // FALLBACK STRATEGY:
      // Load static questions from the Industry Pack so the user is never blocked.
      try {
        const pack = getIndustryPack(industry);
        if (pack && pack.fallbackQuestions && pack.fallbackQuestions.length > 0) {
            console.log("Loaded fallback questions for:", industry);
            return pack.fallbackQuestions;
        }
      } catch (fallbackError) {
        console.error("Critical: Fallback strategy also failed.", fallbackError);
      }

      // Absolute worst case: Return empty array (will trigger UI error state, but cleaner)
      return [];
    }
  },
};
