
import React, { useEffect, useState, useRef } from 'react';
import { Loader2, RefreshCw, Check, Circle, Square } from 'lucide-react';
import { AppState, DiagnosticSection, DiagnosticOption } from '../../types';
import { extractor } from '../../services/gemini/extractor';
import { Button } from '../Button';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../hooks/useAuth';

interface Step2DiagnosticsProps {
  industry: AppState['data']['industry'];
  selectedServices: string[];
  documentInsights?: string;
  diagnosticAnswers: AppState['data']['diagnosticAnswers'];
  aiQuestions: AppState['aiState']['questions'];
  updateData: (section: keyof AppState['data'], value: any) => void;
  setAiQuestions: (qs: any) => void;
  setStream: (text: string) => void;
}

export const Step2Diagnostics: React.FC<Step2DiagnosticsProps> = ({ 
  industry, 
  selectedServices,
  documentInsights,
  diagnosticAnswers, 
  aiQuestions,
  updateData,
  setAiQuestions,
  setStream
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuth();
  const answerSaveTimeoutRef = useRef<any>(null);

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
        const { data: answers } = await supabase
          .from('wizard_answers')
          .select('question_id, answer_value')
          .eq('session_id', session.id);

        if (answers && answers.length > 0) {
          const answerMap: Record<string, string[]> = {};
          answers.forEach(a => {
            answerMap[a.question_id] = Array.isArray(a.answer_value) ? a.answer_value : [a.answer_value];
          });
          // Only update if we have new data to avoid overwriting local state unnecessarily if sync is instant
          // For now, we assume local state might be empty on refresh
          if (Object.keys(diagnosticAnswers).length === 0) {
             updateData('diagnosticAnswers', answerMap);
          }
        }
      }
    };
    loadSavedAnswers();
  }, [user]);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(false);
    
    setStream(`**Consultant is Online**\n\nI am analyzing your **${industry.replace('_', ' ')}** business context.\n\nReviewing your tech stack: ${selectedServices.join(', ') || 'Standard Setup'}...`);
    
    setTimeout(() => {
        if(loading) setStream(`**Deep Dive**\n\nIdentifying high-signal diagnostic questions based on your industry profile...`);
    }, 1200);

    try {
      const result = await extractor.generateQuestions(industry, selectedServices, documentInsights);
      
      if (result && result.length > 0) {
        setAiQuestions(result);
        setStream(`**Diagnostics Ready**\n\nI've prepared a custom deep-dive.\n\nSelect your primary constraints to unlock the system architecture phase.`);
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

  useEffect(() => {
    const qs = aiQuestions as unknown as DiagnosticSection[];
    if (!qs || qs.length === 0) {
      fetchQuestions();
    }
  }, [industry]);

  const saveAnswerToDb = async (questionId: string, answers: string[]) => {
    if (!user) return;

    try {
      // Find active wizard session
      const { data: wizardSession } = await supabase
        .from('wizard_sessions')
        .select('id')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (wizardSession) {
        // Upsert answer
        await supabase.from('wizard_answers').upsert({
          session_id: wizardSession.id,
          question_id: questionId,
          answer_value: answers, 
          updated_at: new Date().toISOString()
        }, { onConflict: 'session_id, question_id' });
      }
    } catch (e) {
      console.warn("Failed to save answer to DB", e);
    }
  };

  const handleSelection = (questionId: string, option: DiagnosticOption, type: 'single' | 'multi') => {
    const currentAnswers = diagnosticAnswers[questionId] || [];
    let newAnswers: string[];

    if (type === 'single') {
      if (currentAnswers.includes(option.label)) {
        newAnswers = [];
        setStream(`**Diagnostics Ready**\n\nHover over options to see strategic context.`);
      } else {
        newAnswers = [option.label];
        if (option.ai_explanation) {
            setStream(`**Strategic Insight**\n\n${option.ai_explanation}`);
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
        if (option.ai_explanation) {
            setStream(`**Strategic Insight**\n\n${option.ai_explanation}`);
        }
      }
    }

    // Update Local State
    updateData('diagnosticAnswers', {
      ...diagnosticAnswers,
      [questionId]: newAnswers
    });

    // Debounce save to DB
    if (answerSaveTimeoutRef.current) clearTimeout(answerSaveTimeoutRef.current);
    answerSaveTimeoutRef.current = setTimeout(() => {
        saveAnswerToDb(questionId, newAnswers);
    }, 500);
  };

  const handleHover = (option: DiagnosticOption) => {
      // Optional: Debounce hint display logic here if needed
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] space-y-8 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 bg-sun-accent/20 rounded-full animate-ping"></div>
          <div className="bg-white p-6 rounded-full border border-sun-border shadow-sm relative z-10">
            <Loader2 size={40} className="animate-spin text-sun-accent" />
          </div>
        </div>
        <div className="text-center space-y-3 max-w-md px-4">
          <h3 className="font-serif text-2xl text-sun-primary">Analyzing Business Context</h3>
          <p className="text-sun-secondary leading-relaxed">
            Configuring diagnostic layer for {industry.replace('_', ' ')}...
          </p>
        </div>
      </div>
    );
  }

  const sections = aiQuestions as unknown as DiagnosticSection[];

  if (error || !sections || sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] animate-fade-in space-y-6 text-center px-4">
        <div className="bg-red-50 p-4 rounded-full">
           <RefreshCw className="text-sun-tertiary" size={32} />
        </div>
        <div className="max-w-md">
          <h3 className="text-lg font-serif text-sun-primary mb-2">Connection Issue</h3>
          <p className="text-sun-secondary mb-6">Unable to load diagnostic questions.</p>
          <Button onClick={fetchQuestions}>
            Retry with Offline Mode
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-12 pb-20">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl text-sun-primary mb-3">Diagnostic Phase</h1>
        <p className="text-sun-secondary font-sans max-w-xl leading-relaxed">
          Select your primary constraints. This data directly shapes the system architecture in the next step.
        </p>
      </div>

      <div className="space-y-16">
        {sections.map((section, idx) => (
          <div key={section.id} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="mb-6 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 border-b border-sun-border pb-2">
              <h2 className="text-sm font-bold tracking-widest text-sun-primary uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-sun-accent rounded-full"></span>
                {section.title}
              </h2>
              <span className="text-xs text-sun-muted font-normal leading-tight md:leading-normal">{section.description}</span>
            </div>

            <div className="space-y-10">
              {section.questions.map((q) => (
                <div key={q.id}>
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2">
                    <label className="text-lg font-serif font-medium text-sun-primary leading-tight">
                      {q.text}
                    </label>
                    {q.type === 'multi' && (
                        <span className="self-start md:self-auto text-[10px] uppercase tracking-wider text-sun-tertiary border border-sun-border px-2 py-1 rounded-sm bg-sun-bg/50 whitespace-nowrap">
                            Select up to 3
                        </span>
                    )}
                  </div>

                  <div className={`grid gap-3 md:gap-4 ${section.id === 'north_star' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                    {q.options.map((opt: DiagnosticOption) => {
                      const isSelected = (diagnosticAnswers[q.id] || []).includes(opt.label);
                      const isNorthStar = section.id === 'north_star';
                      
                      return (
                        <button
                          key={opt.label}
                          onClick={() => handleSelection(q.id, opt, q.type)}
                          onMouseEnter={() => handleHover(opt)}
                          className={`
                            relative text-left border transition-all duration-200 flex items-start gap-4 group/btn touch-manipulation active:scale-[0.99]
                            ${isNorthStar ? 'p-5 md:p-6 rounded-sm' : 'p-4 rounded-sm'}
                            ${isSelected 
                              ? 'border-sun-primary bg-sun-primary text-white shadow-md' 
                              : 'border-sun-border bg-white hover:border-sun-primary hover:shadow-sm text-sun-primary active:bg-sun-right'
                            }
                          `}
                        >
                          <div className={`mt-0.5 shrink-0 transition-colors ${isSelected ? 'text-sun-accent' : 'text-sun-tertiary group-hover/btn:text-sun-primary'}`}>
                             {q.type === 'single' ? (
                                isSelected ? (
                                    <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                                    </div>
                                ) : (
                                    <Circle size={20} className="opacity-40" />
                                )
                             ) : (
                                isSelected ? (
                                    <div className="w-5 h-5 rounded-sm bg-white text-sun-primary flex items-center justify-center border border-white">
                                        <Check size={14} />
                                    </div>
                                ) : (
                                    <Square size={20} className="opacity-40" />
                                )
                             )}
                          </div>

                          <div className="flex-1">
                            <span className={`leading-snug block transition-colors ${isNorthStar ? 'text-base md:text-lg font-medium' : 'text-sm'} ${isSelected ? 'text-white' : 'text-sun-primary'}`}>
                                {opt.label}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
