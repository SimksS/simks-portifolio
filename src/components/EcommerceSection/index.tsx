'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { ReactNode } from 'react';

interface Platform {
  name: string;
  description: string;
  icon: ReactNode;
  features: string[];
  color: string;
  certified: boolean;
}

const platforms: Platform[] = [
  {
    name: 'VTEX',
    description: 'Plataforma líder de e-commerce com alta performance e escalabilidade empresarial.',
    icon: (
     <Image src="./VTEX_Logo.svg" alt="Logo VTEX - Plataforma de e-commerce" width={40} height={40}  />
    ),
    features: ['Catálogo Omnichannel', 'Checkout Nativo', 'Integrações B2B/B2C', 'SEO Otimizado'],
    color: 'from-white to-gray-100',
    certified:false,
  },
  {
    name: 'Wake',
    description: 'Arquitetura headless flexível para criar experiências de compra únicas.',
    icon: (
      <Image src="./wake-commerce-branco.svg" alt="Logo Wake Commerce - Plataforma headless" width={60} height={60}  />
    ),
    features: ['Headless CMS', 'API-first', 'Personalização','Performance'],
    color: 'from-black to-gray-800',
    certified: true,
  },
  {
    name: 'Shopify',
    description: 'Plataforma com temas customizáveis para experiências de e-commerce flexíveis.',
    icon: (
       <Image src="/shopify-logo.png" alt="Logo VTEX - Plataforma de e-commerce" width={40} height={40}  />
    ),
    features: ['Temas Customizáveis', 'Performance', 'Integrações', 'Flexibilidade'],
    color: 'from-white to-gray-100',
    certified: false,
  },
];

export const EcommerceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        '.ecommerce-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="ecommerce" className="section-spacing relative">
      {/* Background decorativo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[100px] translate-x-1/4" />
      </div>

      <div className="container-modern relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-primary font-medium text-sm mb-4">
            <span className="w-8 h-0.5 bg-primary rounded-full" />
            Especialização
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Plataformas de{' '}
            <span className="gradient-text-primary">E-commerce</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Especialista nas principais plataformas do mercado, entregando soluções
            que convertem visitantes em clientes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="ecommerce-card card-modern group relative overflow-hidden"
            >
              {/* Gradient border top */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-[#0081f1]`} />

              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-white shadow-lg`}>
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{platform.name}</h3>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Platform</span>
                    </div>
                  </div>
                  {/* Badge */}
                  {
                    platform.certified && (
                    <span className="badge px-2 py-1 text-xs">
                      ✓ Certified
                    </span>

                    )
                  }
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {platform.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {platform.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                      <span className={`w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-xs`}>
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#projects"
                  className="btn-secondary w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Ver Projetos
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6">
          {[
            { value: '30+', label: 'Projetos Entregues' },
            { value: 'R$10M+', label: 'GMV Gerenciado' },
            { value: '4.9/5', label: 'Avaliação Clientes' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcommerceSection;
