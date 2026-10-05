'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '@/data/site';

function MenuIcon({ open }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="8" x2="21" y2="8" />
          <line x1="3" y1="16" x2="21" y2="16" />
        </>
      )}
    </svg>
  );
}

export default function Header({ variant = 'home' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const isHome = variant === 'home';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (!isHome) return undefined;
    const ids = ['work', 'stack', 'about', 'contact'];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <nav className="site-nav" aria-label="Main navigation">
          {isHome ? (
            <a href="#top" className="logo" aria-label="Smasduq — back to top">
              SMAS<em>DUQ</em>
            </a>
          ) : (
            <Link href="/" className="logo" aria-label="Smasduq — home">
              SMAS<em>DUQ</em>
            </Link>
          )}
          <div className="nav-links">
            {isHome ? (
              NAV_LINKS.map((l) => (
                <a key={l.id} href={l.href} className={`nav-link${active === l.id ? ' active' : ''}`}>
                  {l.label}
                </a>
              ))
            ) : (
              <>
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/projects" className="nav-link active">Projects</Link>
                <Link href="/#contact" className="nav-link">Contact</Link>
              </>
            )}
          </div>
          <a href={isHome ? '#contact' : '/#contact'} className="nav-cta">
            Let&apos;s talk
          </a>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobileNav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </nav>
      </header>

      <div
        className={`mobile-nav${menuOpen ? ' active' : ''}`}
        id="mobileNav"
        role="dialog"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {isHome ? (
          NAV_LINKS.map((l) => (
            <a key={l.id} href={l.href} onClick={close} className={`mobile-link${active === l.id ? ' active' : ''}`}>
              {l.label}
            </a>
          ))
        ) : (
          <>
            <Link href="/" className="mobile-link" onClick={close}>Home</Link>
            <Link href="/projects" className="mobile-link active" onClick={close}>Projects</Link>
            <Link href="/#contact" className="mobile-link" onClick={close}>Contact</Link>
          </>
        )}
      </div>

      {menuOpen && (
        <button type="button" className="mobile-nav-backdrop" onClick={close} aria-label="Close menu" />
      )}
    </>
  );
}
