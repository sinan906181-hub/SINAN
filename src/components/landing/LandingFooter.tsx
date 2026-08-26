import React, { useState } from 'react';
import { Sparkles, ArrowRight, Github, Twitter, Linkedin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const LandingFooter: React.FC = () => {
  const { showSuccess } = useToast();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showSuccess('Subscribed to Nexora Engineering Digest', 'You will receive monthly architectural case studies.');
    setEmail('');
  };

  return (
    <footer className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#05080e] text-slate-400">
      <div className="max-w-7xl mx-auto">
        {/* Top Newsletter Grid */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-cyan-950/40 border border-white/10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-lg space-y-2 text-center lg:text-left">
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              Stay ahead in Autonomous AI & Cloud.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Join 45,000+ engineers receiving our bi-weekly deep dives on LLM systems, latency optimizations, and cloud architecture.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shrink-0 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5">
                <div className="w-full h-full bg-[#05080e] rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-display font-black text-lg text-white">NEXORA</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The unified cloud operating system combining autonomous AI agents, enterprise project telemetry, and zero-trust cloud governance.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono-code">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All 42 Global Edge Clusters Operational (99.99%)</span>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono-code uppercase text-white tracking-wider">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">AI Copilot Engine</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Edge Cloud Mesh</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Kanban Workspaces</a></li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">Zero-Trust RBAC</a></li>
              <li><a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing & Plans</a></li>
            </ul>
          </div>

          {/* Column 2: Developers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono-code uppercase text-white tracking-wider">Developers</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">OpenAPI 3.0 Specs</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">TypeScript SDK</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">GitHub Actions</a></li>
              <li><a href="#faq" className="hover:text-cyan-400 transition-colors">Architecture FAQ</a></li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">System Benchmarks</a></li>
            </ul>
          </div>

          {/* Column 3: Trust & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono-code uppercase text-white tracking-wider">Compliance</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">SOC2 Type II Report</a></li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">GDPR & DPA</a></li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">Zero-Data AI Pledge</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Security Incident Log</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NEXORA Technologies, Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built with React 19, TypeScript, Firestore & Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
