
import React from 'react';
import { CheckCircle, AlertTriangle, Activity } from 'lucide-react';
import { AppState, Task } from '../../types';

interface OverviewProps {
  state: AppState;
  tasks: Task[];
}

export const Overview: React.FC<OverviewProps> = ({ state, tasks }) => {
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const totalTasks = tasks.length || 1; // avoid divide by zero
  const progress = Math.round((completedTasks / totalTasks) * 100);
  
  const highPriorityCount = tasks.filter(t => t.priority === 'high' && t.status !== 'done').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      {/* Welcome Block */}
      <div className="md:col-span-3 bg-white border border-sun-border p-8 rounded-sm shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="font-serif text-3xl mb-2">Welcome, {state.data.businessName}</h1>
          <p className="text-sun-secondary font-light max-w-2xl">
            Your execution engine is active. We are currently in <strong>{state.aiState.roadmap[0]?.phaseName || 'Phase 1'}</strong>.
            You have {highPriorityCount} high-priority tasks pending.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Activity size={100} />
        </div>
      </div>

      {/* KPI Blocks */}
      <div className="bg-sun-right border border-sun-border p-6 rounded-sm h-48 flex flex-col justify-between group hover:border-sun-accent/30 transition-colors">
        <div className="flex justify-between items-start">
          <span className="text-xs uppercase tracking-widest text-sun-muted font-semibold">Active Systems</span>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
        <div>
          <div className="text-3xl font-serif font-medium mb-1">{state.data.selectedSystems.length}</div>
          <div className="text-sm text-sun-secondary">Modules Deployed</div>
        </div>
      </div>

      <div className="bg-sun-right border border-sun-border p-6 rounded-sm h-48 flex flex-col justify-between group hover:border-sun-accent/30 transition-colors">
         <div className="flex justify-between items-start">
          <span className="text-xs uppercase tracking-widest text-sun-muted font-semibold">Implementation</span>
          <span className="text-xs bg-sun-border px-2 py-1 rounded-full">{progress}% Done</span>
        </div>
         <div>
           {/* Mini Progress Bar */}
           <div className="w-full h-1 bg-sun-border rounded-full mb-3 overflow-hidden">
             <div className="h-full bg-sun-primary transition-all duration-500" style={{ width: `${progress}%` }}></div>
           </div>
          <div className="text-3xl font-serif font-medium mb-1">{totalTasks - completedTasks}</div>
          <div className="text-sm text-sun-secondary">Tasks Remaining</div>
        </div>
      </div>

      <div className="bg-sun-right border border-sun-border p-6 rounded-sm h-48 flex flex-col justify-between group hover:border-sun-accent/30 transition-colors">
         <div className="flex justify-between items-start">
          <span className="text-xs uppercase tracking-widest text-sun-muted font-semibold">AI Readiness</span>
        </div>
         <div>
          <div className="text-3xl font-serif font-medium mb-1 text-sun-accent">
            {state.aiState.readinessAnalysis.score > 0 ? state.aiState.readinessAnalysis.score : 0}%
          </div>
          <div className="text-sm text-sun-secondary">
            {state.aiState.readinessAnalysis.score > 70 ? 'Optimized for Scale' : 'Needs Foundation'}
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="md:col-span-2 bg-white border border-sun-border p-6 rounded-sm">
        <h3 className="font-serif text-lg mb-6">Strategic Activity Feed</h3>
        <div className="space-y-6">
          <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-sun-primary text-white flex items-center justify-center shrink-0 border border-sun-border">
                <CheckCircle size={14} />
              </div>
              <div>
                <p className="text-sm text-sun-primary font-medium">Project Workspace Initialized</p>
                <p className="text-xs text-sun-muted">Just now</p>
              </div>
          </div>
          {state.aiState.readinessAnalysis.risks.length > 0 && (
             <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                <AlertTriangle size={14} />
              </div>
              <div>
                <p className="text-sm text-sun-primary font-medium">Critical Risk Identified: {state.aiState.readinessAnalysis.risks[0]}</p>
                <p className="text-xs text-sun-muted">During Readiness Check</p>
              </div>
            </div>
          )}
           {state.aiState.readinessAnalysis.wins.map((win, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-sun-right flex items-center justify-center shrink-0 border border-sun-border">
                <span className="text-xs font-serif italic">AI</span>
              </div>
              <div>
                <p className="text-sm text-sun-primary font-medium">Quick Win Opportunity: {win}</p>
                <p className="text-xs text-sun-muted">Analyst Recommendation</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
       {/* Sidebar Context */}
       <div className="md:col-span-1 bg-sun-right border border-sun-border p-6 rounded-sm">
          <h3 className="font-serif text-lg mb-4">Focus</h3>
          <p className="text-sm text-sun-secondary mb-4">
            The Orchestrator Agent has broken down your roadmap into <strong>{tasks.length} actionable tasks</strong>.
          </p>
          <p className="text-sm text-sun-secondary">
             Prioritize "High" priority items in the Tasks tab to maintain the implementation timeline.
          </p>
       </div>
    </div>
  );
};
