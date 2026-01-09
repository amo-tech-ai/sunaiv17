
import React, { useState, useEffect } from 'react';
import { X, Trash2, Loader2, Save } from 'lucide-react';
import { Task } from '../../../types';
import { Button } from '../../Button';
import { Input, TextArea, Select } from '../../Input';
import { useTasks } from '../../../hooks/useTasks';

interface TaskEditModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TaskEditModal: React.FC<TaskEditModalProps> = ({ task, isOpen, onClose }) => {
  const { updateTask, deleteTask } = useTasks();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Task>>({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        phase: task.phase,
        tags: task.tags
      });
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateTask(task.id, formData);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      await deleteTask(task.id);
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-sm shadow-xl w-full max-w-lg border border-sun-border overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-sun-border bg-sun-bg/30">
          <h2 className="font-serif text-lg text-sun-primary">Edit Task</h2>
          <button onClick={onClose} className="text-sun-tertiary hover:text-sun-primary">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6 overflow-y-auto">
          <Input
            label="Task Title"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Priority"
              options={[
                { label: 'High', value: 'high' },
                { label: 'Medium', value: 'medium' },
                { label: 'Low', value: 'low' }
              ]}
              value={formData.priority || 'medium'}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
            />
            <Select
              label="Status"
              options={[
                { label: 'To Do', value: 'todo' },
                { label: 'In Progress', value: 'in_progress' },
                { label: 'Done', value: 'done' }
              ]}
              value={formData.status || 'todo'}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
            />
          </div>

          <TextArea
            label="Description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
          />

          <Input
            label="Tags (comma separated)"
            value={formData.tags?.join(', ') || ''}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
            placeholder="strategy, design, urgent"
          />
        </form>

        <div className="p-4 border-t border-sun-border flex justify-between bg-sun-bg/10">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 size={16} className="mr-2" /> Delete
          </Button>
          <div className="flex gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading} className="min-w-[100px]">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <span className="flex items-center gap-2"><Save size={16}/> Save</span>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
