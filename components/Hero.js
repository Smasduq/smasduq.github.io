'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const handleMouseMove = (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      hero.style.setProperty('--mouse-x', `${x * 20}px`);
      hero.style.setProperty('--mouse-y', `${y * 20}px`);
      hero.style.setProperty('--glow-x', `${x * 40}px`);
      hero.style.setProperty('--glow-y', `${y * 40}px`);
    };

    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-grid" aria-hidden="true" />
      {/* Sunrise blobs: top-left navy sky, bottom-right amber horizon, mid blush */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <img
        src="/img/hero_bg.png"
        alt=""
        className="hero-bg"
        style={{ transform: 'translate(var(--mouse-x, 0), var(--mouse-y, 0))' }}
      />
      <div className="hero-overlay" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="container hero-container">
        <div className="hero-content reveal active">
          <span className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            3+ Years of Professional Experience
          </span>
          <h1>
            <span className="hero-title-name">Sadiqu Muhammad Bello</span>
            <span className="hero-title-line">Fullstack Engineer</span>
            <span className="hero-title-line hero-title-accent">&amp; Solutions Architect</span>
          </h1>
          <p className="hero-subtitle">
            I build high-performance, scalable, and accessible digital experiences. Focused on clean
            architecture and seamless user interactions across the entire stack.
          </p>
          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">
              <span>View Portfolio</span>
            </a>
            <a href="#contact" className="btn btn-outline">
              <span>Let&apos;s Talk</span>
            </a>
          </div>
        </div>

        <div className="hero-visual reveal stagger-1" aria-hidden="true">
          <div className="hero-orbit">
            <div className="hero-orbit-ring hero-orbit-ring--1" />
            <div className="hero-orbit-ring hero-orbit-ring--2" />
            <div className="hero-orbit-core">
              <span>S</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
