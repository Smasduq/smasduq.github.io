import Link from 'next/link';
import BackToTop from '@/components/BackToTop';

export default function Footer({ variant = 'home' }) {
  if (variant === 'projects') {
    return (
      <footer className="site-footer site-footer--projects">
        <div className="container footer-container">
          <div className="footer-bottom">
            <p className="copyright">&copy; 2026 Sadiqu Muhammad Bello. Built for performance.</p>
            <BackToTop />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="logo footer-logo">SMASDUQ</Link>
            <p className="footer-tagline">Fullstack Engineer &amp; Solutions Architect</p>
          </div>

          <div className="social-links" aria-label="Social links">
            <a href="https://github.com/Smasduq" className="social-link" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/smasduq" className="social-link" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://x.com/smasduq_" className="social-link" target="_blank" rel="noopener noreferrer">
              X / Twitter
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">&copy; 2026 Sadiqu Muhammad Bello. All rights reserved. Crafted with precision.</p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
