import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TestimonialItem } from '../../types';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: TestimonialItem[] = [
    {
      id: 'test-1',
      name: 'Dr. Aris Thorne',
      role: 'VP of Distributed Systems',
      company: 'Apex Cloud Technologies',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      quote: 'Nexora fundamentally replaced 4 separate subscription tools for our 80-person engineering team. The sub-50ms AI copilot and real-time Firestore sync enabled us to ship our quantum cloud SDK 3 months ahead of target.',
      metrics: '340% sprint velocity increase'
    },
    {
      id: 'test-2',
      name: 'Maya Lin',
      role: 'Head of Developer Experience',
      company: 'Synthetix AI Labs',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      quote: 'The autonomous AI pipeline with deterministic vector indexing is the real deal. Our engineers spend less time writing boilerplate and more time solving hard architectural problems.',
      metrics: '42 hrs/developer saved per month'
    },
    {
      id: 'test-3',
      name: 'Darius Vance',
      role: 'Chief Information Security Officer',
      company: 'Fortress FinTech Group',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      quote: 'SOC2 Type II compliance and zero data retention for AI models were our strict prerequisites. Nexora’s Zero-Trust IAM architecture passed our rigorous penetration testing with flying colors.',
      metrics: '100% security audit score'
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-dot-pattern">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono-code uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 fill-cyan-400" />
            <span>Proven Engineering Impact</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white dark:text-white light:text-slate-900 tracking-tight">
            Trusted by architects shipping mission-critical software.
          </h2>
          <p className="mt-4 text-slate-300 dark:text-slate-300 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            See how high-performing teams streamline their full-stack engineering lifecycle with Nexora.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-cyan-400/40 transition-all shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white dark:text-white light:text-slate-900">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {item.role}, <span className="text-cyan-400">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
