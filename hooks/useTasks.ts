
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { Task } from '../types';
import { useAuth } from './useAuth';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchTasks = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        // Filter tasks linked to projects owned by user via a join or if task has user_id/org_id
        // Assuming tasks table has user_id or project_id linking to user
        // For simplicity in this phase, assuming tasks have 'project_id' and we join, 
        // OR we added 'user_id' to tasks in the migration plan.
        // Let's assume we filter by project ownership or direct user_id if available.
        // Fallback: fetch all for now, RLS will handle security.
        .order('priority', { ascending: false })
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data) {
        setTasks(data.map((t: any) => ({
            id: t.id,
            title: t.title,
            description: t.description || '',
            status: t.status,
            priority: t.priority || 'medium',
            phase: t.phase || 'General',
            tags: t.tags || []
        })));
      }
    } catch (err: any) {
      console.error("Error fetching tasks:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    
    const channel = supabase
      .channel('tasks_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        fetchTasks();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const createTask = async (task: Partial<Task> & { project_id?: string }) => {
    if (!user) return;
    
    const newTask = {
        title: task.title,
        description: task.description,
        status: 'todo',
        priority: task.priority || 'medium',
        phase: task.phase,
        tags: task.tags,
        project_id: task.project_id,
        // user_id: user.id // If schema supports it
    };

    const { data, error } = await supabase.from('tasks').insert(newTask).select().single();
    if (error) throw error;
    setTasks(prev => [...prev, data]);
    return data;
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    // Optimistic
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));

    const { error } = await supabase.from('tasks').update(updates).eq('id', id);
    if (error) {
        console.error("Update task failed", error);
        fetchTasks();
    }
  };

  const deleteTask = async (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) {
        console.error("Delete task failed", error);
        fetchTasks();
    }
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refresh: fetchTasks
  };
};
