
import React, { useEffect, useState } from 'react';
import { Check, BarChart3, Sparkles, AlertCircle, Plus } from 'lucide-react';
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only fetch if we haven't already populated recommendations or if it's empty
    if (aiRecommendations.systemIds.length === 0) {
      const fetchRecs = async () => {
        setLoading(true);
        setStream("Analyzing your diagnostic priorities...\n\nConsulting our system library for the best fit...");
        
        try {
          // Pass industry, priorities, AND selected services for better context
          const recs = await optimizer.recommendSystems(data.industry, data.priorities, data.selectedServices);
          setRecommendations(recs);
          
          if (recs.summary) {
             setStream(recs.summary);
          } else if (recs.systemIds.length > 0) {
             const topRecId = recs.systemIds[0];
             const topRecName = SYSTEMS.find(s => s.id === topRecId)?.title;
             setStream(`Based on your focus on **${data.priorities.moneyFocus || 'Growth'}**, I highly recommend starting with the **${topRecName}**. \n\nSelect up to 3 systems to build your stack.`);
          }
        } catch (e) {
          console.error("Optimizer error", e);
          setStream("I had trouble optimizing the list, but you can still select the systems that look best to you.");
        } finally {
          setLoading(false);
        }
      };
      fetchRecs();
    }
  }, []);

  const generateCumulativeInsight = (currentSelection: string[]) => {
    if (currentSelection.length === 0) {
      return "Select a system to see its projected impact on your business.";
    }

    // Helper for industry terms to make insights feel native
    const customerTerm = data.industry === 'tourism' ? 'guests' : data.industry === 'fashion' ? 'shoppers' : 'leads';
    const conversionTerm = data.industry === 'real_estate' ? 'tours' : 'sales';

    const mainPriority = data.priorities.moneyFocus || "Revenue Growth";
    
    let narrative = `**Strategic Stack Analysis**\n\n`;
    
    // Individual Impacts
    currentSelection.forEach(id => {
      const sys = SYSTEMS.find(s => s.id === id);
      const impact = aiRecommendations.impacts[id] || sys?.revenueImpact;
      narrative += `• **${sys?.title}**: ${impact}\n`;
    });

    narrative += `\n`;

    // Advanced Synergy Logic
    if (currentSelection.length > 1) {
      narrative += `**Synergistic Benefit:**\n`;
      
      const hasLeadGen = currentSelection.includes('lead_gen');
      const hasCRM = currentSelection.includes('crm_autopilot');
      const hasWhatsApp = currentSelection.includes('whatsapp_assistant');
      const hasContent = currentSelection.includes('content_studio');
      const hasConversion = currentSelection.includes('conversion_booster');

      // Triads (High Value Combinations)
      if (hasLeadGen && hasCRM && hasWhatsApp) {
         narrative += `This is the **'Ultimate Speed-to-Lead'** stack. You capture interest (Lead Gen), engage instantly (WhatsApp), and nurture automatically (CRM). Expect a reduction in CAC and a significant boost in LTV.\n`;
      } else if (hasContent && hasConversion && hasCRM) {
         narrative += `The **'Brand Ecosystem'** stack. You attract with Content, convert with the Booster, and retain with CRM. This builds a defensible, high-margin brand machine.\n`;
      } 
      // Pairs
      else if (hasLeadGen && hasCRM) {
        narrative += `Combining **Lead Gen** with **Retention** creates a 'Closed Loop' engine. You aren't just capturing ${customerTerm}; you're maximizing their lifetime value.\n`;
      } else if (hasLeadGen && hasWhatsApp) {
        narrative += `Connecting **Lead Gen** directly to the **Concierge Agent** eliminates response delays. You catch ${customerTerm} at their moment of highest intent, doubling ${conversionTerm} rates.\n`;
      } else if (hasContent && hasConversion) {
        narrative += `This is a classic 'Traffic & Conversion' stack. The Content Engine fills the funnel, while the Conversion Suite ensures that traffic actually buys.\n`;
      } else if (hasCRM && hasWhatsApp) {
        narrative += `Hyper-personalized service. Your CRM data powers the WhatsApp agent, allowing for automated yet deeply personal interactions with ${customerTerm}.\n`;
      } else if (hasLeadGen && hasConversion) {
        narrative += `You are doubling down on acquisition. The Lead Pipeline brings them in, and the Conversion Suite ensures they convert. Ensure your operations can handle the volume.\n`;
      } else {
        narrative += `By integrating these ${currentSelection.length} systems, you create a cohesive workflow that addresses multiple bottlenecks simultaneously, compounding your ROI towards your goal of ${mainPriority}.\n`;
      }
    } else {
      narrative += `**Strategic Fit:**\nThis system directly addresses your priority of ${mainPriority}. It is the foundational layer for your automation strategy.`;
    }

    return narrative;
  };

  const handleSelection = (sysId: string) => {
    const isSelected = selectedSystems.includes(sysId);
    let newSelection: string[] = [];

    if (isSelected) {
      newSelection = selectedSystems.filter(id => id !== sysId);
      updateData('selectedSystems', newSelection);
    } else {
      if (selectedSystems.length >= 3) {
        const shakeCard = document.getElementById(`card-${sysId}`);
        shakeCard?.classList.add('animate-shake'); 
        return;
      }
      newSelection = [...selectedSystems, sysId];
      updateData('selectedSystems', newSelection);
    }

    // Update the stream with the cumulative insight
    setStream(generateCumulativeInsight(newSelection));
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-serif text-4xl text-sun-primary mb-2">Recommended Strategy</h1>
          <p className="text-sun-secondary font-sans">
            Based on your diagnostics, we've ranked these systems for {data.businessName}.
          </p>
        </div>
        <div className="text-right">
           <span className={`text-sm font-bold tracking-widest ${selectedSystems.length === 3 ? 'text-sun-accent' : 'text-sun-muted'}`}>
             {selectedSystems.length}/3 SELECTED
           </span>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-64 border border-sun-border bg-white/50 rounded-sm animate-pulse p-6 space-y-4">
              <div className="h-6 w-3/4 bg-sun-border/50 rounded"></div>
              <div className="h-4 w-full bg-sun-border/30 rounded"></div>
              <div className="h-4 w-1/2 bg-sun-border/30 rounded"></div>
              <div className="mt-8 h-px bg-sun-border/30"></div>
              <div className="h-4 w-1/3 bg-sun-border/30 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SYSTEMS.map(sys => {
            const isSelected = selectedSystems.includes(sys.id);
            const isRecommended = aiRecommendations.systemIds.includes(sys.id);
            const customImpact = aiRecommendations.impacts[sys.id] || sys.revenueImpact;
            const isDisabled = !isSelected && selectedSystems.length >= 3;

            return (
              <div 
                key={sys.id}
                id={`card-${sys.id}`}
                onClick={() => !isDisabled && handleSelection(sys.id)}
                className={`
                  p-6 border rounded-sm transition-all duration-300 cursor-pointer group relative flex flex-col justify-between min-h-[220px]
                  ${isSelected 
                    ? 'border-sun-primary bg-white shadow-md scale-[1.01]' 
                    : isDisabled 
                      ? 'opacity-50 border-sun-border bg-sun-bg grayscale cursor-not-allowed' 
                      : 'border-sun-border bg-white/50 hover:border-sun-accent/50 hover:shadow-sm'
                  }
                  ${isRecommended && !isSelected && !isDisabled ? 'ring-1 ring-sun-accent/30 bg-sun-accent/5' : ''}
                `}
              >
                {/* Badge */}
                {isRecommended && (
                  <div className="absolute -top-3 left-4 bg-sun-accent text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-sm z-10">
                    <Sparkles size={10} fill="currentColor" /> Recommended
                  </div>
                )}

                {/* Header */}
                <div>
                  <div className="flex justify-between items-start mb-3 mt-1">
                    <h3 className={`font-serif text-xl leading-tight ${isSelected ? 'text-sun-primary' : 'text-sun-secondary'}`}>
                      {sys.title}
                    </h3>
                    <div className={`w-6 h-6 border rounded-full flex items-center justify-center transition-colors shrink-0 ml-2 ${
                      isSelected ? 'bg-sun-primary border-sun-primary text-white' : 'border-sun-border group-hover:border-sun-accent'
                    }`}>
                      {isSelected ? <Check size={14} /> : <Plus size={14} className="text-sun-tertiary group-hover:text-sun-primary" />}
                    </div>
                  </div>
                  <p className="text-sm text-sun-secondary leading-relaxed mb-4">
                    {sys.description}
                  </p>
                </div>

                {/* Footer (ROI) */}
                <div className={`mt-auto pt-4 border-t border-sun-border/30 text-xs font-medium flex items-start gap-2 ${
                  isSelected ? 'text-sun-primary' : 'text-sun-tertiary'
                }`}>
                  <BarChart3 size={14} className="text-sun-accent shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{customImpact}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedSystems.length === 3 && (
        <div className="flex items-center justify-center gap-2 text-xs text-sun-accent bg-sun-accent/5 p-3 rounded-sm border border-sun-accent/20 animate-fade-in">
          <AlertCircle size={14} />
          <span>Maximum system limit reached. Deselect a system to choose another.</span>
        </div>
      )}
    </div>
  );
};
