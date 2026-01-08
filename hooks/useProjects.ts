
import { useState, useEffect } from 'react';
import { Project, Task } from '../types';

// Mock Data Generator
const MOCK_PROJECTS: Project[] = [
  {
    id: 'p-1',
    name: 'Fall Collection Launch',
    client: 'Luxe Threads',
    status: 'Active',
    phase: 'Foundation',
    progress: 65,
    startDate: '2024-01-15',
    value: 45000,
    tasks: [
      { id: 't-1', title: 'Data Clean Up', description: 'Consolidate customer lists', status: 'done', priority: 'high', phase: 'Foundation', tags: ['data'] },
      { id: 't-2', title: 'Shopify Webhook', description: 'Configure events', status: 'in_progress', priority: 'high', phase: 'Foundation', tags: ['dev'] },
      { id: 't-3', title: 'Fit Guide Design', description: 'Draft UX mockups', status: 'todo', priority: 'medium', phase: 'Foundation', tags: ['design'] }
    ]
  },
  {
    id: 'p-2',
    name: 'WhatsApp Automation',
    client: 'Urban Properties',
    status: 'Planning',
    phase: 'Implementation',
    progress: 15,
    startDate: '2024-02-01',
    value: 28000,
    tasks: [
        { id: 't-4', title: 'API Approval', description: 'Submit Meta Business Verify', status: 'done', priority: 'high', phase: 'Implementation', tags: ['admin'] },
        { id: 't-5', title: 'Script Flows', description: 'Draft conversation paths', status: 'todo', priority: 'high', phase: 'Implementation', tags: ['content'] }
    ]
  }
];

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(MOCK_PROJECTS);
      setLoading(false);
    }, 800);
  }, []);

  const updateProjectStatus = (id: string, status: Project['status']) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const updateTaskStatus = (projectId: string, taskId: string, status: Task['status']) => {
    setProjects(prev => prev.map(p => {
        if (p.id !== projectId) return p;
        return {
            ...p,
            tasks: p.tasks.map(t => t.id === taskId ? { ...t, status } : t)
        };
    }));
  };

  return {
    projects,
    loading,
    updateProjectStatus,
    updateTaskStatus
  };
};
