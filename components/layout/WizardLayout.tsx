
import React from 'react';

interface WizardLayoutProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  children: React.ReactNode;
  isTransitioning: boolean;
}

export const WizardLayout: React.FC<WizardLayoutProps> = ({
  leftPanel,
  rightPanel,
  children,
  isTransitioning
}) => {
  return (
    <div className={`min-h-screen w-full flex flex-col md:flex-row bg-sun-bg transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
      
      {/* Left Panel - Sticky */}
      <aside className="w-full md:w-[20%] md:h-screen md:sticky md:top-0 border-r border-sun-border bg-sun-bg z-10 overflow-hidden hidden md:block">
        {leftPanel}
      </aside>

      {/* Center Panel - Scrollable */}
      <main className="w-full md:w-[50%] min-h-screen flex flex-col">
        {children}
      </main>

      {/* Right Panel - Sticky */}
      <aside className="hidden md:block w-full md:w-[30%] md:h-screen md:sticky md:top-0 bg-sun-right overflow-hidden border-l border-sun-border">
        {rightPanel}
      </aside>
    </div>
  );
};
