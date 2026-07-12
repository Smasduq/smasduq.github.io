import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import ProjectsGallery from '@/components/ProjectsGallery';
import './projects.css';

export const metadata = {
  title: 'Projects | Sadiqu Muhammad Bello | Fullstack Engineer',
  description:
    'A curated gallery of fullstack projects by a 3-year experienced engineer, ranging from system architecture to frontend experiences.',
};

export default function ProjectsPage() {
  return (
    <>
      <Header variant="projects" />
      <ScrollReveal />

      <main>
        <section className="projects-hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="projects-hero-glow" aria-hidden="true" />
          <div className="container">
            <div className="reveal active projects-hero-content">
              <span className="section-label">Archive</span>
              <h1>Project Archive</h1>
              <p className="text-muted">
                A detailed collection of technical solutions, from architectural experiments to production-grade applications.
              </p>
            </div>
          </div>
        </section>

        <section id="gallery" className="section section--gallery">
          <div className="container">
            <ProjectsGallery />
          </div>
        </section>
      </main>

      <Footer variant="projects" />
    </>
  );
}
