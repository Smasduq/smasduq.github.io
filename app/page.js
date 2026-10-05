import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import ProjectsSection from '@/components/ProjectsSection';
import TechStack from '@/components/TechStack';
import About from '@/components/About';
import CurrentlyBuilding from '@/components/CurrentlyBuilding';
import GitHubSection from '@/components/GitHubSection';
import Contact from '@/components/Contact';

export const metadata = {
  title: 'Smasduq — Software Developer, Founder & Product Builder',
  description:
    'Smasduq builds software and products — video platforms, music apps, developer tools, and Linux utilities, shipped and live.',
};

export default function HomePage() {
  return (
    <>
      <a href="#work" className="skip-link">Skip to work</a>
      <Header variant="home" />
      <ScrollReveal />
      <main id="top">
        <Hero />
        <Intro />
        <ProjectsSection />
        <TechStack />
        <About />
        <CurrentlyBuilding />
        <GitHubSection />
        <Contact />
      </main>
      <Footer variant="home" />
    </>
  );
}
