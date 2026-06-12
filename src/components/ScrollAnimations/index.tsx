'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor]';
const TEXT_CONTENT = 'p, h1, h2, h3, h4, h5, h6, li, blockquote, figcaption';

/**
 * Cursor customizado — um dot em mix-blend-difference que cresce sobre
 * interativos, e uma bolha contextual "Ver →" sobre alvos [data-cursor="view"].
 * quickTo por eixo (nunca um tween por mousemove) e delegação de eventos,
 * para que conteúdo montado dinamicamente também reaja.
 */
const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || reducedMotion) return;

    const dot = dotRef.current;
    const bubble = bubbleRef.current;
    if (!dot || !bubble) return;

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3.out' });
    const bxTo = gsap.quickTo(bubble, 'x', { duration: 0.5, ease: 'power3.out' });
    const byTo = gsap.quickTo(bubble, 'y', { duration: 0.5, ease: 'power3.out' });

    let visible = false;
    let bubbleActive = false;

    const showBubble = () => {
      if (bubbleActive) return;
      bubbleActive = true;
      gsap.to(bubble, { scale: 1, opacity: 1, duration: 0.9, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
      gsap.to(dot, { opacity: 0, scale: 0.5, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
    };

    const hideBubble = () => {
      if (!bubbleActive) return;
      bubbleActive = false;
      gsap.to(bubble, { scale: 0, opacity: 0, duration: 0.3, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(dot, {
        opacity: visible ? 1 : 0,
        scale: 1,
        duration: 0.3,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    const handleMove = (e: MouseEvent) => {
      if (!visible) {
        gsap.to(dot, { opacity: 1, duration: 0.3 });
        visible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
      bxTo(e.clientX);
      byTo(e.clientY);
    };

    // handleOver é a fonte da verdade: cada elemento que o ponteiro entra
    // reavalia o estado, então a bolha nunca fica presa fora do índice.
    const handleOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;

      if (el.closest?.('[data-cursor="view"]')) {
        showBubble();
        return;
      }

      // Fora de um alvo "view": garante que a bolha sumiu...
      hideBubble();

      if (el.closest?.(INTERACTIVE)) {
        gsap.to(dot, { scale: 3.5, duration: 0.9, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
        return;
      }

      if (el.closest?.(TEXT_CONTENT)) {
        gsap.to(dot, { scale: 2, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
        return;
      }

      gsap.to(dot, { scale: 1, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
    };

    const handleLeaveWindow = () => {
      gsap.to(dot, { opacity: 0, duration: 0.3 });
      gsap.to(bubble, { scale: 0, opacity: 0, duration: 0.3 });
      visible = false;
      bubbleActive = false;
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      document.documentElement.removeEventListener('mouseleave', handleLeaveWindow);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-[6px] -mt-[6px] w-3 h-3 rounded-full bg-white pointer-events-none z-[10000] mix-blend-difference"
        style={{ opacity: 0, willChange: 'transform' }}
        aria-hidden="true"
      />
      <div
        ref={bubbleRef}
        className="fixed top-0 left-0 -ml-10 -mt-10 w-20 h-20 rounded-full pointer-events-none z-[10000] hidden lg:flex items-center justify-center"
        style={{
          opacity: 0,
          transform: 'scale(0)',
          willChange: 'transform',
          background: 'var(--color-accent)',
        }}
        aria-hidden="true"
      >
        <span className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[oklch(0.15_0.006_75)]">
          Ver →
        </span>
      </div>
    </>
  );
};

const ScrollAnimations = () => {
  return <Cursor />;
};

export default ScrollAnimations;
