
import React, { useState, useEffect } from 'react';
import { AppState } from '../../types';
import { Input, TextArea } from '../Input';
import { Button } from '../Button';
import { User, Lock, Globe, Building, Bell, Moon, Sun, Loader2, Check } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';

interface SettingsViewProps {
  data: AppState['data']; // Fallback/Initial data
}

export const SettingsView: React.FC<SettingsViewProps> = ({ data }) => {
  const { settings, loading, saving, updateProfile, updateOrganization, updatePreferences } = useSettings();
  
  // Local state for inputs to allow typing before save
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    description: ''
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        fullName: settings.profile.full_name,
        businessName: settings.organization.name,
        description: data.description // Description currently stays in wizard data/projects, not profile
      });
    }
  }, [settings]);

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-sun-muted" /></div>;
  }

  return (
    <div className="max-w-4xl space-y-12 animate-fade-in pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-serif text-3xl text-sun-primary mb-2">Settings & Context</h2>
          <p className="text-sun-secondary font-sans">
            Manage your business profile and system configurations.
          </p>
        </div>
        {saving && (
            <div className="flex items-center gap-2 text-xs text-sun-accent animate-pulse">
                <Loader2 size={12} className="animate-spin" /> Saving changes...
            </div>
        )}
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
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({...prev, fullName: e.target.value}))}
            onBlur={() => updateProfile({ full_name: formData.fullName })}
          />
          <Input 
            label="Email Address" 
            value={settings?.profile.email}
            readOnly
            className="opacity-70 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Organization Section */}
      <div className="bg-white border border-sun-border rounded-sm p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8 border-b border-sun-border pb-4">
          <div className="flex items-center gap-3">
            <Building size={20} className="text-sun-accent" />
            <h3 className="font-serif text-xl">Organization</h3>
          </div>
          <span className="text-xs uppercase font-bold tracking-widest bg-sun-bg px-3 py-1 rounded border border-sun-border">
            {settings?.organization.tier || 'Free'} Plan
          </span>
        </div>
        
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input 
              label="Organization Name" 
              value={formData.businessName}
              onChange={(e) => setFormData(prev => ({...prev, businessName: e.target.value}))}
              onBlur={() => updateOrganization(formData.businessName)}
            />
            <div className="relative">
              <Input 
                label="Website URL" 
                defaultValue={data.website}
                readOnly
                className="opacity-70"
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
            defaultValue={formData.description}
            rows={4}
            className="opacity-70"
            readOnly // Making read-only for now as it maps to wizard data structure
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

      {/* Preferences Section */}
      <div className="bg-white border border-sun-border rounded-sm p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8 border-b border-sun-border pb-4">
          <Bell size={20} className="text-sun-accent" />
          <h3 className="font-serif text-xl">Preferences</h3>
        </div>
        
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-sun-bg rounded text-sun-tertiary"><Moon size={16} /></div>
                    <div>
                        <div className="text-sm font-medium text-sun-primary">Dark Mode</div>
                        <div className="text-xs text-sun-secondary">Adjust the interface contrast</div>
                    </div>
                </div>
                <button 
                    onClick={() => updatePreferences({ theme: settings?.preferences.theme === 'dark' ? 'light' : 'dark' })}
                    className={`w-10 h-6 rounded-full p-1 transition-colors ${settings?.preferences.theme === 'dark' ? 'bg-sun-primary' : 'bg-sun-border'}`}
                >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings?.preferences.theme === 'dark' ? 'translate-x-4' : ''}`} />
                </button>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-sun-bg rounded text-sun-tertiary"><Bell size={16} /></div>
                    <div>
                        <div className="text-sm font-medium text-sun-primary">Email Notifications</div>
                        <div className="text-xs text-sun-secondary">Weekly summaries and alerts</div>
                    </div>
                </div>
                <button 
                    onClick={() => updatePreferences({ email_notifications: !settings?.preferences.email_notifications })}
                    className={`w-10 h-6 rounded-full p-1 transition-colors ${settings?.preferences.email_notifications ? 'bg-sun-primary' : 'bg-sun-border'}`}
                >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings?.preferences.email_notifications ? 'translate-x-4' : ''}`} />
                </button>
            </div>
        </div>
      </div>

    </div>
  );
};
