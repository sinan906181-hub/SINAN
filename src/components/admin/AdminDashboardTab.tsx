import React from 'react';
import {
  Activity,
  Cpu,
  Zap,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Server,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  HardDrive,
  Database,
  Globe,
  Radio,
  ExternalLink,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import {
  ADMIN_METRICS,
  CHART_TRAFFIC_DATA,
  CHART_RESOURCE_DATA,
  SERVER_NODES,
} from '../../data/adminData';
import { ActivityLog, ContactInquiry } from '../../types/admin';
import { soundManager } from '../../utils/audio';
import { usePhotoVisibility } from '../../utils/usePhotoVisibility';

interface AdminDashboardTabProps {
  recentLogs: ActivityLog[];
  onTriggerAction: (actionName: string) => void;
  onNavigateTab: (tab: any) => void;
  inquiries?: ContactInquiry[];
}

export const AdminDashboardTab: React.FC<AdminDashboardTabProps> = ({
  recentLogs,
  onTriggerAction,
  onNavigateTab,
  inquiries = [],
}) => {
  const { hidePhoto, toggleHidePhoto } = usePhotoVisibility();
  const unreadInquiries = inquiries.filter((i) => !i.read && i.status !== 'archived');
  const getIcon = (name: string) => {
    switch (name) {
      case 'Activity':
        return <Activity className="w-5 h-5 text-amber-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-sky-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-emerald-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8 select-none">
      {/* Top Banner Alert / Quick Google Chat Status */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-500/10 via-amber-500/5 to-indigo-500/10 border border-sky-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <span>Google Chat Channel Integrated</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono-code text-[10px]">
                ● Live Sync Active
              </span>
            </h4>
            <p className="text-xs text-slate-300">
              System alerts, deployment notifications, and contact inquiries are being streamed to Google Chat.
            </p>
          </div>
        </div>

        <a
          href="https://chat.google.com/"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-sky-500/20 shrink-0"
        >
          <span>Launch Google Chat</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Incoming Contact Inquiries Highlight Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-[#0c101a] border border-amber-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-extrabold text-base text-white">
                Client & Visitor Inquiries
              </h3>
              {unreadInquiries.length > 0 ? (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-mono-code font-bold animate-pulse">
                  {unreadInquiries.length} New Unread
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono-code">
                  All Caught Up
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300">
              {unreadInquiries.length > 0
                ? `Latest from ${unreadInquiries[0].name} (${unreadInquiries[0].topic}): "${unreadInquiries[0].message.slice(0, 65)}..."`
                : `${inquiries.length} total contact messages routed to your Admin Console.`}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playPop();
            onNavigateTab('messages');
          }}
          className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-display flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 shrink-0"
        >
          <span>Open Messages Inbox</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ADMIN_METRICS.map((metric) => (
          <div
            key={metric.id}
            className="p-5 rounded-2xl bg-[#0c101a]/80 border border-white/10 hover:border-amber-400/30 transition-all shadow-lg space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400">
                {metric.label}
              </span>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                {getIcon(metric.iconName)}
              </div>
            </div>

            <div>
              <span className="font-display font-extrabold text-2xl text-white tracking-tight">
                {metric.value}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5 font-mono-code">
              <span
                className={`flex items-center gap-1 font-bold ${
                  metric.isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {metric.isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {metric.change}
              </span>
              <span className="text-slate-500 text-[11px] truncate">{metric.timeframe}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Traffic & Request Area Chart (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0c101a]/80 border border-white/10 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Live Traffic & Request Stream
              </h3>
              <p className="text-xs text-slate-400">
                Real-time 24-hour ingestion telemetry across edge regions.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono-code">
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                Requests
              </span>
              <span className="flex items-center gap-1.5 text-sky-400">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                Visitors
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_TRAFFIC_DATA}>
                <defs>
                  <linearGradient id="requestsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#ffffff10' }}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#ffffff10' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f1422',
                    borderColor: '#ffffff20',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#f8fafc',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="requests"
                  stroke="#fbbf24"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#requestsGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#visitorsGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Server Resource Distribution Bar Chart (1 Col) */}
        <div className="p-6 rounded-3xl bg-[#0c101a]/80 border border-white/10 shadow-xl space-y-6">
          <div>
            <h3 className="font-display font-bold text-base text-white">
              Weekly Resource Load
            </h3>
            <p className="text-xs text-slate-400">
              Compute CPU and RAM memory allocation by weekday.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_RESOURCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#ffffff10' }}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#ffffff10' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f1422',
                    borderColor: '#ffffff20',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#f8fafc',
                  }}
                />
                <Bar dataKey="cpu" fill="#fbbf24" radius={[4, 4, 0, 0]} name="CPU %" />
                <Bar dataKey="memory" fill="#818cf8" radius={[4, 4, 0, 0]} name="RAM %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Quick Actions & Live Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions Panel */}
        <div className="p-6 rounded-3xl bg-[#0c101a]/80 border border-white/10 shadow-xl space-y-4">
          <div>
            <h3 className="font-display font-bold text-base text-white">
              Operational Actions
            </h3>
            <p className="text-xs text-slate-400">
              Execute routine platform maintenance routines.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Quick Profile Photo Privacy Switch */}
            <button
              onClick={() => {
                soundManager.playPop();
                toggleHidePhoto();
              }}
              className={`col-span-2 p-3.5 rounded-2xl border text-left transition-all group flex items-center justify-between cursor-pointer ${
                hidePhoto
                  ? 'bg-rose-500/10 hover:bg-rose-500/15 border-rose-500/30'
                  : 'bg-lime-500/10 hover:bg-lime-500/15 border-lime-500/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl ${
                    hidePhoto ? 'bg-rose-500/20 text-rose-400' : 'bg-lime-500/20 text-lime-400'
                  }`}
                >
                  {hidePhoto ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Profile Photo: {hidePhoto ? 'Hidden' : 'Visible'}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-mono-code font-bold ${
                        hidePhoto
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-lime-500/20 text-lime-300 border border-lime-500/30'
                      }`}
                    >
                      {hidePhoto ? 'ANONYMOUS MODE' : 'PUBLIC ACTIVE'}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {hidePhoto
                      ? 'Click to show your portrait on public portfolio'
                      : 'Click to hide your portrait on public portfolio'}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold font-mono-code px-3 py-1.5 rounded-xl bg-white/10 text-white group-hover:bg-white/20 transition-colors">
                {hidePhoto ? 'Show Photo' : 'Hide Photo'}
              </span>
            </button>

            <button
              onClick={() => {
                soundManager.playPop();
                onTriggerAction('flush_cdn');
              }}
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-amber-400/10 border border-white/5 hover:border-amber-400/30 text-left transition-all group"
            >
              <Zap className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Purge CDN</div>
              <div className="text-[10px] text-slate-400">Invalidate edge cache</div>
            </button>

            <button
              onClick={() => {
                soundManager.playPop();
                onTriggerAction('create_backup');
              }}
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-emerald-400/10 border border-white/5 hover:border-emerald-400/30 text-left transition-all group"
            >
              <Database className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Cloud Backup</div>
              <div className="text-[10px] text-slate-400">Take DB snapshot</div>
            </button>

            <button
              onClick={() => {
                soundManager.playPop();
                onTriggerAction('sync_chat');
              }}
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-sky-400/10 border border-white/5 hover:border-sky-400/30 text-left transition-all group"
            >
              <MessageSquare className="w-5 h-5 text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Ping Chat</div>
              <div className="text-[10px] text-slate-400">Test webhook link</div>
            </button>

            <button
              onClick={() => {
                soundManager.playPop();
                onTriggerAction('restart_worker');
              }}
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-indigo-400/10 border border-white/5 hover:border-indigo-400/30 text-left transition-all group"
            >
              <RefreshCw className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Restart Worker</div>
              <div className="text-[10px] text-slate-400">Graceful reboot</div>
            </button>
          </div>

          {/* System Nodes Health */}
          <div className="pt-2 border-t border-white/5 space-y-2">
            <span className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 block">
              Edge Server Node Clusters
            </span>
            {SERVER_NODES.slice(0, 2).map((node) => (
              <div
                key={node.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-200 font-medium">{node.name}</span>
                </div>
                <span className="font-mono-code text-slate-400 text-[11px]">{node.latency}ms</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Stream (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0c101a]/80 border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Live Audit & Activity Stream
              </h3>
              <p className="text-xs text-slate-400">
                Latest security, deployment and administrative transactions.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('activity')}
              className="text-xs text-amber-400 hover:text-amber-300 font-mono-code flex items-center gap-1"
            >
              <span>View All Logs</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-white/5">
            {recentLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-4 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold ${
                        log.status === 'success'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : log.status === 'warning'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                      }`}
                    >
                      {log.category}
                    </span>
                    <span className="text-white font-medium">{log.action}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-3 font-mono-code">
                    <span>{log.user}</span>
                    <span>•</span>
                    <span>IP: {log.ip}</span>
                  </div>
                </div>

                <span className="text-[11px] text-slate-500 font-mono-code shrink-0">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
