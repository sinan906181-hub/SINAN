import React from 'react';
import {
  ArrowUp,
  Github,
  Youtube,
  Instagram,
  Linkedin,
  MessageSquare,
  Sparkles,
  Shield,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Selected Work' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#050507] text-white/60 text-xs py-16 px-4 sm:px-6 lg:px-12 select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-black border border-white/20 text-white p-1.5 shadow-md">
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  className="w-full h-full text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Sinan Globe Logo"
                >
                  <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="7" />
                  <line x1="6" y1="50" x2="94" y2="50" stroke="currentColor" strokeWidth="7" />
                  <line x1="12" y1="28" x2="88" y2="28" stroke="currentColor" strokeWidth="7" />
                  <line x1="12" y1="72" x2="88" y2="72" stroke="currentColor" strokeWidth="7" />
                  <line x1="50" y1="6" x2="50" y2="94" stroke="currentColor" strokeWidth="7" />
                  <ellipse cx="50" cy="50" rx="25" ry="44" stroke="currentColor" strokeWidth="7" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#a3e635]" />
              </div>
              <div>
                <span className="font-display font-black text-xl text-white tracking-wider block">
                  SINAN
                </span>
                <span className="text-[10px] text-[#a3e635] font-mono-code -mt-1 block">
                  {PERSONAL_INFO.fullName}
                </span>
              </div>
            </div>
            <p className="text-white/60 text-xs leading-relaxed font-mono-code">
              Creative Developer & Digital Storyteller based in Malappuram, Kerala. Transforming ideas into high-end interactive digital experiences.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center flex-wrap gap-2.5">
            <a
              href={PERSONAL_INFO.socialLinks.youtube}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-red-400 border border-white/10 hover:border-red-400/40 transition-all"
              title="YouTube (@mhd_sinanka)"
              aria-label="YouTube Channel"
            >
              <Youtube className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-[#a3e635] border border-white/10 hover:border-[#a3e635]/40 transition-all"
              title="GitHub"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-pink-400 border border-white/10 hover:border-pink-400/40 transition-all"
              title="Instagram"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-sky-400 border border-white/10 hover:border-sky-400/40 transition-all"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-[#a3e635]/10 hover:bg-[#a3e635] text-[#a3e635] hover:text-black border border-[#a3e635]/30 ml-2 transition-all cursor-pointer shadow-lg shadow-[#a3e635]/10"
              title="Back to Top"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Links Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-6 border-t border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#a3e635] transition-colors font-mono-code text-xs text-white/60 uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          {onOpenAdmin && (
            <button
              id="footer-admin-btn"
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono-code text-white/30 hover:text-[#a3e635] hover:bg-white/5 transition-all cursor-pointer"
              title="Master Access"
              aria-label="Admin Access"
            >
              <Shield className="w-3 h-3" />
              <span>Dossier Admin</span>
            </button>
          )}
        </div>

        {/* Bottom Tier: Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06] text-[11px] font-mono-code text-white/40">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.fullName}. Built with intentional craft.
          </div>

          <div className="flex items-center gap-1.5 text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
            <span>Black + Neon Lime Visual Identity System</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
