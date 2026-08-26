import React from 'react';
import { Quote, Sparkles, MessageSquare, Star } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/portfolioData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-dot-pattern">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] dark:bg-white/[0.04] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 text-xs font-mono-code text-amber-400 dark:text-amber-400 light:text-amber-600 mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>ENDORSEMENTS & COLLABORATIONS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            What Collaborators Say
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-xl">
            Reflections from hackathon mentors, design directors, and student engineering peers.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              id={`testimonial-${t.id}`}
              className="p-8 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 flex flex-col justify-between hover:border-amber-400/40 hover:shadow-xl transition-all duration-300 relative group"
            >
              <div>
                <Quote className="w-8 h-8 text-amber-400/30 group-hover:text-amber-400 transition-colors mb-4" />

                <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-200 light:text-slate-800 leading-relaxed italic mb-6">
                  "{t.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-white/5 dark:border-white/5 light:border-slate-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-amber-400/30"
                />
                <div>
                  <h3 className="font-display font-bold text-sm text-slate-100 dark:text-slate-100 light:text-slate-900">
                    {t.name}
                  </h3>
                  <div className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500">
                    {t.role} • {t.organization}
                  </div>
                  <div className="text-[10px] text-amber-400 font-mono-code mt-0.5">
                    {t.relationship}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
