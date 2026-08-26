import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Activity, 
  Database, 
  Globe2, 
  Lock, 
  BarChart3, 
  ArrowRight,
  Code2,
  Workflow,
  Sparkles
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai' | 'cloud' | 'security' | 'telemetry'>('ai');

  const mainFeatures = [
    {
      id: 'ai',
      label: 'Autonomous AI',
      icon: <Bot className="w-4 h-4" />,
      title: 'Context-Aware AI Assistants & Autonomous Pipelines',
      description: 'Streamline research, architecture analysis, and multi-model LLM workflows with deep codebase indexing and intelligent code synthesis.',
      points: [
        'Multi-vector semantic search across all files & docs',
        'Autonomous PR refactoring and test generation',
        'Real-time streaming responses with sub-50ms latency',
        'Custom fine-tuned domain models with Zero-Data retention'
      ],
      badge: 'Gemini & Claude 3.7 Powered',
      color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400'
    },
    {
      id: 'cloud',
      label: 'Cloud Mesh',
      icon: <Globe2 className="w-4 h-4" />,
      title: 'Decentralized Edge Orchestration & Microservices',
      description: 'Deploy distributed serverless workloads across 42 global regions with automated health replication and geo-routing.',
      points: [
        'One-click container deployments on global edge nodes',
        'Dynamic auto-scaling from 0 to 100,000 req/sec',
        'Instant multi-region database failover replication',
        'Integrated SSL certificates & DNS health routing'
      ],
      badge: '42 Global Edge Regions',
      color: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-400'
    },
    {
      id: 'security',
      label: 'Zero-Trust IAM',
      icon: <ShieldCheck className="w-4 h-4" />,
      title: 'Enterprise Grade Governance, SOC2 & Passkeys',
      description: 'Protect sensitive assets with biometric WebAuthn credentials, granular RBAC permissions, and real-time immutable audit trails.',
      points: [
        'SOC2 Type II, HIPAA, and GDPR compliance ready',
        'Hardware security key & Biometric Passkey support',
        'Fine-grained role elevation and token expiration policies',
        'Automated real-time anomaly detection and IP geofencing'
      ],
      badge: 'SOC2 Type II Certified',
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400'
    },
    {
      id: 'telemetry',
      label: 'Deep Telemetry',
      icon: <BarChart3 className="w-4 h-4" />,
      title: 'Full-Stack Observability & Sprint Analytics',
      description: 'Track team velocity, API bottlenecks, compute cost trends, and task dependencies with high-precision real-time dashboards.',
      points: [
        'Continuous performance tracing and memory leak alerts',
        'Sprint burn-down predictions with ML confidence scoring',
        'Live cost attribution per microservice & database query',
        'Custom scheduled PDF & Slack executive digests'
      ],
      badge: 'Microsecond Precision',
      color: 'from-amber-500/20 to-rose-500/20 border-amber-500/30 text-amber-400'
    }
  ];

  const gridCards = [
    {
      icon: <Layers className="w-6 h-6 text-indigo-400" />,
      title: 'Modular Workspaces',
      desc: 'Organize teams, cross-functional sprints, and confidential clients in segregated micro-workspaces with instant switching.'
    },
    {
      icon: <Database className="w-6 h-6 text-cyan-400" />,
      title: 'Real-time Firestore Sync',
      desc: 'Collaborative real-time state with offline persistence, conflict-free syncing, and sub-millisecond local caching.'
    },
    {
      icon: <Workflow className="w-6 h-6 text-emerald-400" />,
      title: 'Automated CI/CD Triggers',
      desc: 'Link GitHub, GitLab, or webhooks to trigger instantaneous build pipelines and test suites automatically.'
    },
    {
      icon: <Code2 className="w-6 h-6 text-violet-400" />,
      title: 'SDK & Rest API Gateway',
      desc: 'Programmatically trigger AI prompts, query project statistics, or manage users via robust OpenAPI 3.0 endpoints.'
    },
    {
      icon: <Lock className="w-6 h-6 text-rose-400" />,
      title: 'End-to-End Encryption',
      desc: 'Every file, AI prompt, and telemetry log is encrypted in transit and at rest using military-grade AES-256 GCM.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: 'Predictive Insights',
      desc: 'Proactive AI recommendations flag potential delay bottlenecks before they impact your team’s release roadmap.'
    }
  ];

  const currentFeature = mainFeatures.find((f) => f.id === activeTab) || mainFeatures[0];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-dot-pattern">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono-code uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architecture & Capabilities</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white dark:text-white light:text-slate-900 tracking-tight">
            Engineered for High-Velocity Modern Engineering.
          </h2>
          <p className="mt-4 text-slate-300 dark:text-slate-300 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Eliminate fragmented tools. Nexora combines AI agents, task coordination, cloud analytics, and enterprise security under one high-performance roof.
          </p>
        </div>

        {/* Interactive Feature Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {mainFeatures.map((feat) => {
            const isActive = activeTab === feat.id;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveTab(feat.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white/10 dark:bg-white/10 light:bg-indigo-600 text-cyan-300 dark:text-cyan-300 light:text-white border border-cyan-400/40 shadow-lg shadow-cyan-500/10'
                    : 'bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-100 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {feat.icon}
                <span>{feat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Feature Showcase Glass Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeature.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className={`p-6 sm:p-10 rounded-3xl bg-gradient-to-br ${currentFeature.color} bg-black/60 dark:bg-black/60 light:bg-white backdrop-blur-2xl border shadow-2xl mb-16`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-block px-3 py-1 rounded-md bg-white/10 border border-white/20 text-xs font-mono-code font-bold text-white uppercase">
                  {currentFeature.badge}
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white dark:text-white light:text-slate-900">
                  {currentFeature.title}
                </h3>
                <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 text-sm sm:text-base leading-relaxed">
                  {currentFeature.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {currentFeature.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-cyan-400/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Zap className="w-3 h-3 text-cyan-300" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-200 dark:text-slate-200 light:text-slate-700">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Preview Box */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0a0e17]/90 border border-white/10 shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono-code text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    LIVE RUNTIME TELEMETRY
                  </span>
                  <span className="text-emerald-400 font-bold">● ACTIVE</span>
                </div>

                <div className="py-4 space-y-3 font-mono-code text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Average Token Throughput:</span>
                    <span className="text-cyan-400 font-bold">142 tok/sec</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Vector Query Search Latency:</span>
                    <span className="text-emerald-400 font-bold">18.4 ms</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Global CDN Cache Hit Ratio:</span>
                    <span className="text-indigo-300 font-bold">99.4%</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Zero-Trust Auth Verifications:</span>
                    <span className="text-amber-400 font-bold">100% Passed</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 text-[11px] text-slate-400 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Autonomous scheduler actively optimizing memory allocation</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 6-Grid Feature Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridCards.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-cyan-400/40 transition-all hover:-translate-y-1 hover:shadow-xl group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/[0.05] dark:bg-white/[0.05] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-white dark:text-white light:text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
