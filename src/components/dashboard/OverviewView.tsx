import React from 'react';
import { motion } from 'motion/react';
import { 
  FolderKanban, 
  CheckSquare, 
  Bot, 
  Activity, 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  Clock, 
  Plus, 
  ShieldCheck, 
  Zap, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';
import { useProjects } from '../../context/ProjectContext';
import { useAuth } from '../../context/AuthContext';
import { DashboardTab } from './DashboardLayout';

interface OverviewViewProps {
  onTabChange: (tab: DashboardTab) => void;
  onOpenCreateProject: () => void;
  onOpenProjectDetail: (projectId: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onTabChange,
  onOpenCreateProject,
  onOpenProjectDetail,
}) => {
  const { projects, tasks, activities } = useProjects();
  const { userProfile } = useAuth();

  // Metrics calculations
  const totalProjects = projects.length;
  const activeTasks = tasks.filter((t) => t.status !== 'completed').length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const avgProgress = Math.round(
    projects.reduce((acc, p) => acc + p.progress, 0) / (projects.length || 1)
  );

  // Velocity Mock Data for Chart
  const velocityData = [
    { day: 'Mon', commits: 14, aiTokens: 120, latency: 42 },
    { day: 'Tue', commits: 28, aiTokens: 240, latency: 38 },
    { day: 'Wed', commits: 45, aiTokens: 380, latency: 41 },
    { day: 'Thu', commits: 32, aiTokens: 290, latency: 35 },
    { day: 'Fri', commits: 56, aiTokens: 490, latency: 34 },
    { day: 'Sat', commits: 18, aiTokens: 150, latency: 39 },
    { day: 'Sun', commits: 24, aiTokens: 210, latency: 36 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/30 to-cyan-950/40 border border-white/10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-[10px] font-mono-code font-bold uppercase">
              Operational Workspace
            </span>
            <span className="text-slate-400 text-xs font-mono-code">Edge Region: US-West (Silicon Valley)</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            Welcome back, {userProfile?.displayName || 'Architect'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            All 4 active cloud clusters are healthy. <strong>{activeTasks} sprint tasks</strong> require team attention today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <button
            onClick={() => onTabChange('ai')}
            className="px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Consult AI Copilot</span>
          </button>
          <button
            onClick={onOpenCreateProject}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Project</span>
          </button>
        </div>
      </div>

      {/* KPI Stats 4-Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono-code uppercase text-slate-400 block mb-1">
              Active Projects
            </span>
            <div className="font-display font-black text-2xl text-white dark:text-white light:text-slate-900">
              {totalProjects}
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
              ● All in healthy state
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <FolderKanban className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono-code uppercase text-slate-400 block mb-1">
              Pending Sprint Tasks
            </span>
            <div className="font-display font-black text-2xl text-cyan-400">
              {activeTasks}
            </div>
            <span className="text-[10px] text-slate-400 font-semibold mt-1 block">
              {completedTasks} completed this sprint
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <CheckSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono-code uppercase text-slate-400 block mb-1">
              AI Token Throughput
            </span>
            <div className="font-display font-black text-2xl text-violet-400">
              1.88M
            </div>
            <span className="text-[10px] text-violet-300 font-semibold mt-1 block">
              ↑ 22% model usage
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
            <Bot className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono-code uppercase text-slate-400 block mb-1">
              Global Mesh Uptime
            </span>
            <div className="font-display font-black text-2xl text-emerald-400">
              99.99%
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
              34ms avg edge response
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Activity className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Visual Charts & Telemetry Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sprint Velocity Area Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-bold text-base text-white dark:text-white light:text-slate-900">
                Team Engineering Velocity & AI Operations
              </h3>
              <p className="text-xs text-slate-400">Daily telemetry commits and synthesized prompts</p>
            </div>
            <span className="px-2 py-1 rounded-md bg-white/[0.05] text-[10px] font-mono-code text-cyan-400 font-bold border border-white/5">
              Live Feed
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={velocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="aiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
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
                <Area type="monotone" dataKey="aiTokens" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#aiGradient)" name="AI Prompts (k)" />
                <Area type="monotone" dataKey="commits" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#commitGradient)" name="Commits" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations & Insights Card */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-gradient-to-b from-indigo-950/40 to-[#0c101a] border border-indigo-500/20 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-cyan-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Nexora Autonomous AI</h4>
                <span className="text-[10px] font-mono-code text-cyan-400">Insight Engine</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              "Based on Sprint 14 burn-down rates, your team will conclude the <strong>Vector Database Migration</strong> 2 days ahead of schedule. Consider allocating surplus capacity to the <strong>SOC2 Biometric Audit</strong>."
            </p>

            <div className="space-y-2.5 border-t border-white/10 pt-4">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-300">Estimated Cost Savings:</span>
                <span className="font-bold text-emerald-400">+$1,450/mo</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-300">Query Cache Hit Ratio:</span>
                <span className="font-bold text-cyan-400">99.4%</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onTabChange('ai')}
            className="mt-6 w-full py-2.5 rounded-xl bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 text-xs font-bold text-cyan-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Open AI Agent Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Projects Table & Live Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Projects Table */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-base text-white dark:text-white light:text-slate-900">
              Active Projects & Health
            </h3>
            <button
              onClick={() => onTabChange('projects')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>View All ({projects.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-mono-code uppercase">
                  <th className="pb-3 font-semibold">Project Name</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Progress</th>
                  <th className="pb-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.slice(0, 4).map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-bold text-white dark:text-white light:text-slate-900">
                      {p.name}
                    </td>
                    <td className="py-3 text-slate-400 capitalize">
                      {p.category}
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold ${
                        p.status === 'in-progress' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' :
                        p.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                        'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono-code text-slate-400">{p.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => onOpenProjectDetail(p.id)}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/10 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Activity Stream */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-base text-white dark:text-white light:text-slate-900">
              Live Activity Stream
            </h3>
            <span className="text-[10px] font-mono-code text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Synced
            </span>
          </div>

          <div className="space-y-3">
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs text-slate-200 truncate">
                    <span className="font-bold text-white">{act.userName}</span> {act.description}
                  </p>
                  <span className="text-[10px] font-mono-code text-slate-400">
                    {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
