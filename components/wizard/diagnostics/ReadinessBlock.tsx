
import React from 'react';
import { Zap, Check } from 'lucide-react';
import { DiagnosticSection, DiagnosticOption } from '../../../types';

interface ReadinessBlockProps {
  question: DiagnosticSection['questions'][0];
  answers: string[];
  onSelect: (option: DiagnosticOption) => void;
  onHover: (option: DiagnosticOption) => void;
  onLeave: () => void;
}

export const ReadinessBlock: React.FC<ReadinessBlockProps> = ({ question, answers, onSelect, onHover, onLeave }) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 border-b border-sun-border pb-2">
        <Zap className="text-sun-accent" size={20} />
        <h2 className="text-sm font-bold tracking-widest text-sun-primary uppercase">Pace of Implementation</h2>
      </div>
      <h3 className="font-serif text-xl text-sun-primary">{question.text}</h3>
      
      <div className="flex flex-col gap-3">
        {question.options.map((opt, idx) => {
           const isSelected = answers.includes(opt.label);
           return (
             <button
                key={opt.label}
                onClick={() => onSelect(opt)}
                onMouseEnter={() => onHover(opt)}
                onMouseLeave={onLeave}
                className={`
                  text-left p-4 border rounded-sm transition-all duration-200 flex items-center justify-between
                  ${isSelected 
                    ? 'border-sun-primary bg-white ring-1 ring-sun-primary shadow-sm' 
                    : 'border-sun-border bg-white hover:bg-sun-bg'
                  }
                `}
             >
                <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isSelected ? 'bg-sun-primary text-white' : 'bg-sun-bg text-sun-tertiary'}`}>
                        {idx + 1}
                    </div>
                    <span className="text-sm font-medium text-sun-primary">{opt.label}</span>
                </div>
                {isSelected && <Check size={18} className="text-sun-primary" />}
             </button>
           );
        })}
      </div>
    </section>
  );
};
