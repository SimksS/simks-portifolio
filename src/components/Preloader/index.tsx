'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      onComplete();
      return;
    }

    // Trava o scroll enquanto o preloader está visível (nativo + Lenis)
    document.documentElement.style.overflow = 'hidden';
    window.__lenis?.stop();

    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = '';
        window.__lenis?.start();
        onComplete();
      },
    });

    tl.to(wordRefs.current, {
      yPercent: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: 'expo.out',
    })
      .to(
        obj,
        {
          val: 100,
          duration: 1.1,
          ease: 'power2.inOut',
          onUpdate() {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(obj.val)).padStart(3, '0');
            }
          },
        },
        '<'
      )
      .to(wordRefs.current, {
        yPercent: -110,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power4.in',
      })
      .to(
        overlayRef.current,
        {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.8,
          ease: 'power4.inOut',
        },
        '-=0.25'
      );

    return () => {
      document.documentElement.style.overflow = '';
      window.__lenis?.start();
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      style={{ clipPath: 'inset(0 0 0% 0)', background: 'oklch(0.15 0.006 75)' }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
    >
      {/* Wordmark central — linhas sobem por trás da máscara */}
      <div className="text-center select-none" aria-hidden="true">
        {['KELVEN', 'SOUZA'].map((word, i) => (
          <div key={word} className="overflow-hidden">
            <span
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              style={{ transform: 'translateY(110%)' }}
              className="block font-display uppercase font-medium leading-[0.85] tracking-[-0.03em] text-[oklch(0.94_0.012_85)] text-[clamp(3.5rem,12vw,11rem)]"
            >
              {word}
            </span>
          </div>
        ))}
      </div>

      {/* Counter — canto inferior direito, mono tabular */}
      <span
        ref={counterRef}
        className="absolute bottom-8 right-8 font-mono text-sm tracking-[0.18em] text-[oklch(0.66_0.012_80)] tabular-nums"
      >
        000
      </span>

      {/* Label — canto inferior esquerdo */}
      <span className="absolute bottom-8 left-8 font-mono text-[0.6875rem] tracking-[0.18em] uppercase text-[oklch(0.46_0.01_80)]">
        Portfólio — {new Date().getFullYear()}
      </span>
    </div>
  );
}
