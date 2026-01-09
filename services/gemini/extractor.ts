
import { supabase } from "../supabase";
import { DiagnosticSection, IndustryType } from "../../types";
import { getIndustryPack } from "../../data/industryPacks";
import { retryWithBackoff } from "../../utils/retry";

export const extractor = {
  async generateQuestions(
    industry: IndustryType,
    services: string[] = [],
    docInsights: string = ""
  ): Promise<DiagnosticSection[]> {
    try {
      // Use retry utility for robust Edge Function calls
      const data = await retryWithBackoff(async () => {
        const { data, error } = await supabase.functions.invoke('extractor', {
          body: {
            industry,
            selectedServices: services,
            docInsights
          }
        });

        if (error) throw error;
        
        // Validation: Ensure we got a valid array of sections
        if (data && data.sections && Array.isArray(data.sections) && data.sections.length > 0) {
            return data;
        }
        throw new Error("Invalid format from Extractor Agent");
      });

      return data.sections as DiagnosticSection[];

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

      return [];
    }
  },
};
