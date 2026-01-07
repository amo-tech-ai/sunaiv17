
import { supabase } from "../supabase";

export const assistant = {
  /**
   * Analyzes an uploaded document to extract key insights and suggestions.
   */
  async analyzeDocument(documentText: string, briefContext: any) {
    try {
      const { data, error } = await supabase.functions.invoke('assistant', {
        body: { 
          task: 'analyze_document',
          content: documentText, 
          context: briefContext 
        }
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Assistant Agent Error (Document):", error);
      return { 
        summary: "Could not analyze document.", 
        key_themes: [], 
        suggestions: [] 
      };
    }
  },

  /**
   * Generates a summary and strategic recommendations based on the current Brief.
   */
  async generateBriefSummary(briefContent: string, projectContext: any) {
    try {
      const { data, error } = await supabase.functions.invoke('assistant', {
        body: { 
          task: 'summarize_brief',
          content: briefContent, 
          context: projectContext 
        }
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Assistant Agent Error (Brief):", error);
      return { 
        summary: "Could not generate summary.", 
        recommendations: [], 
        completeness_score: 0 
      };
    }
  }
};
