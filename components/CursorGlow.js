'use client';

import { useEffect, useRef } from 'react';

/**
 * CursorGlow — a large soft amber radial that follows the cursor.
 * Uses rAF + lerp so the motion is smooth and never janky.
 * Hidden on touch devices (pointer: coarse) via CSS.
 */
export default function CursorGlow() {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return undefined;

    // Don't run on touch / coarse-pointer devices
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || prefersReduced) {
      dot.style.display = 'none';
      return undefined;
    }

    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;
    let curX   = mouseX;
    let curY   = mouseY;
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      curX = lerp(curX, mouseX, 0.09);
      curY = lerp(curY, mouseY, 0.09);
      dot.style.transform = `translate(${curX - 200}px, ${curY - 200}px)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="cursor-glow"
      aria-hidden="true"
    />
  );
}
