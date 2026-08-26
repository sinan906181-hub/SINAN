import React from 'react';
import {
  X,
  Download,
  Printer,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  Globe,
  Youtube,
} from 'lucide-react';
import { PERSONAL_INFO, SKILLS_DATA, ACHIEVEMENTS_DATA, JOURNEY_DATA, PROJECTS_DATA } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        id="resume-modal-dialog"
        className="w-full max-w-4xl max-h-[90vh] bg-[#0c101a] border border-white/10 rounded-2xl shadow-2xl overflow-y-auto text-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Controls */}
        <div className="sticky top-0 z-10 px-6 py-4 bg-[#0c101a]/95 backdrop-blur-xl border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-display font-bold text-sm text-slate-100">
              Curriculum Vitae — {PERSONAL_INFO.fullName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-slate-200 transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content Container */}
        <div className="p-6 sm:p-10 space-y-8 print:p-0 print:text-black">
          {/* Header Info */}
          <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-extrabold text-white tracking-tight">
                {PERSONAL_INFO.fullName}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-amber-400 font-mono-code text-sm font-semibold">
                  {PERSONAL_INFO.title}
                </span>
                <span className="text-xs text-slate-500 font-mono-code">({PERSONAL_INFO.name})</span>
              </div>
              <p className="text-slate-400 text-xs mt-2 max-w-xl leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>
            </div>
            <div className="space-y-1.5 text-xs text-slate-400 font-mono-code shrink-0 bg-white/[0.02] p-3 rounded-xl border border-white/5">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-amber-300 transition-colors">
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`tel:${PERSONAL_INFO.rawPhone}`} className="hover:text-emerald-300 transition-colors">
                  {PERSONAL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Youtube className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <a href={PERSONAL_INFO.socialLinks.youtube} target="_blank" rel="noreferrer" className="hover:text-rose-300 transition-colors">
                  youtube.com/@mhd_sinanka
                </a>
              </div>
            </div>
          </div>

          {/* Education & Academic Standing */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-wider text-amber-400 mb-3">
              <GraduationCap className="w-4 h-4" />
              <span>Education & Academic Background</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <span className="font-semibold text-white text-sm">
                  Bachelor of Science in Computer Science
                </span>
                <span className="text-xs text-slate-400 font-mono-code">2023 — Present</span>
              </div>
              <p className="text-xs text-slate-300">
                Focus on Algorithms, Distributed Systems, Web Architectures, Human-Computer Interaction, and AI Integration.
              </p>
              <div className="inline-block px-2.5 py-0.5 rounded bg-amber-400/10 text-amber-300 text-[11px] font-mono-code">
                Academic Excellence & Software Development Honors
              </div>
            </div>
          </div>

          {/* Featured Deployed Projects */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-wider text-amber-400 mb-3">
              <Globe className="w-4 h-4" />
              <span>Featured Engineering Projects</span>
            </div>
            <div className="space-y-3">
              {PROJECTS_DATA.slice(0, 3).map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between flex-wrap gap-1 mb-1">
                    <span className="font-semibold text-slate-200 text-xs sm:text-sm">{p.title}</span>
                    <span className="text-xs text-amber-400 font-mono-code font-bold">{p.year}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-2">{p.description}</p>
                  {p.liveUrl && (
                    <div className="text-[11px] text-emerald-400 font-mono-code">
                      Live URL: <a href={p.liveUrl} target="_blank" rel="noreferrer" className="underline hover:text-emerald-300">{p.liveUrl}</a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Core Technical & Creative Competencies */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-wider text-amber-400 mb-3">
              <Code2 className="w-4 h-4" />
              <span>Core Competencies</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-bold text-white block mb-2">Frontend & Web Development</span>
                <div className="flex flex-wrap gap-1.5">
                  {['React 19', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite', 'State Machines', 'Framer Motion', 'REST'].map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-white/5 text-[11px] text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-bold text-white block mb-2">Design, AI & Media</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Figma', 'UI/UX Design Systems', 'Gemini API', 'LLM Prompting', 'DaVinci Resolve', 'Sound Design', 'Content Creation'].map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-white/5 text-[11px] text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Milestones & Experience */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-wider text-amber-400 mb-3">
              <Briefcase className="w-4 h-4" />
              <span>Experience & Trajectory</span>
            </div>
            <div className="space-y-3">
              {JOURNEY_DATA.map((j) => (
                <div key={j.year + j.title} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between flex-wrap gap-1 mb-1">
                    <span className="font-semibold text-slate-200 text-xs sm:text-sm">{j.title}</span>
                    <span className="text-xs text-amber-400 font-mono-code font-bold">{j.year}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-2">{j.description}</p>
                  {j.highlight && (
                    <div className="text-[11px] text-emerald-400 font-mono-code">★ {j.highlight}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Verified Achievements */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-wider text-amber-400 mb-3">
              <Award className="w-4 h-4" />
              <span>Verified Achievements & Honors</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ACHIEVEMENTS_DATA.map((ach) => (
                <div key={ach.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-xs font-bold text-slate-200">{ach.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{ach.issuer} ({ach.date})</div>
                  <div className="text-[10px] text-amber-400 font-mono-code mt-1">{ach.badge}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Hafiz Muhammed Sinan K — Ready for impactful collaborations</span>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
