
import React, { useState } from 'react';
import { Tag, ArrowRightCircle, Loader2 } from 'lucide-react';
import { Task } from '../../types';
import { useTasks } from '../../hooks/useTasks';
import { TaskEditModal } from './Tasks/TaskEditModal';

interface TaskBoardProps {
  tasks: Task[]; // Kept for legacy prop compatibility
  onUpdateTaskStatus: (taskId: string, newStatus: Task['status']) => void;
}

export const TaskBoard: React.FC<TaskBoardProps> = () => {
  const { tasks, loading, updateTask } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const columns: { id: Task['status']; label: string }[] = [
    { id: 'todo', label: 'To Do' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'done', label: 'Done' }
  ];

  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
      return <div className="flex h-full items-center justify-center"><Loader2 className="animate-spin text-sun-muted" /></div>;
  }

  return (
    <div className="relative h-full">
      <TaskEditModal 
        task={editingTask} 
        isOpen={!!editingTask} 
        onClose={() => setEditingTask(null)} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)] min-h-[600px] animate-fade-in">
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col.id || (col.id === 'done' && t.status === 'review'));
          
          return (
            <div key={col.id} className="flex flex-col bg-sun-right/50 border border-sun-border rounded-sm h-full">
              <div className="p-4 border-b border-sun-border bg-white/50 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center">
                <h3 className="font-serif font-medium">{col.label}</h3>
                <span className="text-xs bg-sun-bg px-2 py-1 rounded-full border border-sun-border text-sun-muted">
                  {colTasks.length}
                </span>
              </div>
              
              <div className="p-4 space-y-3 overflow-y-auto flex-1 no-scrollbar">
                {colTasks.length > 0 ? (
                  colTasks.map(task => (
                    <div 
                      key={task.id} 
                      onClick={() => setEditingTask(task)}
                      className="bg-white border border-sun-border p-4 rounded-sm shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="text-[10px] text-sun-muted uppercase tracking-wider">{task.phase}</span>
                      </div>
                      
                      <h4 className="font-medium text-sun-primary mb-1">{task.title}</h4>
                      <p className="text-xs text-sun-secondary line-clamp-2 mb-3">{task.description}</p>
                      
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-sun-border/50">
                        <div className="flex gap-2">
                            {task.tags && task.tags.slice(0, 2).map(tag => (
                              <div key={tag} className="flex items-center gap-1 text-[10px] text-sun-tertiary bg-sun-bg px-1.5 py-0.5 rounded border border-sun-border">
                                <Tag size={10} /> {tag}
                              </div>
                            ))}
                        </div>
                        
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {task.status !== 'done' && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                const next = task.status === 'todo' ? 'in_progress' : 'done';
                                updateTask(task.id, { status: next });
                              }}
                              className="text-sun-primary hover:text-sun-accent transition-colors"
                            >
                              <ArrowRightCircle size={18} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-24 flex items-center justify-center border-2 border-dashed border-sun-border/50 rounded-sm text-xs text-sun-muted">
                    Empty
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
