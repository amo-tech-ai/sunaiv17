
import React from 'react';
import { Invoice } from '../../types';
import { Download, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../Button';

interface BillingViewProps {
  invoices: Invoice[];
}

export const BillingView: React.FC<BillingViewProps> = ({ invoices }) => {
  const totalDue = invoices.filter(i => i.status !== 'paid').reduce((sum, i) => sum + i.amount, 0);
  const paidTotal = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);

  const getStatusColor = (status: Invoice['status']) => {
      switch(status) {
          case 'paid': return 'text-green-600 bg-green-50 border-green-100';
          case 'overdue': return 'text-red-600 bg-red-50 border-red-100';
          default: return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
       {/* Summary Cards */}
       <div className="w-full lg:w-1/4 space-y-6">
          <div className="bg-white border border-sun-border p-6 rounded-sm shadow-sm">
              <div className="text-xs font-bold uppercase tracking-widest text-sun-muted mb-2">Total Due</div>
              <div className="font-serif text-3xl text-sun-primary mb-1">${totalDue.toLocaleString()}</div>
              {totalDue > 0 && <div className="text-xs text-red-500 font-medium">Action Required</div>}
          </div>
          
          <div className="bg-sun-right border border-sun-border p-6 rounded-sm">
              <div className="text-xs font-bold uppercase tracking-widest text-sun-muted mb-2">Total Paid</div>
              <div className="font-serif text-2xl text-sun-secondary">${paidTotal.toLocaleString()}</div>
          </div>

          <div className="bg-sun-right border border-sun-border p-6 rounded-sm">
              <div className="text-xs font-bold uppercase tracking-widest text-sun-muted mb-2">Next Payment</div>
              <div className="text-sm font-medium text-sun-primary">June 15, 2025</div>
              <div className="text-xs text-sun-secondary mt-1">Phase 2: Implementation</div>
          </div>
       </div>

       {/* Invoice List */}
       <div className="w-full lg:w-3/4 bg-white border border-sun-border rounded-sm shadow-sm overflow-hidden">
          <div className="p-6 border-b border-sun-border bg-sun-bg/30">
              <h2 className="font-serif text-xl text-sun-primary">Invoices</h2>
          </div>
          
          <div className="divide-y divide-sun-border">
              {invoices.length > 0 ? invoices.map(inv => (
                  <div key={inv.id} className="p-6 flex items-center justify-between hover:bg-sun-bg/30 transition-colors">
                      <div className="flex items-start gap-4">
                          <div className="p-2 bg-sun-bg rounded border border-sun-border">
                              <FileTextIcon />
                          </div>
                          <div>
                              <div className="font-medium text-sun-primary">{inv.number}</div>
                              <div className="text-sm text-sun-secondary">Due {new Date(inv.due_date).toLocaleDateString()}</div>
                          </div>
                      </div>
                      
                      <div className="flex items-center gap-8">
                          <div className="text-right">
                              <div className="font-mono font-medium text-sun-primary">${inv.amount.toLocaleString()}</div>
                              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${getStatusColor(inv.status)}`}>
                                  {inv.status}
                              </span>
                          </div>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-sun-muted hover:text-sun-primary">
                              <Download size={16} />
                          </Button>
                      </div>
                  </div>
              )) : (
                  <div className="p-12 text-center text-sun-muted">
                      No invoices found.
                  </div>
              )}
          </div>
       </div>
    </div>
  );
};

const FileTextIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sun-tertiary"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
);
