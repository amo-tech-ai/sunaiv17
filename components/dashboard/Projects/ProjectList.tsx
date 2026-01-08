
import React from 'react';
import { Project } from '../../../types';
import { Calendar, CheckCircle2, MoreHorizontal } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelect }) => {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Planning': return 'bg-blue-100 text-blue-700';
      case 'On Hold': return 'bg-orange-100 text-orange-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 grid gap-4">
      {projects.map((project) => (
        <div 
          key={project.id}
          onClick={() => onSelect(project)}
          className="bg-white border border-sun-border p-6 rounded-sm shadow-sm hover:shadow-md hover:border-sun-primary transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-serif text-lg text-sun-primary font-medium">{project.name}</h3>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-sun-secondary">{project.client}</p>
            </div>
            <button className="text-sun-muted hover:text-sun-primary">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="flex items-center gap-6 text-xs text-sun-tertiary mb-6">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              <span>Current Phase: {project.phase}</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-sun-muted font-medium">Progress</span>
              <span className="text-sun-primary font-bold">{project.progress}%</span>
            </div>
            <div className="h-2 w-full bg-sun-bg rounded-full overflow-hidden">
              <div 
                className="h-full bg-sun-primary transition-all duration-500 ease-out" 
                style={{ width: `${project.progress}%` }} 
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
