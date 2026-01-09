
import React, { useState } from 'react';
import { X, Play, Loader2, Sparkles, Check } from 'lucide-react';
import { Button } from '../../Button';
import { Select } from '../../Input';
import { supabase } from '../../../services/supabase';
import { RoadmapPhase } from '../../../types';

interface ScenarioPlannerProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateRoadmap: (newPhases: RoadmapPhase[]) => void;
  currentRoadmap: RoadmapPhase[];
}

export const ScenarioPlanner: React.FC<ScenarioPlannerProps> = ({ 
  isOpen, 
  onClose, 
  onUpdateRoadmap,
  currentRoadmap 
}) => {
  const [loading, setLoading] = useState(false);
  const [scenario, setScenario] = useState('accelerate');
  const [intensity, setIntensity] = useState('moderate');
  const [simulationResult, setSimulationResult] = useState<{ phases: RoadmapPhase[], notes: string } | null>(null);

  if (!isOpen) return null;

  const handleSimulate = async () => {
    setLoading(true);
    setSimulationResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('planner', {
        body: { 
            wizardState: { 
                data: { 
                    industry: 'other', // Should ideally come from context
                    selectedSystems: [], 
                },
                scenario: { type: scenario, intensity }
            } 
        }
      });

      if (error) throw error;

      if (data && data.phases) {
          setSimulationResult({
              phases: data.phases,
              notes: data.simulation_notes || "Scenario simulated successfully."
          });
      }
    } catch (e) {
      console.error("Scenario error", e);
      alert("Simulation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
      if (simulationResult) {
          onUpdateRoadmap(simulationResult.phases);
          onClose();
      }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-sm shadow-xl w-full max-w-2xl border border-sun-border overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-sun-border bg-sun-bg/30">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-sun-accent" />
            <h2 className="font-serif text-lg text-sun-primary">Scenario Planner</h2>
          </div>
          <button onClick={onClose} className="text-sun-tertiary hover:text-sun-primary">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <div className="bg-sun-right p-4 rounded-sm border border-sun-border text-sm text-sun-secondary mb-6">
                    Use the Planner Agent to simulate different execution strategies. The roadmap will adjust dependencies automatically.
                  </div>

                  <Select
                    label="Scenario Type"
                    options={[
                      { label: 'Accelerate Timeline', value: 'accelerate' },
                      { label: 'Budget Constraints', value: 'budget' },
                      { label: 'Resource Shortage', value: 'resources' },
                      { label: 'Quality Focus', value: 'quality' }
                    ]}
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                  />

                  <div className="mt-4">
                    <Select
                        label="Intensity"
                        options={[
                        { label: 'Low', value: 'low' },
                        { label: 'Moderate', value: 'moderate' },
                        { label: 'High', value: 'high' }
                        ]}
                        value={intensity}
                        onChange={(e) => setIntensity(e.target.value)}
                    />
                  </div>
                  
                  <div className="mt-6">
                    <Button onClick={handleSimulate} disabled={loading} fullWidth>
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="animate-spin" size={18} /> Simulating...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Play size={16} fill="currentColor" /> Run Simulation
                            </div>
                        )}
                    </Button>
                  </div>
              </div>

              <div className="border-l border-sun-border pl-6">
                  <h3 className="font-serif text-md text-sun-primary mb-4">Simulation Results</h3>
                  
                  {simulationResult ? (
                      <div className="space-y-4 animate-fade-in">
                          <div className="bg-green-50 text-green-800 text-sm p-3 rounded-sm border border-green-100">
                              {simulationResult.notes}
                          </div>
                          <div className="space-y-2">
                              {simulationResult.phases.map((p, i) => (
                                  <div key={i} className="text-xs border border-sun-border p-2 rounded-sm bg-white">
                                      <div className="font-bold text-sun-primary">{p.phaseName}</div>
                                      <div className="text-sun-secondary">{p.duration}</div>
                                  </div>
                              ))}
                          </div>
                          <Button onClick={handleApply} variant="outline" fullWidth className="mt-4 border-green-600 text-green-700 hover:bg-green-50">
                              <Check size={16} className="mr-2" /> Apply Changes
                          </Button>
                      </div>
                  ) : (
                      <div className="h-full flex items-center justify-center text-sun-muted text-sm italic">
                          Run a simulation to see projected impacts.
                      </div>
                  )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
