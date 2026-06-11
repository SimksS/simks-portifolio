'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToId } from '@/lib/scroll';

gsap.registerPlugin(ScrollTrigger);

/** CTA magnético — quickTo por eixo, spring-back elástico */
const useMagnetic = (ref: React.RefObject<HTMLElement | null>, strength = 0.3) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || reducedMotion) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
    };
  }, [ref, strength]);
};

export const HeroSection = ({ introReady = true }: { introReady?: boolean }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageSlotRef = useRef<HTMLSpanElement>(null);
  const exploreRef = useRef<HTMLButtonElement>(null);
  const contactRef = useRef<HTMLAnchorElement>(null);
  const playedRef = useRef(false);

  useMagnetic(exploreRef, 0.3);
  useMagnetic(contactRef, 0.3);

  // Entrada — dispara quando o preloader termina
  useEffect(() => {
    if (!introReady || playedRef.current) return;
    playedRef.current = true;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      // Estado final imediato — sem animação, sem conteúdo escondido
      if (imageSlotRef.current) {
        imageSlotRef.current.style.width = 'clamp(4rem, 11vw, 10.5rem)';
      }
      gsap.set('.hero-meta', { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Linhas do nome sobem por trás das máscaras
      tl.fromTo(
        '.hero-line',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.2, stagger: 0.1 }
      )
        // A foto expande entre as palavras, empurrando o tipo
        .fromTo(
          imageSlotRef.current,
          { width: 0 },
          { width: 'clamp(4rem, 11vw, 10.5rem)', duration: 0.9, ease: 'power4.inOut' },
          '-=0.7'
        )
        // Tagline, labels e rodapé do hero
        .fromTo(
          '.hero-tagline-line',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.08 },
          '-=0.5'
        )
        .fromTo(
          '.hero-meta',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
          '-=0.6'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [introReady]);

  // Saída no scroll — o tipo sobe mais devagar que a página e esmaece
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        yPercent: -14,
        scale: 0.96,
        transformOrigin: '50% 0%',
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    scrollToId('projects');
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-6 overflow-hidden"
    >
      {/* Linha superior — contexto em mono */}
      <div className="container-futuristic">
        <div className="hero-meta flex items-center justify-between gap-4 opacity-0">
          <span className="mono-label">Tech Lead &amp; Full-Stack — Bahia, BR</span>
          <span className="mono-label hidden sm:flex items-center gap-2">
            <span className="status-dot" />
            Disponível para projetos
          </span>
        </div>
      </div>

      {/* O tipo. Herói absoluto da composição. */}
      <div ref={titleRef} className="container-futuristic flex-1 flex flex-col justify-center py-10">
        <h1 className="text-display font-display select-none">
          <span className="block overflow-hidden">
            <span className="hero-line block will-change-transform">Kelven</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line will-change-transform flex items-center gap-[0.06em]">
              Souza
              {/* Foto inline — expande entre o tipo na entrada */}
              <span
                ref={imageSlotRef}
                className="relative inline-block h-[0.72em] rounded-full overflow-hidden align-middle shrink-0"
                style={{ width: 0 }}
                aria-hidden="true"
              >
                <Image
                  src="/avatar.jpeg"
                  alt=""
                  fill
                  priority
                  className="object-cover img-treated"
                  sizes="170px"
                />
              </span>
              <span className="text-accent">.</span>
            </span>
          </span>
        </h1>

        {/* Tagline — grotesk com a palavra-chave em serif itálico */}
        <div className="mt-8 lg:mt-12 max-w-[52rem] lg:ml-[28%]">
          <p className="text-[clamp(1.375rem,2.6vw,2.25rem)] leading-[1.15] font-medium text-foreground">
            <span className="block overflow-hidden">
              <span className="hero-tagline-line block will-change-transform">
                Construo <span className="serif-italic text-accent">e-commerces</span> que vendem —
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-tagline-line block will-change-transform text-foreground-muted">
                arquiteturas escaláveis em VTEX, Wake &amp; Shopify.
              </span>
            </span>
          </p>
        </div>
      </div>

      {/* Rodapé do hero — hairline, stats e CTAs */}
      <div className="container-futuristic">
        <div className="hero-meta hairline mb-6 opacity-0" />
        <div className="hero-meta flex flex-col lg:flex-row lg:items-end justify-between gap-8 opacity-0">
          <div className="flex gap-10 sm:gap-16">
            {[
              { value: '4+', label: 'Anos de experiência' },
              { value: '30+', label: 'Projetos lançados' },
              { value: 'R$10M+', label: 'GMV impactado' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-medium leading-none tabular-nums">
                  {stat.value}
                </p>
                <p className="mono-label mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button ref={exploreRef} onClick={scrollToProjects} className="btn-fill btn-fill-accent">
              <span>Ver projetos</span>
              <span aria-hidden="true">↓</span>
            </button>
            <a ref={contactRef} href="/curriculo-kelven-souza.pdf" download className="btn-fill">
              <span>Baixar CV</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
