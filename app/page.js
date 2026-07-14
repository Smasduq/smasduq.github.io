import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';
import ProjectCard from '@/components/ProjectCard';
import ContactForm from '@/components/ContactForm';
import LeadershipRoles from '@/components/LeadershipRoles';
import { PROJECTS } from '@/data/projects';

export const metadata = {
  title: 'Sadiqu Muhammad Bello | Fullstack Engineer',
  description:
    'Fullstack Engineer with 3 years of experience specializing in high-performance web applications, architectural design, and user-centric experiences.',
};

export default function HomePage() {
  return (
    <>
      <Header variant="home" />
      <ScrollReveal />

      <main>
        <Hero />

        <section id="work" className="section section--work">
          <div className="container">
            <SectionHeader
              label="Portfolio"
              title="Selected Projects"
              description="A collection of high-impact platforms and tools built with modern engineering practices."
            />
            <div className="work-grid">
              {PROJECTS.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  variant="compact"
                  stagger={`stagger-${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section section--about">
          <div className="section-glow section-glow--about" aria-hidden="true" />
          <div className="container">
            <div className="about-grid">
              <div className="about-img-container reveal">
                <div className="about-img-frame">
                  <img
                    src="/img/smasduq.jpeg"
                    alt="Sadiqu Muhammad Bello — Fullstack Engineer"
                    className="about-img"
                    width={600}
                    height={600}
                  />
                </div>
                <div className="about-stats">
                  <div className="stat-card card">
                    <span>3+</span>
                    <label>Years Exp.</label>
                  </div>
                  <div className="stat-card card">
                    <span>4+</span>
                    <label>Projects</label>
                  </div>
                </div>
              </div>

              <div className="about-text reveal stagger-1">
                <SectionHeader
                  label="About"
                  title="Beyond the Pixel"
                  align="left"
                  className="about-header"
                />
                <div className="about-copy">
                  <p>
                    I am Sadiqu Muhammad Bello, a 16-year-old Fullstack Engineer with 3 years of professional experience building robust digital
                    products. I bridge the gap between complex engineering requirements and elegant user
                    experiences.
                  </p>
                  <p>
                    My expertise lies in modern JavaScript frameworks, state management, and performance
                    optimization. I believe in writing code that is not only functional but also maintainable
                    and scalable.
                  </p>
                </div>
                <div className="hero-actions">
                  <a href="#" className="btn btn-primary">
                    <span>Download Resume</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <LeadershipRoles />

        <section id="contact" className="section section--contact">
          <div className="section-glow section-glow--contact" aria-hidden="true" />
          <div className="container">
            <SectionHeader
              label="Contact"
              title="Get In Touch"
              description="Interested in collaborating or have a project in mind? I'd love to hear from you."
            />
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer variant="home" />
    </>
  );
}
