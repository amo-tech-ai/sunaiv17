
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../services/supabase';
import { useAuth } from '../../../hooks/useAuth';
import { extractor } from '../../../services/gemini/extractor';
import { AppState, DiagnosticSection, DiagnosticOption } from '../../../types';

interface UseDiagnosticsProps {
  industry: string;
  selectedServices: string[];
  documentInsights?: string;
  diagnosticAnswers: Record<string, string[]>;
  aiQuestions: DiagnosticSection[];
  updateData: (section: keyof AppState['data'], value: any) => void;
  setAiQuestions: (qs: any) => void;
  setStream: (text: string) => void;
  priorities?: AppState['data']['priorities'];
}

export const useDiagnostics = ({
  industry,
  selectedServices,
  documentInsights,
  diagnosticAnswers,
  aiQuestions,
  updateData,
  setAiQuestions,
  setStream,
  priorities
}: UseDiagnosticsProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuth();
  const answerSaveTimeoutRef = useRef<any>(null);
  const defaultStreamText = useRef<string>("");

  // Load saved answers on mount
  useEffect(() => {
    const loadSavedAnswers = async () => {
      if (!user) return;
      
      const { data: session } = await supabase
        .from('wizard_sessions')
        .select('id')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (session) {
        // CORRECTED: Fetch by screen_id and read JSONB data
        const { data: row } = await supabase
          .from('wizard_answers')
          .select('data')
          .eq('session_id', session.id)
          .eq('screen_id', 'step-2')
          .maybeSingle();

        if (row?.data) {
          // The data column stores the full Record<string, string[]> map
          const loadedAnswers = row.data as Record<string, string[]>;
          
          if (Object.keys(diagnosticAnswers).length === 0 && loadedAnswers) {
             updateData('diagnosticAnswers', loadedAnswers);
          }
        }
      }
    };
    loadSavedAnswers();
  }, [user]);

  // Initial Fetch Logic
  useEffect(() => {
    const qs = aiQuestions;
    
    if (!qs || qs.length === 0) {
      const fetchQuestions = async () => {
        setLoading(true);
        setError(false);
        
        const initialText = `**Consultant is Online**\n\nI am analyzing your **${industry.replace('_', ' ')}** business context.\n\nReviewing your tech stack: ${selectedServices.join(', ') || 'Standard Setup'}...`;
        setStream(initialText);
        
        setTimeout(() => {
            setStream(`**Deep Dive**\n\nIdentifying high-signal diagnostic questions based on your industry profile and ${selectedServices.length > 0 ? 'selected services' : 'tech needs'}...`);
        }, 1200);

        try {
          const result = await extractor.generateQuestions(industry as any, selectedServices, documentInsights);
          
          if (result && result.length > 0) {
            setAiQuestions(result);
            const readyText = `**Diagnostics Ready**\n\nI've prepared a custom deep-dive tailored to your stack.\n\nSelect your primary constraints to unlock the system architecture phase.`;
            setStream(readyText);
            defaultStreamText.current = readyText;
          } else {
             throw new Error("No sections generated");
          }
        } catch (e) {
          console.error(e);
          setError(true);
          setStream("I encountered an issue generating custom diagnostics. Please try reloading.");
        } finally {
          setLoading(false);
        }
      };
      fetchQuestions();
    } else {
        const readyText = `**Diagnostics Ready**\n\nHover over options to see strategic context for your ${industry.replace('_', ' ')} business.`;
        setStream(readyText);
        defaultStreamText.current = readyText;
    }
  }, [industry, selectedServices]);

  // CORRECTED: Save full answer state to JSONB column
  const saveAnswersToDb = async (allAnswers: Record<string, string[]>) => {
    if (!user) return;

    try {
      const { data: wizardSession } = await supabase
        .from('wizard_sessions')
        .select('id')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (wizardSession) {
        await supabase.from('wizard_answers').upsert({
          session_id: wizardSession.id,
          screen_id: 'step-2', // Use screen ID as the key
          data: allAnswers,    // Store full map in JSONB
          updated_at: new Date().toISOString()
        }, { onConflict: 'session_id, screen_id' });
      }
    } catch (e) {
      console.warn("Failed to save answer to DB", e);
    }
  };

  const handleSelection = (questionId: string, option: DiagnosticOption, type: 'single' | 'multi') => {
    const currentAnswers = diagnosticAnswers[questionId] || [];
    let newAnswers: string[];

    const explanationText = option.ai_explanation 
        ? `**Strategic Insight**\n\n${option.ai_explanation}`
        : `**Selection Recorded**\n\nAnalyzing impact of: ${option.label}...`;

    if (type === 'single') {
      if (currentAnswers.includes(option.label)) {
        newAnswers = []; // Toggle off
        setStream(defaultStreamText.current);
      } else {
        newAnswers = [option.label];
        setStream(explanationText);
        defaultStreamText.current = explanationText; 
        
        // Populate priorities map for legacy compatibility
        if (questionId === 'primary_focus') {
             const currentPriorities = priorities || {};
             updateData('priorities', {
                 ...currentPriorities,
                 mainPriority: option.label
             });
        }
      }
    } else {
      if (currentAnswers.includes(option.label)) {
        newAnswers = currentAnswers.filter(a => a !== option.label);
      } else {
        if (currentAnswers.length >= 3) {
            setStream(`**Focus Required**\n\nPlease prioritize your top 3 bottlenecks. Diluted focus leads to diluted results.`);
            return;
        }
        newAnswers = [...currentAnswers, option.label];
        setStream(explanationText);
        defaultStreamText.current = explanationText;
      }
    }

    const updatedDiagnosticAnswers = {
      ...diagnosticAnswers,
      [questionId]: newAnswers
    };

    updateData('diagnosticAnswers', updatedDiagnosticAnswers);

    if (answerSaveTimeoutRef.current) clearTimeout(answerSaveTimeoutRef.current);
    answerSaveTimeoutRef.current = setTimeout(() => {
        saveAnswersToDb(updatedDiagnosticAnswers);
    }, 500);
  };

  const handleHover = (option: DiagnosticOption) => {
      if (option.ai_explanation) {
          setStream(`**Context**\n\n${option.ai_explanation}`);
      }
  };

  const handleMouseLeave = () => {
      setStream(defaultStreamText.current);
  };

  return {
    loading,
    error,
    handleSelection,
    handleHover,
    handleMouseLeave
  };
};
