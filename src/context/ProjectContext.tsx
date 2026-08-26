import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';
import { Project, Task, Activity, ChatMessage } from '../types';

interface ProjectContextType {
  projects: Project[];
  tasks: Task[];
  activities: Activity[];
  chatMessages: ChatMessage[];
  loading: boolean;
  addProject: (data: Omit<Project, 'id' | 'createdAt' | 'ownerId'>) => Promise<string>;
  createProject: (data: Omit<Project, 'id' | 'createdAt' | 'ownerId'>) => Promise<string>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addTask: (data: Omit<Task, 'id' | 'createdAt' | 'ownerId'>) => Promise<string>;
  createTask: (data: Omit<Task, 'id' | 'createdAt' | 'ownerId'>) => Promise<string>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskStatus: (id: string) => Promise<void>;
  toggleTaskCompleted: (id: string, completed?: boolean) => Promise<void>;
  sendChatMessage: (content: string, model?: string) => Promise<void>;
  clearChatHistory: () => void;
  logActivity: (action: string, target?: string, type?: Activity['type']) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Nexora Quantum AI Pipeline',
    title: 'Nexora Quantum AI Pipeline',
    description: 'Autonomous multi-modal model orchestration system with sub-100ms retrieval and semantic embeddings.',
    category: 'ai',
    status: 'in-progress',
    priority: 'high',
    tags: ['AI/ML', 'Vector DB', 'TypeScript', 'FastAPI'],
    progress: 74,
    dueDate: '2026-09-15',
    budget: '$45,000',
    ownerId: 'system',
    ownerName: 'Elena Rostova',
    ownerEmail: 'admin@nexora.ai',
    spent: 31200,
    tasksCount: 14,
    completedTasksCount: 10,
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
  },
  {
    id: 'proj-2',
    name: 'Global Edge Cloud Mesh',
    title: 'Global Edge Cloud Mesh',
    description: 'Decentralized serverless compute cluster running across 42 geo-distributed regions with automated failover.',
    category: 'cloud',
    status: 'in-progress',
    priority: 'critical',
    tags: ['Infrastructure', 'Kubernetes', 'Cloudflare', 'Rust'],
    progress: 88,
    dueDate: '2026-08-30',
    budget: '$80,000',
    ownerId: 'system',
    ownerName: 'Sarah Vance',
    ownerEmail: 'sarah.engineer@nexora.ai',
    spent: 67400,
    tasksCount: 22,
    completedTasksCount: 19,
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
  {
    id: 'proj-3',
    name: 'Enterprise Zero-Trust IAM Suite',
    title: 'Enterprise Zero-Trust IAM Suite',
    description: 'SOC2 Type II compliant identity verification with biometric passkeys, hardware tokens, and dynamic policy auditing.',
    category: 'security',
    status: 'completed',
    priority: 'high',
    tags: ['Security', 'OAuth2', 'WebAuthn', 'Compliance'],
    progress: 100,
    dueDate: '2026-07-20',
    budget: '$35,000',
    ownerId: 'system',
    ownerName: 'Marcus Aurel',
    ownerEmail: 'marcus@nexora.ai',
    spent: 33800,
    tasksCount: 18,
    completedTasksCount: 18,
    createdAt: new Date(Date.now() - 60 * 86400000).toISOString(),
  },
  {
    id: 'proj-4',
    name: 'Autonomous Code Refactoring Agent',
    title: 'Autonomous Code Refactoring Agent',
    description: 'Next-gen background workers that detect code hotspots, optimize database query bottlenecks, and propose PRs.',
    category: 'platform',
    status: 'planning',
    priority: 'medium',
    tags: ['DevOps', 'AI Agent', 'Python', 'CI/CD'],
    progress: 25,
    dueDate: '2026-10-01',
    budget: '$28,000',
    ownerId: 'system',
    ownerName: 'Alex Vance',
    ownerEmail: 'user@nexora.ai',
    spent: 6500,
    tasksCount: 9,
    completedTasksCount: 2,
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  }
];

const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    projectId: 'proj-1',
    projectTitle: 'Nexora Quantum AI Pipeline',
    title: 'Benchmark latency on multi-vector chunk indexing',
    description: 'Compare HNSW vs IVFFLAT indexing in pgvector and pinecone',
    status: 'completed',
    completed: true,
    priority: 'high',
    dueDate: '2026-08-25',
    assignee: 'Elena Rostova',
    ownerId: 'system',
    tags: ['ai', 'latency'],
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'task-2',
    projectId: 'proj-1',
    projectTitle: 'Nexora Quantum AI Pipeline',
    title: 'Implement streaming token response fallback',
    description: 'Add SSE reconnect handler and exponential backoff retry mechanism',
    status: 'in-progress',
    completed: false,
    priority: 'medium',
    dueDate: '2026-08-28',
    assignee: 'Sarah Vance',
    ownerId: 'system',
    tags: ['streaming', 'api'],
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'task-3',
    projectId: 'proj-2',
    projectTitle: 'Global Edge Cloud Mesh',
    title: 'Perform geo-distributed chaos simulation on Frankfurt region',
    description: 'Simulate 80% packet drop and verify DNS failover to Zurich node in <500ms',
    status: 'review',
    completed: false,
    priority: 'critical',
    dueDate: '2026-08-24',
    assignee: 'Sarah Vance',
    ownerId: 'system',
    tags: ['chaos', 'mesh'],
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'task-4',
    projectId: 'proj-4',
    projectTitle: 'Autonomous Code Refactoring Agent',
    title: 'Train AST parser on Rust and TypeScript syntax rules',
    description: 'Ensure accurate detection of memory allocations and dangling promises',
    status: 'todo',
    completed: false,
    priority: 'high',
    dueDate: '2026-09-02',
    assignee: 'Elena Rostova',
    ownerId: 'system',
    tags: ['compiler', 'ast'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-5',
    projectId: 'proj-2',
    projectTitle: 'Global Edge Cloud Mesh',
    title: 'Set up real-time Prometheus & Grafana alerting metrics',
    description: 'Configure high CPU thresholds and P99 latency alerts to Slack',
    status: 'todo',
    completed: false,
    priority: 'medium',
    dueDate: '2026-08-29',
    assignee: 'Marcus Aurel',
    ownerId: 'system',
    tags: ['telemetry', 'alerts'],
    createdAt: new Date().toISOString(),
  }
];

const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    userId: 'system',
    userName: 'Elena Rostova',
    description: 'deployed build v2.4.0 Edge Cluster to 42 regions',
    action: 'deployed build',
    target: 'v2.4.0 Edge Cluster to 42 regions',
    type: 'project',
    timestamp: '12 minutes ago',
    createdAt: new Date(Date.now() - 12 * 60000).toISOString(),
  },
  {
    id: 'act-2',
    userId: 'system',
    userName: 'Nexora AI Copilot',
    description: 'optimized database indexing on Vector Collection #8849',
    action: 'optimized database indexing on',
    target: 'Vector Collection #8849',
    type: 'ai',
    timestamp: '45 minutes ago',
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
  },
  {
    id: 'act-3',
    userId: 'system',
    userName: 'Sarah Vance',
    description: 'completed task Implement streaming token response fallback',
    action: 'completed task',
    target: 'Implement streaming token response fallback',
    type: 'task',
    timestamp: '2 hours ago',
    createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
  },
  {
    id: 'act-4',
    userId: 'system',
    userName: 'Marcus Aurel',
    description: 'verified security audit on Enterprise Zero-Trust IAM Suite',
    action: 'verified security audit on',
    target: 'Enterprise Zero-Trust IAM Suite',
    type: 'security',
    timestamp: '5 hours ago',
    createdAt: new Date(Date.now() - 300 * 60000).toISOString(),
  }
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    role: 'assistant',
    model: 'gemini-flash',
    content: 'Welcome to Nexora Copilot Intelligence. I am indexed across your project workspaces, IAM policies, and cloud repositories. What shall we design or optimize today?',
    timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
  }
];

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userProfile, user } = useAuth();

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('nexora_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('nexora_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('nexora_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('nexora_chat');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [loading, setLoading] = useState(false);

  // Persistence to localStorage
  useEffect(() => {
    localStorage.setItem('nexora_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('nexora_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('nexora_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('nexora_chat', JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Firestore Real-Time listeners if authenticated
  useEffect(() => {
    if (!user) return;

    try {
      const qProjects = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(50));
      const unsubProjects = onSnapshot(qProjects, (snapshot) => {
        if (!snapshot.empty) {
          const list: Project[] = [];
          snapshot.forEach((d) => {
            const data = d.data();
            list.push({
              id: d.id,
              name: data.name || data.title || 'Untitled Project',
              title: data.title || data.name || 'Untitled Project',
              description: data.description || '',
              category: data.category || 'ai',
              status: data.status || 'in-progress',
              priority: data.priority || 'medium',
              tags: data.tags || [],
              progress: data.progress ?? 0,
              dueDate: data.dueDate || '2026-12-31',
              budget: data.budget || '$10,000',
              spent: data.spent || 0,
              tasksCount: data.tasksCount || 0,
              completedTasksCount: data.completedTasksCount || 0,
              createdAt: data.createdAt,
            } as Project);
          });
          setProjects(list);
        }
      }, (err) => {
        console.warn('Firestore projects fallback:', err);
      });

      return () => unsubProjects();
    } catch (err) {
      console.warn('Firestore subscription error:', err);
    }
  }, [user]);

  const logActivity = async (action: string, target?: string, type: Activity['type'] = 'project') => {
    const newAct: Activity = {
      id: `act-${Date.now()}`,
      userId: userProfile?.uid || 'user',
      userName: userProfile?.displayName || 'Alex Vance',
      description: `${action} ${target || ''}`.trim(),
      action,
      target,
      type,
      timestamp: 'Just now',
      createdAt: new Date().toISOString(),
    };

    setActivities((prev) => [newAct, ...prev.slice(0, 40)]);
  };

  const addProject = async (data: Omit<Project, 'id' | 'createdAt' | 'ownerId'>): Promise<string> => {
    const ownerId = user?.uid || userProfile?.uid || 'user-demo';
    const createdAt = new Date().toISOString();
    const name = data.name || data.title || 'New Workspace';

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      ...data,
      name,
      title: name,
      ownerId,
      tasksCount: 0,
      completedTasksCount: 0,
      createdAt,
    };

    if (user) {
      try {
        const docRef = await addDoc(collection(db, 'projects'), {
          ...newProject,
          createdAt,
        });
        newProject.id = docRef.id;
      } catch (err) {
        console.warn('Firestore add project fallback:', err);
      }
    }

    setProjects((prev) => [newProject, ...prev]);
    await logActivity('provisioned workspace cluster', newProject.name, 'project');
    return newProject.id;
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p))
    );

    if (user && !id.startsWith('proj-')) {
      try {
        const docRef = doc(db, 'projects', id);
        await updateDoc(docRef, data);
      } catch (err) {
        console.warn('Firestore update error:', err);
      }
    }

    const proj = projects.find((p) => p.id === id);
    await logActivity('updated configuration on', proj ? proj.name : id, 'project');
  };

  const deleteProject = async (id: string) => {
    const proj = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setTasks((prev) => prev.filter((t) => t.projectId !== id));

    if (user && !id.startsWith('proj-')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
      } catch (err) {
        console.warn('Firestore delete error:', err);
      }
    }

    await logActivity('terminated workspace cluster', proj ? proj.name : id, 'project');
  };

  const addTask = async (data: Omit<Task, 'id' | 'createdAt' | 'ownerId'>): Promise<string> => {
    const ownerId = user?.uid || userProfile?.uid || 'user-demo';
    const createdAt = new Date().toISOString();
    const newTask: Task = {
      id: `task-${Date.now()}`,
      ...data,
      ownerId,
      createdAt,
    };

    if (user) {
      try {
        const docRef = await addDoc(collection(db, 'tasks'), {
          ...newTask,
          createdAt,
        });
        newTask.id = docRef.id;
      } catch (err) {
        console.warn('Firestore add task fallback:', err);
      }
    }

    setTasks((prev) => [newTask, ...prev]);

    // Recalculate project progress
    if (data.projectId) {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id === data.projectId) {
            const currentTasks = [...tasks.filter((t) => t.projectId === p.id), newTask];
            const completed = currentTasks.filter((t) => t.status === 'completed').length;
            const progress = Math.round((completed / currentTasks.length) * 100);
            return {
              ...p,
              tasksCount: currentTasks.length,
              completedTasksCount: completed,
              progress,
            };
          }
          return p;
        })
      );
    }

    await logActivity('added sprint task', newTask.title, 'task');
    return newTask.id;
  };

  const updateTask = async (id: string, data: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated: Task = { ...t, ...data };
          if (data.status) {
            updated.completed = data.status === 'completed';
          }
          return updated;
        }
        return t;
      })
    );

    if (user && !id.startsWith('task-')) {
      try {
        const docRef = doc(db, 'tasks', id);
        await updateDoc(docRef, data);
      } catch (err) {
        console.warn('Firestore task update error:', err);
      }
    }

    // Refresh project progress
    const task = tasks.find((t) => t.id === id);
    if (task) {
      const projId = task.projectId;
      const updatedTasks = tasks.map((t) => (t.id === id ? { ...t, ...data } : t)).filter((t) => t.projectId === projId);
      const completed = updatedTasks.filter((t) => t.status === 'completed').length;
      const progress = updatedTasks.length > 0 ? Math.round((completed / updatedTasks.length) * 100) : 0;
      updateProject(projId, { progress, completedTasksCount: completed });
    }
  };

  const toggleTaskStatus = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const nextStatus = task.status === 'completed' ? 'todo' : 'completed';
    await updateTask(id, { status: nextStatus, completed: nextStatus === 'completed' });
    await logActivity(nextStatus === 'completed' ? 'completed sprint task' : 'reopened sprint task', task.title, 'task');
  };

  const toggleTaskCompleted = async (id: string, completed?: boolean) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const isCompleted = completed !== undefined ? completed : task.status !== 'completed';
    await updateTask(id, {
      status: isCompleted ? 'completed' : 'todo',
      completed: isCompleted,
    });
  };

  const deleteTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.filter((t) => t.id !== id));

    if (user && !id.startsWith('task-')) {
      try {
        await deleteDoc(doc(db, 'tasks', id));
      } catch (err) {
        console.warn('Firestore delete task error:', err);
      }
    }

    if (task) {
      await logActivity('removed sprint task', task.title, 'task');
    }
  };

  const sendChatMessage = async (content: string, model: string = 'gemini-flash') => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setChatMessages((prev) => [...prev, userMsg]);

    // Simulate AI synthesis with rich responses
    setTimeout(() => {
      let aiReply = '';
      if (content.toLowerCase().includes('vector') || content.toLowerCase().includes('latency')) {
        aiReply = `### ⚡ Vector Index Optimization Recommendations\n\n1. **Switch to HNSW with M=16, efConstruction=64**\n   - Current p99 query latency: **42ms**\n   - Projected p99 query latency: **14ms**\n\n\`\`\`sql\nCREATE INDEX ON project_embeddings \nUSING hnsw (embedding vector_cosine_ops)\nWITH (m = 16, ef_construction = 64);\n\`\`\`\n\n2. **Prune Stale Chunks**: Set TTL policy on ephemeral task embeddings older than 90 days.`;
      } else if (content.toLowerCase().includes('iam') || content.toLowerCase().includes('rule') || content.toLowerCase().includes('security')) {
        aiReply = `### 🛡️ Firestore IAM Audit Matrix\n\n- **Verdict**: PASS with 1 hardening recommendation.\n- **Policy Checked**: \`firestore.rules\`\n\n\`\`\`javascript\nmatch /projects/{projectId} {\n  allow read: if request.auth != null;\n  allow write: if request.auth != null && (\n    resource == null ||\n    request.auth.uid == resource.data.ownerId ||\n    request.auth.token.role == 'admin'\n  );\n}\n\`\`\`\n\nAll non-admin cross-tenant write attempts are rejected with permission-denied.`;
      } else if (content.toLowerCase().includes('docker') || content.toLowerCase().includes('kubernetes') || content.toLowerCase().includes('spec')) {
        aiReply = `### 🐳 Edge Deployment Cluster Spec\n\n\`\`\`yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nexora-edge-microservice\nspec:\n  replicas: 3\n  template:\n    spec:\n      containers:\n      - name: worker\n        image: nexora.cloud/edge-runner:3.0\n        resources:\n          limits:\n            memory: "512Mi"\n            cpu: "500m"\n\`\`\``;
      } else {
        aiReply = `I have analyzed your workspace query: "${content}".\n\nAll 4 cloud clusters are currently operating at **99.99% uptime** with zero failed health checks. Would you like me to run an automated regression test or generate a microservice scaffolding for this?`;
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        role: 'assistant',
        model,
        content: aiReply,
        timestamp: new Date().toISOString(),
      };

      setChatMessages((prev) => [...prev, aiMsg]);
      logActivity('prompted AI Copilot', `"${content.slice(0, 30)}..."`, 'ai');
    }, 1200);
  };

  const clearChatHistory = () => {
    setChatMessages([]);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        tasks,
        activities,
        chatMessages,
        loading,
        addProject,
        createProject: addProject,
        updateProject,
        deleteProject,
        addTask,
        createTask: addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        toggleTaskCompleted,
        sendChatMessage,
        clearChatHistory,
        logActivity,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
