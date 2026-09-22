import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, Code2 } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { usePhotoVisibility } from '../utils/usePhotoVisibility';
import sinanPortraitImage from '../assets/images/regenerated_image_1789091925380.png';

interface HeroProps {
  onExploreWork: () => void;
  onConnect: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onConnect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const { hidePhoto } = usePhotoVisibility();

  // Mouse position coordinates for typography parallax and 3D card tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for silky smooth lag / parallax
  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  // Parallax offsets for typography
  const textParallaxX = useTransform(smoothMouseX, [-400, 400], [-12, 12]);
  const textParallaxY = useTransform(smoothMouseY, [-400, 400], [-8, 8]);
  const sinanParallaxX = useTransform(smoothMouseX, [-400, 400], [-18, 18]);
  const sinanParallaxY = useTransform(smoothMouseY, [-400, 400], [-12, 12]);

  // 3D card tilt values
  const cardRotateX = useTransform(smoothMouseY, [-300, 300], [10, -10]);
  const cardRotateY = useTransform(smoothMouseX, [-300, 300], [-10, 10]);
  const cardGlowOpacity = useTransform(smoothMouseX, [-300, 300], [0.3, 0.8]);

  // Dynamic Typewriter state
  const roles = [
    'Creative Developer',
    'UI/UX Designer',
    'Full-Stack Engineer',
    'Video Editor & Creator',
    'AI Systems Builder',
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    const fullText = roles[roleIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(70);
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(35);
        if (currentText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed, roles]);

  // Handle hero mouse move for parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const firstWord = 'MUHAMMED';
  const secondWord = 'SINAN';

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-12 bg-[#050507] text-white select-none overflow-hidden"
    >
      {/* Background Subtle Ambient Glow & Noise */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(163,230,53,0.06)_0%,rgba(5,5,7,0.85)_60%,#050507_100%)] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#a3e635]/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Step 2 Entrance: Tagline (CRAFTING DIGITAL EXPERIENCES — SINCE 2024) */}
      <div className="max-w-7xl mx-auto w-full pt-1">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2 font-mono-code text-[11px] sm:text-xs text-white/50 tracking-[0.25em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse" />
            <span>CRAFTING DIGITAL EXPERIENCES — SINCE 2024</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono-code text-[#a3e635]/80">
            <span className="px-2 py-0.5 rounded bg-[#a3e635]/10 border border-[#a3e635]/20">
              AVAILABLE FOR WORK 2026
            </span>
          </div>
        </motion.div>
      </div>

      {/* Center Hero Showcase: Big Interactive Typography + Right Profile Composition */}
      <div className="max-w-7xl mx-auto w-full my-auto py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Big Interactive Typography (MUHAMMED / SINAN) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Interactive "MUHAMMED" line */}
            <motion.div
              style={{ x: textParallaxX, y: textParallaxY }}
              className="relative overflow-visible"
            >
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
                animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-black uppercase text-[#a3e635] tracking-tight leading-[0.9] flex flex-wrap drop-shadow-[0_0_25px_rgba(163,230,53,0.2)]"
              >
                {firstWord.split('').map((char, index) => (
                  <motion.span
                    key={`muh-${index}`}
                    whileHover={{
                      y: -6,
                      scale: 1.03,
                      color: '#d4f83a',
                      textShadow: '0 0 25px rgba(212,248,58,0.7)',
                    }}
                    transition={{ type: 'spring', stiffness: 450, damping: 15 }}
                    className="inline-block cursor-default transition-colors"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Interactive "SINAN" line (with slight delay reveal) */}
            <motion.div
              style={{ x: sinanParallaxX, y: sinanParallaxY }}
              className="relative overflow-visible mt-0.5 sm:mt-1"
            >
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
                animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-black uppercase text-[#a3e635] tracking-tight leading-[0.9] flex flex-wrap drop-shadow-[0_0_25px_rgba(163,230,53,0.2)]"
              >
                {secondWord.split('').map((char, index) => (
                  <motion.span
                    key={`sin-${index}`}
                    whileHover={{
                      y: -6,
                      scale: 1.03,
                      color: '#d4f83a',
                      textShadow: '0 0 25px rgba(212,248,58,0.7)',
                    }}
                    transition={{ type: 'spring', stiffness: 450, damping: 15 }}
                    className="inline-block cursor-default transition-colors"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Step 7 Entrance: Subtitle and Dynamic Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 sm:mt-5 flex flex-col gap-2.5"
            >
              <div className="flex items-center gap-2.5 text-xs sm:text-sm md:text-base font-mono-code text-white/90">
                <span className="text-[#a3e635] font-bold text-base">+</span>
                <span>I'm <strong className="text-white font-bold">HAFIZ MUHAMMED SINAN K</strong></span>
              </div>

              <div className="font-mono-code text-xs sm:text-sm text-white/60 flex items-center gap-2">
                <span>Focus:</span>
                <span className="text-[#a3e635] font-semibold bg-[#a3e635]/10 px-2 py-0.5 rounded border border-[#a3e635]/20">
                  {currentText}
                  <span className="inline-block w-1.5 h-3 ml-1 bg-[#a3e635] animate-pulse align-middle" />
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Profile Portrait with 3D Tilt, Glow, and SVG Border Draw */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              ref={imageCardRef}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                perspective: 1000,
                rotateX: cardRotateX,
                rotateY: cardRotateY,
              }}
              className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] aspect-[4/5] rounded-3xl group cursor-pointer"
              data-cursor="image"
              data-cursor-text="VIEW"
            >
              {/* Outer Ambient Neon Green Glow (Intensifies on hover) */}
              <motion.div
                className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#a3e635]/30 via-transparent to-[#bef264]/20 blur-xl transition-opacity duration-500 pointer-events-none opacity-40 group-hover:opacity-100"
              />

              {/* Animated SVG Border Draw (Step 6 Entrance) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
                <motion.rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="24"
                  ry="24"
                  fill="none"
                  stroke="#a3e635"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 1.4, delay: 0.6, ease: 'easeInOut' }}
                  className="group-hover:stroke-[#d4f83a] group-hover:stroke-[2] transition-all"
                />
              </svg>

              {/* Card Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-[#0a0c10] border border-white/10 shadow-2xl">
                {hidePhoto ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#0e1320] via-[#090c14] to-[#040508] overflow-hidden">
                    {/* Subtle blueprint grid pattern background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:22px_22px] pointer-events-none" />

                    {/* Ambient radial lighting glow */}
                    <div className="absolute w-52 h-52 rounded-full bg-[#a3e635]/10 blur-3xl animate-pulse pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-44 h-44 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

                    {/* High-Tech Creative Monogram Badge */}
                    <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-[#121826] to-[#0a0d14] border-2 border-[#a3e635]/40 shadow-2xl shadow-[#a3e635]/20 flex items-center justify-center group-hover:border-[#a3e635] transition-all">
                        <span className="font-display font-black text-4xl sm:text-5xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-[#a3e635]">
                          SK
                        </span>
                        <div className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-[#a3e635] text-slate-950 shadow-md shadow-[#a3e635]/40">
                          <Code2 className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="font-display font-extrabold text-sm sm:text-base text-white tracking-widest uppercase">
                          Hafiz Muhammed Sinan
                        </h4>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/30 text-[10px] font-mono-code text-[#a3e635]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-ping" />
                          <span>ANONYMOUS CREATIVE MODE</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 font-mono-code max-w-[210px] leading-relaxed">
                        // ARCHITECTING NEXT-GEN INTERFACES & AUTOMATION
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Profile Portrait Image (Smooth slow zoom on hover) */
                  <img
                    src={sinanPortraitImage}
                    alt="Hafiz Muhammed Sinan K"
                    className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.98] transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                )}

                {/* Dark Cinematic Vignette Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-black/30 opacity-60 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(5,5,7,0.5)_100%)] pointer-events-none" />

                {/* Light Reflection Sheen (Moves on Hover) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                {/* Top Badge: Verified Creator */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] font-mono-code text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
                  <span>MALAPPURAM, KERALA</span>
                </div>

                {/* Bottom Card Identity Banner */}
                <div className="absolute bottom-4 left-4 right-4 z-10 p-3.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold font-display text-white tracking-wide">
                      SINAN CREATIVE
                    </div>
                    <div className="text-[10px] font-mono-code text-[#a3e635]">
                      UI/UX • DEV • VIDEO
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-xl bg-[#a3e635]/15 text-[#a3e635] flex items-center justify-center border border-[#a3e635]/30">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Step 8 Entrance: Bottom Navigation Bar (Exact specification) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto w-full pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono-code text-white/50"
      >
        {/* Left Sub-Nav Anchor: #02 — ABOUT */}
        <button
          onClick={() => {
            soundManager.playClick();
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hover:text-[#a3e635] transition-colors uppercase tracking-widest text-[11px] sm:text-xs flex items-center gap-2 cursor-pointer group"
          data-cursor="button"
        >
          <span className="text-[#a3e635] font-bold">#02</span>
          <span className="text-white/40">//</span>
          <span className="group-hover:text-[#a3e635] transition-colors text-white/70">ABOUT</span>
        </button>

        {/* Center Animated Mouse Scroll Indicator */}
        <button
          onClick={() => {
            soundManager.playClick();
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1.5 text-white/60 hover:text-[#a3e635] transition-colors cursor-pointer group"
          data-cursor="button"
        >
          <span className="text-[9px] tracking-[0.25em] uppercase font-mono-code text-white/40 group-hover:text-[#a3e635] transition-colors">
            SCROLL
          </span>
          <div className="w-4 h-7 rounded-full border border-white/30 group-hover:border-[#a3e635] flex items-start justify-center p-1 transition-colors">
            {/* Small green dot moving vertically continuously */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-[#a3e635] shadow-[0_0_6px_#a3e635]"
            />
          </div>
        </button>

        {/* Right Sub-Nav Anchor: SERVICES → with sliding arrow animation on hover */}
        <button
          onClick={() => {
            soundManager.playClick();
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hover:text-[#a3e635] transition-colors uppercase tracking-widest text-[11px] sm:text-xs flex items-center gap-1.5 cursor-pointer group"
          data-cursor="button"
        >
          <span className="text-white/70 group-hover:text-[#a3e635] transition-colors">SERVICES</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#a3e635] group-hover:translate-x-1.5 transition-transform duration-300" />
        </button>
      </motion.div>
    </section>
  );
};
