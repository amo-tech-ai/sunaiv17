
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { Project, Task } from '../types';
import { useAuth } from './useAuth';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchProjects = async (showLoading = true) => {
    if (!user) return;
    
    try {
      if (showLoading) setLoading(true);
      
      // Fetch projects with their tasks and client details
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          client:client_id (
            id,
            name
          ),
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
          client: p.client?.name || 'Internal',
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
            phase: t.phase || 'General',
            tags: t.tags || []
          })) || []
        }));
        
        setProjects(transformedProjects);
      }
    } catch (err: any) {
      console.error("Error fetching projects:", err);
      setError(err.message);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    // Initial fetch
    fetchProjects(true);
    
    // Set up Realtime subscription
    const channel = supabase
      .channel('projects_realtime')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'projects', 
        filter: `user_id=eq.${user.id}` 
      }, () => {
        fetchProjects(false);
      })
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'tasks' 
      }, () => {
        // When tasks change, we need to refresh projects to update the nested tasks list
        fetchProjects(false);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const createProject = async (projectData: { name: string; client_id: string; start_date: string; value: number }) => {
    if (!user) return;

    const newProject = {
      user_id: user.id,
      name: projectData.name,
      client_id: projectData.client_id,
      start_date: projectData.start_date,
      value: projectData.value,
      status: 'Planning',
      current_phase: 'Foundation',
      progress: 0,
      // org_id: user.app_metadata?.org_id // If using RLS based on org_id
    };

    // Remove undefined keys (like org_id if not present on user object yet)
    Object.keys(newProject).forEach(key => (newProject as any)[key] === undefined && delete (newProject as any)[key]);

    const { data, error } = await supabase
      .from('projects')
      .insert(newProject)
      .select()
      .single();

    if (error) {
      console.error("Failed to create project", error);
      throw error;
    }

    // Refresh happens via realtime, but fetch immediately to be responsive
    fetchProjects(false);
    return data;
  };

  const updateProjectStatus = async (id: string, status: Project['status']) => {
    // Optimistic Update
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    
    const { error } = await supabase
      .from('projects')
      .update({ status })
      .eq('id', id);
      
    if (error) {
        console.error("Failed to update project status", error);
        fetchProjects(false); // Revert on error
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
        fetchProjects(false);
    }
  };

  return {
    projects,
    loading,
    error,
    createProject,
    updateProjectStatus,
    updateTaskStatus,
    refresh: () => fetchProjects(true)
  };
};
