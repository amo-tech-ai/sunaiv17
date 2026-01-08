
import React, { useState } from 'react';
import { useProjects } from '../../../hooks/useProjects';
import { ProjectList } from './ProjectList';
import { ProjectDetail } from './ProjectDetail';
import { Project } from '../../../types';
import { Loader2, Briefcase, Zap } from 'lucide-react';

export const ProjectPlanningLayout: React.FC = () => {
  const { projects, loading, updateTaskStatus } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync selected project with updated state
  const activeProject = selectedProject 
    ? projects.find(p => p.id === selectedProject.id) || selectedProject 
    : null;

  return (
    <div className="flex h-[calc(100vh-140px)] border border-sun-border rounded-sm overflow-hidden bg-white animate-fade-in">
      {/* Left Panel: Summary & Filters (Hidden on Detail View for focus, or kept) - keeping for list view */}
      {!activeProject && (
        <div className="w-[20%] border-r border-sun-border bg-sun-bg p-4 flex flex-col gap-6 hidden md:flex">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-sun-muted mb-4">Portfolio Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-sun-secondary">Active Projects</span>
                <span className="font-medium text-sun-primary">{projects.filter(p => p.status === 'Active').length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-sun-secondary">Total Value</span>
                <span className="font-medium text-sun-primary">${projects.reduce((acc, p) => acc + p.value, 0).toLocaleString()}</span>
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
            project={activeProject} 
            onBack={() => setSelectedProject(null)} 
            onUpdateTask={updateTaskStatus}
          />
        ) : (
          <>
            <div className="p-4 border-b border-sun-border">
                <h2 className="font-serif text-lg text-sun-primary flex items-center gap-2">
                    <Briefcase size={18} className="text-sun-secondary"/> Projects
                </h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                <ProjectList projects={projects} onSelect={setSelectedProject} />
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
                            Based on current velocity, phase completion is expected on <strong>Nov 14</strong>. 
                            <br/><span className="text-green-600 text-xs font-bold">● On Track</span>
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-xs font-bold uppercase tracking-widest text-sun-muted">Risk Analysis</div>
                        <p className="text-sm text-sun-secondary leading-relaxed">
                            Potential bottleneck detected in <strong>Content Approval</strong>. Suggest scheduling review meeting early.
                        </p>
                    </div>
                </>
            ) : (
                <p className="text-sm text-sun-muted italic">Select a project to view specific insights and risk analysis.</p>
            )}
        </div>
      </div>
    </div>
  );
};
