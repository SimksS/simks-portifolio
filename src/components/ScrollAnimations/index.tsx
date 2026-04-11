'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Mouse follower component
const MouseFollower = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    // Check if it's a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth follow for outer cursor
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      // Smoother follow for dot
      dotX += (mouseX - dotX) * 0.2;
      dotY += (mouseY - dotY) * 0.2;

      cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
      cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;

      rafId = requestAnimationFrame(animate);
    };

    // Hover effects
    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.3 });
      gsap.to(cursorDot, { opacity: 0, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(cursorDot, { opacity: 1, duration: 0.3 });
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Don't render if touch device
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Outer cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 border border-neon-cyan/50 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{ willChange: 'transform' }}
      />
      {/* Inner cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-neon-cyan rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

const ScrollAnimations = () => {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    // Main parallax animations
    const ctx = gsap.context(() => {
      // Reveal animations for sections
      const revealElements = document.querySelectorAll('.reveal-up');
      revealElements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Parallax for background elements
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach((element) => {
        gsap.to(element, {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      // Fade in animations
      const fadeInElements = document.querySelectorAll('.fade-in');
      fadeInElements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Slide animations
      const slideInLeftElements = document.querySelectorAll('.slide-in-left');
      slideInLeftElements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      const slideInRightElements = document.querySelectorAll('.slide-in-right');
      slideInRightElements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Scale animations
      const scaleElements = document.querySelectorAll('.scale-in');
      scaleElements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Stagger animations
      const staggerContainers = document.querySelectorAll('.stagger-in');
      staggerContainers.forEach((container) => {
        const children = container.children;
        if (children.length > 0) {
          gsap.fromTo(
            children,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Text reveal animation
      const textRevealElements = document.querySelectorAll('.text-reveal');
      textRevealElements.forEach((element) => {
        gsap.fromTo(
          element,
          { backgroundPosition: '200% center' },
          {
            backgroundPosition: '0% center',
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Horizontal scroll animation for stats
      const horizontalScrollElements = document.querySelectorAll('.horizontal-scroll');
      horizontalScrollElements.forEach((element) => {
        const scrollWidth = element.scrollWidth - element.clientWidth;

        gsap.to(element, {
          x: -scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      // Glow effect on scroll
      const glowElements = document.querySelectorAll('.scroll-glow');
      glowElements.forEach((element) => {
        gsap.to(element, {
          boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        });
      });

      // Rotation animations
      const rotateElements = document.querySelectorAll('.rotate-in');
      rotateElements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, rotation: -15, scale: 0.95 },
          {
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Blur reveal animations
      const blurRevealElements = document.querySelectorAll('.blur-reveal');
      blurRevealElements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, filter: 'blur(10px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Counter animation
      const counterElements = document.querySelectorAll('.counter');
      counterElements.forEach((element) => {
        const target = parseInt(element.getAttribute('data-target') || '0', 10);
        const suffix = element.getAttribute('data-suffix') || '';
        const prefix = element.getAttribute('data-prefix') || '';

        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: () => {
            element.textContent = prefix + Math.round(obj.value) + suffix;
          },
        });
      });
    });

    // Cleanup
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <MouseFollower />;
};

export default ScrollAnimations;
