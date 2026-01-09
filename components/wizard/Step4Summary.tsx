
import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, Layers, Sparkles, Zap, CheckCircle2, TrendingUp, Activity
} from 'lucide-react';
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
  const analysisData = (aiState.readinessAnalysis as any).analysis || {};

  useEffect(() => {
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
              risks: [], // Not used in new layout
              wins: [], // Not used in new layout
              summary: result.summary, // Kept for legacy fallback
              analysis: result.analysis // New structured data
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
    <div className="animate-fade-in h-full flex flex-col">
      <div className="flex flex-col md:flex-row gap-8 h-full overflow-y-auto no-scrollbar pb-20">
        
        {/* CENTER PANEL: Strategic Summary (50% in 3-panel, but here we take roughly 60-70% visual weight) */}
        <div className="flex-1 space-y-8">
            <div className="bg-white border border-sun-border p-8 rounded-sm shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-sun-primary"></div>
                <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-sun-muted block mb-2">Project Name</span>
                    <h1 className="font-serif text-3xl text-sun-primary">
                        Growth & Automation System for {data.businessName}
                    </h1>
                </div>

                {loading ? (
                    <div className="space-y-4 animate-pulse">
                        <div className="h-4 bg-sun-border/20 w-full rounded"></div>
                        <div className="h-4 bg-sun-border/20 w-5/6 rounded"></div>
                        <div className="h-4 bg-sun-border/20 w-4/6 rounded"></div>
                        <div className="h-24"></div>
                        <div className="h-4 bg-sun-border/20 w-full rounded"></div>
                        <div className="h-4 bg-sun-border/20 w-3/4 rounded"></div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-sun-tertiary mb-3">Strategic Analysis</h3>
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
                    {selectedSystemDetails.map(sys => (
                        <div key={sys.id} className="bg-white border border-sun-border p-4 rounded-sm flex items-start gap-4">
                            <div className="bg-sun-bg p-2 rounded-sm text-sun-primary shrink-0">
                                <Zap size={18} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-sun-primary">{sys.title}</h4>
                                <p className="text-xs text-sun-secondary mt-1">{sys.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* RIGHT PANEL: Scores & Signals */}
        <div className="w-full md:w-[35%] space-y-6">
            <div className="bg-sun-primary text-white p-6 rounded-sm shadow-md">
                <div className="flex items-center gap-2 mb-6">
                    <Activity size={18} className="text-sun-accent" />
                    <h3 className="font-serif text-lg">Signals & Scores</h3>
                </div>

                {loading ? (
                    <div className="space-y-4 animate-pulse opacity-50">
                        {[1,2,3,4].map(i => <div key={i} className="h-12 bg-white/10 rounded"></div>)}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {[
                            { label: 'AI Readiness', value: analysisData.signals?.ai_readiness, desc: 'Process clarity & data availability.' },
                            { label: 'Marketing Leverage', value: analysisData.signals?.marketing_leverage, desc: 'Traffic potential vs conversion.' },
                            { label: 'Sales Automation', value: analysisData.signals?.sales_automation, desc: 'Potential for immediate speed gains.' },
                            { label: 'Ops Efficiency', value: analysisData.signals?.operational_efficiency, desc: 'Reduction of manual drag.' },
                        ].map((signal, idx) => (
                            <div key={idx} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">{signal.label}</span>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                                        signal.value === 'High' ? 'bg-green-500/20 text-green-300' : 
                                        signal.value === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' : 
                                        'bg-white/10 text-white/70'
                                    }`}>{signal.value || '-'}</span>
                                </div>
                                <p className="text-[10px] opacity-60 leading-tight">{signal.desc}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-white border border-sun-border p-6 rounded-sm">
                <div className="text-xs font-bold uppercase tracking-widest text-sun-muted mb-4 flex items-center gap-2">
                    <Sparkles size={14} className="text-sun-accent" /> How AI Helps
                </div>
                <ul className="space-y-3">
                    {loading ? (
                        <li className="text-xs text-sun-muted italic">Generating benefits...</li>
                    ) : (
                        analysisData.how_ai_helps?.map((item: string, i: number) => (
                            <li key={i} className="text-sm text-sun-secondary flex items-start gap-2">
                                <CheckCircle2 size={14} className="text-sun-tertiary mt-0.5 shrink-0" />
                                <span className="leading-snug">{item}</span>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>

      </div>
    </div>
  );
};