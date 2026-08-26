import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  Calendar, 
  Tag, 
  ArrowRight, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Bot, 
  Layers, 
  Sparkles,
  Trash2
} from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';
import { Project } from '../../types';

interface ProjectsViewProps {
  onOpenCreateProject: () => void;
  onOpenProjectDetail: (projectId: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  onOpenCreateProject,
  onOpenProjectDetail,
}) => {
  const { projects } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white dark:text-white light:text-slate-900 flex items-center gap-2.5">
            <FolderKanban className="w-7 h-7 text-cyan-400" />
            <span>Active Project Workspaces</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage distributed cloud clusters, sprint backlogs, and real-time synchronized repositories.
          </p>
        </div>

        <button
          onClick={onOpenCreateProject}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-600 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Provision New Project</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, tags, or technology..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] dark:bg-white/[0.04] light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-200 text-xs text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {['all', 'ai', 'cloud', 'security', 'platform'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase transition-colors shrink-0 cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-white/[0.02] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid / List view toggle */}
        <div className="flex items-center gap-1 border-l border-white/10 pl-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white/10 text-cyan-300' : 'text-slate-400'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white/10 text-cyan-300' : 'text-slate-400'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Projects Display */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
          <FolderKanban className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="font-display font-bold text-base text-white">No matching projects found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search criteria or create a brand new workspace cluster.
          </p>
          <button
            onClick={onOpenCreateProject}
            className="px-4 py-2 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-xs font-bold text-cyan-300 cursor-pointer"
          >
            Create Project
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => onOpenProjectDetail(proj.id)}
              className="p-6 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-cyan-400/40 transition-all hover:-translate-y-1 shadow-xl flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                    {proj.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold ${
                    proj.status === 'in-progress' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                    proj.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {proj.status}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white dark:text-white light:text-slate-900 group-hover:text-cyan-300 transition-colors mb-2">
                  {proj.name}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {proj.description}
                </p>

                {/* Progress bar */}
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Milestone Progress</span>
                    <span className="font-mono-code font-bold text-cyan-400">{proj.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>

                {/* Tag chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(proj.tags || []).slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/[0.04] text-slate-400 border border-white/5">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{proj.dueDate || 'Sprint 14'}</span>
                </span>
                <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Inspect <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 overflow-x-auto shadow-xl">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono-code uppercase">
                <th className="pb-3">Project Title</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Budget</th>
                <th className="pb-3">Progress</th>
                <th className="pb-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProjects.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => onOpenProjectDetail(p.id)}
                  className="hover:bg-white/[0.02] cursor-pointer transition-colors"
                >
                  <td className="py-3.5 font-bold text-white dark:text-white light:text-slate-900">
                    {p.name}
                  </td>
                  <td className="py-3.5 text-slate-400 capitalize">{p.category}</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-emerald-400 font-bold">{p.budget || '$10,000'}</td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                      <span className="font-mono-code text-slate-400">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-right">
                    <button className="px-3 py-1 rounded-lg bg-white/[0.05] hover:bg-cyan-400/20 text-cyan-300 font-semibold transition-colors">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
