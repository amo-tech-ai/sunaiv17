
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles, User } from 'lucide-react';
import { supabase } from '../services/supabase';
import { Button } from './Button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const GlobalChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello. I am your Agency Assistant. I have access to your project context. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      // Call the assistant edge function
      const { data, error } = await supabase.functions.invoke('assistant', {
        body: { 
            task: 'general_chat',
            content: userMsg,
            history: messages.slice(-5) // Send last 5 messages for context
        }
      });

      if (error) throw error;

      const reply = data?.summary || data?.text || "I'm processing that request but didn't get a clear response. Could you rephrase?";
      
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, { role: 'assistant', content: "I apologize, but I'm having trouble connecting to the intelligence grid right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white border border-sun-border rounded-sm shadow-xl flex flex-col animate-fade-in overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-sun-primary text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-sun-accent" />
              <span className="font-serif font-medium">Agency Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-sun-bg/30">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${msg.role === 'assistant' ? 'bg-white border-sun-border text-sun-accent' : 'bg-sun-primary border-sun-primary text-white'}`}>
                  {msg.role === 'assistant' ? <Sparkles size={14} /> : <User size={14} />}
                </div>
                <div className={`p-3 rounded-sm text-sm max-w-[80%] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-sun-primary text-white' : 'bg-white border border-sun-border text-sun-secondary'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white border border-sun-border text-sun-accent flex items-center justify-center shrink-0">
                  <Loader2 size={14} className="animate-spin" />
                </div>
                <div className="p-3 bg-white border border-sun-border rounded-sm text-xs text-sun-muted italic">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-sun-border bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your strategy..."
              className="flex-1 bg-sun-bg border border-sun-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-sun-primary transition-colors"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || loading}
              className="p-2 bg-sun-primary text-white rounded-sm hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${isOpen ? 'bg-sun-secondary text-white' : 'bg-sun-primary text-sun-accent'}`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};
