
import React from 'react';
import { AppState } from '../../types';
import { Input, TextArea } from '../Input';
import { Button } from '../Button';
import { User, Lock, Globe, Building } from 'lucide-react';

interface SettingsViewProps {
  data: AppState['data'];
}

export const SettingsView: React.FC<SettingsViewProps> = ({ data }) => {
  return (
    <div className="max-w-4xl space-y-12 animate-fade-in pb-20">
      
      {/* Header */}
      <div>
        <h2 className="font-serif text-3xl text-sun-primary mb-2">Settings & Context</h2>
        <p className="text-sun-secondary font-sans">
          Manage your business profile and system configurations.
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white border border-sun-border rounded-sm p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8 border-b border-sun-border pb-4">
          <User size={20} className="text-sun-accent" />
          <h3 className="font-serif text-xl">Primary Contact</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input 
            label="Full Name" 
            defaultValue={data.fullName}
            readOnly
            className="opacity-70 cursor-not-allowed"
          />
          <Input 
            label="Email Address" 
            defaultValue="user@example.com" // Placeholder since we don't capture email in Wizard Step 1
            readOnly
            className="opacity-70 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Business Context Section */}
      <div className="bg-white border border-sun-border rounded-sm p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8 border-b border-sun-border pb-4">
          <Building size={20} className="text-sun-accent" />
          <h3 className="font-serif text-xl">Business Intelligence</h3>
        </div>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input 
              label="Company Name" 
              defaultValue={data.businessName}
            />
            <div className="relative">
              <Input 
                label="Website URL" 
                defaultValue={data.website}
              />
              <a 
                href={`https://${data.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute right-0 top-8 text-xs text-sun-accent hover:underline flex items-center gap-1"
              >
                <Globe size={12} /> Visit
              </a>
            </div>
          </div>
          
          <TextArea 
            label="Strategic Context" 
            defaultValue={data.description}
            rows={4}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-sun-right p-4 rounded-sm border border-sun-border">
                <span className="text-xs font-bold uppercase tracking-widest text-sun-muted block mb-2">Detected Industry</span>
                <span className="text-sm font-medium text-sun-primary capitalize flex items-center gap-2">
                  {data.industry.replace('_', ' ')}
                  <Lock size={12} className="text-sun-tertiary" />
                </span>
             </div>
             <div className="bg-sun-right p-4 rounded-sm border border-sun-border">
                <span className="text-xs font-bold uppercase tracking-widest text-sun-muted block mb-2">Maturity Score</span>
                <span className="text-sm font-medium text-sun-primary">
                  {data.analysis?.maturity_score || 'N/A'} / 5
                </span>
             </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-end gap-4">
        <Button variant="ghost">Discard Changes</Button>
        <Button>Save Configuration</Button>
      </div>

    </div>
  );
};
