
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from './useAuth';
import { RoadmapPhase } from '../types';

export const useOverview = () => {
  const [snapshot, setSnapshot] = useState<any>(null);
  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>([]);
  const [taskCounts, setTaskCounts] = useState({ total: 0, completed: 0, highPriority: 0 });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // 1. Get latest active project
      const { data: projects } = await supabase
          .from('projects')
          .select('id')
          .eq('user_id', user.id)
          .eq('status', 'draft') // or 'active'
          .order('created_at', { ascending: false })
          .limit(1);
      
      const projectId = projects?.[0]?.id;

      if (projectId) {
          // 2. Fetch Snapshot
          const { data: snaps } = await supabase
              .from('context_snapshots')
              .select('*')
              .eq('project_id', projectId)
              .order('created_at', { ascending: false })
              .limit(1);
          
          if (snaps?.[0]) setSnapshot(snaps[0]);

          // 3. Fetch Roadmap
          const { data: roadmaps } = await supabase
              .from('roadmaps')
              .select('*, roadmap_phases(*)')
              .eq('project_id', projectId)
              .order('created_at', { ascending: false })
              .limit(1);
          
          if (roadmaps?.[0]?.roadmap_phases) {
              // Map DB phases to App Type
              const phases = roadmaps[0].roadmap_phases.map((p: any) => ({
                  phaseName: p.name,
                  duration: p.duration_label,
                  items: p.tasks || [],
                  deliverables: p.goals || [],
                  kpis: []
              }));
              setRoadmap(phases);
          }

          // 4. Fetch Tasks Count
          const { data: tasks } = await supabase
              .from('tasks')
              .select('status, priority')
              //.eq('project_id', projectId) // Filter by project if schema allows
              ;
          
          if (tasks) {
              setTaskCounts({
                  total: tasks.length,
                  completed: tasks.filter((t: any) => t.status === 'done').length,
                  highPriority: tasks.filter((t: any) => t.priority === 'high' && t.status !== 'done').length
              });
          }
      }
    } catch (e) {
      console.error("Overview fetch error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (!user) return;

    // Realtime Subscriptions
    const taskChannel = supabase
      .channel('overview_tasks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        // Refresh counts when tasks change
        fetchData(); 
      })
      .subscribe();

    const projectChannel = supabase
      .channel('overview_projects')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects', filter: `user_id=eq.${user.id}` }, () => {
        // Refresh project context
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(taskChannel);
      supabase.removeChannel(projectChannel);
    };
  }, [user]);

  return { snapshot, roadmap, taskCounts, loading };
};
