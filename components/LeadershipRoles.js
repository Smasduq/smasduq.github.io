'use client';

import { useEffect, useRef, useState } from 'react';
import { LEADERSHIP_ROLES } from '@/data/leadership';

function CeoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.8 6.2 17l.9-5.4L3.2 7.7l5.4-.8L12 2z" />
    </svg>
  );
}

function CtoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6v6H9z" />
      <path d="M9 2v2" />
      <path d="M15 2v2" />
      <path d="M9 20v2" />
      <path d="M15 20v2" />
      <path d="M2 9h2" />
      <path d="M2 15h2" />
      <path d="M20 9h2" />
      <path d="M20 15h2" />
    </svg>
  );
}

function RoleIcon({ roleType }) {
  return roleType === 'ceo' ? <CeoIcon /> : <CtoIcon />;
}

function LeadershipCard({ company, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`leadership-card card leadership-card--animate${visible ? ' leadership-card--visible' : ''}`}
      style={{ '--card-delay': `${index * 0.12}s` }}
    >
      <div className="leadership-card-header">
        <div
          className="leadership-logo"
          style={{ background: company.accent }}
          aria-hidden="true"
        >
          {company.logoSrc ? (
            <img src={company.logoSrc} alt={company.name} />
          ) : (
            <span>{company.logoInitial}</span>
          )}
        </div>
        <div className="leadership-card-titles">
          <h3>{company.name}</h3>
          <span className={`leadership-role-badge leadership-role-badge--${company.roleType}`}>
            <RoleIcon roleType={company.roleType} />
            {company.role}
          </span>
        </div>
      </div>

      <p className="leadership-description">{company.description}</p>

      {company.website && (
        <div className="leadership-actions">
          <a
            href={company.website}
            className="btn btn-outline btn-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Website
          </a>
        </div>
      )}
    </article>
  );
}

export default function LeadershipRoles() {
  const sectionRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setHeaderVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="leadership"
      ref={sectionRef}
      className="section section--leadership"
      aria-labelledby="leadership-heading"
    >
      <div className="section-glow section-glow--leadership" aria-hidden="true" />
      <div className="container">
        <div className={`section-header leadership-header${headerVisible ? ' leadership-header--visible' : ''}`}>
          <span className="section-label">Executive</span>
          <h2 id="leadership-heading">Leadership Roles</h2>
          <p>Building innovative products and leading technology-driven companies.</p>
        </div>

        <div className="leadership-grid">
          {LEADERSHIP_ROLES.map((company, index) => (
            <LeadershipCard key={company.id} company={company} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
