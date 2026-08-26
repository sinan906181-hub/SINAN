import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  FileCode,
  Layout,
  Figma,
  Video,
  Activity,
  Sparkles,
  Terminal,
  Cpu,
  Boxes,
  Palette,
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface SkillNode {
  name: string;
  category: 'Code' | 'Design' | 'Motion' | 'AI';
  experience: string;
  desc: string;
  icon: React.FC<{ className?: string }>;
  tag: string;
}

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillsList: SkillNode[] = [
    {
      name: 'React 19 & Next.js',
      category: 'Code',
      experience: 'Core Weapon',
      desc: 'Server components, hooks, concurrent rendering & high performance.',
      icon: Code2,
      tag: '#Frontend',
    },
    {
      name: 'TypeScript & JavaScript',
      category: 'Code',
      experience: 'Type Safe',
      desc: 'Scalable architecture, strict typing, modern ECMAScript standards.',
      icon: FileCode,
      tag: '#Architecture',
    },
    {
      name: 'Tailwind CSS',
      category: 'Code',
      experience: 'Fluid Engine',
      desc: 'Design token mapping, micro-animations, responsive layout engines.',
      icon: Palette,
      tag: '#Styling',
    },
    {
      name: 'HTML5 & Modern CSS',
      category: 'Code',
      experience: 'Foundation',
      desc: 'Semantic markup, accessibility standards, CSS grids and flexbox.',
      icon: Terminal,
      tag: '#Standards',
    },
    {
      name: 'Figma & Design Systems',
      category: 'Design',
      experience: 'System Lead',
      desc: 'Component libraries, variables, auto-layout, interactive prototypes.',
      icon: Figma,
      tag: '#Prototyping',
    },
    {
      name: 'UI/UX Design',
      category: 'Design',
      experience: 'Human Centered',
      desc: 'User journey mapping, wireframing, usability testing & visual balance.',
      icon: Layout,
      tag: '#UX',
    },
    {
      name: 'Motion Design',
      category: 'Motion',
      experience: 'Choreography',
      desc: 'Framer Motion, tactile click feedback, physics springs, micro-details.',
      icon: Activity,
      tag: '#Interactions',
    },
    {
      name: 'Cinematic Video Editing',
      category: 'Motion',
      experience: 'YouTube Creator',
      desc: 'DaVinci Resolve, Premiere Pro, color grading, sound design & pacing.',
      icon: Video,
      tag: '#Production',
    },
    {
      name: 'Gemini AI & LLM Systems',
      category: 'AI',
      experience: 'Next-Gen',
      desc: 'Multimodal AI interfaces, streaming responses, structured schema pipelines.',
      icon: Cpu,
      tag: '#GenAI',
    },
    {
      name: 'Node.js & Backend APIs',
      category: 'Code',
      experience: 'REST / Cloud',
      desc: 'Express routers, Firebase rules, data persistence, and edge functions.',
      icon: Boxes,
      tag: '#Backend',
    },
  ];

  const categories = ['All', 'Code', 'Design', 'Motion', 'AI'];

  const filtered = skillsList.filter(
    (s) => activeCategory === 'All' || s.category === activeCategory
  );

  return (
    <section
      id="skills"
      className="py-24 sm:py-36 px-4 sm:px-6 lg:px-12 relative bg-[#050507] text-white overflow-hidden border-t border-white/[0.08]"
    >
      {/* Ambient background glow */}
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#a3e635]/4 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-10 mb-14">
          <div>
            <div className="flex items-center gap-2 font-mono-code text-xs sm:text-sm text-[#a3e635] tracking-widest uppercase mb-3">
              <span>#04</span>
              <span className="text-white/40">//</span>
              <span>TECHNICAL & CREATIVE MATRIX</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
              SKILLS & <span className="text-[#a3e635]">ARSENAL.</span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-4 py-2 rounded-full font-mono-code text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#a3e635] text-slate-950 font-bold shadow-md shadow-[#a3e635]/25 scale-105'
                    : 'bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/10 border border-white/[0.06]'
                }`}
                data-cursor="button"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Unique Floating Interactive Skills Grid (No generic percentage bars!) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((skill, index) => {
            const Icon = skill.icon;
            const isHovered = hoveredSkill === skill.name;

            return (
              <motion.div
                key={skill.name}
                id={`skill-card-${index}`}
                onMouseEnter={() => {
                  soundManager.playPop();
                  setHoveredSkill(skill.name);
                }}
                onMouseLeave={() => setHoveredSkill(null)}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="group relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#0a0c10] border border-white/[0.08] hover:border-[#a3e635]/50 transition-all duration-300 flex flex-col justify-between cursor-default overflow-hidden"
                data-cursor="text"
              >
                {/* Subtle Hover Radial Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.12)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top Row: Icon + Category Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] group-hover:bg-[#a3e635] text-white/80 group-hover:text-slate-950 flex items-center justify-center border border-white/10 group-hover:border-[#a3e635] transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(163,230,53,0.4)]">
                    <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                  </div>

                  <span className="font-mono-code text-[11px] px-3 py-1 rounded-full bg-white/[0.04] text-[#a3e635] border border-[#a3e635]/20">
                    {skill.experience}
                  </span>
                </div>

                {/* Skill Name & Description */}
                <div className="space-y-2 mb-6">
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-[#a3e635] transition-colors uppercase tracking-tight">
                    {skill.name}
                  </h3>
                  <p className="text-white/65 text-xs sm:text-sm leading-relaxed">
                    {skill.desc}
                  </p>
                </div>

                {/* Bottom Tag */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs font-mono-code text-white/40">
                  <span>{skill.tag}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#a3e635] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
