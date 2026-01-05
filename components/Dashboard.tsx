import React, { useState } from 'react';
import { LayoutDashboard, CheckSquare, Calendar, Settings, Database, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = [
    { name: 'Overview', icon: <LayoutDashboard size={16} /> },
    { name: 'Roadmap', icon: <Calendar size={16} /> },
    { name: 'Tasks', icon: <CheckSquare size={16} /> },
    { name: 'Systems', icon: <Database size={16} /> },
    { name: 'Settings', icon: <Settings size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-sun-bg flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-sun-border bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-serif text-xl font-bold tracking-tight text-sun-primary">Sun AI Agency</div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-sun-accent/10 flex items-center justify-center text-sun-accent text-xs font-bold">
              JS
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-sun-border mb-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.name
                  ? 'text-sun-primary border-b-2 border-sun-accent'
                  : 'text-sun-muted hover:text-sun-primary'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Placeholder Content Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          {/* Welcome Block */}
          <div className="md:col-span-3 bg-white border border-sun-border p-8 rounded-sm shadow-sm">
            <h1 className="font-serif text-3xl mb-2">Welcome to your dashboard</h1>
            <p className="text-sun-secondary font-light max-w-2xl">
              Your custom 30-day AI implementation plan is ready. Review your first week's tasks to get started.
            </p>
          </div>

          {/* KPI Blocks */}
          <div className="bg-sun-right border border-sun-border p-6 rounded-sm h-48 flex flex-col justify-between group cursor-pointer hover:border-sun-accent/30 transition-colors">
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase tracking-widest text-sun-muted font-semibold">System Status</span>
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
            <div>
              <div className="text-3xl font-serif font-medium mb-1">Active</div>
              <div className="text-sm text-sun-secondary">Data pipelines connected</div>
            </div>
          </div>

          <div className="bg-sun-right border border-sun-border p-6 rounded-sm h-48 flex flex-col justify-between group cursor-pointer hover:border-sun-accent/30 transition-colors">
             <div className="flex justify-between items-start">
              <span className="text-xs uppercase tracking-widest text-sun-muted font-semibold">Pending Tasks</span>
              <span className="text-xs bg-sun-border px-2 py-1 rounded-full">3 New</span>
            </div>
             <div>
              <div className="text-3xl font-serif font-medium mb-1">Setup</div>
              <div className="text-sm text-sun-secondary">Week 1 Configuration</div>
            </div>
          </div>

          <div className="bg-sun-right border border-sun-border p-6 rounded-sm h-48 flex flex-col justify-between group cursor-pointer hover:border-sun-accent/30 transition-colors">
             <div className="flex justify-between items-start">
              <span className="text-xs uppercase tracking-widest text-sun-muted font-semibold">AI Readiness</span>
            </div>
             <div>
              <div className="text-3xl font-serif font-medium mb-1 text-sun-accent">78%</div>
              <div className="text-sm text-sun-secondary">Optimized for growth</div>
            </div>
          </div>

          {/* Large Graph Placeholder */}
          <div className="md:col-span-2 bg-white border border-sun-border p-8 rounded-sm h-80 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 grid grid-cols-12 gap-4 opacity-5 pointer-events-none">
                {[...Array(12)].map((_, i) => <div key={i} className="h-full w-full bg-sun-primary"></div>)}
             </div>
             <div className="text-center">
               <div className="mb-4 text-sun-tertiary">Performance Analytics Module</div>
               <Button variant="outline" className="mx-auto">Connect Data Source</Button>
             </div>
          </div>

          {/* Activity Feed Placeholder */}
          <div className="bg-white border border-sun-border p-6 rounded-sm h-80">
            <h3 className="font-serif text-lg mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-sun-right flex items-center justify-center shrink-0 border border-sun-border">
                    <span className="text-xs font-serif italic">AI</span>
                  </div>
                  <div>
                    <p className="text-sm text-sun-primary font-medium">System analysis completed</p>
                    <p className="text-xs text-sun-muted">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};