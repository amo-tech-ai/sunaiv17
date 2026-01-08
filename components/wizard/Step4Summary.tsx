
import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ShieldCheck, Layers, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { AppState, SYSTEMS } from '../../types';
import { supabase } from '../../services/supabase';

interface Step4SummaryProps {
  state: AppState;
  updateData: (section: keyof AppState['data'], value: any) => void;
  setAnalysis: (analysis: AppState['aiState']['readinessAnalysis']) => void;
  setStream: (text: string) => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-sun-border rounded-sm shadow-md text-xs">
        <p className="font-bold text-sun-primary mb-1">{label}</p>
        <p className="text-sun-tertiary">Current: {payload[0].value}</p>
        <p className="text-sun-accent font-medium">Projected: {payload[1].value}</p>
      </div>
    );
  }
  return null;
};

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
    if (aiState.readinessAnalysis.score === 0 && !hasRun) {
      const fetchSummary = async () => {
        setLoading(true);
        setHasRun(true);
        
        setStream("Aggregating Step 1 Research Analysis...\n\nCalculating Sales & Marketing projections...");
        await new Promise(r => setTimeout(r, 800));
        setStream("Thinking...\n\nExecuting impact models via Python...");
        await new Promise(r => setTimeout(r, 1200));
        setStream("Thinking...\n\nDrafting Executive Strategy Brief...");

        try {
          const { data: result, error } = await supabase.functions.invoke('summary', {
            body: { wizardState: state }
          });

          if (error) throw error;

          if (result) {
            setAnalysis({
              score: result.score,
              headline: result.headline || "Strategic Assessment",
              risks: result.risks || [],
              wins: result.wins || [],
              summary: result.summary,
              impactScores: result.impactScores
            });
            setStream(`**${result.headline || "Analysis Complete"}**\n\n${result.summary}`);
          }
        } catch (e) {
          console.error("Summary error", e);
          setStream("I encountered an issue generating the full brief, but your core data is saved.");
          setAnalysis({
            score: 50,
            headline: "Strategic Assessment",
            risks: ["Automatic analysis failed"],
            wins: ["Manual review required"],
            summary: "Please proceed to the roadmap.",
            impactScores: []
          });
        } finally {
          setLoading(false);
        }
      };
      fetchSummary();
    }
  }, []);

  const selectedSystemDetails = SYSTEMS.filter(s => data.selectedSystems.includes(s.id));
  const score = aiState.readinessAnalysis.score;
  const scoreColor = score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444';
  const scoreLabel = score >= 80 ? 'Ready to Scale' : score >= 60 ? 'Strong Foundation' : 'Foundation Needed';
  const impactScores = aiState.readinessAnalysis.impactScores;

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <div className="md:hidden mb-6">
        <h1 className="font-serif text-3xl text-sun-primary">Executive Brief</h1>
      </div>

      <div className="flex flex-col gap-8 h-full overflow-y-auto no-scrollbar pb-20">
        
        {/* SECTION 1: Strategic Brief (Narrative) */}
        <div className="bg-white border border-sun-border p-8 rounded-sm shadow-sm relative overflow-hidden shrink-0">
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
                 {aiState.readinessAnalysis.headline || "Strategic Assessment"}
               </h2>
               <div className="font-sans text-sun-secondary leading-relaxed whitespace-pre-line text-lg">
                 {aiState.readinessAnalysis.summary || "Your strategy brief is being written..."}
               </div>
             </>
           )}
        </div>

        {/* SECTION 2: Impact Scorecard (Visual Chart) */}
        {!loading && impactScores && impactScores.length > 0 && (
          <div className="bg-sun-right border border-sun-border p-6 rounded-sm shrink-0">
             <div className="flex items-center gap-2 mb-6">
               <div className="p-1.5 bg-white rounded border border-sun-border text-sun-accent">
                 <TrendingUp size={16} />
               </div>
               <span className="text-xs font-bold uppercase tracking-widest text-sun-muted">Projected Impact Scorecard</span>
             </div>
             
             <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart
                   data={impactScores}
                   layout="vertical"
                   margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                   barGap={2}
                 >
                   <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#EFE9E4" />
                   <XAxis type="number" domain={[0, 100]} hide />
                   <YAxis 
                     type="category" 
                     dataKey="category" 
                     width={100} 
                     tick={{fontSize: 11, fill: '#666'}} 
                     axisLine={false}
                     tickLine={false}
                   />
                   <Tooltip content={<CustomTooltip />} />
                   <Bar dataKey="before" name="Current" fill="#D1C7BD" barSize={12} radius={[0, 4, 4, 0]} />
                   <Bar dataKey="after" name="Projected" fill="#F59E0B" barSize={12} radius={[0, 4, 4, 0]}>
                      {
                        impactScores.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill="#F59E0B" />
                        ))
                      }
                   </Bar>
                 </BarChart>
               </ResponsiveContainer>
             </div>
             
             {/* Textual Impact Highlights */}
             <div className="grid grid-cols-3 gap-4 mt-4 border-t border-sun-border/50 pt-4">
                {impactScores.map((metric, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl font-bold text-sun-primary">{metric.changeLabel}</div>
                    <div className="text-[10px] text-sun-muted uppercase tracking-wider">{metric.category}</div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* SECTION 3: Readiness & Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start shrink-0">
          
          {/* Readiness Dial */}
          <div className="flex flex-col items-center justify-center p-8 bg-white border border-sun-border rounded-sm h-full shadow-sm relative">
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
                 Readiness to deploy based on verified infrastructure.
               </div>
             </div>
          </div>

          {/* Solution Stack */}
          <div className="space-y-4">
             <div className="text-xs font-bold uppercase tracking-widest text-sun-muted flex items-center gap-2 mb-2">
               <Layers size={14} /> Selected Stack
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
          </div>

        </div>

      </div>
    </div>
  );
};
