
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
      let dbProject = null;

      // Attempt to fetch from DB
      // We wrap this in a try/catch block specifically for the DB call because 
      // if the user.id is a mock string (e.g. 'dev-preview-user'), Supabase might throw 
      // an "invalid input syntax for type uuid" error.
      try {
        const { data: projects, error } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1);
        
        if (!error && projects && projects.length > 0) {
            dbProject = projects[0];
        }
      } catch (dbError) {
        console.warn("DB Fetch skipped or failed (using mock data):", dbError);
      }

      if (dbProject) {
        // --- REAL DB DATA PATH ---
        setProject({
            id: dbProject.id,
            name: dbProject.name,
            client: user.user_metadata?.full_name || 'Client',
            status: dbProject.status,
            phase: dbProject.current_phase || 'Foundation',
            progress: dbProject.progress || 0,
            startDate: dbProject.start_date || dbProject.created_at,
            value: dbProject.value || 0,
            tasks: []
        });

        // Fetch Brief
        const { data: briefs } = await supabase
            .from('briefs')
            .select('*')
            .eq('project_id', dbProject.id)
            .order('version', { ascending: false })
            .limit(1);
        
        if (briefs && briefs.length > 0) {
            setBrief(briefs[0]);
        } else {
            // Default empty brief if project exists but brief doesn't
            setBrief({
                id: 'draft-1',
                executive_summary: dbProject.description || "Project kick-off pending.",
                goals: ["Increase Efficiency", "Launch MVP"],
                scope: "Initial implementation of selected AI systems.",
                status: 'draft',
                updated_at: new Date().toISOString(),
                version: 1
            });
        }

        // Fetch Invoices
        const { data: invs } = await supabase.from('invoices').select('*').eq('project_id', dbProject.id);
        if (invs) setInvoices(invs);

        // Fetch Documents
        const { data: docs } = await supabase.from('documents').select('*').eq('project_id', dbProject.id);
        if (docs) setDocuments(docs);

        // Fetch Roadmap
        const { data: rms } = await supabase
            .from('roadmaps')
            .select('*, roadmap_phases(*)')
            .eq('project_id', dbProject.id)
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

      } else {
        // --- MOCK DATA FALLBACK (For Demo/Dev) ---
        console.log("Using Mock Client Portal Data");
        
        setProject({
            id: 'mock-proj-1',
            name: 'AI Automation Pilot',
            client: user.user_metadata?.full_name || 'Acme Corp',
            status: 'Active',
            phase: 'Implementation',
            progress: 35,
            startDate: new Date().toISOString(),
            value: 25000,
            tasks: []
        });

        setBrief({
            id: 'mock-brief-1',
            executive_summary: "Acme Corp requires a comprehensive overhaul of their customer acquisition funnel. The primary goal is to reduce response times by 90% using AI agents.",
            goals: [
                "Implement WhatsApp Concierge for 24/7 response",
                "Integrate CRM for automated data entry",
                "Launch Content Studio for social growth"
            ],
            scope: "Phase 1 covers infrastructure setup and WhatsApp API integration. Phase 2 focuses on content automation.",
            status: 'approved',
            updated_at: new Date().toISOString(),
            version: 2
        });

        setInvoices([
            {
                id: 'inv-1',
                number: 'INV-2024-001',
                amount: 8500,
                status: 'paid',
                due_date: new Date(Date.now() - 86400000 * 15).toISOString(),
                created_at: new Date().toISOString(),
                items: []
            },
            {
                id: 'inv-2',
                number: 'INV-2024-002',
                amount: 8500,
                status: 'pending',
                due_date: new Date(Date.now() + 86400000 * 5).toISOString(),
                created_at: new Date().toISOString(),
                items: []
            }
        ]);

        setRoadmap([
            {
                phaseName: "Foundation",
                duration: "Weeks 1-4",
                items: ["API Credentials Setup", "Data Cleaning", "CRM Integration"],
                deliverables: ["Audit Report", "Architecture Diagram"],
                kpis: ["Data Accuracy > 95%"]
            },
            {
                phaseName: "Implementation",
                duration: "Weeks 5-8",
                items: ["Bot Training", "Workflow Testing", "Staff Onboarding"],
                deliverables: ["Live WhatsApp Bot", "Training Manual"],
                kpis: ["Response Time < 2min"]
            },
            {
                phaseName: "Optimization",
                duration: "Weeks 9-12",
                items: ["Performance Tuning", "A/B Testing Scripts"],
                deliverables: ["Optimization Report"],
                kpis: ["Conversion Rate +15%"]
            }
        ]);
        
        setDocuments([
            {
                id: 'doc-1',
                name: 'Brand_Guidelines_v2.pdf',
                type: 'application/pdf',
                size: 2500000,
                uploaded_at: new Date(Date.now() - 86400000 * 2).toISOString(),
                category: 'Reference'
            }
        ]);
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
      if (brief) {
          setBrief({ ...brief, ...updates, updated_at: new Date().toISOString() });
      }
  };

  const uploadDocument = async (file: File, category: UploadedDocument['category'] = 'Brief') => {
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
