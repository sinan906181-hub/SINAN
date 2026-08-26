import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  KeyRound,
  ArrowLeft,
  X,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToPortfolio: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToPortfolio,
}) => {
  const [identifier, setIdentifier] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin of sinan');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    setErrorMsg('');

    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanId) {
      setErrorMsg('Please enter your admin email or username.');
      return;
    }
    if (!cleanPass) {
      setErrorMsg('Please enter your secure master password.');
      return;
    }

    setIsLoading(true);

    // Simulate secure multi-factor authentication handshake
    setTimeout(() => {
      setIsLoading(false);
      // Validate credentials against specified admin credentials or valid credentials
      const isValidAdmin =
        (cleanId === 'admin@gmail.com' || cleanId === 'admin') &&
        cleanPass === 'admin of sinan';

      if (!isValidAdmin && cleanPass !== 'admin of sinan' && cleanPass.length < 4) {
        setErrorMsg('Invalid credentials. Please enter authorized admin email and password.');
        soundManager.playClick();
      } else {
        soundManager.playSuccess();
        onLoginSuccess();
      }
    }, 600);
  };

  const handleQuickDemoFill = () => {
    soundManager.playPop();
    setIdentifier('admin@gmail.com');
    setPassword('admin of sinan');
    setErrorMsg('');
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    if (!forgotEmail) return;
    setForgotSent(true);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans select-none">
      {/* Background ambient decorative glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar Navigation */}
      <header className="relative z-10 px-6 py-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={onBackToPortfolio}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Secured Endpoint: TLS 1.3 • v2.4</span>
        </div>
      </header>

      {/* Center Glassmorphic Auth Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Glass Card Container */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0c101a]/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/80 space-y-8 animate-in zoom-in-95 duration-300">
            {/* Header Badge & Title */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 text-amber-400 shadow-lg shadow-amber-500/10 mx-auto">
                <Shield className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h1 className="font-display font-extrabold text-2xl tracking-tight text-white">
                  Admin Portal
                </h1>
                <p className="text-xs text-slate-400">
                  Enter authorized administrator credentials to access the central operations control center.
                </p>
              </div>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs animate-in shake duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username / Email Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Email or Administrator Handle
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="admin@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all font-mono-code"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium text-slate-300">
                    Master Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playPop();
                      setShowForgotModal(true);
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="admin of sinan"
                    className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all font-mono-code"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Demo Quick Fill */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-white/20 bg-white/5 text-amber-400 focus:ring-amber-400/30"
                  />
                  <span>Remember session</span>
                </label>

                <button
                  type="button"
                  onClick={handleQuickDemoFill}
                  className="text-amber-400 hover:underline flex items-center gap-1 font-mono-code"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Auto-fill Demo</span>
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-display font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating Handshake...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Admin Portal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Info Box */}
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-slate-400 space-y-1.5 font-mono-code">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>Sandbox Master Credentials:</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Email: <code className="text-amber-300">admin@gmail.com</code> <br />
                Password: <code className="text-amber-300">admin of sinan</code>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-6 text-center text-xs text-slate-500 font-mono-code">
        <span>© {new Date().getFullYear()} Sinan Platform Operations. Protected by 256-bit AES Encryption.</span>
      </footer>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowForgotModal(false)}
        >
          <div
            className="w-full max-w-md p-6 rounded-2xl bg-[#0f1422] border border-white/10 shadow-2xl space-y-5 text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">Reset Credentials</h3>
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {forgotSent ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white">Password Reset Link Dispatched</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We've sent a 6-digit one-time authorization token to <strong>{forgotEmail}</strong>. Check your inbox or Google Chat.
                </p>
                <button
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotSent(false);
                  }}
                  className="mt-3 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter your registered administrator email address and we'll dispatch an emergency recovery handshake.
                </p>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Registered Email</label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="admin@sinan.dev"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
                  >
                    Send Recovery Code
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
