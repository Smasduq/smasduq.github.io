'use client';

import { useEffect, useRef } from 'react';

const clamp = (v, min = -1, max = 1) => Math.min(max, Math.max(min, v));
const rand = (min, max) => min + Math.random() * (max - min);

/**
 * BabyMascot — a hand-designed character with personality, not a
 * manufactured mascot. Deliberately imperfect: uneven eyes, crooked
 * beanie, messy hair tufts, a mole, mismatched blush, crooked pocket.
 *
 * Moods cycle irregularly: curious (default smirk), surprised,
 * confused (head tilt), sleepy (drooping lids + Zzz). Blinks are
 * JS-scheduled with random timing — occasional double or slow blinks.
 * Nothing loops perfectly: drift uses layered sine timing.
 *
 * Perf: transform/opacity only, single rAF loop, paused offscreen
 * or when the tab hides. Static under prefers-reduced-motion.
 */
export default function BabyMascot() {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const head = stage.querySelector('.baby-head');
    const bob = stage.querySelector('.baby-bob');
    const lids = stage.querySelector('.baby-lids');
    let raf = 0;
    let inView = true;
    let hidden = false;

    // gaze
    let tX = 0;
    let tY = 0;
    let cX = 0;
    let cY = 0;
    let wX = 0;
    let wY = 0;
    let lastWander = 0;
    let lastMouse = 0;
    let scrollT = 0;

    // blink state machine
    let blinkPhase = null;
    let nextBlink = performance.now() + 1800;

    // expression state machine: null | 'surprised' | 'confused' | 'sleepy'
    let expr = null;
    let exprUntil = 0;
    let nextExpr = performance.now() + 6000;
    let confusedTilt = 0;
    let confusedDir = 1;

    // arm twitch
    let nextTwitch = performance.now() + 8000;

    const setExpr = (next) => {
      stage.classList.remove('expr-surprised', 'expr-confused', 'expr-sleepy');
      expr = next;
      if (next) stage.classList.add(`expr-${next}`);
    };

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

    const lidScale = (now) => {
      if (expr === 'sleepy') return 0.3 + Math.sin(now / 320) * 0.05;
      if (!blinkPhase && now >= nextBlink) {
        const r = Math.random();
        if (r < 0.13) blinkPhase = { t0: now, close: 380, hold: 130, open: 260 };
        else if (r < 0.29) blinkPhase = { t0: now, close: 70, hold: 60, open: 110, double: true };
        else blinkPhase = { t0: now, close: 80, hold: 50, open: 130 };
      }
      if (!blinkPhase) return 1;
      const e = now - blinkPhase.t0;
      const { close, hold, open } = blinkPhase;
      let s;
      if (e < close) s = 1 - (e / close) * 0.94;
      else if (e < close + hold) s = 0.06;
      else if (e < close + hold + open) s = 0.06 + ((e - close - hold) / open) * 0.94;
      else {
        if (blinkPhase.double) {
          blinkPhase = { t0: now + 200, close: 70, hold: 50, open: 120 };
          return 1;
        }
        blinkPhase = null;
        nextBlink = now + rand(2400, 6200);
        return 1;
      }
      return s;
    };

    const tick = (now) => {
      // idle gaze wander
      if (now - lastWander > rand(4200, 7000) && now - lastMouse > 4000) {
        lastWander = now;
        wX = rand(-0.55, 0.55);
        wY = rand(-0.35, 0.35);
      }
      const mouseFresh = now - lastMouse < 4000;
      const gX = mouseFresh ? tX : wX;
      const gY = mouseFresh ? tY : wY;
      cX += (gX - cX) * 0.07;
      cY += (gY - cY) * 0.07;

      // irregular mood swings
      if (!expr && now >= nextExpr && !stage.classList.contains('excited')) {
        const pick = Math.random();
        const mood = pick < 0.34 ? 'surprised' : pick < 0.67 ? 'confused' : 'sleepy';
        confusedDir = Math.random() < 0.5 ? -1 : 1;
        setExpr(mood);
        exprUntil = now + rand(2200, 3400);
        nextExpr = now + rand(7000, 12000);
      }
      if (expr && now >= exprUntil) {
        setExpr(null);
        blinkPhase = null;
        nextBlink = now + rand(1200, 2500);
      }

      // confused head tilt eases in and out
      const tiltTarget = expr === 'confused' ? 7 * confusedDir : 0;
      confusedTilt += (tiltTarget - confusedTilt) * 0.08;

      // imperfect posture drift — layered timing never loops cleanly
      const t = now / 1000;
      const lean = Math.sin(t * 0.5) * 1.1 + Math.sin(t * 0.23 + 1.3) * 0.9;
      if (bob) bob.style.transform = `rotate(${(1 + lean).toFixed(2)}deg)`;

      stage.style.setProperty('--px', `${(cX * 7).toFixed(2)}px`);
      stage.style.setProperty('--py', `${(cY * 5).toFixed(2)}px`);
      if (head) {
        head.style.transform =
          `translate(${(cX * 5).toFixed(2)}px, ${(cY * 4 - 1).toFixed(2)}px) rotate(${(-2 + cX * 3.5 + confusedTilt).toFixed(2)}deg)`;
      }
      if (lids) lids.style.transform = `scaleY(${lidScale(now).toFixed(3)})`;
      stage.style.transform = `translateY(${(scrollT * 26).toFixed(1)}px)`;

      // occasional arm twitch
      if (now >= nextTwitch) {
        nextTwitch = now + rand(9000, 16000);
        stage.classList.add('twitching');
        window.setTimeout(() => stage.classList.remove('twitching'), 600);
      }

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

    const waveTimer = window.setInterval(() => {
      if (!inView || hidden) return;
      stage.classList.add('waving');
      window.setTimeout(() => stage.classList.remove('waving'), 2300);
    }, 11000);

    const cta = document.querySelector('.hero-actions .btn-primary');
    let excitedTimer = 0;
    const onCtaEnter = () => {
      setExpr(null);
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
        aria-label="Smasduq's mascot — a curious, slightly mischievous cartoon baby in a crooked beanie and hoodie, hanging out"
      >
        <defs>
          <radialGradient id="baby-skin" cx="50%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#ffe0c6" />
            <stop offset="70%" stopColor="#f0b28e" />
            <stop offset="100%" stopColor="#dd9468" />
          </radialGradient>
          <linearGradient id="baby-hoodie" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#182019" />
            <stop offset="100%" stopColor="#0b0f0c" />
          </linearGradient>
          <radialGradient id="baby-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(16,185,129,0.20)" />
            <stop offset="70%" stopColor="rgba(16,185,129,0)" />
          </radialGradient>
        </defs>

        <ellipse cx="170" cy="190" rx="145" ry="160" fill="url(#baby-halo)" />
        <ellipse className="baby-shadow" cx="170" cy="370" rx="66" ry="13" fill="#000" opacity="0.5" />

        <g className="baby-breathe">
        <g className="baby-bob">
          {/* feet pointing slightly different ways */}
          <ellipse cx="140" cy="362" rx="26" ry="13" fill="#111613" stroke="rgba(255,255,255,0.12)" transform="rotate(-8 140 362)" />
          <ellipse cx="201" cy="358" rx="24" ry="14" fill="#111613" stroke="rgba(255,255,255,0.12)" transform="rotate(6 201 358)" />
          <line x1="120" y1="371" x2="160" y2="371" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          <line x1="183" y1="369" x2="217" y2="369" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />

          {/* left arm — twitches sometimes */}
          <g className="baby-arm-l">
            <rect x="84" y="262" width="32" height="62" rx="16" fill="url(#baby-hoodie)" stroke="rgba(255,255,255,0.1)" transform="rotate(12 100 270)" />
            {/* stitched patch */}
            <rect x="90" y="284" width="22" height="22" rx="6" fill="#0f1a15" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 2" transform="rotate(12 101 295)" />
            <circle cx="92" cy="332" r="14" fill="url(#baby-skin)" />
          </g>

          {/* right arm — waves */}
          <g className="baby-arm">
            <rect x="224" y="258" width="32" height="64" rx="16" fill="url(#baby-hoodie)" stroke="rgba(255,255,255,0.1)" transform="rotate(-8 240 266)" />
            <circle cx="248" cy="328" r="16" fill="url(#baby-skin)" />
          </g>

          {/* hoodie, slightly lopsided */}
          <rect x="106" y="248" width="128" height="100" rx="34" fill="url(#baby-hoodie)" stroke="rgba(255,255,255,0.1)" />
          <path d="M148,250 Q168,263 190,250" stroke="rgba(255,255,255,0.14)" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* uneven drawstrings */}
          <line x1="157" y1="256" x2="152" y2="288" stroke="#0a0d0b" strokeWidth="4" strokeLinecap="round" />
          <line x1="183" y1="256" x2="187" y2="278" stroke="#0a0d0b" strokeWidth="4" strokeLinecap="round" />
          <circle cx="152" cy="290" r="3.5" fill="#34d399" />
          <circle cx="187" cy="280" r="3" fill="#0a0d0b" stroke="#34d399" strokeWidth="1" />
          {/* off-center print, crooked pocket */}
          <text x="167" y="298" textAnchor="middle" fontSize="18" fill="#34d399" fontFamily="'JetBrains Mono', monospace" transform="rotate(-3 167 298)">{`</>`}</text>
          <rect x="142" y="306" width="58" height="26" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.09)" transform="rotate(-4 171 319)" />

          {/* oversized, slightly off-center head */}
          <g className="baby-head">
            {/* mismatched ears */}
            <circle cx="78" cy="170" r="14" fill="#e8a87e" />
            <circle cx="263" cy="166" r="17" fill="#e8a87e" />
            <ellipse cx="168" cy="154" rx="90" ry="88" fill="url(#baby-skin)" />
            {/* rough shading, one side only */}
            <path d="M238,110 C252,140 252,180 236,208 C246,180 244,140 230,116 Z" fill="#cf8a5c" opacity="0.35" />

            {/* messy hair escaping the beanie */}
            <path d="M98,118 L82,110 L92,102 L80,96 L94,90 L88,80 L102,86 Z" fill="#2b2118" />
            <path d="M246,108 L260,100 L254,116 Z" fill="#2b2118" />
            <path d="M228,72 C236,62 244,60 250,62 C244,66 240,70 238,76 Z" fill="#2b2118" />

            {/* beanie, worn crooked */}
            <g transform="rotate(-5 170 110)">
              <path d="M82,150 C82,88 120,60 170,60 C220,60 258,88 258,150 Z" fill="#151b18" stroke="rgba(255,255,255,0.09)" />
              <rect x="72" y="126" width="192" height="34" rx="17" fill="#0b100d" stroke="rgba(16,185,129,0.55)" strokeWidth="2" />
              <circle cx="166" cy="143" r="7" fill="#34d399" />
            </g>

            {/* brows: one raised, one angled — mischief */}
            <rect x="114" y="161" width="28" height="7" rx="3.5" fill="#2a3430" opacity="0.85" transform="rotate(-9 128 164)" />
            <rect x="197" y="167" width="24" height="6" rx="3" fill="#2a3430" opacity="0.85" transform="rotate(11 209 170)" />

            {/* uneven eyes */}
            <g className="baby-eyes">
              <ellipse cx="130" cy="190" rx="17" ry="19" fill="#fff" />
              <ellipse cx="209" cy="187" rx="14" ry="16" fill="#fff" />
              <g className="baby-lids">
                <g className="baby-pupils">
                  <circle cx="132" cy="192" r="9" fill="#202a25" />
                  <circle cx="207" cy="189" r="7.5" fill="#202a25" />
                  <circle cx="135" cy="189" r="3" fill="#fff" />
                  <circle cx="209.5" cy="186.5" r="2.5" fill="#fff" />
                </g>
              </g>
            </g>

            <path d="M164,208 q5,5 9,1" stroke="#c08055" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* mole + mismatched blush */}
            <circle cx="222" cy="206" r="2.5" fill="#8a5a3b" />
            <ellipse className="baby-blush" cx="108" cy="216" rx="12" ry="7" fill="#ff9d8a" opacity="0.45" />
            <ellipse className="baby-blush" cx="232" cy="212" rx="8" ry="5" fill="#ff9d8a" opacity="0.3" />

            {/* mouths — one shows at a time */}
            <path className="mouth mouth-smirk" d="M148,226 Q172,242 194,223" stroke="#6b4232" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path className="mouth mouth-flat" d="M154,231 L190,228" stroke="#6b4232" strokeWidth="5" strokeLinecap="round" />
            <ellipse className="mouth mouth-o" cx="172" cy="233" rx="9" ry="11" fill="#71392b" />
            <g className="mouth mouth-smile">
              <path d="M146,224 Q170,248 196,222 Q170,236 146,224 Z" fill="#71392b" />
              <ellipse cx="170" cy="238" rx="9" ry="5" fill="#e08a7d" />
            </g>

            <text className="baby-zzz" x="258" y="118" fontSize="26" fill="#8b948d" fontFamily="'JetBrains Mono', monospace">z</text>
            <text className="baby-zzz baby-zzz--2" x="272" y="96" fontSize="18" fill="#8b948d" fontFamily="'JetBrains Mono', monospace">z</text>
          </g>
        </g>
        </g>
      </svg>
    </div>
  );
}
