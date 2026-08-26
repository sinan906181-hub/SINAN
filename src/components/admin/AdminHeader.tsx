import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  MessageSquare,
  Globe,
  Plus,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Zap,
} from 'lucide-react';
import { AdminTab, NotificationItem } from '../../types/admin';
import { useTheme } from '../../context/ThemeContext';
import { soundManager } from '../../utils/audio';

interface AdminHeaderProps {
  currentTab: AdminTab;
  onMobileMenuToggle: () => void;
  onBackToPortfolio: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onQuickAction: (actionType: string) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentTab,
  onMobileMenuToggle,
  onBackToPortfolio,
  searchQuery,
  onSearchChange,
  notifications,
  onMarkNotificationRead,
  onQuickAction,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const tabTitles: Record<AdminTab, { title: string; subtitle: string }> = {
    dashboard: {
      title: 'Operational Dashboard',
      subtitle: 'Real-time telemetry, API metrics & system infrastructure overview.',
    },
    messages: {
      title: 'Contact Inquiries & Messages',
      subtitle: 'Incoming portfolio notes, client inquiries & direct communication dispatch.',
    },
    overview: {
      title: 'Infrastructure Overview',
      subtitle: 'Cloud Run nodes, cluster utilization and regional response maps.',
    },
    activity: {
      title: 'Security & Audit Logs',
      subtitle: 'Complete forensic audit stream with IP and payload traces.',
    },
    notifications: {
      title: 'System Notifications',
      subtitle: 'Operational alerts, webhook queues and messaging events.',
    },
    settings: {
      title: 'Portal & API Settings',
      subtitle: 'Webhook endpoints, Google Chat integrations and security controls.',
    },
  };

  return (
    <header className="sticky top-0 z-20 bg-[#090c15]/90 dark:bg-[#090c15]/90 light:bg-white/90 backdrop-blur-xl border-b border-white/10 dark:border-white/10 light:border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 select-none">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="sm:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-amber-400 font-semibold capitalize">{currentTab}</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold font-display text-white dark:text-white light:text-slate-900 leading-tight">
            {tabTitles[currentTab].title}
          </h2>
        </div>
      </div>

      {/* Center: Quick Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-xs relative">
        <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={`Search ${currentTab}...`}
          className="w-full pl-9 pr-8 py-1.5 rounded-xl bg-white/[0.04] dark:bg-white/[0.04] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 text-xs text-white dark:text-white light:text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 text-xs text-slate-400 hover:text-white"
          >
            ×
          </button>
        )}
      </div>

      {/* Right: Actions, Google Chat, Status, Notifications, Theme */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono-code">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Operational (99.99%)</span>
        </div>

        {/* Google Chat Direct Launcher */}
        <a
          href="https://chat.google.com/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 text-sky-300 text-xs font-medium transition-colors"
          title="Open Google Chat (https://chat.google.com/)"
        >
          <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">Google Chat</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>

        {/* Quick Action Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              soundManager.playPop();
              setShowQuickMenu(!showQuickMenu);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-bold font-display shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quick Action</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {showQuickMenu && (
            <div
              className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#0f1422] border border-white/10 shadow-2xl p-1.5 space-y-1 text-xs text-slate-200 z-50 animate-in fade-in zoom-in-95 duration-150"
              onClick={() => setShowQuickMenu(false)}
            >
              <button
                onClick={() => onQuickAction('flush_cdn')}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/10 text-left transition-colors"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Flush CDN Cache</span>
              </button>
              <button
                onClick={() => onQuickAction('create_backup')}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/10 text-left transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-emerald-400" />
                <span>Create Cloud Snapshot</span>
              </button>
              <button
                onClick={() => onQuickAction('send_alert')}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/10 text-left transition-colors"
              >
                <Bell className="w-4 h-4 text-sky-400" />
                <span>Broadcast System Alert</span>
              </button>
            </div>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => {
              soundManager.playPop();
              setShowNotifDropdown(!showNotifDropdown);
            }}
            className="relative p-2 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-[#090c15]" />
            )}
          </button>

          {showNotifDropdown && (
            <div
              className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0f1422] border border-white/10 shadow-2xl p-3 space-y-3 text-xs text-slate-200 z-50 animate-in fade-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-bold text-sm text-white">System Alerts</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono-code text-[10px]">
                  {unreadCount} unread
                </span>
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2">
                {notifications.slice(0, 4).map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => onMarkNotificationRead(notif.id)}
                    className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      notif.read
                        ? 'bg-white/[0.02] border-white/5 opacity-70'
                        : 'bg-amber-500/10 border-amber-500/20 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span>{notif.title}</span>
                      <span className="text-[10px] text-slate-400">{notif.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href="https://chat.google.com/"
                target="_blank"
                rel="noreferrer"
                className="block text-center py-1.5 text-xs text-sky-400 hover:underline"
              >
                Forward logs to Google Chat →
              </a>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* Back to Public Site */}
        <button
          onClick={onBackToPortfolio}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-colors"
          title="Return to Public Portfolio"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span>Exit Portal</span>
        </button>
      </div>
    </header>
  );
};
