import React from 'react';

export const MarqueeSection: React.FC = () => {
  const marqueeItems = [
    'CREATIVE DEVELOPER',
    'UI/UX DESIGNER',
    'VIDEO EDITOR',
    'DIGITAL CREATOR',
    'FULL-STACK ENGINEER',
    'AI INTERFACE ARCHITECT',
  ];

  return (
    <section className="py-8 sm:py-12 bg-[#050507] border-y border-white/[0.08] overflow-hidden select-none relative">
      {/* Subtle Glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a3e635]/[0.03] to-transparent pointer-events-none" />

      {/* Row 1: Forward Infinite Marquee */}
      <div className="animate-marquee flex items-center whitespace-nowrap gap-8 sm:gap-14">
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((text, idx) => (
          <div key={`m1-${idx}`} className="flex items-center gap-8 sm:gap-14 group cursor-default">
            <span className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-white/90 group-hover:text-[#a3e635] transition-colors duration-300">
              {text}
            </span>
            <span className="text-[#a3e635] text-2xl sm:text-3xl">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
};
