
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { CRMContact, PipelineStage } from '../types';
import { useAuth } from './useAuth';

export const useCRM = () => {
  const [contacts, setContacts] = useState<CRMContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchContacts = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('crm_contacts')
        .select('*')
        .order('last_active_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setContacts(data as CRMContact[]);
      }
    } catch (err: any) {
      console.error('Error fetching contacts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();

    if (!user) return;

    // Realtime Subscription
    const channel = supabase
      .channel('crm_realtime')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'crm_contacts' 
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setContacts(prev => [payload.new as CRMContact, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setContacts(prev => prev.map(c => c.id === payload.new.id ? payload.new as CRMContact : c));
        } else if (payload.eventType === 'DELETE') {
          setContacts(prev => prev.filter(c => c.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const updateStage = async (contactId: string, newStage: PipelineStage) => {
    // Optimistic update
    setContacts(prev => prev.map(c => c.id === contactId ? { ...c, pipeline_stage: newStage } : c));
    
    const { error } = await supabase
      .from('crm_contacts')
      .update({ pipeline_stage: newStage })
      .eq('id', contactId);
      
    if (error) {
        console.error("Failed to update stage:", error);
        fetchContacts(); // Revert on error
    }
  };

  return {
    contacts,
    loading,
    error,
    refresh: fetchContacts,
    updateStage
  };
};
