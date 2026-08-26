import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Globe2, 
  Cpu, 
  ShieldCheck, 
  Award,
  ArrowRight
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const stats = [
    { value: '99.99%', label: 'Cloud Uptime SLA', desc: 'Guaranteed high-availability' },
    { value: '42+', label: 'Global Edge Regions', desc: 'Sub-50ms round-trip latency' },
    { value: '10M+', label: 'AI Operations Daily', desc: 'Scalable model inferencing' },
    { value: '45,000+', label: 'Active Engineers', desc: 'From fast startups to Fortune 500' },
  ];

  const milestones = [
    {
      year: '2024',
      title: 'Nexora Foundation',
      desc: 'Launched the world’s first unified context-aware AI telemetry engine for developer teams.'
    },
    {
      year: '2025',
      title: 'Global Edge Mesh',
      desc: 'Expanded distributed serverless microservices with automated failover across 42 regions.'
    },
    {
      year: '2026',
      title: 'Autonomous Intelligence OS',
      desc: 'Released Nexora v3.0 integrating multi-agent orchestration, Firestore real-time sync, and Zero-Trust RBAC.'
    }
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#070a10]/50">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono-code uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>About NEXORA</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white dark:text-white light:text-slate-900 tracking-tight leading-tight">
              We're building the future of autonomous software engineering.
            </h2>
            <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 text-sm sm:text-base leading-relaxed">
              Nexora was founded by engineers, AI researchers, and cloud architects who were tired of juggling a dozen fragmented tools. We combined project governance, real-time observability, and cutting-edge generative AI models into a singular, lightning-fast workspace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2 text-xs sm:text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Zero-Data Retention for AI</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Open Standards & APIs</span>
              </div>
            </div>
          </div>

          {/* Stats Bento */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {stats.map((st, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 shadow-xl"
              >
                <div className="font-display font-black text-3xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-300">
                  {st.value}
                </div>
                <h4 className="font-bold text-sm text-white dark:text-white light:text-slate-900 mt-2">
                  {st.label}
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-1">
                  {st.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chronological Evolution Milestones */}
        <div className="p-8 rounded-3xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-200">
          <h3 className="font-display font-bold text-xl text-white dark:text-white light:text-slate-900 mb-6 text-center">
            The Nexora Engineering Journey
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="relative p-5 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/5 dark:border-white/5 light:border-slate-200"
              >
                <span className="text-xs font-mono-code font-extrabold text-cyan-400 block mb-2">
                  // {m.year}
                </span>
                <h4 className="font-display font-bold text-base text-slate-100 dark:text-slate-100 light:text-slate-900 mb-1">
                  {m.title}
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
