import React from 'react';
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
  return (
    <div className="animate-fade-in space-y-8">
      <h1 className="font-serif text-4xl text-sun-primary mb-2">Tell us about your business</h1>
      <p className="text-sun-secondary font-sans mb-8">Let's build your profile.</p>
      
      <div className="space-y-8 max-w-xl">
        <Input 
          label="Business Name" 
          placeholder="e.g. Acme Corp" 
          value={data.businessName}
          onChange={(e) => updateData('businessName', e.target.value)}
        />
        
        <div className="relative">
          <Input 
            label="Website" 
            placeholder="acme.com" 
            value={data.website}
            onChange={(e) => updateData('website', e.target.value)}
            onBlur={() => {
              if (data.website && data.businessName) {
                onUrlBlur();
              }
            }}
          />
          {isAnalyzing && (
            <div className="absolute right-0 top-8 text-xs text-sun-accent animate-pulse font-medium">
              Verifying...
            </div>
          )}
        </div>

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
        
        <TextArea 
          label="Short Description" 
          placeholder="We help companies scale their operations through..." 
          value={data.description}
          onChange={(e) => updateData('description', e.target.value)}
        />
      </div>
    </div>
  );
};
