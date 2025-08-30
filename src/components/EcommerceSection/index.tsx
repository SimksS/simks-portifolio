'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

const EcommerceSection = () => {
  const platforms = [
    {
      name: 'VTEX',
      description: 'Performance e escalabilidade para grandes operações.',
      features: [
        'Personalização de loja',
        'Integração de pagamentos',
        'Otimização de performance'
      ]
    },
    {
      name: 'Wake',
      description: 'Flexibilidade com arquitetura headless para múltiplos canais.',
      features: [
        'Abordagem API-first',
        'Venda multicanal',
        'Análises avançadas'
      ]
    },
    {
      name: 'Shopify',
      description: 'Agilidade e otimização para qualquer tamanho de negócio.',
      features: [
        'Configuração fácil da loja',
        'Ecossistema de aplicativos',
        'Otimização para dispositivos móveis'
      ]
    }
  ];

  useEffect(() => {
    // Animação do efeito de brilho nas bordas dos cards
    const cards = document.querySelectorAll('.ecommerce-card');
    
    cards.forEach((card, index) => {
      // Criar elemento de brilho
      const glowElement = document.createElement('div');
      glowElement.className = 'glow-border';
      card.appendChild(glowElement);

      // Animação do brilho percorrendo a borda
      gsap.set(glowElement, { 
        opacity: 0.3,
        background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.8), transparent)',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '3px',
        borderRadius: '8px',
        zIndex: 1,
        boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
      });

      // Animação contínua do brilho
      gsap.to(glowElement, {
        left: '100%',
        duration: 3,
        delay: index * 0.8,
        repeat: -1,
        ease: 'none',
        onRepeat: () => {
          gsap.set(glowElement, { left: '-100%' });
        }
      });

      // Efeito de hover para intensificar o brilho
      card.addEventListener('mouseenter', () => {
        gsap.to(glowElement, {
          opacity: 1,
          scale: 1.1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(glowElement, {
          opacity: 0.3,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Cleanup
    return () => {
      cards.forEach(card => {
        const glowElement = card.querySelector('.glow-border');
        if (glowElement) {
          glowElement.remove();
        }
      });
    };
  }, []);

  return (
    <section id="ecommerce" className="fullscreen-section bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="section-title text-5xl lg:text-6xl font-bold text-foreground mb-6">
            E-commerce Platforms
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="ecommerce-card card-hover bg-card p-10 rounded-2xl border-2 border-primary/30 hover:border-primary/60 transition-all duration-300 cursor-pointer group hover-lift relative overflow-hidden"
            >
              <div className="space-y-8">
              

                {/* Platform Info */}
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {platform.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg group-hover:text-foreground transition-colors duration-300">
                    {platform.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                  {platform.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-base text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span className="w-3 h-3 bg-primary rounded-full mr-4 group-hover:scale-125 transition-transform duration-300"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcommerceSection;
