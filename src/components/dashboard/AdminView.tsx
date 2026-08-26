import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Users, 
  Sliders, 
  Megaphone, 
  Activity, 
  Trash2, 
  Edit, 
  Plus, 
  Lock, 
  Check, 
  AlertTriangle,
  Server
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'developer' | 'viewer';
  plan: 'starter' | 'pro' | 'enterprise';
  status: 'active' | 'suspended';
  lastActive: string;
}

export const AdminView: React.FC = () => {
  const { showSuccess, showInfo } = useToast();
  const { userProfile } = useAuth();

  const [users, setUsers] = useState<ManagedUser[]>([
    { id: 'u-1', name: 'Alex Vance (You)', email: userProfile?.email || 'admin@nexora.cloud', role: 'admin', plan: 'enterprise', status: 'active', lastActive: 'Now' },
    { id: 'u-2', name: 'Dr. Aris Thorne', email: 'aris@apex.cloud', role: 'developer', plan: 'pro', status: 'active', lastActive: '12m ago' },
    { id: 'u-3', name: 'Maya Lin', email: 'maya@synthetix.ai', role: 'developer', plan: 'pro', status: 'active', lastActive: '2h ago' },
    { id: 'u-4', name: 'Darius Vance', email: 'darius@fortress.io', role: 'viewer', plan: 'starter', status: 'active', lastActive: '1d ago' },
  ]);

  const [featureFlags, setFeatureFlags] = useState({
    geminiProV3: true,
    hardwarePasskeys: true,
    zeroDataRetention: true,
    multiRegionReplication: true,
    autonomousCodeRefactor: false,
  });

  const [announcement, setAnnouncement] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'developer' | 'viewer'>('developer');

  const toggleFlag = (key: keyof typeof featureFlags) => {
    setFeatureFlags((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      showInfo(`Feature flag "${String(key)}" updated`);
      return updated;
    });
  };

  const handleBroadcastAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcement.trim()) return;
    showSuccess('Global announcement broadcasted to all active workspace sessions');
    setAnnouncement('');
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const created: ManagedUser = {
      id: `u-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      plan: 'pro',
      status: 'active',
      lastActive: 'Just now',
    };

    setUsers((prev) => [created, ...prev]);
    showSuccess(`Added user ${newUserName} as ${newUserRole}`);
    setNewUserName('');
    setNewUserEmail('');
    setShowAddUserModal(false);
  };

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showSuccess('User access revoked');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white dark:text-white light:text-slate-900 flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-amber-400" />
            <span>Enterprise Sovereign Admin Console</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Zero-Trust identity management, security policies, global feature flags, and broadcast channels.
          </p>
        </div>

        <button
          onClick={() => setShowAddUserModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Add User Inline Modal */}
      {showAddUserModal && (
        <div className="p-6 rounded-3xl bg-[#0e1320] border border-amber-500/30 shadow-2xl">
          <h3 className="font-display font-bold text-base text-white mb-3">Invite Collaborator to Workspace</h3>
          <form onSubmit={handleAddUser} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="Elena Rostova"
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="elena@company.com"
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-[#090d15] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400 flex-1"
              >
                <option value="developer">Developer</option>
                <option value="admin">Administrator</option>
                <option value="viewer">Viewer</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
              >
                Send Invite
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Management Table */}
      <div className="p-6 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-base text-white dark:text-white light:text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <span>Authorized Workspace Accounts ({users.length})</span>
          </h3>
          <span className="text-[10px] font-mono-code text-cyan-400">SOC2 Type II Compliant</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono-code uppercase">
                <th className="pb-3">User</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Subscription</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Last Active</th>
                <th className="pb-3 text-right">Revoke</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5">
                    <div className="flex flex-col">
                      <span className="font-bold text-white dark:text-white light:text-slate-900">{u.name}</span>
                      <span className="text-[11px] text-slate-400">{u.email}</span>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase ${
                      u.role === 'admin' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-cyan-500/10 text-cyan-300'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono-code text-slate-300 capitalize">{u.plan}</td>
                  <td className="py-3.5">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      ● {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-400">{u.lastActive}</td>
                  <td className="py-3.5 text-right">
                    {u.role !== 'admin' && (
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Revoke user token"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feature Flags & Announcement Broadcaster */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Feature Flags */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            <h3 className="font-display font-bold text-base text-white dark:text-white light:text-slate-900">
              Global Platform Feature Flags
            </h3>
          </div>

          <div className="space-y-3">
            {[
              { key: 'geminiProV3', label: 'Gemini 2.5 Pro High-Context Engine', desc: 'Enable 1M token context reasoning for complex repos' },
              { key: 'hardwarePasskeys', label: 'Enforce Biometric Passkeys (WebAuthn)', desc: 'Require FIDO2 keys for all production writes' },
              { key: 'zeroDataRetention', label: 'Zero-Data AI Retention Guarantee', desc: 'Enforce non-training contract flags on LLM calls' },
              { key: 'multiRegionReplication', label: 'Real-time 42-Region Replication', desc: 'Cross-continent state broadcast via Firestore mesh' },
              { key: 'autonomousCodeRefactor', label: 'Autonomous Git PR Refactoring', desc: 'Allow AI agent to open automated bugfix pull requests' },
            ].map((flag) => {
              const enabled = (featureFlags as any)[flag.key];
              return (
                <div
                  key={flag.key}
                  onClick={() => toggleFlag(flag.key as any)}
                  className="p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white dark:text-white light:text-slate-900 block">{flag.label}</span>
                    <span className="text-[10px] text-slate-400">{flag.desc}</span>
                  </div>
                  <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${enabled ? 'bg-cyan-400' : 'bg-slate-700'}`}>
                    <div className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Announcement Broadcaster */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Megaphone className="w-5 h-5 text-amber-400" />
              <h3 className="font-display font-bold text-base text-white dark:text-white light:text-slate-900">
                Workspace Broadcast Channel
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Send priority announcements or maintenance notifications to all logged-in engineers.
            </p>

            <form onSubmit={handleBroadcastAnnouncement} className="space-y-3">
              <textarea
                rows={4}
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                placeholder="e.g., Scheduled database maintenance in EU-Central node at 04:00 UTC..."
                className="w-full p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-400 text-slate-950 font-bold text-xs shadow-md cursor-pointer"
              >
                Broadcast Notice
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-white/5 text-[11px] text-slate-400 flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span>Connected to 4 active engineer client sessions</span>
          </div>
        </div>
      </div>
    </div>
  );
};
