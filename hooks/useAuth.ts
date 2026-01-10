
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

// --- DEV BYPASS CONFIGURATION ---
// Keep this FALSE to show Landing Page initially. 
// We will use signInDev to bypass manually via UI interaction.
const ENABLE_DEV_AUTH_BYPASS = false; 

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

  // Development Login Bypass
  const signInDev = (role: 'client' | 'agency' = 'agency') => {
    const mockUser = { ...MOCK_DEV_USER };
    
    // Set roles in metadata (Supabase style)
    mockUser.app_metadata = { ...mockUser.app_metadata, role };
    mockUser.user_metadata = { ...mockUser.user_metadata, role };
    
    // Customize name based on role
    if (role === 'client') {
        mockUser.email = 'client@example.com';
        mockUser.user_metadata.full_name = 'Client User';
    }

    setSession({ ...MOCK_SESSION, user: mockUser });
    setUser(mockUser);
    setLoading(false);
  };

  useEffect(() => {
    if (ENABLE_DEV_AUTH_BYPASS) {
      signInDev('agency');
      return;
    }

    // --- ORIGINAL PRODUCTION LOGIC ---
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        setUser(session.user);
      }
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

  return { session, user, loading, signInDev };
};
