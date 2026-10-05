/**
 * Site-wide editable data: tech stack, current work, links.
 * Only technologies actually present in the projects above are listed.
 */

export const NAV_LINKS = [
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'stack', label: 'Stack', href: '#stack' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/Smasduq' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/smasduq' },
  { label: 'X / Twitter', href: 'https://x.com/smasduq_' },
];

export const TECHNOLOGIES = [
  {
    category: 'Languages',
    items: [
      { name: 'JavaScript', note: 'UI logic across Monteeq and LinkBio.' },
      { name: 'TypeScript', note: 'Songnest frontend and typed APIs.' },
      { name: 'Python', note: 'FastAPI backends and the Ani-pull CLI.' },
      { name: 'Rust', note: 'Transcoding, CLIs, and desktop backends.' },
      { name: 'SQL', note: 'PostgreSQL schemas for links, videos, analytics.' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React', note: 'Component-driven product interfaces.' },
      { name: 'Next.js', note: 'Fast server-rendered pages — powers LinkBio.' },
      { name: 'Tauri', note: 'Desktop shell for the Songnest player.' },
      { name: 'GTK4', note: 'Status-bar UI for iFreeYuh on Wayland.' },
      { name: 'CSS', note: 'Hand-written vanilla CSS, no frameworks.' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'FastAPI', note: 'Custom APIs for LinkBio and Monteeq.' },
      { name: 'PostgreSQL', note: 'Primary datastore for both platforms.' },
      { name: 'yt-dlp', note: 'Download engine behind Ani-pull.' },
    ],
  },
  {
    category: 'Shipping',
    items: [
      { name: 'Vercel', note: 'Hosting for fast-loading frontends.' },
      { name: 'AWS', note: 'Cloud infrastructure.' },
      { name: 'Oracle', note: 'Cloud hosting (OCI).' },
      { name: 'Linux', note: 'Native packaging target for Ani-pull.' },
      { name: 'Git', note: 'Version control across every project.' },
    ],
  },
];

/** Editable: what is currently being worked on. Must reference real projects. */
export const CURRENTLY_BUILDING = [
  {
    index: '01',
    name: 'Monteeq',
    note: 'Video platform — transcoding, analytics, social features.',
    href: 'https://monteeq.com',
  },
  {
    index: '02',
    name: 'Commitor',
    note: 'Git companion — scan and split commits cleanly.',
    href: 'https://github.com/Commitor-AI/commitor',
  },
  {
    index: '03',
    name: 'Songnest',
    note: 'Free music player — early alpha, pluggable sources.',
    href: 'https://github.com/Smasduq/songnest',
  },
  {
    index: '04',
    name: 'LinkBio',
    note: 'Link management, themes, analytics.',
    href: 'https://link.smasduq.xyz',
  },
  {
    index: '05',
    name: 'Ani-pull',
    note: 'CLI polish and Linux packaging.',
    href: 'https://ani-pull.smasduq.xyz',
  },
];

/** Minimal journey — no invented dates or achievements. */
export const JOURNEY = [
  {
    title: 'Learning by shipping',
    text: 'Three years of fullstack work — JavaScript frontends, Python backends, and shipping real products instead of tutorials.',
  },
  {
    title: 'Leading product teams',
    text: 'Founder & CEO of Monteeq — owning product vision, technical strategy, and engineering quality.',
  },
  {
    title: 'Now',
    text: 'Building Monteeq, Songnest, and a shelf of developer tools — and turning experiments into products people can use.',
  },
];
