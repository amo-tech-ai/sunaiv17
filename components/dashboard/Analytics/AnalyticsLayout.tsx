
import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../../../hooks/useAnalytics';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { Loader2, TrendingUp, PieChart, Download, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '../../Button';
import { supabase } from '../../../services/supabase';

export const AnalyticsLayout: React.FC = () => {
  const { data, loading } = useAnalytics();
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [aiHeadline, setAiHeadline] = useState<string>("");
  const [aiLoading, setAiLoading] = useState(false);

  // Trigger AI analysis when data is loaded
  useEffect(() => {
    if (data && !aiLoading && aiInsights.length === 0) {
      generateInsights();
    }
  }, [data]);

  const generateInsights = async () => {
    if (!data) return;
    
    setAiLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke('analytics', {
        body: { 
          metrics: {
            revenue: data.summary.totalRevenue,
            clients: data.summary.activeClients,
            growth: data.summary.revenueGrowth,
            capacity: data.summary.teamCapacity
          },
          type: 'general' 
        }
      });

      if (error) throw error;

      if (result) {
        setAiInsights(result.insights || []);
        setAiHeadline(result.headline || "Strategic Analysis");
      }
    } catch (e) {
      console.error("AI Analytics Error", e);
    } finally {
      setAiLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (!data) return;

    // Flatten data for CSV
    const rows = [
      ['Date', 'Revenue'],
      ...data.revenue.map(r => [r.date, r.value])
    ];

    const csvContent = "data:text/csv;charset=utf-8," 
        + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sun_ai_analytics_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-140px)]">
        <Loader2 className="animate-spin text-sun-muted" size={32} />
      </div>
    );
  }

  // Use fallback insights if AI hasn't run or failed, but prioritize AI
  const displayInsights = aiInsights.length > 0 ? aiInsights : data.insights;

  return (
    <div className="flex h-[calc(100vh-140px)] border border-sun-border rounded-sm overflow-hidden bg-white animate-fade-in">
      
      {/* Left Panel: Summary Stats */}
      <div className="w-[20%] border-r border-sun-border bg-sun-bg p-6 hidden md:flex flex-col gap-8 overflow-y-auto">
        <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-sun-muted mb-4">Performance</h3>
            <div className="space-y-6">
                <div>
                    <div className="text-sm text-sun-secondary mb-1">Total Revenue</div>
                    <div className="text-2xl font-serif text-sun-primary">${data.summary.totalRevenue.toLocaleString()}</div>
                    <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <TrendingUp size={12} /> +{data.summary.revenueGrowth}% vs last mo
                    </div>
                </div>
                <div>
                    <div className="text-sm text-sun-secondary mb-1">Active Clients</div>
                    <div className="text-2xl font-serif text-sun-primary">{data.summary.activeClients}</div>
                </div>
                <div>
                    <div className="text-sm text-sun-secondary mb-1">Team Capacity</div>
                    <div className="text-2xl font-serif text-sun-primary">{data.summary.teamCapacity}%</div>
                    <div className="h-1.5 w-full bg-sun-border rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-sun-accent" style={{ width: `${data.summary.teamCapacity}%` }} />
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Center Panel: Charts */}
      <div className="w-full md:w-[50%] flex flex-col bg-white overflow-y-auto">
        <div className="p-6 border-b border-sun-border flex justify-between items-center">
            <h2 className="font-serif text-xl text-sun-primary">Revenue Trend</h2>
            <Button variant="outline" className="h-8 text-xs gap-2" onClick={handleExportCSV}>
              <Download size={14} /> Export CSV
            </Button>
        </div>
        
        <div className="p-6 border-b border-sun-border">
            <div className="h-64 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.revenue}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFE9E4" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#F59E0B" fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="p-6">
            <h2 className="font-serif text-xl text-sun-primary mb-4">Team Performance</h2>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.team} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#EFE9E4" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="performance" name="Performance Score" fill="#1A1A1A" barSize={20} radius={[0, 4, 4, 0]} />
                        <Bar dataKey="capacity" name="Capacity Used %" fill="#D1C7BD" barSize={20} radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      {/* Right Panel: Analytics Agent */}
      <div className="w-full md:w-[30%] border-l border-sun-border bg-sun-right overflow-hidden flex flex-col">
        <div className="p-6 border-b border-sun-border bg-white/50 backdrop-blur-sm flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-sun-muted">
              <PieChart size={12} className="text-sun-accent" />
              Analytics Agent
            </div>
            <h2 className="font-serif text-xl text-sun-primary">{aiHeadline || "Strategic Insights"}</h2>
          </div>
          <button 
            onClick={generateInsights} 
            disabled={aiLoading}
            className="p-2 hover:bg-sun-bg rounded-full text-sun-tertiary transition-colors"
            title="Refresh Analysis"
          >
            <RefreshCw size={16} className={aiLoading ? "animate-spin" : ""} />
          </button>
        </div>
        
        <div className="p-6 space-y-6 overflow-y-auto">
            {aiLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-sun-muted gap-3">
                    <Sparkles className="animate-pulse text-sun-accent" size={24} />
                    <span className="text-sm font-medium">Analyzing revenue patterns...</span>
                </div>
            ) : (
                <>
                    {displayInsights.map((insight, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-sm border border-sun-border shadow-sm animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-sun-muted mb-2">Observation {idx + 1}</div>
                            <p className="text-sm text-sun-secondary leading-relaxed">{insight}</p>
                        </div>
                    ))}
                    
                    <div className="bg-sun-primary text-white p-5 rounded-sm animate-fade-in" style={{ animationDelay: '400ms' }}>
                        <div className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Recommendation</div>
                        <p className="text-sm leading-relaxed">
                            {displayInsights.length > 0 
                                ? "Focus on converting the recent influx of leads to stabilize revenue growth." 
                                : "Based on the high performance of the Design team but low capacity, consider hiring a junior designer to offload production tasks and maintain quality."}
                        </p>
                    </div>
                </>
            )}
        </div>
      </div>
    </div>
  );
};
