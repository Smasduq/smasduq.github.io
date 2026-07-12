'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

function MenuIcon({ open }) {
  if (open) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

const HOME_SECTIONS = [
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'projects', label: 'Projects', href: '/projects', isRoute: true },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'leadership', label: 'Leadership', href: '#leadership' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Header({ variant = 'home' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const isHome = variant === 'home';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!isHome) return undefined;

    const sectionIds = ['work', 'about', 'leadership', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  const renderNavLink = (item, isMobile = false) => {
    const isActive = isHome && !item.isRoute && activeSection === item.id;
    const className = `${isMobile ? 'mobile-link' : 'nav-link'}${isActive ? ' active' : ''}`;

    if (item.isRoute) {
      return (
        <Link
          key={item.id}
          href={item.href}
          className={className}
          onClick={isMobile ? closeMenu : undefined}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <a
        key={item.id}
        href={item.href}
        className={className}
        onClick={isMobile ? closeMenu : undefined}
      >
        {item.label}
      </a>
    );
  };

  return (
    <>
      <header id="header" className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="container header-container">
          <nav className="site-nav" aria-label="Main navigation">
            {isHome ? (
              <a href="#" className="logo" aria-label="Sadiqu Muhammad Bello home">SMASDUQ</a>
            ) : (
              <Link href="/" className="logo" aria-label="Sadiqu Muhammad Bello home">SMASDUQ</Link>
            )}

            <div className="nav-links">
              {isHome ? (
                HOME_SECTIONS.map((item) => renderNavLink(item))
              ) : (
                <>
                  <Link href="/" className="nav-link">Home</Link>
                  <Link href="/projects" className="nav-link active">Projects</Link>
                  <Link href="/#contact" className="nav-link">Contact</Link>
                </>
              )}
            </div>

            <button
              className="menu-toggle"
              id="menuToggle"
              onClick={toggleMenu}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobileNav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </nav>
        </div>
      </header>

      <div
        className={`mobile-nav${menuOpen ? ' active' : ''}`}
        id="mobileNav"
        role="dialog"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {isHome ? (
          HOME_SECTIONS.map((item, index) => (
            <span key={item.id} style={{ transitionDelay: `${(index + 1) * 0.08}s` }}>
              {renderNavLink(item, true)}
            </span>
          ))
        ) : (
          <>
            <Link href="/" className="mobile-link">Home</Link>
            <Link href="/projects" className="mobile-link">Projects</Link>
            <Link href="/#contact" className="mobile-link">Contact</Link>
          </>
        )}
      </div>

      {menuOpen && (
        <button
          type="button"
          className="mobile-nav-backdrop"
          onClick={closeMenu}
          aria-label="Close menu"
        />
      )}
    </>
  );
}
