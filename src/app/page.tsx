'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Preloader from '@/components/Preloader';
import HeroSection from '@/components/HeroSection';
import Marquee from '@/components/Marquee';
import ScrollAnimationWrapper from '@/components/ScrollAnimations';
import Footer from '@/components/Footer';

// Seções abaixo da dobra importadas dinamicamente
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

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden">
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Cursor customizado */}
      <ScrollAnimationWrapper />

      <div className="relative z-10">
        <HeroSection introReady={preloaderDone} />
        <Marquee items={['E-commerce', 'performance', 'Clean Code', 'escala', 'VTEX', 'Wake']} />
        <AboutSection />
        <TechnologiesSection />
        <EcommerceSection />
        <ProjectsSection />
        <ContactForm />
      </div>

      <Footer />
    </main>
  );
}
