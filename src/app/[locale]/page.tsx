'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import Preloader from '@/components/Preloader';
import HeroSection from '@/components/HeroSection';
import Marquee from '@/components/Marquee';
import ScrollAnimationWrapper from '@/components/ScrollAnimations';
import Footer from '@/components/Footer';

const AboutSection = dynamic(() => import('@/components/AboutSection'), {
  loading: () => <div className="h-[600px]" />,
});

const TimelineSection = dynamic(() => import('@/components/TimelineSection'), {
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
  const t = useTranslations('marquee');
  const items = t.raw('items') as string[];

  return (
    <main className="min-h-screen overflow-x-hidden">
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      <ScrollAnimationWrapper />

      <div className="relative z-10">
        <HeroSection introReady={preloaderDone} />
        <Marquee items={items} />
        <AboutSection />
        <TechnologiesSection />
        <TimelineSection />
        <EcommerceSection />
        <ProjectsSection />
        <ContactForm />
      </div>

      <Footer />
    </main>
  );
}
