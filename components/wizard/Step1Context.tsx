
import React, { useRef, useState } from 'react';
import { CheckCircle2, ShieldCheck, Activity, Plus, Upload, X, FileText, File as FileIcon } from 'lucide-react';
import { Input, TextArea, Select } from '../Input';
import { AppState, IndustryType, UploadedDocument } from '../../types';
import { validateBusinessContext } from '../../utils/validation';

interface Step1ContextProps {
  data: AppState['data'];
  updateData: (section: keyof AppState['data'], value: any) => void;
  onUrlBlur: () => void;
  isAnalyzing: boolean;
}

const AVAILABLE_SERVICES = [
  "Web Applications",
  "Mobile Apps",
  "Chatbots",
  "AI Agents",
  "Ecommerce",
  "Social Media",
  "WhatsApp"
];

export const Step1Context: React.FC<Step1ContextProps> = ({ 
  data, 
  updateData, 
  onUrlBlur,
  isAnalyzing 
}) => {
  const analysis = data.analysis;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: any) => {
    const payload = {
        businessName: field === 'businessName' ? value : data.businessName,
        website: field === 'website' ? value : data.website,
        description: field === 'description' ? value : data.description
    };
    
    const result = validateBusinessContext(payload);
    if (!result.success) {
        const error = result.error.errors.find(e => e.path[0] === field);
        setValidationErrors(prev => ({
            ...prev,
            [field]: error ? error.message : ''
        }));
    } else {
        setValidationErrors(prev => {
            const next = { ...prev };
            delete next[field];
            return next;
        });
    }
  };

  const toggleService = (service: string) => {
    const currentServices = data.selectedServices || [];
    if (currentServices.includes(service)) {
      updateData('selectedServices', currentServices.filter(s => s !== service));
    } else {
      updateData('selectedServices', [...currentServices, service]);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploadError(null);
    const newDocs: UploadedDocument[] = [];
    const maxFileSize = 25 * 1024 * 1024; // 25MB

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > maxFileSize) {
        setUploadError(`File ${file.name} exceeds 25MB limit.`);
        continue;
      }

      const reader = new FileReader();
      
      const docPromise = new Promise<UploadedDocument>((resolve) => {
        reader.onload = (e) => {
          const result = e.target?.result as string;
          const base64 = result.split(',')[1];
          
          resolve({
            id: `doc-${Date.now()}-${i}`,
            name: file.name,
            type: file.type,
            size: file.size,
            base64: base64,
            content: file.type.startsWith('text/') ? atob(base64) : undefined 
          });
        };
        reader.readAsDataURL(file);
      });

      const doc = await docPromise;
      newDocs.push(doc);
    }

    if (newDocs.length > 0) {
      updateData('uploadedDocuments', [...(data.uploadedDocuments || []), ...newDocs]);
      onUrlBlur(); 
    }
  };

  const removeDocument = (id: string) => {
    updateData('uploadedDocuments', (data.uploadedDocuments || []).filter(d => d.id !== id));
  };

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
          label="Full Name" 
          placeholder="e.g. Jane Doe" 
          value={data.fullName}
          onChange={(e) => updateData('fullName', e.target.value)}
        />

        <div className="space-y-2">
          <Input 
            label="Business Name" 
            placeholder="e.g. Acme Corp" 
            value={data.businessName}
            onChange={(e) => {
                updateData('businessName', e.target.value);
                if (validationErrors.businessName) validateField('businessName', e.target.value);
            }}
            onBlur={(e) => validateField('businessName', e.target.value)}
            className={validationErrors.businessName ? "border-red-300 focus:border-red-500" : ""}
          />
          {validationErrors.businessName && (
            <p className="text-xs text-red-500">{validationErrors.businessName}</p>
          )}
        </div>
        
        <div className="relative space-y-2">
          <Input 
            label="Website" 
            placeholder="acme.com" 
            value={data.website}
            onChange={(e) => {
                updateData('website', e.target.value);
                if (validationErrors.website) validateField('website', e.target.value);
            }}
            onBlur={(e) => {
              validateField('website', e.target.value);
              if (data.website && !validationErrors.businessName) {
                onUrlBlur();
              }
            }}
            className={validationErrors.website ? "border-red-300 focus:border-red-500" : ""}
          />
          {validationErrors.website && (
            <p className="text-xs text-red-500">{validationErrors.website}</p>
          )}
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

        {/* Document Upload */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-sun-muted font-sans block mb-3">
            Upload Context (Optional)
          </label>
          <div 
            className="border border-dashed border-sun-border rounded-sm p-6 text-center hover:bg-sun-right/50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              multiple 
              accept=".pdf,.docx,.xlsx,.txt,image/*"
              onChange={handleFileUpload}
            />
            <div className="flex flex-col items-center gap-2 text-sun-secondary">
              <Upload size={24} className="text-sun-tertiary" />
              <span className="text-sm font-medium">Drop brand guides, pitch decks, or requirements here</span>
              <span className="text-xs text-sun-muted">PDF, Images, TXT supported for AI Analysis (Max 25MB)</span>
            </div>
          </div>
          {uploadError && <p className="text-xs text-red-500 mt-2">{uploadError}</p>}
          
          {/* File List */}
          {data.uploadedDocuments && data.uploadedDocuments.length > 0 && (
            <div className="mt-4 space-y-2">
              {data.uploadedDocuments.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-white border border-sun-border rounded-sm shadow-sm">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="bg-sun-right p-2 rounded-sm text-sun-tertiary">
                      {doc.type.includes('image') ? <FileIcon size={16} /> : <FileText size={16} />}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-medium text-sun-primary truncate">{doc.name}</p>
                      <p className="text-xs text-sun-muted">{(doc.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeDocument(doc.id)}
                    className="text-sun-tertiary hover:text-red-500 transition-colors p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Services Multi-Select */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-sun-muted font-sans block mb-3">
            Current / Planned Services
          </label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_SERVICES.map(service => {
              const isSelected = data.selectedServices?.includes(service);
              return (
                <button
                  key={service}
                  onClick={() => toggleService(service)}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300
                    ${isSelected 
                      ? 'bg-sun-primary text-white border-sun-primary shadow-sm' 
                      : 'bg-transparent text-sun-secondary border-sun-border hover:border-sun-primary hover:text-sun-primary'
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    {isSelected && <CheckCircle2 size={14} className="text-sun-accent" />}
                    {!isSelected && <Plus size={14} className="opacity-50" />}
                    {service}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

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
