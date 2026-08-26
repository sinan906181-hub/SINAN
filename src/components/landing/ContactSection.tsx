import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  MessageSquare, 
  MapPin, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Phone,
  Clock,
  Loader2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const ContactSection: React.FC = () => {
  const { showSuccess, showError } = useToast();

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    interest: 'enterprise',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showError('Please complete all required fields');
      return;
    }

    setLoading(true);
    // Simulate brief network submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showSuccess('Message transmitted successfully!', 'Our solutions engineering team will reply within 2 business hours.');
      setForm({ name: '', email: '', company: '', interest: 'enterprise', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-dot-pattern">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Direct info & contact channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono-code uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white dark:text-white light:text-slate-900 tracking-tight leading-tight">
              Let's architect your next-generation platform.
            </h2>
            <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 text-sm sm:text-base leading-relaxed">
              Whether you need an Enterprise VPC migration demo, custom AI model integration, or volume pricing, our systems architects are here to help.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-mono-code">DIRECT EMAIL</span>
                  <a href="mailto:solutions@nexora.cloud" className="hover:text-cyan-400 font-semibold transition-colors">
                    solutions@nexora.cloud
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-mono-code">RESPONSE TIME</span>
                  <span className="font-semibold">Under 2 hours (24/7 Global SLA)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-indigo-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-mono-code">HEADQUARTERS</span>
                  <span className="font-semibold">500 Howard Street, Suite 400, San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 shadow-2xl backdrop-blur-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-black text-2xl text-white dark:text-white light:text-slate-900">
                    Transmission Acknowledged
                  </h3>
                  <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 text-sm max-w-md mx-auto">
                    Your request has been routed to our Lead Systems Architect. We look forward to connecting shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] dark:bg-white/[0.05] light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-200 text-sm text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] dark:bg-white/[0.05] light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-200 text-sm text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Acme Technologies"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] dark:bg-white/[0.05] light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-200 text-sm text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                        Area of Interest
                      </label>
                      <select
                        value={form.interest}
                        onChange={(e) => setForm({ ...form, interest: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0e1320] dark:bg-[#0e1320] light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-200 text-sm text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-cyan-400 transition-colors"
                      >
                        <option value="enterprise">Enterprise VPC & Sovereign Cloud</option>
                        <option value="ai">AI Multi-Model Copilot Demo</option>
                        <option value="pricing">Volume Team Pricing</option>
                        <option value="security">SOC2 & Security Review</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                      Message & Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your team size, tech stack, or desired integration timeline..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] dark:bg-white/[0.05] light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-200 text-sm text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-600 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmit Message to Architects</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
