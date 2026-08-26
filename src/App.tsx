import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Project } from './types';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ServicesSection } from './components/ServicesSection';
import { MarqueeSection } from './components/MarqueeSection';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { AdminPortal } from './components/admin/AdminPortal';
import { soundManager } from './utils/audio';

function PortfolioApp() {
  // Modal and portal states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);

  // Scroll Progress indicator
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcuts: Ctrl+Shift+/ or Cmd+Shift+/ or Ctrl+Shift+A opens Admin Portal; Cmd+K opens Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isModifier = e.ctrlKey || e.metaKey;
      const isShift = e.shiftKey;
      const isSlash = e.key === '/' || e.key === '?' || e.code === 'Slash' || e.keyCode === 191;

      // Open Admin Portal with Ctrl+Shift+/ or Cmd+Shift+/ or Ctrl+Shift+A
      if (
        (isModifier && isShift && isSlash) ||
        (isModifier && isSlash) ||
        (isModifier && isShift && (e.key.toLowerCase() === 'a' || e.code === 'KeyA'))
      ) {
        e.preventDefault();
        soundManager.playPop();
        setIsAdminPortalOpen((prev) => !prev);
        return;
      }

      // Open Command Palette with Cmd+K or Ctrl+K
      const isTargetInput = (e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'TEXTAREA';
      if (!isTargetInput && isModifier && (e.key.toLowerCase() === 'k' || e.code === 'KeyK')) {
        e.preventDefault();
        soundManager.playPop();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen for custom open-command-palette event
  useEffect(() => {
    const handleOpenPalette = () => setIsCommandPaletteOpen(true);
    window.addEventListener('open-command-palette', handleOpenPalette);
    return () => window.removeEventListener('open-command-palette', handleOpenPalette);
  }, []);

  const scrollToSection = (sectionId: string) => {
    soundManager.playClick();
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If Admin Portal is active, show the full admin dashboard
  if (isAdminPortalOpen) {
    return (
      <AdminPortal onBackToPortfolio={() => setIsAdminPortalOpen(false)} />
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white selection:bg-[#a3e635] selection:text-black transition-colors duration-300 font-sans">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Top Neon Scroll Progress Indicator */}
      <div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-[#a3e635] via-[#d4f83a] to-[#bef264] z-50 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(163,230,53,0.9)]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Main Top Navigation */}
      <Navbar
        onOpenCommandPalette={() => {
          soundManager.playPop();
          setIsCommandPaletteOpen(true);
        }}
        onOpenAdmin={() => {
          soundManager.playPop();
          setIsAdminPortalOpen(true);
        }}
      />

      {/* Main Content Flow */}
      <main className="relative">
        {/* 01: Hero Section */}
        <Hero
          onExploreWork={() => scrollToSection('services')}
          onConnect={() => scrollToSection('contact')}
        />

        {/* 02: About Section */}
        <About
          onOpenResume={() => {
            soundManager.playPop();
            setIsResumeOpen(true);
          }}
          onConnect={() => scrollToSection('contact')}
        />

        {/* 03: Services Section */}
        <ServicesSection />

        {/* Marquee Banner */}
        <MarqueeSection />

        {/* 04: Skills Section */}
        <Skills />

        {/* 05: Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => {
          soundManager.playPop();
          setIsAdminPortalOpen(true);
        }}
      />

      {/* Interactive Project Inspector Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Printable / Downloadable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenAdmin={() => {
          setIsCommandPaletteOpen(false);
          setIsAdminPortalOpen(true);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
