'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/SimksS' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/kelvensouza' },
  { name: 'Email', href: 'mailto:kelven.souza00@gmail.com' },
];

/** Relógio local — detalhe de estúdio no rodapé */
const LocalTime = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Bahia',
        })
      );
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="mono-label tabular-nums">Bahia, BR — {time || '--:--'}</span>
  );
};

/* Conteúdo do CTA duplicado em duas camadas: contorno embaixo,
   preenchido em cima revelado por clip-path conforme o scroll. */
const CtaLines = ({ filled }: { filled: boolean }) => (
  <>
    <span className="block">Vamos construir</span>
    <span className="block pb-[0.12em]">
      <span className={filled ? 'serif-italic text-accent' : 'serif-italic'}>algo juntos</span>
      <span className="inline-block ml-[0.15em] cta-arrow">→</span>
    </span>
  </>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  // O contorno se preenche conforme o usuário chega ao fim da página
  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      fill.style.clipPath = 'inset(0 0% 0 0)';
      return;
    }

    const tween = gsap.fromTo(
      fill,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        ease: 'none',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 90%',
          end: 'top 40%',
          scrub: 1,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <footer className="relative overflow-hidden">
      <div className="container-futuristic">
        {/* CTA gigante — contorno que o scroll preenche */}
        <div className="py-24 lg:py-36">
          <p className="mono-label mb-8">Tem um projeto em mente?</p>
          <a
            ref={ctaRef}
            href="mailto:kelven.souza00@gmail.com"
            className="group relative block font-display font-medium uppercase leading-[0.9] tracking-[-0.03em] text-[clamp(2.75rem,9vw,9.5rem)] [&_.cta-arrow]:transition-transform [&_.cta-arrow]:duration-500 hover:[&_.cta-arrow]:translate-x-[0.15em]"
          >
            {/* Camada contorno */}
            <span className="block text-stroke" aria-hidden="true">
              <CtaLines filled={false} />
            </span>
            {/* Camada preenchida — revelada pelo scroll */}
            <span
              ref={fillRef}
              className="absolute inset-0 block"
              style={{ clipPath: 'inset(0 100% 0 0)' }}
            >
              <CtaLines filled />
            </span>
          </a>
        </div>

        <div className="hairline" />

        {/* Barra inferior */}
        <div className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.name !== 'Email' ? '_blank' : undefined}
                rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="link-wipe link-wipe-quiet font-mono text-[0.6875rem] tracking-[0.18em] uppercase text-foreground-muted hover:text-foreground transition-colors duration-200"
              >
                {social.name}
              </a>
            ))}
          </div>

          <LocalTime />

          <p className="mono-label">© {currentYear} Kelven Souza</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
