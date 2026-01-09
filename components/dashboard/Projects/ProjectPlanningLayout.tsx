
import React, { useState } from 'react';
import { useProjects } from '../../../hooks/useProjects';
import { ProjectList } from './ProjectList';
import { ProjectDetail } from './ProjectDetail';
import { CreateProjectModal } from './CreateProjectModal';
import { Project } from '../../../types';
import { Loader2, Briefcase, Zap, Plus } from 'lucide-react';
import { Button } from '../../Button';

export const ProjectPlanningLayout: React.FC = () => {
  const { projects, loading } = useProjects();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Sync selected project with updated state
  const activeProject = selectedProjectId 
    ? projects?.find(p => p.id === selectedProjectId)
    : null;

  return (
    <div className="flex h-[calc(100vh-140px)] border border-sun-border rounded-sm overflow-hidden bg-white animate-fade-in relative">
      {/* Create Modal */}
      <CreateProjectModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />

      {/* Left Panel: Summary & Filters */}
      {!activeProject && (
        <div className="w-[20%] border-r border-sun-border bg-sun-bg p-4 flex flex-col gap-6 hidden md:flex">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-sun-muted mb-4">Portfolio Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-sun-secondary">Active Projects</span>
                <span className="font-medium text-sun-primary">{projects?.filter(p => p.status === 'Active').length || 0}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-sun-secondary">Total Value</span>
                <span className="font-medium text-sun-primary">${(projects || []).reduce((acc, p) => acc + (p.value || 0), 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Center Panel */}
      <div className={`flex flex-col bg-white ${activeProject ? 'w-[70%]' : 'w-[50%]'}`}>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin text-sun-muted" />
          </div>
        ) : activeProject ? (
          <ProjectDetail 
            projectId={activeProject.id} 
            onBack={() => setSelectedProjectId(null)} 
          />
        ) : (
          <>
            <div className="p-4 border-b border-sun-border flex justify-between items-center">
                <h2 className="font-serif text-lg text-sun-primary flex items-center gap-2">
                    <Briefcase size={18} className="text-sun-secondary"/> Projects
                </h2>
                <Button onClick={() => setIsCreateModalOpen(true)} className="h-8 text-xs px-3 py-0">
                    <Plus size={14} className="mr-1" /> New Project
                </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
                <ProjectList projects={projects || []} onSelect={(p) => setSelectedProjectId(p.id)} />
            </div>
          </>
        )}
      </div>

      {/* Right Panel: Planner Agent */}
      <div className={`border-l border-sun-border bg-sun-right overflow-hidden flex flex-col ${activeProject ? 'w-[30%]' : 'w-[30%]'}`}>
        <div className="p-6 border-b border-sun-border bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-sun-muted">
            <Zap size={12} className="text-sun-accent" />
            Planner Agent
          </div>
          <h2 className="font-serif text-xl text-sun-primary">
            {activeProject ? 'Project Health' : 'Portfolio Insights'}
          </h2>
        </div>
        
        <div className="p-6 space-y-6 overflow-y-auto">
            {activeProject ? (
                <>
                    <div className="space-y-2">
                        <div className="text-xs font-bold uppercase tracking-widest text-sun-muted">Progress Prediction</div>
                        <p className="text-sm text-sun-secondary leading-relaxed">
                            Based on current velocity, phase completion is expected soon. 
                            <br/><span className="text-green-600 text-xs font-bold">● On Track</span>
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-xs font-bold uppercase tracking-widest text-sun-muted">Risk Analysis</div>
                        <p className="text-sm text-sun-secondary leading-relaxed">
                            No critical risks detected. Ensure all tasks in the 'Foundation' phase are completed before moving to Implementation.
                        </p>
                    </div>
                </>
            ) : (
                <div className="text-sm text-sun-secondary leading-relaxed">
                    <p className="mb-4">I'm monitoring your {projects.length} projects. Your portfolio is currently healthy with {projects.filter(p => p.status === 'Active').length} active workstreams.</p>
                    <div className="bg-white p-4 rounded-sm border border-sun-border shadow-sm">
                        <div className="text-[10px] uppercase font-bold text-sun-muted mb-1">Recommendation</div>
                        <p>Keep project statuses updated to get accurate progress predictions.</p>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
