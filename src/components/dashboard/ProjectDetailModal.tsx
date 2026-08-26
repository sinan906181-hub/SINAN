import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Trash2, 
  CheckSquare, 
  Calendar, 
  DollarSign, 
  Tag, 
  User, 
  Plus, 
  Zap,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';
import { useToast } from '../../context/ToastContext';

interface ProjectDetailModalProps {
  projectId: string | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  projectId,
  onClose,
}) => {
  const { projects, tasks, updateProject, deleteProject, addTask, toggleTaskStatus } = useProjects();
  const { showSuccess, showError } = useToast();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [addingTask, setAddingTask] = useState(false);

  const project = projects.find((p) => p.id === projectId);
  if (!project) return null;

  const projectTasks = tasks.filter((t) => t.projectId === project.id);

  const handleProgressChange = (newProgress: number) => {
    const status = newProgress === 100 ? 'completed' : newProgress === 0 ? 'planning' : 'in-progress';
    updateProject(project.id, { progress: newProgress, status });
  };

  const handleAddNewTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      await addTask({
        projectId: project.id,
        title: newTaskTitle,
        description: 'Assigned via Project inspector',
        status: 'todo',
        priority: 'medium',
        assignee: 'Team Member',
        dueDate: project.dueDate,
        tags: [project.category],
      });
      setNewTaskTitle('');
      setAddingTask(false);
      showSuccess('Task added to project');
    } catch (err: any) {
      showError('Failed to add task', err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${project.name}"? This action cannot be undone.`)) {
      try {
        await deleteProject(project.id);
        showSuccess('Project deleted successfully');
        onClose();
      } catch (err: any) {
        showError('Delete failed', err.message);
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99990] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl rounded-3xl bg-[#0d111a] border border-white/10 p-6 sm:p-8 shadow-2xl text-white z-10 select-none overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Top Bar */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                  {project.category}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase ${
                  project.priority === 'critical' ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20' :
                  project.priority === 'high' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' :
                  'bg-slate-500/10 text-slate-300 border border-slate-500/20'
                }`}>
                  {project.priority} Priority
                </span>
              </div>
              <h3 className="font-display font-black text-2xl text-white">
                {project.name}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDelete}
                className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Delete project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content (Scrollable) */}
          <div className="overflow-y-auto py-4 space-y-6 flex-1 pr-1">
            {/* Description */}
            <div>
              <h4 className="text-xs font-mono-code uppercase font-semibold text-slate-400 mb-1.5">
                Project Overview & Milestones
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-3.5 rounded-2xl border border-white/5">
                {project.description || 'No description provided for this cluster.'}
              </p>
            </div>

            {/* Interactive Progress Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold text-slate-300">Completion Milestone</span>
                <span className="font-mono-code font-bold text-cyan-400">{project.progress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={project.progress}
                onChange={(e) => handleProgressChange(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Metadata Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] font-mono-code text-slate-400 block mb-0.5">Budget</span>
                <span className="text-xs font-bold text-emerald-400">{project.budget || '$15,000'}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] font-mono-code text-slate-400 block mb-0.5">Target Due</span>
                <span className="text-xs font-bold text-slate-200">{project.dueDate || 'Flexible'}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] font-mono-code text-slate-400 block mb-0.5">Status</span>
                <span className="text-xs font-bold text-cyan-300 capitalize">{project.status}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] font-mono-code text-slate-400 block mb-0.5">Active Tasks</span>
                <span className="text-xs font-bold text-violet-300">{projectTasks.length} Assigned</span>
              </div>
            </div>

            {/* Associated Tasks Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-mono-code uppercase font-semibold text-slate-400">
                  Sprint Tasks & Sub-items ({projectTasks.length})
                </h4>
                <button
                  onClick={() => setAddingTask(!addingTask)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Task</span>
                </button>
              </div>

              {addingTask && (
                <form onSubmit={handleAddNewTask} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    autoFocus
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Enter sprint task title..."
                    className="flex-1 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
                  >
                    Add
                  </button>
                </form>
              )}

              <div className="space-y-2">
                {projectTasks.length === 0 ? (
                  <p className="text-xs text-slate-500 py-3 text-center">No sprint tasks assigned yet.</p>
                ) : (
                  projectTasks.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => toggleTaskStatus(t.id)}
                      className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          t.status === 'completed'
                            ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                            : 'border-slate-500'
                        }`}>
                          {t.status === 'completed' && <CheckSquare className="w-3 h-3" />}
                        </div>
                        <span className={`text-xs ${t.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                          {t.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono-code text-slate-400 capitalize">{t.priority}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Team Members */}
            <div>
              <h4 className="text-xs font-mono-code uppercase font-semibold text-slate-400 mb-2">
                Assigned Team Collaborators
              </h4>
              <div className="flex flex-wrap gap-2">
                {(project.members || ['Architect', 'AI Agent Copilot']).map((mem, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{mem}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
