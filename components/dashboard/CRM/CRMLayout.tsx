
import React, { useState } from 'react';
import { ClientList } from './ClientList';
import { CRMKanban } from './CRMKanban';
import { ClientIntelligence } from './ClientIntelligence';
import { Users, Filter, Plus, Loader2, LayoutGrid, List } from 'lucide-react';
import { Button } from '../../Button';
import { useCRM } from '../../../hooks/useCRM';
import { CRMContact } from '../../../types';

export const CRMLayout: React.FC = () => {
  const { contacts, loading, updateStage } = useCRM();
  const [selectedContact, setSelectedContact] = useState<CRMContact | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

  // Simple stats calculation
  const totalLeads = contacts.length;
  const activeLeads = contacts.filter(c => c.status === 'active').length;
  const pipelineValue = contacts.reduce((acc, curr) => acc + (curr.value || 0), 0);

  return (
    <div className="flex h-[calc(100vh-140px)] border border-sun-border rounded-sm overflow-hidden bg-white animate-fade-in">
      {/* Left Panel: Context & Navigation (20%) - Hidden in Kanban Mode to give more space */}
      {viewMode === 'list' && (
        <div className="w-[20%] border-r border-sun-border bg-sun-bg p-4 flex flex-col gap-6 hidden md:flex">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-sun-muted mb-4">Pipeline Pulse</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-sun-secondary">Total Records</span>
                <span className="font-medium text-sun-primary">{totalLeads}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-sun-secondary">Active Clients</span>
                <span className="font-medium text-sun-accent">{activeLeads}</span>
              </div>
              <div className="h-px bg-sun-border my-2"></div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-sun-secondary">Exp. Revenue</span>
                <span className="font-medium text-sun-primary">${pipelineValue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-sun-muted mb-4">Smart Filters</h3>
            <div className="space-y-1">
              <button className="w-full text-left px-3 py-2 rounded-sm bg-white border border-sun-border text-sm font-medium text-sun-primary shadow-sm">
                All Contacts
              </button>
              <button className="w-full text-left px-3 py-2 rounded-sm hover:bg-white text-sm text-sun-secondary transition-colors">
                Churn Risk ⚠️
              </button>
              <button className="w-full text-left px-3 py-2 rounded-sm hover:bg-white text-sm text-sun-secondary transition-colors">
                Hot Leads 🔥
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Center Panel: Work Surface (Responsive Width) */}
      <div className={`flex flex-col bg-white ${viewMode === 'kanban' ? 'w-full' : 'w-full md:w-[50%]'}`}>
        <div className="p-4 border-b border-sun-border flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sun-secondary">
              <Users size={18} />
              <span className="font-serif text-lg text-sun-primary">Contacts</span>
            </div>
            
            {/* View Toggles */}
            <div className="flex bg-sun-bg p-1 rounded-sm border border-sun-border">
                <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-sm transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-sun-primary' : 'text-sun-tertiary hover:text-sun-primary'}`}
                >
                    <List size={14} />
                </button>
                <button 
                    onClick={() => setViewMode('kanban')}
                    className={`p-1.5 rounded-sm transition-colors ${viewMode === 'kanban' ? 'bg-white shadow-sm text-sun-primary' : 'text-sun-tertiary hover:text-sun-primary'}`}
                >
                    <LayoutGrid size={14} />
                </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="p-2 hover:bg-sun-bg rounded-full text-sun-tertiary">
              <Filter size={16} />
            </button>
            <Button variant="outline" className="h-8 text-xs px-3 py-0">
              <Plus size={14} className="mr-1" /> Add
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          {loading ? (
            <div className="flex items-center justify-center h-full text-sun-muted">
              <Loader2 size={24} className="animate-spin mr-2" /> Loading...
            </div>
          ) : viewMode === 'list' ? (
            <ClientList 
              contacts={contacts} 
              selectedId={selectedContact?.id} 
              onSelect={setSelectedContact} 
            />
          ) : (
            <CRMKanban 
                contacts={contacts} 
                onStageChange={updateStage}
                onSelect={setSelectedContact}
            />
          )}
        </div>
      </div>

      {/* Right Panel: Intelligence Stream (30%) - Hidden if Kanban is open to maximize space, or overlay? Let's keep it visible in list, hidden/overlay in kanban or squeeze it? 
          For simplicity in this codebase, we hide it in Kanban mode OR overlay it when a card is clicked. 
          Let's try: Visible in List, Slide-over in Kanban if card selected.
      */}
      {(viewMode === 'list' || selectedContact) && (
        <div className={`
            border-l border-sun-border bg-sun-right overflow-hidden flex flex-col transition-all duration-300
            ${viewMode === 'list' ? 'w-full md:w-[30%]' : 'fixed inset-y-0 right-0 w-[400px] shadow-2xl z-20'}
        `}>
            {viewMode === 'kanban' && (
                <button 
                    onClick={() => setSelectedContact(null)}
                    className="absolute top-4 right-4 z-30 p-2 bg-white rounded-full shadow-sm hover:bg-sun-bg"
                >
                    ✕
                </button>
            )}
            
            {selectedContact ? (
                <ClientIntelligence contact={selectedContact} />
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-sun-muted p-8 text-center">
                <Users size={32} className="mb-4 opacity-20" />
                <p className="text-sm">Select a contact to activate the Account Manager Agent.</p>
                </div>
            )}
        </div>
      )}
    </div>
  );
};
