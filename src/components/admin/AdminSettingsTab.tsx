import React, { useState } from 'react';
import {
  Save,
  MessageSquare,
  Shield,
  Sliders,
  Key,
  Globe,
  CheckCircle2,
  Lock,
  ExternalLink,
  Sparkles,
  Eye,
  EyeOff,
} from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { usePhotoVisibility } from '../../utils/usePhotoVisibility';
import sinanPortraitImage from '../../assets/images/regenerated_image_1789091925380.png';

interface AdminSettingsTabProps {
  onSaveSettings: () => void;
}

export const AdminSettingsTab: React.FC<AdminSettingsTabProps> = ({ onSaveSettings }) => {
  const { hidePhoto, toggleHidePhoto } = usePhotoVisibility();
  const [appName, setAppName] = useState('Sinan Platform OS');
  const [googleChatWebhook, setGoogleChatWebhook] = useState(
    'https://chat.googleapis.com/v1/spaces/SPACE_ID/messages'
  );
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [twoFactorRequired, setTwoFactorRequired] = useState(true);
  const [rateLimitPerMinute, setRateLimitPerMinute] = useState(120);
  const [sessionTimeoutHours, setSessionTimeoutHours] = useState(24);
  const [forwardContactToChat, setForwardContactToChat] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccess();
    onSaveSettings();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 select-none max-w-4xl">
      {/* Profile Photo Visibility & Privacy Control */}
      <div className="p-6 rounded-3xl bg-[#0c101a]/80 border border-white/10 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl border ${
                hidePhoto
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  : 'bg-lime-400/10 text-lime-400 border-lime-400/20'
              }`}
            >
              {hidePhoto ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base text-white">
                  Profile Photo Visibility (ഫോട്ടോ പ്രൈവസി)
                </h3>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase ${
                    hidePhoto
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-lime-400/20 text-lime-300 border border-lime-400/30'
                  }`}
                >
                  {hidePhoto ? 'Hidden // Anonymous Mode' : 'Visible // Photo Active'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Control whether your personal portrait is displayed on the public portfolio or replaced by your signature monogram branding.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/15 bg-black shrink-0">
              {hidePhoto ? (
                <div className="w-full h-full bg-gradient-to-br from-[#a3e635]/20 via-[#0e1320] to-black flex items-center justify-center font-display font-black text-sm text-[#a3e635]">
                  SK
                </div>
              ) : (
                <img
                  src={sinanPortraitImage}
                  alt="Sinan Preview"
                  className="w-full h-full object-cover"
                />
              )}
              <span
                className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0c101a] ${
                  hidePhoto ? 'bg-rose-500' : 'bg-lime-400'
                }`}
              />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {hidePhoto
                  ? 'Photo is currently HIDDEN from public visitors'
                  : 'Photo is currently VISIBLE to public visitors'}
              </span>
              <span className="text-[11px] text-slate-400">
                {hidePhoto
                  ? 'Visitors in Hero and Navbar see your high-tech "SK" creative developer emblem.'
                  : 'Visitors in Hero and Navbar see your portrait photo.'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playPop();
              toggleHidePhoto();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-display flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              hidePhoto
                ? 'bg-lime-400 hover:bg-lime-300 text-slate-950 shadow-md shadow-lime-400/20'
                : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30'
            }`}
          >
            {hidePhoto ? (
              <>
                <Eye className="w-4 h-4" />
                <span>Show My Photo</span>
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4" />
                <span>Hide My Photo</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* General SaaS Settings */}
      <div className="p-6 rounded-3xl bg-[#0c101a]/80 border border-white/10 shadow-xl space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-white">General SaaS Configuration</h3>
            <p className="text-xs text-slate-400">Environment branding and operational state</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Application Name</label>
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Environment</label>
            <input
              type="text"
              disabled
              value="Production (Cloud Run asia-southeast1)"
              className="w-full px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-400 font-mono-code cursor-not-allowed"
            />
          </div>
        </div>

        {/* Maintenance Mode Switch */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div>
            <span className="text-xs font-bold text-white block">Maintenance Mode</span>
            <span className="text-[11px] text-slate-400">
              When enabled, visitors will see a graceful standby page while administrators retain access.
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              soundManager.playPop();
              setMaintenanceMode(!maintenanceMode);
            }}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
              maintenanceMode ? 'bg-amber-400' : 'bg-white/10'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                maintenanceMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Google Chat Webhook Integration */}
      <div className="p-6 rounded-3xl bg-[#0c101a]/80 border border-white/10 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-400/10 text-sky-400 border border-sky-400/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Google Chat Integration & Webhook
              </h3>
              <p className="text-xs text-slate-400">
                Direct webhook dispatch to Google Chat space (https://chat.google.com/)
              </p>
            </div>
          </div>

          <a
            href="https://chat.google.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs text-sky-400 hover:underline"
          >
            <span>Open Google Chat</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">
            Incoming Webhook URL
          </label>
          <input
            type="text"
            value={googleChatWebhook}
            onChange={(e) => setGoogleChatWebhook(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white font-mono-code focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div>
            <span className="text-xs font-bold text-white block">Auto-Forward Contact Messages</span>
            <span className="text-[11px] text-slate-400">
              Instantly forward inquiries from the portfolio contact form to your Google Chat workspace.
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              soundManager.playPop();
              setForwardContactToChat(!forwardContactToChat);
            }}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
              forwardContactToChat ? 'bg-sky-400' : 'bg-white/10'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                forwardContactToChat ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Security & Access Policies */}
      <div className="p-6 rounded-3xl bg-[#0c101a]/80 border border-white/10 shadow-xl space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-400/10 text-indigo-400 border border-indigo-400/20">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-white">Security & Access Policies</h3>
            <p className="text-xs text-slate-400">Enforce authentication standards and rate limit thresholds</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="font-medium text-slate-300">WAF Rate Limit (req/min)</label>
              <span className="text-amber-400 font-mono-code font-bold">{rateLimitPerMinute}</span>
            </div>
            <input
              type="range"
              min="30"
              max="300"
              step="10"
              value={rateLimitPerMinute}
              onChange={(e) => setRateLimitPerMinute(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="font-medium text-slate-300">Admin Session Lifetime</label>
              <span className="text-amber-400 font-mono-code font-bold">{sessionTimeoutHours} hrs</span>
            </div>
            <input
              type="range"
              min="1"
              max="72"
              step="1"
              value={sessionTimeoutHours}
              onChange={(e) => setSessionTimeoutHours(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div>
            <span className="text-xs font-bold text-white block">Multi-Factor Authentication (2FA)</span>
            <span className="text-[11px] text-slate-400">
              Mandate hardware security keys or authenticator apps for all administrator accounts.
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              soundManager.playPop();
              setTwoFactorRequired(!twoFactorRequired);
            }}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
              twoFactorRequired ? 'bg-indigo-400' : 'bg-white/10'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                twoFactorRequired ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-display font-bold text-sm shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all cursor-pointer active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </form>
  );
};
