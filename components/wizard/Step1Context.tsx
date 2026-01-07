
import React from 'react';
import { CheckCircle2, ShieldCheck, Activity } from 'lucide-react';
import { Input, TextArea, Select } from '../Input';
import { AppState, IndustryType } from '../../types';

interface Step1ContextProps {
  data: AppState['data'];
  updateData: (section: keyof AppState['data'], value: any) => void;
  onUrlBlur: () => void;
  isAnalyzing: boolean;
}

export const Step1Context: React.FC<Step1ContextProps> = ({ 
  data, 
  updateData, 
  onUrlBlur,
  isAnalyzing 
}) => {
  const analysis = data.analysis;
  const isNameValid = data.businessName.length >= 2;

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-serif text-4xl text-sun-primary mb-2">Tell us about your business</h1>
          <p className="text-sun-secondary font-sans">Let's build your truth baseline.</p>
        </div>
        {analysis?.verified && (
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-sm border border-green-100 animate-fade-in shadow-sm">
            <ShieldCheck size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Verified Entity</span>
          </div>
        )}
      </div>
      
      <div className="space-y-8 max-w-xl">
        <Input 
          label="Business Name" 
          placeholder="e.g. Acme Corp" 
          value={data.businessName}
          onChange={(e) => updateData('businessName', e.target.value)}
          className={!isNameValid && data.businessName.length > 0 ? "border-red-300" : ""}
        />
        {!isNameValid && data.businessName.length > 0 && (
          <p className="text-xs text-red-500 mt-[-20px]">Name must be at least 2 characters.</p>
        )}
        
        <div className="relative">
          <Input 
            label="Website" 
            placeholder="acme.com" 
            value={data.website}
            onChange={(e) => updateData('website', e.target.value)}
            onBlur={() => {
              if (data.website && isNameValid) {
                onUrlBlur();
              }
            }}
          />
          {isAnalyzing && (
            <div className="absolute right-0 top-8 flex items-center gap-2 text-xs text-sun-accent animate-pulse font-medium">
              <Activity size={12} className="animate-spin" />
              Verifying digital footprint...
            </div>
          )}
        </div>

        {/* Industry Selection - Auto-populated but editable */}
        <div className="relative">
          <Select 
            label="Industry" 
            options={[
              { label: 'SaaS / Startup', value: 'saas' },
              { label: 'Fashion / Retail', value: 'fashion' },
              { label: 'Real Estate', value: 'real_estate' },
              { label: 'Tourism / Hospitality', value: 'tourism' },
              { label: 'Other', value: 'other' },
            ]}
            value={data.industry}
            onChange={(e) => updateData('industry', e.target.value as IndustryType)}
          />
          {analysis && analysis.industry_confidence > 70 && (
             <div className="absolute -right-2 top-0 translate-x-full mt-8 hidden xl:block w-56">
                <div className="bg-sun-right border border-sun-border p-4 text-xs text-sun-secondary rounded-sm shadow-sm">
                   <div className="font-bold text-sun-primary mb-2 flex items-center gap-2">
                     <CheckCircle2 size={12} className="text-sun-accent" />
                     AI Detected
                   </div>
                   <div className="leading-relaxed">
                     Based on signals: <br/>
                     <span className="text-sun-tertiary italic">{analysis.industry_signals.slice(0, 2).join(', ')}</span>
                   </div>
                </div>
             </div>
          )}
        </div>
        
        <TextArea 
          label="Short Description" 
          placeholder="We help companies scale their operations through..." 
          value={data.description}
          onChange={(e) => updateData('description', e.target.value)}
        />

        {/* Analysis Insights Preview (if available) */}
        {analysis && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-sun-right p-4 border border-sun-border rounded-sm">
                <label className="text-[10px] uppercase tracking-widest text-sun-muted font-bold block mb-2">Business Model</label>
                <div className="text-sm font-medium text-sun-primary">{analysis.business_model}</div>
             </div>
             <div className="bg-sun-right p-4 border border-sun-border rounded-sm">
                <label className="text-[10px] uppercase tracking-widest text-sun-muted font-bold block mb-2">Digital Maturity</label>
                <div className="flex items-center gap-2">
                   <div className="flex gap-1">
                     {[1,2,3,4,5].map(i => (
                       <div 
                         key={i} 
                         className={`h-2 w-6 rounded-full transition-colors duration-500 ${i <= analysis.maturity_score ? 'bg-sun-accent' : 'bg-sun-border'}`} 
                       />
                     ))}
                   </div>
                   <span className="text-xs font-bold text-sun-primary ml-2">{analysis.maturity_score}/5</span>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
