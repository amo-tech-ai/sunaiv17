
import { useState, useEffect, useRef, useCallback } from 'react';
import { AppState, INITIAL_STATE, Task } from '../types';
import { supabase } from '../services/supabase';
import { useAuth } from './useAuth';
import debounce from 'lodash.debounce';

export const useWizardState = () => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  
  // 1. Initialize State (Load from DB)
  useEffect(() => {
    const init = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Load latest session for this user
        const { data: dbSession, error } = await supabase
          .from('wizard_sessions')
          .select('step_data')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (dbSession?.step_data) {
          const loadedState = dbSession.step_data as AppState;
          // Ensure migrations/schema compatibility
          if (!loadedState.dashboardState) loadedState.dashboardState = INITIAL_STATE.dashboardState;
          if (!loadedState.data.diagnosticAnswers) loadedState.data.diagnosticAnswers = {};
          setState(loadedState);
        } else {
          // New session or no data found
          setState(INITIAL_STATE);
        }
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [user]);

  // 2. Persist State to DB (Debounced)
  const saveState = async (currentState: AppState) => {
    if (!user) return;
    
    setSaving(true);
    try {
      // Upsert based on user_id (assuming one active draft per user for now)
      // Ideally we would track a specific session ID, but for this wizard flow, user-scoped is fine.
      // We first check if a session exists to update, or create new.
      const { data: existing } = await supabase
        .from('wizard_sessions')
        .select('id')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existing) {
        await supabase.from('wizard_sessions').update({
          step_data: currentState,
          current_step: currentState.step,
          updated_at: new Date().toISOString()
        }).eq('id', existing.id);
      } else {
        await supabase.from('wizard_sessions').insert({
          user_id: user.id,
          step_data: currentState,
          current_step: currentState.step
        });
      }
    } catch (err) {
      console.error("Failed to save wizard state:", err);
    } finally {
      setSaving(false);
    }
  };

  // Create a debounced version of saveState
  const debouncedSave = useCallback(debounce((newState: AppState) => {
    saveState(newState);
  }, 1000), [user]);

  // Trigger save on state changes (excluding loading/transition flags)
  useEffect(() => {
    if (!loading && user) {
      debouncedSave(state);
    }
  }, [state, user, loading, debouncedSave]);

  // Smooth scroll on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state.step]);

  const updateData = (section: keyof AppState['data'], value: any) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, [section]: value }
    }));
  };

  const updateNestedData = (section: 'priorities' | 'readiness', key: string, value: any) => {
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [section]: {
          ...prev.data[section as keyof typeof prev.data] as any,
          [key]: value
        }
      }
    }));
  };

  const setAiQuestions = (qs: any) => { 
    setState(prev => ({ ...prev, aiState: { ...prev.aiState, questions: qs } }));
  };
  
  const setRecommendations = (recs: AppState['aiState']['recommendations']) => {
    setState(prev => ({ ...prev, aiState: { ...prev.aiState, recommendations: recs } }));
  };
  
  const setAnalysis = (analysis: AppState['aiState']['readinessAnalysis']) => {
    setState(prev => ({ ...prev, aiState: { ...prev.aiState, readinessAnalysis: analysis } }));
  };
  
  const setRoadmap = (roadmap: AppState['aiState']['roadmap']) => {
    setState(prev => ({ ...prev, aiState: { ...prev.aiState, roadmap: roadmap } }));
  };
  
  const updateDashboardState = (tasks: Task[]) => {
    setState(prev => ({
      ...prev,
      dashboardState: {
        tasks,
        initialized: true
      }
    }));
  };

  return {
    state,
    setState,
    isTransitioning,
    setIsTransitioning,
    updateData,
    updateNestedData,
    setAiQuestions,
    setRecommendations,
    setAnalysis,
    setRoadmap,
    updateDashboardState,
    INITIAL_STATE,
    loading,
    saving
  };
};
