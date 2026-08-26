import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      category: 'AI & Data Privacy',
      question: 'Does Nexora train on or retain our proprietary code and AI prompts?',
      answer: 'Absolutely not. Nexora enforces strict Zero-Data Retention (ZDR) agreements across all underlying LLM providers (including Gemini and Anthropic). Your code, prompts, vector embeddings, and telemetry stay strictly within your encrypted Firestore and VPC silo.'
    },
    {
      category: 'Architecture',
      question: 'How does the real-time project synchronization work?',
      answer: 'Nexora is powered by a multi-layered distributed reactive engine using Google Cloud Firestore, WebSocket channels, and local IndexedDB state caching. Edits made by teammates reflect within sub-50 milliseconds across all active browser sessions.'
    },
    {
      category: 'Deployment',
      question: 'Can we run Nexora on our own dedicated AWS or Google Cloud VPC?',
      answer: 'Yes! Our Enterprise Sovereign plan supports single-tenant VPC deployments with custom Terraform scripts, Bring-Your-Own-Key (BYOK) encryption, and tailored identity provider (Okta, Azure AD) integration.'
    },
    {
      category: 'Pricing & Trials',
      question: 'What happens when my 14-day free trial ends?',
      answer: 'At the end of the 14 days, you can choose to upgrade to any paid tier (Starter, Pro, or Enterprise) or automatically continue on our free community tier with essential project management features.'
    },
    {
      category: 'Security',
      question: 'What compliance certifications and standards does Nexora hold?',
      answer: 'Nexora is SOC2 Type II certified, GDPR compliant, HIPAA ready, and integrates biometric WebAuthn passkeys along with granular Role-Based Access Control (RBAC) policies.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#070b13]/60">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono-code uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Answered Questions</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white dark:text-white light:text-slate-900 tracking-tight">
            Clear answers to common questions.
          </h2>
          <p className="mt-4 text-slate-300 dark:text-slate-300 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Have a question not answered below? Reach out to our 24/7 engineering solutions team anytime.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono-code uppercase text-cyan-400 font-bold block">
                      // {faq.category}
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white dark:text-white light:text-slate-900">
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`p-2 rounded-xl bg-white/[0.05] text-slate-300 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
