'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import Link from 'next/link';

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setIsLoaded(true);
      return;
    }

    const timer = setTimeout(() => setIsLoaded(true), 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Animar elementos com data-animate
      tl.fromTo('.hero-content [data-animate="fade-up"]',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
      );

      // Animação da imagem
      tl.fromTo('.hero-image',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      );
    });

    return () => ctx.revert();
  }, [isLoaded]);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      {/* Background decorativo suave */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-cyan/5 rounded-full blur-[80px]" />
      </div>

      <div className="container-modern relative z-10">
        <div className="hero-content grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Conteúdo */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <p
                data-animate="fade-up"
                className={`text-muted-foreground font-medium tracking-wide transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Desenvolvedor Full-Stack
              </p>
              <h1
                data-animate="fade-up"
                className={`hero-title gradient-text transition-all duration-700 delay-100 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Kelven Souza
              </h1>
              <p
                data-animate="fade-up"
                className={`text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed transition-all duration-700 delay-200 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Desenvolvedor Full-Stack especializado em e-commerce.
                Domínio em React, Vue.js, Node.js e plataformas VTEX, Wake e Shopify.
              </p>
            </div>

            <div
              data-animate="fade-up"
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button onClick={scrollToProjects} className="btn-primary">
                Explorar Projetos
              </button>
              <a
                href="/curriculo-kelven-souza.pdf"
                download
                className="btn-secondary group"
              >
                <svg
                  className="w-5 h-5 transition-transform group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Baixar CV
              </a>
            </div>

            {/* Stats mínimo */}
            <div
              data-animate="fade-up"
              className={`flex justify-center lg:justify-start gap-8 pt-6 border-t border-border/50 transition-all duration-700 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {[
                { value: '4+', label: 'Anos Exp.' },
                { value: '30+', label: 'Projetos' },
                { value: '100%', label: 'Dedicado' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Avatar/Imagem */}
          <div className="hero-image flex justify-center lg:justify-end">
            <div className="relative">
              {/* Círculo decorativo */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-cyan/20 rounded-3xl blur-xl translate-y-4" />

              {/* Container da imagem */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border border-border/50 bg-card interactive">
                <Image
                  src="/avatar.jpeg"
                  alt="Kelven Souza"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                />

                {/* Overlay com gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>

              {/* Elementos decorativos sutis */}
              <div className="absolute -top-4 -right-4 w-20 h-20 border border-primary/30 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10 rounded-full blur-sm" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`hidden lg:flex justify-center mt-16 transition-all duration-700 delay-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={scrollToProjects}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center p-1.5">
              <div className="w-1 h-2.5 bg-current rounded-full animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
