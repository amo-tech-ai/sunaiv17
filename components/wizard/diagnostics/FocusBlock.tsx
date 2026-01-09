
import React from 'react';
import { Target } from 'lucide-react';
import { DiagnosticSection, DiagnosticOption } from '../../../types';

interface FocusBlockProps {
  question: DiagnosticSection['questions'][0];
  answers: string[];
  onSelect: (option: DiagnosticOption) => void;
  onHover: (option: DiagnosticOption) => void;
  onLeave: () => void;
}

export const FocusBlock: React.FC<FocusBlockProps> = ({ question, answers, onSelect, onHover, onLeave }) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 border-b border-sun-border pb-2">
        <Target className="text-sun-accent" size={20} />
        <h2 className="text-sm font-bold tracking-widest text-sun-primary uppercase">Primary Focus</h2>
      </div>
      <h3 className="font-serif text-xl text-sun-primary">{question.text}</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {question.options.map(opt => {
           const isSelected = answers.includes(opt.label);
           return (
             <button
                key={opt.label}
                onClick={() => onSelect(opt)}
                onMouseEnter={() => onHover(opt)}
                onMouseLeave={onLeave}
                className={`
                  text-left p-6 border rounded-sm transition-all duration-300 flex items-center justify-between group
                  ${isSelected 
                    ? 'border-sun-primary bg-sun-primary text-white shadow-md' 
                    : 'border-sun-border bg-white hover:border-sun-primary hover:shadow-sm text-sun-primary'
                  }
                `}
             >
                <span className="text-lg font-medium">{opt.label}</span>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${isSelected ? 'border-white' : 'border-sun-border'}`}>
                    {isSelected && <div className="w-3 h-3 bg-white rounded-full" />}
                </div>
             </button>
           );
        })}
      </div>
    </section>
  );
};
