
import React from 'react';
import { BrainCircuit, Sparkles, CheckCircle2, Terminal } from 'lucide-react';
import { AppState } from '../../types';

interface IntelligencePanelProps {
  step: number;
  data: AppState['data'];
  intelligenceStream: string;
}

export const IntelligencePanel: React.FC<IntelligencePanelProps> = ({ step, data, intelligenceStream }) => {
  return (
    <div className="h-full bg-sun-right border-l border-sun-border p-8 md:p-12 relative overflow-hidden flex flex-col">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <BrainCircuit size={120} className="text-sun-primary" />
      </div>
      
      <div className="relative z-10 flex flex-col h-full gap-6">
        <div className="flex items-center gap-3 text-sun-accent">
          {intelligenceStream ? (
             <Terminal size={18} className="animate-pulse" />
          ) : (
             <Sparkles size={18} />
          )}
          <span className="text-xs font-bold tracking-widest uppercase">
            {intelligenceStream ? 'Live Analysis' : 'Sun Intelligence'}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          
          {/* Dynamic AI Stream - Terminal Style */}
          {intelligenceStream ? (
              <div className="font-mono text-sm leading-relaxed text-sun-primary whitespace-pre-wrap animate-fade-in bg-white/50 p-6 rounded-sm border border-sun-border/50 shadow-sm">
                {intelligenceStream}
                <span className="inline-block w-2 h-4 bg-sun-accent ml-1 animate-pulse align-middle" />
              </div>
          ) : (
             /* Fallback Static Context - Editorial Style */
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

                {step === 4 && (
                  <>
                      <p className="mb-6">"Readiness dictates speed. High readiness scores correlate with 3x faster ROI realization."</p>
                      <p>
                        Identifying gaps now allows us to mitigate risks before we begin the heavy lifting of implementation.
                      </p>
                  </>
                )}

                {step === 5 && (
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
                    </div>
                    </>
                )}
             </div>
          )}

        </div>
      </div>
    </div>
  );
};
