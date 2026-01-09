
import React from 'react';
import { TrendingUp, Clock, Check, Square } from 'lucide-react';
import { DiagnosticSection, DiagnosticOption } from '../../../types';

interface GridBlockProps {
  section: DiagnosticSection;
  iconType: 'revenue' | 'time';
  answers: string[];
  onSelect: (option: DiagnosticOption) => void;
  onHover: (option: DiagnosticOption) => void;
  onLeave: () => void;
}

export const GridBlock: React.FC<GridBlockProps> = ({ section, iconType, answers, onSelect, onHover, onLeave }) => {
  const question = section.questions[0];
  if (!question) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 border-b border-sun-border pb-2">
        {iconType === 'revenue' ? (
            <TrendingUp className="text-green-600" size={20} />
        ) : (
            <Clock className="text-blue-600" size={20} />
        )}
        <h2 className="text-sm font-bold tracking-widest text-sun-primary uppercase">
            {iconType === 'revenue' ? 'Revenue Friction' : 'Time Drains'}
        </h2>
      </div>
      <h3 className="font-serif text-xl text-sun-primary">{question.text}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map(opt => {
           const isSelected = answers.includes(opt.label);
           return (
             <button
                key={opt.label}
                onClick={() => onSelect(opt)}
                onMouseEnter={() => onHover(opt)}
                onMouseLeave={onLeave}
                className={`
                  text-left p-4 border rounded-sm transition-all duration-200 flex items-start gap-3 h-full
                  ${isSelected 
                    ? 'border-sun-primary bg-sun-bg ring-1 ring-sun-primary' 
                    : 'border-sun-border bg-white hover:border-sun-primary'
                  }
                `}
             >
                <div className={`mt-1 shrink-0 ${isSelected ? 'text-sun-primary' : 'text-sun-border'}`}>
                    {isSelected ? <Check size={18} /> : <Square size={18} />}
                </div>
                <span className="text-sm font-medium text-sun-primary leading-snug">{opt.label}</span>
             </button>
           );
        })}
      </div>
    </section>
  );
};
