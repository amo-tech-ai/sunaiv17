
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { CRMContact } from '../types';

export const useCRM = () => {
  const [contacts, setContacts] = useState<CRMContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      // Ensure we select all fields defined in the type
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
            { id: 'mock-1', name: 'Alice Freeman', company: 'Urban Properties', role: 'Head of Sales', status: 'active', last_active_at: new Date().toISOString(), email: 'alice@urban.prop' },
            { id: 'mock-2', name: 'Marcus Chen', company: 'Luxe Threads', role: 'Founder', status: 'lead', last_active_at: new Date(Date.now() - 86400000).toISOString(), email: 'marcus@luxe.co' },
        ]);
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
  }, []);

  return {
    contacts,
    loading,
    error,
    refresh: fetchContacts
  };
};
