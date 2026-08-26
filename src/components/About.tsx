import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

interface AboutProps {
  onOpenResume: () => void;
  onConnect: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume, onConnect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });

  // Word-by-word headline statement
  const statement = 'I BUILD DIGITAL EXPERIENCES THAT PEOPLE REMEMBER.';
  const words = statement.split(' ');

  const creativeDisciplines = [
    { name: 'UI / UX & Product Design', highlight: 'Figma • Wireframing • Design Systems' },
    { name: 'Full-Stack Development', highlight: 'React 19 • Next.js • TypeScript • Tailwind' },
    { name: 'Cinematic Video & Motion', highlight: 'DaVinci Resolve • Premiere • CapCut' },
    { name: 'AI & Automation Solutions', highlight: 'Gemini Models • Workflow Integrations' },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 sm:py-36 px-4 sm:px-6 lg:px-12 relative bg-[#07080c] text-white overflow-hidden border-t border-white/[0.08]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-[550px] h-[550px] bg-[#a3e635]/5 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#bef264]/4 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Top Header Tag & Full Profile Link */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-12 sm:mb-16">
          <div className="flex items-center gap-2.5 font-mono-code text-xs sm:text-sm text-white/50 tracking-wider">
            <span className="text-[#a3e635] font-bold">#02</span>
            <span>//</span>
            <span className="uppercase tracking-widest text-white/80">ABOUT</span>
          </div>

          <button
            id="about-full-profile-btn"
            onClick={() => {
              soundManager.playPop();
              onOpenResume();
            }}
            className="group flex items-center gap-1.5 font-mono-code text-xs sm:text-sm text-white/70 hover:text-[#a3e635] transition-colors tracking-widest uppercase cursor-pointer"
            data-cursor="button"
          >
            <span>FULL DOSSIER</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#a3e635]" />
          </button>
        </div>

        {/* Section 07 Dramatic Statement: Word-by-Word Reveal */}
        <div className="mb-16 sm:mb-24 max-w-5xl">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] text-white flex flex-wrap gap-x-3.5 sm:gap-x-5 gap-y-2">
            {words.map((word, index) => {
              const isAccent = word === 'DIGITAL' || word === 'REMEMBER.' || word === 'EXPERIENCES';
              return (
                <motion.span
                  key={`word-${index}`}
                  initial={{ opacity: 0.15, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.15, y: 15 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block select-none ${
                    isAccent
                      ? 'text-[#a3e635] drop-shadow-[0_0_20px_rgba(163,230,53,0.3)]'
                      : 'text-white'
                  }`}
                >
                  {word}
                </motion.span>
              );
            })}
          </h2>
        </div>

        {/* 2-Column Editorial Storyboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Personal Narrative & Philosophy */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-6 text-white/80 text-base sm:text-lg md:text-xl leading-relaxed font-normal">
              <p>
                I am <strong className="text-white font-bold">Hafiz Muhammed Sinan K</strong>, a creative developer and digital storyteller based in <span className="text-[#a3e635] font-semibold">Malappuram, Kerala</span>.
              </p>
              <p className="text-white/65 text-sm sm:text-base leading-relaxed">
                I bridge the gap between high-concept visual aesthetics and high-performance frontend architecture. Every line of code and every micro-interaction is engineered to feel weightless, tactile, and unforgettable.
              </p>
              <p className="text-white/65 text-sm sm:text-base leading-relaxed">
                Whether creating bespoke web platforms like the <span className="text-white underline decoration-[#a3e635]/60 underline-offset-4 font-semibold">Sadad Class Union</span> portal, crafting cinematic content on YouTube, or developing AI-assisted interfaces, I build experiences tailored for genuine growth.
              </p>
            </div>

            {/* Read More / Resume Action */}
            <div className="pt-4 flex items-center gap-4">
              <button
                id="about-read-more-btn"
                onClick={() => {
                  soundManager.playClick();
                  onOpenResume();
                }}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#a3e635] hover:bg-[#bef264] text-slate-950 font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#a3e635]/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                data-cursor="button"
              >
                <span>EXPLORE CREDENTIALS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onConnect();
                }}
                className="px-5 py-3 rounded-xl border border-white/15 hover:border-[#a3e635] hover:text-[#a3e635] font-mono-code text-xs sm:text-sm uppercase tracking-wider text-white/80 transition-colors cursor-pointer"
                data-cursor="button"
              >
                GET IN TOUCH
              </button>
            </div>
          </div>

          {/* Right Column: Key Stats & Disciplines Matrix */}
          <div className="lg:col-span-6 space-y-10 lg:pl-4">
            {/* 3 Metric Badges */}
            <div className="grid grid-cols-3 gap-4 border-b border-white/[0.08] pb-10">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#a3e635] tracking-tight">
                  20+
                </div>
                <div className="font-mono-code text-[10px] sm:text-xs text-white/50 tracking-wider uppercase mt-1">
                  PROJECTS
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#a3e635] tracking-tight">
                  30+
                </div>
                <div className="font-mono-code text-[10px] sm:text-xs text-white/50 tracking-wider uppercase mt-1">
                  CLIENTS
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#a3e635] tracking-tight">
                  100%
                </div>
                <div className="font-mono-code text-[10px] sm:text-xs text-white/50 tracking-wider uppercase mt-1">
                  SATISFACTION
                </div>
              </div>
            </div>

            {/* Core Disciplines List */}
            <div className="space-y-3">
              <div className="text-xs font-mono-code text-[#a3e635] uppercase tracking-widest mb-4">
                CORE CAPABILITIES //
              </div>
              {creativeDisciplines.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-[#a3e635]/40 transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="font-display font-bold text-sm sm:text-base text-white group-hover:text-[#a3e635] transition-colors">
                      {item.name}
                    </div>
                    <div className="text-xs font-mono-code text-white/50">
                      {item.highlight}
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 text-white/20 group-hover:text-[#a3e635] group-hover:scale-110 transition-all shrink-0 ml-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
