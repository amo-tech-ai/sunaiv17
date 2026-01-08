
import { useState, useEffect } from 'react';
import { AppState, INITIAL_STATE, Task } from '../types';

const STORAGE_KEY = 'sun_ai_wizard_state';

export const useWizardState = () => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migration/Safety check for new dashboardState
        if (!parsed.dashboardState) {
          parsed.dashboardState = INITIAL_STATE.dashboardState;
        }
        // Migration for diagnosticAnswers
        if (!parsed.data.diagnosticAnswers) {
          parsed.data.diagnosticAnswers = {};
        }
        return parsed;
      }
    } catch (e) {
      console.error("Failed to load state", e);
    }
    return INITIAL_STATE;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  // Persist state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Smooth scroll to top on step change
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

  // State Setters
  const setAiQuestions = (qs: any) => { // Using any loosely here to accommodate the type change during refactor if needed, but AppState is strict
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
    INITIAL_STATE
  };
};
