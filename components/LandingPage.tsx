
import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { supabase } from '../services/supabase';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
      setLoading(true);
      // Anonymous auth allows immediate usage. 
      // In production, you might want strict email signup here.
      const { error } = await supabase.auth.signInAnonymously();
      if (error) {
          console.error("Auth error", error);
          alert("Could not start session. Please try again.");
          setLoading(false);
      } else {
          onStart();
      }
  };

  return (
    <div className="min-h-screen bg-sun-bg flex flex-col font-sans">
      {/* Nav */}
      <nav className="border-b border-sun-border bg-white/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-serif text-xl font-bold tracking-tight text-sun-primary">
            Sun AI Agency
          </div>
          <div className="flex gap-4">
            <button onClick={handleLogin} className="text-sm font-medium text-sun-secondary hover:text-sun-primary transition-colors">
                Sign In
            </button>
            <Button onClick={handleLogin} className="h-9 text-xs">
                {loading ? <Loader2 className="animate-spin" size={14} /> : 'Get Started'}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1">
        <section className="pt-24 pb-16 px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <div className="inline-flex items-center gap-2 bg-sun-right border border-sun-border px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-sun-accent animate-fade-in">
                    <Sparkles size={12} /> AI-Powered Consultancy
                </div>
                <h1 className="font-serif text-5xl md:text-7xl text-sun-primary leading-[1.1] animate-fade-in" style={{ animationDelay: '100ms' }}>
                    Automate your growth with <span className="italic text-sun-tertiary">precision.</span>
                </h1>
                <p className="text-xl text-sun-secondary max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
                    The first consultancy platform that uses autonomous AI agents to research, diagnose, and architect your business automation strategy.
                </p>
                <div className="flex justify-center gap-4 pt-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
                    <Button onClick={handleLogin} className="h-14 px-8 text-base" disabled={loading}>
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="animate-spin" size={20} /> Starting Session...
                            </div>
                        ) : (
                            <>Start Free Audit <ArrowRight size={18} className="ml-2" /></>
                        )}
                    </Button>
                </div>
            </div>
        </section>

        {/* Features */}
        <section className="py-20 border-t border-sun-border bg-white">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-4">
                    <div className="w-12 h-12 bg-sun-bg rounded-sm flex items-center justify-center text-sun-primary border border-sun-border">
                        <ShieldCheck size={24} />
                    </div>
                    <h3 className="font-serif text-xl text-sun-primary">Context-Aware Analysis</h3>
                    <p className="text-sun-secondary leading-relaxed">
                        Our Analyst Agent researches your business in real-time, verifying your market position before we even ask a question.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="w-12 h-12 bg-sun-bg rounded-sm flex items-center justify-center text-sun-primary border border-sun-border">
                        <Zap size={24} />
                    </div>
                    <h3 className="font-serif text-xl text-sun-primary">Instant Strategy</h3>
                    <p className="text-sun-secondary leading-relaxed">
                        Skip the 4-week consulting engagement. Get a bespoke 90-day execution roadmap generated in under 60 seconds.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="w-12 h-12 bg-sun-bg rounded-sm flex items-center justify-center text-sun-primary border border-sun-border">
                        <Sparkles size={24} />
                    </div>
                    <h3 className="font-serif text-xl text-sun-primary">Execution Ready</h3>
                    <p className="text-sun-secondary leading-relaxed">
                        Don't just get a plan. Get an active dashboard where AI agents help you draft emails, manage tasks, and track ROI.
                    </p>
                </div>
            </div>
        </section>
      </main>

      <footer className="border-t border-sun-border py-12 bg-sun-bg">
          <div className="max-w-7xl mx-auto px-6 text-center text-xs text-sun-muted uppercase tracking-widest">
              © 2025 Sun AI Agency. Built on Gemini 3.
          </div>
      </footer>
    </div>
  );
};
