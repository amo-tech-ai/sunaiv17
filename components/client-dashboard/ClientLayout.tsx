
import React, { useState } from 'react';
import { BriefView } from './BriefView';
import { BillingView } from './BillingView';
import { RoadmapView } from '../dashboard/RoadmapView'; // Reuse existing component
import { FileText, Calendar, CreditCard, LogOut, Loader2 } from 'lucide-react';
import { Button } from '../Button';
import { useAuth } from '../../hooks/useAuth';
import { useClientPortal } from '../../hooks/useClientPortal';

export const ClientLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'brief' | 'timeline' | 'billing'>('brief');
  const { project, brief, invoices, roadmap, loading, updateBrief, uploadDocument } = useClientPortal();
  const { user } = useAuth(); // Assuming we might add signout later

  if (loading) {
      return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-sun-accent" /></div>;
  }

  return (
    <div className="min-h-screen bg-sun-bg flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-sun-border bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 bg-sun-primary text-white rounded-sm flex items-center justify-center font-serif font-bold">
                {project?.client?.charAt(0) || 'C'}
             </div>
             <div>
                <div className="text-sm font-bold text-sun-primary">{project?.client || 'Client Portal'}</div>
                <div className="text-[10px] text-sun-secondary uppercase tracking-wider">{project?.name || 'Loading Project...'}</div>
             </div>
          </div>
          
          <nav className="flex gap-1">
             {[
                 { id: 'brief', label: 'Brief & Docs', icon: FileText },
                 { id: 'timeline', label: 'Timeline', icon: Calendar },
                 { id: 'billing', label: 'Billing', icon: CreditCard },
             ].map(tab => (
                 <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`
                        flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-sm transition-all
                        ${activeTab === tab.id ? 'bg-sun-bg text-sun-primary border border-sun-border' : 'text-sun-secondary hover:text-sun-primary hover:bg-sun-right'}
                    `}
                 >
                    <tab.icon size={14} /> {tab.label}
                 </button>
             ))}
          </nav>

          <Button variant="ghost" className="h-8 w-8 p-0">
             <LogOut size={16} className="text-sun-muted hover:text-sun-primary" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
         {activeTab === 'brief' && <BriefView brief={brief} updateBrief={updateBrief} uploadDocument={uploadDocument} />}
         {activeTab === 'timeline' && <RoadmapView roadmap={roadmap} />}
         {activeTab === 'billing' && <BillingView invoices={invoices} />}
      </main>
    </div>
  );
};
