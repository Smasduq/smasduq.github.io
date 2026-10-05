'use client';

import { useEffect, useRef, useState } from 'react';
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
  const toggleRef = useRef(null);
  const menuRef = useRef(null);
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

  // mac-menu keyboard support: arrows move, Enter opens, Esc closes
  const onMenuKeyDown = (e) => {
    const items = Array.from(
      menuRef.current?.querySelectorAll('[role="menuitem"]') || [],
    );
    const i = items.indexOf(document.activeElement);
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      toggleRef.current?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      (items[i + 1] || items[0])?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      (items[i - 1] || items[items.length - 1])?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      items[items.length - 1]?.focus();
    }
  };

  useEffect(() => {
    if (menuOpen) {
      menuRef.current?.querySelector('[role="menuitem"]')?.focus();
    }
  }, [menuOpen]);

  const mobileItemProps = (isActive) => ({
    role: 'menuitem',
    tabIndex: menuOpen ? 0 : -1,
    className: `mobile-link${isActive ? ' active' : ''}`,
    onClick: close,
  });

  const renderCheck = (isActive) =>
    isActive ? (
      <span className="mac-check" aria-hidden="true">
        ✓
      </span>
    ) : null;

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
            ref={toggleRef}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobileNav"
            aria-haspopup="menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </nav>
      </header>

      <div
        className={`mobile-nav${menuOpen ? ' active' : ''}`}
        id="mobileNav"
        ref={menuRef}
        role="menu"
        aria-label="Site menu"
        aria-hidden={!menuOpen}
        onKeyDown={onMenuKeyDown}
      >
        <div className="mac-menu-bar" aria-hidden="true">
          <span className="mac-lights">
            <i className="r" />
            <i className="y" />
            <i className="g" />
          </span>
          <span className="mac-menu-title">smasduq</span>
        </div>
        {isHome ? (
          NAV_LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <a key={l.id} href={l.href} {...mobileItemProps(isActive)}>
                <span>{l.label}</span>
                {renderCheck(isActive)}
              </a>
            );
          })
        ) : (
          <>
            <Link href="/" {...mobileItemProps(false)}>
              <span>Home</span>
            </Link>
            <Link href="/projects" {...mobileItemProps(true)}>
              <span>Projects</span>
              {renderCheck(true)}
            </Link>
            <Link href="/#contact" {...mobileItemProps(false)}>
              <span>Contact</span>
            </Link>
          </>
        )}
        <div className="mac-sep" role="separator" aria-hidden="true" />
        <a
          href={isHome ? '#contact' : '/#contact'}
          {...mobileItemProps(false)}
        >
          <span>Get in touch</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>

      {menuOpen && (
        <button type="button" className="mobile-nav-backdrop" onClick={close} aria-label="Close menu" />
      )}
    </>
  );
}
