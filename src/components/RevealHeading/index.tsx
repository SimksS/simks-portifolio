'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Heading com reveal mascarado por linha — as linhas sobem por trás de um
 * clip (SplitText mask: "lines"). Após a animação o split é revertido para
 * devolver o DOM original (evita clipping estático de descendentes do serif).
 */
const RevealHeading = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const split = SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 110,
          duration: 1,
          stagger: 0.09,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onComplete: () => {
            requestAnimationFrame(() => split.revert());
          },
        });
      },
    });

    return () => split.revert();
  }, []);

  return (
    <h2 ref={ref} className={className}>
      {children}
    </h2>
  );
};

export default RevealHeading;
