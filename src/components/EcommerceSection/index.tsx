'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealHeading from '@/components/RevealHeading';

gsap.registerPlugin(ScrollTrigger);

interface Platform {
  name: string;
  description: string;
  features: string[];
  certified: boolean;
  projects: string;
}

const platforms: Platform[] = [
  {
    name: 'VTEX',
    description: 'Plataforma líder em e-commerce enterprise — catálogo omnichannel, checkout nativo e integrações B2B/B2C.',
    features: ['VTEX IO', 'Headless', 'B2B/B2C', 'SEO'],
    certified: false,
    projects: '15+ projetos',
  },
  {
    name: 'Wake',
    description: 'Arquitetura headless flexível, API-first, para experiências de compra únicas e performáticas.',
    features: ['Headless CMS', 'API-first', 'Personalização'],
    certified: true,
    projects: '10+ projetos',
  },
  {
    name: 'Shopify',
    description: 'Temas customizáveis e integrações para operações que precisam de velocidade de lançamento.',
    features: ['Temas', 'Apps', 'Integrações'],
    certified: false,
    projects: '8+ projetos',
  },
];

const numbers = [
  { value: 30, prefix: '', suffix: '+', label: 'Projetos lançados' },
  { value: 10, prefix: 'R$', suffix: 'M+', label: 'GMV impactado' },
  { value: 4.9, prefix: '', suffix: '/5', label: 'Satisfação de clientes' },
  { value: 20, prefix: '+', suffix: '%', label: 'Performance média' },
];

/** Número com count-up — GSAP + ScrollTrigger, tabular-nums */
const BigNumber = ({ value, prefix, suffix, label }: (typeof numbers)[number]) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDecimal = !Number.isInteger(value);
    const format = (v: number) => (isDecimal ? v.toFixed(1) : String(Math.round(v)));

    if (reducedMotion) {
      el.textContent = format(value);
      return;
    }

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration: 1.8,
      ease: 'power3.out',
      onUpdate: () => {
        el.textContent = format(obj.val);
      },
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value]);

  return (
    <div className="py-8 lg:py-10">
      <p className="text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-none tabular-nums tracking-[-0.02em]">
        {prefix}
        <span ref={ref}>0</span>
        {suffix}
      </p>
      <p className="mono-label mt-3">{label}</p>
    </div>
  );
};

export const EcommerceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Theme shift — de volta ao escuro quando o E-commerce entra
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 55%',
      onEnter: () => {
        delete document.body.dataset.theme;
      },
      onLeaveBack: () => {
        document.body.dataset.theme = 'light';
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.platform-row',
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.platform-list',
            start: 'top 78%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="ecommerce" className="section-spacing relative">
      <div className="container-futuristic">
        {/* Cabeçalho */}
        <div className="flex items-baseline gap-6 mb-12 lg:mb-16">
          <span className="mono-label shrink-0">03 — E-commerce</span>
          <div className="hairline flex-1" />
          <span className="mono-label hidden sm:block">Especialização</span>
        </div>

        <RevealHeading className="text-heading font-display max-w-[56rem] mb-16 lg:mb-24">
          Plataformas que <span className="serif-italic text-accent">convertem</span> visitantes
          em clientes.
        </RevealHeading>

        {/* Plataformas — linhas editoriais */}
        <div className="platform-list mb-20 lg:mb-28">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="platform-row group grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-3 py-8 lg:py-10 border-t last:border-b items-baseline"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="lg:col-span-4 flex items-baseline gap-4">
                <h3 className="font-display font-medium uppercase leading-none text-[clamp(2.25rem,5vw,4.5rem)] tracking-[-0.02em] transition-[transform,color] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 group-hover:text-accent">
                  {platform.name}
                </h3>
                {platform.certified && (
                  <span className="badge-cyber badge-cyber-glow shrink-0">Certified</span>
                )}
              </div>
              <p className="lg:col-span-5 text-foreground-muted text-sm sm:text-base leading-relaxed max-w-lg">
                {platform.description}
              </p>
              <div className="lg:col-span-3 flex flex-col lg:items-end gap-2">
                <span className="mono-label">{platform.projects}</span>
                <span className="font-mono text-[0.625rem] tracking-[0.1em] text-foreground-dim uppercase">
                  {platform.features.join(' · ')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* A faixa de números */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 divide-y-0">
          {numbers.map((num) => (
            <BigNumber key={num.label} {...num} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcommerceSection;
