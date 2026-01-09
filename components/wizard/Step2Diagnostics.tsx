
import React from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { AppState, DiagnosticSection } from '../../types';
import { Button } from '../Button';
import { useDiagnostics } from './diagnostics/useDiagnostics';
import { DiagnosticHeader } from './diagnostics/DiagnosticHeader';
import { FocusBlock } from './diagnostics/FocusBlock';
import { GridBlock } from './diagnostics/GridBlock';
import { ReadinessBlock } from './diagnostics/ReadinessBlock';
import { GenericBlock } from './diagnostics/GenericBlock';

interface Step2DiagnosticsProps {
  industry: AppState['data']['industry'];
  selectedServices: string[];
  documentInsights?: string;
  diagnosticAnswers: AppState['data']['diagnosticAnswers'];
  aiQuestions: AppState['aiState']['questions'];
  updateData: (section: keyof AppState['data'], value: any) => void;
  setAiQuestions: (qs: any) => void;
  setStream: (text: string) => void;
  priorities?: AppState['data']['priorities'];
}

export const Step2Diagnostics: React.FC<Step2DiagnosticsProps> = ({ 
  industry, 
  selectedServices,
  documentInsights,
  diagnosticAnswers, 
  aiQuestions,
  updateData,
  setAiQuestions,
  setStream,
  priorities
}) => {
  const { loading, error, handleSelection, handleHover, handleMouseLeave } = useDiagnostics({
    industry,
    selectedServices,
    documentInsights,
    diagnosticAnswers,
    aiQuestions,
    updateData,
    setAiQuestions,
    setStream,
    priorities
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] space-y-8 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 bg-sun-accent/20 rounded-full animate-ping"></div>
          <div className="bg-white p-6 rounded-full border border-sun-border shadow-sm relative z-10">
            <Loader2 size={40} className="animate-spin text-sun-accent" />
          </div>
        </div>
        <div className="text-center space-y-3 max-w-md px-4">
          <h3 className="font-serif text-2xl text-sun-primary">Consulting Industry Data</h3>
          <div className="text-sun-secondary leading-relaxed">
            Configuring diagnostic layer for {industry.replace('_', ' ')}...
          </div>
        </div>
      </div>
    );
  }

  const sections = aiQuestions as unknown as DiagnosticSection[];

  if (error || !sections || sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] animate-fade-in space-y-6 text-center px-4">
        <div className="bg-red-50 p-4 rounded-full">
           <RefreshCw className="text-sun-tertiary" size={32} />
        </div>
        <div className="max-w-md">
          <h3 className="text-lg font-serif text-sun-primary mb-2">Connection Issue</h3>
          <p className="text-sun-secondary mb-6">Unable to load diagnostic questions.</p>
          <Button onClick={() => window.location.reload()}>Retry with Offline Mode</Button>
        </div>
      </div>
    );
  }

  // Identify specific blocks
  const focusBlock = sections.find(s => s.id.includes('focus'));
  const revenueBlock = sections.find(s => s.id.includes('pain') || s.id.includes('revenue'));
  const timeBlock = sections.find(s => s.id.includes('time'));
  const readinessBlock = sections.find(s => s.id.includes('readiness'));

  const genericBlocks = sections.filter(s => 
    !s.id.includes('focus') && 
    !s.id.includes('pain') && 
    !s.id.includes('revenue') && 
    !s.id.includes('time') && 
    !s.id.includes('readiness')
  );

  return (
    <div className="animate-fade-in space-y-16 pb-20">
      
      <DiagnosticHeader industry={industry} />

      {focusBlock && focusBlock.questions.map(q => (
        <FocusBlock 
          key={q.id}
          question={q}
          answers={diagnosticAnswers[q.id] || []}
          onSelect={(opt) => handleSelection(q.id, opt, 'single')}
          onHover={handleHover}
          onLeave={handleMouseLeave}
        />
      ))}

      {revenueBlock && (
        <GridBlock 
          key={revenueBlock.id}
          section={revenueBlock}
          iconType="revenue"
          answers={diagnosticAnswers[revenueBlock.questions[0].id] || []}
          onSelect={(opt) => handleSelection(revenueBlock.questions[0].id, opt, 'multi')}
          onHover={handleHover}
          onLeave={handleMouseLeave}
        />
      )}

      {timeBlock && (
        <GridBlock 
          key={timeBlock.id}
          section={timeBlock}
          iconType="time"
          answers={diagnosticAnswers[timeBlock.questions[0].id] || []}
          onSelect={(opt) => handleSelection(timeBlock.questions[0].id, opt, 'multi')}
          onHover={handleHover}
          onLeave={handleMouseLeave}
        />
      )}

      {readinessBlock && readinessBlock.questions.map(q => (
        <ReadinessBlock 
          key={q.id}
          question={q}
          answers={diagnosticAnswers[q.id] || []}
          onSelect={(opt) => handleSelection(q.id, opt, 'single')}
          onHover={handleHover}
          onLeave={handleMouseLeave}
        />
      ))}

      {genericBlocks.map(section => (
         <GenericBlock 
            key={section.id}
            section={section}
            answers={diagnosticAnswers[section.questions[0]?.id] || []}
            onSelect={handleSelection}
         />
      ))}

    </div>
  );
};
