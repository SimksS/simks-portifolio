import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import ScrollAnimationWrapper from '@/components/ScrollAnimations';
const AboutSection = dynamic(() => import('@/components/AboutSection'), {
  loading: () => <div className="h-screen" />,
});
const TechnologiesSection = dynamic(() => import('@/components/TechnologiesSection'), {
  loading: () => <div className="h-screen" />,
});
const EcommerceSection = dynamic(() => import('@/components/EcommerceSection'), {
  loading: () => <div className="h-screen" />,
});
const ProjectsSection = dynamic(() => import('@/components/ProjectsSection'), {
  loading: () => <div className="h-screen" />,
});
const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => <div className="h-screen" />,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ScrollAnimationWrapper />
      <Header />
      <HeroSection />
      <AboutSection />
      <TechnologiesSection />
      <EcommerceSection />
      <ProjectsSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
