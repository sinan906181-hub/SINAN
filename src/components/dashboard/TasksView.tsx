import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  Clock, 
  User, 
  Tag, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';
import { Task } from '../../types';
import { useToast } from '../../context/ToastContext';

export const TasksView: React.FC = () => {
  const { tasks, projects, addTask, updateTask, deleteTask, toggleTaskStatus } = useProjects();
  const { showSuccess, showError } = useToast();

  const [activeTab, setActiveTab] = useState<'board' | 'list'>('board');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newProjectId, setNewProjectId] = useState(projects[0]?.id || 'p-1');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('high');
  const [newStatus, setNewStatus] = useState<'todo' | 'in-progress' | 'review' | 'completed'>('todo');

  const columns: { id: 'todo' | 'in-progress' | 'review' | 'completed'; label: string; color: string }[] = [
    { id: 'todo', label: 'To Do', color: 'border-slate-500/30 text-slate-300' },
    { id: 'in-progress', label: 'In Progress', color: 'border-cyan-500/30 text-cyan-300' },
    { id: 'review', label: 'Code Review', color: 'border-violet-500/30 text-violet-300' },
    { id: 'completed', label: 'Done & Verified', color: 'border-emerald-500/30 text-emerald-300' },
  ];

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      await addTask({
        projectId: newProjectId,
        title: newTitle,
        description: newDesc || 'Sprint task',
        status: newStatus,
        priority: newPriority,
        assignee: 'Lead Architect',
        dueDate: 'Sprint 14',
        tags: ['sprint-14'],
      });
      showSuccess('Sprint task initialized');
      setNewTitle('');
      setNewDesc('');
      setShowAddModal(false);
    } catch (err: any) {
      showError('Failed to add task', err.message);
    }
  };

  const handleMoveStatus = (taskId: string, currentStatus: Task['status']) => {
    const order: Task['status'][] = ['todo', 'in-progress', 'review', 'completed'];
    const nextIdx = (order.indexOf(currentStatus) + 1) % order.length;
    updateTask(taskId, { status: order[nextIdx] });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white dark:text-white light:text-slate-900 flex items-center gap-2.5">
            <CheckSquare className="w-7 h-7 text-cyan-400" />
            <span>Tasks & Sprint Kanban</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time multi-agent sprint orchestration with instant Firestore replication.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('board')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                activeTab === 'board' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              Kanban Board
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                activeTab === 'list' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              List View
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Quick Add Modal */}
      {showAddModal && (
        <div className="p-6 rounded-3xl bg-[#0e1320] border border-cyan-500/30 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Create Sprint Task</span>
            </h3>
            <button onClick={() => setShowAddModal(false)} className="text-xs text-slate-400 hover:text-white">
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreateTask} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Implement WebAuthn passkeys"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Assign to Project</label>
                <select
                  value={newProjectId}
                  onChange={(e) => setNewProjectId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#090d15] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
              <input
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Details, subtasks, or links to specs..."
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-[#090d15] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical (P0)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Initial Column</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-[#090d15] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Code Review</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs shadow-md cursor-pointer"
              >
                Add to Sprint
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Kanban Columns View */}
      {activeTab === 'board' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);

            return (
              <div
                key={col.id}
                className="p-4 rounded-3xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 min-h-[420px] flex flex-col justify-between"
              >
                <div>
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
                    <span className="font-mono-code font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        col.id === 'todo' ? 'bg-slate-400' :
                        col.id === 'in-progress' ? 'bg-cyan-400' :
                        col.id === 'review' ? 'bg-violet-400' : 'bg-emerald-400'
                      }`} />
                      {col.label}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-[10px] font-mono-code text-slate-400">
                      {colTasks.length}
                    </span>
                  </div>

                  {/* Tasks List */}
                  <div className="space-y-3">
                    {colTasks.map((t) => {
                      const proj = projects.find((p) => p.id === t.projectId);

                      return (
                        <motion.div
                          key={t.id}
                          layout
                          className="p-4 rounded-2xl bg-white/[0.04] dark:bg-white/[0.04] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-cyan-400/40 transition-all shadow-md group"
                        >
                          <div className="flex items-center justify-between gap-1 mb-2">
                            <span className="text-[10px] font-mono-code text-cyan-400 truncate max-w-[120px]">
                              {proj?.name || 'Project'}
                            </span>
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono-code font-bold ${
                              t.priority === 'critical' ? 'bg-rose-500/20 text-rose-300' :
                              t.priority === 'high' ? 'bg-amber-500/20 text-amber-300' :
                              'bg-slate-500/20 text-slate-400'
                            }`}>
                              {t.priority}
                            </span>
                          </div>

                          <h4 className="font-bold text-xs text-white dark:text-white light:text-slate-900 leading-snug mb-1.5">
                            {t.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                            {t.description}
                          </p>

                          <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                            <button
                              onClick={() => handleMoveStatus(t.id, t.status)}
                              className="text-[10px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                              title="Advance to next column"
                            >
                              <span>Next stage</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </button>

                            <button
                              onClick={() => deleteTask(t.id)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                              title="Delete task"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setNewStatus(col.id);
                    setShowAddModal(true);
                  }}
                  className="mt-4 w-full py-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-dashed border-white/10 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Task</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* List Mode */
        <div className="p-4 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 overflow-x-auto shadow-xl">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono-code uppercase">
                <th className="pb-3">Task Title</th>
                <th className="pb-3">Project</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tasks.map((t) => {
                const proj = projects.find((p) => p.id === t.projectId);
                return (
                  <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => toggleTaskStatus(t.id)}
                          className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer ${
                            t.status === 'completed' ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-500'
                          }`}
                        >
                          {t.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                        </button>
                        <span className={`font-semibold ${t.status === 'completed' ? 'line-through text-slate-500' : 'text-white'}`}>
                          {t.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-slate-400">{proj?.name || 'Workspace'}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-white/10 text-cyan-300">
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="text-[10px] font-mono-code capitalize text-slate-400">{t.priority}</span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => deleteTask(t.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
