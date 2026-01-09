
import { supabase } from "../supabase";
import { retryWithBackoff } from "../../utils/retry";

export const analytics = {
  async generateReport(metrics: any, type: 'revenue' | 'client' | 'general' = 'general') {
    try {
      const data = await retryWithBackoff(async () => {
        const { data, error } = await supabase.functions.invoke('analytics', {
          body: { metrics, type }
        });
        if (error) throw error;
        return data;
      });
      
      return data;
    } catch (error) {
      console.error("Analytics Agent Error:", error);
      return { headline: "Data Unavailable", insights: [] };
    }
  }
};
