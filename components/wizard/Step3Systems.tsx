
import React, { useEffect } from 'react';
import { Check, BarChart3, Sparkles } from 'lucide-react';
import { SYSTEMS, AppState } from '../../types';
import { optimizer } from '../../services/gemini/optimizer';

interface Step3SystemsProps {
  selectedSystems: string[];
  data: AppState['data'];
  aiRecommendations: AppState['aiState']['recommendations'];
  updateData: (section: 'selectedSystems', value: string[]) => void;
  setRecommendations: (recs: AppState['aiState']['recommendations']) => void;
  setStream: (text: string) => void;
}

export const Step3Systems: React.FC<Step3SystemsProps> = ({ 
  selectedSystems, 
  data, 
  aiRecommendations,
  updateData, 
  setRecommendations,
  setStream
}) => {
  
  useEffect(() => {
    if (aiRecommendations.systemIds.length === 0) {
      const fetchRecs = async () => {
        setStream("Matching your pain points to our system library...");
        const recs = await optimizer.recommendSystems(data.industry, data.priorities);
        setRecommendations(recs);
        setStream(`I've prioritized ${recs.systemIds.length} systems that directly address your goals.`);
      };
      fetchRecs();
    }
  }, []);

  return (
    <div className="animate-fade-in space-y-8">
      <h1 className="font-serif text-4xl text-sun-primary mb-2">Recommended Systems</h1>
      <p className="text-sun-secondary font-sans mb-8">Select up to 3 systems to prioritize.</p>

      <div className="grid gap-4">
        {SYSTEMS.map(sys => {
          const isSelected = selectedSystems.includes(sys.id);
          const isRecommended = aiRecommendations.systemIds.includes(sys.id);
          const customImpact = aiRecommendations.impacts[sys.id] || sys.revenueImpact;

          return (
            <div 
              key={sys.id}
              onClick={() => {
                if (isSelected) {
                  updateData('selectedSystems', selectedSystems.filter(id => id !== sys.id));
                } else if (selectedSystems.length < 3) {
                  updateData('selectedSystems', [...selectedSystems, sys.id]);
                }
                setStream(`**${sys.title}**: ${customImpact}`);
              }}
              className={`p-6 border transition-all cursor-pointer group relative ${
                isSelected 
                ? 'border-sun-primary bg-white shadow-md' 
                : 'border-sun-border bg-transparent hover:border-sun-underline'
              } ${isRecommended ? 'ring-1 ring-sun-accent/30' : ''}`}
            >
              {isRecommended && (
                <div className="absolute -top-3 left-6 bg-sun-accent text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Sparkles size={10} fill="currentColor" /> Recommended
                </div>
              )}

              <div className="flex justify-between items-start mb-2 mt-1">
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
                {customImpact}
              </div>
            </div>
          );
        })}
      </div>
      {selectedSystems.length === 3 && (
          <p className="text-xs text-sun-muted mt-2 text-center">Maximum 3 systems selected</p>
      )}
    </div>
  );
};
