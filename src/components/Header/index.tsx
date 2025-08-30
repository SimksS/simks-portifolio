'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const sections = [
      { id: 'home', name: 'Home' },
      { id: 'about', name: 'Sobre' },
      { id: 'technologies', name: 'Technologies' },
      { id: 'ecommerce', name: 'E-commerce' },
      { id: 'projects', name: 'Projetos' },
      { id: 'contact', name: 'Contact' }
    ];

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);

          const sectionElements = sections.map(section =>
            document.getElementById(section.id)
          );

          let currentSection = 0;
          let maxVisibleArea = 0;

          sectionElements.forEach((element, index) => {
            if (element) {
              const rect = element.getBoundingClientRect();
              const headerHeight = window.innerWidth < 768 ? 64 : 80;
              const viewportHeight = window.innerHeight;

              // Calcular área visível da seção
              const visibleTop = Math.max(0, rect.top + headerHeight);
              const visibleBottom = Math.min(viewportHeight, rect.bottom);
              const visibleArea = Math.max(0, visibleBottom - visibleTop);

              // Se mais da metade da seção estiver visível, considerar ativa
              if (visibleArea > maxVisibleArea && visibleArea > rect.height * 0.3) {
                maxVisibleArea = visibleArea;
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

    // Animações GSAP
    const headerContent = document.querySelector('.header-content');
    const headerBackground = document.querySelector('.header-background');
    const headerLogo = document.querySelector('.header-logo');
    const navLinks = document.querySelectorAll('.nav-link');

    // Animação de entrada
    gsap.fromTo(
      headerContent,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    );

    // Animação do logo
    gsap.fromTo(
      headerLogo,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, delay: 0.2, ease: 'back.out(1.7)' }
    );

    // Animação dos links de navegação
    gsap.fromTo(
      navLinks,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.4,
        ease: 'power2.out'
      }
    );

    // Animação baseada no scroll
    gsap.to(headerBackground, {
      backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 0.8)',
      backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
      borderBottom: isScrolled ? '1px solid rgba(212, 175, 55, 0.3)' : '1px solid transparent',
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.to(headerLogo, {
      scale: isScrolled ? 0.9 : 1,
      duration: 0.3,
      ease: 'power2.out'
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  // Efeito para controlar scroll, overlay e eventos quando menu está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.classList.add('mobile-menu-open');

      // Handler para fechar menu ao pressionar ESC
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closeMobileMenu();
        }
      };

      // Handler para fechar menu ao clicar fora
      const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuButton = document.querySelector('[aria-expanded]');

        if (!mobileMenu?.contains(target) && !menuButton?.contains(target)) {
          closeMobileMenu();
        }
      };

      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('click', handleOutsideClick);

      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
        document.removeEventListener('click', handleOutsideClick);
      };
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.classList.remove('mobile-menu-open');
    }

    // Cleanup
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  // Função para toggle do menu mobile
  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const mobileMenu = document.querySelector('.mobile-menu');
    const menuItems = document.querySelectorAll('.mobile-menu-item');


    if (mobileMenu) {
      if (newState) {
        // Abrir menu
        gsap.set(mobileMenu, { display: 'block' });
        gsap.fromTo(mobileMenu,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
        );

        // Animação dos itens do menu
        gsap.fromTo(menuItems,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.1,
            delay: 0.1,
            ease: 'power2.out'
          }
        );

        // O ícone do hamburguer será animado automaticamente pelas classes CSS
        // quando o estado isMobileMenuOpen mudar
      } else {
        // Fechar menu
        gsap.to(menuItems, {
          y: -20,
          opacity: 0,
          duration: 0.2,
          stagger: 0.05,
          ease: 'power2.in'
        });

        gsap.to(mobileMenu, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          delay: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            gsap.set(mobileMenu, { display: 'none' });
          }
        });

        // O ícone do hamburguer será resetado automaticamente pelas classes CSS
        // quando o estado isMobileMenuOpen mudar para false
      }
    }
  };

  // Função para navegar para uma seção (usada no mobile)
  const navigateToSection = (sectionId: string) => {
    // Fechar menu imediatamente
    setIsMobileMenuOpen(false);

    // Liberar scroll imediatamente
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.classList.remove('mobile-menu-open');

    // Esconder menu imediatamente
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
      gsap.set(mobileMenu, { display: 'none' });
    }

    // O ícone do hamburguer será resetado automaticamente pelas classes CSS
    // quando o estado isMobileMenuOpen mudar para false

    // Scroll suave para a seção
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = window.innerWidth < 768 ? 64 : 80;
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 150); // Delay para garantir que o DOM seja atualizado e menu esteja fechado
  };

  // Função para fechar menu mobile ao clicar em um link
  const closeMobileMenu = () => {
    if (!isMobileMenuOpen) return;

    setIsMobileMenuOpen(false);

    const mobileMenu = document.querySelector('.mobile-menu');
    const menuItems = document.querySelectorAll('.mobile-menu-item');


    if (mobileMenu) {
      // Animação de saída dos itens
      gsap.to(menuItems, {
        y: -20,
        opacity: 0,
        duration: 0.2,
        stagger: 0.05,
        ease: 'power2.in'
      });

      // Animação de saída do menu
      gsap.to(mobileMenu, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        delay: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(mobileMenu, { display: 'none' });
          // Limpar overlay
          document.body.classList.remove('mobile-menu-open');
        }
      });

      // O ícone do hamburguer será resetado automaticamente pelas classes CSS
      // quando o estado isMobileMenuOpen mudar para false
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-content">
      <div className="header-background absolute inset-0 bg-background/80 backdrop-blur-md border-b border-primary/20"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="header-logo flex items-center space-x-2">
            <div className="w-8 h-8 lg:w-14 lg:h-14  rounded-lg flex items-center justify-center">
              <Link title='Simks' href="/">
                    <Image src="/logo.png" alt="Simks" className='brightness-0 invert' width={80} height={80} />
              </Link>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="#home" className="nav-link text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-sm lg:text-base">
              Home
            </a>
            <a href="#about" className="nav-link text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-sm lg:text-base">
              Sobre
            </a>
            <a href="#technologies" className="nav-link text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-sm lg:text-base">
              Tecnologias
            </a>
            <a href="#ecommerce" className="nav-link text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-sm lg:text-base">
              E-commerce
            </a>
            <a href="#projects" className="nav-link text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-sm lg:text-base">
              Projetos
            </a>
            <a href="#resume" className="nav-link text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-sm lg:text-base">
              Currículo
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 relative"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="hamburger-icon w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`bg-current block transition-all duration-300 h-0.5 w-6 rounded-sm ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                  }`}
                />
                <span
                  className={`bg-current block transition-all duration-300 h-0.5 w-6 rounded-sm my-0.5 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`bg-current block transition-all duration-300 h-0.5 w-6 rounded-sm ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="mobile-menu overflow-hidden md:hidden" style={{ display: 'none' }}>
          <nav className="px-4 py-6 space-y-4 bg-card/95 backdrop-blur-md border-t border-border/20">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('home');
              }}
              className={`mobile-menu-item block nav-link transition-colors duration-200 font-medium py-3 px-4 rounded-lg ${
                activeSection === 0
                  ? 'text-primary bg-primary/10 border-l-4 border-primary'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Home</span>
                {activeSection === 0 && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                )}
              </div>
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('about');
              }}
              className={`mobile-menu-item block nav-link transition-colors duration-200 font-medium py-3 px-4 rounded-lg ${
                activeSection === 1
                  ? 'text-primary bg-primary/10 border-l-4 border-primary'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Sobre</span>
                {activeSection === 1 && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                )}
              </div>
            </a>
            <a
              href="#technologies"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('technologies');
              }}
              className={`mobile-menu-item block nav-link transition-colors duration-200 font-medium py-3 px-4 rounded-lg ${
                activeSection === 2
                  ? 'text-primary bg-primary/10 border-l-4 border-primary'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Tecnologias</span>
                {activeSection === 2 && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                )}
              </div>
            </a>
            <a
              href="#ecommerce"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('ecommerce');
              }}
              className={`mobile-menu-item block nav-link transition-colors duration-200 font-medium py-3 px-4 rounded-lg ${
                activeSection === 3
                  ? 'text-primary bg-primary/10 border-l-4 border-primary'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>E-commerce</span>
                {activeSection === 3 && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                )}
              </div>
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('projects');
              }}
              className={`mobile-menu-item block nav-link transition-colors duration-200 font-medium py-3 px-4 rounded-lg ${
                activeSection === 4
                  ? 'text-primary bg-primary/10 border-l-4 border-primary'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Projetos</span>
                {activeSection === 4 && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                )}
              </div>
            </a>
            <a
              href="#resume"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('resume');
              }}
              className={`mobile-menu-item block nav-link transition-colors duration-200 font-medium py-3 px-4 rounded-lg ${
                activeSection === 5
                  ? 'text-primary bg-primary/10 border-l-4 border-primary'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Currículo</span>
                {activeSection === 5 && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                )}
              </div>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
