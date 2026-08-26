import React, { useState, useEffect } from 'react';
import { AdminTab, ActivityLog, NotificationItem, ToastMessage, ContactInquiry } from '../../types/admin';
import {
  CURRENT_ADMIN,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CONTACT_INQUIRIES,
} from '../../data/adminData';
import { AdminLogin } from './AdminLogin';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminDashboardTab } from './AdminDashboardTab';
import { AdminMessagesTab } from './AdminMessagesTab';
import { AdminOverviewTab } from './AdminOverviewTab';
import { AdminActivityTab } from './AdminActivityTab';
import { AdminNotificationsTab } from './AdminNotificationsTab';
import { AdminSettingsTab } from './AdminSettingsTab';
import { AdminToast } from './AdminToast';
import { AdminConfirmDialog } from './AdminConfirmDialog';
import { soundManager } from '../../utils/audio';
import { db } from '../../firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';

interface AdminPortalProps {
  onBackToPortfolio: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToPortfolio }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('sinan_admin_auth') === 'true';
  });

  // Navigation State
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Data States loaded from persistent storage or initial defaults
  const [logs, setLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('sinan_admin_logs');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('sinan_admin_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    const saved = localStorage.getItem('sinan_admin_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_CONTACT_INQUIRIES;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Listen for real-time contact form submissions from window events AND Firestore
  useEffect(() => {
    // 1. Local window event listener (instant local response)
    const handleContactSubmission = (e: any) => {
      const newInq = e.detail as ContactInquiry;
      if (newInq) {
        setInquiries((prev) => [newInq, ...prev.filter((i) => i.id !== newInq.id)]);
        addToast(`New Inquiry: ${newInq.name}`, `Received note: "${newInq.topic}"`, 'info');
      }
      // Refresh notifications & logs
      const savedNotifs = localStorage.getItem('sinan_admin_notifications');
      if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
      const savedLogs = localStorage.getItem('sinan_admin_logs');
      if (savedLogs) setLogs(JSON.parse(savedLogs));
    };

    window.addEventListener('sinan_contact_submitted', handleContactSubmission);

    // 2. Firestore Cloud real-time subscription
    let unsubscribeFirestore = () => {};
    try {
      const inquiriesRef = collection(db, 'inquiries');
      const q = query(inquiriesRef, limit(50));
      unsubscribeFirestore = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const remoteInquiries: ContactInquiry[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
              return {
                id: data.id || docSnap.id,
                name: data.name || 'Anonymous Client',
                email: data.email || 'no-email@provided.com',
                topic: data.topic || 'General Inquiry',
                message: data.message || '',
                timestamp: data.timestamp || 'Recent',
                date: data.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                read: data.read ?? false,
                status: data.status || 'new',
                starred: data.starred ?? false,
                phone: data.phone,
              };
            });

            setInquiries((prev) => {
              // Merge remote and local without duplicate IDs
              const map = new Map<string, ContactInquiry>();
              // Put existing first
              prev.forEach((item) => map.set(item.id, item));
              // Overlay / add remote
              remoteInquiries.forEach((item) => {
                if (!map.has(item.id)) {
                  map.set(item.id, item);
                }
              });
              return Array.from(map.values());
            });
          }
        },
        (err) => {
          console.warn('Firestore inquiries real-time listener notice:', err);
        }
      );
    } catch (err) {
      console.warn('Could not attach Firestore onSnapshot:', err);
    }

    return () => {
      window.removeEventListener('sinan_contact_submitted', handleContactSubmission);
      unsubscribeFirestore();
    };
  }, []);

  // Sync inquiries to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem('sinan_admin_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Sync notifications to localStorage
  useEffect(() => {
    localStorage.setItem('sinan_admin_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Dialog State
  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    variant?: 'danger' | 'warning' | 'primary';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Helper to add toast
  const addToast = (title: string, description?: string, type: ToastMessage['type'] = 'success') => {
    const id = 't-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth handlers
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('sinan_admin_auth', 'true');
    addToast('Admin Session Initialized', 'Welcome back, Administrator.', 'success');
  };

  const handleLogoutClick = () => {
    soundManager.playPop();
    setDialogConfig({
      isOpen: true,
      title: 'Confirm Administrator Sign Out',
      message:
        'Are you sure you wish to terminate the active session? You will need to re-authenticate with master credentials to regain access.',
      confirmLabel: 'Sign Out',
      variant: 'danger',
      onConfirm: () => {
        setIsAuthenticated(false);
        localStorage.removeItem('sinan_admin_auth');
        setDialogConfig((d) => ({ ...d, isOpen: false }));
        addToast('Signed Out', 'You have been securely signed out.', 'info');
      },
    });
  };

  // Inquiry Action Handlers
  const handleMarkInquiryRead = (id: string) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, read: true } : inq))
    );
  };

  const handleMarkAllInquiriesRead = () => {
    setInquiries((prev) => prev.map((inq) => ({ ...inq, read: true })));
    addToast('Inquiries Updated', 'All visitor messages marked as read.', 'info');
  };

  const handleToggleStarInquiry = (id: string) => {
    soundManager.playPop();
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, starred: !inq.starred } : inq))
    );
  };

  const handleArchiveInquiry = (id: string) => {
    soundManager.playPop();
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id
          ? { ...inq, status: inq.status === 'archived' ? 'new' : 'archived' }
          : inq
      )
    );
    addToast('Inquiry Status Updated', 'Message moved to archive.', 'info');
  };

  const handleDeleteInquiry = (id: string) => {
    soundManager.playPop();
    setDialogConfig({
      isOpen: true,
      title: 'Delete Message',
      message: 'Are you sure you want to permanently delete this contact inquiry?',
      confirmLabel: 'Delete',
      variant: 'danger',
      onConfirm: () => {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
        setDialogConfig((d) => ({ ...d, isOpen: false }));
        addToast('Message Deleted', 'Contact submission permanently removed.', 'info');
      },
    });
  };

  const handleForwardInquiryToChat = (inquiry: ContactInquiry) => {
    soundManager.playPop();
    addToast('Forwarded to Google Chat', `Inquiry from "${inquiry.name}" forwarded to https://chat.google.com/`, 'success');
  };

  // Quick Action Handlers
  const handleQuickAction = (actionType: string) => {
    switch (actionType) {
      case 'flush_cdn':
        setDialogConfig({
          isOpen: true,
          title: 'Purge Global Edge CDN Cache',
          message:
            'This will invalidate all cached assets across all 4 edge regions and force cache-revalidation for all users.',
          confirmLabel: 'Purge Cache',
          variant: 'warning',
          onConfirm: () => {
            setDialogConfig((d) => ({ ...d, isOpen: false }));
            soundManager.playSuccess();
            addToast('Global CDN Purged', 'Edge caches across all regions have been refreshed.', 'success');
            // Append log
            const newLog: ActivityLog = {
              id: 'log-' + Date.now(),
              timestamp: 'Just now',
              user: CURRENT_ADMIN.name,
              action: 'Manual CDN Cache Purge triggered',
              category: 'Deployment',
              ip: '49.37.142.88',
              status: 'success',
              details: { targets: 'Global Edge Anycast', evictedKeys: 1240 },
            };
            setLogs((prev) => [newLog, ...prev]);
          },
        });
        break;

      case 'create_backup':
        soundManager.playSuccess();
        addToast('Database Snapshot Created', 'Encrypted snapshot saved to gs://sinan-backups-secure (384MB).', 'success');
        const backupLog: ActivityLog = {
          id: 'log-' + Date.now(),
          timestamp: 'Just now',
          user: CURRENT_ADMIN.name,
          action: 'Manual Firestore Cloud Snapshot taken',
          category: 'Database',
          ip: '49.37.142.88',
          status: 'success',
          details: { sizeMB: 384, status: 'COMPLETED' },
        };
        setLogs((prev) => [backupLog, ...prev]);
        break;

      case 'sync_chat':
        soundManager.playPop();
        addToast('Google Chat Webhook Pinged', 'Test heartbeat packet delivered to https://chat.google.com/.', 'info');
        break;

      case 'restart_worker':
        soundManager.playPop();
        addToast('Worker Nodes Rebooted', 'Zero-downtime rolling restart initiated for Asia-South cluster.', 'info');
        break;

      case 'send_alert':
        soundManager.playPop();
        addToast('Broadcast Dispatched', 'Broadcast alert queued to all subscribed developer webhooks.', 'info');
        break;

      default:
        break;
    }
  };

  const handlePingNode = (nodeName: string) => {
    addToast(`Node Pinged: ${nodeName}`, 'Packet round-trip latency verified: 18ms (0% drop).', 'success');
  };

  const handleExportLogs = () => {
    addToast('Audit Log Exported', 'Downloaded activity-audit-logs.csv to your device.', 'success');
  };

  const handleClearLogs = () => {
    setDialogConfig({
      isOpen: true,
      title: 'Clear Filtered Audit Logs',
      message:
        'Are you sure you want to clear these audit logs from the transient local viewer? Critical system logs remain archived in Cloud Logging.',
      confirmLabel: 'Clear Logs',
      variant: 'danger',
      onConfirm: () => {
        setLogs([]);
        setDialogConfig((d) => ({ ...d, isOpen: false }));
        addToast('Logs Cleared', 'Active audit view has been cleared.', 'info');
      },
    });
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('Notifications Updated', 'All system notifications marked as read.', 'info');
  };

  const handleDismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleForwardToChat = (notif: NotificationItem) => {
    soundManager.playPop();
    addToast('Forwarded to Google Chat', `Message "${notif.title}" sent to https://chat.google.com/.`, 'success');
  };

  const handleSaveSettings = () => {
    addToast('Settings Saved', 'Portal configuration, webhook URLs & security rules updated.', 'success');
  };

  // If not authenticated, render Admin Login screen
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onBackToPortfolio={onBackToPortfolio}
      />
    );
  }

  const unreadNotifCount = notifications.filter((n) => !n.read).length;
  const unreadInquiriesCount = inquiries.filter((i) => !i.read && i.status !== 'archived').length;

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-row overflow-x-hidden font-sans">
      {/* Sidebar Navigation */}
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setMobileMenuOpen(false);
        }}
        user={CURRENT_ADMIN}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogoutClick={handleLogoutClick}
        onBackToPortfolio={onBackToPortfolio}
        unreadCount={unreadNotifCount}
        unreadInquiriesCount={unreadInquiriesCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminHeader
          currentTab={currentTab}
          onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          onBackToPortfolio={onBackToPortfolio}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          onQuickAction={handleQuickAction}
        />

        {/* Dynamic Tab Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {currentTab === 'dashboard' && (
            <AdminDashboardTab
              recentLogs={logs}
              onTriggerAction={handleQuickAction}
              onNavigateTab={(tab) => setCurrentTab(tab)}
              inquiries={inquiries}
            />
          )}

          {currentTab === 'messages' && (
            <AdminMessagesTab
              inquiries={inquiries}
              onMarkAsRead={handleMarkInquiryRead}
              onMarkAllAsRead={handleMarkAllInquiriesRead}
              onToggleStar={handleToggleStarInquiry}
              onArchive={handleArchiveInquiry}
              onDelete={handleDeleteInquiry}
              onForwardToChat={handleForwardInquiryToChat}
            />
          )}

          {currentTab === 'overview' && (
            <AdminOverviewTab onPingNode={handlePingNode} />
          )}

          {currentTab === 'activity' && (
            <AdminActivityTab
              logs={logs}
              onExportLogs={handleExportLogs}
              onClearLogs={handleClearLogs}
            />
          )}

          {currentTab === 'notifications' && (
            <AdminNotificationsTab
              notifications={notifications}
              onMarkAllRead={handleMarkAllNotificationsRead}
              onDismissNotification={handleDismissNotification}
              onForwardToChat={handleForwardToChat}
            />
          )}

          {currentTab === 'settings' && (
            <AdminSettingsTab onSaveSettings={handleSaveSettings} />
          )}
        </main>
      </div>

      {/* Confirmation Dialog Modal */}
      <AdminConfirmDialog
        isOpen={dialogConfig.isOpen}
        title={dialogConfig.title}
        message={dialogConfig.message}
        confirmLabel={dialogConfig.confirmLabel}
        confirmVariant={dialogConfig.variant}
        onConfirm={dialogConfig.onConfirm}
        onCancel={() => setDialogConfig((d) => ({ ...d, isOpen: false }))}
      />

      {/* Toasts Display */}
      <AdminToast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

