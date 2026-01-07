
import { ai } from "./client";
import { Type, Schema } from "@google/genai";
import { BusinessAnalysis } from "../../types";

const MODEL_NAME = "gemini-3-flash-preview";

export const analyst = {
  /**
   * Core Prompt: Business Research
   * Purpose: Generate comprehensive business intelligence through Google Search.
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
        - Use industry-specific search queries (e.g. search for reviews, pricing, business model).
        - Stream observations in real-time for transparency.
        - Be honest about what you find and what you don't know.
        - Use natural business language, avoid AI jargon.
        - Structure the output as a streaming narrative with bullet points for key findings.
        
        Start with "Analyzing digital footprint for ${name}..."
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
      yield "Unable to verify business details via Search. Proceeding with internal analysis based on provided text.";
    }
  },

  /**
   * Core Prompt: Industry Classification
   * Purpose: Accurately classify business into supported industry vertical.
   */
  async classifyBusiness(name: string, website: string, description: string): Promise<BusinessAnalysis> {
    try {
      const schema: Schema = {
        type: Type.OBJECT,
        properties: {
          detected_industry: {
            type: Type.STRING,
            enum: ['saas', 'fashion', 'real_estate', 'tourism', 'other'],
            description: "The most fitting industry category."
          },
          industry_confidence: {
            type: Type.NUMBER,
            description: "Confidence score between 0 and 100."
          },
          business_model: {
            type: Type.STRING,
            description: "Specific model e.g., 'Premium DTC Fashion', 'Commercial Brokerage', 'B2B SaaS'."
          },
          maturity_score: {
            type: Type.INTEGER,
            description: "Digital maturity from 1 (Manual/Legacy) to 5 (Fully Automated/Tech-Native).",
          },
          industry_signals: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Specific evidence found (e.g., 'Uses Shopify', 'High social traffic', 'Manual lead forms')."
          },
          observations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Key strategic observations about revenue leaks or opportunities."
          },
          verified: {
            type: Type.BOOLEAN,
            description: "True if the business was successfully verified via search."
          }
        },
        required: [
          "detected_industry", 
          "industry_confidence", 
          "business_model", 
          "maturity_score", 
          "industry_signals", 
          "observations",
          "verified"
        ]
      };

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `
        System context: Industry classification specialist.
        Task: Classify business into one of supported industries and assess maturity.
        Input: Name: ${name}, Website: ${website}, User Description: ${description}.
        
        Key Instructions:
        1. Match against supported industry packs:
           - Fashion (DTC, Retail)
           - Real Estate (Brokerage, Property Management)
           - Tourism (Tours, Experiences)
           - SaaS (B2B, Startup)
           - Other (General)
        2. Provide confidence score (high if clear match, medium if uncertain).
        3. Estimate Digital Maturity (1-5) based on tech stack hints and online presence.
        4. Identify specific industry signals (e.g. "Cart functionality" -> Fashion, "Booking engine" -> Tourism).
        `,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
          // Using Search to back up the classification if website is provided
          tools: website ? [{ googleSearch: {} }] : undefined,
        }
      });

      if (response.text) {
        return JSON.parse(response.text) as BusinessAnalysis;
      }
      
      throw new Error("No JSON response received");
    } catch (error) {
      console.error("Analyst Classification Error:", error);
      // Fallback safe default
      return {
        detected_industry: 'other',
        industry_confidence: 0,
        business_model: 'Unidentified',
        maturity_score: 1,
        industry_signals: [],
        observations: ["Could not verify details automatically."],
        verified: false
      };
    }
  }
};
