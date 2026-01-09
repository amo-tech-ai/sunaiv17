
import React from 'react';
import { AppState } from '../../types';
import { Step1Context } from './Step1Context';
import { Step2Diagnostics } from './Step2Diagnostics';
import { Step3Systems } from './Step3Systems';
import { Step4Summary } from './Step4Summary';

interface WizardFlowProps {
  step: number;
  state: AppState;
  isAnalyzing: boolean;
  updateData: (section: keyof AppState['data'], value: any) => void;
  updateNestedData: (section: 'priorities' | 'readiness', key: string, value: any) => void;
  setAiQuestions: (qs: any) => void;
  setRecommendations: (recs: AppState['aiState']['recommendations']) => void;
  setAnalysis: (analysis: AppState['aiState']['readinessAnalysis']) => void;
  setRoadmap: (roadmap: AppState['aiState']['roadmap']) => void;
  setStream: (text: string) => void;
  onUrlBlur: () => void;
}

export const WizardFlow: React.FC<WizardFlowProps> = ({
  step,
  state,
  isAnalyzing,
  updateData,
  updateNestedData,
  setAiQuestions,
  setRecommendations,
  setAnalysis,
  setRoadmap,
  setStream,
  onUrlBlur,
}) => {
  const { data, aiState } = state;

  switch (step) {
    case 1:
      return (
        <Step1Context 
          data={data}
          updateData={updateData}
          onUrlBlur={onUrlBlur}
          isAnalyzing={isAnalyzing}
        />
      );
    case 2:
      return (
        <Step2Diagnostics 
          industry={data.industry}
          selectedServices={data.selectedServices}
          documentInsights={aiState.documentInsights}
          diagnosticAnswers={data.diagnosticAnswers}
          aiQuestions={aiState.questions}
          updateData={updateData}
          setAiQuestions={setAiQuestions}
          setStream={setStream}
        />
      );
    case 3:
      return (
        <Step3Systems 
          selectedSystems={data.selectedSystems}
          data={data}
          aiRecommendations={aiState.recommendations}
          updateData={updateData}
          setRecommendations={setRecommendations}
          setStream={setStream}
        />
      );
    case 4:
      return (
        <Step4Summary 
          state={state}
          updateData={updateData}
          setAnalysis={setAnalysis}
          setStream={setStream}
        />
      );
    default:
      return null;
  }
};
