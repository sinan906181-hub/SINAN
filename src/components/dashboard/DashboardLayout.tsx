import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Bot, 
  HardDrive, 
  BarChart3, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Sparkles, 
  Plus, 
  User, 
  ChevronDown,
  Globe,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';

export type DashboardTab = 
  | 'overview' 
  | 'projects' 
  | 'tasks' 
  | 'ai' 
  | 'files' 
  | 'analytics' 
  | 'admin' 
  | 'settings';

interface DashboardLayoutProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  onBackToHome: () => void;
  onOpenCreateProject: () => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activeTab,
  onTabChange,
  onBackToHome,
  onOpenCreateProject,
  children,
}) => {
  const { userProfile, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showInfo } = useToast();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban className="w-4 h-4" />, count: '4' },
    { id: 'tasks', label: 'Tasks & Sprints', icon: <CheckSquare className="w-4 h-4" />, count: '5' },
    { id: 'ai', label: 'Nexora AI Copilot', icon: <Bot className="w-4 h-4 text-cyan-400" />, badge: 'v3.0' },
    { id: 'files', label: 'Asset Storage', icon: <HardDrive className="w-4 h-4" /> },
    { id: 'analytics', label: 'Telemetry & Metrics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'admin', label: 'Admin Console', icon: <ShieldCheck className="w-4 h-4 text-amber-400" />, adminOnly: true },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const notifications = [
    { id: 1, title: 'AI Copilot Optimized Shard #4', time: '10m ago', unread: true },
    { id: 2, title: 'Sarah Vance completed task on Edge Cluster', time: '1h ago', unread: true },
    { id: 3, title: 'Firestore Real-time sync healthy', time: '3h ago', unread: false },
  ];

  const handleLogout = async () => {
    await logout();
    onBackToHome();
  };

  return (
    <div className="min-h-screen bg-[#070a10] dark:bg-[#070a10] light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 flex flex-col lg:flex-row">
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex flex-col justify-between w-64 border-r border-white/10 dark:border-white/10 light:border-slate-200 bg-[#090d15]/90 dark:bg-[#090d15]/90 light:bg-white backdrop-blur-xl p-4 shrink-0 select-none z-30">
        <div>
          {/* Brand header */}
          <div className="flex items-center justify-between px-2 py-3 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5 shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-[#090d15] rounded-[9px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="font-display font-black text-base tracking-tight text-white dark:text-white light:text-slate-900 block leading-tight">
                  NEXORA
                </span>
                <span className="text-[10px] font-mono-code text-cyan-400 block">Workspace Cloud</span>
              </div>
            </div>

            <button
              onClick={onBackToHome}
              title="Return to Public Landing Page"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Create Project Button */}
          <button
            onClick={onOpenCreateProject}
            className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-600 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 mb-6 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>New Project</span>
          </button>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id as DashboardTab)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/10 text-cyan-300 dark:text-cyan-300 light:text-indigo-600 border border-cyan-500/30 shadow-sm font-bold'
                      : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:bg-white/[0.04] dark:hover:bg-white/[0.04] light:hover:bg-slate-100 hover:text-white dark:hover:text-white light:hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-code font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                      {item.badge}
                    </span>
                  )}
                  {item.count && (
                    <span className="text-[10px] font-mono-code text-slate-500">{item.count}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout Bottom Area */}
        <div className="pt-4 border-t border-white/10 dark:border-white/10 light:border-slate-200">
          <div className="p-3 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-100 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center font-bold text-xs text-slate-950 shrink-0 overflow-hidden">
                {userProfile?.photoURL ? (
                  <img src={userProfile.photoURL} alt={userProfile.displayName} className="w-full h-full object-cover" />
                ) : (
                  userProfile?.displayName?.charAt(0) || 'N'
                )}
              </div>
              <div className="truncate">
                <span className="text-xs font-bold text-white dark:text-white light:text-slate-900 truncate block">
                  {userProfile?.displayName || 'Nexora User'}
                </span>
                <span className="text-[10px] font-mono-code text-cyan-400 uppercase">
                  {userProfile?.plan || 'pro'} plan
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR */}
        <header className="h-16 px-4 sm:px-6 border-b border-white/10 dark:border-white/10 light:border-slate-200 bg-[#090d15]/80 dark:bg-[#090d15]/80 light:bg-white/80 backdrop-blur-xl flex items-center justify-between gap-4 sticky top-0 z-20">
          {/* Mobile Menu Trigger & Search */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Quick search projects, tasks, or prompt AI..."
                className="w-full pl-10 pr-4 py-1.5 rounded-xl bg-white/[0.04] dark:bg-white/[0.04] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 text-xs text-white dark:text-white light:text-slate-900 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          {/* Right Topbar Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white/[0.04] dark:bg-white/[0.04] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors cursor-pointer"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl bg-white/[0.04] dark:bg-white/[0.04] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 text-slate-400 hover:text-white transition-colors relative cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-[#0e1320] border border-white/10 shadow-2xl p-4 z-50 text-white">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                    <span className="text-xs font-bold font-display">System Notifications</span>
                    <span className="text-[10px] font-mono-code text-cyan-400">3 New</span>
                  </div>
                  <div className="space-y-2">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2 rounded-xl bg-white/[0.03] text-xs space-y-0.5">
                        <p className="font-semibold text-slate-200">{n.title}</p>
                        <span className="text-[10px] text-slate-400 font-mono-code">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Back to Landing Link */}
            <button
              onClick={onBackToHome}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Landing Page</span>
            </button>
          </div>
        </header>

        {/* Dynamic Main View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* MOBILE SLIDE-OUT DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#090d15] border-r border-white/10 p-5 flex flex-col justify-between lg:hidden shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <span className="font-display font-black text-lg text-white">NEXORA</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id as DashboardTab);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                        activeTab === item.id
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-cyan-400/20 text-cyan-300 font-mono-code">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
