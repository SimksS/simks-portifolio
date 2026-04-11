'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ProjectImage } from '../ProjectImage';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  title: string;
  description: string;
  technologies: { name: string; description: string; link: string }[];
  status: 'Concluído' | 'Em andamento';
  link: string;
  category: string;
}

const projects: Project[] = [
  {
    title: 'Elle',
    description: 'A loja virtual da ELLE Brasil é o e-commerce oficial da revista de moda. Nela, a marca oferece edições impressas, especiais e produtos colecionáveis.',
    technologies: [
      { name: 'Wicomm', description: 'Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce completa', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
      { name: 'Node.js', description: 'Backend escalável', link: 'https://nodejs.org' },
    ],
    status: 'Concluído',
    link: 'https://loja.elle.com.br',
    category: 'E-commerce',
  },
  {
    title: 'Dpaschoal',
    description: 'Uma das maiores redes de serviços automotivos do Brasil desde 1949. Especializada em venda de pneus, peças e serviços.',
    technologies: [
      { name: 'Wicomm', description: 'Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
      { name: 'Node.js', description: 'Backend escalável', link: 'https://nodejs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.dpaschoal.com.br',
    category: 'E-commerce',
  },
  {
    title: 'Cris Barros',
    description: 'Marca de moda de luxo conhecida por sua estética sofisticada. Grife com peças de tecidos nobres e acabamentos impecáveis.',
    technologies: [
      { name: 'Wicomm', description: 'Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.crisbarros.com',
    category: 'E-commerce',
  },
  {
    title: 'Canal Concept',
    description: 'Loja online de moda feminina focada em autenticidade e bem-estar. Peças que acompanham os movimentos do corpo.',
    technologies: [
      { name: 'Wicomm', description: 'Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.', link: 'https://www.wicomm.com.br/' },
      { name: 'Wake', description: 'Headless e-commerce', link: 'https://wake.tech' },
    ],
    status: 'Concluído',
    link: 'https://www.canal.com.br',
    category: 'E-commerce',
  },
  {
    title: 'Clínica Fares',
    description: 'Plataforma de agendamento de saúde integrada, que conecta pacientes a mais de 45 especialidades médicas, exames e cirurgias com foco em agilidade, acessibilidade e cuidado humanizado.',
    technologies: [
      { name: 'Wicomm', description: 'Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.', link: 'https://www.wicomm.com.br/' },
      { name: 'Wake', description: 'Headless e-commerce', link: 'https://wake.tech' },
    ],
    status: 'Concluído',
    link: 'https://www.clinicafares.com.br/',
    category: 'E-commerce',
  },
  {
    title: 'Orit',
    description: 'E-commerce líder no mercado secondhand de luxo, especializado na curadoria, compra e venda de joias e relógios de marcas icônicas, garantindo autenticidade e circularidade no setor de alta gama.',
    technologies: [
      { name: 'Wicomm', description: 'Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.', link: 'https://www.wicomm.com.br/' },
      { name: 'Wake', description: 'Headless e-commerce', link: 'https://wake.tech' },
    ],
    status: 'Concluído',
    link: 'https://www.orit.com.br/',
    category: 'E-commerce',
  },
  {
    title: 'Prime Guns',
    description: 'E-commerce especializado em tiro esportivo e lifestyle outdoor, oferecendo o maior catálogo de armas e acessórios do Brasil com foco em segurança, legalidade e alto desempenho.',
    technologies: [
      { name: 'Wicomm', description: 'Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
      { name: 'Node.js', description: 'Backend escalável', link: 'https://nodejs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.primeguns.com.br',
    category: 'E-commerce',
  },
  {
    title: 'Le Blog Store',
    description: 'E-commerce de moda feminina contemporânea com foco em versatilidade e sofisticação, unindo tendências globais a um design moderno para mulheres de mindstyle jovem e autêntico.',
    technologies: [
      { name: 'Wicomm', description: 'Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
      { name: 'Node.js', description: 'Backend escalável', link: 'https://nodejs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.leblogstore.com.br',
    category: 'E-commerce',
  },
  {
    title: 'GoldKo',
    description: 'E-commerce de chocolates e doces premium que reinventa o prazer do consumo sem culpa, oferecendo produtos com sabor surreal, zero adição de açúcares e foco em inovação e bem-estar.',
    technologies: [
      { name: 'Wicomm', description: 'Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
      { name: 'Node.js', description: 'Backend escalável', link: 'https://nodejs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.goldko.com.br',
    category: 'E-commerce',
  },
  {
    title: 'GA.MA Italy',
    description: 'E-commerce de referência global em tecnologia para beleza e cuidados pessoais, focado em ferramentas profissionais de alta performance como secadores, pranchas e modeladores.',
    technologies: [
      { name: 'Wicomm', description: 'Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
      { name: 'Node.js', description: 'Backend escalável', link: 'https://nodejs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.gamaitaly.com.br',
    category: 'E-commerce',
  },
  {
    title: 'Toymania',
    description: 'Um dos e-commerces pioneiros do setor de brinquedos no Brasil, oferecendo uma vasta curadoria multimarca focada no desenvolvimento infantil, segurança e na experiência lúdica para todas as idades.',
    technologies: [
      { name: 'Wicomm', description: 'Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.toymania.com.br',
    category: 'E-commerce',
  },
  {
    title: 'Amakha Paris',
    description: 'E-commerce de cosméticos e perfumaria de alta qualidade, focado em essências internacionais e alta fixação, integrando tecnologia e empreendedorismo para democratizar o acesso à beleza e ao bem-estar.',
    technologies: [
      { name: 'Wicomm', description: 'Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.amakhaparis.com.br',
    category: 'E-commerce',
  },
  {
    title: 'Farm Rio (Internacional)',
    description: 'E-commerce internacional da marca carioca que leva o \'borogodó\' brasileiro para o mercado latino-americano, unindo estampas vibrantes, design tropical e uma experiência de moda focada em sustentabilidade e alegria.',
    technologies: [
      { name: 'Wicomm', description: 'Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.farmrio.cl/',
    category: 'E-commerce',
  },
  {
    title: 'CSP Forge',
    description: 'Ferramenta para gerar Content Security Policies personalizadas, com predefinições inteligentes e interface intuitiva.',
    technologies: [
      { name: 'Next.js', description: 'Full-stack framework', link: 'https://nextjs.org' },
    ],
    status: 'Concluído',
    link: 'https://cspforge.simks.com.br',
    category: 'Pessoal',
  },
  {
    title: 'Wake Runner (NPM Library)',
    description: 'Biblioteca de automação desenvolvida para otimizar o fluxo de trabalho na plataforma Wake Commerce, permitindo a execução simplificada de comandos de desenvolvimento e acelerando a produtividade de engenheiros de software.',
    technologies: [
      { name: 'Node.js', description: 'Backend escalável', link: 'https://nodejs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.npmjs.com/package/wake-runner',
    category: 'Pessoal',
  },
];

const categories = ['Todos', 'E-commerce', 'Pessoal'];

// Project Card with 3D Tilt Effect - CORRIGIDO: sem overlay de luz no hover
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setTilt({ x: -y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      className="group relative"
    >
      <div className={`card-futuristic h-full flex flex-col transition-all duration-500 ${isHovered ? 'border-neon-cyan/40' : ''}`}>
        {/* Image Container - SEM overlay de luz/luminescência no hover */}
        <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
          {/* Apenas o gradiente escuro do card para legibilidade - SEM efeito de luz */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10" />

          {/* Project Image - sem overlay de brilho/gradiente colorido no hover */}
          <ProjectImage
            url={project.link}
            alt={project.title}
            fill
            className="transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Status Badge - posicionado no canto, não interfere na imagem */}
          <div className="absolute top-4 right-4 z-20">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
              project.status === 'Concluído'
                ? 'bg-neon-green/10 text-neon-green border-neon-green/30'
                : 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30'
            }`}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-xl font-bold text-foreground group-hover:text-neon-cyan transition-colors mb-2">
            {project.title}
          </h3>

          {/* Category */}
          <span className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">
            {project.category}
          </span>

          {/* Description */}
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <motion.a
                key={tech.name}
                href={tech.link}
                title={tech.description}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                className="tag-cyber text-xs hover:bg-neon-cyan/10 hover:text-neon-cyan hover:border-neon-cyan/30"
              >
                {tech.name}
              </motion.a>
            ))}
            {project.technologies.length > 3 && (
              <span className="tag-cyber text-xs">+{project.technologies.length - 3}</span>
            )}
          </div>

          {/* CTA */}
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            className="flex items-center gap-2 mt-auto pt-4 border-t border-border/50 text-sm text-muted-foreground group-hover:text-neon-cyan transition-colors"
          >
            Ver projeto
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.a>
        </div>

        {/* Animated border glow - apenas na borda, não no conteúdo interno */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-xl pointer-events-none border border-neon-cyan/20"
          />
        )}
      </div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [isInView, setIsInView] = useState(false);

  const filteredProjects = activeFilter === 'Todos'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section-spacing relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-0 left-1/3 w-96 h-96 bg-neon-purple/10 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-cyan/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container-futuristic relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <motion.span
              animate={{ width: [20, 40, 20] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-[2px] bg-gradient-to-r from-transparent to-neon-cyan"
            />
            <span className="text-neon-cyan font-medium text-sm tracking-wider uppercase">Portfólio</span>
            <motion.span
              animate={{ width: [20, 40, 20] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-[2px] bg-gradient-to-l from-transparent to-neon-cyan"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Projetos em{' '}
            <span className="gradient-text-animated">Destaque</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Uma seleção dos meus trabalhos mais recentes em e-commerce e desenvolvimento.
          </motion.p>
        </div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-3 mb-12 flex-wrap"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveFilter(category)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                activeFilter === category
                  ? 'text-background'
                  : 'text-muted-foreground hover:text-foreground border border-border hover:border-neon-cyan/30'
              }`}
            >
              {/* Active background */}
              {activeFilter === category && (
                <motion.div
                  layoutId="filterBg"
                  className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-blue"
                  style={{ borderRadius: 9999 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {category}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeFilter === category ? 'bg-background/20' : 'bg-muted'
                }`}>
                  {category === 'Todos' ? projects.length : projects.filter(p => p.category === category).length}
                </span>
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-muted-foreground">Nenhum projeto encontrado nesta categoria.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
