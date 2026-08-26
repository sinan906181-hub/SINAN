import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  HelpCircle 
} from 'lucide-react';
import { PricingPlan } from '../../types';

interface PricingSectionProps {
  onSelectPlan: (planId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter Developer',
      tagline: 'Ideal for individual builders, freelancers, and early prototypes.',
      priceMonthly: 19,
      priceYearly: 14,
      popular: false,
      highlight: 'Up to 3 active projects',
      features: [
        '3 Active Projects with real-time sync',
        '50,000 AI tokens / month',
        'Standard Edge Compute Nodes',
        'Email support (24h SLA)',
        '1GB Encrypted Asset Storage',
        'Community Discord Access'
      ],
      ctaText: 'Start 14-Day Trial'
    },
    {
      id: 'pro',
      name: 'Pro Team & Scale',
      tagline: 'For fast-growing engineering teams and high-traffic applications.',
      priceMonthly: 49,
      priceYearly: 36,
      popular: true,
      highlight: 'Unlimited projects & AI Copilot',
      features: [
        'Unlimited Active Projects & Workspaces',
        '1,000,000 AI tokens / month (Gemini & Claude)',
        'Sub-50ms Global Edge Compute Mesh',
        'Automated CI/CD & GitHub Integrations',
        'Priority 24/7 Slack & Video Support',
        '50GB Encrypted Asset Storage',
        'Team Velocity & Analytics Dashboard',
        'Custom Webhooks & OpenAPI Gateway'
      ],
      ctaText: 'Get Pro Workspace'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Sovereign',
      tagline: 'Custom security, dedicated VPC instances, and guaranteed SLAs.',
      priceMonthly: 199,
      priceYearly: 149,
      popular: false,
      highlight: 'Dedicated VPC & 99.99% SLA',
      features: [
        'Dedicated Private VPC Cloud Hosting',
        'Unlimited AI Tokens with Zero Data Retention',
        'Biometric Passkeys & SOC2 Type II Audit Trails',
        'Custom SSO & Okta / Active Directory Integration',
        'Dedicated Solutions Architect & 15-min SLA',
        'Custom SLA guarantees (99.99%)',
        'Unlimited Storage & Bandwidth',
        'Custom On-Premises Migration Assistance'
      ],
      ctaText: 'Contact Enterprise'
    }
  ];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#060910]/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono-code uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white dark:text-white light:text-slate-900 tracking-tight">
            Predictable plans that scale with your velocity.
          </h2>
          <p className="mt-4 text-slate-300 dark:text-slate-300 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            All plans include a 14-day risk-free trial. Cancel or change your subscription at any time with zero penalty.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-white/[0.05] dark:bg-white/[0.05] light:bg-slate-200 border border-white/10 dark:border-white/10 light:border-slate-300">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-400/20 text-emerald-300 font-extrabold uppercase">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`relative p-8 rounded-3xl flex flex-col justify-between transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-b from-indigo-950/80 via-[#0d1322] to-[#090d16] border-2 border-cyan-400/60 shadow-[0_15px_60px_rgba(6,182,212,0.25)] scale-105 z-10'
                    : 'bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 text-slate-950 font-black text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="font-display font-black text-2xl text-white dark:text-white light:text-slate-900">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-1">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className="my-6 flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-display font-black text-white dark:text-white light:text-slate-900">
                      ${price}
                    </span>
                    <span className="text-xs font-mono-code text-slate-400">/ user / month</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.04] dark:bg-white/[0.04] light:bg-slate-100 border border-white/5 text-xs font-semibold text-cyan-300 dark:text-cyan-300 light:text-indigo-600 mb-6">
                    ⚡ {plan.highlight}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] uppercase font-mono-code font-bold text-slate-400 block tracking-wider">
                      Included in this plan:
                    </span>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-cyan-400/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-cyan-300" />
                        </div>
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectPlan(plan.id)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-500 via-violet-600 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02]'
                      : 'bg-white/[0.06] hover:bg-white/[0.12] dark:bg-white/[0.06] light:bg-slate-900 text-white dark:text-white light:text-white border border-white/10 hover:border-cyan-400/40'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
