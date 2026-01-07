
import React, { useEffect, useState } from 'react';
import { ShieldCheck, Server, Target, Zap, AlertTriangle, Layers, ArrowRight } from 'lucide-react';
import { AppState, SYSTEMS } from '../../types';
import { supabase } from '../../services/supabase';

interface Step4SummaryProps {
  state: AppState;
  updateData: (section: keyof AppState['data'], value: any) => void;
  setAnalysis: (analysis: AppState['aiState']['readinessAnalysis']) => void;
  setStream: (text: string) => void;
}

export const Step4Summary: React.FC<Step4SummaryProps> = ({ 
  state, 
  updateData, 
  setAnalysis, 
  setStream 
}) => {
  const [loading, setLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const { data, aiState } = state;

  useEffect(() => {
    // Only run if we haven't generated a summary yet (score is 0) or explicit refresh needed
    // checking score > 0 ensures we don't re-run on simple re-renders
    if (aiState.readinessAnalysis.score === 0 && !hasRun) {
      const fetchSummary = async () => {
        setLoading(true);
        setHasRun(true);
        
        // Simulated "Processing" sequence for UX
        setStream("Aggregating wizard inputs...\n\nVerifying industry context...");
        await new Promise(r => setTimeout(r, 800));
        setStream("Calculating readiness score based on tech stack...");
        await new Promise(r => setTimeout(r, 800));
        setStream("Drafting executive strategy brief...");

        try {
          // Call the new Edge Function
          const { data: result, error } = await supabase.functions.invoke('summary', {
            body: { wizardState: state }
          });

          if (error) throw error;

          if (result) {
            setAnalysis({
              score: result.score,
              risks: result.risks || [],
              wins: result.wins || [], // Mapped from 'strengths'
              summary: result.summary // Mapped from 'narrative'
            });
            setStream(`**Analysis Complete**\n\n${result.summary}`);
          }
        } catch (e) {
          console.error("Summary error", e);
          setStream("I encountered an issue generating the full brief, but your core data is saved.");
          // Fallback so user isn't stuck
          setAnalysis({
            score: 50,
            risks: ["Automatic analysis failed"],
            wins: ["Manual review required"],
            summary: "Please proceed to the roadmap."
          });
        } finally {
          setLoading(false);
        }
      };
      fetchSummary();
    }
  }, []); // Run once on mount

  // Selected System Objects
  const selectedSystemDetails = SYSTEMS.filter(s => data.selectedSystems.includes(s.id));

  // Determine Score Color
  const score = aiState.readinessAnalysis.score;
  const scoreColor = score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444';
  const scoreLabel = score >= 80 ? 'Ready to Scale' : score >= 60 ? 'Strong Foundation' : 'Foundation Needed';

  return (
    <div className="animate-fade-in h-full flex flex-col">
      {/* Header - Only visible on mobile/tablet where panels might collapse */}
      <div className="md:hidden mb-6">
        <h1 className="font-serif text-3xl text-sun-primary">Executive Summary</h1>
      </div>

      <div className="flex flex-col gap-12 h-full">
        
        {/* SECTION 1: Strategic Brief (The "Hook") */}
        <div className="bg-white border border-sun-border p-8 rounded-sm shadow-sm relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-sun-accent"></div>
           
           {loading ? (
             <div className="animate-pulse space-y-4">
               <div className="h-8 bg-sun-border/30 w-1/3 rounded"></div>
               <div className="h-4 bg-sun-border/20 w-full rounded"></div>
               <div className="h-4 bg-sun-border/20 w-3/4 rounded"></div>
             </div>
           ) : (
             <>
               <h2 className="font-serif text-2xl md:text-3xl text-sun-primary mb-4">
                 {aiState.readinessAnalysis.summary ? "Strategic Assessment" : "Generating Strategy..."}
               </h2>
               <div className="font-sans text-sun-secondary leading-relaxed whitespace-pre-line text-lg">
                 {aiState.readinessAnalysis.summary || "Your strategy brief is being written..."}
               </div>
             </>
           )}
        </div>

        {/* SECTION 2: The Data (Score + Stack) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Readiness Dial */}
          <div className="flex flex-col items-center justify-center p-8 bg-sun-right border border-sun-border rounded-sm">
             <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#EFE9E4" strokeWidth="8" />
                  <circle 
                    cx="80" cy="80" r="70" 
                    fill="none" 
                    stroke={scoreColor} 
                    strokeWidth="8" 
                    strokeDasharray={440}
                    strokeDashoffset={440 - (440 * (loading ? 0 : score)) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-serif text-4xl text-sun-primary font-bold">
                    {loading ? '...' : score}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-sun-muted">/ 100</span>
                </div>
             </div>
             <div className="text-center">
               <div className="text-sm font-bold uppercase tracking-widest text-sun-primary mb-1">{scoreLabel}</div>
               <div className="text-xs text-sun-secondary max-w-[200px] mx-auto">
                 Calculated based on your {data.industry} maturity and tech stack.
               </div>
             </div>
          </div>

          {/* Solution Stack */}
          <div className="space-y-4">
             <div className="text-xs font-bold uppercase tracking-widest text-sun-muted flex items-center gap-2 mb-2">
               <Layers size={14} /> Selected Solution Stack
             </div>
             {selectedSystemDetails.map(sys => (
               <div key={sys.id} className="bg-white border border-sun-border p-4 rounded-sm flex items-start gap-4 shadow-sm">
                  <div className="bg-sun-bg p-2 rounded-sm text-sun-primary">
                    <Zap size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-sun-primary">{sys.title}</h4>
                    <p className="text-xs text-sun-secondary line-clamp-2 mt-1">{sys.description}</p>
                  </div>
               </div>
             ))}
             {selectedSystemDetails.length === 0 && (
               <div className="text-sm text-sun-tertiary italic p-4 border border-dashed border-sun-border rounded-sm">
                 No systems selected. Go back to Step 3.
               </div>
             )}
          </div>

        </div>

        {/* SECTION 3: Key Strengths (from AI) */}
        {!loading && aiState.readinessAnalysis.wins.length > 0 && (
          <div className="border-t border-sun-border pt-8">
             <div className="text-xs font-bold uppercase tracking-widest text-sun-muted mb-6">Key Strengths Identified</div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiState.readinessAnalysis.wins.map((win, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    <p className="text-sm text-sun-secondary">{win}</p>
                  </div>
                ))}
             </div>
          </div>
        )}

      </div>
    </div>
  );
};
