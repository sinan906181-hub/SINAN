import React, { useState } from 'react';
import {
  Video,
  Play,
  Youtube,
  Eye,
  Clock,
  Sparkles,
  Film,
  Sliders,
  Share2,
  X,
  ExternalLink,
} from 'lucide-react';
import { CREATIVE_VIDEOS, PERSONAL_INFO } from '../data/portfolioData';
import { CreativeVideo } from '../types';
import { soundManager } from '../utils/audio';

export const CreativeStudio: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<CreativeVideo | null>(null);

  return (
    <section id="creative" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-dot-pattern">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] dark:bg-white/[0.04] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 text-xs font-mono-code text-rose-400 dark:text-rose-400 light:text-rose-600 mb-3">
            <Video className="w-3.5 h-3.5" />
            <span>CONTENT CREATOR & MEDIA LAB</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Creative Storytelling & Studio
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-xl">
            Beyond writing code, I produce high-retention technical education, design breakdowns, and cinematic video edits for thousands of curious creators.
          </p>
        </div>

        {/* Creator Identity Highlights Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-indigo-500/10 border border-white/10 backdrop-blur-md mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
              <Youtube className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                Hafiz Muhammed Sinan K on YouTube (@mhd_sinanka)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                150K+ Video Views • In-depth Web Development & AI Interfaces • Weekly Tech & Design Breakdowns
              </p>
            </div>
          </div>

          <a
            href={PERSONAL_INFO.socialLinks.youtube}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs sm:text-sm font-bold font-display shadow-lg shadow-rose-500/25 transition-all hover:scale-[1.02] shrink-0"
          >
            <Youtube className="w-4 h-4" />
            <span>Visit @mhd_sinanka</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {CREATIVE_VIDEOS.map((vid) => (
            <div
              key={vid.id}
              id={`video-card-${vid.id}`}
              onClick={() => {
                soundManager.playPop();
                setSelectedVideo(vid);
              }}
              className="group rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 overflow-hidden cursor-pointer hover:border-rose-400/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Frame */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Dark gradient */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-rose-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono-code text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{vid.duration}</span>
                  </div>

                  {/* Category */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono-code text-rose-300 border border-white/10">
                    {vid.category}
                  </div>
                </div>

                {/* Title and views */}
                <div className="p-4">
                  <div className="flex items-center gap-2 text-[11px] font-mono-code text-slate-400 mb-1.5">
                    <Eye className="w-3 h-3 text-rose-400" />
                    <span>{vid.views} views</span>
                  </div>

                  <h4 className="font-display font-bold text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-rose-400 transition-colors line-clamp-2 mb-2">
                    {vid.title}
                  </h4>

                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 line-clamp-2 leading-relaxed">
                    {vid.description}
                  </p>
                </div>
              </div>

              {/* Tools chips */}
              <div className="px-4 pb-4 flex flex-wrap gap-1">
                {vid.toolsUsed.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] font-mono-code px-2 py-0.5 rounded bg-white/5 text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Preview Modal */}
      {selectedVideo && (
        <div
          id="video-preview-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            id="video-preview-dialog"
            className="w-full max-w-3xl bg-[#0c101a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden text-slate-200 space-y-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-code px-2.5 py-1 rounded bg-rose-500/20 text-rose-400">
                  {selectedVideo.category}
                </span>
                <span className="text-xs text-slate-400 font-mono-code">• {selectedVideo.duration}</span>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Canvas Feature / Cinematic Simulator */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-white/10 flex items-center justify-center group">
              <img
                src={selectedVideo.thumbnail}
                alt={selectedVideo.title}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer mb-3">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <span className="text-sm font-semibold text-white font-display">
                  Watch Full Episode on YouTube
                </span>
                <span className="text-xs text-slate-400 mt-1 max-w-md">
                  High-fidelity 4K 60fps walkthrough with downloadable source code & design assets.
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-xl text-white mb-2">
                {selectedVideo.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {selectedVideo.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  {selectedVideo.toolsUsed.map((tool) => (
                    <span key={tool} className="text-xs font-mono-code px-2 py-0.5 rounded bg-white/5 text-amber-300">
                      {tool}
                    </span>
                  ))}
                </div>

                <a
                  href={PERSONAL_INFO.socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold font-display"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Open Video in New Tab</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
