import { CURRENTLY_BUILDING } from '@/data/site';

export default function CurrentlyBuilding() {
  return (
    <section className="section" aria-labelledby="now-heading" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <p className="section-index reveal">05 / Now</p>
          <h2 className="section-title reveal" id="now-heading">Currently building</h2>
        </div>
        <div className="now-list reveal">
          {CURRENTLY_BUILDING.map((item) => (
            <a key={item.index} href={item.href} target="_blank" rel="noopener noreferrer">
              <span className="now-num">{item.index}</span>
              <span>
                <span className="now-name">{item.name}</span>
                <span className="now-note">{item.note}</span>
              </span>
              <span className="now-go" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
