import dynamic from 'next/dynamic';

// Componentes carregados dinamicamente para melhor performance
const Header = dynamic(() => import('@/components/Header'));
const HeroSection = dynamic(() => import('@/components/HeroSection'));
const AboutSection = dynamic(() => import('@/components/AboutSection'));
const TechnologiesSection = dynamic(() => import('@/components/TechnologiesSection'));
const EcommerceSection = dynamic(() => import('@/components/EcommerceSection'));
const ProjectsSection = dynamic(() => import('@/components/ProjectsSection'));
const ResumeDownloadSection = dynamic(() => import('@/components/ResumeDownloadSection'));
const Footer = dynamic(() => import('@/components/Footer'));
const ScrollAnimations = dynamic(() => import('@/components/ScrollAnimations'));
const ScrollNavigation = dynamic(() => import('@/components/ScrollNavigation'));

export default function Home() {
  console.log('Rendering Home page with all sections');
  
  return (
    <main className="min-h-screen bg-background mobile-scroll-fix mobile-viewport-fix">
      <ScrollAnimations />
      <ScrollNavigation />
      <Header />
      <HeroSection />
      <AboutSection />
      <TechnologiesSection />
      <EcommerceSection />
      <ProjectsSection />
      <ResumeDownloadSection />
      <Footer />
    </main>
  );
}
