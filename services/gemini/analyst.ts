
import { ai } from "./client"; // Kept for streaming (temporary) and doc analysis until full migration
import { supabase } from "../supabase";
import { BusinessAnalysis, UploadedDocument } from "../../types";

const MODEL_NAME = "gemini-3-flash-preview";

export const analyst = {
  /**
   * Core Prompt: Business Research
   * Currently keeps streaming local for UI responsiveness, 
   * but should eventually move to a streaming Edge Function.
   */
  async *analyzeBusinessStream(name: string, website: string) {
    try {
      const response = await ai.models.generateContentStream({
        model: MODEL_NAME,
        contents: `
        System context: Role as senior business analyst.
        Task: Research and verify business, detect industry, assess maturity.
        Input: Company: "${name}", URL: "${website}".
        
        Key Instructions:
        - Verify business existence before making claims.
        - Use industry-specific search queries.
        - Stream observations in real-time.
        - Start with "Analyzing digital footprint for ${name}..."
        `,
        config: {
          tools: [{ googleSearch: {} }],
        }
      });

      for await (const chunk of response) {
        if (chunk.text) {
          yield chunk.text;
        }
      }
    } catch (error) {
      console.error("Analyst Stream Error:", error);
      yield "Unable to verify details via Search. Using internal analysis...";
    }
  },

  /**
   * Core Prompt: Document Analysis
   * Remains client-side for now to handle large file buffers without Edge limits,
   * but uses the secure client wrapper.
   */
  async analyzeDocuments(documents: UploadedDocument[]): Promise<string> {
    if (documents.length === 0) return "";

    try {
      const parts = [];
      
      parts.push({
        text: `Analyze the attached business documents. Extract key insights about:
        1. Business Model & Strategy
        2. Current Challenges or Goals
        
        Provide a concise summary to help tailor a consulting engagement.`
      });

      for (const doc of documents) {
        if (doc.base64) {
          if (doc.type === 'application/pdf' || doc.type.startsWith('image/')) {
             parts.push({
              inlineData: {
                mimeType: doc.type,
                data: doc.base64
              }
            });
          } else if (doc.type.startsWith('text/') && doc.content) {
             parts.push({
               text: `Document: ${doc.name}\nContent:\n${doc.content}`
             });
          }
        }
      }

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: { parts },
      });

      return response.text || "No insights could be extracted.";
    } catch (error) {
      console.error("Document Analysis Error:", error);
      return "Error analyzing documents.";
    }
  },

  /**
   * Core Prompt: Industry Classification
   * MIGRATED TO EDGE FUNCTION for security and consistent environment.
   */
  async classifyBusiness(
    name: string, 
    website: string, 
    description: string, 
    services: string[] = [], 
    docInsights: string = ""
  ): Promise<BusinessAnalysis> {
    try {
      // Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('analyst', {
        body: {
          businessName: name,
          website: website,
          description: description,
          selectedServices: services,
          docInsights: docInsights
        }
      });

      if (error) throw error;
      if (!data) throw new Error("No data returned from Analyst agent");

      return data as BusinessAnalysis;

    } catch (error) {
      console.error("Analyst Edge Function Error:", error);
      // Fallback safe default if Edge Function fails or keys missing
      return {
        detected_industry: 'other',
        industry_confidence: 0,
        business_model: 'Unidentified (Offline Analysis)',
        maturity_score: 1,
        industry_signals: [],
        observations: ["Could not verify details automatically via Edge Agent."],
        verified: false
      };
    }
  }
};
