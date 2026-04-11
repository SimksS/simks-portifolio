'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



const skillCategories = [
  {
    title: 'Front-end',
    skills: ['React', 'Vue.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Scriban'],
  },
  {
    title: 'Back-end',
    skills: ['Node.js', 'Python'],
  },
  {
    title: 'E-commerce',
    skills: ['VTEX', 'Wake','Shopify','Uappi'],
  },
];

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => setIsVisible(true),
        once: true,
      });

      if (reducedMotion) {
        setIsVisible(true);
        return;
      }

      // Animação de entrada
      gsap.fromTo(
        '.about-image',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.about-content',
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.skill-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleScrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-spacing relative overflow-hidden"
    >
      {/* Background decorativo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-cyan/5 rounded-full blur-[60px]" />
      </div>

      <div className="container-modern relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Imagem */}
          <div className="about-image relative order-2 lg:order-1">
            <div className="relative max-w-md mx-auto lg:mr-auto lg:ml-0">
              {/* Frame com gradiente */}
              <div className="absolute -inset-3 bg-gradient-to-br from-primary/30 via-primary/10 to-cyan/20 rounded-3xl blur-xl" />

              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/50 bg-card">
                {/* Container da animação de zoom infinito */}
                <div className="absolute inset-0 animate-infinite-zoom">
                  <Image
                    src="/profile-photo.jpeg"
                    alt="Kelven Souza - Desenvolvedor Full-Stack"
                    fill
                    className="object-cover scale-[1.4]"
                    sizes="(max-width: 1024px) 100vw, 400px"
                    priority
                  />
                </div>
                {/* Overlays para suavizar as bordas durante o zoom */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.3)] pointer-events-none" />
              </div>

              {/* Badge de experiência */}
              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">4+</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Anos de</div>
                    <div className="text-sm text-muted-foreground">Experiência</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="about-content space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-primary font-medium text-sm">
                <span className="w-8 h-0.5 bg-primary rounded-full" />
                Sobre Mim
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Transformando ideias em{' '}
                <span className="gradient-text-primary">soluções digitais</span>
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Sou Tech Lead e desenvolvedor full-stack com mais de 3 anos de experiência na área de TI.
                Atuo no planejamento, organização e execução de projetos, aplicando boas práticas como
                Clean Code e S.O.L.I.D. para criar código limpo, modular e de fácil manutenção.
              </p>
              <p>
                Atualmente lidero equipes de desenvolvimento na Wicomm, conduzindo mentorias e treinamentos
                além de desenvolver soluções de alto desempenho com React, Vue.js, Node.js e plataformas
                VTEX, Wake, Uappi e Shopify. Especialista em criar soluções que não apenas vendem, mas encantam.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="skills-grid grid grid-cols-1 sm:grid-cols-3 gap-4">
              {skillCategories.map((category) => (
                <div
                  key={category.title}
                  className="skill-card card-modern"
                >
                  <h4 className="text-sm font-semibold text-foreground mb-3 pb-2 border-b border-border">
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className="tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button onClick={handleScrollToProjects} className="btn-primary">
              Ver Projetos
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
