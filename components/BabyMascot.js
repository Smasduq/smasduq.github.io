'use client';

import { useEffect, useRef } from 'react';

const clamp = (v, min = -1, max = 1) => Math.min(max, Math.max(min, v));

/**
 * BabyMascot — the portfolio mascot.
 * Hand-built SVG (no WebGL, no image assets): crisp at any size,
 * ~zero load cost, and fully interactive.
 *
 * Idle life: breathing bob, periodic blinking, wandering gaze.
 * Interaction: eyes + head follow the cursor, occasional wave,
 * excited reaction on CTA hover, subtle settle on scroll.
 *
 * Perf: transform/opacity only, single rAF loop, paused when
 * offscreen (IntersectionObserver) or tab hidden. Static when
 * the user prefers reduced motion.
 */
export default function BabyMascot() {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const head = stage.querySelector('.baby-head');
    let raf = 0;
    let inView = true;
    let hidden = false;

    // look targets: mouse (-1..1) blended with idle wander
    let tX = 0;
    let tY = 0;
    let cX = 0;
    let cY = 0;
    let wX = 0;
    let wY = 0;
    let lastWander = 0;
    let lastMouse = 0;
    let scrollT = 0;

    const onMove = (e) => {
      const r = stage.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      tX = clamp((e.clientX - cx) / (r.width * 1.1));
      tY = clamp((e.clientY - cy) / (r.height * 1.1));
      lastMouse = performance.now();
    };

    const onScroll = () => {
      const r = stage.getBoundingClientRect();
      scrollT = clamp(1 - r.bottom / (window.innerHeight * 1.1), 0, 1);
    };

    const tick = (now) => {
      // idle wander: glance around every few seconds when mouse is idle
      if (now - lastWander > 5200 && now - lastMouse > 4000) {
        lastWander = now;
        wX = (Math.random() * 2 - 1) * 0.55;
        wY = (Math.random() * 2 - 1) * 0.35;
      }
      const mouseFresh = now - lastMouse < 4000;
      const gX = mouseFresh ? tX : wX;
      const gY = mouseFresh ? tY : wY;

      cX += (gX - cX) * 0.07;
      cY += (gY - cY) * 0.07;

      stage.style.setProperty('--px', `${(cX * 7).toFixed(2)}px`);
      stage.style.setProperty('--py', `${(cY * 5).toFixed(2)}px`);
      if (head) {
        head.style.transform =
          `translate(${(cX * 5).toFixed(2)}px, ${(cY * 4).toFixed(2)}px) rotate(${(cX * 3.5).toFixed(2)}deg)`;
      }
      // subtle settle as the hero scrolls away (never flies around)
      stage.style.transform = `translateY(${(scrollT * 26).toFixed(1)}px)`;

      raf = requestAnimationFrame(tick);
    };

    const update = () => {
      const should = inView && !hidden;
      stage.classList.toggle('paused', !should);
      if (should && !raf) raf = requestAnimationFrame(tick);
      if (!should && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        update();
      },
      { threshold: 0 },
    );
    io.observe(stage);

    const onVis = () => {
      hidden = document.hidden;
      update();
    };
    document.addEventListener('visibilitychange', onVis);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    // occasional friendly wave
    const waveTimer = window.setInterval(() => {
      if (!inView || hidden) return;
      stage.classList.add('waving');
      window.setTimeout(() => stage.classList.remove('waving'), 2300);
    }, 9000);

    // reaction to the main CTA
    const cta = document.querySelector('.hero-actions .btn-primary');
    let excitedTimer = 0;
    const onCtaEnter = () => {
      stage.classList.add('excited', 'waving');
      window.clearTimeout(excitedTimer);
    };
    const onCtaLeave = () => {
      excitedTimer = window.setTimeout(() => {
        stage.classList.remove('excited', 'waving');
      }, 1200);
    };
    if (cta) {
      cta.addEventListener('mouseenter', onCtaEnter);
      cta.addEventListener('mouseleave', onCtaLeave);
      cta.addEventListener('focus', onCtaEnter);
      cta.addEventListener('blur', onCtaLeave);
    }

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.clearInterval(waveTimer);
      window.clearTimeout(excitedTimer);
      if (cta) {
        cta.removeEventListener('mouseenter', onCtaEnter);
        cta.removeEventListener('mouseleave', onCtaLeave);
        cta.removeEventListener('focus', onCtaEnter);
        cta.removeEventListener('blur', onCtaLeave);
      }
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="baby-stage" ref={stageRef}>
      <svg
        className="baby-svg"
        viewBox="0 0 340 400"
        role="img"
        aria-label="Smasduq's developer mascot — a cheerful cartoon baby wearing a dark hoodie with green accents"
      >
        <defs>
          <radialGradient id="baby-skin" cx="50%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#ffe3cb" />
            <stop offset="70%" stopColor="#f2b795" />
            <stop offset="100%" stopColor="#e29a72" />
          </radialGradient>
          <linearGradient id="baby-hoodie" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#182019" />
            <stop offset="100%" stopColor="#0c100d" />
          </linearGradient>
          <radialGradient id="baby-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(16,185,129,0.20)" />
            <stop offset="70%" stopColor="rgba(16,185,129,0)" />
          </radialGradient>
        </defs>

        <ellipse cx="170" cy="190" rx="145" ry="160" fill="url(#baby-halo)" />
        <ellipse className="baby-shadow" cx="170" cy="370" rx="66" ry="13" fill="#000" opacity="0.5" />

        <g className="baby-bob">
          {/* feet */}
          <ellipse cx="142" cy="360" rx="26" ry="14" fill="#111613" stroke="rgba(255,255,255,0.12)" />
          <ellipse cx="198" cy="360" rx="26" ry="14" fill="#111613" stroke="rgba(255,255,255,0.12)" />
          <line x1="122" y1="370" x2="162" y2="370" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          <line x1="178" y1="370" x2="218" y2="370" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />

          {/* resting left arm */}
          <g>
            <rect x="86" y="260" width="32" height="64" rx="16" fill="url(#baby-hoodie)" stroke="rgba(255,255,255,0.1)" transform="rotate(10 102 268)" />
            <circle cx="94" cy="330" r="15" fill="url(#baby-skin)" />
          </g>

          {/* waving right arm */}
          <g className="baby-arm">
            <rect x="222" y="260" width="32" height="64" rx="16" fill="url(#baby-hoodie)" stroke="rgba(255,255,255,0.1)" transform="rotate(-10 238 268)" />
            <circle cx="246" cy="330" r="15" fill="url(#baby-skin)" />
          </g>

          {/* hoodie body */}
          <rect x="108" y="246" width="124" height="100" rx="36" fill="url(#baby-hoodie)" stroke="rgba(255,255,255,0.1)" />
          <path d="M150,250 Q170,262 190,250" stroke="rgba(255,255,255,0.14)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <line x1="158" y1="256" x2="154" y2="284" stroke="#0a0d0b" strokeWidth="4" strokeLinecap="round" />
          <line x1="182" y1="256" x2="186" y2="284" stroke="#0a0d0b" strokeWidth="4" strokeLinecap="round" />
          <circle cx="154" cy="286" r="3.5" fill="#34d399" />
          <circle cx="186" cy="286" r="3.5" fill="#34d399" />
          <text x="170" y="299" textAnchor="middle" fontSize="19" fill="#34d399" fontFamily="'JetBrains Mono', monospace">&lt;/&gt;</text>
          <rect x="140" y="306" width="60" height="26" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.09)" />

          {/* oversized head */}
          <g className="baby-head">
            <circle cx="80" cy="168" r="15" fill="#eeb28c" />
            <circle cx="260" cy="168" r="15" fill="#eeb28c" />
            <circle cx="170" cy="152" r="90" fill="url(#baby-skin)" />
            {/* beanie */}
            <path d="M82,150 C82,88 120,60 170,60 C220,60 258,88 258,150 Z" fill="#151b18" stroke="rgba(255,255,255,0.09)" />
            <rect x="74" y="124" width="192" height="36" rx="18" fill="#0b100d" stroke="rgba(16,185,129,0.55)" strokeWidth="2" />
            <circle cx="170" cy="142" r="7" fill="#34d399" />
            {/* face */}
            <g className="baby-eyes">
              <ellipse cx="132" cy="188" rx="16" ry="18" fill="#fff" />
              <ellipse cx="208" cy="188" rx="16" ry="18" fill="#fff" />
              <g className="baby-pupils">
                <circle cx="132" cy="190" r="8.5" fill="#202a25" />
                <circle cx="208" cy="190" r="8.5" fill="#202a25" />
                <circle cx="135" cy="187" r="3" fill="#fff" />
                <circle cx="211" cy="187" r="3" fill="#fff" />
              </g>
            </g>
            <rect x="118" y="164" width="26" height="6" rx="3" fill="#2a3430" opacity="0.8" />
            <rect x="196" y="164" width="26" height="6" rx="3" fill="#2a3430" opacity="0.8" />
            <path d="M166,206 q4,4 8,0" stroke="#c98a63" strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse className="baby-blush" cx="110" cy="214" rx="11" ry="6.5" fill="#ff9d8a" opacity="0.4" />
            <ellipse className="baby-blush" cx="230" cy="214" rx="11" ry="6.5" fill="#ff9d8a" opacity="0.4" />
            <path className="smile-calm" d="M150,224 Q170,240 190,224" stroke="#6b4232" strokeWidth="5" fill="none" strokeLinecap="round" />
            <g className="smile-happy">
              <path d="M146,222 Q170,252 194,222 Z" fill="#71392b" />
              <ellipse cx="170" cy="240" rx="9" ry="5" fill="#e08a7d" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
