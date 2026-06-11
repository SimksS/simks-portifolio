'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const INTERACTIVE = 'a, button, [role="button"], select, [data-cursor]';
const TEXT_FIELD =
  'input[type="text"], input[type="email"], input[type="search"], input[type="tel"], input[type="url"], input:not([type]), textarea';

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
    let textMode = false;

    const setTextMode = (active: boolean) => {
      if (textMode === active) return;
      textMode = active;
      document.documentElement.classList.toggle('cursor-text-mode', active);
      gsap.to(dot, {
        opacity: active ? 0 : visible ? 1 : 0,
        scale: active ? 0.5 : 1,
        duration: 0.25,
        ease: 'power2.out',
      });
    };

    const handleMove = (e: MouseEvent) => {
      if (!visible && !textMode) {
        gsap.to(dot, { opacity: 1, duration: 0.3 });
        visible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
      bxTo(e.clientX);
      byTo(e.clientY);
    };

    // Delegação: bolha "Ver" sobre o índice de projetos, dot cresce nos demais
    const handleOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;

      if (el.closest?.(TEXT_FIELD)) {
        setTextMode(true);
        return;
      }

      if (el.closest?.('[data-cursor="view"]')) {
        gsap.to(bubble, { scale: 1, opacity: 1, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
        gsap.to(dot, { opacity: 0, scale: 0.5, duration: 0.25, ease: 'power2.out' });
        return;
      }

      if (el.closest?.(INTERACTIVE)) {
        gsap.to(dot, { scale: 3.5, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
      }
    };

    const handleOut = (e: MouseEvent) => {
      const fromText = (e.target as HTMLElement).closest?.(TEXT_FIELD);
      const toText = (e.relatedTarget as HTMLElement | null)?.closest?.(TEXT_FIELD);
      if (fromText && !toText) {
        setTextMode(false);
      }

      const from = (e.target as HTMLElement).closest?.('[data-cursor="view"]');
      const to = (e.relatedTarget as HTMLElement | null)?.closest?.('[data-cursor="view"]');
      if (from && !to) {
        gsap.to(bubble, { scale: 0, opacity: 0, duration: 0.3, ease: 'power3.out' });
        gsap.to(dot, { opacity: textMode ? 0 : 1, scale: 1, duration: 0.3, ease: 'power3.out' });
      }

      const fromInteractive = (e.target as HTMLElement).closest?.(INTERACTIVE);
      const toInteractive = (e.relatedTarget as HTMLElement | null)?.closest?.(INTERACTIVE);
      if (fromInteractive && !toInteractive) {
        gsap.to(dot, { scale: 1, duration: 0.4, ease: 'power3.out' });
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest?.(TEXT_FIELD)) setTextMode(true);
    };

    const handleFocusOut = (e: FocusEvent) => {
      const fromText = (e.target as HTMLElement).closest?.(TEXT_FIELD);
      const toText = (e.relatedTarget as HTMLElement | null)?.closest?.(TEXT_FIELD);
      if (fromText && !toText) setTextMode(false);
    };

    const handleLeaveWindow = () => {
      gsap.to(dot, { opacity: 0, duration: 0.3 });
      gsap.to(bubble, { scale: 0, opacity: 0, duration: 0.3 });
      visible = false;
      setTextMode(false);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true });
    window.addEventListener('mouseout', handleOut, { passive: true });
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    document.documentElement.addEventListener('mouseleave', handleLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseout', handleOut);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      document.documentElement.removeEventListener('mouseleave', handleLeaveWindow);
      document.documentElement.classList.remove('cursor-text-mode');
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-[6px] -mt-[6px] w-3 h-3 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
        style={{ opacity: 0, willChange: 'transform' }}
        aria-hidden="true"
      />
      <div
        ref={bubbleRef}
        className="fixed top-0 left-0 -ml-10 -mt-10 w-20 h-20 rounded-full pointer-events-none z-[9999] hidden lg:flex items-center justify-center"
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
