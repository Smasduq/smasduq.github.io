/**
 * ProjectCard — used by the /projects archive gallery.
 * Supports the new project shape (name/technologies/demo)
 * and the legacy shape (title/tags/href).
 */
export default function ProjectCard({ project, stagger = '', className = '', style = {} }) {
  const title = project.name || project.title;
  const tags = project.technologies || project.tags || [];
  const body = project.description || project.shortDescription || '';
  const href = project.demo || project.github || project.href;
  const hrefLabel = project.demo ? 'Live Demo' : 'GitHub';

  return (
    <article className={`project-card-full reveal ${stagger} ${className}`.trim()} style={style}>
      <div className="project-image-full" style={{ background: project.gradient }}>
        {project.logo ? (
          <img src={project.logo} alt={title} className="project-logo-img" loading="lazy" />
        ) : (
          <span className="project-image-label">{project.imageLabel}</span>
        )}
        <div className="project-image-overlay" />
      </div>
      <div className="project-info-full">
        <span className="project-meta">{project.meta}</span>
        <h3>{title}</h3>
        <p className="text-muted">{body}</p>
        <div className="work-tags">
          {tags.map((tag) => (
            <span key={tag} className="work-tag">{tag}</span>
          ))}
        </div>
        {href && (
          <div className="card-actions">
            <a href={href} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
              <span>{hrefLabel}</span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
