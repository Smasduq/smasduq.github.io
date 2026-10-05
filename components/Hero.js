'use client';

import dynamic from 'next/dynamic';
import { SOCIALS } from '@/data/site';

// Mascot is code-split so the hero stays light until it hydrates.
const BabyMascot = dynamic(() => import('@/components/BabyMascot'), {
  ssr: false,
  loading: () => <div className="baby-placeholder" aria-hidden="true" />,
});

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="container hero-container">
        <div>
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            available for new projects
          </span>
          <h1 id="hero-heading">
            SMAS
            <span className="thin">DUQ</span>
          </h1>
          <p className="hero-role">
            Software Developer<span className="sep">·</span>Founder<span className="sep">·</span>Product Builder
          </p>
          <p className="hero-sub">
            I build software, experiment with ideas, and turn projects into real
            products — from developer tools to consumer applications.
          </p>
          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">
              <span>View my work</span>
              <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a
              href="https://github.com/Smasduq"
              className="btn btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>GitHub</span>
              <span className="arrow" aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="hero-meta">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <BabyMascot />
        </div>
      </div>

      <div className="hero-fade" aria-hidden="true" />
      <div className="hero-scroll" aria-hidden="true">
        <span>scroll</span>
        <i />
      </div>
    </section>
  );
}
