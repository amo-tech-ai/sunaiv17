
import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Loader2, Lock } from 'lucide-react';
import { supabase } from '../../services/supabase';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  // DEV BYPASS: In dev mode, useAuth returns a mock user, so this logic falls through naturally.
  // However, we strictly bypass the UI block here to ensure no flash of restricted content.
  const { user, loading } = useAuth();
  
  // --- DEV BYPASS ---
  // Always render children immediately for testing/demos
  return <>{children}</>;
  // ------------------

  /* 
  // --- ORIGINAL PRODUCTION LOGIC (DISABLED) ---
  useEffect(() => {
    if (!loading && !user) {
      // In a real app, redirect to /login
    }
  }, [user, loading]);

  const handleLogin = async () => {
    await supabase.auth.signInAnonymously();
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-sun-bg">
        <Loader2 className="animate-spin text-sun-accent" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-sun-bg p-6">
        <div className="max-w-md w-full bg-white border border-sun-border p-8 rounded-sm shadow-sm text-center">
          <div className="bg-sun-right p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <Lock className="text-sun-primary" size={24} />
          </div>
          <h2 className="font-serif text-2xl text-sun-primary mb-2">Access Restricted</h2>
          <p className="text-sun-secondary mb-8">
            You must be signed in to access the Dashboard and save your progress.
          </p>
          <button 
            onClick={handleLogin}
            className="w-full py-3 bg-sun-primary text-white font-medium hover:bg-black transition-colors"
          >
            Start Session
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
  */
};
