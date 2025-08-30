'use client';

import Image from "next/image";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar o plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Efeito de zoom infinito na imagem
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.1, // Zoom máximo de 110%
        duration: 8, // Duração longa para um efeito suave
        ease: "power1.inOut",
        repeat: -1, // Repetir infinitamente
        yoyo: true, // Alternar entre zoom in e zoom out
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%", // Iniciar quando o topo da imagem estiver 80% visível
          end: "bottom 20%", // Parar quando a parte inferior estiver 20% visível
          toggleActions: "play pause resume reverse", // Controle de play/pause baseado na visibilidade
        }
      });
    }

    // Animação de entrada para o título
    const titleElement = document.querySelector('#about .text-5xl');
    if (titleElement) {
      gsap.fromTo(
        titleElement,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleElement,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }

    // Animação de entrada para o texto
    const textElements = document.querySelectorAll('#about p');
    textElements.forEach((element, index) => {
      gsap.fromTo(
        element,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.4 + (index * 0.1),
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // Animação de entrada para as especialidades
    const skillElements = document.querySelectorAll('#about .grid-cols-2 > div');
    skillElements.forEach((element, index) => {
      gsap.fromTo(
        element,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.6 + (index * 0.05),
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="about" className="fullscreen-section about-section-mobile bg-background overflow-hidden relative">
      {/* Background com efeitos especiais */}
      <div className="parallax-bg">
        <div className="parallax-element w-96 h-96 bg-primary/10" style={{ top: '10%', left: '5%' }}></div>
        <div className="parallax-element w-64 h-64 bg-chart-2/10" style={{ top: '60%', right: '10%' }}></div>
        <div className="parallax-element w-80 h-80 bg-chart-3/10" style={{ bottom: '20%', left: '20%' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-8 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content - Photo */}
          <div className="flex justify-center lg:justify-start order-last lg:order-first">
            <div className="relative">
              {/* Main Photo - Styled placeholder based on the provided image description */}
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl golden-glow">
                {/* Car window frame effect */}
                <div className="absolute inset-0 border-8 border-primary/30 rounded-2xl"></div>

                {/* Raindrops effect */}
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-foreground/60 rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${1 + Math.random()}s`
                      }}
                    />
                  ))}
                </div>

                {/* Professional portrait placeholder */}
                <div
                  ref={imageRef}
                  className="absolute inset-8 bg-gradient-to-br from-card to-secondary rounded-xl flex items-center justify-center overflow-hidden"
                >
                  <div className="text-center space-y-4 w-full h-full flex items-center justify-center overflow-hidden">
                    <Image
                      src="/profile-photo.jpeg"
                      alt="About"
                      width={300}
                      height={300}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                </div>

                {/* Overlay gradient com reflexos azuis */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent blue-reflection"></div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-chart-2/20 rounded-full blur-xl"></div>
            </div>
          </div>

          {/* Right Content - About Text */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4 lg:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Sobre Mim
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-primary rounded-full mx-auto lg:mx-0"></div>
            </div>

            <div className="space-y-4 lg:space-y-6 text-base sm:text-lg leading-relaxed">
              <p className="text-muted-foreground">
                Sou um desenvolvedor full-stack que transforma ideias em soluções digitais inovadoras. Minha paixão é criar sistemas performáticos, escaláveis e intuitivos, sempre priorizando experiência do usuário e excelência técnica.
              </p>

              <p className="text-muted-foreground">
              Atuo com React/Next.js no front-end e Node.js no back-end, além de integrar plataformas líderes como VTEX, Wake e Shopify, entregando projetos robustos e preparados para crescer.
              </p>

              <p className="text-muted-foreground">
              Cada projeto é uma oportunidade de inovar, superar expectativas e gerar impacto real.
              </p>
            </div>

            {/* Skills/Expertise */}
            <div className="space-y-4 lg:space-y-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                Especialidades
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-muted-foreground text-sm sm:text-base">Front-end Development</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-muted-foreground text-sm sm:text-base">E-commerce Solutions</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-muted-foreground text-sm sm:text-base">UI/UX Design</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-muted-foreground text-sm sm:text-base">Performance Optimization</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-muted-foreground text-sm sm:text-base">API Development</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-muted-foreground text-sm sm:text-base">Mobile-First Design</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 lg:pt-6">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-card border border-primary rounded-xl text-foreground hover:bg-accent transition-colors duration-200 font-medium text-sm sm:text-base hover-lift golden-glow">
                Ver Projetos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
