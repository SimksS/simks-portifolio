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
    description: 'Loja digital da ELLE Brasil para assinaturas e compra de edições da revista.',
    year: '2025',
    technologies: [
      { name: 'Wicomm', description: 'Consultoria e desenvolvimento e-commerce', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
    ],
    status: 'Concluído',
    link: 'https://loja.elle.com.br',
    category: 'E-commerce',
    accent: 'pink',
    challenge: 'Digitalizar a venda de assinaturas e edições avulsas da revista, com jornada simples e alinhada ao ecossistema editorial da ELLE Brasil.',
    solution: 'Storefront VTEX com fluxos de assinatura, compra de edições e captura de newsletter integrada à operação da marca.',
    results: [
      { icon: 'cart', value: '3 planos', label: 'Opções de assinatura' },
      { icon: 'star', value: 'Edições', label: 'Venda avulsa de revistas' },
      { icon: 'users', value: 'Newsletter', label: 'Captura integrada na loja' },
    ],
    moreInfo: 'Planos de assinatura mensal e anual, compra de edições avulsas e integração com o conteúdo editorial da ELLE Brasil.',
  },
  {
    title: 'Dpaschoal',
    description: 'Maior rede de serviços automotivos da América Latina — pneus, peças e serviços desde 1949.',
    year: '2025',
    technologies: [
      { name: 'Wicomm', description: 'Consultoria e desenvolvimento e-commerce', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
    ],
    status: 'Concluído',
    link: 'https://www.dpaschoal.com.br',
    category: 'E-commerce',
    accent: 'green',
    challenge: 'Unificar a jornada digital de uma rede nacional de pneus, peças e serviços automotivos, conectando catálogo online com agendamento nas lojas físicas.',
    solution: 'Loja VTEX com busca de pneus por medida ou veículo, catálogo de serviços automotivos e fluxo de agendamento de horário.',
    results: [
      { icon: 'cart', value: 'Pneus', label: 'Busca por veículo ou medida' },
      { icon: 'clock', value: 'Serviços', label: 'Agendamento online' },
      { icon: 'shield', value: 'Nacional', label: 'Entrega em todo o Brasil' },
    ],
    moreInfo: 'Seleção de pneus por dimensão ou modelo do veículo, serviços como troca de óleo e agendamento de horário nas unidades físicas.',
  },
  {
    title: 'Cris Barros',
    description: 'Marca brasileira de moda feminina premium com estética sofisticada e autoral.',
    year: '2024',
    technologies: [
      { name: 'Wicomm', description: 'Consultoria e desenvolvimento e-commerce', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
    ],
    status: 'Concluído',
    link: 'https://www.crisbarros.com',
    category: 'E-commerce',
    accent: 'purple',
    challenge: 'Traduzir o posicionamento premium da marca para o digital, mantendo a identidade editorial sem comprometer a experiência de compra.',
    solution: 'Storefront VTEX com vitrine editorial, galerias de produto e checkout alinhado ao público de moda premium.',
    results: [
      { icon: 'star', value: 'Premium', label: 'Posicionamento de luxo' },
      { icon: 'cart', value: 'Coleções', label: 'Vitrine por temporada' },
      { icon: 'users', value: 'WhatsApp', label: 'Atendimento personalizado' },
    ],
    moreInfo: 'Experiência de produto com foco em moda feminina premium, navegação por coleções e checkout integrado à operação da marca.',
  },
  {
    title: 'Canal Concept',
    description: 'Marca de moda feminina com loja online, cashback e rede de lojas físicas.',
    year: '2024',
    technologies: [
      { name: 'Wicomm', description: 'Consultoria e desenvolvimento e-commerce', link: 'https://www.wicomm.com.br/' },
      { name: 'Wake', description: 'Plataforma headless e-commerce', link: 'https://wake.tech' },
    ],
    status: 'Concluído',
    link: 'https://www.canal.com.br',
    category: 'E-commerce',
    accent: 'blue',
    challenge: 'Levar ao digital a proposta da marca — elegância, autenticidade e conexão com a cliente — em uma operação omnichannel com lojas físicas.',
    solution: 'Storefront Wake com vitrine sazonal, programa de cashback, integração com lojas físicas e atendimento via WhatsApp.',
    results: [
      { icon: 'cart', value: 'Cashback', label: 'Programa de fidelidade' },
      { icon: 'users', value: 'Lojas', label: 'Rede física integrada' },
      { icon: 'star', value: 'PIX 5%', label: 'Desconto no pagamento' },
    ],
    moreInfo: 'Coleções sazonais, frete grátis acima de R$ 599, parcelamento em até 10x e atendimento de vendedoras via WhatsApp.',
  },
  {
    title: 'Clínica Fares',
    description: 'Plataforma digital de agendamento de consultas, exames e cirurgias em São Paulo.',
    year: '2025',
    technologies: [
      { name: 'Wicomm', description: 'Consultoria e desenvolvimento digital', link: 'https://www.wicomm.com.br/' },
      { name: 'Wake', description: 'Plataforma headless', link: 'https://wake.tech' },
    ],
    status: 'Concluído',
    link: 'https://www.clinicafares.com.br/',
    category: 'Saúde',
    accent: 'cyan',
    challenge: 'Simplificar o agendamento de consultas, exames e procedimentos para pacientes de diferentes perfis e convênios, em múltiplas unidades.',
    solution: 'Portal de agendamento online com seleção de especialidade, unidade e horário, confirmação por WhatsApp ou e-mail e área do paciente.',
    results: [
      { icon: 'users', value: '45+', label: 'Especialidades médicas' },
      { icon: 'shield', value: '800+', label: 'Tipos de exames' },
      { icon: 'clock', value: '4', label: 'Unidades em SP' },
    ],
    moreInfo: 'Agendamento de consultas, exames laboratoriais e de imagem, cirurgias e acompanhamento de resultados. Confirmação automática por WhatsApp ou e-mail.',
  },
  {
    title: 'Orit',
    description: 'E-commerce de joias e relógios de luxo no mercado secondhand.',
    year: '2024',
    technologies: [
      { name: 'Wicomm', description: 'Consultoria e desenvolvimento e-commerce', link: 'https://www.wicomm.com.br/' },
      { name: 'Wake', description: 'Plataforma headless e-commerce', link: 'https://wake.tech' },
    ],
    status: 'Concluído',
    link: 'https://www.orit.com.br/',
    category: 'E-commerce',
    accent: 'pink',
    challenge: 'Transmitir confiança em um segmento onde autenticidade e transparência são decisivas para a compra de peças de alto valor.',
    solution: 'Storefront Wake com vitrine de peças pré-selecionadas, galerias detalhadas de produto e jornada de compra voltada ao público de luxo.',
    results: [
      { icon: 'shield', value: 'Luxo', label: 'Peças certificadas' },
      { icon: 'star', value: 'Secondhand', label: 'Joias e relógios' },
      { icon: 'cart', value: 'Alto valor', label: 'Checkout seguro' },
    ],
    moreInfo: 'Catálogo de joias e relógios de luxo pré-amados, com foco em autenticidade, detalhamento visual das peças e experiência premium.',
  },
  {
    title: 'Prime Guns',
    description: 'E-commerce especializado em equipamentos e acessórios para tiro esportivo.',
    year: '2026',
    technologies: [
      { name: 'Wicomm', description: 'Consultoria e desenvolvimento e-commerce', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
    ],
    status: 'Concluído',
    link: 'https://www.primeguns.com.br',
    category: 'E-commerce',
    accent: 'green',
    challenge: 'Operar um e-commerce em segmento altamente regulamentado, com exigências de documentação e compliance em cada etapa da compra.',
    solution: 'Loja VTEX com catálogo especializado, fluxo de checkout adaptado às regras do segmento e gestão de pedidos com rastreabilidade.',
    results: [
      { icon: 'shield', value: 'Regulado', label: 'Segmento de alto controle' },
      { icon: 'cart', value: 'Catálogo', label: 'Equipamentos especializados' },
      { icon: 'clock', value: 'Pedidos', label: 'Rastreamento de compra' },
    ],
    moreInfo: 'Operação digital para o mercado de tiro esportivo, com catálogo segmentado e jornada de compra adaptada às exigências regulatórias do setor.',
  },
  {
    title: 'Le Blog Store',
    description: 'E-commerce de moda feminina contemporânea com forte presença digital.',
    year: '2025',
    technologies: [
      { name: 'Wicomm', description: 'Consultoria e desenvolvimento e-commerce', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
    ],
    status: 'Concluído',
    link: 'https://www.leblogstore.com.br',
    category: 'E-commerce',
    accent: 'purple',
    challenge: 'Converter a audiência digital da marca em vendas online, mantendo a identidade visual e a proposta de moda contemporânea.',
    solution: 'Storefront VTEX com vitrine orientada a tendências, páginas de produto imersivas e checkout otimizado para conversão mobile.',
    results: [
      { icon: 'users', value: 'Social', label: 'Presença digital forte' },
      { icon: 'cart', value: 'Moda', label: 'Coleções contemporâneas' },
      { icon: 'trend', value: 'Mobile', label: 'Experiência responsiva' },
    ],
    moreInfo: 'Loja de moda feminina com vitrine sazonal, navegação por categorias e checkout integrado à operação da marca.',
  },
  {
    title: 'GoldKo',
    description: 'E-commerce de chocolates premium zero açúcar, com foco em bem-estar.',
    year: '2025',
    technologies: [
      { name: 'Wicomm', description: 'Consultoria e desenvolvimento e-commerce', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
    ],
    status: 'Concluído',
    link: 'https://www.goldko.com.br',
    category: 'E-commerce',
    accent: 'pink',
    challenge: 'Posicionar uma marca de chocolates saudáveis no digital e ampliar a receita orgânica sem depender exclusivamente de mídia paga.',
    solution: 'Storefront VTEX com estratégia de SEO da Wicomm, vitrine de produtos zero açúcar e jornada de compra orientada a conversão.',
    results: [
      { icon: 'trend', value: '+179%', label: 'Receita orgânica (case Wicomm)' },
      { icon: 'cart', value: 'Zero açúcar', label: 'Linha premium de chocolates' },
      { icon: 'star', value: 'SEO', label: 'Crescimento no canal orgânico' },
    ],
    moreInfo: 'Case publicado pela Wicomm com aumento de 179% na receita orgânica via estratégia de SEO para e-commerce.',
  },
  {
    title: 'GA.MA Italy',
    description: 'Marca global de tecnologia de beleza — secadores e ferramentas profissionais.',
    year: '2025',
    technologies: [
      { name: 'Wicomm', description: 'Consultoria e desenvolvimento e-commerce', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
    ],
    status: 'Concluído',
    link: 'https://www.gamaitaly.com.br',
    category: 'E-commerce',
    accent: 'blue',
    challenge: 'Ampliar a visibilidade orgânica da marca no Brasil e fortalecer o canal de aquisição sem depender só de mídia paga.',
    solution: 'Storefront VTEX com estratégia de SEO da Wicomm focada em tráfego sem marca e otimização técnica da loja.',
    results: [
      { icon: 'trend', value: '3×', label: 'Tráfego sem marca (case Wicomm)' },
      { icon: 'star', value: 'Eletro Beauty', label: 'Líder global no segmento' },
      { icon: 'cart', value: 'B2C', label: 'Loja para consumidor final' },
    ],
    moreInfo: 'Case publicado pela Wicomm com triplicação do tráfego orgânico sem marca via SEO para e-commerce.',
  },
  {
    title: 'Toymania',
    description: 'E-commerce pioneiro de brinquedos no Brasil com curadoria multimarca.',
    year: '2022',
    technologies: [
      { name: 'Wicomm', description: 'Consultoria e desenvolvimento e-commerce', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
    ],
    status: 'Concluído',
    link: 'https://www.toymania.com.br',
    category: 'E-commerce',
    accent: 'cyan',
    challenge: 'Modernizar uma operação com histórico consolidado, migrando de plataforma sem perder posicionamento em busca e base de clientes.',
    solution: 'Migração para VTEX com mapeamento de URLs, preservação de SEO e reestruturação do storefront para melhor performance.',
    results: [
      { icon: 'clock', value: 'Migração', label: 'Troca de plataforma' },
      { icon: 'trend', value: 'SEO', label: 'Preservação de rankings' },
      { icon: 'cart', value: 'Multimarca', label: 'Curadoria de brinquedos' },
    ],
    moreInfo: 'Migração de plataforma com redirect de URLs, manutenção de estrutura de SEO e vitrine multimarca de brinquedos.',
  },
  {
    title: 'Amakha Paris',
    description: 'E-commerce de cosméticos e perfumaria com modelo de vendas diretas.',
    year: '2023',
    technologies: [
      { name: 'Wicomm', description: 'Consultoria e desenvolvimento e-commerce', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
    ],
    status: 'Concluído',
    link: 'https://www.amakhaparis.com.br',
    category: 'E-commerce',
    accent: 'purple',
    challenge: 'Estruturar a operação digital de uma marca de vendas diretas, atendendo revendedoras e consumidores finais na mesma plataforma.',
    solution: 'Loja VTEX com portal para revendedoras, checkout para consumidor final e gestão de catálogo de cosméticos e perfumaria.',
    results: [
      { icon: 'users', value: 'Revenda', label: 'Portal para revendedoras' },
      { icon: 'cart', value: 'Cosméticos', label: 'Catálogo de perfumaria' },
      { icon: 'star', value: 'B2C + B2B', label: 'Dois públicos na mesma loja' },
    ],
    moreInfo: 'Operação digital para vendas diretas de cosméticos, com área para revendedoras e loja para consumidor final.',
  },
  {
    title: 'Capodarte',
    description: 'E-commerce de calçados e bolsas premium com tradição artesanal brasileira.',
    year: '2026',
    technologies: [
      { name: 'Wicomm', description: 'Consultoria e desenvolvimento e-commerce', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
    ],
    status: 'Concluído',
    link: 'https://www.capodarte.com.br/',
    category: 'E-commerce',
    accent: 'pink',
    challenge: 'Traduzir ao digital o posicionamento premium da marca, destacando acabamentos artesanais e coleções de calçados e bolsas.',
    solution: 'Storefront VTEX com galerias de produto em alta resolução, páginas de coleção editorial e checkout para o público premium.',
    results: [
      { icon: 'star', value: 'Premium', label: 'Calçados e bolsas' },
      { icon: 'cart', value: 'Coleções', label: 'Páginas editoriais' },
      { icon: 'shield', value: 'Artesanal', label: 'Marca com 35+ anos' },
    ],
    moreInfo: 'Vitrine de calçados e bolsas premium, galerias com zoom em detalhes do produto e navegação por coleções sazonais.',
  },
  {
    title: 'Farm Rio',
    description: 'Expansão internacional da FARM na América Latina com lojas locais.',
    year: '2024',
    technologies: [
      { name: 'Wicomm', description: 'Consultoria e desenvolvimento e-commerce', link: 'https://www.wicomm.com.br/' },
      { name: 'VTEX', description: 'Plataforma de e-commerce', link: 'https://vtex.com' },
    ],
    status: 'Concluído',
    link: 'https://www.farmrio.cl/',
    category: 'E-commerce',
    accent: 'green',
    challenge: 'Expandir a FARM para novos mercados latino-americanos com experiência de compra localizada — moeda, idioma, pagamento e logística.',
    solution: 'Implementação multi-país com VTEX IO, UX/UI da Wicomm, gateways de pagamento locais e parceiros logísticos regionais.',
    results: [
      { icon: 'cart', value: '6 países', label: 'Lojas na América Latina' },
      { icon: 'clock', value: '45 dias', label: 'Prazo de lançamento (case Wicomm)' },
      { icon: 'users', value: 'i18n', label: 'Moeda e idioma localizados' },
    ],
    moreInfo: 'Case publicado pela Wicomm: expansão para seis países da América Latina em 45 dias com VTEX IO e experiência localizada.',
  },
  {
    title: 'CSP Forge',
    description: 'Gerador visual de Content Security Policies para aplicações web.',
    year: '2025',
    technologies: [
      { name: 'Next.js', description: 'Full-stack framework', link: 'https://nextjs.org' },
      { name: 'TypeScript', description: 'JavaScript tipado', link: 'https://www.typescriptlang.org' },
    ],
    status: 'Concluído',
    link: 'https://cspforge.simks.com.br',
    category: 'Pessoal',
    accent: 'cyan',
    challenge: 'Simplificar a criação de Content Security Policies — tarefa técnica e propensa a erros que bloqueia recursos ou deixa brechas de segurança.',
    solution: 'Gerador visual com predefinições por tipo de aplicação, validação em tempo real e exportação em header HTTP ou meta tag.',
    results: [
      { icon: 'shield', value: 'CSP', label: 'Geração visual de políticas' },
      { icon: 'star', value: 'Templates', label: 'Next.js, Nuxt, SvelteKit' },
      { icon: 'clock', value: 'Export', label: 'Header HTTP e meta tag' },
    ],
    moreInfo: 'Projeto open-source (repositório cspForge no GitHub) com templates para frameworks populares e explicação de cada diretiva CSP.',
  },
  {
    title: 'Wake Runner',
    description: 'CLI publicada no npm para iniciar projetos Wake Commerce localmente.',
    year: '2026',
    technologies: [
      { name: 'Node.js', description: 'Runtime JavaScript', link: 'https://nodejs.org' },
    ],
    status: 'Concluído',
    link: 'https://www.npmjs.com/package/wake-runner',
    category: 'Pessoal',
    accent: 'blue',
    challenge: 'Automatizar o setup local de projetos Wake, que exigia iniciar o storefront e os watchers de CSS manualmente a cada sessão de desenvolvimento.',
    solution: 'CLI que lê o token em Configs/settings.json, inicia o fbits.storefront e os watchers Tailwind para cada input*.css em Assets/CSS/.',
    results: [
      { icon: 'clock', value: '1 cmd', label: 'Storefront + Tailwind juntos' },
      { icon: 'shield', value: '0 deps', label: 'Apenas módulos nativos do Node' },
      { icon: 'star', value: 'v1.0.2', label: 'Publicado no npm (MIT)' },
    ],
    moreInfo: 'Automatiza fbits.storefront e tailwindcss --watch. Compatível com Windows (wake-storefront / wake-tailwind) e demais sistemas.',
  },
  {
    title: 'Wake GraphQL MCP',
    description: 'Servidor MCP para consultar e inspecionar o GraphQL do Wake Storefront API (FBITS).',
    year: '2026',
    technologies: [
      { name: 'Node.js', description: 'Runtime JavaScript', link: 'https://nodejs.org' },
      { name: 'TypeScript', description: 'JavaScript tipado', link: 'https://www.typescriptlang.org' },
      { name: 'MCP SDK', description: 'Model Context Protocol', link: 'https://modelcontextprotocol.io' },
    ],
    status: 'Em andamento',
    link: 'https://www.npmjs.com/package/wake-graphql-mcp',
    category: 'Pessoal',
    accent: 'purple',
    challenge: 'Permitir que agentes de IA consultem o schema GraphQL da Wake durante o desenvolvimento, sem depender de clientes externos ou adivinhar nomes de campos.',
    solution: 'Servidor MCP com quatro ferramentas — query, introspecção com cache TTL, detalhe de tipo e busca por campos — configurável via JSON ou variáveis de ambiente.',
    results: [
      { icon: 'shield', value: '4 tools', label: 'Query, introspecção, tipo e busca' },
      { icon: 'users', value: 'Cursor', label: 'Integração via mcp.json' },
      { icon: 'clock', value: 'v0.0.3', label: 'Publicado no npm' },
    ],
    moreInfo: 'Cache de introspecção em memória, suporte a token TCS-Access-Token e compatível com Claude Desktop e Cursor.',
  },
  {
    title: 'Treplica',
    description: 'Assistente de reuniões local com transcrição, sugestões de IA e tradução ao vivo.',
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
    challenge: 'Oferecer sugestões de resposta em tempo real durante reuniões sem enviar áudio ou transcrições para servidores externos.',
    solution: 'App desktop com Tauri e React que captura áudio localmente, transcreve em múltiplos idiomas, gera orientações por IA e exibe overlay stealth na reunião.',
    results: [
      { icon: 'shield', value: '100%', label: 'Processamento local' },
      { icon: 'users', value: '9+', label: 'Idiomas suportados' },
      { icon: 'star', value: 'MIT', label: 'Open-source e gratuito' },
    ],
    moreInfo: 'v0.1.1-beta.2 — Windows 10/11, macOS 12+ e Linux. Overlay invisível no Zoom, Meet e Teams. Sem uploads para nuvem.',
  },
];

const categories = ['Todos', 'E-commerce', 'Saúde', 'Pessoal'];

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
            <p className="text-xs font-mono tracking-[0.15em] uppercase text-foreground-dim mb-3">Destaques</p>
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
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          {project.technologies.some(t => t.name === 'Wicomm') && (
            <span className="hidden sm:inline-flex items-center font-mono text-[0.5rem] tracking-[0.14em] uppercase border border-[color:var(--color-accent-border)] text-[color:var(--color-accent)] px-1.5 py-[3px] select-none">
              Wicomm
            </span>
          )}
          <span className="mono-label hidden md:block">{project.category}</span>
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
