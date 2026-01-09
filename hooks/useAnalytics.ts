
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
      const [invoicesRes, clientsRes, projectsRes] = await Promise.all([
          supabase.from('invoices').select('amount, status, created_at').eq('org_id', user.id),
          supabase.from('clients').select('status, created_at').eq('org_id', user.id),
          supabase.from('projects').select('value, status').eq('user_id', user.id),
      ]);

      const revenueData = [
          { date: 'Jan', value: 0 },
          { date: 'Feb', value: 0 },
          { date: 'Mar', value: 0 },
          { date: 'Apr', value: 0 },
          { date: 'May', value: 0 },
          { date: 'Jun', value: 0 },
      ]; 

      let totalRevenue = 0;
      if (invoicesRes.data) {
          totalRevenue = invoicesRes.data
              .filter((i: any) => i.status === 'paid')
              .reduce((acc: number, curr: any) => acc + (curr.amount || 0), 0);
          
          revenueData[5].value = totalRevenue; 
      }

      const activeClients = clientsRes.data?.filter((c: any) => c.status === 'active').length || 0;
      const activeProjects = projectsRes.data?.filter((p: any) => p.status === 'Active').length || 0;

      const teamData = [
          { name: 'Me', capacity: 100, performance: 95 },
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
              teamCapacity: 85,
              revenueGrowth: 0 
          },
          insights: [
              "Data source connected.",
              activeProjects > 0 ? `${activeProjects} active projects tracked.` : "No active projects yet.",
              totalRevenue > 0 ? "Revenue flow detected." : "No revenue recorded yet."
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

    // Subscribe to Invoice changes to update Revenue live
    const channel = supabase
      .channel('analytics_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'invoices' }, () => {
        fetchAnalytics();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'clients' }, () => {
        fetchAnalytics();
      })
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
