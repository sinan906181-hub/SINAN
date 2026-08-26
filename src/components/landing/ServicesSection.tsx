import React from 'react';
import { motion } from 'motion/react';
import { 
  Bot, 
  Cloud, 
  Workflow, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Cpu, 
  FileCode2,
  ServerCog,
  Network
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenAuth: (mode?: 'login' | 'signup') => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenAuth }) => {
  const services = [
    {
      icon: <Bot className="w-8 h-8 text-cyan-400" />,
      title: 'Autonomous AI Copilots & Agents',
      desc: 'Deploy custom fine-tuned AI assistants directly connected to your documentation, repos, and cloud environments to automate triage, refactoring, and sprint planning.',
      features: ['Multi-model switching', 'Sub-50ms vector query', 'Deterministic code generation', 'Custom prompts library'],
      gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent'
    },
    {
      icon: <Cloud className="w-8 h-8 text-indigo-400" />,
      title: 'Global Serverless Edge Deployments',
      desc: 'Instant containerized pipelines deployed at the edge with automated DNS configuration, global SSL termination, and real-time distributed state caching.',
      features: ['Zero-cold-start compute', '42 regional data centers', 'Automated canary rollouts', 'Built-in DDoS mitigation'],
      gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent'
    },
    {
      icon: <Workflow className="w-8 h-8 text-emerald-400" />,
      title: 'Collaborative Project Governance',
      desc: 'Agile project tracking, dynamic Kanban workflows, milestone predictions, and dependency graphing backed by instant real-time Firestore synchronization.',
      features: ['Real-time team presence', 'Task milestone predictions', 'Custom custom fields', 'Sprint velocity analytics'],
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-rose-400" />,
      title: 'Zero-Trust Security & Continuous Auditing',
      desc: 'Comprehensive enterprise identity management with hardware security passkeys, automated SOC2 compliance evidence generation, and immutable activity logs.',
      features: ['Biometric WebAuthn', 'Role-based access matrix', 'Granular token policies', 'Vulnerability scanning'],
      gradient: 'from-rose-500/20 via-pink-500/10 to-transparent'
    },
    {
      icon: <ServerCog className="w-8 h-8 text-amber-400" />,
      title: 'Dedicated VPC & Hybrid Cloud Hosting',
      desc: 'For enterprise customers requiring complete data isolation, run Nexora within your own AWS, GCP, or Azure Virtual Private Cloud with dedicated hardware.',
      features: ['Single-tenant isolation', 'Bring-Your-Own-Key (BYOK)', 'Custom backup schedules', '24/7 dedicated SRE support'],
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent'
    },
    {
      icon: <Network className="w-8 h-8 text-violet-400" />,
      title: 'Custom API & Webhook Ecosystem',
      desc: 'Integrate Nexora seamlessly with GitHub, Jira, Slack, Datadog, or custom in-house systems with our high-throughput OpenAPI 3.0 interfaces.',
      features: ['Event-driven webhooks', 'Real-time WebSocket feed', 'Typed TypeScript SDK', 'Rate limit management'],
      gradient: 'from-violet-500/20 via-indigo-500/10 to-transparent'
    }
  ];

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-dot-pattern">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono-code uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Solutions & Services</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white dark:text-white light:text-slate-900 tracking-tight">
            Everything your team needs to ship at lightspeed.
          </h2>
          <p className="mt-4 text-slate-300 dark:text-slate-300 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            From autonomous AI assistance to mission-critical global cloud infrastructure, discover our end-to-end capabilities.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`p-7 rounded-3xl bg-gradient-to-b ${srv.gradient} bg-[#0a0e17]/80 dark:bg-[#0a0e17]/80 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-cyan-400/40 transition-all hover:-translate-y-1 shadow-2xl flex flex-col justify-between group`}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/[0.05] dark:bg-white/[0.05] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {srv.icon}
                </div>

                <h3 className="font-display font-bold text-xl text-white dark:text-white light:text-slate-900 mb-3">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-6">
                  {srv.desc}
                </p>

                <div className="space-y-2 mb-6 border-t border-white/5 pt-4">
                  {srv.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700">
                      <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenAuth('signup')}
                className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] dark:bg-white/[0.05] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer group-hover:border-cyan-400/40 group-hover:text-cyan-300"
              >
                <span>Deploy Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
