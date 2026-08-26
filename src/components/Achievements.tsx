import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  Trophy,
  GraduationCap,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

export const Achievements: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Academic', 'Hackathon', 'Creative', 'Certification'];

  const filteredAchievements = ACHIEVEMENTS_DATA.filter(
    (a) => selectedCategory === 'All' || a.category === selectedCategory
  );

  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] dark:bg-white/[0.04] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 text-xs font-mono-code text-amber-400 dark:text-amber-400 light:text-amber-600 mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>MILESTONES & HONORS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Verified Achievements
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-xl">
            A testament to academic diligence, hackathon innovation, and impactful digital creations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`ach-cat-${cat.toLowerCase()}`}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAchievements.map((ach) => (
            <div
              key={ach.id}
              id={`achievement-${ach.id}`}
              className="p-6 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-amber-400/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {ach.category === 'Academic' && <GraduationCap className="w-6 h-6" />}
                      {ach.category === 'Hackathon' && <Trophy className="w-6 h-6" />}
                      {ach.category === 'Creative' && <Sparkles className="w-6 h-6" />}
                      {ach.category === 'Certification' && <ShieldCheck className="w-6 h-6" />}
                    </div>

                    <div>
                      <span className="text-[11px] font-mono-code text-slate-400 dark:text-slate-400 light:text-slate-500 block">
                        {ach.issuer}
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-amber-400 transition-colors">
                        {ach.title}
                      </h3>
                    </div>
                  </div>

                  <span className="text-xs font-mono-code text-amber-400 font-bold px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 shrink-0">
                    {ach.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-4">
                  {ach.description}
                </p>
              </div>

              {/* Bottom Badge Verification */}
              <div className="pt-4 border-t border-white/5 dark:border-white/5 light:border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono-code text-emerald-400 font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{ach.badge}</span>
                </div>

                <span className="text-[10px] uppercase font-mono-code tracking-wider text-slate-500">
                  Verified Record
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
