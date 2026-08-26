import React, { useState } from 'react';
import { Image, Sparkles, Maximize2, Filter } from 'lucide-react';
import { GALLERY_DATA } from '../data/portfolioData';
import { GalleryItem } from '../types';
import { LightboxModal } from './LightboxModal';
import { soundManager } from '../utils/audio';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'UI Concepts',
    'Visual Design',
    'Tech Setups',
    'Creative Photography',
  ];

  const filteredItems = GALLERY_DATA.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] dark:bg-white/[0.04] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 text-xs font-mono-code text-amber-400 dark:text-amber-400 light:text-amber-600 mb-3">
            <Image className="w-3.5 h-3.5" />
            <span>VISUAL CURATION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Design & Atmosphere Gallery
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-xl">
            A visual repository of interface explorations, hardware workspaces, aesthetic typography, and creative photography.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`gallery-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`gallery-item-${item.id}`}
              onClick={() => {
                soundManager.playPop();
                setLightboxItem(item);
              }}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 dark:border-white/10 light:border-slate-200 aspect-[4/3] cursor-pointer hover:border-amber-400/50 hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Category Pill */}
              <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono-code text-slate-300 border border-white/10">
                {item.category}
              </div>

              {/* Zoom Icon Button */}
              <div className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Text Info */}
              <div className="absolute bottom-4 left-4 right-4 p-2">
                <h3 className="font-display font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={lightboxItem}
        items={filteredItems}
        onClose={() => setLightboxItem(null)}
        onSelect={(next) => setLightboxItem(next)}
      />
    </section>
  );
};
