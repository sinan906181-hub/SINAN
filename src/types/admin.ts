export type AdminTab = 'dashboard' | 'messages' | 'overview' | 'activity' | 'notifications' | 'settings';

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  timestamp: string;
  date: string;
  read: boolean;
  status: 'new' | 'replied' | 'archived';
  starred?: boolean;
  phone?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'System Engineer' | 'Viewer';
  avatarUrl: string;
  lastLogin: string;
}

export interface SystemMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
  iconName: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  category: 'Auth' | 'Deployment' | 'Database' | 'Security' | 'API';
  ip: string;
  status: 'success' | 'warning' | 'error' | 'info';
  details: Record<string, any>;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  type: 'security' | 'system' | 'message' | 'deployment';
}

export interface ServerNode {
  id: string;
  name: string;
  region: string;
  status: 'healthy' | 'degraded' | 'offline';
  cpu: number; // percentage
  memory: number; // percentage
  latency: number; // ms
  uptime: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
