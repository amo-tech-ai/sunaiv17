
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

// --- DEV BYPASS CONFIGURATION ---
const ENABLE_DEV_AUTH_BYPASS = true;

const MOCK_DEV_USER = {
  id: 'dev-preview-user',
  email: 'dev@sunai.agency',
  app_metadata: { provider: 'email' },
  user_metadata: { full_name: 'Dev Consultant' },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  role: 'authenticated',
  updated_at: new Date().toISOString(),
} as User;

const MOCK_SESSION = {
  access_token: 'mock-token',
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: 'mock-refresh',
  user: MOCK_DEV_USER,
} as Session;
// --------------------------------

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ENABLE_DEV_AUTH_BYPASS) {
      // Immediate mock return for dev mode
      setSession(MOCK_SESSION);
      setUser(MOCK_DEV_USER);
      setLoading(false);
      return;
    }

    // --- ORIGINAL PRODUCTION LOGIC ---
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session, user, loading };
};
