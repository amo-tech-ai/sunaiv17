
import React from 'react';
import { BrainCircuit, Sparkles, Terminal, FileSearch, Activity, CheckCircle2 } from 'lucide-react';
import { AppState } from '../../types';

interface IntelligencePanelProps {
  step: number;
  data: AppState['data'];
  intelligenceStream: string;
  documentInsights?: string;
  readinessAnalysis?: AppState['aiState']['readinessAnalysis'];
}

export const IntelligencePanel: React.FC<IntelligencePanelProps> = ({ 
  step, 
  data, 
  intelligenceStream, 
  documentInsights,
  readinessAnalysis
}) => {
  const analysisData = (readinessAnalysis as any)?.analysis || {};

  return (
    <div className="h-full bg-sun-right border-l border-sun-border p-8 md:p-12 relative overflow-hidden flex flex-col">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <BrainCircuit size={120} className="text-sun-primary" />
      </div>
      
      <div className="relative z-10 flex flex-col h-full gap-6">
        <div className="flex items-center gap-3 text-sun-accent">
          {intelligenceStream || step === 4 ? (
             <Terminal size={18} className="animate-pulse" />
          ) : (
             <Sparkles size={18} />
          )}
          <span className="text-xs font-bold tracking-widest uppercase">
            {step === 4 ? 'Analysis Signals' : (intelligenceStream ? 'Live Analysis' : 'Sun Intelligence')}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
          
          {/* STEP 4 SPECIAL RENDER: Scores & Signals */}
          {step === 4 && analysisData.signals ? (
             <div className="animate-fade-in space-y-6">
                <div className="bg-sun-primary text-white p-6 rounded-sm shadow-md">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity size={18} className="text-sun-accent" />
                        <h3 className="font-serif text-lg">Signals & Scores</h3>
                    </div>
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
                </div>

                <div className="bg-white border border-sun-border p-6 rounded-sm">
                    <div className="text-xs font-bold uppercase tracking-widest text-sun-muted mb-4 flex items-center gap-2">
                        <Sparkles size={14} className="text-sun-accent" /> How AI Helps
                    </div>
                    <ul className="space-y-3">
                        {analysisData.how_ai_helps?.map((item: string, i: number) => (
                            <li key={i} className="text-sm text-sun-secondary flex items-start gap-2">
                                <CheckCircle2 size={14} className="text-sun-tertiary mt-0.5 shrink-0" />
                                <span className="leading-snug">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
             </div>
          ) : (
            /* STANDARD RENDER: Stream & Text */
            <>
              {intelligenceStream ? (
                  <div className="font-mono text-sm leading-relaxed text-sun-primary whitespace-pre-wrap animate-fade-in bg-white/50 p-6 rounded-sm border border-sun-border/50 shadow-sm">
                    {intelligenceStream}
                    <span className="inline-block w-2 h-4 bg-sun-accent ml-1 animate-pulse align-middle" />
                  </div>
              ) : (
                 <div className="font-editorial text-sun-secondary text-lg leading-loose italic">
                    {step === 1 && (
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
                          </ul>
                        </>
                    )}

                    {step === 2 && (
                      <>
                        <p className="mb-6">
                          "These questions are weighted specifically for the <span className="text-sun-primary font-medium not-italic">{data.industry.replace('_', ' ')}</span> industry."
                        </p>
                        <div className="bg-white p-6 border border-sun-border rounded-sm shadow-sm not-italic">
                          <div className="text-xs uppercase tracking-widest text-sun-muted mb-2">Real World Context</div>
                          <p className="text-sm font-sans text-sun-secondary">
                            {data.industry === 'fashion' && "Fashion brands using AI for inventory forecasting see a 30% reduction in dead stock."}
                            {data.industry === 'saas' && "SaaS startups leveraging automated lead qualification reduce sales cycles by 40%."}
                            {data.industry === 'real_estate' && "Agents using AI-response systems capture 3x more leads from weekend traffic."}
                            {data.industry === 'tourism' && "Experience providers using dynamic pricing AI see a 15% revenue lift in off-peak seasons."}
                            {data.industry === 'other' && "Generalized AI implementations focus on operational efficiency to free up human creativity."}
                          </p>
                        </div>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <p className="mb-6">"We focus on systems, not software. Tools change, but revenue logic remains constant."</p>
                        <p>
                          Based on your focus on <span className="text-sun-primary not-italic">{data.priorities.mainPriority || 'growth'}</span>, 
                          I've prioritized systems that impact your bottom line immediately.
                        </p>
                      </>
                    )}
                    
                    {step === 5 && (
                      <>
                        <p className="mb-6">"Sequencing complete. This roadmap is designed to be executed in 3 distinct sprints."</p>
                        <p>
                          Notice how Phase 1 focuses entirely on <strong>Foundation</strong>. Without cleaning data and setting up the API layer, the advanced agents in Phase 2 will fail.
                        </p>
                      </>
                    )}
                 </div>
              )}
            </>
          )}

          {/* Document Insights Section */}
          {documentInsights && step !== 4 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sun-muted mb-3 border-t border-sun-border pt-6">
                <FileSearch size={14} className="text-sun-accent" />
                Document Insights
              </div>
              <div className="bg-white/80 p-4 border border-sun-border rounded-sm shadow-sm text-sm text-sun-secondary leading-relaxed font-sans">
                {documentInsights}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
