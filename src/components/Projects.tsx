import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { soundManager } from '../utils/audio';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  return (
    <section
      id="projects"
      className="py-24 sm:py-36 px-4 sm:px-6 lg:px-12 relative bg-[#07080d] text-white overflow-hidden border-t border-white/[0.08]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-[#a3e635]/4 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header (SELECTED WORK) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-10 mb-14">
          <div>
            <div className="flex items-center gap-2 font-mono-code text-xs sm:text-sm text-[#a3e635] tracking-widest uppercase mb-3">
              <span>#04</span>
              <span className="text-white/40">//</span>
              <span>INDEX OF CREATIONS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
              SELECTED <span className="text-[#a3e635]">WORK.</span>
            </h2>
          </div>

          <div className="font-mono-code text-xs text-white/50 tracking-wider">
            FEATURED PRODUCTIONS ({PROJECTS_DATA.length})
          </div>
        </div>

        {/* Large Project Previews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {PROJECTS_DATA.map((project, index) => {
            const formattedIndex = String(index + 1).padStart(2, '0');

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                onClick={() => {
                  soundManager.playPop();
                  onSelectProject(project);
                }}
                className="group relative flex flex-col justify-between rounded-3xl bg-[#0b0e14] border border-white/[0.08] hover:border-[#a3e635]/50 overflow-hidden transition-all duration-500 cursor-pointer"
                data-cursor="project"
                data-cursor-text="VIEW PROJECT"
              >
                {/* Visual Image Preview with Zoom on hover */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-[#0b0e14]/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Top Badges: Number, Category & Year */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#a3e635] text-xs font-mono-code font-bold border border-white/15 shadow-md">
                        #{formattedIndex}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-xs font-mono-code border border-white/10">
                        {project.category}
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/70 text-xs font-mono-code border border-white/10">
                      {project.year}
                    </span>
                  </div>

                  {/* Centered Hover Action Button Badge */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="px-5 py-2.5 rounded-full bg-[#a3e635] text-slate-950 font-display font-black text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 scale-90 group-hover:scale-100 transition-transform">
                      <span>VIEW PROJECT</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Animated Green Line Animation on Hover */}
                <div className="h-[2px] w-0 bg-gradient-to-r from-[#a3e635] via-[#d4f83a] to-[#bef264] group-hover:w-full transition-all duration-700 ease-out shadow-[0_0_10px_#a3e635]" />

                {/* Project Details */}
                <div className="p-6 sm:p-8 space-y-4">
                  {/* Title & Role */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-[#a3e635] group-hover:translate-x-1 transition-all duration-300 uppercase tracking-tight">
                        {project.title}
                      </h3>
                      <p className="font-mono-code text-xs text-[#a3e635]/90 mt-1">
                        {project.role}
                      </p>
                    </div>

                    <div className="w-9 h-9 rounded-full border border-white/15 group-hover:border-[#a3e635] group-hover:bg-[#a3e635] text-white/40 group-hover:text-black flex items-center justify-center transition-all duration-300 shrink-0">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technology Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono-code px-2.5 py-1 rounded-lg bg-white/[0.04] text-white/80 border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-[11px] font-mono-code px-2 py-1 rounded-lg bg-white/[0.02] text-white/40">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
