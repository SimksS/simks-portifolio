'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView, AnimatePresence } from 'motion/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Platform {
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
  certified: boolean;
  stats: {
    projects: string;
    satisfaction: string;
    efficiency: string;
  };
}

const platforms: Platform[] = [
  {
    name: 'VTEX',
    description: 'Plataforma líder de e-commerce com alta performance e escalabilidade empresarial.',
    icon: (
      <Image src="/VTEX_Logo.svg" alt="Logo VTEX" width={40} height={40} className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
    ),
    features: ['Catálogo Omnichannel', 'Checkout Nativo', 'Integrações B2B/B2C', 'SEO Otimizado'],
    color: 'from-white/10 to-white/5',
    certified: false,
    stats: { projects: '15+', satisfaction: '95%', efficiency: '+40%' },
  },
  {
    name: 'Wake',
    description: 'Arquitetura headless flexível para criar experiências de compra únicas.',
    icon: (
      <Image src="/wake-commerce-branco.svg" alt="Logo Wake" width={60} height={60} className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
    ),
    features: ['Headless CMS', 'API-first', 'Personalização', 'Performance'],
    color: 'from-black/40 to-gray-900/50',
    certified: true,
    stats: { projects: '10+', satisfaction: '98%', efficiency: '+50%' },
  },
  {
    name: 'Shopify',
    description: 'Plataforma com temas customizáveis para experiências de e-commerce flexíveis.',
    icon: (
      <Image src="/shopify-logo.png" alt="Logo Shopify" width={40} height={40} className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
    ),
    features: ['Temas Customizáveis', 'Performance', 'Integrações', 'Flexibilidade'],
    color: 'from-white/8 to-white/3',
    certified: false,
    stats: { projects: '8+', satisfaction: '92%', efficiency: '+35%' },
  },
];

// Estatísticas gerais
const generalStats = [
  { value: '30+', label: 'Projetos lançados', icon: '🚀' },
  { value: 'R$10M+', label: 'GMV impactado', icon: '💰' },
  { value: '4.9/5', label: 'Satisfação de clientes', icon: '⭐' },
  { value: '+20%', label: 'Melhoria média de performance', icon: '⚡' },
];

// Particle Canvas Component
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const particles = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initParticles = () => {
      particles.current = Array.from({ length: 30 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particles.current.forEach((p1, i) => {
        particles.current.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
    />
  );
};

// Platform Card Component
const PlatformCard = ({ platform, index }: { platform: Platform; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState<'features' | 'stats'>('features');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`card-futuristic h-full overflow-hidden relative ${isHovered ? 'border-neon-cyan/40' : ''}`}
      >
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-50`} />

        {/* Animated border glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 border-2 border-neon-cyan/20 rounded-xl"
          style={{
            boxShadow: isHovered ? 'inset 0 0 30px rgba(0, 255, 255, 0.1)' : 'none',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                index === 1 ? 'bg-gradient-to-br from-neon-cyan/30 to-neon-purple/30' : 'bg-gradient-to-br from-white/10 to-transparent'
              } border border-white/10`}
            >
              {platform.icon}
            </motion.div>

            {platform.certified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
                className="badge-cyber badge-cyber-glow"
              >
                ★ Certified
              </motion.div>
            )}
          </div>

          {/* Title */}
          <motion.h3
            className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
              isHovered ? 'text-neon-cyan' : 'text-foreground'
            }`}
          >
            {platform.name}
          </motion.h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            {platform.description}
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            {(['features', 'stats'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs rounded-full transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'features' ? 'Recursos' : 'Estatísticas'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'features' ? (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2"
              >
                {platform.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      className="w-1.5 h-1.5 bg-neon-cyan rounded-full"
                    />
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-3 gap-2"
              >
                {Object.entries(platform.stats).map(([key, value], i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center p-2 rounded-lg bg-white/5"
                  >
                    <div className="text-neon-cyan font-bold text-sm">{value}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">
                      {key === 'projects' ? 'Projs' : key === 'satisfaction' ? 'Sat' : 'Efic'}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <motion.a
            href="#projects"
            whileHover={{ x: 4 }}
            className="flex items-center gap-2 mt-6 pt-4 border-t border-border/50 text-sm text-neon-cyan/70 hover:text-neon-cyan transition-colors group/link"
          >
            Ver Projetos
            <svg
              className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const EcommerceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  // Stats animation
  const Counter = ({ value, suffix = '' }: { value: string; suffix?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
      if (!isInView || !ref.current) return;

      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
      const isDecimal = value.includes('.');
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easing = 1 - Math.pow(1 - progress, 3);
        const current = numericValue * easing;

        if (ref.current) {
          if (isDecimal) {
            ref.current.textContent = current.toFixed(1);
          } else {
            ref.current.textContent = Math.floor(current).toString();
          }
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [isInView, value]);

    return (
      <span ref={ref} className="text-neon-cyan font-bold">
        0
      </span>
    );
  };

  return (
    <section ref={sectionRef} id="ecommerce" className="section-spacing relative overflow-hidden">
      {/* Particle Canvas Background */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleCanvas />
      </div>

      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-[150px] -translate-x-1/2"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[120px] translate-x-1/4"
        />
      </div>

      <div ref={containerRef} className="container-futuristic relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <motion.div
              animate={{ rotate: 90 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-1 h-8 bg-gradient-to-b from-neon-cyan to-transparent"
            />
            <span className="text-neon-cyan font-medium text-sm tracking-wider uppercase">Especialização</span>
            <motion.div
              animate={{ rotate: -90 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-1 h-8 bg-gradient-to-b from-neon-cyan to-transparent"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Plataformas de{' '}
            <span className="gradient-text-animated">E-commerce</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Especialista nas principais plataformas do mercado, entregando soluções
            que convertem visitantes em clientes.
          </motion.p>
        </div>

        {/* Platform Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {platforms.map((platform, index) => (
            <PlatformCard key={platform.name} platform={platform} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 border border-neon-cyan/10"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {generalStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                onHoverStart={() => setHoveredStat(index)}
                onHoverEnd={() => setHoveredStat(null)}
                className="text-center relative"
              >
                <motion.div
                  animate={hoveredStat === index ? { scale: 1.1 } : { scale: 1 }}
                  className="mb-2 text-3xl"
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-foreground mb-1"
                >
                  <Counter value={stat.value} />
                  {stat.value.replace(/[0-9.]/g, '')}
                </motion.div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>

                {/* Hover effect */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={hoveredStat === index ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  className="absolute inset-0 border border-neon-cyan/30 rounded-xl pointer-events-none"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EcommerceSection;
