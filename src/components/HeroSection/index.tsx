'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { motion } from 'motion/react';

// Texto glitch component
const GlitchText = ({ text }: { text: string }) => {
  return (
    <span className="relative inline-block glitch-text">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -translate-x-[2px] text-neon-purple opacity-50 animate-pulse">
        {text}
      </span>
      <span className="absolute top-0 left-0 translate-x-[2px] text-neon-cyan opacity-50 animate-pulse" style={{ animationDelay: '0.1s' }}>
        {text}
      </span>
    </span>
  );
};

// Typewriter component
const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayText}
      <span className={`text-neon-cyan ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </span>
  );
};

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setIsLoaded(true);
      return;
    }

    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
      )
        .fromTo(
          '.hero-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        )
        .fromTo(
          '.hero-subtitle',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          '.hero-buttons',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          '.hero-stats',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.2'
        )
        .fromTo(
          '.hero-image-container',
          { opacity: 0, scale: 0.9, rotateY: 10 },
          { opacity: 1, scale: 1, rotateY: 0, duration: 1, ease: 'power3.out' },
          '-=0.8'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth',
      });
    }
  };

  const stats = [
    { value: '4+', label: 'Anos Exp.' },
    { value: '30+', label: 'Projetos' },
    { value: '100%', label: 'Dedicado' },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 -right-32 w-80 h-80 bg-neon-purple/10 rounded-full blur-[100px]"
        />

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container-futuristic relative z-10">
        <div className="hero-grid-futuristic grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className={`hero-badge transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
                </span>
                <span className="text-sm text-neon-cyan font-medium">
                  <TypewriterText text="Disponível para projetos" delay={500} />
                </span>
              </motion.div>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1
                className={`hero-title hero-title-futuristic gradient-text-animated transition-all duration-700 delay-100 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                Kelven Souza
              </h1>
              <p
                className={`hero-title text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground transition-all duration-700 delay-200 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <GlitchText text="Desenvolvedor Full-Stack" />
              </p>
              <p
                className={`hero-subtitle text-lg text-foreground-muted max-w-xl mx-auto lg:mx-0 leading-relaxed transition-all duration-700 delay-300 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                Especialista em arquiteturas de e-commerce escaláveis.
                Transformo visões complexas em realidade digital com código limpo e performance excepcional.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className={`hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToProjects}
                className="btn-cyber-primary group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explorar Projetos
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="/curriculo-kelven-souza.pdf"
                download
                className="btn-cyber-outline group"
              >
                <svg
                  className="w-5 h-5 transition-transform group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Baixar CV
              </motion.a>
            </div>

            {/* Stats */}
            <div
              className={`hero-stats flex justify-center lg:justify-start gap-12 pt-6 border-t border-border/50 transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className="text-2xl font-bold text-neon-cyan group-hover:text-neon-purple transition-colors duration-300 drop-shadow-[0_0_10px_currentColor]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground-muted">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image Container */}
          <div className="hero-image-container order-1 lg:order-2 flex justify-center lg:justify-end perspective-1000">
            <motion.div
              whileHover={{ scale: 1.02, rotateY: -5 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="relative"
            >
              {/* Decorative rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 -m-8"
              >
                <div className="absolute inset-0 border border-dashed border-neon-cyan/20 rounded-full" />
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-neon-cyan rounded-full -translate-x-1/2" />
              </motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 -m-16"
              >
                <div className="absolute inset-0 border border-dashed border-neon-purple/10 rounded-full" />
              </motion.div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 rounded-full blur-3xl" />

              {/* Image container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Hexagon border */}
                <div className="absolute inset-0 border-2 border-neon-cyan/30 rounded-3xl transform rotate-3" />
                <div className="absolute inset-0 border-2 border-neon-purple/20 rounded-3xl transform -rotate-3" />

                {/* Main image */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-neon-cyan/30 group">
                  {/* Cyber overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent z-10" />

                  <Image
                    src="/avatar.jpeg"
                    alt="Kelven Souza"
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                  />

                  {/* Scanline overlay */}
                  <div className="absolute inset-0 z-20 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwMDAwIi8+Cjwvc3ZnPg==')]" />

                  {/* Corner accents */}
                  <div className="corner-decoration corner-decoration-tl" />
                  <div className="corner-decoration corner-decoration-tr" />
                  <div className="corner-decoration corner-decoration-bl" />
                  <div className="corner-decoration corner-decoration-br" />
                </div>
              </div>

              {/* Floating tech badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-8 px-3 py-1.5 rounded-lg bg-background/80 border border-neon-cyan/30 backdrop-blur-sm"
              >
                <span className="text-xs font-mono text-neon-cyan">React</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-2 -right-6 px-3 py-1.5 rounded-lg bg-background/80 border border-neon-purple/30 backdrop-blur-sm"
              >
                <span className="text-xs font-mono text-neon-purple">Node.js</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-1/2 -right-10 px-3 py-1.5 rounded-lg bg-background/80 border border-neon-blue/30 backdrop-blur-sm"
              >
                <span className="text-xs font-mono text-neon-blue">TypeScript</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 1 }}
          className="hidden lg:flex justify-center mt-16"
        >
          <motion.button
            whileHover={{ y: 2 }}
            onClick={scrollToProjects}
            className="flex flex-col items-center gap-2 text-foreground-muted hover:text-neon-cyan transition-colors group"
          >
            <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-2.5 bg-current rounded-full"
              />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
