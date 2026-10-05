/**
 * Decorative contribution-style grid — abstract, not real GitHub data.
 * Intentionally static: no external API calls that could slow or break the page.
 */
const CELLS = Array.from({ length: 26 * 7 }, (_, i) => {
  const h = (i * 2654435761 + 97) % 100;
  if (h > 93) return 'l4';
  if (h > 80) return 'l3';
  if (h > 62) return 'l2';
  if (h > 40) return 'l1';
  return '';
});

export default function GitHubSection() {
  return (
    <section className="section" aria-labelledby="oss-heading" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="oss-band reveal">
          <div>
            <p className="section-index">06 / Open source</p>
            <h2 id="oss-heading">Building in public.</h2>
            <p>
              Code, experiments, and open-source work — everything I build
              starts as a repo and ends as something you can use.
            </p>
            <a
              href="https://github.com/Smasduq"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>GitHub</span>
              <span className="arrow" aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="oss-side">
            <div className="contrib" aria-hidden="true">
              {CELLS.map((level, i) => (
                <i key={i} className={level} />
              ))}
            </div>
            <span className="contrib-caption">github.com/Smasduq — code &amp; experiments</span>
          </div>
        </div>
      </div>
    </section>
  );
}
