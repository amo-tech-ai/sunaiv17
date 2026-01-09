
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { AnalyticsData } from '../types';
import { useAuth } from './useAuth';

export const useAnalytics = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchAnalytics = async () => {
    if (!user) return;
    setLoading(true);
    
    try {
      // 1. Fetch Invoices for Revenue
      const { data: invoices } = await supabase
        .from('invoices')
        .select('amount, status, created_at')
        .eq('org_id', user.id);

      // 2. Fetch Clients
      const { data: clients } = await supabase
        .from('crm_contacts') 
        .select('status, created_at')
        .eq('org_id', user.id);

      // 3. Fetch Projects
      const { data: projects } = await supabase
        .from('projects')
        .select('value, status')
        .eq('user_id', user.id);

      // PROCESS REVENUE (Last 6 Months)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const today = new Date();
      const revenueData = [];
      
      for (let i = 5; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const monthLabel = months[d.getMonth()];
        const monthRevenue = invoices
          ?.filter((inv: any) => {
             const invDate = new Date(inv.created_at);
             return invDate.getMonth() === d.getMonth() && invDate.getFullYear() === d.getFullYear() && inv.status === 'paid';
          })
          .reduce((sum: number, inv: any) => sum + (inv.amount || 0), 0) || 0;
        
        revenueData.push({ date: monthLabel, value: monthRevenue });
      }

      // SUMMARIES
      const totalRevenue = invoices
        ?.filter((i: any) => i.status === 'paid')
        .reduce((sum: number, i: any) => sum + (i.amount || 0), 0) || 0;

      const activeClients = clients?.filter((c: any) => c.status === 'active').length || 0;
      
      // Calculate growth (simple prev month comparison logic placeholder)
      const revenueGrowth = 12; // Placeholder for now, would need last month vs this month logic

      // Mock Team Data (until team_members table is fully populated with perf metrics)
      const teamData = [
          { name: 'Team A', capacity: 100, performance: 85 },
          { name: 'AI Agents', capacity: 1000, performance: 99 },
      ];

      setData({
          revenue: revenueData,
          clients: [
              { month: 'Current', active: activeClients, new: 0 }, 
          ],
          team: teamData,
          summary: {
              totalRevenue: totalRevenue,
              activeClients: activeClients,
              teamCapacity: 75, // Placeholder
              revenueGrowth: revenueGrowth
          },
          insights: [
              `Generated $${totalRevenue.toLocaleString()} in total verified revenue.`,
              `${activeClients} active clients currently managed in CRM.`,
              `${projects?.length || 0} total projects tracked in the system.`
          ]
      });

    } catch (err) {
      console.error("Analytics Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();

    if (!user) return;

    const channel = supabase
      .channel('analytics_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'invoices' }, fetchAnalytics)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'crm_contacts' }, fetchAnalytics)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    data,
    loading
  };
};
