'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Technology {
  name: string;
  description: string;
  experience: string;
}

const technologies: Technology[] = [
  { name: 'React', description: 'Interfaces modernas com hooks, context e performance otimizada', experience: '4+ anos' },
  { name: 'Next.js', description: 'SSR, App Router e Edge Functions', experience: '3+ anos' },
  { name: 'TypeScript', description: 'Tipagem segura com interfaces avançadas e generics', experience: '4+ anos' },
  { name: 'Node.js', description: 'APIs RESTful, GraphQL e microservices', experience: '4+ anos' },
  { name: 'Tailwind CSS', description: 'Design systems utility-first', experience: '3+ anos' },
  { name: 'GSAP', description: 'Animações com timeline e ScrollTrigger', experience: '3+ anos' },
];

const alsoWorkWith = [
  'Python', 'Vue.js', 'Docker', 'AWS', 'Vercel', 'Stripe',
  'GraphQL', 'Redis', 'MongoDB', 'Prisma', 'Jest', 'CI/CD',
];

export const TechnologiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tech-row',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.tech-list',
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="technologies" className="section-spacing relative">
      <div className="container-futuristic">
        {/* Cabeçalho */}
        <div className="flex items-baseline gap-6 mb-12 lg:mb-20">
          <span className="mono-label shrink-0">02 — Stack</span>
          <div className="hairline flex-1" />
          <span className="mono-label hidden sm:block">Ferramentas de produção</span>
        </div>

        {/* Lista de capacidades — o tipo carrega a seção */}
        <div className="tech-list">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className="tech-row group grid grid-cols-[auto_1fr] sm:grid-cols-[3rem_1fr_auto] items-baseline gap-x-6 gap-y-1 py-6 lg:py-8 border-t last:border-b"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <span className="mono-label tabular-nums">0{index + 1}</span>
              <div className="min-w-0">
                <h3 className="font-display font-medium uppercase leading-none text-[clamp(1.875rem,4.5vw,4rem)] tracking-[-0.02em] transition-[transform,color] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 group-hover:text-accent">
                  {tech.name}
                </h3>
                <p className="text-foreground-muted text-sm sm:text-base mt-2 max-w-md">
                  {tech.description}
                </p>
              </div>
              <span className="mono-label col-start-2 sm:col-start-3 self-center">
                {tech.experience}
              </span>
            </div>
          ))}
        </div>

        {/* Stack secundária */}
        <div className="mt-12 flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <span className="mono-label mr-3">Também trabalho com</span>
          {alsoWorkWith.map((skill, i) => (
            <span key={skill} className="text-sm text-foreground-muted">
              {skill}
              {i < alsoWorkWith.length - 1 && <span className="text-foreground-dim ml-3">/</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
