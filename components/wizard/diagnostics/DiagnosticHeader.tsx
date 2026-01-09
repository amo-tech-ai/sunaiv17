
import React from 'react';

interface DiagnosticHeaderProps {
  industry: string;
}

export const DiagnosticHeader: React.FC<DiagnosticHeaderProps> = ({ industry }) => (
  <div>
    <h1 className="font-serif text-3xl md:text-4xl text-sun-primary mb-3">Diagnostic Assessment</h1>
    <p className="text-sun-secondary font-sans max-w-xl leading-relaxed">
      These questions are adapted to the {industry.replace('_', ' ')} vertical. Your answers will directly shape the system architecture in the next step.
    </p>
  </div>
);
