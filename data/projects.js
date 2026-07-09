export const PROJECTS = [
  {
    id: 'monteeq',
    category: 'fullstack',
    imageLabel: 'MONTEEQ',
    meta: 'Fullstack Platform',
    title: 'Monteeq',
    description: 'A high-performance video platform for creators — featuring short-form and standard uploads, Rust-powered transcoding, creator analytics, and social interactions.',
    shortDescription: 'A full-stack video platform for creators with Rust-powered transcoding, analytics, and social features.',
    tags: ['React', 'FastAPI', 'Rust', 'PostgreSQL'],
    href: 'https://monteeq.com',
    featured: true,
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
  },
  {
    id: 'ani-pull',
    category: 'backend',
    imageLabel: 'ANI-PULL',
    meta: 'CLI Tool',
    title: 'Ani-pull',
    description: 'A robust terminal app for searching and downloading anime episodes with interactive prompts, progress tracking, and native packages for Linux distros.',
    shortDescription: 'Search and download anime episodes from the terminal with interactive prompts and Linux package support.',
    tags: ['Python', 'yt-dlp', 'CLI'],
    href: 'https://ani-pull.smasduq.xyz',
    featured: false,
    gradient: 'linear-gradient(135deg, #042f2e 0%, #134e4a 50%, #115e59 100%)',
  },
];

export const FILTERS = [
  { id: 'all', label: 'All Systems' },
  { id: 'fullstack', label: 'Fullstack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend/DevOps' },
];
