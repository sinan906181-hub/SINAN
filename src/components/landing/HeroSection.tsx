import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Bot, 
  Cpu, 
  Activity, 
  Layers, 
  Database,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeroSectionProps {
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onGoToDashboard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAuth,
  onGoToDashboard,
}) => {
  const { userProfile } = useAuth();

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col justify-center">
      {/* Background Gradients & Glow Circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-indigo-600/20 via-violet-600/15 to-cyan-400/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full text-center">
        {/* Top Feature Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] dark:bg-white/[0.04] light:bg-slate-100 border border-white/15 dark:border-white/15 light:border-slate-200 backdrop-blur-md shadow-inner text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-8"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span>NEXORA v3.0 Intelligence Suite Now Live</span>
          <span className="text-cyan-400 flex items-center gap-0.5">
            Explore <ArrowRight className="w-3 h-3" />
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white dark:text-white light:text-slate-900 leading-[1.08] max-w-5xl mx-auto"
        >
          The Intelligent Operating System for{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-400">
            Next-Gen Teams.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-3xl mx-auto leading-relaxed"
        >
          Unify autonomous AI agents, enterprise project telemetry, cloud orchestration, and real-time collaborative pipelines in one seamless glassmorphic workspace.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {userProfile ? (
            <button
              onClick={onGoToDashboard}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-600 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Launch Nexora Workspace</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-600 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
              >
                <Zap className="w-5 h-5 text-slate-950" />
                <span>Start Free 14-Day Trial</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => onOpenAuth('login')}
                className="px-7 py-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] dark:bg-white/[0.06] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-800 font-bold text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                <span>Live Interactive Demo</span>
              </button>
            </>
          )}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-medium"
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>SOC2 Type II & GDPR Ready</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Sub-50ms Global Query Latency</span>
          </div>
        </motion.div>

        {/* Hero Interactive UI Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-14 relative max-w-5xl mx-auto rounded-3xl p-1.5 bg-gradient-to-b from-white/20 via-white/5 to-transparent border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden"
        >
          <div className="rounded-[22px] bg-[#0c1018] border border-white/10 overflow-hidden text-left shadow-2xl">
            {/* Window Topbar */}
            <div className="px-4 py-3 bg-[#080b11] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono-code text-slate-400">nexora.cloud/workspace/quantum-core</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono-code text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Cluster: Healthy
                </span>
              </div>
            </div>

            {/* Mockup Dashboard Grid */}
            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left Column: Quick Stats & AI Stream */}
              <div className="lg:col-span-8 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] uppercase font-mono-code text-slate-400">Active Workloads</span>
                    <p className="text-xl font-bold font-display text-white mt-1">42 Clusters</p>
                    <span className="text-[10px] text-emerald-400 font-semibold">↑ 18% this week</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] uppercase font-mono-code text-slate-400">AI Synthesized</span>
                    <p className="text-xl font-bold font-display text-cyan-400 mt-1">1.8M Tokens</p>
                    <span className="text-[10px] text-cyan-400 font-semibold">44ms avg response</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] uppercase font-mono-code text-slate-400">Pipeline Health</span>
                    <p className="text-xl font-bold font-display text-emerald-400 mt-1">99.98%</p>
                    <span className="text-[10px] text-slate-400">Zero downtime</span>
                  </div>
                </div>

                {/* AI Assistant Simulated Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-purple-950/40 border border-indigo-500/30 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/40 border border-indigo-400/40 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-200">Nexora Copilot (Autonomous Mode)</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 font-mono-code">AI Agent</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "I've optimized your vector queries across 4 shards, resulting in <strong>3.4x faster</strong> retrieval and an estimated <strong>$1,240/mo</strong> cloud compute reduction."
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Mini Project Progress & Velocity */}
              <div className="lg:col-span-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-200">Sprint 14 Velocity</span>
                    <span className="text-[10px] font-mono-code text-emerald-400">+34%</span>
                  </div>
                  <div className="space-y-2.5">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>Vector Search Engine</span>
                        <span className="text-cyan-400">84%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full w-[84%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>Edge Deployment</span>
                        <span className="text-emerald-400">92%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full w-[92%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onGoToDashboard}
                  className="mt-4 w-full py-2 rounded-xl bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 text-xs font-bold text-cyan-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Open Full Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
