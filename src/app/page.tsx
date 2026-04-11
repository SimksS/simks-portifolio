import dynamic from 'next/dynamic';

// Sections importadas dinamicamente para otimização
const HeroSection = dynamic(() => import('@/components/HeroSection'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
    </div>
  ),
});

const AboutSection = dynamic(() => import('@/components/AboutSection'), {
  loading: () => <div className="h-[600px]" />,
});

const TechnologiesSection = dynamic(() => import('@/components/TechnologiesSection'), {
  loading: () => <div className="h-[600px]" />,
});

const EcommerceSection = dynamic(() => import('@/components/EcommerceSection'), {
  loading: () => <div className="h-[600px]" />,
});

const ProjectsSection = dynamic(() => import('@/components/ProjectsSection'), {
  loading: () => <div className="h-screen" />,
});

const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => <div className="h-[600px]" />,
});

import ScrollAnimationWrapper from '@/components/ScrollAnimations';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* Background Animations */}
      <ScrollAnimationWrapper />

      {/* Floating Orbs Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-neon-purple/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-neon-blue/3 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <TechnologiesSection />
        <EcommerceSection />
        <ProjectsSection />
        <ContactForm />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
