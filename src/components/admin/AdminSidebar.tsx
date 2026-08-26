import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Activity,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  MessageSquare,
  Globe,
  ExternalLink,
  Mail,
} from 'lucide-react';
import { AdminTab, AdminUser } from '../../types/admin';
import { soundManager } from '../../utils/audio';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  user: AdminUser;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onLogoutClick: () => void;
  onBackToPortfolio: () => void;
  unreadCount: number;
  unreadInquiriesCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  user,
  collapsed,
  onToggleCollapse,
  onLogoutClick,
  onBackToPortfolio,
  unreadCount,
  unreadInquiriesCount = 0,
}) => {
  const navItems = [
    {
      id: 'dashboard' as AdminTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'messages' as AdminTab,
      label: 'Inquiries & Messages',
      icon: Mail,
      badge: unreadInquiriesCount > 0 ? `${unreadInquiriesCount} new` : null,
    },
    {
      id: 'overview' as AdminTab,
      label: 'Overview',
      icon: BarChart3,
      badge: null,
    },
    {
      id: 'activity' as AdminTab,
      label: 'Activity Logs',
      icon: Activity,
      badge: 'Live',
    },
    {
      id: 'notifications' as AdminTab,
      label: 'Notifications',
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : null,
    },
    {
      id: 'settings' as AdminTab,
      label: 'Settings',
      icon: Settings,
      badge: null,
    },
  ];

  const handleNavClick = (tabId: AdminTab) => {
    soundManager.playClick();
    onSelectTab(tabId);
  };

  return (
    <aside
      className={`h-screen sticky top-0 bg-[#0a0d16] border-r border-white/10 flex flex-col justify-between transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header & Logo */}
      <div>
        <div className="p-4 flex items-center justify-between border-b border-white/5">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 text-amber-400 flex items-center justify-center shadow-md">
                <Shield className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <span className="font-display font-extrabold text-sm text-white tracking-wider block">
                  SYSTEM OS
                </span>
                <span className="text-[10px] font-mono-code text-amber-400 block -mt-0.5">
                  Admin Portal v2.4
                </span>
              </div>
            </div>
          )}

          {collapsed && (
            <div className="w-9 h-9 mx-auto rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 text-amber-400 flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5" />
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors hidden sm:flex items-center justify-center"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`admin-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-amber-400/10 text-amber-300 font-semibold border border-amber-400/20 shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent'
                } ${collapsed ? 'justify-center px-2' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? 'text-amber-400 scale-110' : 'text-slate-400 group-hover:text-amber-400'
                  }`}
                />
                {!collapsed && <span className="truncate">{item.label}</span>}
                {!collapsed && item.badge !== null && (
                  <span
                    className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold ${
                      isActive
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {collapsed && item.badge !== null && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Integrations, Profile & Logout */}
      <div className="p-3 space-y-2 border-t border-white/5">
        {/* Google Chat Launcher */}
        <a
          href="https://chat.google.com/"
          target="_blank"
          rel="noreferrer"
          className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 text-sky-300 text-xs font-medium transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Open Google Chat (https://chat.google.com/)"
        >
          <MessageSquare className="w-4 h-4 text-sky-400 shrink-0" />
          {!collapsed && (
            <>
              <span className="truncate">Google Chat</span>
              <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
            </>
          )}
        </a>

        {/* Back to Public Portfolio */}
        <button
          onClick={onBackToPortfolio}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
          title="View Public Portfolio"
        >
          <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
          {!collapsed && <span className="truncate">View Public Site</span>}
        </button>

        {/* Profile Details */}
        <div
          className={`flex items-center gap-3 p-2 rounded-xl bg-white/[0.03] border border-white/5 ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <div className="relative shrink-0">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-lg object-cover border border-white/10"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0a0d16]" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogoutClick}
          id="admin-logout-btn"
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Log out of Admin Portal"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};
