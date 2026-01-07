
import React from 'react';
import { AppState } from '../../types';
import { Step1Context } from './Step1Context';
import { Step2Diagnostics } from './Step2Diagnostics';
import { Step3Systems } from './Step3Systems';
import { Step4Readiness } from './Step4Readiness';
import { Step5Plan } from './Step5Plan';

interface WizardFlowProps {
  step: number;
  data: AppState['data'];
  aiState: AppState['aiState'];
  isAnalyzing: boolean;
  updateData: (section: keyof AppState['data'], value: any) => void;
  updateNestedData: (section: 'priorities' | 'readiness', key: string, value: any) => void;
  setAiQuestions: (qs: AppState['aiState']['questions']) => void;
  setRecommendations: (recs: AppState['aiState']['recommendations']) => void;
  setAnalysis: (analysis: AppState['aiState']['readinessAnalysis']) => void;
  setRoadmap: (roadmap: AppState['aiState']['roadmap']) => void;
  setStream: (text: string) => void;
  onUrlBlur: () => void;
}

export const WizardFlow: React.FC<WizardFlowProps> = ({
  step,
  data,
  aiState,
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
          priorities={data.priorities}
          aiQuestions={aiState.questions}
          updateNestedData={updateNestedData}
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
        <Step4Readiness 
          readiness={data.readiness}
          industry={data.industry}
          analysis={aiState.readinessAnalysis}
          updateNestedData={updateNestedData}
          setAnalysis={setAnalysis}
          setStream={setStream}
        />
      );
    case 5:
      return (
        <Step5Plan 
          state={{ step, completed: false, data, aiState, dashboardState: { tasks: [], initialized: false } }} // Constructing temp AppState or update props to take individual
          setRoadmap={setRoadmap}
          setStream={setStream}
        />
      );
    default:
      return null;
  }
};
