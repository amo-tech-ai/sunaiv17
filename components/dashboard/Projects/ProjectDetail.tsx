
import React, { useState } from 'react';
import { Project, Task } from '../../../types';
import { ArrowLeft, Clock, CheckSquare, AlertCircle } from 'lucide-react';
import { Button } from '../../Button';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onUpdateTask: (projectId: string, taskId: string, status: Task['status']) => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onUpdateTask }) => {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

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
      onUpdateTask(project.id, draggedTaskId, status);
      setDraggedTaskId(null);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sun-border bg-white sticky top-0 z-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs text-sun-muted hover:text-sun-primary mb-4 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Projects
        </button>
        
        <div className="flex justify-between items-end">
          <div>
            <h1 className="font-serif text-2xl text-sun-primary mb-1">{project.name}</h1>
            <div className="flex items-center gap-3 text-sm text-sun-secondary">
              <span>{project.client}</span>
              <span className="w-1 h-1 bg-sun-border rounded-full" />
              <span>Phase: {project.phase}</span>
            </div>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="h-9 text-xs">Edit Plan</Button>
             <Button className="h-9 text-xs">Add Task</Button>
          </div>
        </div>
      </div>

      {/* Task Board */}
      <div className="flex-1 overflow-x-auto p-6 bg-sun-bg/30">
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
                                onClick={() => onUpdateTask(project.id, task.id, status === 'todo' ? 'in_progress' : 'done')}
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
    </div>
  );
};
