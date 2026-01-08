
import React, { useEffect, useState } from 'react';
import { Loader2, ArrowRight, Lightbulb, Check, Circle, Square, Info } from 'lucide-react';
import { AppState, DiagnosticSection, DiagnosticOption } from '../../types';
import { extractor } from '../../services/gemini/extractor';

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

  useEffect(() => {
    // Only fetch if questions haven't been generated yet for this industry context
    if (!aiQuestions || aiQuestions.length === 0) {
      const fetchQuestions = async () => {
        setLoading(true);
        setStream(`Consultant is analyzing your tech stack (${selectedServices.join(', ') || 'Standard'})...\n\nSearching for industry-specific bottlenecks in ${industry}...`);
        
        try {
          const result = await extractor.generateQuestions(industry, selectedServices, documentInsights);
          
          if (result && result.length > 0) {
            setAiQuestions(result);
            setStream(`**Diagnostics Generated**\n\nI've structured a deep-dive based on your ${industry.replace('_', ' ')} context.\n\nHover over any question to understand why it's critical for your roadmap.`);
          } else {
             // Fallback if AI fails to generate valid sections
             throw new Error("No sections generated");
          }
        } catch (e) {
          console.error(e);
          setStream("I encountered an issue generating custom diagnostics. Please try refreshing or proceed manually.");
        } finally {
          setLoading(false);
        }
      };
      fetchQuestions();
    }
  }, [industry]);

  const handleSelection = (questionId: string, optionLabel: string, type: 'single' | 'multi') => {
    const currentAnswers = diagnosticAnswers[questionId] || [];
    let newAnswers: string[];

    if (type === 'single') {
      // Toggle off if clicking same option, otherwise set new
      if (currentAnswers.includes(optionLabel)) {
        newAnswers = [];
      } else {
        newAnswers = [optionLabel];
      }
    } else {
      // Multi-select toggle
      if (currentAnswers.includes(optionLabel)) {
        newAnswers = currentAnswers.filter(a => a !== optionLabel);
      } else {
        newAnswers = [...currentAnswers, optionLabel];
      }
    }

    updateData('diagnosticAnswers', {
      ...diagnosticAnswers,
      [questionId]: newAnswers
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-6 animate-fade-in py-20">
        <div className="relative">
          <div className="absolute inset-0 bg-sun-accent/20 rounded-full animate-ping"></div>
          <div className="bg-white p-4 rounded-full border border-sun-border shadow-sm relative z-10">
            <Loader2 size={32} className="animate-spin text-sun-accent" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="font-serif text-xl text-sun-primary">Analyzing Business Context...</h3>
          <p className="text-sm text-sun-secondary max-w-md mx-auto">
            The Extractor Agent is reviewing your services and documents to formulate relevant diagnostic questions.
          </p>
        </div>
      </div>
    );
  }

  // Cast aiQuestions to correct type if needed, though props should handle it
  const sections = aiQuestions as unknown as DiagnosticSection[];

  if (!sections || sections.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <p className="text-sun-secondary">Unable to load diagnostic questions. Please try refreshing.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-12 pb-20">
      <div>
        <h1 className="font-serif text-4xl text-sun-primary mb-3">Industry Diagnostics</h1>
        <p className="text-sun-secondary font-sans max-w-xl leading-relaxed">
          Based on your profile, we've identified these potential focus areas. 
          Your answers help us configure the <span className="font-semibold text-sun-primary capitalize">{industry.replace('_', ' ')}</span> engine.
        </p>
      </div>

      <div className="space-y-16">
        {sections.map((section) => (
          <div key={section.id} className="animate-fade-in">
            <div className="mb-8 border-b border-sun-border pb-4">
              <h2 className="text-sm font-bold tracking-widest text-sun-muted uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-sun-accent rounded-full"></span>
                {section.title}
              </h2>
              <p className="text-sm text-sun-secondary mt-2 max-w-2xl">{section.description}</p>
            </div>

            <div className="space-y-12">
              {section.questions.map((q) => (
                <div 
                  key={q.id} 
                  className="group relative transition-all duration-300 scroll-mt-24"
                  onMouseEnter={() => setStream(`**Context: ${q.text}**\n\n${q.ai_hint}`)}
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <label className="text-lg font-serif font-medium text-sun-primary group-hover:text-sun-accent transition-colors cursor-help w-full">
                      {q.text}
                      <span className="ml-2 inline-block opacity-0 group-hover:opacity-100 transition-opacity text-sun-accent">
                         <Info size={14} />
                      </span>
                    </label>
                    <span className="text-xs font-bold uppercase tracking-wider text-sun-tertiary shrink-0 ml-4">
                        {q.type === 'multi' ? 'Multi-Select' : 'Single Select'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {q.options.map((opt: DiagnosticOption) => {
                      const isSelected = (diagnosticAnswers[q.id] || []).includes(opt.label);
                      return (
                        <button
                          key={opt.label}
                          onClick={() => handleSelection(q.id, opt.label, q.type)}
                          className={`
                            relative p-5 text-left border rounded-sm transition-all duration-200 flex items-start gap-4 group/btn
                            ${isSelected 
                              ? 'border-sun-accent bg-sun-accent/5 shadow-sm' 
                              : 'border-sun-border bg-white hover:border-sun-primary/30 hover:bg-sun-right/30'
                            }
                          `}
                        >
                          <div className={`mt-0.5 shrink-0 transition-colors ${isSelected ? 'text-sun-accent' : 'text-sun-border group-hover/btn:text-sun-tertiary'}`}>
                             {q.type === 'single' ? (
                                isSelected ? <div className="w-5 h-5 rounded-full border-2 border-sun-accent flex items-center justify-center"><div className="w-2.5 h-2.5 bg-sun-accent rounded-full" /></div> : <Circle size={20} />
                             ) : (
                                isSelected ? <div className="w-5 h-5 rounded-sm bg-sun-accent border border-sun-accent flex items-center justify-center text-white"><Check size={14} /></div> : <Square size={20} />
                             )}
                          </div>

                          <div className="flex-1">
                            <span className={`text-sm leading-snug transition-colors ${isSelected ? 'text-sun-primary font-medium' : 'text-sun-secondary group-hover/btn:text-sun-primary'}`}>
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
