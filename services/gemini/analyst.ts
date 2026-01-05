import { ai } from "./client";
import { Type, Schema } from "@google/genai";

const MODEL_NAME = "gemini-3-flash-preview";

export interface BusinessClassification {
  industry: 'saas' | 'fashion' | 'real_estate' | 'tourism' | 'other';
  confidence: number;
  summary: string;
  verified: boolean;
}

export const analyst = {
  /**
   * Streams intelligence notes about the business using Google Search.
   */
  async *analyzeBusinessStream(name: string, website: string) {
    try {
      const response = await ai.models.generateContentStream({
        model: MODEL_NAME,
        contents: `Analyze this business: ${name} ${website ? `(${website})` : ''}. 
        
        Provide 3 brief, high-value bullet points summarizing their:
        1. Business Model
        2. Primary Market / Audience
        3. Key Value Proposition
        
        Keep it professional, concise, and insightful. Focus on facts found via search.`,
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
      yield "Unable to verify business details at this moment. Proceeding with manual entry.";
    }
  },

  /**
   * Classifies the business into a specific industry category.
   */
  async classifyBusiness(name: string, website: string, description: string): Promise<BusinessClassification> {
    try {
      const schema: Schema = {
        type: Type.OBJECT,
        properties: {
          industry: {
            type: Type.STRING,
            enum: ['saas', 'fashion', 'real_estate', 'tourism', 'other'],
            description: "The most fitting industry category for the business."
          },
          confidence: {
            type: Type.NUMBER,
            description: "Confidence score between 0 and 1."
          },
          summary: {
            type: Type.STRING,
            description: "A one-sentence summary of what the business does."
          },
          verified: {
            type: Type.BOOLEAN,
            description: "True if the business appears to be a real, operating entity."
          }
        },
        required: ["industry", "confidence", "summary", "verified"]
      };

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `Classify this business based on the following info:
        Name: ${name}
        Website: ${website}
        User Description: ${description}
        
        Determine the industry, confidence level, and verification status.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
        }
      });

      if (response.text) {
        return JSON.parse(response.text) as BusinessClassification;
      }
      
      throw new Error("No JSON response received");
    } catch (error) {
      console.error("Analyst Classification Error:", error);
      return {
        industry: 'other',
        confidence: 0,
        summary: '',
        verified: false
      };
    }
  }
};
