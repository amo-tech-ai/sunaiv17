import React from 'react';
import { AppState } from '../../types';

interface ProgressPanelProps {
  step: number;
  industry: AppState['data']['industry'];
}

export const ProgressPanel: React.FC<ProgressPanelProps> = ({ step, industry }) => {
  const progress = [10, 30, 55, 75, 100][step - 1];

  const titles = [
    "Getting to know your business",
    "Industry Deep Dive",
    "System Selection",
    "Readiness Check",
    "Your 30-Day Plan"
  ];

  const descriptions = [
    "We start by understanding who you are to tailor the AI models specifically to your market context.",
    `Locked context: ${industry.charAt(0).toUpperCase() + industry.slice(1).replace('_', ' ')}.`,
    "Focusing on systems over tools ensures long-term revenue growth rather than short-term efficiency.",
    "Checking your infrastructure prevents bottlenecks during the implementation phase.",
    "A concrete roadmap to ensure we hit the ground running from Day 1."
  ];

  return (
    <div className="h-full flex flex-col justify-between p-8 md:p-12">
      <div>
        <div className="mb-8">
          <span className="font-sans text-xs font-bold tracking-widest text-sun-accent uppercase mb-2 block">
            Step {step} of 5
          </span>
          <div className="h-1 w-full bg-sun-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-sun-accent transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <h2 className="font-serif text-2xl md:text-3xl text-sun-primary leading-tight mb-4">
          {titles[step - 1]}
        </h2>
        <p className="font-sans text-sm text-sun-secondary leading-relaxed opacity-80">
          {descriptions[step - 1]}
        </p>
      </div>
      
      <div className="text-xs text-sun-tertiary font-sans tracking-wide mt-12">
        SUN AI AGENCY © 2024
      </div>
    </div>
  );
};
