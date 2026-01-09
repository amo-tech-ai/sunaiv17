
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { Project, Task } from '../types';
import { useAuth } from './useAuth';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchProjects = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Fetch projects with their tasks
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          tasks (*)
        `)
        .eq('user_id', user.id) // Filter by user ownership
        .neq('status', 'archived')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      if (data) {
        // Transform DB shape to App Type
        const transformedProjects: Project[] = data.map((p: any) => ({
          id: p.id,
          name: p.name || 'Untitled Project',
          client: p.client_name || 'Internal',
          status: p.status || 'Planning',
          phase: p.current_phase || 'Foundation',
          progress: p.progress || 0,
          startDate: p.start_date || p.created_at,
          value: p.value || 0,
          tasks: p.tasks?.map((t: any) => ({
            id: t.id,
            title: t.title,
            description: t.description || '',
            status: t.status,
            priority: t.priority || 'medium',
            phase: t.phase || 'Foundation',
            tags: t.tags || []
          })) || []
        }));
        
        setProjects(transformedProjects);
      }
    } catch (err: any) {
      console.error("Error fetching projects:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    
    // Set up Realtime subscription
    const channel = supabase
      .channel('projects_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects', filter: `user_id=eq.${user?.id}` }, () => {
        fetchProjects();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        fetchProjects();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const updateProjectStatus = async (id: string, status: Project['status']) => {
    // Optimistic Update
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    
    const { error } = await supabase
      .from('projects')
      .update({ status })
      .eq('id', id);
      
    if (error) {
        console.error("Failed to update project status", error);
        fetchProjects(); // Revert on error
    }
  };

  const updateTaskStatus = async (projectId: string, taskId: string, status: Task['status']) => {
    // Optimistic Update
    setProjects(prev => prev.map(p => {
        if (p.id !== projectId) return p;
        return {
            ...p,
            tasks: p.tasks.map(t => t.id === taskId ? { ...t, status } : t)
        };
    }));

    const { error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', taskId);

    if (error) {
        console.error("Failed to update task status", error);
        fetchProjects();
    }
  };

  return {
    projects,
    loading,
    error,
    updateProjectStatus,
    updateTaskStatus,
    refresh: fetchProjects
  };
};
