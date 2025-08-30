import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar o plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAP = () => {
  const elementRef = useRef<HTMLElement>(null);

  // Animação de entrada com fade in e slide up
  const fadeInUp = (delay: number = 0) => {
    if (elementRef.current) {
      gsap.fromTo(
        elementRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elementRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  };

  // Animação de entrada com stagger para elementos filhos
  const staggerIn = (stagger: number = 0.1, delay: number = 0) => {
    if (elementRef.current) {
      const children = elementRef.current.children;
      gsap.fromTo(
        children,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elementRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  };

  // Animação de texto com typewriter effect
  const typewriter = (delay: number = 0) => {
    if (elementRef.current) {
      const text = elementRef.current.textContent || '';
      elementRef.current.textContent = '';
      
      gsap.to(elementRef.current, {
        duration: 0,
        delay,
      });

      const chars = text.split('');
      chars.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        elementRef.current?.appendChild(span);

        gsap.to(span, {
          opacity: 1,
          duration: 0.05,
          delay: delay + index * 0.05,
          ease: 'none',
        });
      });
    }
  };

  // Animação de hover para cards
  const cardHover = () => {
    if (elementRef.current) {
      const cards = elementRef.current.querySelectorAll('.card-hover');
      
      cards.forEach((card) => {
        gsap.set(card, { transformOrigin: 'center center' });
        
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    }
  };

  // Animação de botões com ripple effect
  const buttonRipple = () => {
    if (elementRef.current) {
      const buttons = elementRef.current.querySelectorAll('.button-ripple');
      
      buttons.forEach((button) => {
        button.addEventListener('click', (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = button.getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left;
          const y = mouseEvent.clientY - rect.top;
          
          const ripple = document.createElement('span');
          ripple.style.position = 'absolute';
          ripple.style.left = x + 'px';
          ripple.style.top = y + 'px';
          ripple.style.width = '0px';
          ripple.style.height = '0px';
          ripple.style.background = 'rgba(255, 255, 255, 0.3)';
          ripple.style.borderRadius = '50%';
          ripple.style.transform = 'translate(-50%, -50%)';
          ripple.style.pointerEvents = 'none';
          
          button.appendChild(ripple);
          
          gsap.to(ripple, {
            width: '300px',
            height: '300px',
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
              ripple.remove();
            },
          });
        });
      });
    }
  };

  // Animação de parallax
  const parallax = (speed: number = 0.5) => {
    if (elementRef.current) {
      gsap.to(elementRef.current, {
        yPercent: -50 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  };

  // Animação de morphing para elementos (desabilitada por problemas de tipagem)
  const morph = (targetElement: HTMLElement, duration: number = 0.5) => {
    // morphSVG só funciona com elementos SVG, então esta função está desabilitada
    console.warn('Morph function is disabled due to SVG-specific requirements');
  };

  // Animação de timeline para sequências complexas
  const createTimeline = () => {
    return gsap.timeline();
  };

  // Cleanup function
  const cleanup = () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  return {
    elementRef,
    fadeInUp,
    staggerIn,
    typewriter,
    cardHover,
    buttonRipple,
    parallax,
    morph,
    createTimeline,
    cleanup,
  };
};
