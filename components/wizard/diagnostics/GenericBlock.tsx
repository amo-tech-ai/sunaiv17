
import React from 'react';
import { DiagnosticSection, DiagnosticOption } from '../../../types';

interface GenericBlockProps {
  section: DiagnosticSection;
  answers: string[];
  onSelect: (questionId: string, option: DiagnosticOption, type: 'single' | 'multi') => void;
}

export const GenericBlock: React.FC<GenericBlockProps> = ({ section, answers, onSelect }) => {
  return (
    <div className="space-y-6 pt-8 border-t border-sun-border">
      <h3 className="font-serif text-xl text-sun-primary">{section.title}</h3>
      {section.questions.map(q => (
          <div key={q.id} className="grid gap-3">
              {q.options.map(opt => {
                  const isSelected = answers.includes(opt.label);
                  return (
                      <button
                          key={opt.label}
                          onClick={() => onSelect(q.id, opt, q.type)}
                          className={`text-left p-4 border rounded-sm ${isSelected ? 'bg-sun-primary text-white' : 'bg-white'}`}
                      >
                          {opt.label}
                      </button>
                  )
              })}
          </div>
      ))}
    </div>
  );
};
