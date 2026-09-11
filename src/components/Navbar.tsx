import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Search,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { soundManager } from '../utils/audio';
import { PERSONAL_INFO } from '../data/portfolioData';
import sinanPortraitImage from '../assets/images/regenerated_image_1789091925380.png';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenAdmin,
}) => {
  const { theme, toggleTheme, soundMuted, toggleSound } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { id: 'hero', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'services', label: 'SERVICES' },
    { id: 'contact', label: 'CONTACT' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    soundManager.playClick();
    setIsDrawerOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-black/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Hamburger Menu Trigger (Like Video) + Logo */}
          <div className="flex items-center gap-4">
            <button
              id="drawer-toggle-btn"
              onClick={() => {
                soundManager.playPop();
                setIsDrawerOpen(true);
              }}
              className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-200 hover:text-lime-400 transition-all cursor-pointer flex items-center gap-2 group"
              title="Open Navigation Menu"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 transition-transform group-hover:scale-110" />
            </button>

            {/* Brand Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('hero');
              }}
              id="nav-logo"
              className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
            >
              <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden bg-black border border-white/20 text-white shadow-sm group-hover:border-lime-400/60 transition-all">
                <img
                  src={sinanPortraitImage}
                  alt="Sinan"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-lime-400 border-2 border-black z-10" />
              </div>
              <span className="font-display font-extrabold text-base sm:text-lg tracking-wider text-slate-100 group-hover:text-lime-400 transition-colors">
                SINAN
              </span>
            </a>
          </div>

          {/* Right Actions: Command Palette, Sound, Theme, CTA */}
          <div className="flex items-center gap-2">
            {/* Sound FX Toggle */}
            <button
              id="nav-sound-toggle-btn"
              onClick={toggleSound}
              className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-colors cursor-pointer"
              title={soundMuted ? 'Unmute sound clicks' : 'Mute sound clicks'}
              aria-label="Toggle sound effects"
            >
              {soundMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-lime-400" />}
            </button>

            {/* Hire Me / Let's Talk CTA */}
            <button
              id="nav-cta-btn"
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold font-display shadow-md shadow-lime-400/20 hover:shadow-lime-400/30 transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* FULL SIDE MENU DRAWER (Exact Match to Video Reference) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 z-[99990] bg-black/80 backdrop-blur-md"
            />

            {/* Drawer Container */}
            <motion.aside
              id="video-style-side-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 bottom-0 z-[99995] w-full sm:w-80 md:w-96 bg-[#0a0a0c] border-r border-white/10 flex flex-col justify-between p-6 sm:p-8 select-none shadow-2xl"
            >
              {/* Top Bar with Close Button */}
              <div className="flex items-center justify-between">
                <button
                  id="drawer-close-btn"
                  onClick={() => {
                    soundManager.playClick();
                    setIsDrawerOpen(false);
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Center Menu List: HOME, ABOUT, PROJECTS, SERVICES, SKILLS, CONTACT */}
              <div className="my-auto flex flex-col gap-5 sm:gap-6 py-6">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      id={`drawer-link-${link.id}`}
                      onClick={() => scrollTo(link.id)}
                      className={`text-left font-display font-black tracking-tight text-3xl sm:text-4xl uppercase transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                        isActive
                          ? 'text-[#d4f83a] drop-shadow-[0_0_15px_rgba(212,248,58,0.4)]'
                          : 'text-white/90 hover:text-[#d4f83a] hover:translate-x-2'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#d4f83a] shadow-[0_0_10px_#d4f83a]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Bottom WhatsApp Contact Pill (Exact Video Match) */}
              <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                <a
                  href={PERSONAL_INFO.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="drawer-whatsapp-btn"
                  onClick={() => soundManager.playSuccess()}
                  className="inline-flex items-center justify-center gap-2.5 w-fit px-5 py-2.5 rounded-full bg-[#1ed760] hover:bg-[#1fbe57] text-black font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
