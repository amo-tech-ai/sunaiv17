
import React from 'react';
import { SYSTEMS } from '../../types';
import { Server, Activity, Terminal, Settings, Power } from 'lucide-react';
import { Button } from '../Button';

interface SystemsViewProps {
  selectedSystems: string[];
  impacts: Record<string, string>;
}

export const SystemsView: React.FC<SystemsViewProps> = ({ selectedSystems, impacts }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-serif text-3xl text-sun-primary mb-2">System Monitor</h2>
          <p className="text-sun-secondary font-sans">
            Real-time status of your deployed AI agents.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {selectedSystems.map((sysId) => {
          const system = SYSTEMS.find((s) => s.id === sysId);
          const impact = impacts[sysId] || system?.revenueImpact;

          return (
            <div key={sysId} className="bg-white border border-sun-border rounded-sm overflow-hidden shadow-sm">
              {/* System Header */}
              <div className="p-6 border-b border-sun-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-sun-bg rounded-sm border border-sun-border text-sun-primary">
                    <Server size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg text-sun-primary">{system?.title}</h3>
                      <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Online
                      </span>
                    </div>
                    <p className="text-sm text-sun-secondary max-w-xl">{system?.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button variant="ghost" className="text-xs h-9 px-4">
                    <Settings size={14} className="mr-2" /> Configure
                  </Button>
                  <Button variant="outline" className="text-xs h-9 px-4 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700">
                    <Power size={14} className="mr-2" /> Pause
                  </Button>
                </div>
              </div>

              {/* Metrics & Logs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-sun-border">
                
                {/* Metric 1 */}
                <div className="p-6">
                  <div className="text-xs uppercase tracking-widest text-sun-muted font-bold mb-2 flex items-center gap-2">
                    <Activity size={14} /> ROI Target
                  </div>
                  <div className="text-sm font-medium text-sun-primary leading-relaxed">
                    {impact}
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-6">
                  <div className="text-xs uppercase tracking-widest text-sun-muted font-bold mb-4">
                    Performance (24h)
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-sun-secondary">Uptime</span>
                        <span className="text-sun-primary font-bold">99.9%</span>
                      </div>
                      <div className="h-1.5 w-full bg-sun-bg rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[99%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-sun-secondary">Task Velocity</span>
                        <span className="text-sun-primary font-bold">High</span>
                      </div>
                      <div className="h-1.5 w-full bg-sun-bg rounded-full overflow-hidden">
                        <div className="h-full bg-sun-accent w-[85%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Logs Simulation */}
                <div className="p-6 bg-sun-primary/5 font-mono text-xs">
                  <div className="text-[10px] uppercase tracking-widest text-sun-tertiary font-bold mb-3 flex items-center gap-2">
                    <Terminal size={12} /> System Logs
                  </div>
                  <div className="space-y-2 opacity-70">
                    <div className="flex gap-2">
                      <span className="text-sun-muted">[10:42:05]</span>
                      <span className="text-sun-primary">Processing inbound trigger...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sun-muted">[10:42:08]</span>
                      <span className="text-green-700">Action executed successfully.</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sun-muted">[10:45:12]</span>
                      <span className="text-sun-primary">Syncing context with CRM...</span>
                    </div>
                    <div className="flex gap-2 animate-pulse">
                      <span className="text-sun-muted">[10:45:15]</span>
                      <span className="text-sun-accent">Monitoring for events...</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
