
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './components/Button';
import { Dashboard } from './components/Dashboard';
import { LandingPage } from './components/LandingPage';
import { analyst } from './services/gemini/analyst';
import { useWizardState } from './hooks/useWizardState';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthGuard } from './components/auth/AuthGuard';
import { useAuth } from './hooks/useAuth';

// Layout & Flow Components
import { WizardLayout } from './components/layout/WizardLayout';
import { WizardFlow } from './components/wizard/WizardFlow';
import { ProgressPanel } from './components/wizard/ProgressPanel';
import { IntelligencePanel } from './components/wizard/IntelligencePanel';

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const {
    state,
    setState,
    isTransitioning,
    setIsTransitioning,
    updateData,
    updateNestedData,
    setAiQuestions,
    setRecommendations,
    setAnalysis,
    setRoadmap,
    updateDashboardState,
    INITIAL_STATE
  } = useWizardState();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [intelligenceStream, setIntelligenceStream] = useState<string>("");
  const [showLanding, setShowLanding] = useState(true);

  // If we have a user session on mount, skip landing
  useEffect(() => {
      if (user && !authLoading) {
          setShowLanding(false);
      }
  }, [user, authLoading]);

  const nextStep = () => {
    if (state.step < 5) { // Restored to 5 steps
      setIsTransitioning(true);
      setTimeout(() => {
        setState(prev => ({ ...prev, step: prev.step + 1 }));
        setIntelligenceStream(""); 
        setIsTransitioning(false);
      }, 300);
    } else {
      setState(prev => ({ ...prev, completed: true }));
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset your progress?")) {
      setState(INITIAL_STATE);
      window.scrollTo(0, 0);
    }
  };

  const handleUrlBlur = async () => {
    if (!state.data.website && !state.data.businessName) return;
    
    setIsAnalyzing(true);
    setIntelligenceStream(""); 

    try {
      let docInsights = "";
      if (state.data.uploadedDocuments && state.data.uploadedDocuments.length > 0) {
        docInsights = await analyst.analyzeDocuments(state.data.uploadedDocuments);
        setState(prev => ({ 
          ...prev, 
          aiState: { ...prev.aiState, documentInsights: docInsights } 
        }));
      }

      const stream = analyst.analyzeBusinessStream(state.data.businessName, state.data.website);
      for await (const chunk of stream) {
        setIntelligenceStream(prev => prev + chunk);
      }
      
      const analysisResult = await analyst.classifyBusiness(
        state.data.businessName, 
        state.data.website, 
        state.data.description,
        state.data.selectedServices,
        docInsights
      );
      
      updateData('analysis', analysisResult);

      if (analysisResult.detected_industry) {
        updateData('industry', analysisResult.detected_industry);
        setAiQuestions([]); 
      }
      
      if (!state.data.description && analysisResult.business_model) {
        updateData('description', `Model: ${analysisResult.business_model}. ${analysisResult.observations?.[0] || ''}`);
      }
      
    } catch (err) {
      console.error("Analysis failed", err);
      setIntelligenceStream("Connection interrupted. Please verify your internet connection and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isNextDisabled = () => {
    if (state.step === 1) return !state.data.businessName || state.data.businessName.length < 2;
    if (state.step === 2) {
      const sections = state.aiState.questions;
      if (!sections || sections.length === 0) return true;
      const allQuestionsAnswered = sections.every(section => 
        section.questions.every(q => {
          const answers = state.data.diagnosticAnswers[q.id];
          return answers && answers.length > 0;
        })
      );
      return !allQuestionsAnswered;
    }
    if (state.step === 3) return state.data.selectedSystems.length === 0;
    if (state.step === 4) return state.aiState.readinessAnalysis.score === 0; // Wait for analysis
    if (state.step === 5) return state.aiState.roadmap.length === 0; // Wait for plan
    return false;
  };

  if (authLoading) return null;

  if (showLanding && !user) {
      return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <ErrorBoundary>
      {state.completed ? (
        <AuthGuard>
          <Dashboard 
            state={state} 
            onReset={handleReset} 
            updateDashboardState={updateDashboardState}
          />
        </AuthGuard>
      ) : (
        <WizardLayout
          isTransitioning={isTransitioning}
          leftPanel={
            <ProgressPanel 
              step={state.step} 
              industry={state.data.industry} 
              selectedServices={state.data.selectedServices} 
              priorities={state.data.priorities}
            />
          }
          rightPanel={
            <IntelligencePanel 
              step={state.step} 
              data={state.data}
              intelligenceStream={intelligenceStream}
              documentInsights={state.aiState.documentInsights}
              readinessAnalysis={state.aiState.readinessAnalysis}
            />
          }
        >
          <div className="flex-1 p-8 md:p-16 md:pt-24 max-w-3xl mx-auto w-full">
            <WizardFlow 
              step={state.step}
              state={state}
              isAnalyzing={isAnalyzing}
              updateData={updateData}
              updateNestedData={updateNestedData}
              setAiQuestions={setAiQuestions}
              setRecommendations={setRecommendations}
              setAnalysis={setAnalysis}
              setRoadmap={setRoadmap}
              setStream={setIntelligenceStream}
              onUrlBlur={handleUrlBlur}
            />
          </div>
          
          <div className="sticky bottom-0 w-full p-8 bg-sun-bg/95 backdrop-blur-sm border-t border-sun-border mt-auto">
            <div className="max-w-3xl mx-auto flex justify-end gap-4">
                {state.step > 1 && (
                  <Button 
                    variant="ghost" 
                    onClick={() => setState(prev => ({ ...prev, step: prev.step - 1 }))}
                  >
                    Back
                  </Button>
                )}
              <Button 
                onClick={nextStep} 
                className="group"
                disabled={isNextDisabled()}
              >
                {state.step === 5 ? 'Go to Dashboard' : 'Continue'}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </WizardLayout>
      )}
    </ErrorBoundary>
  );
}
