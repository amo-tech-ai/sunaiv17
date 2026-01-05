
import React, { useEffect, useState } from 'react';
import { Input, Select } from '../Input';
import { AppState } from '../../types';
import { extractor } from '../../services/gemini/extractor';

interface Step2DiagnosticsProps {
  industry: AppState['data']['industry'];
  priorities: AppState['data']['priorities'];
  aiQuestions: AppState['aiState']['questions'];
  updateNestedData: (section: 'priorities', key: string, value: any) => void;
  setAiQuestions: (qs: AppState['aiState']['questions']) => void;
  setStream: (text: string) => void;
}

export const Step2Diagnostics: React.FC<Step2DiagnosticsProps> = ({ 
  industry, 
  priorities, 
  aiQuestions,
  updateNestedData,
  setAiQuestions,
  setStream
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If we have questions for a different industry, or no questions, fetch them.
    // Ideally we track which industry generated the questions, but for now check empty.
    if (aiQuestions.length === 0) {
      const fetchQuestions = async () => {
        setLoading(true);
        setStream("Analyzing industry vertical to identify key operational metrics...");
        const qs = await extractor.generateQuestions(industry);
        setAiQuestions(qs);
        setLoading(false);
        setStream(`I've identified 3 key metrics for ${industry} that typically yield the highest ROI when automated.`);
      };
      fetchQuestions();
    }
  }, [industry]);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 bg-sun-border/30 rounded w-3/4"></div>
        <div className="space-y-4">
          <div className="h-20 bg-sun-border/20 rounded"></div>
          <div className="h-20 bg-sun-border/20 rounded"></div>
          <div className="h-20 bg-sun-border/20 rounded"></div>
        </div>
      </div>
    );
  }

  // Map dynamic questions to our fixed state keys for simplicity in Phase 1
  const keys = ['moneyFocus', 'marketingFocus', 'responseSpeed'];

  return (
    <div className="animate-fade-in space-y-8">
      <h1 className="font-serif text-4xl text-sun-primary mb-2">Industry Deep Dive</h1>
      <p className="text-sun-secondary font-sans mb-8">Specific questions for {industry.replace('_', ' ')}.</p>

      <div className="space-y-8 max-w-xl">
        {aiQuestions.map((q, idx) => {
           const stateKey = keys[idx];
           if (!stateKey) return null;

           return (
             <div key={q.id} onFocus={() => setStream(`**Context**: ${q.context}`)}>
               <Input 
                 label={`${idx + 1}. ${q.label}`}
                 placeholder={q.placeholder || "Type your answer..."}
                 value={priorities[stateKey as keyof typeof priorities]}
                 onChange={(e) => updateNestedData('priorities', stateKey, e.target.value)}
               />
             </div>
           );
        })}
        
        {aiQuestions.length > 0 && (
          <div className="pt-4">
              <label className="text-xs font-semibold uppercase tracking-widest text-sun-muted font-sans block mb-4">
              4. Main Priority for next quarter
            </label>
            <div className="grid grid-cols-2 gap-4">
              {['Revenue Growth', 'Lead Volume', 'Conversion Rate', 'Retention'].map(opt => (
                <button
                  key={opt}
                  onClick={() => updateNestedData('priorities', 'mainPriority', opt)}
                  className={`p-4 border text-sm font-medium transition-all text-left ${
                    priorities.mainPriority === opt 
                    ? 'border-sun-primary bg-sun-primary text-white' 
                    : 'border-sun-border text-sun-secondary hover:border-sun-underline'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
