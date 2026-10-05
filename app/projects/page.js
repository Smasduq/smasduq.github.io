import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import ProjectsGallery from '@/components/ProjectsGallery';
import './projects.css';

export const metadata = {
  title: 'Projects | Smasduq',
  description:
    'Shipped work by Smasduq — Monteeq, Commitor, Songnest, LinkBio, GitPixel, iFreeYuh, and Ani-pull.',
};

export default function ProjectsPage() {
  return (
    <>
      <Header variant="projects" />
      <ScrollReveal />
      <main>
        <section className="projects-hero">
          <div className="hero-grid-bg" aria-hidden="true" />
          <div className="projects-hero-glow" aria-hidden="true" />
          <div className="container">
            <div className="reveal active">
              <span className="section-label">Archive</span>
              <h1>Project Archive</h1>
              <p>
                Every shipped project in one place — fullstack platforms and
                developer tooling, all live.
              </p>
            </div>
          </div>
        </section>
        <section id="gallery" className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <ProjectsGallery />
          </div>
        </section>
      </main>
      <Footer variant="projects" />
    </>
  );
}
