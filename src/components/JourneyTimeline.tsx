import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  GraduationCap,
  Briefcase,
  Layers,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { JOURNEY_DATA } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

export const JourneyTimeline: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  return (
    <section id="journey" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-grid-pattern">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] dark:bg-white/[0.04] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 text-xs font-mono-code text-amber-400 dark:text-amber-400 light:text-amber-600 mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>CHRONOLOGICAL EVOLUTION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            The Journey So Far
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-xl">
            From discovering code and creative media to building full-scale web platforms and generative AI tools.
          </p>
        </div>

        {/* Timeline Stream */}
        <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-3 sm:before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-amber-400/40 before:to-transparent">
          {JOURNEY_DATA.map((item, idx) => (
            <div
              key={item.year + item.title}
              id={`journey-node-${item.year}`}
              className="relative group"
            >
              {/* Timeline Node Icon Indicator */}
              <div className="absolute -left-6 sm:-left-10 top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#090a0f] border-2 border-amber-400 flex items-center justify-center text-amber-400 group-hover:scale-125 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all duration-300 shadow-md shadow-amber-400/20">
                <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:bg-slate-950" />
              </div>

              {/* Timeline Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-amber-400/40 transition-all duration-300 group-hover:shadow-2xl">
                {/* Year & Organization Pill */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-black text-2xl sm:text-3xl text-amber-400">
                      {item.year}
                    </span>
                    <span className="text-xs font-mono-code px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {item.category}
                    </span>
                  </div>

                  <span className="text-xs font-mono-code text-slate-400">
                    {item.organization}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="font-display font-bold text-lg sm:text-xl text-slate-100 dark:text-slate-100 light:text-slate-900 mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Highlight Badge */}
                {item.highlight && (
                  <div className="p-3 rounded-xl bg-amber-400/[0.06] border border-amber-400/20 text-xs text-amber-300 font-medium mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{item.highlight}</span>
                  </div>
                )}

                {/* Skills Acquired Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/5 dark:border-white/5 light:border-slate-100">
                  <span className="text-[10px] font-mono-code uppercase tracking-wider text-slate-500 mr-1">
                    Key Focus:
                  </span>
                  {item.skillsLearned.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono-code px-2 py-0.5 rounded-md bg-white/5 text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
