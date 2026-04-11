import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugins apenas no cliente
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Verificar preferência de movimento reduzido
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

interface AnimationOptions {
  delay?: number;
  duration?: number;
  stagger?: number;
  disabled?: boolean;
}

export const useGSAP = () => {
  const elementRef = useRef<HTMLElement>(null);
  const reducedMotion = prefersReducedMotion();

  const fadeInUp = (options: AnimationOptions = {}) => {
    const { delay = 0, duration = 0.6, disabled = false } = options;

    if (disabled || reducedMotion || !elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  };

  const staggerIn = (options: AnimationOptions = {}) => {
    const { delay = 0, stagger = 0.1, disabled = false } = options;

    if (disabled || reducedMotion || !elementRef.current) return;

    const children = elementRef.current.children;
    if (!children.length) return;

    gsap.fromTo(
      children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  };

  // Cleanup no desmount
  useEffect(() => {
    return () => {
      if (elementRef.current) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === elementRef.current) {
            trigger.kill();
          }
        });
      }
    };
  }, []);

  return { elementRef, fadeInUp, staggerIn };
};
