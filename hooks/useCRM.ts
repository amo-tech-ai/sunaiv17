
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { CRMContact, PipelineStage } from '../types';

export const useCRM = () => {
  const [contacts, setContacts] = useState<CRMContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('crm_contacts')
        .select('*')
        .order('last_active_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setContacts(data as CRMContact[]);
      } else {
        // Fallback for demo if DB is empty
        setContacts([
            { id: 'mock-1', name: 'Alice Freeman', company: 'Urban Properties', role: 'Head of Sales', status: 'active', pipeline_stage: 'Proposal', last_active_at: new Date().toISOString(), email: 'alice@urban.prop', value: 15000 },
            { id: 'mock-2', name: 'Marcus Chen', company: 'Luxe Threads', role: 'Founder', status: 'lead', pipeline_stage: 'New', last_active_at: new Date(Date.now() - 86400000).toISOString(), email: 'marcus@luxe.co', value: 8500 },
            { id: 'mock-3', name: 'Sarah Jones', company: 'TechFlow', role: 'CTO', status: 'prospect', pipeline_stage: 'Qualified', last_active_at: new Date(Date.now() - 172800000).toISOString(), email: 'sarah@techflow.io', value: 25000 },
            { id: 'mock-4', name: 'David Miller', company: 'EventHorizon', role: 'Director', status: 'lead', pipeline_stage: 'Contacted', last_active_at: new Date(Date.now() - 43200000).toISOString(), email: 'david@eventh.com', value: 5000 },
        ]);
      }
    } catch (err: any) {
      console.error('Error fetching contacts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStage = async (contactId: string, newStage: PipelineStage) => {
    // Optimistic update
    setContacts(prev => prev.map(c => c.id === contactId ? { ...c, pipeline_stage: newStage } : c));
    
    // In production, sync with Supabase here
    /*
    const { error } = await supabase
      .from('crm_contacts')
      .update({ pipeline_stage: newStage })
      .eq('id', contactId);
    */
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return {
    contacts,
    loading,
    error,
    refresh: fetchContacts,
    updateStage
  };
};
