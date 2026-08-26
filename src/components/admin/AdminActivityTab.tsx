import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  X,
  Code2,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  Sparkles,
} from 'lucide-react';
import { ActivityLog } from '../../types/admin';
import { soundManager } from '../../utils/audio';

interface AdminActivityTabProps {
  logs: ActivityLog[];
  onExportLogs: () => void;
  onClearLogs: () => void;
}

export const AdminActivityTab: React.FC<AdminActivityTabProps> = ({
  logs,
  onExportLogs,
  onClearLogs,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [viewingLog, setViewingLog] = useState<ActivityLog | null>(null);

  const categories = ['All', 'Auth', 'Deployment', 'Database', 'Security', 'API'];
  const statuses = ['All', 'success', 'warning', 'info', 'error'];

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.ip.includes(search);
    const matchesCategory = selectedCategory === 'All' || log.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || log.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: ActivityLog['status']) => {
    switch (status) {
      case 'success':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono-code">
            <CheckCircle2 className="w-3 h-3" />
            Success
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-mono-code">
            <AlertTriangle className="w-3 h-3" />
            Warning
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[11px] font-mono-code">
            <AlertCircle className="w-3 h-3" />
            Error
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[11px] font-mono-code">
            <Info className="w-3 h-3" />
            Info
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* Top Filter & Action Bar */}
      <div className="p-5 rounded-3xl bg-[#0c101a]/80 border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search audit action, user, or IP address..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50 font-mono-code"
            />
          </div>

          {/* Export & Clear Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playPop();
                onExportLogs();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => {
                soundManager.playPop();
                onClearLogs();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs text-rose-400 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Filtered</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
          <span className="text-[11px] font-mono-code text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundManager.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table Container */}
      <div className="rounded-3xl bg-[#0c101a]/80 border border-white/10 shadow-xl overflow-hidden">
        {filteredLogs.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <Info className="w-8 h-8 text-slate-500 mx-auto" />
            <h4 className="font-bold text-white text-base">No Matching Audit Records</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search keywords or resetting category filters.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
                setSelectedStatus('All');
              }}
              className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-mono-code"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 font-mono-code text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-semibold">Timestamp</th>
                  <th className="py-3.5 px-4 font-semibold">Action & Category</th>
                  <th className="py-3.5 px-4 font-semibold">Actor / User</th>
                  <th className="py-3.5 px-4 font-semibold">Client IP</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                    onClick={() => setViewingLog(log)}
                  >
                    <td className="py-3.5 px-4 font-mono-code text-slate-400 text-[11px] whitespace-nowrap">
                      {log.timestamp}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <div className="font-medium text-white group-hover:text-amber-300 transition-colors">
                          {log.action}
                        </div>
                        <span className="inline-block text-[10px] font-mono-code text-amber-400/80">
                          [{log.category}]
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono-code text-slate-300 text-[11px] whitespace-nowrap">
                      {log.user}
                    </td>

                    <td className="py-3.5 px-4 font-mono-code text-slate-400 text-[11px] whitespace-nowrap">
                      {log.ip}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(log.status)}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          soundManager.playPop();
                          setViewingLog(log);
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                        title="View payload JSON"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* JSON Payload Inspection Modal */}
      {viewingLog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setViewingLog(null)}
        >
          <div
            className="w-full max-w-xl p-6 rounded-2xl bg-[#0f1422] border border-white/10 shadow-2xl space-y-4 text-slate-200 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-amber-400" />
                <h3 className="font-display font-bold text-base text-white">
                  Audit Record #{viewingLog.id}
                </h3>
              </div>
              <button
                onClick={() => setViewingLog(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5 font-mono-code">
                <div>
                  <span className="text-slate-400 block text-[10px]">TIMESTAMP:</span>
                  <span className="text-white font-semibold">{viewingLog.timestamp}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">CATEGORY:</span>
                  <span className="text-amber-400 font-semibold">{viewingLog.category}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">USER:</span>
                  <span className="text-slate-200">{viewingLog.user}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">ORIGIN IP:</span>
                  <span className="text-slate-200">{viewingLog.ip}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider block mb-1">
                  Structured Payload Trace:
                </span>
                <pre className="p-4 rounded-xl bg-black/60 border border-white/10 text-emerald-300 font-mono-code text-xs overflow-x-auto">
                  {JSON.stringify(viewingLog.details, null, 2)}
                </pre>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setViewingLog(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              >
                Close Trace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
