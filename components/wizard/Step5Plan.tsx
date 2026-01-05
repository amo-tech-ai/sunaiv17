
import React, { useEffect, useState } from 'react';
import { SYSTEMS, AppState } from '../../types';
import { planner } from '../../services/gemini/planner';

interface Step5PlanProps {
  state: AppState;
  setRoadmap: (roadmap: AppState['aiState']['roadmap']) => void;
  setStream: (text: string) => void;
}

export const Step5Plan: React.FC<Step5PlanProps> = ({ state, setRoadmap, setStream }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.aiState.roadmap.length === 0) {
      const generate = async () => {
        setLoading(true);
        // Simulate thinking steps while waiting for the Pro model
        setStream("Thinking...\n\nAnalyzing dependencies between " + state.data.selectedSystems.length + " systems...");
        
        setTimeout(() => setStream("Thinking...\n\nCalculated critical path based on readiness score of " + state.aiState.readinessAnalysis.score + "..."), 2000);
        setTimeout(() => setStream("Thinking...\n\nSequencing implementation phases..."), 4500);

        const plan = await planner.generateRoadmap(state);
        setRoadmap(plan);
        setLoading(false);
        setStream("I've structured a 30-day rollout. Notice how Phase 1 addresses your data readiness gaps before we deploy the active agents.");
      };
      generate();
    }
  }, []);

  const roadmapData = state.aiState.roadmap.length > 0 
    ? state.aiState.roadmap 
    : [
        // Fallback skeleton if loading or error
        { phaseName: "Foundation", duration: "Week 1", items: ["..."] },
        { phaseName: "Implementation", duration: "Week 2-3", items: ["..."] },
        { phaseName: "Launch", duration: "Week 4", items: ["..."] }
      ];

  const icons = [<SettingsIcon />, <PenToolIcon />, <RocketIcon />];

  return (
    <div className="animate-fade-in space-y-8">
      <h1 className="font-serif text-4xl text-sun-primary mb-2">Your 30-Day Plan</h1>
      <p className="text-sun-secondary font-sans mb-8">The execution roadmap.</p>

      {loading ? (
        <div className="space-y-12 ml-4 border-l border-sun-border pl-8 animate-pulse">
           {[1,2,3].map(i => (
             <div key={i}>
                <div className="h-4 bg-sun-border/30 w-16 mb-2 rounded"></div>
                <div className="h-6 bg-sun-border/30 w-32 mb-2 rounded"></div>
                <div className="h-12 bg-sun-border/20 w-full rounded"></div>
             </div>
           ))}
        </div>
      ) : (
        <div className="space-y-0 border-l border-sun-border ml-4">
          {roadmapData.map((phase, idx) => (
            <div key={idx} className="relative pl-8 pb-12 last:pb-0">
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-sun-accent ring-4 ring-white" />
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-sun-muted">{phase.duration}</span>
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-xl text-sun-primary">{phase.phaseName}</h3>
                  <div className="text-sun-border">
                    {icons[idx] || icons[0]}
                  </div>
                </div>
                <ul className="mt-2 space-y-2">
                  {phase.items.map((item, i) => (
                    <li key={i} className="text-sun-secondary font-sans text-sm flex items-start gap-2">
                      <span className="text-sun-accent mt-1.5 w-1 h-1 rounded-full bg-current shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

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
};

// Internal Icons
const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);
const PenToolIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
);
const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
);
