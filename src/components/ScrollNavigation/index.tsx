'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const ScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'Sobre' },
    { id: 'technologies', name: 'Technologies' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'projects', name: 'Projetos' },
    { id: 'contact', name: 'Contact' }
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight - windowHeight;

          // Calcular progresso do scroll
          const progress = (scrollTop / documentHeight) * 100;
          setScrollProgress(progress);

          // Determinar seção ativa
          const sectionElements = sections.map(section =>
            document.getElementById(section.id)
          );

          let currentSection = 0;
          sectionElements.forEach((element, index) => {
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
                currentSection = index;
              }
            }
          });

          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Executar uma vez para definir estado inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Indicador de progresso do scroll */}
      <div 
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navegação por pontos */}
      <div className="scroll-dots">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`scroll-dot ${activeSection === index ? 'active' : ''}`}
            onClick={() => scrollToSection(section.id)}
            title={section.name}
          />
        ))}
      </div>
    </>
  );
};

export default ScrollNavigation;
