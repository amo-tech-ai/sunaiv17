
import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Button } from '../../Button';
import { Input, Select } from '../../Input';
import { useCRM } from '../../../hooks/useCRM';
import { useProjects } from '../../../hooks/useProjects';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose }) => {
  const { contacts } = useCRM();
  const { createProject } = useProjects();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    clientId: '',
    startDate: new Date().toISOString().split('T')[0],
    value: ''
  });

  if (!isOpen) return null;

  const clientOptions = [
    { label: 'Select a client...', value: '' },
    ...contacts.map(c => ({
      label: c.name + (c.company ? ` (${c.company})` : ''),
      value: c.id
    }))
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    setLoading(true);
    try {
      await createProject({
        name: formData.name,
        client_id: formData.clientId || null as any, // Handle internal projects if no client selected
        start_date: formData.startDate,
        value: Number(formData.value) || 0
      });
      
      // Reset form
      setFormData({
        name: '',
        clientId: '',
        startDate: new Date().toISOString().split('T')[0],
        value: ''
      });
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-sm shadow-xl w-full max-w-md border border-sun-border overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-sun-border bg-sun-bg/30">
          <h2 className="font-serif text-lg text-sun-primary">New Project</h2>
          <button onClick={onClose} className="text-sun-tertiary hover:text-sun-primary">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <Input
            label="Project Name"
            placeholder="e.g. Website Redesign"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Select
            label="Client (Optional)"
            options={clientOptions}
            value={formData.clientId}
            onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
            <Input
              label="Budget Value ($)"
              type="number"
              placeholder="0.00"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="min-w-[100px]">
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Create Project'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
