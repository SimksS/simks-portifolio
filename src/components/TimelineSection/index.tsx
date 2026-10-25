'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealHeading from '@/components/RevealHeading';

gsap.registerPlugin(ScrollTrigger);

type Locale = 'pt' | 'en';
type StepId = 'studies' | 'monitor' | 'developer' | 'lead' | 'engineer';

const COPY = {
  pt: {
    index: 'Carreira',
    aside: 'Trajetória',
    headingBefore: 'Uma linha, ',
    headingEmphasis: 'três casas',
    headingAfter: '.',
    promotion: 'promoção',
    current: 'atual',
    kenzie: {
      company: 'Kenzie Academy Brasil',
      alt: 'Logo da Kenzie Academy Brasil',
      studies: {
        role: 'Estudos',
        period: 'mai 2022 — jul 2022',
        summary: 'Onde a programação começou, antes do primeiro emprego.',
      },
      monitor: {
        role: 'Monitor',
        period: 'jul 2022 — mai 2023',
        summary: 'Passei a acompanhar alunos nos conteúdos mais difíceis.',
        note: 'set 2022 — mai 2023, em paralelo com a Wicomm',
      },
    },
    wicomm: {
      company: 'Wicomm',
      alt: 'Logo da Wicomm',
      developer: {
        role: 'Desenvolvedor Front End',
        period: 'set 2022 — 2024',
        summary: 'Primeiro emprego. Front-end de e-commerce com React, Vue, VTEX, Wake e Uappi.',
      },
      lead: {
        role: 'Tech Lead',
        period: '2024 — 2026',
        summary: 'Passei a conduzir o time, os padrões de código e as mentorias.',
      },
    },
    contaCheia: {
      company: 'Conta Cheia',
      alt: 'Logo da Conta Cheia',
      engineer: {
        role: 'Software Engineer',
        period: 'desde 2026',
        summary: 'Engenharia de software numa fintech brasileira de crédito.',
      },
    },
  },
  en: {
    index: 'Career',
    aside: 'Path',
    headingBefore: 'One line, ',
    headingEmphasis: 'three companies',
    headingAfter: '.',
    promotion: 'promotion',
    current: 'present',
    kenzie: {
      company: 'Kenzie Academy Brasil',
      alt: 'Kenzie Academy Brasil logo',
      studies: {
        role: 'Studies',
        period: 'May 2022 — Jul 2022',
        summary: 'Where programming started, before the first job.',
      },
      monitor: {
        role: 'Teaching assistant',
        period: 'Jul 2022 — May 2023',
        summary: 'I started helping students through the harder material.',
        note: 'Sep 2022 — May 2023, alongside Wicomm',
      },
    },
    wicomm: {
      company: 'Wicomm',
      alt: 'Wicomm logo',
      developer: {
        role: 'Front-end Developer',
        period: 'Sep 2022 — 2024',
        summary: 'First job. E-commerce front-end with React, Vue, VTEX, Wake and Uappi.',
      },
      lead: {
        role: 'Tech Lead',
        period: '2024 — 2026',
        summary: 'I started leading the team, the code standards and the mentoring.',
      },
    },
    contaCheia: {
      company: 'Conta Cheia',
      alt: 'Conta Cheia logo',
      engineer: {
        role: 'Software Engineer',
        period: 'since 2026',
        summary: 'Software engineering at a Brazilian credit fintech.',
      },
    },
  },
} as const;

const STATIONS: {
  id: 'kenzie' | 'wicomm' | 'contaCheia';
  logo: string;
  logoWidth: number;
  logoHeight: number;
  year: string;
  steps: { id: StepId; promotion?: boolean; note?: boolean; current?: boolean }[];
}[] = [
  {
    id: 'kenzie',
    logo: '/career/kenzie.png',
    logoWidth: 222,
    logoHeight: 55,
    year: '2022',
    steps: [
      { id: 'studies' },
      { id: 'monitor', promotion: true, note: true },
    ],
  },
  {
    id: 'wicomm',
    logo: '/career/wicomm.png',
    logoWidth: 240,
    logoHeight: 54,
    year: '2022',
    steps: [
      { id: 'developer' },
      { id: 'lead', promotion: true },
    ],
  },
  {
    id: 'contaCheia',
    logo: '/career/conta-cheia.png',
    logoWidth: 1552,
    logoHeight: 361,
    year: '2026',
    steps: [{ id: 'engineer', current: true }],
  },
];

export const TimelineSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [locale, setLocale] = useState<Locale>('pt');

  useEffect(() => {
    const lang = document.documentElement.lang.toLowerCase();
    setLocale(lang.startsWith('en') ? 'en' : 'pt');
  }, []);

  const copy = COPY[locale];

  // Tema escuro a partir daqui. A Stack fica no claro; ao voltar para ela, a luz retorna.
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
        '.career-spine',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.career-track',
            start: 'top 75%',
            end: 'bottom 65%',
            scrub: 0.6,
          },
        }
      );

      gsap.fromTo(
        '.career-station',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.career-track',
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="career" className="section-spacing relative">
      <div className="container-futuristic">
        <div className="flex items-baseline gap-6 mb-12 lg:mb-20">
          <span className="mono-label shrink-0">{copy.index}</span>
          <div className="hairline flex-1" />
          <span className="mono-label hidden sm:block">{copy.aside}</span>
        </div>

        <RevealHeading className="text-heading font-display max-w-[56rem] mb-16 lg:mb-24">
          {copy.headingBefore}
          <span className="serif-italic text-accent">{copy.headingEmphasis}</span>
          {copy.headingAfter}
        </RevealHeading>

        <div className="career-track relative">
          <div
            className="career-spine pointer-events-none absolute left-0 top-0 h-full w-px origin-top"
            style={{ background: 'var(--color-foreground)' }}
            aria-hidden
          />

          <div className="pl-6 sm:pl-10">
            {STATIONS.map((station, index) => {
              const stationCopy = copy[station.id];
              return (
                <article
                  key={station.id}
                  className="career-station grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-12 lg:py-16 border-t last:border-b"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <div className="lg:col-span-3">
                    <p className="mono-label mb-3">0{index + 1}</p>
                    <p className="text-[clamp(4rem,8vw,7rem)] font-medium leading-none tracking-[-0.04em] tabular-nums">
                      {station.year}
                    </p>
                  </div>

                  <div className="lg:col-span-4 lg:pt-8">
                    <div
                      className="flex h-32 items-center rounded-lg border px-6 lg:h-40"
                      style={{
                        borderColor: 'var(--color-border)',
                        background: 'oklch(0.985 0.008 85)',
                      }}
                    >
                      <Image
                        src={station.logo}
                        alt={stationCopy.alt}
                        width={station.logoWidth}
                        height={station.logoHeight}
                        className="h-14 w-auto max-w-full object-contain object-left lg:h-16"
                      />
                    </div>
                    <p className="mono-label mt-4">{stationCopy.company}</p>
                  </div>

                  <div className="lg:col-span-5 lg:pt-6">
                    {station.steps.map((step) => {
                      const stepCopy = stationCopy[step.id as keyof typeof stationCopy];
                      if (typeof stepCopy !== 'object') return null;
                      return (
                        <div
                          key={step.id}
                          className="py-5 border-t first:border-t-0 first:pt-0"
                          style={{ borderColor: 'var(--color-border)' }}
                        >
                          <div className="flex items-baseline justify-between gap-4">
                            <h3 className="serif-italic text-accent text-[clamp(1.5rem,2.4vw,2.25rem)] leading-none">
                              {stepCopy.role}
                            </h3>
                            {step.promotion && (
                              <span className="mono-label shrink-0">{copy.promotion}</span>
                            )}
                            {step.current && (
                              <span className="mono-label shrink-0">{copy.current}</span>
                            )}
                          </div>
                          <p className="mono-label mt-3">{stepCopy.period}</p>
                          <p className="mt-3 max-w-md text-foreground-muted">{stepCopy.summary}</p>
                          {'note' in stepCopy && step.note && (
                            <p className="mono-label mt-3">{stepCopy.note}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
