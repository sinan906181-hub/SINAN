import React from 'react';
import {
  Server,
  Cpu,
  HardDrive,
  Globe,
  Zap,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Activity,
  Radio,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { SERVER_NODES } from '../../data/adminData';
import { soundManager } from '../../utils/audio';

interface AdminOverviewTabProps {
  onPingNode: (nodeName: string) => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({ onPingNode }) => {
  return (
    <div className="space-y-8 select-none">
      {/* Infrastructure Health Summary Banner */}
      <div className="p-6 rounded-3xl bg-[#0c101a]/80 border border-white/10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-extrabold text-xl text-white">
                Global Infrastructure Healthy
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono-code">
                Grade A+
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              All 4 edge container clusters operational across Asia, Europe and US regions. Zero active outages.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono-code">
          <div className="text-center p-3 rounded-2xl bg-white/[0.03] border border-white/5 min-w-[100px]">
            <span className="text-slate-400 block text-[10px] uppercase">Avg Latency</span>
            <span className="text-base font-bold text-emerald-400">32 ms</span>
          </div>
          <div className="text-center p-3 rounded-2xl bg-white/[0.03] border border-white/5 min-w-[100px]">
            <span className="text-slate-400 block text-[10px] uppercase">Availability</span>
            <span className="text-base font-bold text-amber-400">99.99%</span>
          </div>
        </div>
      </div>

      {/* Edge Server Clusters Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              Cloud Run & Edge Node Deployments
            </h3>
            <p className="text-xs text-slate-400">
              Live hardware allocation and packet round-trip times.
            </p>
          </div>
          <span className="text-xs font-mono-code text-slate-400">
            4 / 4 Nodes Online
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVER_NODES.map((node) => (
            <div
              key={node.id}
              className="p-5 rounded-2xl bg-[#0c101a]/80 border border-white/10 hover:border-amber-400/30 transition-all shadow-lg space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 text-amber-400 border border-white/10">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{node.name}</h4>
                    <span className="text-[11px] font-mono-code text-slate-400">
                      Region: {node.region}
                    </span>
                  </div>
                </div>

                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono-code">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Healthy
                </span>
              </div>

              {/* Gauges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono-code">
                    <span className="text-slate-400">CPU Usage</span>
                    <span className="text-white font-bold">{node.cpu}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${node.cpu}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono-code">
                    <span className="text-slate-400">RAM Memory</span>
                    <span className="text-white font-bold">{node.memory}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-sky-400 rounded-full transition-all duration-500"
                      style={{ width: `${node.memory}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Node Stats & Ping */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs font-mono-code">
                <div className="flex items-center gap-4 text-slate-400">
                  <span>Latency: <strong className="text-slate-200">{node.latency}ms</strong></span>
                  <span>Uptime: <strong className="text-slate-200">{node.uptime}</strong></span>
                </div>

                <button
                  onClick={() => {
                    soundManager.playPop();
                    onPingNode(node.name);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <Radio className="w-3 h-3" />
                  <span>Ping Node</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Storage & Bandwidth Quotas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cloud Storage */}
        <div className="p-6 rounded-3xl bg-[#0c101a]/80 border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Cloud Storage Allocation</h4>
              <p className="text-xs text-slate-400">Encrypted multi-region bucket</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono-code">
              <span className="text-slate-300">Used: 38.4 GB</span>
              <span className="text-slate-400">Limit: 250 GB</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full w-[15.3%]" />
            </div>
            <span className="text-[11px] text-slate-400 font-mono-code block text-right">
              15.3% utilized (211.6 GB free)
            </span>
          </div>
        </div>

        {/* Global CDN Bandwidth */}
        <div className="p-6 rounded-3xl bg-[#0c101a]/80 border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-400/10 text-sky-400 border border-sky-400/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Monthly Bandwidth</h4>
              <p className="text-xs text-slate-400">Edge caching & egress</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono-code">
              <span className="text-slate-300">Transferred: 412 GB</span>
              <span className="text-slate-400">Plan: 2,000 GB</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-500 to-sky-300 rounded-full w-[20.6%]" />
            </div>
            <span className="text-[11px] text-slate-400 font-mono-code block text-right">
              20.6% consumed • Resets in 11 days
            </span>
          </div>
        </div>

        {/* Google Chat Stream Health */}
        <div className="p-6 rounded-3xl bg-[#0c101a]/80 border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-400/10 text-indigo-400 border border-indigo-400/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Google Chat Webhook</h4>
              <p className="text-xs text-slate-400">https://chat.google.com/</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between font-mono-code">
              <span className="text-slate-400">Delivery Status:</span>
              <span className="text-emerald-400 font-bold">100% Delivered</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between font-mono-code">
              <span className="text-slate-400">Last Webhook Dispatch:</span>
              <span className="text-slate-200">2 mins ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
