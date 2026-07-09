export default function SectionHeader({ label, title, description, align = 'center', className = '' }) {
  return (
    <div className={`section-header reveal ${align === 'left' ? 'section-header--left' : ''} ${className}`}>
      {label && <span className="section-label">{label}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
