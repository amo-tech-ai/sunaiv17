
import React, { useEffect, useState } from 'react';
import { Check, AlertCircle, Sparkles } from 'lucide-react';
import { AppState } from '../../types';
import { scorer } from '../../services/gemini/scorer';

interface Step4ReadinessProps {
  readiness: AppState['data']['readiness'];
  industry: AppState['data']['industry'];
  analysis: AppState['aiState']['readinessAnalysis'];
  updateNestedData: (section: 'readiness', key: string, value: boolean) => void;
  setAnalysis: (data: AppState['aiState']['readinessAnalysis']) => void;
  setStream: (text: string) => void;
}

export const Step4Readiness: React.FC<Step4ReadinessProps> = ({ 
  readiness, 
  industry, 
  analysis,
  updateNestedData,
  setAnalysis,
  setStream
}) => {
  
  // Debounce the AI call so we don't spam API on every checkbox click
  useEffect(() => {
    const timer = setTimeout(async () => {
      const result = await scorer.analyzeReadiness(readiness, industry);
      setAnalysis(result);
      if (result.summary) {
        setStream(result.summary);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [readiness]); // Re-run when readiness changes

  // Use the AI score if available, otherwise local calc
  const displayScore = analysis.score > 0 ? analysis.score : Object.values(readiness).filter(Boolean).length * 25;

  return (
    <div className="animate-fade-in space-y-8">
      <h1 className="font-serif text-4xl text-sun-primary mb-2">Readiness Check</h1>
      <p className="text-sun-secondary font-sans mb-8">Identify potential bottlenecks.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
            {[
              { key: 'dataReady', label: 'Customer data is centralized & accessible' },
              { key: 'teamOwner', label: 'There is a dedicated project lead' },
              { key: 'toolsReady', label: 'Current software stack is documented' },
              { key: 'budgetApproved', label: 'Budget is approved for implementation' },
            ].map((item) => (
              <label key={item.key} className="flex items-center gap-4 cursor-pointer group p-4 border border-sun-border rounded-sm hover:bg-white transition-colors">
                <div className={`w-6 h-6 border flex items-center justify-center transition-colors ${
                  readiness[item.key as keyof typeof readiness]
                  ? 'bg-sun-primary border-sun-primary text-white'
                  : 'border-sun-underline bg-white'
                }`}>
                  {readiness[item.key as keyof typeof readiness] && <Check size={14} />}
                </div>
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={readiness[item.key as keyof typeof readiness]}
                  onChange={(e) => updateNestedData('readiness', item.key, e.target.checked)}
                />
                <span className="font-sans text-sun-primary">{item.label}</span>
              </label>
            ))}
        </div>

        <div className="bg-sun-right p-8 flex flex-col items-center justify-center text-center border border-sun-border">
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="60" fill="none" stroke="#EFE9E4" strokeWidth="8" />
                <circle 
                  cx="64" cy="64" r="60" 
                  fill="none" 
                  stroke="#F59E0B" 
                  strokeWidth="8" 
                  strokeDasharray={377}
                  strokeDashoffset={377 - (377 * displayScore) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-serif text-3xl text-sun-primary">
                {displayScore}
              </div>
          </div>
          <h3 className="font-serif text-xl mb-2">Readiness Score</h3>
          <div className="text-xs text-sun-tertiary uppercase tracking-widest font-semibold mb-6">
            {displayScore < 50 ? 'Needs Preparation' : displayScore < 75 ? 'Good Start' : 'Excellent'}
          </div>
          
          <div className="w-full text-left space-y-3">
              {analysis.risks.length > 0 ? (
                <>
                  <div className="flex items-start gap-2 text-xs text-sun-secondary">
                    <AlertCircle size={12} className="text-sun-accent mt-0.5 shrink-0"/>
                    <span>Risk: {analysis.risks[0]}</span>
                  </div>
                   <div className="flex items-start gap-2 text-xs text-sun-secondary">
                    <Sparkles size={12} className="text-sun-accent mt-0.5 shrink-0"/>
                    <span>Win: {analysis.wins[0]}</span>
                  </div>
                </>
              ) : (
                <div className="text-xs text-sun-muted text-center italic">Updating analysis...</div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
