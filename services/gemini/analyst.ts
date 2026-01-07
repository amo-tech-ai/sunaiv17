
import { supabase } from "../supabase";
import { BusinessAnalysis, UploadedDocument } from "../../types";

const getAnonKey = () => (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';
const getFunctionUrl = (name: string) => {
    const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://necxcwhuzylsumlkkmlk.supabase.co';
    return `${supabaseUrl}/functions/v1/${name}`;
}

export const analyst = {
  /**
   * Core Prompt: Business Research
   * Streaming via Edge Function
   */
  async *analyzeBusinessStream(name: string, website: string) {
    try {
      const response = await fetch(getFunctionUrl('analyst'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAnonKey()}`
        },
        body: JSON.stringify({
          mode: 'research',
          businessName: name,
          website
        })
      });

      if (!response.ok) throw new Error('Stream request failed');
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        yield decoder.decode(value, { stream: true });
      }
    } catch (error) {
      console.error("Analyst Stream Error:", error);
      yield "Unable to connect to Analyst Agent. Using offline analysis...";
    }
  },

  /**
   * Core Prompt: Document Analysis
   * Migrated to Edge Function to handle file processing securely
   */
  async analyzeDocuments(documents: UploadedDocument[]): Promise<string> {
    if (documents.length === 0) return "";

    try {
      // Prepare documents for Edge Function
      const payload = documents.map(doc => ({
        name: doc.name,
        mimeType: doc.type,
        base64: doc.base64,
        textContent: doc.content
      }));

      const { data, error } = await supabase.functions.invoke('analyst', {
        body: {
          mode: 'summarize_docs',
          documents: payload
        }
      });

      if (error) throw error;
      return data?.summary || "No insights extracted.";
    } catch (error) {
      console.error("Document Analysis Error:", error);
      return "Error analyzing documents via Edge Function.";
    }
  },

  /**
   * Core Prompt: Industry Classification
   * Edge Function
   */
  async classifyBusiness(
    name: string, 
    website: string, 
    description: string, 
    services: string[] = [], 
    docInsights: string = ""
  ): Promise<BusinessAnalysis> {
    try {
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
