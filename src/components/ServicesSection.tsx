import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Layout,
  Palette,
  Video,
  Activity,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ServiceItem {
  num: string;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  image: string;
  icon: React.FC<{ className?: string }>;
}

export const ServicesSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  const services: ServiceItem[] = [
    {
      num: '01',
      id: 'web-dev',
      title: 'WEB DEVELOPMENT',
      subtitle: 'Production SPAs, Next.js Platforms & Performance Architecture',
      description:
        'Custom web applications engineered with React 19, Next.js, and TypeScript. Optimized for sub-second load times, responsive mobile fluidity, SEO dominance, and high conversions.',
      deliverables: ['Custom Web Apps', 'Next.js & React 19', 'E-Commerce Integrations', 'SEO & Performance'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      icon: Code2,
    },
    {
      num: '02',
      id: 'ui-ux',
      title: 'UI/UX DESIGN',
      subtitle: 'Human-Centered Prototyping, Wireframes & Design Systems',
      description:
        'Pixel-precise, accessible user interfaces designed in Figma with comprehensive design tokens, user journeys, interactive wireframes, and developer-ready component handoffs.',
      deliverables: ['Figma Design Systems', 'User Journey Mapping', 'Mobile App UI', 'WCAG AA Accessibility'],
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop',
      icon: Layout,
    },
    {
      num: '03',
      id: 'creative-design',
      title: 'CREATIVE DESIGN',
      subtitle: 'Brand Identity, Editorial Visuals & Vector Art',
      description:
        'Distinctive visual identities that command attention. From typography pairings and bespoke logo marks to high-impact marketing collateral and social media asset kits.',
      deliverables: ['Brand Guidelines', 'Vector Illustrations', 'Social Creative Assets', 'Print & Merchandise'],
      image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop',
      icon: Palette,
    },
    {
      num: '04',
      id: 'video-editing',
      title: 'VIDEO EDITING',
      subtitle: 'Cinematic Storytelling, Color Grading & Sound Mix',
      description:
        'High-retention video production for digital brands and YouTube creators. Precision pacing, DaVinci Resolve color grading, dynamic sound design, and narrative punch.',
      deliverables: ['Cinematic YouTube Videos', 'DaVinci Color Science', 'High-Retention Cuts', 'Audio Mastering'],
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
      icon: Video,
    },
    {
      num: '05',
      id: 'motion-design',
      title: 'MOTION DESIGN',
      subtitle: 'Interactive Micro-Interactions, 3D Effects & Kinetic Typography',
      description:
        'Bringing interfaces to life with purposeful choreography. Spring animations, SVG drawing paths, tactile click feedback, and kinetic presentation reels.',
      deliverables: ['Web Micro-Interactions', 'Kinetic Typography', 'Framer Motion Transitions', 'Lottie / SVG Art'],
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
      icon: Activity,
    },
  ];

  return (
    <section
      id="services"
      className="py-24 sm:py-36 relative bg-[#050507] text-white overflow-hidden border-t border-white/[0.08]"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#a3e635]/4 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-10">
          <div>
            <div className="flex items-center gap-2 font-mono-code text-xs sm:text-sm text-[#a3e635] tracking-widest uppercase mb-3">
              <span>#03</span>
              <span className="text-white/40">//</span>
              <span>SERVICES & DISCIPLINE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
              WHAT I <span className="text-[#a3e635]">CREATE.</span>
            </h2>
          </div>

          <p className="text-white/60 text-xs sm:text-sm font-mono-code max-w-sm">
            Tailored creative engineering for ambitious products, modern founders, and content creators.
          </p>
        </div>

        {/* Section 08 Interactive Award-Winning Agency List */}
        <div className="divide-y divide-white/[0.08]">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                id={`service-row-${service.id}`}
                onMouseEnter={() => {
                  soundManager.playPop();
                  setHoveredIndex(index);
                }}
                onClick={() => {
                  soundManager.playClick();
                  setHoveredIndex(index);
                }}
                className={`group relative py-8 sm:py-12 transition-all duration-500 cursor-pointer ${
                  isHovered ? 'bg-white/[0.02] px-4 sm:px-8 rounded-2xl' : 'px-2'
                }`}
                data-cursor="project"
                data-cursor-text="SERVICE"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Number + Title */}
                  <div className="flex items-start sm:items-center gap-6 sm:gap-10">
                    {/* Animated Number Shift */}
                    <span
                      className={`font-mono-code text-base sm:text-xl md:text-2xl font-black transition-all duration-300 ${
                        isHovered
                          ? 'text-[#a3e635] -translate-y-1'
                          : 'text-white/30 group-hover:text-white/60'
                      }`}
                    >
                      {service.num}
                    </span>

                    {/* Service Title */}
                    <div>
                      <h3
                        className={`font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight transition-all duration-300 ${
                          isHovered
                            ? 'text-white translate-x-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                            : 'text-white/75 group-hover:text-white'
                        }`}
                      >
                        {service.title}
                      </h3>
                      <div className="font-mono-code text-xs sm:text-sm text-[#a3e635] mt-1 opacity-90 hidden sm:block">
                        {service.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Right: Deliverables Chips + Animated Arrow */}
                  <div className="flex items-center gap-4 sm:gap-8 self-end lg:self-center">
                    <div className="hidden md:flex flex-wrap gap-2 max-w-xs justify-end">
                      {service.deliverables.slice(0, 2).map((deliv, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono-code px-2.5 py-1 rounded-md bg-white/[0.04] text-white/70 border border-white/[0.06]"
                        >
                          {deliv}
                        </span>
                      ))}
                    </div>

                    {/* Arrow Button */}
                    <div
                      className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? 'bg-[#a3e635] border-[#a3e635] text-black scale-110 shadow-[0_0_20px_rgba(163,230,53,0.5)]'
                          : 'border-white/15 text-white/40 group-hover:border-white/40 group-hover:text-white'
                      }`}
                    >
                      <ArrowRight
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isHovered ? 'translate-x-0.5 scale-110' : ''
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded Details on Hover / Active */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden mt-6 pt-6 border-t border-white/[0.06]"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        {/* Description & All Deliverables */}
                        <div className="md:col-span-8 space-y-4">
                          <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl">
                            {service.description}
                          </p>

                          <div className="flex flex-wrap gap-2 pt-2">
                            {service.deliverables.map((deliv, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] border border-[#a3e635]/30 text-xs font-mono-code text-white/90"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
                                <span>{deliv}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Preview Visual Thumbnail */}
                        <div className="md:col-span-4 flex justify-end">
                          <div className="relative w-full max-w-[240px] aspect-[16/10] rounded-xl overflow-hidden border border-[#a3e635]/40 shadow-lg shadow-[#a3e635]/10">
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-cover filter contrast-[1.1]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-2 left-2 right-2 text-[10px] font-mono-code text-[#a3e635] flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              <span>Verified Capability</span>
                            </div>
                          </div>
                        </div>
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
