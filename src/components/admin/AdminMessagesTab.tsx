import React, { useState } from 'react';
import {
  Mail,
  Search,
  CheckCircle2,
  Trash2,
  Star,
  Archive,
  Send,
  ExternalLink,
  MessageSquare,
  Clock,
  User,
  Filter,
  RefreshCw,
  Sparkles,
  Inbox,
  AlertCircle,
  Phone,
  CheckCheck,
  Zap,
  Eye,
  Check,
} from 'lucide-react';
import { ContactInquiry } from '../../types/admin';
import { soundManager } from '../../utils/audio';

interface AdminMessagesTabProps {
  inquiries: ContactInquiry[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onToggleStar: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onDeleteDirect?: (id: string, firestoreDocId?: string, silent?: boolean) => void;
  onForwardToChat: (inquiry: ContactInquiry) => void;
  onToast?: (title: string, description?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const QUICK_RESPONSE_PRESETS = [
  'Thank you for reaching out! I would love to connect and discuss this further.',
  "I reviewed your inquiry and I'm available for freelance and full-time creative roles.",
  'Could we schedule a brief Google Meet or WhatsApp call to go over your vision?',
  'Received your note. I will share project estimates and timeline shortly.',
];

export const AdminMessagesTab: React.FC<AdminMessagesTabProps> = ({
  inquiries,
  onMarkAsRead,
  onMarkAllAsRead,
  onToggleStar,
  onArchive,
  onDelete,
  onDeleteDirect,
  onForwardToChat,
  onToast,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(
    inquiries.length > 0 ? inquiries[0].id : null
  );
  const [filterTab, setFilterTab] = useState<'all' | 'unread' | 'starred' | 'archived'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [quickReplyText, setQuickReplyText] = useState('');

  // Auto-delete on view setting (persisted)
  const [autoDeleteOnView, setAutoDeleteOnView] = useState<boolean>(() => {
    return localStorage.getItem('sinan_autodelete_on_view') === 'true';
  });

  const toggleAutoDeleteOnView = () => {
    soundManager.playPop();
    const nextVal = !autoDeleteOnView;
    setAutoDeleteOnView(nextVal);
    localStorage.setItem('sinan_autodelete_on_view', String(nextVal));
    if (onToast) {
      onToast(
        nextVal ? 'Auto-Delete on View Activated' : 'Auto-Delete on View Deactivated',
        nextVal
          ? 'Messages will be automatically deleted after you review them.'
          : 'Messages will stay in inbox until manually deleted or replied.',
        'info'
      );
    }
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    if (filterTab === 'unread' && inq.read) return false;
    if (filterTab === 'starred' && !inq.starred) return false;
    if (filterTab === 'archived' && inq.status !== 'archived') return false;
    if (filterTab !== 'archived' && inq.status === 'archived') return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        inq.name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.topic.toLowerCase().includes(q) ||
        inq.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const selectedInquiry =
    inquiries.find((inq) => inq.id === selectedId) ||
    (filteredInquiries.length > 0 ? filteredInquiries[0] : null);

  const unreadCount = inquiries.filter((i) => !i.read && i.status !== 'archived').length;
  const totalCount = inquiries.filter((i) => i.status !== 'archived').length;

  const handleSelectInquiry = (inq: ContactInquiry) => {
    soundManager.playClick();
    setSelectedId(inq.id);
    if (!inq.read) {
      onMarkAsRead(inq.id);
    }
  };

  // Direct Gmail Dispatch & Auto-Delete
  const handleOpenGmailReply = (inquiry: ContactInquiry, autoDelete = true) => {
    soundManager.playClick();
    const subject = `Re: ${inquiry.topic} - Response from Sinan K`;
    const responseNote = quickReplyText.trim() || 'Thank you for reaching out through my portfolio! I reviewed your message and would love to collaborate.';
    const body = `Hi ${inquiry.name},\n\n${responseNote}\n\n---\nOriginal Note from ${inquiry.name} (${inquiry.date}):\n"${inquiry.message}"\n\nBest regards,\nHafiz Muhammed Sinan K\nCreative Developer & Designer\nMalappuram, Kerala, India\nPortfolio: https://sinan.dev`;

    // Direct Web Gmail Compose URL (opens Gmail in a new tab with recipient, subject, and drafted body ready to send)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      inquiry.email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, '_blank', 'noopener,noreferrer');

    if (autoDelete) {
      if (onDeleteDirect) {
        onDeleteDirect(inquiry.id, inquiry.firestoreDocId, true);
      } else {
        onDelete(inquiry.id);
      }
      setQuickReplyText('');
      if (onToast) {
        onToast(
          'Gmail Opened & Message Deleted',
          `Opened Gmail compose for ${inquiry.email}. Note has been automatically cleared from inbox.`,
          'success'
        );
      }
    } else {
      if (onToast) {
        onToast(
          'Gmail Compose Opened',
          `Opened Gmail compose for ${inquiry.email}. Message retained in your inbox.`,
          'info'
        );
      }
    }
  };

  // Immediate "Seen & Delete" action (one-click deletion without modal)
  const handleSeenAndDelete = (inquiry: ContactInquiry) => {
    soundManager.playSuccess();
    if (onDeleteDirect) {
      onDeleteDirect(inquiry.id, inquiry.firestoreDocId, true);
    } else {
      onDelete(inquiry.id);
    }
    if (onToast) {
      onToast(
        'Message Viewed & Deleted',
        `Inquiry from "${inquiry.name}" permanently cleared from inbox and cloud storage.`,
        'info'
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Metric Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-[#0c101a]/80 border border-white/10 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-lg text-white flex items-center gap-2">
              <span>Contact Inquiries & Messages</span>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-mono-code font-bold text-xs">
                  {unreadCount} New
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-400">
              Direct client notes & submissions from your portfolio contact section.
            </p>
          </div>
        </div>

        {/* Top Actions: Auto-delete toggle & Mark All Read */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Auto-Delete on View Toggle */}
          <button
            onClick={toggleAutoDeleteOnView}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono-code transition-all flex items-center gap-2 ${
              autoDeleteOnView
                ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-semibold shadow-sm'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
            }`}
            title="When active, viewing a message allows instant auto-delete"
          >
            <Zap className={`w-3.5 h-3.5 ${autoDeleteOnView ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`} />
            <span>Delete on View: {autoDeleteOnView ? 'ON' : 'OFF'}</span>
          </button>

          {unreadCount > 0 && (
            <button
              onClick={() => {
                soundManager.playSuccess();
                onMarkAllAsRead();
              }}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono-code text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mark All Read</span>
            </button>
          )}

          <a
            href="https://chat.google.com/"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-xs font-mono-code transition-colors flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Google Chat</span>
          </a>
        </div>
      </div>

      {/* Main Messages Workspace: 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Filter Tabs & Message List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search bar & filter pills */}
          <div className="p-4 rounded-2xl bg-[#0c101a]/80 border border-white/10 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search sender, email, topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setFilterTab('all')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  filterTab === 'all'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                All ({totalCount})
              </button>
              <button
                onClick={() => setFilterTab('unread')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  filterTab === 'unread'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setFilterTab('starred')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  filterTab === 'starred'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Starred
              </button>
              <button
                onClick={() => setFilterTab('archived')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  filterTab === 'archived'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Archived
              </button>
            </div>
          </div>

          {/* List of Messages */}
          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredInquiries.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-[#0c101a]/40 border border-white/5 space-y-2">
                <Inbox className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400 font-medium">No inquiries found in this category.</p>
              </div>
            ) : (
              filteredInquiries.map((inq) => {
                const isSelected = selectedInquiry?.id === inq.id;
                return (
                  <div
                    key={inq.id}
                    onClick={() => handleSelectInquiry(inq)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'bg-amber-400/10 border-amber-400/40 shadow-md'
                        : inq.read
                        ? 'bg-[#0c101a]/60 border-white/5 hover:border-white/15'
                        : 'bg-[#121726] border-amber-400/20 hover:border-amber-400/30'
                    }`}
                  >
                    {!inq.read && (
                      <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm" />
                    )}

                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white truncate max-w-[140px]">
                          {inq.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-amber-300 font-mono-code truncate">
                          {inq.topic}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono-code text-slate-500 shrink-0">
                        {inq.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {inq.message}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono-code">
                      <span className="truncate max-w-[160px]">{inq.email}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleStar(inq.id);
                          }}
                          className="p-1 hover:text-amber-400 transition-colors"
                          title={inq.starred ? 'Unstar message' : 'Star message'}
                        >
                          <Star
                            className={`w-3.5 h-3.5 ${
                              inq.starred ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                            }`}
                          />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onDeleteDirect) {
                              onDeleteDirect(inq.id, inq.firestoreDocId, false);
                            } else {
                              onDelete(inq.id);
                            }
                          }}
                          className="p-1 hover:text-rose-400 text-slate-600 transition-colors"
                          title="Quick delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Detailed Reader & Action Console (7 cols) */}
        <div className="lg:col-span-7">
          {selectedInquiry ? (
            <div className="p-6 rounded-3xl bg-[#0c101a]/90 border border-white/10 shadow-xl space-y-6">
              {/* Auto-Delete Notification Banner if enabled */}
              {autoDeleteOnView && (
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-amber-300">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Auto-Delete on View active for this note.</span>
                  </div>
                  <button
                    onClick={() => handleSeenAndDelete(selectedInquiry)}
                    className="px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono-code text-[11px] transition-all shrink-0 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete Now</span>
                  </button>
                </div>
              )}

              {/* Header Details */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-white/10">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono-code text-xs font-semibold">
                      {selectedInquiry.topic}
                    </span>
                    <span className="text-xs font-mono-code text-slate-400">
                      ID: {selectedInquiry.id}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-white">
                    {selectedInquiry.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono-code flex-wrap">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(selectedInquiry.email)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 hover:underline flex items-center gap-1"
                      title="Open in Gmail"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{selectedInquiry.email}</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{selectedInquiry.date}</span>
                    </span>
                  </div>
                </div>

                {/* Primary Action Buttons Header */}
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  {/* One-Click Seen & Delete button (as requested) */}
                  <button
                    onClick={() => handleSeenAndDelete(selectedInquiry)}
                    className="px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 hover:text-white text-xs font-mono-code transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    title="Mark as viewed and delete immediately"
                  >
                    <CheckCheck className="w-3.5 h-3.5 text-rose-400" />
                    <span>Seen & Delete</span>
                  </button>

                  <button
                    onClick={() => onToggleStar(selectedInquiry.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      selectedInquiry.starred
                        ? 'bg-amber-400/20 border-amber-400 text-amber-400'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                    title={selectedInquiry.starred ? 'Unstar' : 'Star'}
                  >
                    <Star className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onArchive(selectedInquiry.id)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
                    title={selectedInquiry.status === 'archived' ? 'Unarchive' : 'Archive'}
                  >
                    <Archive className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDelete(selectedInquiry.id)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Delete permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Body Content */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 block">
                  Original Visitor Message
                </span>
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap selection:bg-amber-400/30">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Quick Response & Direct Gmail Dispatch */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400">
                    Draft Reply via Gmail
                  </span>
                  <span className="text-[10px] text-amber-400/90 font-mono-code">
                    Opens directly in Gmail Compose
                  </span>
                </div>

                {/* Preset Quick Starters */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {QUICK_RESPONSE_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQuickReplyText(preset)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-400/15 border border-white/5 hover:border-amber-400/30 text-[11px] text-slate-300 hover:text-amber-300 transition-colors text-left"
                    >
                      {preset.slice(0, 36)}...
                    </button>
                  ))}
                </div>

                <textarea
                  rows={3}
                  value={quickReplyText}
                  onChange={(e) => setQuickReplyText(e.target.value)}
                  placeholder={`Draft quick reply to ${selectedInquiry.name} (will be placed into your Gmail compose window)...`}
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-slate-500 outline-none focus:border-amber-400 transition-colors"
                />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onForwardToChat(selectedInquiry)}
                      className="px-3.5 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-xs font-mono-code transition-colors flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Forward to Google Chat</span>
                    </button>

                    <button
                      onClick={() => handleOpenGmailReply(selectedInquiry, false)}
                      className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-mono-code transition-colors"
                      title="Open Gmail compose and keep this note in your inbox"
                    >
                      <span>Reply (Keep)</span>
                    </button>
                  </div>

                  {/* Primary Action Button: Reply in Gmail & Auto-Delete as requested! */}
                  <button
                    onClick={() => handleOpenGmailReply(selectedInquiry, true)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-[#d4f83a] hover:brightness-110 text-slate-950 font-bold text-xs font-display shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Reply via Gmail & Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-[#0c101a]/60 border border-white/5 space-y-3">
              <Mail className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="font-bold text-sm text-slate-300">No Inquiry Selected</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Choose any contact submission on the left list to read the full note and send a response.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
