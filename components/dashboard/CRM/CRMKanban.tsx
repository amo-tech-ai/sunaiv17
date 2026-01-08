
import React, { useState } from 'react';
import { CRMContact, PipelineStage } from '../../../types';
import { MoreHorizontal, DollarSign, Clock } from 'lucide-react';

interface CRMKanbanProps {
  contacts: CRMContact[];
  onStageChange: (contactId: string, stage: PipelineStage) => void;
  onSelect: (contact: CRMContact) => void;
}

const STAGES: PipelineStage[] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];

export const CRMKanban: React.FC<CRMKanbanProps> = ({ contacts, onStageChange, onSelect }) => {
  const [draggedContactId, setDraggedContactId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, contactId: string) => {
    setDraggedContactId(contactId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, stage: PipelineStage) => {
    e.preventDefault();
    if (draggedContactId) {
      onStageChange(draggedContactId, stage);
      setDraggedContactId(null);
    }
  };

  return (
    <div className="flex h-full overflow-x-auto p-6 gap-4 min-w-[1000px]">
      {STAGES.map((stage) => {
        const stageContacts = contacts.filter(c => c.pipeline_stage === stage);
        const stageValue = stageContacts.reduce((acc, curr) => acc + (curr.value || 0), 0);

        return (
          <div 
            key={stage}
            className="flex-1 min-w-[280px] flex flex-col bg-sun-right/30 border border-sun-border rounded-sm h-full"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage)}
          >
            {/* Column Header */}
            <div className="p-3 border-b border-sun-border bg-white/50 backdrop-blur-sm sticky top-0 z-10">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-serif font-medium text-sun-primary">{stage}</h3>
                <span className="text-xs bg-sun-bg px-2 py-0.5 rounded-full border border-sun-border text-sun-muted font-mono">
                  {stageContacts.length}
                </span>
              </div>
              <div className="text-xs text-sun-tertiary font-medium">
                ${stageValue.toLocaleString()}
              </div>
            </div>

            {/* Cards Container */}
            <div className="p-3 space-y-3 overflow-y-auto flex-1 no-scrollbar">
              {stageContacts.map((contact) => (
                <div
                  key={contact.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, contact.id)}
                  onClick={() => onSelect(contact)}
                  className="bg-white border border-sun-border p-3 rounded-sm shadow-sm hover:shadow-md hover:border-sun-primary transition-all cursor-grab active:cursor-grabbing group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-sun-tertiary bg-sun-bg px-1.5 py-0.5 rounded border border-sun-border uppercase tracking-wide">
                      {contact.company}
                    </span>
                    <button className="text-sun-tertiary hover:text-sun-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                  
                  <h4 className="font-bold text-sm text-sun-primary mb-1">{contact.name}</h4>
                  <div className="text-xs text-sun-secondary mb-3">{contact.role}</div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-sun-border/50 text-[10px] text-sun-muted">
                    <div className="flex items-center gap-1">
                      <DollarSign size={10} />
                      <span className="font-mono">{(contact.value || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={10} />
                      <span>2d</span>
                    </div>
                  </div>
                </div>
              ))}
              {stageContacts.length === 0 && (
                <div className="h-full flex items-center justify-center text-sun-border text-xs italic opacity-50 min-h-[50px]">
                  Empty
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
