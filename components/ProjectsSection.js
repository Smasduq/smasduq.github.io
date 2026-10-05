'use client';

import { useCallback, useEffect, useState } from 'react';
import { PROJECTS } from '@/data/projects';

function Visual({ project }) {
  if (project.logo) {
    return (
      <div className="panel-visual-inner">
        <img src={project.logo} alt={`${project.name} logo`} className="panel-logo" loading="lazy" />
      </div>
    );
  }
  if (project.id === 'songnest') {
    // Abstract player UI —-tasteful mock, not a fake screenshot.
    return (
      <div className="panel-visual-inner">
        <div className="panel-mock" aria-hidden="true">
          <div className="panel-mock-bar"><i /><i /><i /></div>
          {[0, 1, 2].map((row) => (
            <div className="panel-mock-row" key={row}>
              <span className="panel-mock-thumb" />
              <span className="panel-mock-lines"><b /><b /></span>
            </div>
          ))}
          <div className="scene-bar"><b style={{ width: '38%' }} /></div>
        </div>
      </div>
    );
  }
  if (project.id === 'git-pixel') {
    // Abstract contribution-grid canvas.
    const cells = Array.from({ length: 7 * 12 }, (_, i) => {
      const h = (i * 2654435761 + 41) % 100;
      return h > 68 ? 'on' : '';
    });
    return (
      <div className="panel-visual-inner">
        <div className="pixel-grid" aria-hidden="true">
          {cells.map((lit, i) => (
            <i key={i} className={lit} />
          ))}
        </div>
      </div>
    );
  }
  if (project.id === 'commitor') {
    return (
      <div className="panel-visual-inner">
        <div className="panel-mock" aria-hidden="true">
          <div className="panel-mock-bar"><i /><i /><i /></div>
          <div className="scene-body">
            <div><span className="c">$</span> <span className="s"> commitor scan</span></div>
            <div><span className="k">⚠</span> <span className="s"> 2 unrelated changes found</span></div>
            <div><span className="k">✓</span> <span className="s"> split plan approved</span></div>
          </div>
        </div>
      </div>
    );
  }
  if (project.id === 'ifreeyuh') {
    // Abstract status-bar UI — tasteful mock, not a fake screenshot.
    return (
      <div className="panel-visual-inner">
        <div className="statusbar-mock" aria-hidden="true">
          <span className="statusbar-pills"><i className="on" /><i /><i /></span>
          <span className="statusbar-title" />
          <span className="statusbar-stats"><b /><b /><b /></span>
        </div>
      </div>
    );
  }
  if (project.id === 'ani-pull') {
    return (
      <div className="panel-visual-inner">
        <div className="panel-mock" aria-hidden="true">
          <div className="panel-mock-bar"><i /><i /><i /></div>
          <div className="scene-body">
            <div><span className="c">$</span> <span className="s"> ani-pull search</span></div>
            <div><span className="k">▸</span> <span className="s"> episode 12 — 1080p</span></div>
            <div><span className="k">✓</span> <span className="s"> downloaded in 38s</span></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="panel-visual-inner">
      <span className="panel-wordmark">{project.imageLabel}</span>
    </div>
  );
}

function DetailModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <button type="button" className="modal-backdrop" onClick={onClose} aria-label="Close project details">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-${project.id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-visual" style={{ background: project.gradient }}>
          <Visual project={project} />
        </div>
        <div className="modal-body">
          <button type="button" className="modal-close" onClick={onClose}>
            ← Back to work
          </button>
          <p className="panel-index"><b>{project.meta}</b></p>
          <h3 id={`modal-${project.id}`}>{project.name}</h3>
          <p className="panel-tagline">{project.tagline}</p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.75 }}>{project.description}</p>
          <div className="modal-facts">
            <div className="modal-fact">
              <h4>What it does</h4>
              <p>{project.what}</p>
            </div>
            <div className="modal-fact">
              <h4>Why I built it</h4>
              <p>{project.why}</p>
            </div>
          </div>
          <div className="panel-tags">
            {project.technologies.map((t) => (
              <span key={t} className="panel-tag">{t}</span>
            ))}
          </div>
          <div className="modal-actions">
            {project.demo && (
              <a href={project.demo} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
                <span>Live demo</span><span aria-hidden="true"> ↗</span>
              </a>
            )}
            {project.github && (
              <a href={project.github} className="btn btn-outline btn-sm" target="_blank" rel="noopener noreferrer">
                <span>GitHub</span><span aria-hidden="true"> ↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

export default function ProjectsSection() {
  const [openId, setOpenId] = useState(null);
  const open = PROJECTS.find((p) => p.id === openId) || null;
  const close = useCallback(() => setOpenId(null), []);

  return (
    <section id="work" className="section" aria-labelledby="work-heading">
      <div className="container">
        <div className="section-head">
          <p className="section-index reveal">02 / Work</p>
          <h2 className="section-title reveal" id="work-heading">Things I&apos;ve built</h2>
          <p className="section-lede reveal stagger-1">
            Real products, shipped and live. Select any project for the full story.
          </p>
        </div>

        <div className="work-list">
          {PROJECTS.map((project, i) => (
            <article key={project.id} className="reveal" style={{ transitionDelay: `${Math.min(i * 0.08, 0.24)}s` }}>
              <button
                type="button"
                className={`project-panel${i % 2 === 1 ? ' flip' : ''}`}
                onClick={() => setOpenId(project.id)}
                aria-haspopup="dialog"
                data-cursor="view"
              >
                <div className="panel-visual" style={{ background: project.gradient }}>
                  {project.featured && <span className="panel-featured-tag">Featured</span>}
                  <Visual project={project} />
                </div>
                <div className="panel-body">
                  <p className="panel-index">
                    <b>{String(i + 1).padStart(2, '0')}</b> — {project.meta}
                  </p>
                  <h3>{project.name}</h3>
                  <p className="panel-tagline">{project.tagline}</p>
                  <p>{project.description}</p>
                  <div className="panel-tags">
                    {project.technologies.map((t) => (
                      <span key={t} className="panel-tag">{t}</span>
                    ))}
                  </div>
                  <div className="panel-links">
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-link"
                      >
                        Live <span className="arrow" aria-hidden="true">↗</span>
                      </a>
                    ) : null}
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-link"
                      >
                        GitHub <span className="arrow" aria-hidden="true">↗</span>
                      </a>
                    ) : null}
                    <span className="panel-open-hint">View case →</span>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>

        <div className="work-more reveal">
          <a href="/projects" className="btn btn-outline">
            <span>Browse the archive</span>
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {open && <DetailModal project={open} onClose={close} />}
    </section>
  );
}
