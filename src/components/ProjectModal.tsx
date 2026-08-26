import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;
  const [selectedImage, setSelectedImage] = useState<string>(project.image);

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        id="project-modal-dialog"
        className="w-full max-w-4xl max-h-[92vh] bg-[#0c0e14] border border-white/10 rounded-3xl shadow-2xl overflow-y-auto text-white flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-[#0c0e14]/95 backdrop-blur-xl border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-code px-2.5 py-1 rounded-full bg-[#a3e635]/10 text-[#a3e635] border border-[#a3e635]/30 font-semibold">
              {project.category} Showcase
            </span>
            <span className="text-xs text-white/50 font-mono-code">• {project.year}</span>
          </div>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                id="modal-live-link"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#a3e635] text-slate-950 text-xs font-bold font-display hover:bg-[#bef264] transition-colors"
              >
                <span>Live Experience</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              id="modal-close-btn"
              className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Main Visual Feature */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
              <img
                src={selectedImage}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono-code text-white/90 border border-white/10">
                {project.category}
              </div>
            </div>

            {/* Gallery thumbnails */}
            {project.gallery && project.gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {project.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-20 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === imgUrl ? 'border-[#a3e635] scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt="thumbnail"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Tagline */}
          <div className="border-b border-white/10 pb-6">
            <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight mb-2 uppercase">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-[#a3e635] font-medium leading-relaxed">
              {project.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-mono-code text-white/50">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#a3e635]" />
                <span>Year: {project.year}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-[#a3e635]" />
                <span>Role: {project.role}</span>
              </div>
            </div>
          </div>

          {/* Metrics Spotlight */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-xl sm:text-2xl font-black font-display text-[#a3e635]">{m.value}</div>
                  <div className="text-[11px] font-mono-code text-white/50 mt-1 uppercase tracking-wider">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* In-depth Overview */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono-code font-bold text-[#a3e635] uppercase tracking-wider">
              Project Architecture & Overview //
            </h3>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
              {project.longDescription}
            </p>
          </div>

          {/* Key Highlights */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono-code font-bold text-[#a3e635] uppercase tracking-wider">
              Key Engineering Highlights //
            </h3>
            <div className="space-y-2">
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#a3e635] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-white/85">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono-code font-bold text-[#a3e635] uppercase tracking-wider">
              Technologies & Tooling //
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono-code text-white/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a3e635] hover:bg-[#bef264] text-slate-950 text-xs sm:text-sm font-bold font-display shadow-md transition-colors"
                >
                  <span>Launch Live App</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 text-xs sm:text-sm font-semibold transition-colors"
                >
                  <Github className="w-4 h-4 text-white/60" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono-code text-white/50 hover:text-white"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
