export type ThemeMode = 'dark' | 'light';
export type UserRole = 'admin' | 'user' | 'member' | 'developer' | 'viewer';
export type UserPlan = 'starter' | 'pro' | 'enterprise';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  plan: UserPlan;
  bio?: string;
  title?: string;
  company?: string;
  createdAt: string;
  updatedAt?: string;
  settings?: {
    theme: 'dark' | 'light' | 'system';
    emailNotifications: boolean;
    aiAutoSuggestions: boolean;
    twoFactorAuth: boolean;
  };
}

export type ProjectStatus = 'planning' | 'in-progress' | 'in_progress' | 'review' | 'completed' | 'on_hold';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Project {
  id: string;
  name?: string;
  title?: string;
  tagline?: string;
  description: string;
  longDescription?: string;
  category: 'ai' | 'cloud' | 'security' | 'platform' | 'Web' | 'AI' | 'Design' | 'Creative' | 'Mobile' | string;
  status?: ProjectStatus;
  priority?: PriorityLevel;
  tags: string[];
  image?: string;
  gallery?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  year?: string;
  role?: string;
  highlights?: string[];
  challenges?: string;
  solution?: string;
  metrics?: { label: string; value: string }[];
  progress?: number; // 0 - 100
  dueDate?: string;
  budget?: string | number;
  ownerId?: string;
  ownerName?: string;
  ownerEmail?: string;
  members?: string[];
  teamMembers?: string[];
  spent?: number;
  tasksCount?: number;
  completedTasksCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Task {
  id: string;
  projectId: string;
  projectTitle?: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  completed?: boolean;
  priority: PriorityLevel;
  dueDate: string;
  assignee: string;
  assigneeName?: string;
  ownerId?: string;
  tags: string[];
  createdAt?: string;
}

export interface TaskItem extends Task {}

export interface Activity {
  id: string;
  userId?: string;
  userName: string;
  userAvatar?: string;
  action?: string;
  description: string;
  target?: string;
  type?: 'project' | 'task' | 'ai' | 'file' | 'security' | 'user';
  timestamp: string;
  createdAt?: string;
}

export interface ActivityItem extends Activity {}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  userId?: string;
  role?: 'user' | 'assistant' | 'system';
  content: string;
  text?: string;
  model?: 'gemini-flash' | 'gemini-pro' | 'claude-sonnet' | string;
  timestamp: string;
  isStreaming?: boolean;
  suggestedActions?: string[];
}

export interface StorageFile {
  id: string;
  name: string;
  size: string | number;
  type: 'document' | 'code' | 'image' | 'archive' | 'dataset';
  extension?: string;
  uploadedBy?: string;
  uploadedAt: string;
  downloadUrl?: string;
  projectId?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company?: string;
  organization?: string;
  avatar: string;
  rating?: number;
  quote?: string;
  content?: string;
  relationship?: string;
  metrics?: string;
}

export interface Testimonial extends TestimonialItem {}

export interface PricingPlan {
  id: UserPlan | string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number;
  popular?: boolean;
  features: string[];
  highlight: string;
  ctaText: string;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

export interface SkillItem {
  name: string;
  category: 'Technology' | 'Creative' | 'AI & Tools' | 'Media & Production';
  iconName: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  category: 'Education' | 'Milestone' | 'Creative' | 'Career';
  organization: string;
  description: string;
  skillsLearned: string[];
  highlight?: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'Academic' | 'Hackathon' | 'Creative' | 'Certification';
  description: string;
  credentialUrl?: string;
  badge: string;
}

export interface CreativeVideo {
  id: string;
  title: string;
  category: 'Tech Tutorial' | 'Cinematic Edit' | 'Design Breakdown' | 'AI Showcase';
  duration: string;
  views: string;
  thumbnail: string;
  videoUrl?: string;
  embedId?: string;
  description: string;
  toolsUsed: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'UI Concepts' | 'Visual Design' | 'Tech Setups' | 'Creative Photography';
  image: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
  description: string;
  year: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
