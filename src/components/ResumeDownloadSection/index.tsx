'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const ResumeDownloadSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        '.resume-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/curriculo-kelven-souza.pdf';
    link.download = 'curriculo-kelven-souza.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section ref={sectionRef} id="resume" className="section-spacing relative">
      <div className="container-modern">
        <div className="resume-content max-w-3xl mx-auto">
          <div className="card-modern text-center p-8 sm:p-12 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan/5 rounded-full blur-[60px] -translate-x-1/4 translate-y-1/4" />

            <div className="relative z-10 space-y-6">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              {/* Text */}
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Baixe meu currículo
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Conheça em detalhes minha trajetória profissional, projetos e habilidades técnicas.
                </p>
              </div>

              {/* Button */}
              <button
                onClick={handleDownload}
                className="btn-primary group inline-flex items-center gap-3 px-8 py-4"
              >
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download PDF
              </button>

              {/* File info */}
              <p className="text-sm text-muted-foreground">
                PDF • Aproximadamente 2MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeDownloadSection;
