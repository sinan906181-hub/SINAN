import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Download, 
  RefreshCw, 
  Cpu, 
  Globe2, 
  Zap, 
  Database,
  ArrowUpRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { useToast } from '../../context/ToastContext';

export const AnalyticsView: React.FC = () => {
  const { showSuccess } = useToast();
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d');

  const latencyData = [
    { time: '00:00', edgeLatency: 28, dbQuery: 12, aiInference: 140 },
    { time: '04:00', edgeLatency: 32, dbQuery: 14, aiInference: 135 },
    { time: '08:00', edgeLatency: 45, dbQuery: 18, aiInference: 160 },
    { time: '12:00', edgeLatency: 52, dbQuery: 22, aiInference: 180 },
    { time: '16:00', edgeLatency: 48, dbQuery: 19, aiInference: 155 },
    { time: '20:00', edgeLatency: 34, dbQuery: 15, aiInference: 142 },
  ];

  const projectCostData = [
    { name: 'Quantum Core', cost: 1240, tokens: 680 },
    { name: 'Edge Gateway', cost: 890, tokens: 420 },
    { name: 'SOC2 IAM Engine', cost: 650, tokens: 210 },
    { name: 'Autonomous Copilot', cost: 1580, tokens: 920 },
  ];

  const clusterRegions = [
    { region: 'US-West (Silicon Valley)', ping: '18ms', status: 'Optimal', load: '38%' },
    { region: 'US-East (Virginia)', ping: '24ms', status: 'Optimal', load: '44%' },
    { region: 'EU-Central (Frankfurt)', ping: '62ms', status: 'Optimal', load: '51%' },
    { region: 'AP-East (Tokyo)', ping: '84ms', status: 'Optimal', load: '32%' },
  ];

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Timestamp,EdgeLatencyMs,DBQueryMs,AIInferenceMs\n" +
      latencyData.map(e => `${e.time},${e.edgeLatency},${e.dbQuery},${e.aiInference}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nexora-telemetry-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showSuccess('Telemetry report exported as CSV');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white dark:text-white light:text-slate-900 flex items-center gap-2.5">
            <BarChart3 className="w-7 h-7 text-cyan-400" />
            <span>Telemetry & Infrastructure Observability</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time latency metrics, AI token allocations, compute costs, and global edge cluster health.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Time range selector */}
          <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
            {(['24h', '7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  timeRange === range ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200 flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Latency & Compute Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Latency Area Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-bold text-base text-white dark:text-white light:text-slate-900">
                End-to-End Latency Profiles (ms)
              </h3>
              <p className="text-xs text-slate-400">Comparing Edge DNS, Firestore queries, and LLM inferences</p>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> AI Inference
              </span>
              <span className="flex items-center gap-1 text-indigo-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-indigo-400" /> Edge CDN
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={latencyData}>
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1117',
                    borderColor: '#30363d',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="aiInference" stroke="#06b6d4" strokeWidth={2} fill="#06b6d4" fillOpacity={0.15} name="AI Inference (ms)" />
                <Area type="monotone" dataKey="edgeLatency" stroke="#6366f1" strokeWidth={2} fill="#6366f1" fillOpacity={0.15} name="Edge Latency (ms)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compute & Token Allocation Bar */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-base text-white dark:text-white light:text-slate-900 mb-1">
              Monthly Compute Attribution
            </h3>
            <p className="text-xs text-slate-400 mb-4">Cost breakdown per active micro-workspace</p>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectCostData} layout="vertical">
                  <XAxis type="number" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={10} width={90} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0d1117',
                      borderColor: '#30363d',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="cost" fill="#06b6d4" radius={[0, 6, 6, 0]} name="Compute ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Global Regional Edge Health Grid */}
      <div className="p-6 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-base text-white dark:text-white light:text-slate-900 flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-cyan-400" />
            <span>Global Edge Cluster Health Matrix (42 Nodes)</span>
          </h3>
          <span className="text-[10px] font-mono-code text-emerald-400 font-bold">
            ● 100% Regional Node Health
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {clusterRegions.map((reg, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{reg.region}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-400">
                <span>Round-trip:</span>
                <span className="text-cyan-400 font-bold">{reg.ping}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-400">
                <span>CPU Load:</span>
                <span className="text-emerald-400">{reg.load}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
