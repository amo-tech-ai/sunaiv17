
import React from 'react';
import { useAnalytics } from '../../../hooks/useAnalytics';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { Loader2, TrendingUp, Users, PieChart } from 'lucide-react';

export const AnalyticsLayout: React.FC = () => {
  const { data, loading } = useAnalytics();

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-140px)]">
        <Loader2 className="animate-spin text-sun-muted" size={32} />
      </div>
    );
  }

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
        <div className="p-6 border-b border-sun-border">
            <h2 className="font-serif text-xl text-sun-primary">Revenue Trend</h2>
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
        <div className="p-6 border-b border-sun-border bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-sun-muted">
            <PieChart size={12} className="text-sun-accent" />
            Analytics Agent
          </div>
          <h2 className="font-serif text-xl text-sun-primary">Strategic Insights</h2>
        </div>
        
        <div className="p-6 space-y-6 overflow-y-auto">
            {data.insights.map((insight, idx) => (
                <div key={idx} className="bg-white p-4 rounded-sm border border-sun-border shadow-sm">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-sun-muted mb-2">Observation {idx + 1}</div>
                    <p className="text-sm text-sun-secondary leading-relaxed">{insight}</p>
                </div>
            ))}
            
            <div className="bg-sun-primary text-white p-5 rounded-sm">
                <div className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Recommendation</div>
                <p className="text-sm leading-relaxed">
                    Based on the high performance of the Design team but low capacity, consider hiring a junior designer to offload production tasks and maintain quality.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};
