
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from './useAuth';

export interface UserSettings {
  profile: {
    id: string;
    full_name: string;
    email: string;
    avatar_url?: string;
  };
  organization: {
    id: string;
    name: string;
    tier: string;
  };
  preferences: {
    theme: 'light' | 'dark';
    email_notifications: boolean;
    slack_notifications: boolean;
  };
}

export const useSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // 1. Fetch Profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // 2. Fetch Organization (via team_members)
      const { data: member } = await supabase
        .from('team_members')
        .select('org_id, organizations(*)')
        .eq('user_id', user.id)
        .single();

      // 3. Fetch Preferences (or use defaults if missing)
      const { data: prefs } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      setSettings({
        profile: {
          id: user.id,
          full_name: profile?.full_name || '',
          email: user.email || '',
          avatar_url: profile?.avatar_url
        },
        organization: (Array.isArray(member?.organizations) ? member?.organizations[0] : member?.organizations) as UserSettings['organization'] || { id: '', name: 'My Agency', tier: 'Free' },
        preferences: prefs || {
          theme: 'light',
          email_notifications: true,
          slack_notifications: false
        }
      });

    } catch (err: any) {
      console.error('Error fetching settings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [user]);

  const updateProfile = async (updates: Partial<UserSettings['profile']>) => {
    if (!user || !settings) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: updates.full_name, avatar_url: updates.avatar_url })
        .eq('id', user.id);

      if (error) throw error;
      setSettings(prev => prev ? { ...prev, profile: { ...prev.profile, ...updates } } : null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const updateOrganization = async (name: string) => {
    if (!settings?.organization?.id) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('organizations')
        .update({ name })
        .eq('id', settings.organization.id);

      if (error) throw error;
      setSettings(prev => prev ? { ...prev, organization: { ...prev.organization, name } } : null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const updatePreferences = async (updates: Partial<UserSettings['preferences']>) => {
    if (!user || !settings) return;
    // Optimistic update
    setSettings(prev => prev ? { ...prev, preferences: { ...prev.preferences, ...updates } } : null);
    
    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({ 
          user_id: user.id, 
          ...settings.preferences, 
          ...updates,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      fetchSettings(); // Revert on error
    }
  };

  return {
    settings,
    loading,
    saving,
    error,
    updateProfile,
    updateOrganization,
    updatePreferences
  };
};
