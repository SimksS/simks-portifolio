'use client';

import { useEffect } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from 'gsap';

const ResumeDownloadSection = () => {
  const { elementRef, fadeInUp, buttonRipple } = useGSAP();

  useEffect(() => {
    // Pequeno delay para garantir que os elementos estejam totalmente carregados
    const timer = setTimeout(() => {
      // Animação de entrada para a seção
      fadeInUp(0.2);

      // Animação de entrada para o título
      const titleElement = document.querySelector('.resume-title');
      if (titleElement) {
        gsap.fromTo(
          titleElement,
          { opacity: 0, y: -30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.1,
            ease: 'power2.out',
          }
        );
      }

      // Animação de entrada para a descrição
      const descriptionElement = document.querySelector('.resume-description');
      if (descriptionElement) {
        gsap.fromTo(
          descriptionElement,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.4,
            ease: 'power2.out',
          }
        );
      }

      // Animação de entrada para o botão
      const buttonElement = document.querySelector('.resume-button');
      if (buttonElement) {
        gsap.fromTo(
          buttonElement,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: 0.7,
            ease: 'back.out(1.7)',
          }
        );
      }

      // Animação do ícone de download
      const iconElement = document.querySelector('.download-icon');
      if (iconElement) {
        gsap.set(iconElement, { y: 0 });
        gsap.to(iconElement, {
          y: 5,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: 1,
        });
      }

      // Ripple effect para o botão
      buttonRipple();

      // Cleanup
      return () => clearTimeout(timer);
    }, 100);

    return () => {
      // Cleanup adicional se necessário
    };
  }, [fadeInUp, buttonRipple]);

  const handleDownload = () => {
    // Simular download do currículo
    const link = document.createElement('a');
    link.href = '/curriculo-kelven-souza.pdf'; // Você pode substituir por um arquivo real
    link.download = 'curriculo-kelven-souza.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section ref={elementRef} id="resume" className="fullscreen-section resume-section bg-background overflow-hidden relative py-16 lg:py-0">
      {/* Elementos decorativos de fundo */}
      <div className="parallax-bg">
        <div className="parallax-element absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
        <div className="parallax-element absolute top-40 right-20 w-24 h-24 bg-chart-2/5 rounded-full blur-xl"></div>
        <div className="parallax-element absolute bottom-32 left-1/4 w-40 h-40 bg-chart-1/5 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-8 lg:space-y-12">
          {/* Título */}
          <div className="space-y-4">
            <h2 className="resume-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Baixe Meu Currículo
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-primary rounded-full mx-auto"></div>
          </div>

          {/* Descrição */}
          <div className="space-y-6 max-w-2xl mx-auto">
            <p className="resume-description text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Conheça em detalhes minha trajetória profissional, projetos e habilidades técnicas.
            </p>

            <p className="resume-description text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              O currículo inclui informações sobre meus projetos, tecnologias dominadas e
              conquistas profissionais. Fique à vontade para baixar e conhecer melhor meu trabalho!
            </p>
          </div>

          {/* Botão de Download */}
          <div className="pt-4">
            <button
              onClick={handleDownload}
              className="resume-button button-ripple group inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 bg-card border-2 border-primary rounded-xl text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 font-medium text-base sm:text-lg hover-lift relative overflow-hidden"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="download-icon text-primary group-hover:text-primary-foreground transition-colors duration-200">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7"
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
                </div>
                <span>Download Currículo</span>
              </div>

              {/* Efeito de brilho */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>

         
        </div>
      </div>
    </section>
  );
};

export default ResumeDownloadSection;
