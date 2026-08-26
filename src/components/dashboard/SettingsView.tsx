import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  User, 
  Key, 
  ShieldCheck, 
  Palette, 
  Bell, 
  Copy, 
  Check, 
  Save, 
  RefreshCw,
  Sun,
  Moon,
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';

export const SettingsView: React.FC = () => {
  const { userProfile, updateProfileData, resetPassword } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showSuccess, showInfo, showError } = useToast();

  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [apiKey, setApiKey] = useState('nx_live_99f4a8e8b21c4308a0d9b621e5f03912');
  const [copiedKey, setCopiedKey] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfileData({ displayName });
      showSuccess('Profile updated successfully');
    } catch (err: any) {
      showError('Failed to update profile', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    showSuccess('API Key copied to clipboard');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRollApiKey = () => {
    const newKey = `nx_live_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;
    setApiKey(newKey);
    showSuccess('New API Secret Key generated');
  };

  const handlePasswordReset = async () => {
    if (!email) return;
    try {
      await resetPassword(email);
      showInfo('Password reset instructions dispatched to your email');
    } catch (err: any) {
      showError('Password reset failed', err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div>
        <h1 className="font-display font-black text-2xl sm:text-3xl text-white dark:text-white light:text-slate-900 flex items-center gap-2.5">
          <Settings className="w-7 h-7 text-cyan-400" />
          <span>Account & Workspace Settings</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure personal credentials, API keys, security passkeys, and appearance themes.
        </p>
      </div>

      {/* Profile Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 shadow-xl">
        <h3 className="font-display font-bold text-lg text-white dark:text-white light:text-slate-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-400" />
          <span>Personal Information</span>
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handlePasswordReset}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer"
            >
              Send Password Reset Email
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 font-bold text-xs shadow-md cursor-pointer"
            >
              {saving ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Security & API Keys */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* API Key Manager */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Key className="w-5 h-5 text-cyan-400" />
            <h3 className="font-display font-bold text-base text-white dark:text-white light:text-slate-900">
              Workspace API Key
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Authenticate programmatic requests to our OpenAPI 3.0 endpoints and TypeScript SDK.
          </p>

          <div className="flex items-center gap-2">
            <input
              type="password"
              readOnly
              value={apiKey}
              className="flex-1 px-3 py-2 rounded-xl bg-[#080b11] border border-white/10 text-xs font-mono-code text-cyan-300 select-all"
            />
            <button
              onClick={handleCopyApiKey}
              className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Copy key"
            >
              {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={handleRollApiKey}
              className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
              title="Roll key"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Security / 2FA Settings */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-display font-bold text-base text-white dark:text-white light:text-slate-900">
              Zero-Trust Security
            </h3>
          </div>

          <div className="space-y-3">
            <div
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between cursor-pointer"
            >
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white block">Biometric WebAuthn Passkeys</span>
                <span className="text-[10px] text-slate-400">TouchID, FaceID or FIDO2 hardware keys</span>
              </div>
              <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${twoFactorEnabled ? 'bg-cyan-400' : 'bg-slate-700'}`}>
                <div className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${twoFactorEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </div>

            <div
              onClick={() => setEmailNotifications(!emailNotifications)}
              className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between cursor-pointer"
            >
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white block">Security & Deployment Alerts</span>
                <span className="text-[10px] text-slate-400">Email digests when new clusters are provisioned</span>
              </div>
              <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${emailNotifications ? 'bg-cyan-400' : 'bg-slate-700'}`}>
                <div className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${emailNotifications ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
