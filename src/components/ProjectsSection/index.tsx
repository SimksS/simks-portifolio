'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectImage } from '../ProjectImage';
import RevealHeading from '@/components/RevealHeading';
import { useTranslations } from 'next-intl';
import { projectCatalog, type ProjectMeta, type ResultIcon as ResultIconName } from '@/content/project-catalog';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ProjectCategory = 'ecommerce' | 'health' | 'personal';
type ProjectStatus = 'done' | 'wip';
type FilterKey = 'all' | ProjectCategory;

interface ProjectCopy {
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  challenge: string;
  solution: string;
  moreInfo: string;
  results: { value: string; label: string }[];
}

interface Project extends ProjectMeta {
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  challenge: string;
  solution: string;
  moreInfo: string;
  results: { icon: ResultIconName; value: string; label: string }[];
}

function useProjectList(): Project[] {
  const t = useTranslations('projects');
  const items = t.raw('items') as Record<string, ProjectCopy>;
  return projectCatalog.map((meta) => {
    const copy = items[meta.id];
    return {
      ...meta,
      description: copy.description,
      category: copy.category,
      status: copy.status,
      challenge: copy.challenge,
      solution: copy.solution,
      moreInfo: copy.moreInfo,
      results: meta.results.map((result, index) => ({
        icon: result.icon,
        value: copy.results[index]?.value ?? '',
        label: copy.results[index]?.label ?? '',
      })),
    };
  });
}

const ACCENT = {
  badge: 'border-[color:var(--color-accent-border)] text-[color:var(--color-accent)]',
  border: 'var(--color-accent-border)',
  glow: 'var(--color-accent-soft)',
  text: 'var(--color-accent)',
};

const screenshotUrl = (link: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(link)}&screenshot=true&meta=false&embed=screenshot.url`;

const PanelPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return createPortal(children, document.body);
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const ResultIcon = ({ type }: { type: ResultIconName }) => {
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
  const t = useTranslations('projects');
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
            {t(`filters.${project.category}`)}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-border/50 text-foreground-dim hover:border-foreground/30 hover:text-foreground transition-colors"
            aria-label={t('close')}
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
            <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-foreground">
              {t(`status.${project.status}`)}
            </span>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm transition-colors"
              style={{ color: accent.text }}
            >
              {t('viewSite')}
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
                {t('challenge')}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.challenge}</p>
            </div>
            <div className="bento-card">
              <p className="text-xs font-mono tracking-[0.15em] uppercase mb-2" style={{ color: accent.text }}>
                {t('solution')}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Results */}
          <div>
            <p className="text-xs font-mono tracking-[0.15em] uppercase text-foreground-dim mb-3">{t('highlights')}</p>
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
            <p className="text-xs font-mono tracking-[0.15em] uppercase text-foreground-dim mb-2">{t('more')}</p>
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
            {t('viewProject')}
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
  const t = useTranslations('projects');
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
        aria-label={t('ariaCase', { title: project.title })}
      >
        <span className="mono-label tabular-nums w-10">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="project-row-title font-display min-w-0 truncate">{project.title}</h3>
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          {project.technologies.some((tech) => tech.name === 'Wicomm') && (
            <span className="hidden sm:inline-flex items-center font-mono text-[0.5rem] tracking-[0.14em] uppercase border border-[color:var(--color-accent-border)] text-[color:var(--color-accent)] px-1.5 py-[3px] select-none">
              Wicomm
            </span>
          )}
          <span className="mono-label hidden md:block">{t(`filters.${project.category}`)}</span>
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
  const t = useTranslations('projects');
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
              {t('viewCase')}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────

export const ProjectsSection = () => {
  const t = useTranslations('projects');
  const projects = useProjectList();
  const filters: FilterKey[] = ['all', 'ecommerce', 'health', 'personal'];
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section ref={sectionRef} id="projects" className="section-spacing relative">
      <div className="container-futuristic">
        {/* Cabeçalho */}
        <div className="flex items-baseline gap-6 mb-12 lg:mb-16">
          <span className="mono-label shrink-0">{t('index')}</span>
          <div className="hairline flex-1" />
          <span className="mono-label hidden sm:block tabular-nums">
            {t('count', { count: String(projects.length).padStart(2, '0') })}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
          <RevealHeading className="text-heading font-display max-w-[44rem]">
            {t('headingBefore')}<span className="serif-italic text-accent">{t('headingEmphasis')}</span>{t('headingAfter')}
          </RevealHeading>

          <div className="flex items-baseline gap-6 shrink-0">
            {filters.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`link-wipe link-wipe-quiet font-mono text-[0.6875rem] tracking-[0.18em] uppercase transition-colors duration-200 ${
                  activeFilter === cat ? 'text-accent' : 'text-foreground-muted hover:text-foreground'
                }`}
                aria-pressed={activeFilter === cat}
              >
                {t(`filters.${cat}`)}{' '}
                <sup className="tabular-nums">
                  {cat === 'all' ? projects.length : projects.filter((p) => p.category === cat).length}
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
