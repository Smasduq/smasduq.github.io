import { TECHNOLOGIES } from '@/data/site';

export default function TechStack() {
  return (
    <section id="stack" className="section" aria-labelledby="stack-heading">
      <div className="container">
        <div className="section-head">
          <p className="section-index reveal">03 / Stack</p>
          <h2 className="section-title reveal" id="stack-heading">What I build with</h2>
          <p className="section-lede reveal stagger-1">
            Only tools that actually ship in my projects — nothing decorative.
          </p>
        </div>
        <div className="stack-grid">
          {TECHNOLOGIES.map((group, gi) => (
            <div key={group.category} className={`stack-card reveal stagger-${(gi % 4) + 1}`}>
              <h3>{group.category}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item.name} title={item.note}>
                    <span className="stack-name">{item.name}</span>
                    <span className="stack-note">{item.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
