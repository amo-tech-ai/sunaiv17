
import React from 'react';
import { CRMContact } from '../../../types';
import { MoreHorizontal, User, Building } from 'lucide-react';

interface ClientListProps {
  contacts: CRMContact[];
  selectedId?: string;
  onSelect: (contact: CRMContact) => void;
}

export const ClientList: React.FC<ClientListProps> = ({ contacts, selectedId, onSelect }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="divide-y divide-sun-border">
      {contacts.map((contact) => (
        <div 
          key={contact.id}
          onClick={() => onSelect(contact)}
          className={`
            p-4 cursor-pointer transition-colors hover:bg-sun-bg group
            ${selectedId === contact.id ? 'bg-sun-bg border-l-4 border-l-sun-accent' : 'border-l-4 border-l-transparent'}
          `}
        >
          <div className="flex justify-between items-start mb-1">
            <div className="flex items-center gap-2">
              <h4 className={`font-bold text-sm ${selectedId === contact.id ? 'text-sun-primary' : 'text-sun-secondary'}`}>
                {contact.name}
              </h4>
              {contact.status === 'active' && (
                <span className="w-2 h-2 rounded-full bg-green-500" title="Active Client"></span>
              )}
              {contact.status === 'lead' && (
                <span className="w-2 h-2 rounded-full bg-sun-accent" title="Lead"></span>
              )}
              {contact.status === 'churned' && (
                <span className="w-2 h-2 rounded-full bg-red-500" title="Churned"></span>
              )}
            </div>
            <span className="text-[10px] text-sun-muted uppercase tracking-wider">{formatDate(contact.last_active_at)}</span>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-sun-tertiary mb-2">
            <div className="flex items-center gap-1">
              <Building size={12} />
              {contact.company || 'Company N/A'}
            </div>
            <div className="flex items-center gap-1">
              <User size={12} />
              {contact.role || 'Role N/A'}
            </div>
          </div>

          <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
             <div className="text-[10px] text-sun-muted truncate max-w-[200px]">{contact.email}</div>
             <button className="text-sun-muted hover:text-sun-primary">
               <MoreHorizontal size={16} />
             </button>
          </div>
        </div>
      ))}
    </div>
  );
};
