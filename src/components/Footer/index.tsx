'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/SimksS',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/kelvensouza',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:kelven.souza00@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
  },
];

const quickLinks = [
  { label: 'Início', href: '#home' },
  { label: 'Sobre', href: '#about' },
  { label: 'Tecnologias', href: '#technologies' },
  { label: 'E-commerce', href: '#ecommerce' },
  { label: 'Projetos', href: '#projects' },
];

const services = [
  'E-commerce',
  'Aplicações Web',
  'APIs',
  'Integrações',
  'Otimização',
];

const ScrollToTop = () => {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollY / docHeight) * 100;

      setProgress(scrollProgress);
      setShow(scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={scrollToTop}
      className="scroll-top-cyber group"
      aria-label="Voltar ao topo"
    >
      {/* Progress ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="rgba(0, 255, 255, 0.1)"
          strokeWidth="2"
        />
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="#00ffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 20}`}
          strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
          className="transition-all duration-300"
        />
      </svg>
      <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </motion.button>
  );
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="relative border-t border-border/50 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-neon-purple/5 rounded-full blur-[120px]" />
      </div>

      <div className="container-futuristic relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-1 space-y-6">
              <motion.a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-3 group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-neon-cyan blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan font-bold overflow-hidden group-hover:border-neon-cyan/60 transition-all">
                    <span className="relative">K</span>
                  </div>
                </div>
                <span className="text-foreground font-semibold text-lg group-hover:text-neon-cyan transition-colors">
                  Kelven Souza
                </span>
              </motion.a>

              <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                Desenvolvedor Full-Stack especializado em e-commerce e aplicações web modernas.
                Transformando ideias em realidade digital.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target={social.name !== 'Email' ? '_blank' : undefined}
                    rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan/30 border border-transparent transition-all duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-5">
              <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider">Navegação</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group flex items-center gap-2 text-muted-foreground hover:text-neon-cyan transition-colors text-sm"
                    >
                      <span className="w-0 h-[1px] bg-neon-cyan transition-all duration-300 group-hover:w-4" />
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-5">
              <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider">Serviços</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="text-muted-foreground text-sm flex items-center gap-2">
                      <span className="w-1 h-1 bg-neon-cyan rounded-full" />
                      {service}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact / CTA */}
            <div className="space-y-5">
              <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider">Vamos conversar</h4>
              <p className="text-muted-foreground text-sm">
                Tem um projeto em mente? Entre em contato e vamos transformar sua ideia em realidade.
              </p>
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan hover:text-background transition-all duration-300 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                Iniciar projeto
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-muted-foreground text-sm text-center md:text-left">
              &copy; {currentYear} Kelven Souza. Todos os direitos reservados.
            </p>

            {/* Tech stack tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {['Next.js', 'React', 'TypeScript', 'Tailwind'].map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

          
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        <ScrollToTop />
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
