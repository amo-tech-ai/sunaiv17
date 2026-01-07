
import React, { useEffect, useState } from 'react';
import { Loader2, ArrowRight, Lightbulb } from 'lucide-react';
import { AppState } from '../../types';
import { extractor } from '../../services/gemini/extractor';

interface Step2DiagnosticsProps {
  industry: AppState['data']['industry'];
  selectedServices: string[];
  documentInsights?: string;
  priorities: AppState['data']['priorities'];
  aiQuestions: AppState['aiState']['questions'];
  updateNestedData: (section: 'priorities', key: string, value: any) => void;
  setAiQuestions: (qs: AppState['aiState']['questions']) => void;
  setStream: (text: string) => void;
}

export const Step2Diagnostics: React.FC<Step2DiagnosticsProps> = ({ 
  industry, 
  selectedServices,
  documentInsights,
  priorities, 
  aiQuestions,
  updateNestedData,
  setAiQuestions,
  setStream
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (aiQuestions.length === 0) {
      const fetchQuestions = async () => {
        setLoading(true);
        setStream(`Consultant is analyzing your tech stack (${selectedServices.join(', ') || 'Standard'})...\n\nSearching for industry-specific bottlenecks in ${industry}...`);
        
        try {
          const qs = await extractor.generateQuestions(industry, selectedServices, documentInsights);
          setAiQuestions(qs);
          setStream(`I've generated 4 diagnostic questions based on your specific context. These help me map your pain points to the right AI systems.`);
        } catch (e) {
          console.error(e);
          setStream("I encountered an issue generating custom diagnostics. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      fetchQuestions();
    }
  }, [industry]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-6 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 bg-sun-accent/20 rounded-full animate-ping"></div>
          <div className="bg-white p-4 rounded-full border border-sun-border shadow-sm relative z-10">
            <Loader2 size={32} className="animate-spin text-sun-accent" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="font-serif text-xl text-sun-primary">Analyzing Business Context...</h3>
          <p className="text-sm text-sun-secondary max-w-md">
            The Extractor Agent is reviewing your services and documents to formulate relevant diagnostic questions.
          </p>
        </div>
      </div>
    );
  }

  // Mapping from Question Category to State Key
  const categoryMap: Record<string, keyof typeof priorities> = {
    'sales': 'moneyFocus',
    'marketing': 'marketingFocus',
    'speed': 'responseSpeed',
    'priority': 'mainPriority'
  };

  const categoryLabels: Record<string, string> = {
    'sales': 'Growth',
    'marketing': 'Visibility',
    'speed': 'Efficiency',
    'priority': 'Focus'
  };

  return (
    <div className="animate-fade-in space-y-12">
      <div>
        <h1 className="font-serif text-4xl text-sun-primary mb-3">Industry Diagnostics</h1>
        <p className="text-sun-secondary font-sans max-w-xl leading-relaxed">
          Select the option that best describes your current situation. 
          <br/>These are tailored to the <span className="font-semibold text-sun-primary">{industry.replace('_', ' ')}</span> sector.
        </p>
      </div>

      <div className="space-y-10">
        {aiQuestions.map((q, idx) => {
           const stateKey = categoryMap[q.category] || categoryMap['sales'];
           const currentValue = priorities[stateKey];

           return (
             <div 
               key={q.id} 
               className="group relative"
               onMouseEnter={() => setStream(`**${q.title}**\n\n${q.context_reasoning}`)}
             >
               <div className="flex items-baseline gap-3 mb-4">
                 <span className="text-[10px] font-bold tracking-widest text-sun-muted uppercase bg-sun-bg border border-sun-border px-2 py-1 rounded">
                   {categoryLabels[q.category] || 'General'}
                 </span>
                 <label className="text-lg font-serif font-medium text-sun-primary group-hover:text-sun-accent transition-colors">
                   {q.title}
                 </label>
                 <div className="hidden group-hover:block absolute right-0 top-0">
                    <Lightbulb size={16} className="text-sun-accent animate-pulse" />
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-0 md:pl-2">
                 {q.options.map(opt => {
                   const isSelected = currentValue === opt.label;
                   return (
                     <button
                       key={opt.id}
                       onClick={() => updateNestedData('priorities', stateKey, opt.label)}
                       className={`
                         relative p-4 text-left border rounded-sm transition-all duration-200
                         ${isSelected 
                           ? 'border-sun-accent bg-sun-accent/5 shadow-sm scale-[1.01]' 
                           : 'border-sun-border bg-white hover:border-sun-primary/50'
                         }
                       `}
                     >
                       <div className="flex justify-between items-start gap-2">
                         <span className={`text-sm leading-snug ${isSelected ? 'text-sun-primary font-medium' : 'text-sun-secondary'}`}>
                           {opt.label}
                         </span>
                         {isSelected && <ArrowRight size={14} className="text-sun-accent mt-1 shrink-0" />}
                       </div>
                     </button>
                   );
                 })}
               </div>
             </div>
           );
        })}
      </div>
    </div>
  );
};
