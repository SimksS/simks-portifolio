'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView } from 'motion/react';

// Registrar plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
  icon: React.ReactNode;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Front-end',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 92 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Vue.js', level: 40 },
    ],
  },
  {
    title: 'Back-end',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 01-2 2v4a2 2 0 012 2h14a2 2 0 012-2v-4a2 2 0 01-2-2m-2-4h.01M7 16h.01" />
      </svg>
    ),
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'GraphQL', level: 82 },
      { name: 'REST APIs', level: 95 },
    ],
  },
  {
    title: 'E-commerce',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    skills: [
      { name: 'VTEX', level: 92 },
      { name: 'Wake', level: 88 },
      { name: 'Shopify', level: 55 },
      { name: 'Uappi', level: 40 },
    ],
  },
];

// Skill bar component
const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true, margin: '-100px' });

  return (
    <div ref={barRef} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-foreground">{skill.name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="text-xs font-mono text-neon-cyan"
        >
          {isInView ? `${skill.level}%` : '0%'}
        </motion.span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full relative"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
        </motion.div>
      </div>
    </div>
  );
};

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Animação de entrada
      gsap.fromTo(
        '.about-image-container',
        { opacity: 0, x: -50, rotateY: -15 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.about-content',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.skill-category',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.skills-container',
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;

      const rect = imageRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / 50;
      const deltaY = (e.clientY - centerY) / 50;

      gsap.to(imageRef.current, {
        rotateY: deltaX,
        rotateX: -deltaY,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollToProjects = () => {
    const element = document.getElementById('projects');
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
    <section ref={sectionRef} id="about" className="section-spacing relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-neon-purple/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-futuristic relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Section */}
          <div ref={imageRef} className="about-image-container order-2 lg:order-1 perspective-1000">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative max-w-md mx-auto lg:mr-auto lg:ml-0"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Background glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-neon-cyan/20 via-neon-blue/10 to-neon-purple/20 rounded-3xl blur-2xl opacity-50" />

              {/* Image container */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-neon-cyan/30 group">
                {/* Container animation */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 animate-infinite-zoom"
                >
                  <Image
                    src="/profile-photo.jpeg"
                    alt="Kelven Souza - Desenvolvedor Full-Stack"
                    fill
                    className="object-cover scale-[1.4]"
                    sizes="(max-width: 1024px) 100vw, 400px"
                    priority
                  />
                </motion.div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.5)] pointer-events-none" />

                {/* Scanline effect */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.1)_50%)] bg-[length:100%_4px]" />
                </div>

                {/* Corner decorations */}
                <div className="corner-decoration corner-decoration-tl" />
                <div className="corner-decoration corner-decoration-tr" />
                <div className="corner-decoration corner-decoration-bl" />
                <div className="corner-decoration corner-decoration-br" />
              </div>

              {/* Experience Badge */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="absolute -bottom-4 -right-4 lg:-right-8 glass rounded-xl p-4 border border-neon-cyan/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 flex items-center justify-center border border-neon-cyan/30">
                    <span className="text-2xl font-bold text-neon-cyan drop-shadow-[0_0_10px_currentColor]">4+</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Anos de</div>
                    <div className="text-sm text-muted-foreground">Experiência</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 lg:-left-8 px-4 py-2 rounded-lg glass border border-neon-purple/30"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-neon-purple rounded-full animate-pulse" />
                  <span className="text-xs font-mono text-neon-purple">Tech Lead</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="about-content space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <span className="w-12 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple" />
                <span className="text-neon-cyan font-medium text-sm tracking-wider uppercase">Sobre Mim</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
              >
                Transformando ideias em{' '}
                <span className="gradient-text-animated">soluções digitais</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-muted-foreground leading-relaxed"
            >
              <p className="relative pl-4 border-l-2 border-neon-cyan/30">
                Sou Tech Lead e desenvolvedor full-stack com mais de 4 anos de experiência na área de TI.
                Atuo no planejamento, organização e execução de projetos, aplicando boas práticas como
                Clean Code e S.O.L.I.D. para criar código limpo, modular e de fácil manutenção.
              </p>
              <p className="relative pl-4 border-l-2 border-neon-purple/30">
                Atualmente lidero equipes de desenvolvimento na Wicomm, conduzindo mentorias e treinamentos
                além de desenvolver soluções de alto desempenho com React, Vue.js, Node.js e plataformas
                VTEX, Wake, Uappi e Shopify. Especialista em criar soluções que não apenas vendem, mas encantam.
              </p>
            </motion.div>

            {/* Skills Tabs */}
            <div className="skills-container space-y-6">
              {/* Tab buttons */}
              <div className="flex flex-wrap gap-2">
                {skillCategories.map((category, index) => (
                  <motion.button
                    key={category.title}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSkill(index)}
                    className={`skill-category flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeSkill === index
                        ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/40'
                        : 'bg-muted text-muted-foreground border border-transparent hover:border-neon-cyan/20'
                    }`}
                  >
                    <span className={activeSkill === index ? 'text-neon-cyan' : 'text-muted-foreground'}>
                      {category.icon}
                    </span>
                    {category.title}
                  </motion.button>
                ))}
              </div>

              {/* Skills display */}
              <motion.div
                key={activeSkill}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="card-futuristic space-y-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-neon-cyan">{skillCategories[activeSkill].icon}</span>
                  <h3 className="font-semibold text-foreground">{skillCategories[activeSkill].title}</h3>
                </div>
                <div className="space-y-4">
                  {skillCategories[activeSkill].skills.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleScrollToProjects}
                className="btn-cyber-primary group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Ver Projetos
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
