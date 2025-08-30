'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from 'gsap';
import Image from 'next/image';

const HeroSection = () => {
  const { elementRef, fadeInUp, buttonRipple } = useGSAP();

  useEffect(() => {
    // Pequeno delay para garantir que os elementos estejam totalmente carregados
    const timer = setTimeout(() => {
      // Animação de entrada para a seção
      fadeInUp(0.2);

    // Typewriter effect para o título
    const titleElement = document.querySelector('.hero-title');
    if (titleElement) {
      const text = titleElement.textContent || '';
      titleElement.textContent = '';

      // Preserve spaces in the text
      const chars = text.split(/(\s+)/);
      chars.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        // Use inline-block for spaces, inline for other characters
        span.style.display = char.trim() === '' ? 'inline' : 'inline-block';
        titleElement.appendChild(span);

        gsap.to(span, {
          opacity: 1,
          duration: 0.08,
          delay: 0.5 + index * 0.08,
          ease: 'none',
        });
      });
    }

    // Animação de entrada para a descrição
    const descriptionElement = document.querySelector('.hero-description');
    if (descriptionElement) {
      gsap.set(descriptionElement, { opacity: 0, y: 30 }); // Define estado inicial
      gsap.to(descriptionElement, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 3.5,
        ease: 'power2.out',
      });
    }

    // Animação de entrada para os botões
    const buttonsElement = document.querySelector('.hero-buttons');
    if (buttonsElement) {
      gsap.set(buttonsElement, { opacity: 0, y: 30 }); // Define estado inicial
      gsap.to(buttonsElement, {
        opacity: 1,
        y: 0,
                  duration: 0.8,
          delay: 3.2,
        ease: 'power2.out',
      });
    }

    // Animação de entrada para o avatar
    const avatarElement = document.querySelector('.hero-avatar');
    if (avatarElement) {
      gsap.set(avatarElement, { opacity: 0, scale: 0.8, rotation: 10 }); // Define estado inicial
      gsap.to(avatarElement, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        delay: 1,
        ease: 'back.out(1.7)',
      });
    }

    // Ripple effect para os botões
    buttonRipple();

    // Efeito parallax para elementos de fundo
    const parallaxElements = document.querySelectorAll('.parallax-element');
    parallaxElements.forEach((element, index) => {
      gsap.to(element, {
        yPercent: -20 - (index * 10),
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    // Animação dos sparkles (ciscos luminosos)
    const sparkles = document.querySelectorAll('.sparkle');
    sparkles.forEach((sparkle, index) => {
      // Movimento lento e constante
      gsap.to(sparkle, {
        x: `random(-100, 100)`,
        y: `random(-100, 100)`,
        rotation: `random(-180, 180)`,
        scale: `random(0.8, 1.2)`,
        duration: `random(20, 35)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.5,
      });

      // Pulsação de brilho
      gsap.to(sparkle, {
        opacity: `random(0.3, 0.8)`,
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.3,
      });
    });

    // Cleanup
    return () => clearTimeout(timer);
  }, 100); // Delay de 100ms para garantir carregamento completo

  return () => {
    // Cleanup adicional se necessário
  };
}, [fadeInUp, buttonRipple]);

  return (
    <section ref={elementRef} id="home" className="fullscreen-section bg-background overflow-hidden relative">
      {/* Elementos de fundo com parallax */}
      <div className="parallax-bg">
        <div className="parallax-element absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
        <div className="parallax-element absolute top-40 right-20 w-24 h-24 bg-chart-2/10 rounded-full blur-xl"></div>
        <div className="parallax-element absolute bottom-32 left-1/4 w-40 h-40 bg-chart-1/10 rounded-full blur-xl"></div>
        <div className="parallax-element absolute bottom-20 right-1/3 w-20 h-20 bg-chart-3/10 rounded-full blur-xl"></div>
      </div>

      {/* Sparkles (ciscos luminosos distantes) */}
      <div className="sparkles-container absolute inset-0 overflow-hidden pointer-events-none">
        {/* Sparkles grandes e borrados (distantes) */}
        <div className="sparkle sparkle-distant absolute top-20 left-1/4 w-16 h-16 bg-primary/20 rounded-full"></div>
        <div className="sparkle sparkle-distant absolute top-32 right-1/3 w-12 h-12 bg-cyan/15 rounded-full"></div>
        <div className="sparkle sparkle-distant absolute top-1/3 left-16 w-20 h-20 bg-purple/20 rounded-full"></div>
        <div className="sparkle sparkle-distant absolute top-2/3 right-20 w-14 h-14 bg-chart-1/25 rounded-full"></div>
        <div className="sparkle sparkle-distant absolute bottom-32 left-1/2 w-18 h-18 bg-chart-2/20 rounded-full"></div>
        <div className="sparkle sparkle-distant absolute top-16 right-16 w-10 h-10 bg-chart-3/30 rounded-full"></div>
        <div className="sparkle sparkle-distant absolute bottom-20 left-20 w-15 h-15 bg-primary/15 rounded-full"></div>
        <div className="sparkle sparkle-distant absolute top-3/4 right-1/4 w-22 h-22 bg-cyan/18 rounded-full"></div>
        <div className="sparkle sparkle-distant absolute bottom-1/3 left-1/3 w-12 h-12 bg-purple/25 rounded-full"></div>
        <div className="sparkle sparkle-distant absolute top-1/2 left-3/4 w-16 h-16 bg-chart-1/22 rounded-full"></div>

        {/* Sparkles menores (mais próximos) */}
        <div className="sparkle sparkle-close absolute top-10 left-1/3 w-8 h-8 bg-primary/25 rounded-full"></div>
        <div className="sparkle sparkle-close absolute top-40 right-10 w-6 h-6 bg-cyan/20 rounded-full"></div>
        <div className="sparkle sparkle-close absolute bottom-40 left-10 w-10 h-10 bg-purple/20 rounded-full"></div>
        <div className="sparkle sparkle-close absolute top-60 right-2/3 w-7 h-7 bg-chart-2/25 rounded-full"></div>
        <div className="sparkle sparkle-close absolute bottom-60 right-1/2 w-9 h-9 bg-chart-3/22 rounded-full"></div>

        {/* Sparkles médios para transição */}
        <div className="sparkle absolute top-1/4 right-1/2 w-11 h-11 bg-primary/18 rounded-full blur-xl opacity-55"></div>
        <div className="sparkle absolute bottom-1/4 left-2/3 w-13 h-13 bg-cyan/16 rounded-full blur-xl opacity-52"></div>
        <div className="sparkle absolute top-5/6 left-1/6 w-9 h-9 bg-purple/22 rounded-full blur-lg opacity-58"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center min-h-screen py-8 lg:py-0 flex flex-col">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight flex flex-col">
                <span className="hero-title text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal">Olá, eu sou</span>
                <p
                  className="text-primary animate-pulse relative "
                 
                >
                  Kelven Souza
                </p>
              </h1>
              <p className="hero-description text-base sm:text-lg lg:text-xl xl:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Desenvolvedor Full-Stack apaixonado por criar experiências digitais modernas, escaláveis e envolventes.
                Especialista em React, Node.js, Python e soluções de e-commerce (VTEX, Wake, Shopify).
              </p>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="#projects"
                className="button-ripple inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-foreground bg-card border border-border rounded-lg hover:bg-accent transition-colors duration-200 font-medium text-sm sm:text-base relative overflow-hidden hover-lift w-full sm:w-auto"
              >
                Explorar Projetos
              </Link>
              <Link
                href="/curriculo-kelven-souza.pdf"
                download
                target="_blank"
                className="button-ripple inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-foreground border border-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200 font-medium text-sm sm:text-base relative overflow-hidden hover-lift w-full sm:w-auto"
              >
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Baixar CV</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Content - Avatar Placeholder */}
          <div className="flex justify-center lg:justify-end order-first lg:order-last">
            <div className="hero-avatar w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-card rounded-2xl flex items-center justify-center border border-border/20 relative hover-lift">
             <Image
               src={'/avatar.jpeg'}
               alt='avatar'
               width={300}
               height={300}
               className='rounded-2xl overflow-hidden w-full h-full object-cover'
               priority={true}
               placeholder="blur"
               blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoACgDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEB//EACUQAAIBAwMEAwEBAAAAAAAAAAECAwAEEQUSITFBURNhcZEigf/EABUBAFEAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8A4+iiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q=="
             />
              {/* Elementos decorativos animados */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute top-4 left-4 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <div className="absolute top-12 right-12 w-4 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-8 left-12 w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-12 right-6 w-4 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute lg:bottom-8 bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
