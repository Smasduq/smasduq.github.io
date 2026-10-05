import Link from 'next/link';
import BackToTop from '@/components/BackToTop';
import { SOCIALS } from '@/data/site';

export default function Footer({ variant = 'home' }) {
  return (
    <footer className={`site-footer${variant === 'projects' ? ' site-footer--projects' : ''}`}>
      <div className="container">
        {variant === 'home' && (
          <div className="footer-top">
            <div>
              <Link href="/" className="logo" aria-label="Smasduq — home">
                SMAS<em>DUQ</em>
              </Link>
              <p className="footer-tagline">Software developer · Founder · Product builder</p>
            </div>
            <div className="social-links" aria-label="Social links">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} className="social-link" target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        )}
        <div className="footer-bottom">
          <p className="copyright">© 2026 Smasduq — Built with React · Designed &amp; developed by Smasduq</p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
