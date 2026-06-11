'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Marquee de declaração — tipo massivo em loop GSAP infinito (xPercent -50 com
 * conteúdo duplicado). Reage à velocidade do scroll: acelera, inverte direção
 * e inclina (skewX) com o gesto, depois assenta de volta.
 */
const Marquee = ({ items }: { items: string[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const track = trackRef.current;
    if (!track) return;

    const loop = gsap.to(track, { xPercent: -50, repeat: -1, duration: 28, ease: 'none' });

    // Velocidade do scroll → timeScale (direção + ritmo) e skew que decai
    const clampSkew = gsap.utils.clamp(-6, 6);
    const skewSetter = gsap.quickSetter(track, 'skewX', 'deg');
    const proxy = { skew: 0 };

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate(self) {
        const velocity = self.getVelocity();

        const skew = clampSkew(velocity / -250);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.9,
            ease: 'power3.out',
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }

        const direction = velocity < 0 ? -1 : 1;
        const magnitude = Math.min(Math.abs(velocity) / 350, 4);
        gsap.to(loop, {
          timeScale: direction * (1 + magnitude),
          duration: 0.3,
          overwrite: true,
          onComplete: () => {
            gsap.to(loop, { timeScale: direction, duration: 1.4, ease: 'power2.out' });
          },
        });
      },
    });

    return () => {
      st.kill();
      loop.kill();
    };
  }, []);

  const renderItems = (ariaHidden: boolean) =>
    items.map((item, i) => (
      <span
        key={`${item}-${ariaHidden ? 'b' : 'a'}-${i}`}
        aria-hidden={ariaHidden || undefined}
        className={`inline-flex items-center shrink-0 uppercase leading-none text-[clamp(3.5rem,9vw,9rem)] ${
          i % 2 === 1 ? 'serif-italic text-foreground-muted' : 'font-display font-medium'
        }`}
      >
        {item}
        <span className="mx-[3vw] text-accent text-[0.35em]" aria-hidden="true">
          ●
        </span>
      </span>
    ));

  return (
    <div className="relative py-10 border-y overflow-hidden select-none" style={{ borderColor: 'var(--color-border)' }}>
      <div ref={trackRef} className="flex w-max whitespace-nowrap will-change-transform">
        {renderItems(false)}
        {renderItems(true)}
      </div>
    </div>
  );
};

export default Marquee;
