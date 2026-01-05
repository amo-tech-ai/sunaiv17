
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './components/Button';
import { Dashboard } from './components/Dashboard';
import { INITIAL_STATE, AppState, Task } from './types';
import { analyst } from './services/gemini/analyst';

// Wizard Components
import { ProgressPanel } from './components/wizard/ProgressPanel';
import { IntelligencePanel } from './components/wizard/IntelligencePanel';
import { Step1Context } from './components/wizard/Step1Context';
import { Step2Diagnostics } from './components/wizard/Step2Diagnostics';
import { Step3Systems } from './components/wizard/Step3Systems';
import { Step4Readiness } from './components/wizard/Step4Readiness';
import { Step5Plan } from './components/wizard/Step5Plan';

const STORAGE_KEY = 'sun_ai_wizard_state';

export default function App() {
  // Initialize from localStorage or default
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migration/Safety check for new dashboardState
        if (!parsed.dashboardState) {
          parsed.dashboardState = INITIAL_STATE.dashboardState;
        }
        return parsed;
      }
    } catch (e) {
      console.error("Failed to load state", e);
    }
    return INITIAL_STATE;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // AI State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [intelligenceStream, setIntelligenceStream] = useState<string>("");

  // Persist state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Smooth scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state.step]);

  const updateData = (section: keyof AppState['data'], value: any) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, [section]: value }
    }));
  };

  const updateNestedData = (section: 'priorities' | 'readiness', key: string, value: any) => {
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [section]: {
          ...prev.data[section as keyof typeof prev.data] as any,
          [key]: value
        }
      }
    }));
  };

  // AI State Setters
  const setAiQuestions = (qs: AppState['aiState']['questions']) => {
    setState(prev => ({ ...prev, aiState: { ...prev.aiState, questions: qs } }));
  };
  const setRecommendations = (recs: AppState['aiState']['recommendations']) => {
    setState(prev => ({ ...prev, aiState: { ...prev.aiState, recommendations: recs } }));
  };
  const setAnalysis = (analysis: AppState['aiState']['readinessAnalysis']) => {
    setState(prev => ({ ...prev, aiState: { ...prev.aiState, readinessAnalysis: analysis } }));
  };
  const setRoadmap = (roadmap: AppState['aiState']['roadmap']) => {
    setState(prev => ({ ...prev, aiState: { ...prev.aiState, roadmap: roadmap } }));
  };
  
  // Dashboard State Setter
  const updateDashboardState = (tasks: Task[]) => {
    setState(prev => ({
      ...prev,
      dashboardState: {
        tasks,
        initialized: true
      }
    }));
  };


  const nextStep = () => {
    if (state.step < 5) {
      setIsTransitioning(true);
      setTimeout(() => {
        setState(prev => ({ ...prev, step: prev.step + 1 }));
        // Clear the AI stream so the next step starts fresh or falls back to static context
        setIntelligenceStream(""); 
        setIsTransitioning(false);
      }, 300);
    } else {
      setState(prev => ({ ...prev, completed: true }));
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset your progress?")) {
      localStorage.removeItem(STORAGE_KEY);
      setState(INITIAL_STATE);
      window.scrollTo(0, 0);
    }
  };

  const handleUrlBlur = async () => {
    if (!state.data.website || !state.data.businessName) return;
    
    setIsAnalyzing(true);
    setIntelligenceStream(""); 

    try {
      // Trigger Stream Analysis
      const stream = analyst.analyzeBusinessStream(state.data.businessName, state.data.website);
      let fullText = "";
      for await (const chunk of stream) {
        fullText += chunk;
        setIntelligenceStream(prev => prev + chunk);
      }
      
      // Trigger Classification
      const classification = await analyst.classifyBusiness(
        state.data.businessName, 
        state.data.website, 
        state.data.description
      );
      
      if (classification.industry) {
        updateData('industry', classification.industry);
        // Reset dynamic questions if industry changes
        setAiQuestions([]); 
      }
      if (classification.summary && !state.data.description) {
        updateData('description', classification.summary);
      }
      
    } catch (err) {
      console.error("Analysis failed", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // --- Render Logic ---

  if (state.completed) {
    return (
      <Dashboard 
        state={state} 
        onReset={handleReset} 
        updateDashboardState={updateDashboardState}
      />
    );
  }

  const renderStepContent = () => {
    switch (state.step) {
      case 1:
        return (
          <Step1Context 
            data={state.data}
            updateData={updateData}
            onUrlBlur={handleUrlBlur}
            isAnalyzing={isAnalyzing}
          />
        );
      case 2:
        return (
          <Step2Diagnostics 
            industry={state.data.industry}
            priorities={state.data.priorities}
            aiQuestions={state.aiState.questions}
            updateNestedData={updateNestedData}
            setAiQuestions={setAiQuestions}
            setStream={setIntelligenceStream}
          />
        );
      case 3:
        return (
          <Step3Systems 
            selectedSystems={state.data.selectedSystems}
            data={state.data}
            aiRecommendations={state.aiState.recommendations}
            updateData={updateData}
            setRecommendations={setRecommendations}
            setStream={setIntelligenceStream}
          />
        );
      case 4:
        return (
          <Step4Readiness 
            readiness={state.data.readiness}
            industry={state.data.industry}
            analysis={state.aiState.readinessAnalysis}
            updateNestedData={updateNestedData}
            setAnalysis={setAnalysis}
            setStream={setIntelligenceStream}
          />
        );
      case 5:
        return (
          <Step5Plan 
            state={state}
            setRoadmap={setRoadmap}
            setStream={setIntelligenceStream}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col md:flex-row bg-sun-bg transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
      
      {/* Left Panel - Sticky */}
      <aside className="w-full md:w-[20%] md:h-screen md:sticky md:top-0 border-r border-sun-border bg-sun-bg z-10">
        <ProgressPanel 
          step={state.step} 
          industry={state.data.industry} 
        />
      </aside>

      {/* Center Panel - Scrollable */}
      <main className="w-full md:w-[50%] min-h-screen flex flex-col">
        <div className="flex-1 p-8 md:p-16 md:pt-24 max-w-3xl mx-auto w-full">
          {renderStepContent()}
        </div>
        
        {/* Sticky Footer for Mobile/Desktop Actions */}
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
            <Button onClick={nextStep} className="group">
              {state.step === 5 ? 'Go to Dashboard' : 'Continue'}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </main>

      {/* Right Panel - Sticky */}
      <aside className="hidden md:block w-full md:w-[30%] md:h-screen md:sticky md:top-0 bg-sun-right">
        <IntelligencePanel 
          step={state.step} 
          data={state.data}
          intelligenceStream={intelligenceStream}
        />
      </aside>
    </div>
  );
}
