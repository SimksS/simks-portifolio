'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectImage } from '../ProjectImage';
import RevealHeading from '@/components/RevealHeading';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type AccentKey = 'cyan' | 'purple' | 'pink' | 'green' | 'blue';

interface ProjectResult {
  icon: 'trend' | 'clock' | 'cart' | 'users' | 'star' | 'shield';
  value: string;
  label: string;
}

interface Project {
  title: string;
  description: string;
  year: string;
  technologies: { name: string; description: string; link: string }[];
  status: 'Concluído' | 'Em andamento';
  link: string;
  category: string;
  accent: AccentKey;
  challenge: string;
  solution: string;
  results: ProjectResult[];
  moreInfo: string;
}

// Um único accent — a contenção é a identidade
const ACCENT = {
  badge: 'border-[color:var(--color-accent-border)] text-[color:var(--color-accent)]',
  border: 'var(--color-accent-border)',
  glow: 'var(--color-accent-soft)',
  text: 'var(--color-accent)',
};

const screenshotUrl = (link: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(link)}&screenshot=true&meta=false&embed=screenshot.url`;

const projects: Project[] = [
  {
    title: 'Elle',
    description: 'E-commerce oficial da revista de moda ELLE Brasil.',
    year: '2025',
    technologies: [
      { name: 'Wicomm', description: 'Plataforma de e-commerce completa', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
      { name: 'Node.js', description: 'Backend escalável', link: 'https://nodejs.org' },
    ],
    status: 'Concluído',
    link: 'https://loja.elle.com.br',
    category: 'E-commerce',
    accent: 'pink',
    challenge: 'Modernizar a experiência de compra do e-commerce da ELLE, mantendo a elegância e sofisticação da marca e melhorando a performance e escalabilidade.',
    solution: 'Desenvolvimento de uma loja headless com VTEX IO e React, focada em performance, experiência do usuário e integração com sistemas de ERP e CRM.',
    results: [
      { icon: 'trend', value: '+38%', label: 'Aumento na taxa de conversão' },
      { icon: 'clock', value: '-52%', label: 'Redução no tempo de carregamento' },
      { icon: 'cart', value: '+27%', label: 'Aumento no ticket médio' },
    ],
    moreInfo: 'Integração com meio de pagamento, cálculo de frete em tempo real, busca inteligente e páginas otimizadas para SEO.',
  },
  {
    title: 'Dpaschoal',
    description: 'Referência nacional em pneus, peças e serviços automotivos desde 1949.',
    year: '2025',
    technologies: [
      { name: 'Wicomm', description: 'Plataforma de e-commerce completa', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
      { name: 'Node.js', description: 'Backend escalável', link: 'https://nodejs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.dpaschoal.com.br',
    category: 'E-commerce',
    accent: 'green',
    challenge: 'Digitalizar e unificar a jornada de compra de uma rede com centenas de lojas físicas, integrando estoque em tempo real e agendamento de serviços.',
    solution: 'Migração para arquitetura headless com VTEX IO, criando um checkout unificado que integra loja física e virtual com rastreamento de pedidos em tempo real.',
    results: [
      { icon: 'trend', value: '+44%', label: 'Crescimento em vendas online' },
      { icon: 'users', value: '+61%', label: 'Retenção de clientes' },
      { icon: 'clock', value: '-48%', label: 'Redução no tempo de checkout' },
    ],
    moreInfo: 'Integração com sistema de estoque das filiais, cálculo de frete multimodal e implementação de programa de fidelidade digital.',
  },
  {
    title: 'Cris Barros',
    description: 'Marca de moda de luxo com estética sofisticada e autoral.',
    year: '2024',
    technologies: [
      { name: 'Wicomm', description: 'Plataforma de e-commerce completa', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.crisbarros.com',
    category: 'E-commerce',
    accent: 'purple',
    challenge: 'Traduzir a sofisticação da marca para o digital, criando uma experiência de compra que refletisse o posicionamento de luxo sem comprometer a conversão.',
    solution: 'Design system exclusivo com tipografia editorial, galerias imersivas de produto e experiência de checkout personalizada para o público premium.',
    results: [
      { icon: 'cart', value: '+33%', label: 'Aumento no ticket médio' },
      { icon: 'trend', value: '+29%', label: 'Taxa de conversão' },
      { icon: 'users', value: '+55%', label: 'Clientes recorrentes' },
    ],
    moreInfo: 'Implementação de wishlist inteligente, look-book interativo e integração com atendimento personalizado via WhatsApp.',
  },
  {
    title: 'Canal Concept',
    description: 'Loja online de moda feminina focada em autenticidade e bem-estar.',
    year: '2024',
    technologies: [
      { name: 'Wicomm', description: 'Plataforma de e-commerce completa', link: 'https://www.wicomm.com.br/' },
      { name: 'Wake', description: 'Headless e-commerce', link: 'https://wake.tech' },
    ],
    status: 'Concluído',
    link: 'https://www.canal.com.br',
    category: 'E-commerce',
    accent: 'blue',
    challenge: 'Reposicionar a marca no digital com uma experiência de compra que comunicasse os valores de autenticidade e bem-estar, aumentando o engajamento.',
    solution: 'Nova identidade visual digital com Wake Commerce, páginas de conteúdo editorial integradas à vitrine e personalização de recomendações por perfil.',
    results: [
      { icon: 'trend', value: '+41%', label: 'Engajamento na loja' },
      { icon: 'cart', value: '+22%', label: 'Itens por pedido' },
      { icon: 'clock', value: '-39%', label: 'Taxa de abandono de carrinho' },
    ],
    moreInfo: 'Blog editorial integrado ao e-commerce, sistema de recomendações baseado em comportamento e look-builder interativo.',
  },
  {
    title: 'Clínica Fares',
    description: 'Plataforma de agendamento de saúde integrada a mais de 45 especialidades médicas.',
    year: '2025',
    technologies: [
      { name: 'Wicomm', description: 'Plataforma de e-commerce completa', link: 'https://www.wicomm.com.br/' },
      { name: 'Wake', description: 'Headless e-commerce', link: 'https://wake.tech' },
    ],
    status: 'Concluído',
    link: 'https://www.clinicafares.com.br/',
    category: 'E-commerce',
    accent: 'cyan',
    challenge: 'Criar uma plataforma digital que simplificasse o agendamento de consultas e exames, reduzindo a fricção para pacientes de todas as faixas etárias.',
    solution: 'Sistema de agendamento online com calendário em tempo real, integração com prontuário eletrônico e notificações automáticas por WhatsApp e SMS.',
    results: [
      { icon: 'users', value: '+73%', label: 'Agendamentos online' },
      { icon: 'clock', value: '-60%', label: 'Tempo médio de agendamento' },
      { icon: 'trend', value: '+35%', label: 'Satisfação do paciente' },
    ],
    moreInfo: 'Integração com sistema HIS da clínica, módulo de telemedicina e painel administrativo para gestão de agenda médica.',
  },
  {
    title: 'Orit',
    description: 'E-commerce líder no mercado secondhand de luxo em joias e relógios.',
    year: '2024',
    technologies: [
      { name: 'Wicomm', description: 'Plataforma de e-commerce completa', link: 'https://www.wicomm.com.br/' },
      { name: 'Wake', description: 'Headless e-commerce', link: 'https://wake.tech' },
    ],
    status: 'Concluído',
    link: 'https://www.orit.com.br/',
    category: 'E-commerce',
    accent: 'pink',
    challenge: 'Construir confiança no mercado de luxo pré-amado, onde a autenticidade dos produtos é crítica e o público exige transparência e sofisticação.',
    solution: 'Plataforma com certificação de autenticidade digital, histórico detalhado de cada peça, galeria de alta resolução com zoom e sistema de avaliação de especialistas.',
    results: [
      { icon: 'trend', value: '+58%', label: 'Taxa de conversão' },
      { icon: 'star', value: '4.9/5', label: 'Avaliação média dos clientes' },
      { icon: 'cart', value: '+88%', label: 'Aumento no GMV' },
    ],
    moreInfo: 'Sistema de laudos de autenticidade digitais, seguro integrado para peças de alto valor e programa de consignação para vendedores.',
  },
  {
    title: 'Prime Guns',
    description: 'E-commerce especializado em tiro esportivo com o maior catálogo do Brasil.',
    year: '2026',
    technologies: [
      { name: 'Wicomm', description: 'Plataforma de e-commerce completa', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
      { name: 'Node.js', description: 'Backend escalável', link: 'https://nodejs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.primeguns.com.br',
    category: 'E-commerce',
    accent: 'green',
    challenge: 'Operar em um segmento altamente regulamentado exigindo validação de registros de CAC, controle rigoroso de estoque e compliance com legislação federal.',
    solution: 'Fluxo de checkout com validação automática de CR e CRAF, integração com sistema da PF para verificação de habilitação e controle de estoque por número de série.',
    results: [
      { icon: 'shield', value: '100%', label: 'Compliance regulatório' },
      { icon: 'trend', value: '+67%', label: 'Crescimento em pedidos' },
      { icon: 'clock', value: '-44%', label: 'Tempo de processamento' },
    ],
    moreInfo: 'Sistema antifraude especializado no segmento, relatórios automáticos de vendas para órgãos reguladores e rastreabilidade completa de produtos.',
  },
  {
    title: 'Le Blog Store',
    description: 'E-commerce de moda feminina contemporânea unindo tendências globais a design moderno.',
    year: '2025',
    technologies: [
      { name: 'Wicomm', description: 'Plataforma de e-commerce completa', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
      { name: 'Node.js', description: 'Backend escalável', link: 'https://nodejs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.leblogstore.com.br',
    category: 'E-commerce',
    accent: 'purple',
    challenge: 'Escalar as vendas online de uma marca com forte presença no Instagram, convertendo seguidores em clientes sem perder a identidade visual da marca.',
    solution: 'Integração nativa com Instagram Shopping, feed shoppable e experiência de produto imersiva com vídeos de styling e looks completos sugeridos por IA.',
    results: [
      { icon: 'users', value: '+94%', label: 'Conversão de social para loja' },
      { icon: 'trend', value: '+52%', label: 'Receita mensal' },
      { icon: 'cart', value: '+31%', label: 'Ticket médio' },
    ],
    moreInfo: 'Curadoria de looks com IA, programa de embaixadoras com rastreamento de conversão e lançamentos exclusivos para lista VIP.',
  },
  {
    title: 'GoldKo',
    description: 'E-commerce de chocolates premium zero açúcar focado em inovação e bem-estar.',
    year: '2025',
    technologies: [
      { name: 'Wicomm', description: 'Plataforma de e-commerce completa', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
      { name: 'Node.js', description: 'Backend escalável', link: 'https://nodejs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.goldko.com.br',
    category: 'E-commerce',
    accent: 'pink',
    challenge: 'Comunicar os diferenciais de uma marca de chocolates saudáveis para um público céticoo, convertendo visitantes que chegam pela curiosidade em compradores recorrentes.',
    solution: 'Landing pages com prova social e depoimentos em vídeo, assinatura recorrente com desconto progressivo e quiz de sabor para personalização da caixa.',
    results: [
      { icon: 'users', value: '+120%', label: 'Taxa de retenção em 90 dias' },
      { icon: 'trend', value: '+76%', label: 'Assinantes recorrentes' },
      { icon: 'cart', value: '+43%', label: 'LTV por cliente' },
    ],
    moreInfo: 'Módulo de assinatura recorrente, kit de degustação com fluxo de nutricionista e programa de indicação com créditos na loja.',
  },
  {
    title: 'GA.MA Italy',
    description: 'Referência global em tecnologia de beleza com secadores e ferramentas profissionais.',
    year: '2025',
    technologies: [
      { name: 'Wicomm', description: 'Plataforma de e-commerce completa', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
      { name: 'Node.js', description: 'Backend escalável', link: 'https://nodejs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.gamaitaly.com.br',
    category: 'E-commerce',
    accent: 'blue',
    challenge: 'Consolidar a operação B2B e B2C em uma única plataforma, atendendo tanto salões profissionais quanto consumidores finais com experiências distintas.',
    solution: 'Plataforma multicanal com portais separados para B2B e B2C, tabelas de preço dinâmicas por segmento e catálogo de produtos exclusivos para profissionais.',
    results: [
      { icon: 'trend', value: '+49%', label: 'Receita B2B online' },
      { icon: 'users', value: '+2.3k', label: 'Salões cadastrados' },
      { icon: 'cart', value: '+36%', label: 'Pedido médio B2C' },
    ],
    moreInfo: 'Clube de fidelidade para profissionais, integração com sistema de revenda e tutoriais exclusivos de técnicas com os produtos.',
  },
  {
    title: 'Toymania',
    description: 'Pioneiro em e-commerce de brinquedos no Brasil com curadoria multimarca.',
    year: '2022',
    technologies: [
      { name: 'Wicomm', description: 'Plataforma de e-commerce completa', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.toymania.com.br',
    category: 'E-commerce',
    accent: 'cyan',
    challenge: 'Modernizar uma operação pioneira que acumulou 20 anos de história, atualizando a plataforma sem perder o histórico de clientes e rankings de SEO conquistados.',
    solution: 'Migração gradual para VTEX IO com URL mapping completo, preservando toda a estrutura de SEO e importando o histórico de pedidos e clientes da plataforma legada.',
    results: [
      { icon: 'trend', value: '+55%', label: 'Tráfego orgânico' },
      { icon: 'clock', value: '-63%', label: 'Tempo de carregamento' },
      { icon: 'cart', value: '+28%', label: 'Taxa de conversão' },
    ],
    moreInfo: 'Migração zero-downtime, redirect map com 15k URLs, importação de 180k clientes e manutenção total dos rankings de busca.',
  },
  {
    title: 'Amakha Paris',
    description: 'E-commerce de cosméticos e perfumaria integrando tecnologia e empreendedorismo.',
    year: '2023',
    technologies: [
      { name: 'Wicomm', description: 'Plataforma de e-commerce completa', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.amakhaparis.com.br',
    category: 'E-commerce',
    accent: 'purple',
    challenge: 'Estruturar a operação digital de uma marca de vendas diretas, criando um ecossistema que suportasse revendedoras autônomas e consumidores finais.',
    solution: 'Portal de revendedoras com links personalizados, comissionamento automático, kit de divulgação digital e loja corporativa para vendas institucionais.',
    results: [
      { icon: 'users', value: '+8.5k', label: 'Revendedoras ativas' },
      { icon: 'trend', value: '+230%', label: 'Receita em 12 meses' },
      { icon: 'cart', value: '+47%', label: 'Ticket médio' },
    ],
    moreInfo: 'Sistema de MLM digital, relatório de desempenho por revendedora e programa de ranking com premiações trimestrais.',
  },
  {
    title: 'Capodarte',
    description: 'E-commerce de calçados e bolsas premium com 35 anos de tradição artesanal brasileira.',
    year: '2026',
    technologies: [
      { name: 'Wicomm', description: 'Plataforma de e-commerce completa', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
      { name: 'Node.js', description: 'Backend escalável', link: 'https://nodejs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.capodarte.com.br/',
    category: 'E-commerce',
    accent: 'pink',
    challenge: 'Digitalizar a experiência de uma marca premium com 35 anos de história artesanal, traduzindo ao digital a sofisticação dos acabamentos manuais, couros exóticos e coleções limitadas sem perder o posicionamento de luxo.',
    solution: 'Loja headless com VTEX IO e React, com galerias imersivas de produto, zoom em alta resolução para detalhes artesanais, páginas de coleção editorial e integração com ERP para controle de itens de edição limitada.',
    results: [
      { icon: 'trend', value: '+46%', label: 'Taxa de conversão' },
      { icon: 'cart', value: '+38%', label: 'Aumento no ticket médio' },
      { icon: 'clock', value: '-55%', label: 'Tempo de carregamento' },
    ],
    moreInfo: 'Look-book digital das coleções sazonais, integração com programa de fidelidade, busca por categoria e material, e páginas otimizadas para SEO de nicho premium.',
  },
  {
    title: 'Farm Rio',
    description: 'E-commerce internacional da marca carioca para o mercado latino-americano.',
    year: '2024',
    technologies: [
      { name: 'Wicomm', description: 'Plataforma de e-commerce completa', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.farmrio.cl/',
    category: 'E-commerce',
    accent: 'green',
    challenge: 'Expandir a operação da FARM para o Chile e Argentina com moeda local, idioma espanhol e logística regional, mantendo a identidade vibrante da marca.',
    solution: 'Loja multi-country com VTEX IO, internacionalização completa (i18n/l10n), gateways de pagamento locais e parceria com operadores logísticos regionais.',
    results: [
      { icon: 'trend', value: '+310%', label: 'Receita no primeiro ano' },
      { icon: 'users', value: '+18k', label: 'Clientes internacionais' },
      { icon: 'cart', value: '3 países', label: 'Operação simultânea' },
    ],
    moreInfo: 'Suporte a 3 moedas, 2 idiomas, múltiplos gateways locais e integração com hubs logísticos regionais para entregas em 5 dias úteis.',
  },
  {
    title: 'CSP Forge',
    description: 'Ferramenta para gerar Content Security Policies personalizadas com interface intuitiva.',
    year: '2025',
    technologies: [
      { name: 'Next.js', description: 'Full-stack framework', link: 'https://nextjs.org' },
    ],
    status: 'Concluído',
    link: 'https://cspforge.simks.com.br',
    category: 'Pessoal',
    accent: 'cyan',
    challenge: 'Simplificar a criação de Content Security Policies, uma tarefa técnica e propensa a erros que frequentemente resulta em vulnerabilidades ou bloqueios indesejados.',
    solution: 'Gerador visual de CSP com predefinições inteligentes por tipo de aplicação, validação em tempo real e exportação para múltiplos formatos (header HTTP, meta tag).',
    results: [
      { icon: 'users', value: '1.2k+', label: 'Desenvolvedores ativos' },
      { icon: 'shield', value: '100%', label: 'Políticas sem erros de sintaxe' },
      { icon: 'star', value: '4.8/5', label: 'Avaliação no Product Hunt' },
    ],
    moreInfo: 'Biblioteca de templates para Next.js, Nuxt, SvelteKit e outros frameworks populares, com explicações detalhadas de cada diretiva.',
  },
  {
    title: 'Wake Runner',
    description: 'Biblioteca NPM para otimizar o fluxo de trabalho na plataforma Wake Commerce.',
    year: '2026',
    technologies: [
      { name: 'Node.js', description: 'Backend escalável', link: 'https://nodejs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.npmjs.com/package/wake-runner',
    category: 'Pessoal',
    accent: 'blue',
    challenge: 'Reduzir o tempo perdido em tarefas repetitivas de setup e desenvolvimento na plataforma Wake Commerce, que exigia múltiplos comandos manuais a cada sprint.',
    solution: 'CLI automatizado que unifica autenticação, sincronização de arquivos, hot reload e deploy em um único comando, com suporte a múltiplos workspaces.',
    results: [
      { icon: 'clock', value: '-70%', label: 'Tempo de setup por projeto' },
      { icon: 'users', value: '500+', label: 'Downloads semanais' },
      { icon: 'star', value: '4.9/5', label: 'Satisfação dos usuários' },
    ],
    moreInfo: 'Publicada no npm com documentação completa, suporte a TypeScript, zero dependências de runtime e integração com as principais IDEs.',
  },
  {
    title: 'Wake GraphQL MCP',
    description: 'Servidor MCP que permite agentes de IA inspecionar e consultar o schema GraphQL da Wake Commerce em tempo real.',
    year: '2026',
    technologies: [
      { name: 'Node.js', description: 'Backend escalável', link: 'https://nodejs.org' },
      { name: 'TypeScript', description: 'JavaScript tipado', link: 'https://www.typescriptlang.org' },
      { name: 'MCP SDK', description: 'Model Context Protocol', link: 'https://modelcontextprotocol.io' },
    ],
    status: 'Em andamento',
    link: 'https://www.npmjs.com/package/wake-graphql-mcp',
    category: 'Pessoal',
    accent: 'purple',
    challenge: 'Integrar agentes de IA com a API GraphQL da Wake Commerce sem depender de clientes externos, permitindo que IAs como Claude e Cursor entendam o schema e validem queries diretamente durante o desenvolvimento.',
    solution: 'Servidor MCP com quatro ferramentas especializadas — execução de queries, introspecção de schema com cache TTL configurável, detalhamento de tipos e busca por campos — configurável via JSON, variáveis de ambiente ou parâmetros diretos.',
    results: [
      { icon: 'shield', value: '4', label: 'Ferramentas MCP especializadas' },
      { icon: 'users', value: 'Claude + Cursor', label: 'Integração nativa' },
      { icon: 'clock', value: 'Zero', label: 'Clientes GraphQL externos' },
    ],
    moreInfo: 'Cache de introspecção em memória evita chamadas repetidas ao servidor. Suporte a endpoints e tokens customizados. Compatível com qualquer cliente MCP, incluindo Claude Desktop e Cursor.',
  },
  {
    title: 'Treplica',
    description: 'Assistente de reuniões local com transcrição em tempo real, sugestões de IA e tradução ao vivo.',
    year: '2026',
    technologies: [
      { name: 'Tauri', description: 'Framework para apps desktop nativo', link: 'https://tauri.app' },
      { name: 'Rust', description: 'Linguagem de sistemas de alta performance', link: 'https://www.rust-lang.org' },
      { name: 'React', description: 'Interfaces modernas', link: 'https://reactjs.org' },
    ],
    status: 'Em andamento',
    link: 'https://treplica.simks.com.br/',
    category: 'Pessoal',
    accent: 'green',
    challenge: 'Criar um assistente de reuniões que gerasse sugestões de resposta em tempo real sem enviar dados sensíveis para a nuvem, preservando total privacidade durante conversas estratégicas.',
    solution: 'App desktop com Electron e Next.js que captura áudio do microfone e do sistema localmente, transcreve em múltiplos idiomas, gera orientações por IA e exibe um overlay stealth invisível durante compartilhamento de tela.',
    results: [
      { icon: 'shield', value: '100%', label: 'Dados processados localmente' },
      { icon: 'users', value: '9+', label: 'Idiomas suportados' },
      { icon: 'star', value: 'MIT', label: 'Open-source e gratuito' },
    ],
    moreInfo: 'Compatível com Windows 10/11, macOS 12+ e Linux. Overlay stealth invisível no Zoom, Meet e Teams. Zero uploads para nuvem — transcrições, gravações e resumos ficam exclusivamente no seu dispositivo.',
  },
];

const categories = ['Todos', 'E-commerce', 'Pessoal'];

const PanelPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return createPortal(children, document.body);
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const ResultIcon = ({ type }: { type: ProjectResult['icon'] }) => {
  const cls = 'w-5 h-5';
  if (type === 'trend') return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
  if (type === 'clock') return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
    </svg>
  );
  if (type === 'cart') return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
  if (type === 'users') return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
  if (type === 'star') return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
  return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
};

// ─── Detail Panel ─────────────────────────────────────────────────────────────

const DetailPanel = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const accent = ACCENT;
  const [panelImageLoaded, setPanelImageLoaded] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll when panel is open (nativo + Lenis)
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();
    return () => {
      document.body.style.overflow = '';
      window.__lenis?.start();
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-background/70 backdrop-blur-sm z-[9998]"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.aside
        key="panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 right-0 h-screen w-full max-w-[520px] z-[9999] flex flex-col"
        style={{ background: 'oklch(0.13 0.006 75)', borderLeft: `1px solid ${accent.border}` }}
      >
        {/* Accent top bar */}
        <div className="h-[2px] w-full flex-shrink-0" style={{ background: `linear-gradient(90deg, transparent, ${accent.text}, transparent)` }} />

        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-6 pb-4 flex-shrink-0">
          <span
            className={`text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1 rounded-full border ${accent.badge}`}
          >
            {project.category}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-border/50 text-foreground-dim hover:border-foreground/30 hover:text-foreground transition-colors"
            aria-label="Fechar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto px-8 pb-8 space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-4xl font-bold text-foreground tracking-tight leading-none mb-2">
              {project.title}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={2} />
                <path strokeLinecap="round" strokeWidth={2} d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              {project.year}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm transition-colors"
              style={{ color: accent.text }}
            >
              Ver site
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <a
                key={tech.name}
                href={tech.link}
                target="_blank"
                rel="noopener noreferrer"
                className="tag-cyber text-xs"
              >
                {tech.name}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-border/50" />

          {/* Screenshot */}
          <div className="relative h-44 rounded-xl overflow-hidden bg-background-elevated">
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.13_0.006_75)] via-transparent to-transparent z-10" />
            {!panelImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-border border-t-foreground-dim rounded-full animate-spin" />
              </div>
            )}
            <ProjectImage
              url={project.link}
              alt={project.title}
              fill
              className={`transition-opacity duration-500 ${panelImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              sizes="520px"
            />
            {/* Hidden img to detect load */}
            <img
              src={`https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url`}
              alt=""
              className="hidden"
              onLoad={() => setPanelImageLoaded(true)}
              onError={() => setPanelImageLoaded(true)}
            />
          </div>

          {/* Challenge / Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bento-card">
              <p className="text-xs font-mono tracking-[0.15em] uppercase mb-2" style={{ color: accent.text }}>
                O desafio
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.challenge}</p>
            </div>
            <div className="bento-card">
              <p className="text-xs font-mono tracking-[0.15em] uppercase mb-2" style={{ color: accent.text }}>
                A solução
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Results */}
          <div>
            <p className="text-xs font-mono tracking-[0.15em] uppercase text-foreground-dim mb-3">Resultados</p>
            <div className="grid grid-cols-3 gap-3">
              {project.results.map((r, i) => (
                <div key={i} className="bento-card text-center py-4 px-2">
                  <div className="flex justify-center mb-2" style={{ color: accent.text }}>
                    <ResultIcon type={r.icon} />
                  </div>
                  <p className="text-xl font-bold text-foreground leading-none mb-1">{r.value}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{r.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* More info */}
          <div>
            <p className="text-xs font-mono tracking-[0.15em] uppercase text-foreground-dim mb-2">Mais informações</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.moreInfo}</p>
          </div>

          {/* CTA */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${accent.glow.replace('0.12', '0.25')}, ${accent.glow})`,
              border: `1px solid ${accent.border}`,
              color: accent.text,
            }}
          >
            Ver site do projeto
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </motion.aside>
    </>
  );
};

// ─── Linha do índice ──────────────────────────────────────────────────────────

const ProjectIndexRow = ({
  project,
  index,
  onSelect,
  onHover,
  onLeave,
}: {
  project: Project;
  index: number;
  onSelect: () => void;
  onHover: (project: Project) => void;
  onLeave: () => void;
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="project-row group"
        data-cursor="view"
        onClick={onSelect}
        onMouseEnter={() => onHover(project)}
        onMouseLeave={onLeave}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect();
          }
        }}
        aria-label={`Ver case ${project.title}`}
      >
        <span className="mono-label tabular-nums w-10">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="project-row-title font-display min-w-0 truncate">{project.title}</h3>
        <div className="flex items-baseline gap-4 sm:gap-8 shrink-0">
          <span className="mono-label hidden sm:block">{project.category}</span>
          <span className="mono-label tabular-nums">{project.year}</span>
          <span
            className="hidden lg:inline-block font-mono text-xs text-foreground-dim transition-[transform,color] duration-300 group-hover:text-accent group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Preview flutuante — segue o cursor sobre o índice ───────────────────────

const HoverPreview = ({ project }: { project: Project | null }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const lastX = useRef(0);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || reducedMotion) return;

    const el = previewRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power4.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power4.out' });
    const rTo = gsap.quickTo(el, 'rotation', { duration: 0.5, ease: 'power4.out' });

    const move = (e: MouseEvent) => {
      const tilt = gsap.utils.clamp(-12, 12, (e.clientX - lastX.current) * 0.18);
      lastX.current = e.clientX;
      xTo(e.clientX);
      yTo(e.clientY);
      rTo(tilt);
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    gsap.to(el, {
      opacity: project ? 1 : 0,
      scale: project ? 1 : 0.92,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }, [project]);

  return (
    <div
      ref={previewRef}
      className="fixed top-0 left-0 z-40 hidden lg:block w-[26rem] aspect-[16/10] -mt-[8rem] -ml-[13rem] rounded-lg overflow-hidden pointer-events-none"
      style={{ opacity: 0, willChange: 'transform', background: 'oklch(0.18 0.007 75)' }}
      aria-hidden="true"
    >
      {project && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={project.title}
            src={screenshotUrl(project.link)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-2 bg-[oklch(0.13_0.006_75/0.85)] backdrop-blur-sm">
            <span className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-foreground">
              {project.title}
            </span>
            <span className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-accent">
              Ver case
            </span>
          </div>
        </>
      )}
    </div>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  const filteredProjects = activeFilter === 'Todos'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section ref={sectionRef} id="projects" className="section-spacing relative">
      <div className="container-futuristic">
        {/* Cabeçalho */}
        <div className="flex items-baseline gap-6 mb-12 lg:mb-16">
          <span className="mono-label shrink-0">04 — Projetos</span>
          <div className="hairline flex-1" />
          <span className="mono-label hidden sm:block tabular-nums">
            {String(projects.length).padStart(2, '0')} cases
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
          <RevealHeading className="text-heading font-display max-w-[44rem]">
            Trabalho que gera <span className="serif-italic text-accent">resultado</span>.
          </RevealHeading>

          {/* Filtros — texto puro, sem pills */}
          <div className="flex items-baseline gap-6 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`link-wipe link-wipe-quiet font-mono text-[0.6875rem] tracking-[0.18em] uppercase transition-colors duration-200 ${
                  activeFilter === cat ? 'text-accent' : 'text-foreground-muted hover:text-foreground'
                }`}
                aria-pressed={activeFilter === cat}
              >
                {cat}{' '}
                <sup className="tabular-nums">
                  {cat === 'Todos' ? projects.length : projects.filter((p) => p.category === cat).length}
                </sup>
              </button>
            ))}
          </div>
        </div>

        {/* O índice */}
        <div onMouseLeave={() => setPreviewProject(null)}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectIndexRow
                key={project.title}
                project={project}
                index={index}
                onSelect={() => {
                  setPreviewProject(null);
                  setSelectedProject(project);
                }}
                onHover={setPreviewProject}
                onLeave={() => setPreviewProject(null)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Preview que segue o cursor */}
      <HoverPreview project={selectedProject ? null : previewProject} />

      {/* Painel de detalhe — portal para escapar do stacking context */}
      <PanelPortal>
        <AnimatePresence>
          {selectedProject && (
            <DetailPanel
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </PanelPortal>
    </section>
  );
};

export default ProjectsSection;
