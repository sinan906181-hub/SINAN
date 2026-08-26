import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Shield,
  MessageSquare,
  Trash2,
  CheckCheck,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { NotificationItem } from '../../types/admin';
import { soundManager } from '../../utils/audio';

interface AdminNotificationsTabProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onDismissNotification: (id: string) => void;
  onForwardToChat: (notif: NotificationItem) => void;
}

export const AdminNotificationsTab: React.FC<AdminNotificationsTabProps> = ({
  notifications,
  onMarkAllRead,
  onDismissNotification,
  onForwardToChat,
}) => {
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filtered = notifications.filter((n) => {
    if (priorityFilter === 'all') return true;
    return n.priority === priorityFilter;
  });

  const getPriorityBadge = (priority: NotificationItem['priority']) => {
    switch (priority) {
      case 'high':
        return (
          <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-mono-code font-bold">
            HIGH
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono-code font-bold">
            MED
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[10px] font-mono-code font-bold">
            LOW
          </span>
        );
    }
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'security':
        return <Shield className="w-5 h-5 text-indigo-400" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-sky-400" />;
      case 'system':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* Top Banner & Filter Controls */}
      <div className="p-6 rounded-3xl bg-[#0c101a]/80 border border-white/10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-lg text-white">
            Operational Alerts & Messages
          </h3>
          <p className="text-xs text-slate-400">
            Real-time webhook and infrastructure notification queue.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Priority filter buttons */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
            {(['all', 'high', 'medium', 'low'] as const).map((p) => (
              <button
                key={p}
                onClick={() => {
                  soundManager.playClick();
                  setPriorityFilter(p);
                }}
                className={`px-3 py-1 rounded-lg capitalize transition-all ${
                  priorityFilter === p
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              soundManager.playPop();
              onMarkAllRead();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark All as Read</span>
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="py-16 text-center space-y-3 p-8 rounded-3xl bg-[#0c101a]/80 border border-white/10">
            <Bell className="w-8 h-8 text-slate-500 mx-auto" />
            <h4 className="font-bold text-white text-base">Notification Queue Clear</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              All infrastructure alerts have been acknowledged.
            </p>
          </div>
        ) : (
          filtered.map((notif) => (
            <div
              key={notif.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                notif.read
                  ? 'bg-[#0c101a]/60 border-white/5 opacity-80'
                  : 'bg-[#0f1422] border-amber-500/30 shadow-lg'
              }`}
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
                  {getIcon(notif.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-white">{notif.title}</h4>
                    {getPriorityBadge(notif.priority)}
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{notif.message}</p>
                  <span className="text-[11px] font-mono-code text-slate-500 block">
                    Received {notif.time}
                  </span>
                </div>
              </div>

              {/* Actions: Forward to Google Chat & Dismiss */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => {
                    soundManager.playPop();
                    onForwardToChat(notif);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 text-xs font-medium transition-colors"
                  title="Forward notification to Google Chat"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send to Chat</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    onDismissNotification(notif.id);
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Dismiss notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
