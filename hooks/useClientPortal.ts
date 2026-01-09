
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from './useAuth';
import { Brief, Invoice, Project, UploadedDocument, RoadmapPhase } from '../types';

export const useClientPortal = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>([]);

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // 1. Get Project for this Client User
      // In a real app, we'd join on team_members or similar logic. 
      // For now, assume clients own their project.
      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id) // Or filtered by client_id if using agency mode
        .order('created_at', { ascending: false })
        .limit(1);

      if (projects && projects.length > 0) {
        const p = projects[0];
        setProject({
            id: p.id,
            name: p.name,
            client: user.user_metadata?.full_name || 'Client',
            status: p.status,
            phase: p.current_phase || 'Foundation',
            progress: p.progress || 0,
            startDate: p.start_date || p.created_at,
            value: p.value || 0,
            tasks: []
        });

        // 2. Fetch Brief
        const { data: briefs } = await supabase
            .from('briefs')
            .select('*')
            .eq('project_id', p.id)
            .order('version', { ascending: false })
            .limit(1);
        
        if (briefs && briefs.length > 0) {
            setBrief(briefs[0]);
        } else {
            // Mock Brief if none exists
            setBrief({
                id: 'draft-1',
                executive_summary: p.description || "Project kick-off pending.",
                goals: ["Increase Efficiency", "Launch MVP"],
                scope: "Initial implementation of selected AI systems.",
                status: 'draft',
                updated_at: new Date().toISOString(),
                version: 1
            });
        }

        // 3. Fetch Invoices
        const { data: invs } = await supabase
            .from('invoices')
            .select('*')
            .eq('project_id', p.id);
        
        if (invs) setInvoices(invs);

        // 4. Fetch Documents
        const { data: docs } = await supabase
            .from('documents')
            .select('*')
            .eq('project_id', p.id);
        
        if (docs) setDocuments(docs);

        // 5. Fetch Roadmap
        const { data: rms } = await supabase
            .from('roadmaps')
            .select('*, roadmap_phases(*)')
            .eq('project_id', p.id)
            .order('created_at', { ascending: false })
            .limit(1);
        
        if (rms && rms[0]?.roadmap_phases) {
             setRoadmap(rms[0].roadmap_phases.map((rp: any) => ({
                 phaseName: rp.name,
                 duration: rp.duration_label,
                 items: rp.tasks || [],
                 deliverables: rp.goals || [],
                 kpis: rp.kpis || []
             })));
        }
      }
    } catch (err) {
      console.error("Client Portal Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const updateBrief = async (updates: Partial<Brief>) => {
      // In production, this would write to Supabase
      if (brief) {
          setBrief({ ...brief, ...updates, updated_at: new Date().toISOString() });
      }
  };

  const uploadDocument = async (file: File, category: UploadedDocument['category'] = 'Brief') => {
      // Mock upload for now
      const newDoc: UploadedDocument = {
          id: `doc-${Date.now()}`,
          name: file.name,
          type: file.type,
          size: file.size,
          uploaded_at: new Date().toISOString(),
          category
      };
      setDocuments(prev => [newDoc, ...prev]);
  };

  return {
    project,
    brief,
    invoices,
    documents,
    roadmap,
    loading,
    updateBrief,
    uploadDocument,
    refresh: fetchData
  };
};
