'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'motion/react';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Sobre', href: '#about' },
  { label: 'Tecnologias', href: '#technologies' },
  { label: 'E-commerce', href: '#ecommerce' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Contato', href: '#contact' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }

      // Detectar seção ativa
      const sections = navLinks.map(link => link.href.replace('#', ''));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });

      if (current) {
        setActiveSection(current);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo('.mobile-menu',
        { opacity: 0, scale: 0.95, y: -10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo('.mobile-menu-item',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, delay: 0.1, ease: 'power2.out' }
      );
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (!element) return;

    const headerHeight = 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass border-b border-border/50'
            : 'bg-transparent'
        }`}
      >
        {/* Decorative top line */}
        {isScrolled && (
          <motion.div
            layoutId="headerLine"
            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"
          />
        )}

        <nav className="container-futuristic">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan to-neon-blue blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                <div className="relative w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan font-bold text-xl overflow-hidden group-hover:border-neon-cyan/60 transition-all duration-300">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">K</span>
                </div>
              </div>
              <span className="hidden sm:block text-foreground font-semibold text-lg group-hover:text-neon-cyan transition-colors duration-300">
                Kelven Souza
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 relative">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-neon-cyan'
                      : 'text-foreground-muted hover:text-foreground'
                  }`}
                >
                  {/* Background hover effect */}
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="navHover"
                      className="absolute inset-0 bg-neon-cyan/10 rounded-lg"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
                    />
                  )}

                  {/* Active indicator */}
                  {activeSection === link.href.replace('#', '') && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon-cyan rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}

                  <span className="relative z-10">{link.label}</span>
                </a>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden md:inline-flex btn-cyber text-sm font-medium"
            >
              <span className="relative z-10 flex items-center gap-2">
                Fale Comigo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
            </a>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-foreground hover:text-neon-cyan transition-colors"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-6 relative flex flex-col justify-center items-center">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 0 : -4,
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute block w-5 h-0.5 bg-current rounded-full"
                />
                <motion.span
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute block w-5 h-0.5 bg-current rounded-full"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? 0 : 4,
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute block w-5 h-0.5 bg-current rounded-full"
                />
              </div>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed top-[72px] left-0 right-0 z-40 md:hidden ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="glass border-b border-border/50 mx-4 rounded-2xl overflow-hidden">
          <nav className="p-4 space-y-1">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`mobile-menu-item flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeSection === link.href.replace('#', '')
                    ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30'
                    : 'text-foreground hover:bg-foreground/5'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span>{link.label}</span>
                {activeSection === link.href.replace('#', '') && (
                  <motion.span
                    layoutId="mobileActiveIndicator"
                    className="w-2 h-2 bg-neon-cyan rounded-full shadow-[0_0_10px_currentColor]"
                  />
                )}
              </a>
            ))}
            <div className="pt-3 mt-3 border-t border-border/50">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="mobile-menu-item btn-cyber-primary w-full text-center justify-center"
              >
                Fale Comigo
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
