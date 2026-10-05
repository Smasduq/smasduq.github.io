import { JOURNEY } from '@/data/site';
import { LEADERSHIP_ROLES } from '@/data/leadership';

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container">
        <p className="section-index reveal">04 / About</p>
        <div className="about-grid">
          <div className="reveal">
            <div className="about-photo">
              <img
                src="/img/smasduq.jpeg"
                alt="Sadiqu Muhammad Bello — software developer and founder"
                width={600}
                height={600}
                loading="lazy"
              />
            </div>
          </div>
          <div>
            <h2 className="section-title reveal" id="about-heading">
              Building, learning, shipping.
            </h2>
            <div className="about-copy reveal stagger-1">
              <p>
                I&apos;m <strong>Sadiqu Muhammad Bello</strong> — a software
                developer and founder with 3 years of fullstack experience. I
                work across modern JavaScript frontends and Python backends,
                with Rust where performance matters.
              </p>
              <p>
                I lead product and engineering as <strong>Founder &amp; CEO of
                Monteeq</strong> — owning vision, architecture, and the details
                that make software feel fast and considered.
              </p>
            </div>
            <ul className="journey">
              {JOURNEY.map((step, i) => (
                <li key={step.title} className="reveal">
                  <span className="journey-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="roles-row">
              {LEADERSHIP_ROLES.map((role) => (
                <div key={role.id} className="role-card reveal">
                  <h4>{role.name}</h4>
                  <span>{role.role}</span>
                  {role.website && (
                    <p>
                      <a href={role.website} target="_blank" rel="noopener noreferrer" className="text-link" style={{ fontSize: '0.85rem' }}>
                        {role.website.replace('https://', '')} <span aria-hidden="true">↗</span>
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
