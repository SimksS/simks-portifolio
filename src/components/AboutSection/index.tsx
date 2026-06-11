'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToId } from '@/lib/scroll';

gsap.registerPlugin(ScrollTrigger);

const BIO =
  'Tech Lead e desenvolvedor full-stack com 4+ anos construindo e-commerces de alto desempenho. Lidero equipes na Wicomm, conduzo mentorias e aplico Clean Code e S.O.L.I.D. para criar produtos que não apenas vendem — encantam.';

const facts = [
  { label: 'Papel', value: 'Tech Lead @ Wicomm' },
  { label: 'Foco', value: 'E-commerce headless' },
  { label: 'Princípios', value: 'Clean Code · S.O.L.I.D.' },
  { label: 'Além do código', value: 'Mentorias & treinamentos' },
];

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Theme shift — a página inteira clareia quando o Sobre entra
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 55%',
      onEnter: () => {
        document.body.dataset.theme = 'light';
      },
      onLeaveBack: () => {
        delete document.body.dataset.theme;
      },
    });
    return () => st.kill();
  }, []);

  // Bio — palavras revelam com o scroll (scrub de opacidade)
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const words = bioRef.current?.querySelectorAll('span');
      if (words?.length) {
        gsap.set(words, { opacity: 0.15 });
        gsap.to(words, {
          opacity: 1,
          stagger: 0.02,
          ease: 'none',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: 1,
          },
        });
      }

      // Cortina — a foto é revelada de baixo para cima na entrada
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Parallax sutil na foto — profundidade
      gsap.fromTo(
        imageRef.current,
        { yPercent: 8 },
        {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      // Reveal das linhas de fatos
      gsap.fromTo(
        '.about-fact',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-facts',
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-spacing relative">
      <div className="container-futuristic">
        {/* Cabeçalho da seção */}
        <div className="flex items-baseline gap-6 mb-12 lg:mb-20">
          <span className="mono-label shrink-0">01 — Sobre</span>
          <div className="hairline flex-1" />
        </div>

        {/* Bio editorial — o texto é a peça */}
        <p
          ref={bioRef}
          className="max-w-[68rem] text-[clamp(1.75rem,3.8vw,3.5rem)] leading-[1.12] font-medium tracking-[-0.01em] mb-20 lg:mb-32"
        >
          {BIO.split(' ').map((word, i) => (
            <span key={i} className="inline">
              {word}{' '}
            </span>
          ))}
        </p>

        {/* Composição assimétrica: foto à esquerda, fatos à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-4 lg:col-start-2">
            <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden rounded-lg group">
              <Image
                src="/profile-photo.jpeg"
                alt="Kelven Souza — Tech Lead e desenvolvedor full-stack"
                fill
                className="object-cover img-treated scale-105"
                sizes="(max-width: 1024px) 100vw, 420px"
              />
            </div>
            <p className="mono-label mt-4">Kelven Souza — Bahia, BR</p>
          </div>

          <div className="about-facts lg:col-span-6 lg:col-start-7 self-center">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="about-fact flex items-baseline justify-between gap-6 py-6 border-t last:border-b"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <span className="mono-label shrink-0">{fact.label}</span>
                <span className="text-[clamp(1.125rem,1.8vw,1.5rem)] font-medium text-right">
                  {fact.value}
                </span>
              </div>
            ))}

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('contact');
              }}
              className="link-wipe-quiet link-wipe inline-block mt-10 text-[clamp(1.125rem,1.8vw,1.5rem)] font-medium"
            >
              Vamos conversar <span className="serif-italic text-accent">sobre o seu projeto</span> →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
