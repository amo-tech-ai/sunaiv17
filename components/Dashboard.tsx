
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, CheckSquare, Calendar, Settings, Database, LogOut, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { AppState, SYSTEMS, Task } from '../types';
import { Overview } from './dashboard/Overview';
import { TaskBoard } from './dashboard/TaskBoard';
import { orchestrator } from '../services/gemini/orchestrator';

interface DashboardProps {
  state: AppState;
  onReset: () => void;
  updateDashboardState: (tasks: Task[]) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ state, onReset, updateDashboardState }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [loadingTasks, setLoadingTasks] = useState(false);

  // Initialize Tasks if empty
  useEffect(() => {
    if (!state.dashboardState?.initialized && state.aiState.roadmap.length > 0) {
      const initDashboard = async () => {
        setLoadingTasks(true);
        const generatedTasks = await orchestrator.generateTasks(state.aiState.roadmap, state.data.industry);
        updateDashboardState(generatedTasks);
        setLoadingTasks(false);
      };
      initDashboard();
    }
  }, []);

  const handleUpdateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    const updatedTasks = state.dashboardState.tasks.map(t => 
      t.id === taskId ? { ...t, status: newStatus } : t
    );
    updateDashboardState(updatedTasks);
  };

  const tabs = [
    { name: 'Overview', icon: <LayoutDashboard size={16} /> },
    { name: 'Roadmap', icon: <Calendar size={16} /> },
    { name: 'Tasks', icon: <CheckSquare size={16} /> },
    { name: 'Systems', icon: <Database size={16} /> },
    { name: 'Settings', icon: <Settings size={16} /> },
  ];

  const renderContent = () => {
    if (loadingTasks && activeTab === 'Tasks') {
      return (
        <div className="h-96 flex flex-col items-center justify-center text-sun-secondary animate-fade-in">
          <Loader2 size={40} className="animate-spin text-sun-accent mb-4" />
          <h3 className="font-serif text-xl">The Orchestrator is organizing your workspace...</h3>
          <p className="text-sm mt-2">Breaking down roadmap into actionable tasks.</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'Overview':
        return <Overview state={state} tasks={state.dashboardState.tasks} />;
        
      case 'Tasks':
        return <TaskBoard tasks={state.dashboardState.tasks} onUpdateTaskStatus={handleUpdateTaskStatus} />;

      case 'Roadmap':
        return (
           <div className="bg-white border border-sun-border p-8 rounded-sm animate-fade-in">
              <h2 className="font-serif text-2xl mb-6">Execution Roadmap</h2>
              {state.aiState.roadmap.length > 0 ? (
                <div className="space-y-8">
                  {state.aiState.roadmap.map((phase, i) => (
                    <div key={i} className="border-l-2 border-sun-accent pl-6 pb-6 relative">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-sun-bg border-2 border-sun-accent" />
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-lg font-bold text-sun-primary">{phase.phaseName}</h3>
                        <span className="text-xs uppercase tracking-widest text-sun-muted">{phase.duration}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3 mt-4">
                        {phase.items.map((item, idx) => (
                          <div key={idx} className="bg-sun-right p-3 text-sm text-sun-secondary rounded-sm border border-sun-border/50">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-sun-muted">No roadmap generated yet.</div>
              )}
           </div>
        );

      case 'Systems':
        return (
          <div className="bg-white border border-sun-border p-8 rounded-sm animate-fade-in">
             <h2 className="font-serif text-2xl mb-6">Active Systems</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {state.data.selectedSystems.map(sysId => {
                   const sys = SYSTEMS.find(s => s.id === sysId);
                   const impact = state.aiState.recommendations.impacts[sysId];
                   return (
                     <div key={sysId} className="border border-sun-border p-6 rounded-sm">
                        <div className="flex justify-between items-start mb-4">
                           <h3 className="font-bold text-lg">{sys?.title}</h3>
                           <span className="bg-green-100 text-green-800 text-[10px] uppercase font-bold px-2 py-1 rounded-full">Active</span>
                        </div>
                        <p className="text-sm text-sun-secondary mb-4">{sys?.description}</p>
                        <div className="text-xs bg-sun-right p-3 rounded-sm text-sun-tertiary">
                           <strong>ROI Target:</strong> {impact || sys?.revenueImpact}
                        </div>
                     </div>
                   );
                })}
             </div>
          </div>
        );

      case 'Settings':
        return (
          <div className="bg-white border border-sun-border p-8 rounded-sm animate-fade-in text-center py-24 text-sun-muted">
            Settings module coming in Phase 3.
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-sun-bg flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-sun-border bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-serif text-xl font-bold tracking-tight text-sun-primary">Sun AI Agency</div>
          <div className="flex items-center gap-4">
             <Button variant="ghost" onClick={onReset} className="text-xs flex items-center gap-2">
                <LogOut size={14} /> Reset Wizard
             </Button>
            <div className="h-8 w-8 rounded-full bg-sun-accent/10 flex items-center justify-center text-sun-accent text-xs font-bold">
              {state.data.businessName.substring(0, 2).toUpperCase() || 'AI'}
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

        {renderContent()}

      </main>
    </div>
  );
};
