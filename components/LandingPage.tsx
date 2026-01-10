
import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Loader2, LayoutGrid, Terminal, BookOpen } from 'lucide-react';
import { Button } from './Button';
import { supabase } from '../services/supabase';

interface LandingPageProps {
  onDevLogin: (role: 'client' | 'agency') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onDevLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (role: 'client' | 'agency') => {
      setLoading(true);
      // Simulate network delay for effect
      setTimeout(() => {
          onDevLogin(role);
          setLoading(false);
      }, 800);
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
            <button onClick={() => handleLogin('agency')} className="text-sm font-medium text-sun-secondary hover:text-sun-primary transition-colors">
                Sign In
            </button>
            <Button onClick={() => handleLogin('agency')} className="h-9 text-xs">
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
                    <Button onClick={() => handleLogin('agency')} className="h-14 px-8 text-base" disabled={loading}>
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

      {/* Footer */}
      <footer className="bg-sun-primary text-sun-border py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div>
                <div className="font-serif text-2xl font-bold text-white tracking-tight mb-2">Sun AI Agency</div>
                <p className="text-sm opacity-60 leading-relaxed max-w-xs">
                Architecting the autonomous enterprise with Gemini 3.0.
                </p>
            </div>
            <div className="flex gap-4">
                {/* Social Placeholders */}
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-sun-accent hover:text-white transition-colors cursor-pointer">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-sun-accent hover:text-white transition-colors cursor-pointer">
                    <span className="sr-only">GitHub</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <button onClick={() => handleLogin('agency')} className="flex items-center gap-2 hover:text-sun-accent transition-colors text-left group">
                  <Terminal size={14} className="text-sun-tertiary group-hover:text-sun-accent transition-colors" />
                  <span>Start Wizard</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLogin('client')} className="flex items-center gap-2 hover:text-sun-accent transition-colors text-left group">
                  <LayoutGrid size={14} className="text-sun-tertiary group-hover:text-sun-accent transition-colors" />
                  <span>Client Dashboard</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLogin('agency')} className="flex items-center gap-2 hover:text-sun-accent transition-colors text-left group">
                  <Zap size={14} className="text-sun-tertiary group-hover:text-sun-accent transition-colors" />
                  <span>Agency Login</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-sun-accent transition-colors group">
                    <BookOpen size={14} className="text-sun-tertiary group-hover:text-sun-accent transition-colors" />
                    <span>Documentation</span>
                </a>
              </li>
              <li><a href="#" className="hover:text-sun-accent transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-sun-accent transition-colors">System Status</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-sun-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-sun-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-sun-accent transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs opacity-40 uppercase tracking-widest">
            © 2025 Sun AI Agency. All rights reserved.
          </div>
          <div className="text-xs opacity-40">
            Powered by Google Gemini 3.0
          </div>
        </div>
      </footer>
    </div>
  );
};
