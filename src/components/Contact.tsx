import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  MapPin,
  Clock,
  ExternalLink,
  Youtube,
  CornerDownLeft,
  Globe,
  Flame,
  AlertCircle,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundManager } from '../utils/audio';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ContactInquiry, NotificationItem, ActivityLog } from '../types/admin';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Full-Stack Web Development',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const serviceOptions = [
    'Full-Stack Web Development',
    'UI/UX & Product Design',
    'Video Editing & Motion Post-Production',
    'E-Commerce & Digital Branding',
    'AI Integration & Custom Engineering',
  ];

  const handleCopy = (text: string, label: string) => {
    soundManager.playPop();
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      soundManager.playClick();
      formRef.current?.requestSubmit();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    soundManager.playClick();
    setIsSubmitting(true);
    setSubmitError(null);

    const newInquiryId = 'inq-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newInquiry: ContactInquiry = {
      id: newInquiryId,
      name: formData.name.trim(),
      email: formData.email.trim(),
      topic: formData.service,
      message: formData.message.trim(),
      timestamp: formattedTime,
      date: formattedDate,
      read: false,
      status: 'new',
      starred: false,
    };

    try {
      // 1. Send to Firestore database
      try {
        await addDoc(collection(db, 'inquiries'), {
          ...newInquiry,
          createdAt: serverTimestamp(),
        });
      } catch (firestoreErr) {
        console.warn('Firestore write warning (saving locally as fallback):', firestoreErr);
      }

      // 2. Save directly into Admin Portal localStorage collections
      const existingInquiriesJson = localStorage.getItem('sinan_admin_inquiries');
      const existingInquiries: ContactInquiry[] = existingInquiriesJson ? JSON.parse(existingInquiriesJson) : [];
      const updatedInquiries = [newInquiry, ...existingInquiries.filter(i => i.id !== newInquiry.id)];
      localStorage.setItem('sinan_admin_inquiries', JSON.stringify(updatedInquiries));

      // 3. Create Admin Notification
      const newNotification: NotificationItem = {
        id: 'notif-' + Date.now(),
        title: `New Transmission from ${newInquiry.name}`,
        message: `${newInquiry.topic}: "${newInquiry.message.slice(0, 80)}${newInquiry.message.length > 80 ? '...' : ''}"`,
        time: 'Just now',
        read: false,
        priority: 'high',
        type: 'message',
      };
      const existingNotifsJson = localStorage.getItem('sinan_admin_notifications');
      const existingNotifs: NotificationItem[] = existingNotifsJson ? JSON.parse(existingNotifsJson) : [];
      localStorage.setItem('sinan_admin_notifications', JSON.stringify([newNotification, ...existingNotifs]));

      // 4. Create Activity Audit Log
      const newLog: ActivityLog = {
        id: 'log-' + Date.now(),
        timestamp: 'Just now',
        user: newInquiry.name,
        action: `Submitted contact inquiry for ${newInquiry.topic}`,
        category: 'API',
        ip: 'Direct Transmission (Client)',
        status: 'success',
        details: { email: newInquiry.email, service: newInquiry.topic },
      };
      const existingLogsJson = localStorage.getItem('sinan_admin_logs');
      const existingLogs: ActivityLog[] = existingLogsJson ? JSON.parse(existingLogsJson) : [];
      localStorage.setItem('sinan_admin_logs', JSON.stringify([newLog, ...existingLogs]));

      // 5. Dispatch real-time window event to instantly update active Admin Portal view
      window.dispatchEvent(new CustomEvent('sinan_contact_submitted', { detail: newInquiry }));

      setIsSubmitting(false);
      setIsSuccess(true);
      soundManager.playSuccess();
      setFormData({
        name: '',
        email: '',
        service: 'Full-Stack Web Development',
        message: '',
      });
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (err) {
      console.error('Submission failed:', err);
      setIsSubmitting(false);
      setSubmitError('Failed to dispatch message. Please check your connection or contact directly via WhatsApp/Email.');
      soundManager.playPop();
    }
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-12 relative bg-[#050507] text-white overflow-hidden border-t border-white/[0.08]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#a3e635]/5 rounded-full blur-[200px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 font-mono-code text-xs sm:text-sm text-[#a3e635] tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/20 shadow-[0_0_20px_rgba(163,230,53,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse" />
            <span>#05 // INITIATE TRANSMISSION</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.95] drop-shadow-[0_0_40px_rgba(163,230,53,0.15)]">
            LET'S CREATE SOMETHING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] via-[#d4f83a] to-[#84cc16]">GREAT.</span>
          </h2>

          <p className="mt-6 text-white/75 text-sm sm:text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
            Have a project in mind, an inquiry, or looking to scale your brand? Send a message and let's craft something unforgettable.
          </p>
        </div>

        {/* 2-Column Contact Suite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Direct Verified Channels & Status */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Availability Badge Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0e131b] to-[#07090e] border border-white/[0.12] hover:border-[#a3e635]/40 transition-all duration-500 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#a3e635]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3e635] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#a3e635]"></span>
                  </span>
                  <span className="font-mono-code text-xs font-bold text-white uppercase tracking-wider">
                    AVAILABILITY STATUS // 2026
                  </span>
                </div>
                <span className="text-[11px] font-mono-code text-[#a3e635] px-2.5 py-0.5 rounded-full bg-[#a3e635]/15 border border-[#a3e635]/30 font-semibold">
                  OPEN FOR WORK
                </span>
              </div>

              <div className="space-y-2.5 text-xs font-mono-code text-white/70">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#a3e635] shrink-0" />
                  <span className="text-white font-medium">Malappuram District, Kerala, India</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#a3e635] shrink-0" />
                  <span>Response Time: Within 2-4 hours (IST)</span>
                </div>
              </div>

              {/* Featured Project Banner */}
              <div className="mt-5 pt-4 border-t border-white/[0.08]">
                <div className="text-[10px] font-mono-code text-[#a3e635] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                  <Flame className="w-3.5 h-3.5" />
                  FEATURED LIVE PROJECT
                </div>
                <a
                  href="http://sadad-class-union.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] hover:bg-[#a3e635]/15 border border-white/10 hover:border-[#a3e635] transition-all duration-300 group/proj cursor-pointer"
                  data-cursor="button"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-[#a3e635]" />
                    <div>
                      <div className="text-xs font-bold text-white group-hover/proj:text-[#a3e635] transition-colors">
                        Sadad Class Union Portal
                      </div>
                      <div className="text-[11px] font-mono-code text-white/40 truncate max-w-[200px] sm:max-w-xs">
                        sadad-class-union.vercel.app
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/40 group-hover/proj:text-[#a3e635] transition-colors" />
                </a>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="space-y-3">
              <div className="text-xs font-mono-code text-[#a3e635] uppercase tracking-widest font-bold">
                DIRECT CONTACT CHANNELS //
              </div>

              {/* Email */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-b from-[#0e131b] to-[#07090e] border border-white/[0.1] hover:border-[#a3e635]/50 transition-all duration-300 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#a3e635]/10 text-[#a3e635] flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-code text-white/40 uppercase tracking-wider">EMAIL</div>
                    <a
                      href="mailto:sinan906181@gmail.com"
                      className="text-xs sm:text-sm font-bold text-white hover:text-[#a3e635] font-mono-code transition-colors"
                    >
                      sinan906181@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy('sinan906181@gmail.com', 'email')}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                  title="Copy Email"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-[#a3e635]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-b from-[#0e131b] to-[#07090e] border border-white/[0.1] hover:border-[#a3e635]/50 transition-all duration-300 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-code text-white/40 uppercase tracking-wider">PHONE / WHATSAPP</div>
                    <a
                      href="https://wa.me/919061814655"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs sm:text-sm font-bold text-white hover:text-[#a3e635] font-mono-code transition-colors"
                    >
                      +91 9061814655
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy('9061814655', 'phone')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                    title="Copy Phone"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="w-4 h-4 text-[#a3e635]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href="https://wa.me/919061814655"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] transition-colors"
                    title="Open WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* YouTube Channel */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-b from-[#0e131b] to-[#07090e] border border-white/[0.1] hover:border-red-500/40 transition-all duration-300 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-code text-white/40 uppercase tracking-wider">YOUTUBE CHANNEL</div>
                    <a
                      href="https://www.youtube.com/@mhd_sinanka"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs sm:text-sm font-bold text-white hover:text-red-400 font-mono-code transition-colors"
                    >
                      @mhd_sinanka
                    </a>
                  </div>
                </div>
                <a
                  href="https://www.youtube.com/@mhd_sinanka"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 transition-colors"
                  title="Visit YouTube"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Premium High-End Transmission Form */}
          <div className="lg:col-span-7">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-7 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0d1017] via-[#090b10] to-[#06080c] border border-white/[0.12] hover:border-[#a3e635]/30 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden space-y-5"
            >
              {/* Ambient Glow */}
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#a3e635]/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <span className="font-mono-code text-xs text-[#a3e635] tracking-widest uppercase font-bold">
                  TRANSMISSION FORM // INBOX
                </span>
                <span className="font-mono-code text-[11px] text-[#a3e635] flex items-center gap-1.5 bg-[#a3e635]/10 px-2.5 py-1 rounded-full border border-[#a3e635]/20 font-semibold">
                  <Sparkles className="w-3 h-3 text-[#a3e635]" />
                  DIRECT TO SINAN
                </span>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block font-mono-code text-[11px] uppercase tracking-wider text-white/80 font-medium">
                    Your Name <span className="text-[#a3e635]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3.5 rounded-2xl bg-black/40 border border-white/15 focus:border-[#a3e635] focus:bg-black/60 focus:ring-2 focus:ring-[#a3e635]/20 text-white placeholder:text-white/25 text-sm font-mono-code outline-none transition-all shadow-inner"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono-code text-[11px] uppercase tracking-wider text-white/80 font-medium">
                    Your Email <span className="text-[#a3e635]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3.5 rounded-2xl bg-black/40 border border-white/15 focus:border-[#a3e635] focus:bg-black/60 focus:ring-2 focus:ring-[#a3e635]/20 text-white placeholder:text-white/25 text-sm font-mono-code outline-none transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-2">
                <label className="block font-mono-code text-[11px] uppercase tracking-wider text-white/80 font-medium flex items-center justify-between">
                  <span>Primary Objective / Service</span>
                  <span className="text-[10px] text-[#a3e635]/70 lowercase font-normal">choose domain</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-black/50 border border-white/15 focus:border-[#a3e635] focus:ring-2 focus:ring-[#a3e635]/20 text-white text-sm font-mono-code outline-none transition-all appearance-none cursor-pointer shadow-inner pr-10"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0b0e14] text-white py-2">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#a3e635]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Quick Select Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {serviceOptions.slice(0, 3).map((pill) => (
                    <button
                      type="button"
                      key={pill}
                      onClick={() => {
                        soundManager.playPop();
                        setFormData((prev) => ({ ...prev, service: pill }));
                      }}
                      className={`text-[10px] font-mono-code px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        formData.service === pill
                          ? 'bg-[#a3e635]/20 border-[#a3e635] text-[#a3e635] font-semibold'
                          : 'bg-white/[0.03] border-white/10 text-white/50 hover:text-white hover:border-white/20'
                      }`}
                    >
                      + {pill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block font-mono-code text-[11px] uppercase tracking-wider text-white/80 font-medium flex items-center justify-between">
                  <span>Project Vision / Details <span className="text-[#a3e635]">*</span></span>
                  <span className="text-[10px] text-[#a3e635] flex items-center gap-1 font-mono-code bg-[#a3e635]/10 px-2 py-0.5 rounded border border-[#a3e635]/20">
                    <CornerDownLeft className="w-3 h-3" />
                    Press Enter ↵ to send
                  </span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onKeyDown={handleTextareaKeyDown}
                  placeholder="Describe your vision, timeline, and goals... (Press Enter to submit, Shift + Enter for new line)"
                  className="w-full px-4 py-3.5 rounded-2xl bg-black/40 border border-white/15 focus:border-[#a3e635] focus:bg-black/60 focus:ring-2 focus:ring-[#a3e635]/20 text-white placeholder:text-white/25 text-sm font-mono-code outline-none transition-all resize-none shadow-inner"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono-code text-white/40 px-1">
                <span>Shift + Enter: New line</span>
                <span className="text-[#a3e635]">Enter ↵ : Instant Transmission</span>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => soundManager.playClick()}
                className="w-full group py-4 sm:py-4.5 rounded-2xl bg-gradient-to-r from-[#a3e635] via-[#bef264] to-[#a3e635] hover:brightness-110 text-slate-950 font-display font-black text-sm sm:text-base uppercase tracking-wider shadow-[0_0_30px_rgba(163,230,53,0.35)] flex items-center justify-center gap-3 transition-all cursor-pointer disabled:opacity-50"
                data-cursor="button"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>TRANSMITTING MESSAGE...</span>
                  </div>
                ) : (
                  <>
                    <span>TRANSMIT MESSAGE</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </>
                )}
              </motion.button>

              {/* Success Feedback */}
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-[#a3e635]/15 border border-[#a3e635]/40 text-[#a3e635] text-xs font-mono-code flex items-center gap-2.5"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Message dispatched successfully to Sinan's Admin Portal! Reply will be sent within 2-4 hours.</span>
                </motion.div>
              )}

              {/* Error Feedback */}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-mono-code flex items-center gap-2.5"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                  <span>{submitError}</span>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
