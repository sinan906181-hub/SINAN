import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Download } from 'lucide-react';
import { GalleryItem } from '../types';
import { soundManager } from '../utils/audio';

interface LightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  items,
  onClose,
  onSelect,
}) => {
  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handlePrev = () => {
    soundManager.playClick();
    const nextIdx = (currentIndex - 1 + items.length) % items.length;
    onSelect(items[nextIdx]);
  };

  const handleNext = () => {
    soundManager.playClick();
    const nextIdx = (currentIndex + 1) % items.length;
    onSelect(items[nextIdx]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items]);

  return (
    <div
      id="lightbox-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        id="lightbox-content"
        className="relative max-w-5xl w-full flex flex-col items-center max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls */}
        <div className="w-full flex items-center justify-between py-2 mb-2 text-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-code px-2.5 py-1 rounded bg-white/10">
              {item.category}
            </span>
            <span className="text-xs text-slate-400 font-mono-code">
              {currentIndex + 1} of {items.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Image View */}
        <div className="relative w-full flex items-center justify-center overflow-hidden rounded-2xl bg-black/60 border border-white/10 max-h-[70vh]">
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
          />

          {/* Left / Right arrow navigation */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white transition-transform hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white transition-transform hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Caption & Description */}
        <div className="w-full p-4 rounded-xl bg-white/[0.04] border border-white/10 mt-3 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <h3 className="font-display font-bold text-base text-white">{item.title}</h3>
            <p className="text-xs text-slate-300 mt-0.5">{item.description}</p>
          </div>

          <span className="text-xs font-mono-code text-amber-400 shrink-0">
            Year: {item.year}
          </span>
        </div>
      </div>
    </div>
  );
};
