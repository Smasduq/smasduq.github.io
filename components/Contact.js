import ContactForm from '@/components/ContactForm';
import { SOCIALS } from '@/data/site';

export default function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container">
        <p className="section-index reveal">07 / Contact</p>
        <h2 className="contact-big reveal" id="contact-heading">
          LET&apos;S BUILD<br />SOMETHING<em>.</em>
        </h2>
        <p className="section-lede reveal stagger-1">
          Have an idea, a project, or an opportunity? My inbox is open.
        </p>
        <div className="contact-grid">
          <div className="reveal stagger-1">
            <a href="https://github.com/Smasduq" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              <span>Get in touch</span>
              <span className="arrow" aria-hidden="true">→</span>
            </a>
            <div className="contact-links">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                  <span>{s.label}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
          <div className="reveal stagger-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
