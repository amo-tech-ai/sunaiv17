
import React, { useEffect, useState } from 'react';
import { Layers, Zap } from 'lucide-react';
import { AppState, SYSTEMS } from '../../types';
import { supabase } from '../../services/supabase';
import { getIndustryPack } from '../../data/industryPacks';

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
  const analysisData = (aiState.readinessAnalysis as any).analysis || {};
  
  // Load pack for naming
  const pack = getIndustryPack(data.industry);

  useEffect(() => {
    // Only fetch if no score present (or simple re-fetch logic if needed)
    if (aiState.readinessAnalysis.score === 0 && !hasRun) {
      const fetchSummary = async () => {
        setLoading(true);
        setHasRun(true);
        
        setStream("Synthesizing strategic context...\n\nAnalyzing selected systems against business model...");
        await new Promise(r => setTimeout(r, 1000));
        setStream("Thinking...\n\nDrafting Executive Strategy Brief...");

        try {
          const { data: result, error } = await supabase.functions.invoke('summary', {
            body: { wizardState: state }
          });

          if (error) throw error;

          if (result) {
            setAnalysis({
              score: result.score,
              headline: result.headline || "Growth & Automation System",
              risks: [],
              wins: [],
              summary: result.summary,
              analysis: result.analysis
            } as any);
            setStream(`**${result.headline || "Strategy Ready"}**\n\n${result.analysis?.p1}`);
          }
        } catch (e) {
          console.error("Summary error", e);
          setStream("Strategy generation unavailable. Please proceed.");
          setAnalysis({
            score: 50,
            headline: "Strategic Assessment",
            risks: [],
            wins: [],
            summary: "Please proceed to the roadmap.",
            analysis: {
                p1: "Analysis currently unavailable.",
                p2: "Please proceed to the roadmap to see your execution plan.",
                signals: { ai_readiness: 'Medium', marketing_leverage: 'Medium', sales_automation: 'Medium', operational_efficiency: 'Medium' },
                how_ai_helps: ["Automate tasks", "Save time"]
            }
          } as any);
        } finally {
          setLoading(false);
        }
      };
      fetchSummary();
    }
  }, []);

  const selectedSystemDetails = SYSTEMS.filter(s => data.selectedSystems.includes(s.id));

  return (
    <div className="animate-fade-in space-y-8">
      {/* Strategic Summary Card */}
      <div className="bg-white border border-sun-border p-8 rounded-sm shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-sun-primary"></div>
          <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-sun-muted block mb-2">Executive Brief</span>
              <h1 className="font-serif text-3xl text-sun-primary">
                  {analysisData.headline || `Growth & Automation System`}
              </h1>
          </div>

          {loading ? (
              <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-sun-border/20 w-full rounded"></div>
                  <div className="h-4 bg-sun-border/20 w-5/6 rounded"></div>
                  <div className="h-4 bg-sun-border/20 w-4/6 rounded"></div>
                  <div className="h-8"></div>
                  <div className="h-4 bg-sun-border/20 w-full rounded"></div>
                  <div className="h-4 bg-sun-border/20 w-3/4 rounded"></div>
              </div>
          ) : (
              <div className="space-y-8">
                  <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-sun-tertiary mb-3">Strategic Analysis</h3>
                      <div className="space-y-6 text-sun-secondary font-serif text-lg leading-relaxed">
                          <p>{analysisData.p1}</p>
                          <p>{analysisData.p2}</p>
                      </div>
                  </div>
              </div>
          )}
      </div>

      {/* Selected Systems Review */}
      <div className="bg-sun-right border border-sun-border p-6 rounded-sm">
          <div className="text-xs font-bold uppercase tracking-widest text-sun-muted mb-4 flex items-center gap-2">
              <Layers size={14} /> Recommended System Architecture
          </div>
          <div className="grid grid-cols-1 gap-4">
              {selectedSystemDetails.map(sys => {
                  const industryTitle = pack.systemNames[sys.id] || sys.title;
                  return (
                    <div key={sys.id} className="bg-white border border-sun-border p-4 rounded-sm flex items-start gap-4">
                        <div className="bg-sun-bg p-2 rounded-sm text-sun-primary shrink-0">
                            <Zap size={18} />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-sun-primary">{industryTitle}</h4>
                            <p className="text-xs text-sun-secondary mt-1">{sys.description}</p>
                        </div>
                    </div>
                  );
              })}
          </div>
      </div>
    </div>
  );
};
