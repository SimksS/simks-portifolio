"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ProjectImage } from "../ProjectImage";

interface Project {
  title: string;
  description: string;
  technologies: { name: string; description: string; link: string }[];
  status: "Concluído" | "Em andamento";
  link: string;
  category: string;
}

const projects: Project[] = [
  {
    title: "Elle",
    description:
      "A loja virtual da ELLE Brasil é o e-commerce oficial da revista de moda. Nela, a marca oferece edições impressas, especiais e produtos colecionáveis.",
    technologies: [
      {
        name: "Wicomm",
        description: "Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.",
        link: 'https://www.wicomm.com.br/',
      },
      {
        name: "VTEX",
        description: "Plataforma de e-commerce completa",
        link: "https://vtex.com",
      },
      {
        name: "React",
        description: "Interfaces modernas",
        link: "https://reactjs.org",
      },
      {
        name: "Node.js",
        description: "Backend escalável",
        link: "https://nodejs.org",
      },
    ],
    status: "Concluído",
    link: "https://loja.elle.com.br",
    category: "E-commerce",
  },
  {
    title: "Dpaschoal",
    description:
      "Uma das maiores redes de serviços automotivos do Brasil desde 1949. Especializada em venda de pneus, peças e serviços.",
    technologies: [
      {
        name: "Wicomm",
        description: "Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.",
        link: 'https://www.wicomm.com.br/',
      },
      {
        name: "VTEX",
        description: "Plataforma de e-commerce",
        link: "https://vtex.com",
      },
      {
        name: "React",
        description: "Interfaces modernas",
        link: "https://reactjs.org",
      },
      {
        name: "Node.js",
        description: "Backend escalável",
        link: "https://nodejs.org",
      },
    ],
    status: "Concluído",
    link: "https://www.dpaschoal.com.br",
    category: "E-commerce",
  },
  {
    title: "Cris Barros",
    description:
      "Marca de moda de luxo conhecida por sua estética sofisticada. Grife com peças de tecidos nobres e acabamentos impecáveis.",
    technologies: [
      {
        name: "Wicomm",
        description: "Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.",
        link: 'https://www.wicomm.com.br/',
      },
      {
        name: "VTEX",
        description: "Plataforma de e-commerce",
        link: "https://vtex.com",
      },
      {
        name: "React",
        description: "Interfaces modernas",
        link: "https://reactjs.org",
      },
    ],
    status: "Concluído",
    link: "https://www.crisbarros.com",
    category: "E-commerce",
  },
  {
    title: "Canal Concept",
    description:
      "Loja online de moda feminina focada em autenticidade e bem-estar. Peças que acompanham os movimentos do corpo.",
    technologies: [
      {
        name: "Wicomm",
        description: "Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.",
        link: 'https://www.wicomm.com.br/',
      },
      {
        name: "Wake",
        description: "Headless e-commerce",
        link: "https://wake.tech",
      },
    ],
    status: "Concluído",
    link: "https://www.canal.com.br",
    category: "E-commerce",
  },
  {
    title: "Clínica Fares",
    description:
      "Plataforma de agendamento de saúde integrada, que conecta pacientes a mais de 45 especialidades médicas, exames e cirurgias com foco em agilidade, acessibilidade e cuidado humanizado.",
    technologies: [
      {
        name: "Wicomm",
        description: "Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.",
        link: 'https://www.wicomm.com.br/',
      },
      {
        name: "Wake",
        description: "Headless e-commerce",
        link: "https://wake.tech",
      },
    ],
    status: "Concluído",
    link: "https://www.clinicafares.com.br/",
    category: "E-commerce",
  },
  {
    title: "Orit",
    description:
      "E-commerce líder no mercado secondhand de luxo, especializado na curadoria, compra e venda de joias e relógios de marcas icônicas, garantindo autenticidade e circularidade no setor de alta gama.",
    technologies: [
      {
        name: "Wicomm",
        description: "Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.",
        link: 'https://www.wicomm.com.br/',
      },
      {
        name: "Wake",
        description: "Headless e-commerce",
        link: "https://wake.tech",
      },
    ],
    status: "Concluído",
    link: "https://www.orit.com.br/",
    category: "E-commerce",
  },
  {
    title: "Prime Guns",
    description:
      "E-commerce especializado em tiro esportivo e lifestyle outdoor, oferecendo o maior catálogo de armas e acessórios do Brasil com foco em segurança, legalidade e alto desempenho.",
    technologies: [
      {
        name: "Wicomm",
        description: "Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.",
        link: 'https://www.wicomm.com.br/',
      },
      {
        name: "VTEX",
        description: "Plataforma de e-commerce",
        link: "https://vtex.com",
      },
      {
        name: "React",
        description: "Interfaces modernas",
        link: "https://reactjs.org",
      },
      {
        name: "Node.js",
        description: "Backend escalável",
        link: "https://nodejs.org",
      },
    ],
    status: "Concluído",
    link: "https://www.primeguns.com.br",
    category: "E-commerce",
  },
  {
    title: "Le Blog Store",
    description:
      "E-commerce de moda feminina contemporânea com foco em versatilidade e sofisticação, unindo tendências globais a um design moderno para mulheres de mindstyle jovem e autêntico.",
    technologies: [
      {
        name: "Wicomm",
        description: "Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.",
        link: 'https://www.wicomm.com.br/',
      },
      {
        name: "VTEX",
        description: "Plataforma de e-commerce",
        link: "https://vtex.com",
      },
      {
        name: "React",
        description: "Interfaces modernas",
        link: "https://reactjs.org",
      },
      {
        name: "Node.js",
        description: "Backend escalável",
        link: "https://nodejs.org",
      },
    ],
    status: "Concluído",
    link: "https://www.leblogstore.com.br",
    category: "E-commerce",
  },
  {
    title: "GoldKo",
    description:
      "E-commerce de chocolates e doces premium que reinventa o prazer do consumo sem culpa, oferecendo produtos com sabor surreal, zero adição de açúcares e foco em inovação e bem-estar.",
    technologies: [
      {
        name: "Wicomm",
        description: "Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.",
        link: 'https://www.wicomm.com.br/',
      },
      {
        name: "VTEX",
        description: "Plataforma de e-commerce",
        link: "https://vtex.com",
      },
      {
        name: "React",
        description: "Interfaces modernas",
        link: "https://reactjs.org",
      },
      {
        name: "Node.js",
        description: "Backend escalável",
        link: "https://nodejs.org",
      },
    ],
    status: "Concluído",
    link: "https://www.goldko.com.br",
    category: "E-commerce",
  },
  {
    title: "GA.MA Italy",
    description:
      "E-commerce de referência global em tecnologia para beleza e cuidados pessoais, focado em ferramentas profissionais de alta performance como secadores, pranchas e modeladores.",
    technologies: [
      {
        name: "Wicomm",
        description: "Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.",
        link: 'https://www.wicomm.com.br/',
      },
      {
        name: "VTEX",
        description: "Plataforma de e-commerce",
        link: "https://vtex.com",
      },
      {
        name: "React",
        description: "Interfaces modernas",
        link: "https://reactjs.org",
      },
      {
        name: "Node.js",
        description: "Backend escalável",
        link: "https://nodejs.org",
      },
    ],
    status: "Concluído",
    link: "https://www.gamaitaly.com.br",
    category: "E-commerce",
  },
  {
    title: "Toymania",
    description:
      "Um dos e-commerces pioneiros do setor de brinquedos no Brasil, oferecendo uma vasta curadoria multimarca focada no desenvolvimento infantil, segurança e na experiência lúdica para todas as idades.",
    technologies: [
      {
        name: "Wicomm",
        description: "Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.",
        link: 'https://www.wicomm.com.br/',
      },
      {
        name: "VTEX",
        description: "Plataforma de e-commerce",
        link: "https://vtex.com",
      },
      {
        name: "React",
        description: "Interfaces modernas",
        link: "https://reactjs.org",
      }
    ],
    status: "Concluído",
    link: "https://www.toymania.com.br",
    category: "E-commerce",
  },
  {
    title: "Amakha Paris",
    description:
      "E-commerce de cosméticos e perfumaria de alta qualidade, focado em essências internacionais e alta fixação, integrando tecnologia e empreendedorismo para democratizar o acesso à beleza e ao bem-estar.",
    technologies: [
      {
        name: "Wicomm",
        description: "Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.",
        link: 'https://www.wicomm.com.br/',
      },
      {
        name: "VTEX",
        description: "Plataforma de e-commerce",
        link: "https://vtex.com",
      },
      {
        name: "React",
        description: "Interfaces modernas",
        link: "https://reactjs.org",
      }
    ],
    status: "Concluído",
    link: "https://www.amakhaparis.com.br",
    category: "E-commerce",
  },
  {
    title: "Farm Rio (Internacional)",
    description:
      "E-commerce internacional da marca carioca que leva o 'borogodó' brasileiro para o mercado latino-americano, unindo estampas vibrantes, design tropical e uma experiência de moda focada em sustentabilidade e alegria.",
    technologies: [
       {
        name: "Wicomm",
        description: "Wicomm é uma empresa de tecnologia que oferece soluções de e-commerce para empresas de todos os setores. A empresa oferece uma plataforma de e-commerce completa, com muitas funcionalidades prontas para uso.",
        link: 'https://www.wicomm.com.br/',
      },
      {
        name: "VTEX",
        description: "Plataforma de e-commerce",
        link: "https://vtex.com",
      },
      {
        name: "React",
        description: "Interfaces modernas",
        link: "https://reactjs.org",
      },
    ],
    status: "Concluído",
    link: "https://www.farmrio.cl/",
    category: "E-commerce",
  },
  {
    title: "CSP Forge",
    description:
      "Ferramenta para gerar Content Security Policies personalizadas, com predefinições inteligentes e interface intuitiva.",
    technologies: [
      {
        name: "Next.js",
        description: "Full-stack framework",
        link: "https://nextjs.org",
      },
    ],
    status: "Concluído",
    link: "https://cspforge.simks.com.br",
    category: "Pessoal",
  },
  {
    title: "Wake Runner (NPM Library)",
    description:
      "Biblioteca de automação desenvolvida para otimizar o fluxo de trabalho na plataforma Wake Commerce, permitindo a execução simplificada de comandos de desenvolvimento e acelerando a produtividade de engenheiros de software.",
    technologies: [
      {
        name: "Node.js",
        description: "Backend escalável",
        link: "https://nodejs.org",
      },
    ],
    status: "Concluído",
    link: "https://www.npmjs.com/package/wake-runner",
    category: "Pessoal",
  },
];

const categories = ["Todos", "E-commerce", "Pessoal"];

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredProjects =
    activeFilter === "Todos"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    gsap.fromTo(
      ".project-card",
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
      },
    );
  }, [activeFilter]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-spacing relative"
    >
      <div className="container-modern">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 text-primary font-medium text-sm mb-4">
            <span className="w-8 h-0.5 bg-primary rounded-full" />
            Portfólio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Projetos em <span className="gradient-text-primary">Destaque</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Uma seleção dos meus trabalhos mais recentes em e-commerce e
            desenvolvimento.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === category
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border hover:border-primary/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="project-card card-modern group overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden bg-gradient-to-br from-secondary to-muted">
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10" />
                <ProjectImage
                  url={project.link}
                  alt={project.title}
                  fill
                  className="transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="space-y-4 flex flex-col flex-grow">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {project.category}
                    </span>
                  </div>
                  <span
                    className={`badge ${
                      project.status === "Concluído"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <a
                      key={tech.name}
                      href={tech.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tag hover:bg-primary/20 hover:text-primary transition-colors"
                    >
                      {tech.name}
                    </a>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full mt-auto group/link"
                >
                  Ver projeto
                  <svg
                    className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              Nenhum projeto encontrado nesta categoria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
