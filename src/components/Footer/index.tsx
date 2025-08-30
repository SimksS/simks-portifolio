'use client';

import Link from 'next/link';

const Footer = () => {
  const navigationLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Tecnologias', href: '#technologies' },
    { name: 'Portfólio', href: '#projects' }
  ];



  const socialLinks = [
    { name: 'GitHub', href: '#github', icon: '🐙' },
    { name: 'LinkedIn', href: '#linkedin', icon: '💼' },
    { name: 'X (Twitter)', href: '#twitter', icon: '🐦' }
  ];

  return (
    <footer className="bg-background border-t border-border/20 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border/20 pt-8">
          <p className="text-center text-muted-foreground text-base">
          ©{new Date().getFullYear()} Simks - Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
