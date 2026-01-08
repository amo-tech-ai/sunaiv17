
import { useState, useEffect } from 'react';
import { AnalyticsData } from '../types';

const MOCK_ANALYTICS: AnalyticsData = {
  revenue: [
    { date: 'Jan', value: 45000 },
    { date: 'Feb', value: 52000 },
    { date: 'Mar', value: 48000 },
    { date: 'Apr', value: 61000 },
    { date: 'May', value: 55000 },
    { date: 'Jun', value: 67000 },
  ],
  clients: [
    { month: 'Jan', active: 12, new: 2 },
    { month: 'Feb', active: 14, new: 3 },
    { month: 'Mar', active: 16, new: 2 },
    { month: 'Apr', active: 19, new: 4 },
    { month: 'May', active: 22, new: 3 },
    { month: 'Jun', active: 25, new: 4 },
  ],
  team: [
    { name: 'Sarah', capacity: 85, performance: 92 },
    { name: 'Mike', capacity: 60, performance: 88 },
    { name: 'Jessica', capacity: 95, performance: 96 },
    { name: 'David', capacity: 40, performance: 75 },
  ],
  summary: {
    totalRevenue: 328000,
    activeClients: 25,
    teamCapacity: 70,
    revenueGrowth: 15
  },
  insights: [
    "Fashion industry clients have 20% higher LTV than other segments.",
    "Team capacity forecast indicates need for 1 new hire in Design by Q3.",
    "Revenue growth correlates strongly with 'CRM Autopilot' adoption."
  ]
};

export const useAnalytics = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(MOCK_ANALYTICS);
      setLoading(false);
    }, 1000);
  }, []);

  return {
    data,
    loading
  };
};
