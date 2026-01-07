
import React from 'react';
import { AppState } from '../../types';
import { CheckCircle2, Server } from 'lucide-react';

interface ProgressPanelProps {
  step: number;
  industry: AppState['data']['industry'];
  selectedServices?: string[]; // New optional prop
}

export const ProgressPanel: React.FC<ProgressPanelProps> = ({ step, industry, selectedServices = [] }) => {
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

        {/* Dynamic Context Block - Appears from Step 2 onwards */}
        {step >= 2 && (
          <div className="mt-12 animate-fade-in">
            <div className="text-xs font-bold tracking-widest text-sun-muted uppercase mb-4 flex items-center gap-2">
              <CheckCircle2 size={12} className="text-green-600" />
              Verified Context
            </div>
            
            <div className="space-y-3">
              <div className="bg-white/50 border border-sun-border p-3 rounded-sm">
                <span className="block text-[10px] text-sun-tertiary uppercase tracking-wider mb-1">Industry</span>
                <span className="text-sm font-medium text-sun-primary capitalize">{industry.replace('_', ' ')}</span>
              </div>

              {selectedServices.length > 0 && (
                <div className="bg-white/50 border border-sun-border p-3 rounded-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Server size={12} className="text-sun-tertiary"/>
                    <span className="block text-[10px] text-sun-tertiary uppercase tracking-wider">Tech Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedServices.slice(0, 4).map(service => (
                      <span key={service} className="text-[10px] bg-sun-bg border border-sun-border px-1.5 py-0.5 rounded text-sun-secondary">
                        {service}
                      </span>
                    ))}
                    {selectedServices.length > 4 && (
                      <span className="text-[10px] text-sun-tertiary px-1">+{selectedServices.length - 4}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="text-xs text-sun-tertiary font-sans tracking-wide mt-12">
        SUN AI AGENCY © 2024
      </div>
    </div>
  );
};
