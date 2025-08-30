'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from 'gsap';
import { LinkPreview } from '@/components/ui/link-preview';

// Componente Toast para mostrar informações das tecnologias
const TechnologyToast = ({ tech, isVisible, position, onMouseEnter, onMouseLeave }: {
  tech: { name: string; description: string; link: string };
  isVisible: boolean;
  position: { x: number; y: number };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  if (!isVisible) return null;

  // Calcular posição responsiva
  const getPosition = () => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;

    if (isMobile) {
      // Mobile: centralizar na parte inferior
      return {
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        right: '20px'
      };
    } else if (isTablet) {
      // Tablet: ajustar baseado na posição do mouse
      return {
        top: Math.min(position.y, window.innerHeight - 200),
        left: Math.min(position.x, window.innerWidth - 300),
        maxWidth: '280px'
      };
    } else {
      // Desktop: seguir o mouse com offset
      return {
        top: position.y - 10,
        left: position.x + 20,
        maxWidth: '320px'
      };
    }
  };

  return (
    <div
      className="fixed z-50 bg-card border border-primary/30 rounded-lg p-3 sm:p-4 shadow-lg animate-in fade-in duration-200"
      style={getPosition()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base truncate">
            {tech.name}
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground mb-2 leading-relaxed line-clamp-3">
            {tech.description}
          </p>
          <a
            href={tech.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 text-xs sm:text-sm font-medium transition-colors inline-flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            Saiba mais
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const { elementRef, fadeInUp, staggerIn } = useGSAP();
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [toastTech, setToastTech] = useState<{ name: string; description: string; link: string } | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastPosition, setToastPosition] = useState({ x: 0, y: 0 });
  const [isHoveringToast, setIsHoveringToast] = useState(false);

  useEffect(() => {
    // Animação de entrada para a seção
    fadeInUp(0.2);

    // Animação de entrada com stagger para os cards
    staggerIn(0.15, 0.5);

    // Animação de entrada para o título
    const titleElement = document.querySelector('.section-title');
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

    // Animação de hover para os cards de projeto
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }, [fadeInUp, staggerIn]);

  // Efeito para animar os projetos quando o filtro muda
  useEffect(() => {
    const projectCards = document.querySelectorAll('.project-card');

    // Animação de entrada para os cards filtrados
    gsap.fromTo(
      projectCards,
      {
        opacity: 0,
        y: 30,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );
  }, [activeFilter]);

  const projects = [
    {
      title: 'Elle',
      description: 'A loja virtual da ELLE Brasil é o e-commerce oficial da revista de moda, cultura e lifestyle. Nela, a marca oferece suas edições impressas, edições especiais, livros e outros produtos colecionáveis, expandindo sua presença do digital para o mercado de publicações físicas e itens exclusivos.',
      technologies: [{
        name: 'VTEX',
        description: 'Plataforma de e-commerce que permite criar lojas online de forma rápida e fácil, com muitas funcionalidades prontas para uso.',
        link: 'https://vtex.com/',
      }, {
        name: "Wicomm",
        description: "Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.",
        link: 'https://www.wicomm.com.br/',
      }],
      status: 'Concluído',
      image: '/project1.png',
      link: 'https://loja.elle.com.br/',
      category: 'E-commerce'
    },
    {
      title: 'Dpaschoal',
      description: 'A DPaschoal é uma empresa brasileira de serviços automotivos, especializada na venda de pneus, peças, e na realização de serviços como alinhamento, balanceamento e troca de óleo. A empresa se destaca por sua longa história, desde 1949, e por ser uma das maiores redes de varejo automotivo do país.',
      technologies: [{
        name: 'VTEX',
        description: 'Plataforma de e-commerce que permite criar lojas online de forma rápida e fácil, com muitas funcionalidades prontas para uso.',
        link: 'https://vtex.com/',
      }, {
        name: "Wicomm",
        description: "Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.",
        link: 'https://www.wicomm.com.br/',
      }],
      status: 'Concluído',
      image: '/project1.png',
      link: 'https://www.dpaschoal.com.br/',
      category: 'E-commerce'
    },
    {
      title: 'Cris Barros Internacional',
      description: 'A Cris Barros é uma marca de moda de luxo conhecida por sua estética sofisticada e atemporal. A grife se destaca pela criação de peças com tecidos nobres, acabamentos impecáveis e um design autoral que busca expressar feminilidade de forma elegante e fluida.',
      technologies: [{
        name: 'VTEX',
        description: 'Plataforma de e-commerce que permite criar lojas online de forma rápida e fácil, com muitas funcionalidades prontas para uso.',
        link: 'https://vtex.com/',
      }, {
        name: "Wicomm",
        description: "Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.",
        link: 'https://www.wicomm.com.br/',
      }],
      status: 'Concluído',
      image: '/project1.png',
      link: 'https://www.crisbarros.com/',
      category: 'E-commerce'
    },
    {
      title: 'Canal Concept',
      description: 'A Canal Concept é uma loja online de moda feminina que busca criar um estilo que une autenticidade e bem-estar. A marca se diferencia por focar em peças que "respiram" e acompanham os movimentos do corpo, valorizando a identidade e a confiança da mulher em diferentes fases da vida.',
      technologies: [{
        name: 'Wake',
        description: 'Wake é uma plataforma de e-commerce que permite criar lojas online de forma rápida e fácil, com muitas funcionalidades prontas para uso.',
        link: 'https://wake.tech/',
      }, {
        name: "Wicomm",
        description: "Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.",
        link: 'https://www.wicomm.com.br/',
      }],
      status: 'Concluído',
      image: '/project1.png',
      link: 'https://www.canal.com.br/',
      category: 'E-commerce'
    },
    {
      title: 'CSP Forge',
      description: 'Uma ferramenta prática e acessível para gerar Content Security Policies personalizadas, com predefinições inteligentes e uma interface intuitiva.',
      technologies: [{
        name: 'Next.js',
        description: 'Next.js é um framework para React que permite criar aplicativos web com SSR, SSG e ISR.',
        link: 'https://nextjs.org/',
      }],
      link: 'https://cspforge.simks.com.br/',
      category: 'Pessoal'
    },
  ];

  // Obter categorias únicas
  const categories = ['Todos', ...Array.from(new Set(projects.map(project => project.category)))];

  // Filtrar projetos baseado na categoria ativa
  const filteredProjects = activeFilter === 'Todos'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="fullscreen-section projects-section-mobile bg-background overflow-hidden relative">
      {/* Elementos decorativos de fundo */}
      <div className="parallax-bg">
        <div className="parallax-element absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
        <div className="parallax-element absolute top-40 right-20 w-24 h-24 bg-cyan/5 rounded-full blur-xl"></div>
        <div className="parallax-element absolute bottom-32 left-1/4 w-40 h-40 bg-purple/5 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 lg:mb-6">
            Meus Projetos
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4 mb-8">
            Uma seleção dos meus trabalhos mais recentes, demonstrando expertise em desenvolvimento full-stack e soluções inovadoras.
          </p>

          {/* Filtros de categoria */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${activeFilter === category
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-accent border border-border/20'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project, index) => (

            <div
              key={index}
              className="project-card neon-card group cursor-pointer p-4 sm:p-6"
            >
              {/* Header do card */}
              <div className="flex items-center justify-between mb-4 gap-2 sm:gap-0">
                <span className="px-2 sm:px-3 py-1 bg-primary/20 text-primary rounded-full text-xs sm:text-sm font-medium neon-glow w-fit">
                  {project.category}
                </span>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit ${project.status === 'Concluído'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                  {project.status}
                </span>
              </div>

              {/* Conteúdo do projeto */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {project.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>

                {/* Tecnologias */}
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="relative"
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setToastPosition({
                          x: rect.left + rect.width / 2,
                          y: rect.top - 10
                        });
                        setToastTech(tech);
                        setIsToastVisible(true);
                      }}
                      onMouseLeave={() => {
                        if (!isHoveringToast) {
                          setTimeout(() => {
                            setIsToastVisible(false);
                          }, 200);
                        }
                      }}
                    >
                      <span className="px-2 sm:px-3 py-1 bg-secondary text-secondary-foreground rounded-lg text-xs sm:text-sm neon-border hover:bg-secondary/80 transition-colors cursor-pointer inline-block">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer com link */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border/20">
                <LinkPreview className="w-full neon-button text-sm sm:text-base py-2 sm:py-3 inline-block text-center" url={project.link} width={300} height={190}>
                  Ver Projeto Completo →
                </LinkPreview>
              </div>
            </div>

          ))}
        </div>



      </div>

      {/* Toast para tecnologias */}
      {toastTech && (
        <TechnologyToast
          tech={toastTech}
          isVisible={isToastVisible}
          position={toastPosition}
          onMouseEnter={() => setIsHoveringToast(true)}
          onMouseLeave={() => {
            setIsHoveringToast(false);
            // Esconde o toast quando sair do hover
            setTimeout(() => {
              setIsToastVisible(false);
            }, 200);
          }}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
