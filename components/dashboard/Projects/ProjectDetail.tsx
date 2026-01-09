
import React, { useState } from 'react';
import { useProjects } from '../../../hooks/useProjects';
import { Task, Project } from '../../../types';
import { 
  ArrowLeft, Calendar, CheckCircle2, Archive, 
  MoreHorizontal, Clock, LayoutGrid, List as ListIcon,
  BarChart3, Layers, Settings
} from 'lucide-react';
import { Button } from '../../Button';

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack }) => {
  const { projects, updateProjectStatus, updateTaskStatus } = useProjects();
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'timeline'>('tasks');
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <p className="text-sun-secondary mb-4">Project not found or has been archived.</p>
        <Button onClick={onBack} variant="ghost">Return to List</Button>
      </div>
    );
  }

  // Task Filtering
  const tasksByStatus = {
    todo: project.tasks.filter(t => t.status === 'todo'),
    in_progress: project.tasks.filter(t => t.status === 'in_progress'),
    done: project.tasks.filter(t => t.status === 'done'),
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    if (draggedTaskId) {
      updateTaskStatus(project.id, draggedTaskId, status);
      setDraggedTaskId(null);
    }
  };

  const handleArchive = async () => {
    if (window.confirm('Are you sure you want to archive this project? It will be hidden from the active list.')) {
      await updateProjectStatus(project.id, 'Completed'); // Using 'Completed' as proxy for archive logic in typical flow, or schema supports 'archived' string
      onBack();
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateProjectStatus(project.id, e.target.value as Project['status']);
  };

  const statusColors = {
    'Planning': 'bg-blue-100 text-blue-700',
    'Active': 'bg-green-100 text-green-700',
    'On Hold': 'bg-orange-100 text-orange-700',
    'Completed': 'bg-gray-100 text-gray-700'
  };

  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* Header */}
      <div className="p-6 border-b border-sun-border bg-white sticky top-0 z-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs text-sun-muted hover:text-sun-primary mb-4 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Projects
        </button>
        
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="font-serif text-2xl text-sun-primary mb-1">{project.name}</h1>
              <div className="flex items-center gap-3 text-sm text-sun-secondary">
                <span className="font-medium">{project.client}</span>
                <span className="w-1 h-1 bg-sun-border rounded-full" />
                <div className="flex items-center gap-2">
                   <span className="text-sun-tertiary">Status:</span>
                   <select 
                     value={project.status} 
                     onChange={handleStatusChange}
                     className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border-none cursor-pointer focus:ring-0 ${statusColors[project.status] || 'bg-gray-100'}`}
                   >
                     <option value="Planning">Planning</option>
                     <option value="Active">Active</option>
                     <option value="On Hold">On Hold</option>
                     <option value="Completed">Completed</option>
                   </select>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
               <Button variant="ghost" className="h-9 px-3" onClick={handleArchive}>
                 <Archive size={16} className="text-sun-muted hover:text-red-500" />
               </Button>
               <Button variant="outline" className="h-9 text-xs">
                 <Settings size={14} className="mr-2" /> Edit
               </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-sun-secondary">
              <span>Completion Progress</span>
              <span className="font-mono">{project.progress}%</span>
            </div>
            <div className="h-2 w-full bg-sun-bg rounded-full overflow-hidden">
              <div 
                className="h-full bg-sun-primary transition-all duration-500 ease-out" 
                style={{ width: `${project.progress}%` }} 
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-sun-border pt-2">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'tasks', label: 'Tasks', icon: LayoutGrid },
              { id: 'timeline', label: 'Timeline', icon: Clock },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center gap-2 pb-3 text-sm font-medium transition-colors border-b-2
                  ${activeTab === tab.id 
                    ? 'text-sun-primary border-sun-primary' 
                    : 'text-sun-muted border-transparent hover:text-sun-primary'
                  }
                `}
              >
                <tab.icon size={14} /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-sun-bg/30">
        
        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="p-8 max-w-3xl">
            <div className="grid grid-cols-2 gap-6 mb-8">
               <div className="bg-white p-6 rounded-sm border border-sun-border">
                  <div className="text-xs uppercase tracking-widest text-sun-muted mb-1">Project Value</div>
                  <div className="font-serif text-2xl text-sun-primary">${project.value.toLocaleString()}</div>
               </div>
               <div className="bg-white p-6 rounded-sm border border-sun-border">
                  <div className="text-xs uppercase tracking-widest text-sun-muted mb-1">Start Date</div>
                  <div className="font-serif text-2xl text-sun-primary">{new Date(project.startDate).toLocaleDateString()}</div>
               </div>
            </div>
            
            <div className="bg-white p-6 rounded-sm border border-sun-border mb-8">
               <h3 className="font-serif text-lg mb-4">Phase: {project.phase}</h3>
               <p className="text-sm text-sun-secondary leading-relaxed">
                 The project is currently in the <strong>{project.phase}</strong> stage. 
                 Focus is on completing foundational tasks before moving to implementation.
               </p>
            </div>
          </div>
        )}

        {/* TAB: TASKS (KANBAN) */}
        {activeTab === 'tasks' && (
          <div className="p-6 h-full overflow-x-auto">
            <div className="flex gap-6 h-full min-w-[900px]">
              {(['todo', 'in_progress', 'done'] as const).map(status => (
                <div 
                  key={status} 
                  className={`flex-1 flex flex-col min-w-[280px] rounded-sm transition-colors ${draggedTaskId ? 'bg-sun-bg/50 border border-dashed border-sun-border' : ''}`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, status)}
                >
                  <div className="mb-4 flex justify-between items-center px-1 pt-1">
                    <h3 className="font-serif text-sm font-medium capitalize text-sun-primary">
                      {status.replace('_', ' ')}
                    </h3>
                    <span className="text-xs bg-white px-2 py-0.5 rounded-full border border-sun-border text-sun-muted shadow-sm">
                      {tasksByStatus[status].length}
                    </span>
                  </div>
                  
                  <div className="flex-1 space-y-3 p-1">
                    {tasksByStatus[status].map(task => (
                      <div 
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        className="bg-white p-4 rounded-sm border border-sun-border shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            task.priority === 'high' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        <h4 className="text-sm font-medium text-sun-primary mb-1">{task.title}</h4>
                        <p className="text-xs text-sun-secondary mb-3">{task.description}</p>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-sun-border/50">
                            <div className="flex gap-1">
                                {task.tags.map(tag => (
                                    <span key={tag} className="text-[10px] text-sun-tertiary bg-sun-bg px-1 rounded">#{tag}</span>
                                ))}
                            </div>
                            {status !== 'done' && (
                                <button 
                                    onClick={() => updateTaskStatus(project.id, task.id, status === 'todo' ? 'in_progress' : 'done')}
                                    className="opacity-0 group-hover:opacity-100 text-xs text-sun-accent hover:underline transition-opacity"
                                >
                                    Advance
                                </button>
                            )}
                        </div>
                      </div>
                    ))}
                    {tasksByStatus[status].length === 0 && (
                      <div className="h-24 flex items-center justify-center text-xs text-sun-muted border-2 border-dashed border-sun-border/30 rounded-sm">
                        Drop tasks here
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: TIMELINE (LIST VIEW) */}
        {activeTab === 'timeline' && (
          <div className="p-8 max-w-4xl">
             <div className="space-y-8 relative before:absolute before:left-[19px] before:top-0 before:h-full before:w-px before:bg-sun-border">
                {project.tasks.map((task, i) => (
                  <div key={task.id} className="relative pl-12">
                     <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center z-10 ${
                       task.status === 'done' ? 'bg-green-100 text-green-600' : 'bg-sun-bg text-sun-tertiary'
                     }`}>
                       {task.status === 'done' ? <CheckCircle2 size={16} /> : <span className="text-xs font-bold">{i + 1}</span>}
                     </div>
                     <div className="bg-white p-4 rounded-sm border border-sun-border flex justify-between items-center">
                        <div>
                          <div className="text-xs text-sun-muted uppercase tracking-wider mb-1">{task.phase}</div>
                          <h4 className={`font-medium ${task.status === 'done' ? 'line-through text-sun-tertiary' : 'text-sun-primary'}`}>
                            {task.title}
                          </h4>
                        </div>
                        <div className="text-right">
                           <span className={`text-[10px] uppercase px-2 py-1 rounded-sm ${
                             task.status === 'done' ? 'bg-green-50 text-green-700' : 
                             task.status === 'in_progress' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-500'
                           }`}>
                             {task.status.replace('_', ' ')}
                           </span>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

      </div>
    </div>
  );
};
