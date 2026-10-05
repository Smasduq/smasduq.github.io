export default function Intro() {
  return (
    <section className="section" aria-labelledby="intro-heading">
      <div className="container">
        <p className="section-index reveal">01 / About</p>
        <div className="intro-row">
          <p className="intro-statement reveal" id="intro-heading">
            I build <strong>software and products</strong> — turning ideas into
            useful, well-designed tools people actually use.
          </p>
          <div className="intro-side reveal stagger-1">
            <p>
              From developer tools to consumer applications: I like building
              things, breaking them, and figuring out how to make them better.
            </p>
            <a href="#about" className="text-link">
              More about me <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
