import {
  Project,
  SkillItem,
  JourneyMilestone,
  Achievement,
  CreativeVideo,
  GalleryItem,
  Testimonial,
} from '../types';

export const PERSONAL_INFO = {
  name: 'SINAN',
  fullName: 'Hafiz Muhammed Sinan K',
  title: 'Web Designer & Developer',
  tagline: 'Fast, visually sharp digital experiences that help brands grow.',
  heroHeadline: 'Turning Ideas Into Digital Experiences.',
  heroDescription:
    "I'm Hafiz Muhammed Sinan K — a Web Designer & Developer from Malappuram, Kerala. I build fast, visually sharp digital experiences that help brands grow. Proficient in React, Next.js, SEO, E-Commerce & Graphic Design — delivering on time, every time.",
  email: 'sinan906181@gmail.com',
  phone: '+91 9061814655',
  rawPhone: '9061814655',
  location: 'Malappuram, Kerala, India',
  fullAddress: 'Malappuram District, Kerala, India',
  availability: 'Available for work - 2026',
  timezone: 'IST (UTC+5:30) • Active & Responsive',
  bio: `I'm Hafiz Muhammed Sinan K — a Web Designer & Developer from Malappuram, Kerala. I build fast, visually sharp digital experiences that help brands grow. Proficient in React, Next.js, SEO, E-Commerce & Graphic Design — delivering on time, every time.`,
  philosophy: `Design is not just what it looks like; it's how it empowers the human mind. I believe in minimal friction, tactile responsiveness, and pushing the boundaries of what the web can feel like.`,
  socialLinks: {
    youtube: 'https://www.youtube.com/@mhd_sinanka',
    pinterest: 'https://in.pinterest.com/',
    github: 'https://github.com',
    instagram: 'https://www.instagram.com/_mhs_sinanka/',
    instagramSecondary: 'https://www.instagram.com/the_exe_0/',
    facebook: 'https://facebook.com',
    googleChat: 'https://chat.google.com/',
    linkedin: 'https://linkedin.com',
    x: 'https://x.com',
    whatsapp: 'https://wa.me/919061814655',
  },
  stats: [
    { label: 'PROJECTS', value: '20+' },
    { label: 'CLIENTS', value: '30+' },
    { label: 'YEARS EXP', value: '1+' },
    { label: 'SATISFACTION', value: '100%' },
  ],
};

export const SKILLS_DATA: SkillItem[] = [
  // Technology
  {
    name: 'React 19 & Next.js',
    category: 'Technology',
    iconName: 'Code2',
    description: 'Component architecture, server components, hooks, concurrent rendering & performance.',
    tags: ['Frontend', 'Architecture', 'SSR'],
    featured: true,
  },
  {
    name: 'TypeScript & JavaScript',
    category: 'Technology',
    iconName: 'FileCode',
    description: 'Type-safe scalable application development, strict mode, generics, and modern ES standards.',
    tags: ['Core', 'Type Safety', 'ES2024'],
    featured: true,
  },
  {
    name: 'Tailwind CSS & Styling',
    category: 'Technology',
    iconName: 'Paintbrush',
    description: 'Modern responsive systems, custom utility engines, tokens, fluid typography and glassmorphism.',
    tags: ['UI', 'Styling', 'Tokens'],
    featured: true,
  },
  {
    name: 'Node.js & Express / REST',
    category: 'Technology',
    iconName: 'Server',
    description: 'Backend services, RESTful API design, rate-limiting, proxies, and microservices.',
    tags: ['Backend', 'APIs', 'Node'],
    featured: false,
  },
  {
    name: 'Firebase & Firestore',
    category: 'Technology',
    iconName: 'Database',
    description: 'Realtime NoSQL databases, authentication rules, Cloud Functions, and CDN storage.',
    tags: ['Cloud', 'NoSQL', 'Auth'],
    featured: false,
  },
  {
    name: 'Git & CI/CD Workflows',
    category: 'Technology',
    iconName: 'GitBranch',
    description: 'Collaborative version control, semantic branching, automated deployments & staging.',
    tags: ['DevOps', 'Workflow'],
    featured: false,
  },

  // AI & Tools
  {
    name: 'Gemini & LLM API Integration',
    category: 'AI & Tools',
    iconName: 'Cpu',
    description: 'Multimodal AI systems, streaming responses, structured JSON schema outputs, and agents.',
    tags: ['GenAI', 'LLMs', 'Prompting'],
    featured: true,
  },
  {
    name: 'AI Interface Design',
    category: 'AI & Tools',
    iconName: 'Sparkles',
    description: 'Designing conversational, generative, and human-in-the-loop UX patterns that build user trust.',
    tags: ['UX for AI', 'Interactivity'],
    featured: true,
  },
  {
    name: 'Automation & Workflow Tools',
    category: 'AI & Tools',
    iconName: 'Boxes',
    description: 'Building custom scripts, scraping pipelines, vector indexing, and productivity accelerators.',
    tags: ['Tooling', 'Efficiency'],
    featured: false,
  },

  // Creative & Design
  {
    name: 'UI/UX & Product Design',
    category: 'Creative',
    iconName: 'Layout',
    description: 'User-centric wireframing, high-fidelity prototypes, user journeys, and usability audits.',
    tags: ['Figma', 'Prototyping', 'Design Systems'],
    featured: true,
  },
  {
    name: 'Figma & Design Systems',
    category: 'Creative',
    iconName: 'Figma',
    description: 'Component variants, auto-layout, token mapping, dark/light modes, and developer handoffs.',
    tags: ['Design Systems', 'Figma'],
    featured: true,
  },
  {
    name: 'Motion & Micro-interactions',
    category: 'Creative',
    iconName: 'Activity',
    description: 'Framer Motion animations, staggered layout shifts, tactile click feedback, and entry choreography.',
    tags: ['Framer Motion', 'Animation'],
    featured: false,
  },
  {
    name: 'Brand Identity & Visuals',
    category: 'Creative',
    iconName: 'Palette',
    description: 'Typography pairings, optical balance, logo creation, mood boards, and aesthetic direction.',
    tags: ['Branding', 'Typography'],
    featured: false,
  },

  // Media & Production
  {
    name: 'Cinematic Video Editing',
    category: 'Media & Production',
    iconName: 'Video',
    description: 'Pacing, narrative structure, audio mixing, seamless transitions, and color grading.',
    tags: ['DaVinci Resolve', 'Premiere Pro'],
    featured: true,
  },
  {
    name: 'Motion Graphics & VFX',
    category: 'Media & Production',
    iconName: 'Film',
    description: 'Kinetic typography, animated overlays, UI demo reels, and dynamic infographics.',
    tags: ['After Effects', 'Motion'],
    featured: false,
  },
  {
    name: 'Content Strategy & YouTube',
    category: 'Media & Production',
    iconName: 'Youtube',
    description: 'High-retention storytelling, thumbnail psychology, technical education, and audience growth.',
    tags: ['Content Creator', 'Education'],
    featured: true,
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'sadad-class-union',
    title: 'Sadad Class Union Platform',
    tagline: 'Official digital union platform, student registry, and community event hub',
    description:
      'A responsive web application built for the Sadad Class Union featuring student directory, union events timeline, announcement boards, and interactive community resources.',
    longDescription:
      'Sadad Class Union is a dedicated community and student organization web platform developed by Hafiz Muhammed Sinan K. It brings together union members, students, and alumni through real-time notices, member profiles, event archives, and responsive modern layouts deployed on Vercel.',
    category: 'Web',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Vercel Deployment', 'TypeScript', 'Responsive UI'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
    ],
    liveUrl: 'http://sadad-class-union.vercel.app/',
    githubUrl: 'https://github.com',
    featured: true,
    year: '2025',
    role: 'Creator & Lead Full-Stack Developer',
    highlights: [
      'Engineered high-speed single-page experience deployed on Vercel edge infrastructure',
      'Centralized student profiles, union initiatives, event countdowns, and announcements',
      'Optimized mobile-first responsiveness for students across devices in Kerala',
    ],
    challenges:
      'Creating an accessible, fast-loading community portal for alumni and students with seamless mobile accessibility in low-bandwidth scenarios.',
    solution:
      'Architected clean component modularity with Tailwind styling, static generation, and edge CDN distribution on Vercel.',
    metrics: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Platform', value: 'Vercel' },
      { label: 'Community', value: 'Active Union' },
    ],
  },
  {
    id: 'neuralflow-studio',
    title: 'NeuralFlow AI Studio',
    tagline: 'Next-generation workspace for multimodal AI generation and canvas synthesis',
    description:
      'A sleek, dark-first generative AI playground empowering creators to chain LLM prompts, synthesize canvas drawings, and automate creative workflows.',
    longDescription:
      'NeuralFlow Studio was built to solve the fragmentation in modern generative AI tools. It offers a fluid, infinite node canvas where developers and digital artists can connect text-to-text models, image generators, and live markdown preview in real-time. Built with strict performance budgets and responsive GPU-accelerated micro-interactions.',
    category: 'AI',
    tags: ['React 19', 'TypeScript', 'Gemini API', 'Tailwind CSS', 'Framer Motion', 'Web Audio'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format&fit=crop',
    ],
    liveUrl: 'https://sinan.dev/projects/neuralflow',
    githubUrl: 'https://github.com/sinan/neuralflow-studio',
    featured: true,
    year: '2026',
    role: 'Lead Architect & UI Designer',
    highlights: [
      'Engineered sub-50ms latency canvas interaction using native React states & requestAnimationFrame',
      'Multi-turn streaming chat with structured JSON output parsing',
      'Saved over 40 hours of repetitive prompting for beta creative teams',
    ],
    challenges: 'Balancing complex interactive nodes on an infinite canvas while keeping frame rates locked at 60 FPS on mobile devices.',
    solution: 'Implemented viewport virtualization, throttled canvas event listeners, and lightweight CSS transforms.',
    metrics: [
      { label: 'Latency', value: '<50ms' },
      { label: 'Lighthouse Score', value: '99/100' },
      { label: 'Active Testers', value: '450+' },
    ],
  },
  {
    id: 'aura-os',
    title: 'Aura Spatial OS',
    tagline: 'Minimalist browser-based personal operating system with audio spatializer',
    description:
      'A bespoke web desktop featuring draggable glass windows, ambient synthesizer, markdown notepad, and focus timers designed for deep work.',
    longDescription:
      'Aura OS reimagines what productivity software can look like when inspired by physical desktop instruments. Each window floats in 2.5D space with customizable ambient sounds, customizable widgets, and zero bloat.',
    category: 'Web',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Web Audio API', 'IndexedDB'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    ],
    liveUrl: 'https://sinan.dev/projects/aura-os',
    githubUrl: 'https://github.com/sinan/aura-os',
    featured: true,
    year: '2025',
    role: 'Full Stack Engineer & Audio Designer',
    highlights: [
      'Fully offline capable with local storage persistence and PWA support',
      'Custom procedural ambient audio synth built in Web Audio API',
      'Window management system with snapping and split view',
    ],
    challenges: 'Creating natural window physics without adding heavy external dragging libraries.',
    solution: 'Developed a custom 80-line lightweight drag-and-resize hook with bounding-box collision detection.',
    metrics: [
      { label: 'Bundle Size', value: '<42KB' },
      { label: 'Daily Users', value: '1.2K+' },
    ],
  },
  {
    id: 'verve-design-system',
    title: 'Verve Design System',
    tagline: 'High-contrast, accessible tokenized UI toolkit for modern web applications',
    description:
      'A comprehensive design system comprising 40+ accessible React components, fluid typography scaling, and dark/light mode optical calibrations.',
    longDescription:
      'Verve was conceived to eliminate UI inconsistency. Built with strict WCAG AA contrast standards, it features automated theme generation, keyboard navigation focus rings, and copy-paste React TypeScript components.',
    category: 'Design',
    tags: ['Figma', 'Design Tokens', 'React', 'Tailwind CSS', 'Radix UI', 'Storybook'],
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop',
    ],
    liveUrl: 'https://sinan.dev/projects/verve',
    githubUrl: 'https://github.com/sinan/verve-ui',
    featured: true,
    year: '2025',
    role: 'Design System Lead',
    highlights: [
      '100% Keyboard accessible with ARIA live region support',
      'Token system exported directly from Figma variables to CSS variables',
      'Adopted by 8 open-source projects',
    ],
    metrics: [
      { label: 'Components', value: '45+' },
      { label: 'Accessibility', value: '100% WCAG AA' },
      { label: 'GitHub Stars', value: '380+' },
    ],
  },
  {
    id: 'krono-academy',
    title: 'Krono Student Hub',
    tagline: 'Interactive peer learning portal for computer science students and creators',
    description:
      'A gamified education platform offering interactive code challenges, study roadmaps, AI quiz generation, and group revision rooms.',
    longDescription:
      'As a student myself, I wanted a place where peers could test coding concepts without boring static PDFs. Krono Academy provides visual algorithm debuggers and real-time collaborative study lobbies.',
    category: 'Web',
    tags: ['React', 'Node.js', 'Firebase Auth', 'Firestore', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    ],
    liveUrl: 'https://sinan.dev/projects/krono',
    githubUrl: 'https://github.com/sinan/krono-academy',
    featured: false,
    year: '2024',
    role: 'Creator & Developer',
    highlights: [
      'Realtime group countdowns & collaborative code challenge runner',
      'Integrated Firebase security rules with role-based moderation',
    ],
    metrics: [
      { label: 'Student Users', value: '800+' },
      { label: 'Quizzes Taken', value: '5,000+' },
    ],
  },
  {
    id: 'lumina-creator-suite',
    title: 'Lumina Creator Suite',
    tagline: 'Cinematic video pacing analyzer & automated storyboard editor',
    description:
      'Desktop and web utility for content creators to analyze speech pacing, cut dead air automatically, and generate color-graded title assets.',
    longDescription:
      'Content creation requires massive time in post-production. Lumina uses audio waveform threshold detection to highlight optimal cut points and suggests pacing adjustments based on engagement benchmarks.',
    category: 'Creative',
    tags: ['React', 'TypeScript', 'Web Workers', 'FFmpeg WebAssembly', 'Canvas'],
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    ],
    liveUrl: 'https://sinan.dev/projects/lumina',
    githubUrl: 'https://github.com/sinan/lumina-suite',
    featured: false,
    year: '2025',
    role: 'Tooling Developer & Video Creator',
    highlights: [
      'Client-side video waveform rendering in Web Workers without freezing the UI',
      'Export directly to DaVinci Resolve XML & Premiere EDL formats',
    ],
    metrics: [
      { label: 'Editing Time Saved', value: '45%' },
      { label: 'Videos Processed', value: '300+' },
    ],
  },
  {
    id: 'synthetix-vision',
    title: 'Synthetix AI Vision',
    tagline: 'Real-time gesture-controlled 3D particles & generative camera canvas',
    description:
      'An interactive visual experiment running machine learning hand tracking in the browser to control dynamic particle physics and generative art.',
    longDescription:
      'Combining TensorFlow.js hand pose detection with Three.js particle shaders, Synthetix Vision turns the user webcam into a musical and visual instrument.',
    category: 'AI',
    tags: ['Three.js', 'TensorFlow.js', 'WebGL', 'TypeScript', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop',
    ],
    liveUrl: 'https://sinan.dev/projects/synthetix',
    githubUrl: 'https://github.com/sinan/synthetix-vision',
    featured: false,
    year: '2024',
    role: 'Creative Technologist',
    highlights: [
      '10,000 interactive particles simulated at 60 FPS in WebGL',
      'Zero-latency hand landmark mapping',
    ],
    metrics: [
      { label: 'FPS Target', value: '60 FPS' },
      { label: 'Social Shares', value: '2.5K+' },
    ],
  },
];

export const CREATIVE_VIDEOS: CreativeVideo[] = [
  {
    id: 'vid-cinematic-ai',
    title: 'Cinematic AI 3D Animation: Futuristic Hero at Sunset (Prompt & VFX Breakdown)',
    category: 'Cinematic Edit',
    duration: '00:10',
    views: 'Featured Concept',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    description: 'AAA game cinematic rendering: confident young hero at dusk with volumetric lighting, slow dolly-in camera motion, floating luminous particles, and dynamic physics.',
    toolsUsed: ['Runway Gen-3', 'Kling 1.5', 'Unreal Engine 5.5 Look', 'DaVinci Resolve'],
  },
  {
    id: 'vid-1',
    title: 'How I Build Modern Web Apps with AI in 2026',
    category: 'Tech Tutorial',
    duration: '14:22',
    views: '48K',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    description: 'A comprehensive deep-dive into full-stack AI workflows, prompt engineering frameworks, and React 19 micro-interactions.',
    toolsUsed: ['React 19', 'Gemini API', 'TypeScript', 'Tailwind'],
  },
  {
    id: 'vid-2',
    title: 'Minimalist UI Design: Rules Every Developer Should Follow',
    category: 'Design Breakdown',
    duration: '11:05',
    views: '34K',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    description: 'Deconstructing typography scales, optical padding mathematics, and eliminating visual noise from complex web software.',
    toolsUsed: ['Figma', 'Typography Tokens', 'CSS Grids'],
  },
  {
    id: 'vid-3',
    title: 'The Art of Cinematic Video Pacing & Color Grading',
    category: 'Cinematic Edit',
    duration: '09:48',
    views: '29K',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop',
    description: 'My complete DaVinci Resolve color node tree, sound design layers, and rhythm matching for high-impact content.',
    toolsUsed: ['DaVinci Resolve', 'Color Science', 'Sound Design'],
  },
  {
    id: 'vid-4',
    title: 'Student to Creative Developer: My Tech Stack & Journey',
    category: 'Tech Tutorial',
    duration: '16:30',
    views: '52K',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    description: 'Honest retrospective on balancing university computer science studies, shipping real products, and content creation.',
    toolsUsed: ['Life Advice', 'Roadmaps', 'Portfolio Guide'],
  },
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Academic Excellence in Computer Science',
    issuer: 'University Honor Roll / Dean’s Recognition',
    date: '2025',
    category: 'Academic',
    description: 'Awarded for top tier academic standing, algorithm design projects, and high marks in software engineering fundamentals.',
    badge: 'Top 5% CS Cohort',
  },
  {
    id: 'ach-2',
    title: 'Winner / Finalist — Innovation AI Hackathon',
    issuer: 'Tech Horizons Hackathon',
    date: '2025',
    category: 'Hackathon',
    description: 'Constructed an accessibility-focused AI audio transcription and interactive canvas assistant within 36 hours.',
    badge: '1st Place UI/UX & AI',
  },
  {
    id: 'ach-3',
    title: 'Verified Creator Milestone: 150K+ Community Reach',
    issuer: 'YouTube & Digital Communities',
    date: '2025 - 2026',
    category: 'Creative',
    description: 'Built an engaged community of student developers and creative designers through insightful technical breakdown videos.',
    badge: '150K+ Views',
  },
  {
    id: 'ach-4',
    title: 'Full Stack & Modern Cloud Architecture Certificate',
    issuer: 'Verified Professional Assessment',
    date: '2024',
    category: 'Certification',
    description: 'Validated expertise in React component lifecycles, TypeScript strict patterns, Firebase security, and REST API deployment.',
    badge: 'Certified Developer',
  },
];

export const JOURNEY_DATA: JourneyMilestone[] = [
  {
    year: '2026',
    title: 'Pushing Boundaries: AI Interfaces & Creative Tech',
    organization: 'Independent Lab & Community',
    category: 'Milestone',
    description:
      'Focusing on next-generation generative AI interfaces, building production React applications, and exploring spatial desktop experiences.',
    skillsLearned: ['Gemini 2.5/Flash APIs', 'Canvas Virtualization', 'Advanced Design Tokens', 'Audio Synthesis'],
    highlight: 'Launched NeuralFlow Studio beta with 400+ creative users.',
  },
  {
    year: '2025',
    title: 'Content Creator Growth & Design Systems',
    organization: 'YouTube & Digital Channels',
    category: 'Creative',
    description:
      'Expanded technical content creation, produced in-depth tutorials on UI design and frontend engineering, and established the Verve Design System.',
    skillsLearned: ['Video Storytelling', 'DaVinci Resolve', 'Design Systems', 'Micro-interactions'],
    highlight: 'Surpassed 100K+ total views across creative breakdowns.',
  },
  {
    year: '2024',
    title: 'University Computer Science & Full-Stack Mastery',
    organization: 'Computer Science Department',
    category: 'Education',
    description:
      'Immersed in data structures, algorithms, computer architecture, TypeScript, Firebase, and team hackathon competitions.',
    skillsLearned: ['Data Structures', 'TypeScript', 'Firebase', 'State Machines', 'Git'],
    highlight: 'Earned Academic Honor recognition and built student learning portal Krono.',
  },
  {
    year: '2023',
    title: 'The Spark: First Web Experiences & Video Projects',
    organization: 'Self-Directed Exploration',
    category: 'Milestone',
    description:
      'Discovered the intersection of code and visual art. Started building interactive websites, learning UI design principles in Figma, and editing video projects.',
    skillsLearned: ['HTML/CSS/JS', 'Figma Basics', 'Premiere Pro', 'Responsive Web Design'],
    highlight: 'Published first public interactive web demo and YouTube tech video.',
  },
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Neural Node Canvas — Dark Interface',
    category: 'UI Concepts',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'landscape',
    description: 'High-contrast generative AI node graph with fluid bezier curves and active state glows.',
    year: '2026',
  },
  {
    id: 'gal-2',
    title: 'Minimalist Workspace & Creative Setup',
    category: 'Tech Setups',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'portrait',
    description: 'Clean dual-display desk setup optimized for coding, video color grading, and deep focus sessions.',
    year: '2025',
  },
  {
    id: 'gal-3',
    title: 'Spatial Audio Visualizer Concept',
    category: 'Visual Design',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'landscape',
    description: 'Exploration of 2.5D glassmorphic dials, tactile sliders, and responsive frequency rings.',
    year: '2025',
  },
  {
    id: 'gal-4',
    title: 'Atmospheric Architectural Night Photography',
    category: 'Creative Photography',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'portrait',
    description: 'Urban architecture captured at dusk, exploring neon illumination, depth of field, and geometric symmetry.',
    year: '2025',
  },
  {
    id: 'gal-5',
    title: 'Verve Token System & Color Scales',
    category: 'Visual Design',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'square',
    description: 'Mathematical palette calibration showing stepped luminance and high-contrast accessibility tests.',
    year: '2025',
  },
  {
    id: 'gal-6',
    title: 'Cinematic Video Production Timeline',
    category: 'Creative Photography',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'landscape',
    description: 'Multi-layer DaVinci timeline during color grading and sound effect synchronization for a tech review.',
    year: '2026',
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Alex Vance',
    role: 'Senior Frontend Architect & Hackathon Mentor',
    organization: 'OpenTech Labs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    content:
      'Sinan stands out for his ability to translate complex technology into beautiful, intuitive user interfaces. His code quality is pristine, and his eye for motion and micro-interactions makes every project feel like a bespoke product.',
    relationship: 'Mentored in Innovation Hackathon',
  },
  {
    id: 'test-2',
    name: 'Elena Rostova',
    role: 'UI/UX Design Director',
    organization: 'Aesthetic Studios',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    content:
      'Working with Sinan on design token implementation was effortless. He has a rare dual mastery of aesthetic sensibility and robust engineering rigor. Highly recommended for any ambitious web venture.',
    relationship: 'Design System Collaborator',
  },
  {
    id: 'test-3',
    name: 'David Chen',
    role: 'Peer & Student Lead Developer',
    organization: 'Krono Academy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    content:
      'Sinan has an infectious passion for continuous learning. Whether mastering new AI APIs or helping fellow students debug tricky async problems, he brings tremendous energy, patience, and creativity to the table.',
    relationship: 'University CS Peer',
  },
];
