export default function ProjectCard({
  project,
  variant = 'compact',
  stagger = '',
  className = '',
  style = {},
}) {
  const isFeatured = project.featured && variant === 'compact';
  const isDetailed = variant === 'detailed';

  if (isDetailed) {
    return (
      <article
        className={`project-card-full card reveal ${stagger} ${className}`.trim()}
        data-category={project.category}
        data-project-id={project.id}
        style={style}
      >
        <div
          className="project-image-full"
          style={{ background: project.gradient }}
        >
          <span className="project-image-label">{project.imageLabel}</span>
          <div className="project-image-overlay" />
        </div>
        <div className="project-info-full">
          <span className="project-meta">{project.meta}</span>
          <h3>{project.title}</h3>
          <p className="text-muted">{project.description}</p>
          <div className="work-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="work-tag">{tag}</span>
            ))}
          </div>
          <div className="card-actions">
            <a
              href={project.href}
              className="btn btn-primary btn-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
            </a>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`work-card card reveal ${stagger} ${isFeatured ? 'work-card--featured' : ''} ${className}`.trim()} style={style}>
      <div
        className="work-img"
        style={{ background: project.gradient }}
      >
        <span className="project-image-label">{project.imageLabel}</span>
        <div className="work-img-overlay" />
        {isFeatured && <span className="featured-badge">Featured</span>}
      </div>
      <div className="work-content">
        <div className="work-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="work-tag">{tag}</span>
          ))}
        </div>
        <h3>{project.title}</h3>
        <p>{project.shortDescription}</p>
        <div className="card-actions">
          <a
            href={project.href}
            className="btn btn-primary btn-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project
          </a>
        </div>
      </div>
    </article>
  );
}
