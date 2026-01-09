
import React, { useState } from 'react';
import { Brief, UploadedDocument } from '../../types';
import { Edit2, Save, FilePlus, FileText, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../Button';
import { Input, TextArea } from '../Input';
import { supabase } from '../../services/supabase';

interface BriefViewProps {
  brief: Brief | null;
  updateBrief: (updates: Partial<Brief>) => Promise<void>;
  uploadDocument: (file: File) => Promise<void>;
}

export const BriefView: React.FC<BriefViewProps> = ({ brief, updateBrief, uploadDocument }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localBrief, setLocalBrief] = useState<Partial<Brief>>({});
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [analyzing, setAnalyzing] = useState(false);

  React.useEffect(() => {
      if (brief) setLocalBrief(brief);
  }, [brief]);

  const handleSave = async () => {
      await updateBrief(localBrief);
      setIsEditing(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
          await uploadDocument(files[0]);
      }
  };

  const analyzeBrief = async () => {
      setAnalyzing(true);
      try {
          const { data } = await supabase.functions.invoke('assistant', {
              body: { task: 'summarize_brief', content: JSON.stringify(localBrief) }
          });
          if (data?.summary) setAiAnalysis(data.summary);
      } catch (e) {
          console.error(e);
      } finally {
          setAnalyzing(false);
      }
  };

  if (!brief) return <div>Loading brief...</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
        {/* Left Panel: Project Context */}
        <div className="w-full lg:w-1/4 space-y-6">
            <div className="bg-white border border-sun-border p-6 rounded-sm shadow-sm">
                <div className="text-xs font-bold uppercase tracking-widest text-sun-muted mb-4">Brief Status</div>
                <div className="flex items-center gap-2 mb-4">
                    <span className={`w-2 h-2 rounded-full ${brief.status === 'approved' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    <span className="font-medium capitalize">{brief.status.replace('_', ' ')}</span>
                </div>
                <div className="text-xs text-sun-tertiary">
                    Last updated: {new Date(brief.updated_at).toLocaleDateString()}
                </div>
                <div className="mt-6 pt-6 border-t border-sun-border">
                    <div className="text-xs font-bold uppercase tracking-widest text-sun-muted mb-3">Version History</div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-sun-primary font-medium">v{brief.version} (Current)</span>
                            <span className="text-sun-muted">Now</span>
                        </div>
                        {brief.version > 1 && (
                            <div className="flex justify-between text-sm opacity-60">
                                <span className="text-sun-secondary">v{brief.version - 1}</span>
                                <span className="text-sun-muted">2d ago</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Center: Editor */}
        <div className="w-full lg:w-1/2 bg-white border border-sun-border rounded-sm shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-sun-border flex justify-between items-center bg-sun-bg/30">
                <h2 className="font-serif text-xl text-sun-primary">Strategic Brief</h2>
                <div className="flex gap-2">
                    {isEditing ? (
                        <Button onClick={handleSave} className="h-8 text-xs gap-2">
                            <Save size={14} /> Save
                        </Button>
                    ) : (
                        <Button variant="ghost" onClick={() => setIsEditing(true)} className="h-8 text-xs gap-2">
                            <Edit2 size={14} /> Edit
                        </Button>
                    )}
                </div>
            </div>
            
            <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-250px)]">
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-sun-muted">Executive Summary</h3>
                    {isEditing ? (
                        <TextArea 
                            label="" 
                            value={localBrief.executive_summary} 
                            onChange={(e) => setLocalBrief(prev => ({ ...prev, executive_summary: e.target.value }))}
                            className="min-h-[120px]"
                        />
                    ) : (
                        <p className="text-sun-secondary leading-relaxed">{localBrief.executive_summary}</p>
                    )}
                </div>

                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-sun-muted">Project Goals</h3>
                    {isEditing ? (
                        <TextArea 
                            label="One goal per line"
                            value={localBrief.goals?.join('\n')}
                            onChange={(e) => setLocalBrief(prev => ({ ...prev, goals: e.target.value.split('\n') }))}
                            className="min-h-[150px]"
                        />
                    ) : (
                        <ul className="space-y-2">
                            {localBrief.goals?.map((goal, i) => (
                                <li key={i} className="flex items-start gap-2 text-sun-secondary">
                                    <CheckCircle2 size={16} className="text-sun-accent mt-0.5 shrink-0" />
                                    <span>{goal}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-sun-muted">Scope & Requirements</h3>
                    {isEditing ? (
                        <TextArea 
                            label="" 
                            value={localBrief.scope} 
                            onChange={(e) => setLocalBrief(prev => ({ ...prev, scope: e.target.value }))}
                            className="min-h-[200px]"
                        />
                    ) : (
                        <p className="text-sun-secondary leading-relaxed whitespace-pre-wrap">{localBrief.scope}</p>
                    )}
                </div>
            </div>
        </div>

        {/* Right: Docs & AI */}
        <div className="w-full lg:w-1/4 space-y-6">
            {/* Documents */}
            <div className="bg-sun-right border border-sun-border p-6 rounded-sm">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-xs font-bold uppercase tracking-widest text-sun-muted">Documents</div>
                    <label className="cursor-pointer text-sun-accent hover:text-sun-primary transition-colors">
                        <FilePlus size={16} />
                        <input type="file" className="hidden" onChange={handleFileUpload} />
                    </label>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-white border border-sun-border rounded-sm">
                        <FileText size={16} className="text-sun-tertiary" />
                        <div className="overflow-hidden">
                            <div className="text-xs font-medium text-sun-primary truncate">Brand_Guidelines.pdf</div>
                            <div className="text-[10px] text-sun-muted">2.4 MB • 2d ago</div>
                        </div>
                    </div>
                    {/* Add map for documents later */}
                </div>
            </div>

            {/* AI Assistant */}
            <div className="bg-sun-primary text-white p-6 rounded-sm shadow-md">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={16} className="text-sun-accent" />
                    <span className="font-serif text-lg">Brief Assistant</span>
                </div>
                
                {aiAnalysis ? (
                    <div className="text-xs leading-relaxed opacity-90 whitespace-pre-wrap">
                        {aiAnalysis}
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-xs" onClick={analyzeBrief} disabled={analyzing}>
                            {analyzing ? <Loader2 size={14} className="animate-spin" /> : 'Analyze Brief'}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
