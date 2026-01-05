import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, CheckCircle2, ChevronRight, Sparkles, BrainCircuit, BarChart3, Clock, AlertCircle } from 'lucide-react';
import { Button } from './components/Button';
import { Input, TextArea, Select } from './components/Input';
import { Dashboard } from './components/Dashboard';
import { INITIAL_STATE, AppState, IndustryType, SYSTEMS } from './types';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';

export default function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const nextStep = () => {
    if (state.step < 5) {
      setIsTransitioning(true);
      setTimeout(() => {
        setState(prev => ({ ...prev, step: prev.step + 1 }));
        setIsTransitioning(false);
      }, 300);
    } else {
      setState(prev => ({ ...prev, completed: true }));
    }
  };

  if (state.completed) {
    return <Dashboard />;
  }

  // Calculate Progress
  const progress = [10, 30, 55, 75, 100][state.step - 1];

  // Render Helpers
  const renderLeftPanel = () => {
    const titles = [
      "Getting to know your business",
      "Industry Deep Dive",
      "System Selection",
      "Readiness Check",
      "Your 30-Day Plan"
    ];

    return (
      <div className="h-full flex flex-col justify-between p-8 md:p-12">
        <div>
          <div className="mb-8">
            <span className="font-sans text-xs font-bold tracking-widest text-sun-accent uppercase mb-2 block">
              Step {state.step} of 5
            </span>
            <div className="h-1 w-full bg-sun-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-sun-accent transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-sun-primary leading-tight mb-4">
            {titles[state.step - 1]}
          </h2>
          <p className="font-sans text-sm text-sun-secondary leading-relaxed opacity-80">
            {state.step === 1 && "We start by understanding who you are to tailor the AI models specifically to your market context."}
            {state.step === 2 && `Locked context: ${state.data.industry.charAt(0).toUpperCase() + state.data.industry.slice(1).replace('_', ' ')}.`}
            {state.step === 3 && "Focusing on systems over tools ensures long-term revenue growth rather than short-term efficiency."}
            {state.step === 4 && "Checking your infrastructure prevents bottlenecks during the implementation phase."}
            {state.step === 5 && "A concrete roadmap to ensure we hit the ground running from Day 1."}
          </p>
        </div>
        
        <div className="text-xs text-sun-tertiary font-sans tracking-wide mt-12">
          SUN AI AGENCY © 2024
        </div>
      </div>
    );
  };

  const renderRightPanel = () => {
    return (
      <div className="h-full bg-sun-right border-l border-sun-border p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <BrainCircuit size={120} className="text-sun-primary" />
        </div>
        
        <div className="relative z-10 flex flex-col h-full gap-8">
          <div className="flex items-center gap-3 text-sun-accent">
            <Sparkles size={18} className="animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase">AI Intelligence</span>
          </div>

          <div className="flex-1 font-editorial text-sun-secondary text-lg leading-loose italic">
            {state.step === 1 && (
              <>
                <p className="mb-6">"I am analyzing your business inputs to verify your market positioning."</p>
                <ul className="space-y-4 not-italic text-sm font-sans text-sun-tertiary">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-sun-accent mt-2 shrink-0" />
                    Identifying vertical constraints and opportunities within your sector.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-sun-accent mt-2 shrink-0" />
                    Understanding your core offer to match high-value AI workflows.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-sun-accent mt-2 shrink-0" />
                    Detecting primary sales channels for optimization.
                  </li>
                </ul>
              </>
            )}

            {state.step === 2 && (
              <>
                <p className="mb-6">
                  "These questions are weighted specifically for the <span className="text-sun-primary font-medium not-italic">{state.data.industry.replace('_', ' ')}</span> industry."
                </p>
                <div className="bg-white p-6 border border-sun-border rounded-sm shadow-sm not-italic">
                  <div className="text-xs uppercase tracking-widest text-sun-muted mb-2">Real World Context</div>
                  <p className="text-sm font-sans text-sun-secondary">
                    {state.data.industry === 'fashion' && "Fashion brands using AI for inventory forecasting see a 30% reduction in dead stock."}
                    {state.data.industry === 'saas' && "SaaS startups leveraging automated lead qualification reduce sales cycles by 40%."}
                    {state.data.industry === 'real_estate' && "Agents using AI-response systems capture 3x more leads from weekend traffic."}
                    {state.data.industry === 'tourism' && "Experience providers using dynamic pricing AI see a 15% revenue lift in off-peak seasons."}
                    {state.data.industry === 'other' && "Generalized AI implementations focus on operational efficiency to free up human creativity."}
                  </p>
                </div>
              </>
            )}

            {state.step === 3 && (
              <>
                <p className="mb-6">"We focus on systems, not software. Tools change, but revenue logic remains constant."</p>
                <p>
                  Based on your focus on <span className="text-sun-primary not-italic">{state.data.priorities.mainPriority || 'growth'}</span>, 
                  I've prioritized systems that impact your bottom line immediately.
                </p>
              </>
            )}

            {state.step === 4 && (
              <>
                 <p className="mb-6">"Readiness dictates speed. High readiness scores correlate with 3x faster ROI realization."</p>
                 <p>
                   Identifying gaps now allows us to mitigate risks before we begin the heavy lifting of implementation.
                 </p>
              </>
            )}

            {state.step === 5 && (
               <>
                <p className="mb-6">"Success looks like a self-sustaining engine. By day 30, the system should operate with minimal human intervention."</p>
                <div className="flex flex-col gap-4 not-italic font-sans text-sm">
                   <div className="flex items-center gap-3 text-sun-primary">
                     <CheckCircle2 size={16} className="text-sun-accent"/>
                     <span>Predictable lead flow</span>
                   </div>
                   <div className="flex items-center gap-3 text-sun-primary">
                     <CheckCircle2 size={16} className="text-sun-accent"/>
                     <span>Automated nurturing</span>
                   </div>
                   <div className="flex items-center gap-3 text-sun-primary">
                     <CheckCircle2 size={16} className="text-sun-accent"/>
                     <span>Data-driven decisions</span>
                   </div>
                </div>
               </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (state.step) {
      case 1:
        return (
          <div className="animate-fade-in space-y-8">
            <h1 className="font-serif text-4xl text-sun-primary mb-2">Tell us about your business</h1>
            <p className="text-sun-secondary font-sans mb-8">Let's build your profile.</p>
            
            <div className="space-y-8 max-w-xl">
              <Input 
                label="Business Name" 
                placeholder="e.g. Acme Corp" 
                value={state.data.businessName}
                onChange={(e) => updateData('businessName', e.target.value)}
              />
              <Select 
                label="Industry" 
                options={[
                  { label: 'SaaS / Startup', value: 'saas' },
                  { label: 'Fashion / Retail', value: 'fashion' },
                  { label: 'Real Estate', value: 'real_estate' },
                  { label: 'Tourism / Hospitality', value: 'tourism' },
                  { label: 'Other', value: 'other' },
                ]}
                value={state.data.industry}
                onChange={(e) => updateData('industry', e.target.value as IndustryType)}
              />
              <Input 
                label="Website (Optional)" 
                placeholder="acme.com" 
                value={state.data.website}
                onChange={(e) => updateData('website', e.target.value)}
              />
              <TextArea 
                label="Short Description" 
                placeholder="We help companies scale their operations through..." 
                value={state.data.description}
                onChange={(e) => updateData('description', e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        const questions = {
          saas: { q1: "What is your primary revenue focus?", q2: "Current CAC vs LTV status?", q3: "Lead response time?" },
          fashion: { q1: "Seasonal inventory turnover rate?", q2: "Social commerce engagement?", q3: "Customer return rate?" },
          real_estate: { q1: "Average commission value?", q2: "Lead source mix?", q3: "Follow-up frequency?" },
          tourism: { q1: "Booking window length?", q2: "Direct vs OTA mix?", q3: "Repeat guest percentage?" },
          other: { q1: "Primary revenue driver?", q2: "Marketing channel mix?", q3: "Lead handling process?" },
        }[state.data.industry];

        return (
          <div className="animate-fade-in space-y-8">
            <h1 className="font-serif text-4xl text-sun-primary mb-2">Industry Deep Dive</h1>
            <p className="text-sun-secondary font-sans mb-8">Specific questions for {state.data.industry.replace('_', ' ')}.</p>

            <div className="space-y-8 max-w-xl">
              <Input 
                label={`1. ${questions.q1}`}
                placeholder="Type your answer..."
                value={state.data.priorities.moneyFocus}
                onChange={(e) => updateNestedData('priorities', 'moneyFocus', e.target.value)}
              />
              <Input 
                label={`2. ${questions.q2}`}
                placeholder="Type your answer..."
                value={state.data.priorities.marketingFocus}
                onChange={(e) => updateNestedData('priorities', 'marketingFocus', e.target.value)}
              />
              <Input 
                label={`3. ${questions.q3}`}
                placeholder="e.g. 2 hours, 1 day..."
                value={state.data.priorities.responseSpeed}
                onChange={(e) => updateNestedData('priorities', 'responseSpeed', e.target.value)}
              />
              
              <div className="pt-4">
                 <label className="text-xs font-semibold uppercase tracking-widest text-sun-muted font-sans block mb-4">
                  4. Main Priority for next quarter
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {['Revenue Growth', 'Lead Volume', 'Conversion Rate', 'Retention'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => updateNestedData('priorities', 'mainPriority', opt)}
                      className={`p-4 border text-sm font-medium transition-all text-left ${
                        state.data.priorities.mainPriority === opt 
                        ? 'border-sun-primary bg-sun-primary text-white' 
                        : 'border-sun-border text-sun-secondary hover:border-sun-underline'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="animate-fade-in space-y-8">
            <h1 className="font-serif text-4xl text-sun-primary mb-2">Recommended Systems</h1>
            <p className="text-sun-secondary font-sans mb-8">Select up to 3 systems to prioritize.</p>

            <div className="grid gap-4">
              {SYSTEMS.map(sys => {
                const isSelected = state.data.selectedSystems.includes(sys.id);
                return (
                  <div 
                    key={sys.id}
                    onClick={() => {
                      if (isSelected) {
                        updateData('selectedSystems', state.data.selectedSystems.filter(id => id !== sys.id));
                      } else if (state.data.selectedSystems.length < 3) {
                        updateData('selectedSystems', [...state.data.selectedSystems, sys.id]);
                      }
                    }}
                    className={`p-6 border transition-all cursor-pointer group relative ${
                      isSelected 
                      ? 'border-sun-primary bg-white shadow-md' 
                      : 'border-sun-border bg-transparent hover:border-sun-underline'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`font-serif text-lg font-medium ${isSelected ? 'text-sun-primary' : 'text-sun-secondary'}`}>
                        {sys.title}
                      </h3>
                      <div className={`w-5 h-5 border rounded-full flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-sun-primary border-sun-primary text-white' : 'border-sun-border'
                      }`}>
                        {isSelected && <Check size={12} />}
                      </div>
                    </div>
                    <p className="text-sm text-sun-secondary mb-3">{sys.description}</p>
                    <div className="flex items-center gap-2 text-xs font-medium text-sun-accent">
                      <BarChart3 size={12} />
                      {sys.revenueImpact}
                    </div>
                  </div>
                );
              })}
            </div>
            {state.data.selectedSystems.length === 3 && (
               <p className="text-xs text-sun-muted mt-2 text-center">Maximum 3 systems selected</p>
            )}
          </div>
        );

      case 4:
        const score = Object.values(state.data.readiness).filter(Boolean).length * 25;
        
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
                       state.data.readiness[item.key as keyof typeof state.data.readiness]
                       ? 'bg-sun-primary border-sun-primary text-white'
                       : 'border-sun-underline bg-white'
                     }`}>
                        {state.data.readiness[item.key as keyof typeof state.data.readiness] && <Check size={14} />}
                     </div>
                     <input 
                       type="checkbox" 
                       className="hidden"
                       checked={state.data.readiness[item.key as keyof typeof state.data.readiness]}
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
                        strokeDashoffset={377 - (377 * score) / 100}
                        className="transition-all duration-1000 ease-out"
                     />
                   </svg>
                   <div className="absolute inset-0 flex items-center justify-center font-serif text-3xl text-sun-primary">
                     {score}
                   </div>
                </div>
                <h3 className="font-serif text-xl mb-2">Readiness Score</h3>
                <div className="text-xs text-sun-tertiary uppercase tracking-widest font-semibold mb-6">
                  {score < 50 ? 'Needs Preparation' : score < 75 ? 'Good Start' : 'Excellent'}
                </div>
                
                <div className="w-full text-left space-y-3">
                   <div className="flex items-center gap-2 text-xs text-sun-secondary">
                      <AlertCircle size={12} className="text-sun-accent"/>
                      <span>Risk: Data fragmentation</span>
                   </div>
                   <div className="flex items-center gap-2 text-xs text-sun-secondary">
                      <Sparkles size={12} className="text-sun-accent"/>
                      <span>Win: Quick setup on {state.data.industry} models</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="animate-fade-in space-y-8">
            <h1 className="font-serif text-4xl text-sun-primary mb-2">Your 30-Day Plan</h1>
            <p className="text-sun-secondary font-sans mb-8">The execution roadmap.</p>

            <div className="space-y-0 border-l border-sun-border ml-4">
              {[
                { week: 'Week 1', title: 'Setup & Tracking', desc: 'Integration of data sources and baseline metrics establishment.', icon: <SettingsIcon /> },
                { week: 'Week 2', title: 'Content & Campaigns', desc: `Launch of ${state.data.selectedSystems[0] ? SYSTEMS.find(s => s.id === state.data.selectedSystems[0])?.title : 'Core Systems'} alpha versions.`, icon: <PenToolIcon /> },
                { week: 'Week 3-4', title: 'Automations & Optimization', desc: 'Full-scale deployment and feedback loop calibration.', icon: <RocketIcon /> }
              ].map((phase, idx) => (
                <div key={idx} className="relative pl-8 pb-12 last:pb-0">
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-sun-accent ring-4 ring-white" />
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-sun-muted">{phase.week}</span>
                    <h3 className="font-serif text-xl text-sun-primary">{phase.title}</h3>
                    <p className="text-sun-secondary font-sans text-sm max-w-md">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-sun-border">
               <div>
                 <span className="text-xs font-bold uppercase tracking-widest text-sun-muted block mb-2">We Deliver</span>
                 <ul className="text-sm text-sun-primary space-y-1">
                   <li>• Strategy Blueprint</li>
                   <li>• System Implementation</li>
                   <li>• Weekly Reporting</li>
                 </ul>
               </div>
               <div>
                 <span className="text-xs font-bold uppercase tracking-widest text-sun-muted block mb-2">We Need</span>
                 <ul className="text-sm text-sun-primary space-y-1">
                   <li>• Access to Data</li>
                   <li>• 1 Hr Weekly Sync</li>
                   <li>• Feedback on Output</li>
                 </ul>
               </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col md:flex-row bg-sun-bg transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
      
      {/* Left Panel - Sticky */}
      <aside className="w-full md:w-[20%] md:h-screen md:sticky md:top-0 border-r border-sun-border bg-sun-bg z-10">
        {renderLeftPanel()}
      </aside>

      {/* Center Panel - Scrollable */}
      <main className="w-full md:w-[50%] min-h-screen flex flex-col">
        <div className="flex-1 p-8 md:p-16 md:pt-24 max-w-3xl mx-auto w-full">
          {renderStepContent()}
        </div>
        
        {/* Sticky Footer for Mobile/Desktop Actions */}
        <div className="sticky bottom-0 w-full p-8 bg-sun-bg/95 backdrop-blur-sm border-t border-sun-border mt-auto">
          <div className="max-w-3xl mx-auto flex justify-end">
            <Button onClick={nextStep} className="group">
              {state.step === 5 ? 'Go to Dashboard' : 'Continue'}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </main>

      {/* Right Panel - Sticky */}
      <aside className="hidden md:block w-full md:w-[30%] md:h-screen md:sticky md:top-0 bg-sun-right">
        {renderRightPanel()}
      </aside>
    </div>
  );
}

// Simple Icon Components for the Timeline
const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);
const PenToolIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
);
const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
);