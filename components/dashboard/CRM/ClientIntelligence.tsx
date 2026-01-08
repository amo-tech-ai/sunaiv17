
import React, { useEffect, useState } from 'react';
import { CRMContact } from '../../../types';
import { Sparkles, ArrowRight, Loader2, Newspaper, Mail } from 'lucide-react';
import { supabase } from '../../../services/supabase';
import { Button } from '../../Button';

interface ClientIntelligenceProps {
  contact: CRMContact;
}

interface IntelligenceData {
  health_score: number;
  summary: string;
  news_snippet?: string;
  suggested_action: {
    title: string;
    draft_content: string;
    reasoning: string;
  };
}

export const ClientIntelligence: React.FC<ClientIntelligenceProps> = ({ contact }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IntelligenceData | null>(null);

  useEffect(() => {
    const analyze = async () => {
      setLoading(true);
      setData(null);
      try {
        const { data: result, error } = await supabase.functions.invoke('crm-intelligence', {
          body: {
            clientId: contact.id,
            clientDetails: contact,
            // Mocking history for now as the interactions table might be empty
            // In production, this fetch should happen either here or in the edge function
            recentHistory: null 
          }
        });

        if (error) throw error;
        setData(result);
      } catch (e) {
        console.error("CRM Intelligence Error:", e);
      } finally {
        setLoading(false);
      }
    };

    if (contact) {
      analyze();
    }
  }, [contact.id]);

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center h-full space-y-4">
        <Loader2 size={32} className="animate-spin text-sun-accent" />
        <div className="text-center space-y-1">
          <p className="font-serif text-sun-primary">Analyzing Relationship</p>
          <p className="text-xs text-sun-muted">Scanning history & news...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const scoreColor = data.health_score > 70 ? 'text-green-600' : data.health_score > 40 ? 'text-sun-accent' : 'text-red-500';

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-sun-border bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-sun-muted">
          <Sparkles size={12} className="text-sun-accent" />
          Account Manager Agent
        </div>
        <div className="flex justify-between items-end">
          <h2 className="font-serif text-xl text-sun-primary">Relationship Health</h2>
          <div className={`font-mono text-2xl font-bold ${scoreColor}`}>
            {data.health_score}<span className="text-sm text-sun-muted font-normal">/100</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
        
        {/* Summary */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-sun-muted">Analysis</div>
          <p className="text-sm text-sun-secondary leading-relaxed font-medium">
            {data.summary}
          </p>
        </div>

        {/* News Grounding */}
        {data.news_snippet && (
          <div className="bg-white p-4 rounded-sm border border-sun-border shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-sun-muted">
              <Newspaper size={12} /> Relevant News
            </div>
            <p className="text-xs text-sun-secondary italic">
              "{data.news_snippet}"
            </p>
          </div>
        )}

        {/* Action Card */}
        <div className="bg-sun-primary text-white p-5 rounded-sm shadow-md">
          <div className="flex items-center gap-2 mb-3 text-[10px] font-bold uppercase tracking-widest opacity-70">
            <ArrowRight size={12} /> Recommended Action
          </div>
          <h3 className="font-serif text-lg mb-2">{data.suggested_action.title}</h3>
          <p className="text-xs opacity-80 mb-4">{data.suggested_action.reasoning}</p>
          
          {/* Draft Preview */}
          <div className="bg-white/10 p-3 rounded-sm mb-4">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-bold uppercase tracking-widest opacity-60">
              <Mail size={10} /> Draft Content
            </div>
            <p className="text-xs font-mono leading-relaxed whitespace-pre-wrap opacity-90">
              {data.suggested_action.draft_content}
            </p>
          </div>

          <Button variant="outline" fullWidth className="border-white text-white hover:bg-white hover:text-sun-primary text-xs h-9">
            Review & Send
          </Button>
        </div>

      </div>
    </div>
  );
};
