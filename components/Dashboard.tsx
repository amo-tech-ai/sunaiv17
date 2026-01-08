
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, CheckSquare, Calendar, Settings, Database, LogOut, Loader2, Users } from 'lucide-react';
import { Button } from './Button';
import { AppState, Task } from '../types';
import { Overview } from './dashboard/Overview';
import { TaskBoard } from './dashboard/TaskBoard';
import { RoadmapView } from './dashboard/RoadmapView';
import { SystemsView } from './dashboard/SystemsView';
import { SettingsView } from './dashboard/SettingsView';
import { CRMLayout } from './dashboard/CRM/CRMLayout';
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
    { name: 'CRM', icon: <Users size={16} /> },
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
        
      case 'CRM':
        return <CRMLayout />;

      case 'Tasks':
        return <TaskBoard tasks={state.dashboardState.tasks} onUpdateTaskStatus={handleUpdateTaskStatus} />;

      case 'Roadmap':
        return <RoadmapView roadmap={state.aiState.roadmap} />;

      case 'Systems':
        return <SystemsView selectedSystems={state.data.selectedSystems} impacts={state.aiState.recommendations.impacts} />;

      case 'Settings':
        return <SettingsView data={state.data} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-sun-bg flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-sun-border bg-white/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-serif text-xl font-bold tracking-tight text-sun-primary flex items-center gap-3">
            <span>Sun AI Agency</span>
            <span className="hidden md:inline-block h-4 w-px bg-sun-border"></span>
            <span className="hidden md:inline-block text-xs font-sans font-normal text-sun-tertiary tracking-widest uppercase">
              Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
             <Button variant="ghost" onClick={onReset} className="text-xs flex items-center gap-2 h-8">
                <LogOut size={14} /> Exit
             </Button>
            <div className="h-8 w-8 rounded-full bg-sun-primary text-white flex items-center justify-center text-xs font-bold shadow-sm ring-2 ring-white">
              {state.data.businessName.substring(0, 2).toUpperCase() || 'AI'}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-sun-border mb-8 overflow-x-auto no-scrollbar sticky top-16 bg-sun-bg/95 backdrop-blur-sm z-10 pt-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all whitespace-nowrap border-b-2 relative -bottom-[2px] ${
                activeTab === tab.name
                  ? 'text-sun-primary border-sun-accent'
                  : 'text-sun-muted border-transparent hover:text-sun-primary hover:border-sun-border'
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
