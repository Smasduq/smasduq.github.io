'use client';

import { useEffect, useRef, useState } from 'react';

// Words that cycle through the typewriter subtitle
const CYCLING_WORDS = [
  'scalable',
  'fast',
  'accessible',
  'elegant',
  'robust',
];

// Skill chips shown below the CTA buttons
const CHIPS = [
  'React', 'Next.js', 'FastAPI', 'Rust', 'PostgreSQL', 'TypeScript',
];

// The fake code shown in the right-column decoration
const CODE_LINES = [
  { indent: 0, parts: [{ t: 'kw', v: 'const ' }, { t: 'fn', v: 'engineer' }, { t: '', v: ' = {' }] },
  { indent: 1, parts: [{ t: 'str', v: '"name"' }, { t: '', v: ':  ' }, { t: 'str', v: '"Sadiqu",' }] },
  { indent: 1, parts: [{ t: 'str', v: '"age"' }, { t: '', v: ':   ' }, { t: 'num', v: '16,' }] },
  { indent: 1, parts: [{ t: 'str', v: '"exp"' }, { t: '', v: ':   ' }, { t: 'str', v: '"3+ years",' }] },
  { indent: 1, parts: [{ t: 'str', v: '"stack"' }, { t: '', v: ': [' }, { t: 'str', v: '"FS"' }, { t: '', v: '],' }] },
  { indent: 1, parts: [{ t: 'fn', v: 'build' }, { t: '', v: ': () ' }, { t: 'kw', v: '=> ' }, { t: 'str', v: '"🚀",' }] },
  { indent: 0, parts: [{ t: '', v: '};' }] },
  { indent: 0, parts: [{ t: 'muted', v: '// ready to ship' }, { t: 'cursor', v: '' }] },
];

function CodePart({ type, value }) {
  if (type === 'cursor') return <span className="code-cursor" aria-hidden="true" />;
  const cls = type ? `code-${type}` : '';
  return <span className={cls}>{value}</span>;
}

function CodeBlock() {
  return (
    <div className="hero-code-block reveal stagger-1" aria-hidden="true">
      <div className="hero-code-chrome">
        <span className="chrome-dot chrome-dot--red"   />
        <span className="chrome-dot chrome-dot--amber" />
        <span className="chrome-dot chrome-dot--green" />
      </div>
      {CODE_LINES.map((line, i) => (
        <div key={i} className="code-line" style={{ paddingLeft: `${line.indent * 16}px` }}>
          {line.parts.map((p, j) => (
            <CodePart key={j} type={p.t} value={p.v} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const heroRef  = useRef(null);
  const wordRef  = useRef(null);

  // Typewriter cycling word
  const [wordIdx,   setWordIdx]   = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting,  setDeleting]  = useState(false);

  /* ── Mouse parallax ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pref) return undefined;

    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      hero.style.setProperty('--mouse-x', `${x * 18}px`);
      hero.style.setProperty('--mouse-y', `${y * 18}px`);
      hero.style.setProperty('--glow-x',  `${x * 36}px`);
      hero.style.setProperty('--glow-y',  `${y * 36}px`);
    };

    hero.addEventListener('mousemove', onMove);
    return () => hero.removeEventListener('mousemove', onMove);
  }, []);

  /* ── Typewriter effect ── */
  useEffect(() => {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pref) { setDisplayed(CYCLING_WORDS[0]); return undefined; }

    const target = CYCLING_WORDS[wordIdx];
    let timeout;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % CYCLING_WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx]);

  return (
    <section className="hero" ref={heroRef}>
      {/* Background layers */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="blob blob-1" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />
      <div className="blob blob-3" aria-hidden="true" />
      <div className="aurora-beam aurora-beam--1" aria-hidden="true" />
      <div className="aurora-beam aurora-beam--2" aria-hidden="true" />
      <div className="aurora-beam aurora-beam--3" aria-hidden="true" />
      <img
        src="/img/hero_bg.png"
        alt=""
        className="hero-bg"
        style={{ transform: 'translate(var(--mouse-x, 0), var(--mouse-y, 0))' }}
      />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-glow"   aria-hidden="true" />

      <div className="container hero-container">
        {/* ── Left: content ── */}
        <div className="hero-content reveal active">
          <span className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            available for new projects
          </span>

          <h1>
            <span className="hero-title-name">Sadiqu Muhammad Bello</span>
            <span className="hero-title-line">Fullstack Engineer</span>
            <span className="hero-title-line hero-title-accent">&amp; Solutions Architect</span>
          </h1>

          <p className="hero-subtitle">
            I build{' '}
            <span className="hero-typewriter-word" ref={wordRef} aria-live="polite">
              {displayed}
            </span>
            {' '}digital experiences — clean architecture, seamless interactions, full stack.
          </p>

          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">
              <span>View Portfolio</span>
            </a>
            <a href="#contact" className="btn btn-outline">
              <span>Let&apos;s Talk</span>
            </a>
          </div>

          {/* Skill chips */}
          <div className="hero-chips" aria-label="Core technologies">
            {CHIPS.map((chip) => (
              <span key={chip} className="chip">
                <span className="chip-dot" aria-hidden="true" />
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right: animated code block ── */}
        <div className="hero-visual" aria-hidden="true">
          <CodeBlock />
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
