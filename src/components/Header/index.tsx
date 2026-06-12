'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from 'motion/react';
import { scrollToId } from '@/lib/scroll';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Sobre', href: '#about' },
  { label: 'Stack', href: '#technologies' },
  { label: 'E-commerce', href: '#ecommerce' },
  { label: 'Projetos', href: '#projects' },
];

// Ordem no documento — usada pelo scroll-spy
const SECTION_IDS = ['home', 'about', 'technologies', 'ecommerce', 'projects', 'contact'];

export const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  // Esconde ao descer, revela ao subir + detecta a seção ativa
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 120 && !isMobileMenuOpen);
    setScrolled(y > 40);

    // Scroll-spy: a última seção cujo topo cruzou a linha dos 40% da viewport.
    // Lê o DOM ao vivo, então funciona mesmo com seções montadas via dynamic().
    const line = window.innerHeight * 0.4;
    let current = 'home';
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= line) current = id;
    }
    setActiveSection((prevSection) => (prevSection === current ? prevSection : current));
  });

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    if (isMobileMenuOpen) {
      window.__lenis?.stop();
    } else {
      window.__lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      window.__lenis?.start();
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    scrollToId(href.replace('#', ''));
  };

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled && !isMobileMenuOpen ? 'glass border-b' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="container-futuristic">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Wordmark */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-baseline gap-2 group"
            >
              <span className="font-display font-medium text-lg uppercase tracking-tight text-foreground">
                Kelven Souza
              </span>
              <span className="mono-label hidden sm:inline">©{new Date().getFullYear()}</span>
            </a>

            {/* Navegação desktop */}
            <div className="hidden md:flex items-center gap-8">
              {[...navLinks, { label: 'Contato', href: '#contact' }].map((link) => {
                const id = link.href.replace('#', '');
                const isActive = activeSection === id;
                const isContact = id === 'contact';
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative font-mono text-[0.6875rem] tracking-[0.18em] uppercase transition-colors duration-200 ${
                      isContact
                        ? 'text-accent'
                        : isActive
                          ? 'text-foreground'
                          : 'text-foreground-muted hover:text-foreground'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1.5 left-0 right-0 h-px bg-accent"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Botão menu mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden font-mono text-[0.6875rem] tracking-[0.18em] uppercase text-foreground"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? 'Fechar' : 'Menu'}
            </button>
          </div>
        </nav>

        {/* Progresso de leitura — hairline accent */}
        <motion.div
          style={{ scaleX: progress }}
          className="absolute bottom-0 left-0 right-0 h-px origin-left bg-accent"
          aria-hidden="true"
        />
      </motion.header>

      {/* Menu mobile — overlay completo com links grandes */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 md:hidden flex flex-col justify-end pb-16"
            style={{ background: 'var(--color-background)' }}
          >
            <nav className="container-futuristic space-y-1">
              {[{ label: 'Home', href: '#home' }, ...navLinks, { label: 'Contato', href: '#contact' }].map(
                (link, index) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.25 + index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        aria-current={isActive ? 'true' : undefined}
                        className="flex items-baseline gap-4 py-1 group"
                      >
                        <span className={`mono-label ${isActive ? '!text-accent' : ''}`}>
                          0{index + 1}
                        </span>
                        <span
                          className={`font-display font-medium uppercase text-[clamp(2.5rem,10vw,4rem)] leading-[1.05] transition-colors group-hover:text-accent ${
                            isActive ? 'text-accent' : 'text-foreground'
                          }`}
                        >
                          {link.label}
                        </span>
                      </a>
                    </motion.div>
                  );
                }
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="pt-8 flex items-center justify-between"
              >
                <span className="mono-label">Bahia, BR</span>
                <span className="mono-label flex items-center gap-2">
                  <span className="status-dot" />
                  Disponível
                </span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
