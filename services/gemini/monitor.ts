
import { supabase } from "../supabase";

export const monitor = {
  async analyzeTimeline(timelineData: any, projectContext: any) {
    try {
      const { data, error } = await supabase.functions.invoke('monitor', {
        body: { timelineData, projectContext }
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Monitor Agent Error:", error);
      return { status: 'unknown', summary: 'Analysis unavailable', risks: [] };
    }
  }
};
