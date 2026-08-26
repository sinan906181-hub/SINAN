import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Compass,
  Mail,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  ExternalLink,
  Shield,
  MessageSquare,
  FolderGit2,
  Image,
  User,
  Cpu,
  Video,
  Trophy,
  Quote,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenAdmin,
}) => {
  const { theme, toggleTheme, soundMuted, toggleSound } = useTheme();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        soundManager.playPop();
        if (isOpen) onClose();
        else {
          const evt = new CustomEvent('open-command-palette');
          window.dispatchEvent(evt);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const scrollTo = (id: string) => {
    soundManager.playClick();
    onClose();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home / Hero Overview', icon: Compass, action: () => scrollTo('hero') },
    { id: 'about', label: 'About Sinan', icon: User, action: () => scrollTo('about') },
    { id: 'services', label: 'Services & Expertise', icon: Cpu, action: () => scrollTo('services') },
    { id: 'skills', label: 'Technical & Creative Skills', icon: Sparkles, action: () => scrollTo('skills') },
    { id: 'contact', label: 'Contact & Connect', icon: Mail, action: () => scrollTo('contact') },
  ];

  const filteredNav = navItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      id="command-palette-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        id="command-palette-dialog"
        className="w-full max-w-2xl rounded-2xl bg-[#0f1422] border border-white/10 shadow-2xl overflow-hidden text-slate-200 divide-y divide-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 gap-3 bg-white/5">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            id="command-palette-input"
            type="text"
            placeholder="Type a command, section, or action..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-base text-slate-100 placeholder:text-slate-400"
          />
          <button
            id="command-palette-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4">
          {/* Quick Actions */}
          <div>
            <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Quick Settings
            </div>
            <div className="grid grid-cols-2 gap-1 mt-1">
              <button
                id="cmd-toggle-theme-btn"
                onClick={() => {
                  toggleTheme();
                  onClose();
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium hover:bg-white/10 text-left transition-colors text-slate-200"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
                <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
              </button>

              <button
                id="cmd-toggle-sound-btn"
                onClick={() => {
                  toggleSound();
                  onClose();
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium hover:bg-white/10 text-left transition-colors text-slate-200"
              >
                {soundMuted ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                <span>{soundMuted ? 'Unmute Audio Clicks' : 'Mute Audio Clicks'}</span>
              </button>
            </div>
          </div>

          {/* Navigation Sections */}
          {filteredNav.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Navigation
              </div>
              <div className="space-y-0.5 mt-1">
                {filteredNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      id={`cmd-nav-${item.id}`}
                      onClick={item.action}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-white/10 text-left transition-colors group"
                    >
                      <div className="flex items-center gap-3 text-slate-200 group-hover:text-white">
                        <Icon className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors" />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-xs text-slate-500 group-hover:text-slate-300">Jump</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Direct Services & Operations */}
          <div>
            <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Operations & Chat
            </div>
            <div className="space-y-0.5 mt-1">
              {onOpenAdmin && (
                <button
                  id="cmd-admin-portal-btn"
                  onClick={() => {
                    soundManager.playPop();
                    onClose();
                    onOpenAdmin();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-amber-400/10 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3 text-amber-300">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold">Launch Admin Portal</span>
                  </div>
                  <span className="text-xs text-amber-400 font-mono-code">Open OS</span>
                </button>
              )}

              <a
                href="https://chat.google.com/"
                target="_blank"
                rel="noreferrer"
                id="cmd-google-chat-link"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-sky-400/10 text-left transition-colors group"
              >
                <div className="flex items-center gap-3 text-sky-300">
                  <MessageSquare className="w-4 h-4 text-sky-400" />
                  <span>Launch Google Chat (chat.google.com)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
              </a>
            </div>
          </div>

          {/* External Links */}
          <div>
            <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Direct Contact & Links
            </div>
            <div className="space-y-0.5 mt-1">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                id="cmd-email-link"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-white/10 text-left transition-colors group"
              >
                <div className="flex items-center gap-3 text-slate-200 group-hover:text-white">
                  <Mail className="w-4 h-4 text-slate-400 group-hover:text-amber-400" />
                  <span>Send Direct Email ({PERSONAL_INFO.email})</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-white/[0.02] flex items-center justify-between text-xs text-slate-500">
          <span>Navigate with mouse or click item</span>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono text-[10px]">ESC</kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
