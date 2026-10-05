'use client';

import { useEffect, useRef } from 'react';

/**
 * CursorGlow — soft emerald ambient glow following the cursor,
 * plus a small "View →" label over project panels (desktop only).
 * Never replaces the native cursor; hidden on touch devices
 * and when the user prefers reduced motion.
 */
export default function CursorGlow() {
  const glowRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    const label = labelRef.current;
    if (!glow || !label) return undefined;

    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || reduced) {
      glow.style.display = 'none';
      label.style.display = 'none';
      return undefined;
    }

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let gx = mx;
    let gy = my;
    let lx = mx;
    let ly = my;
    let raf = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      const t = e.target;
      const panel = t && t.closest ? t.closest('[data-cursor="view"]') : null;
      label.classList.toggle('on', Boolean(panel));
    };

    const tick = () => {
      gx += (mx - gx) * 0.08;
      gy += (my - gy) * 0.08;
      lx += (mx - lx) * 0.35;
      ly += (my - ly) * 0.35;
      glow.style.transform = `translate(${gx - 200}px, ${gy - 200}px)`;
      label.style.transform = '';
      label.style.left = `${lx}px`;
      label.style.top = `${ly}px`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={labelRef} className="cursor-label" aria-hidden="true">View →</div>
    </>
  );
}
