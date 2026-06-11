'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import RevealHeading from '@/components/RevealHeading';

interface FormData {
  name: string;
  email: string;
  message: string;
  projectType: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const projectTypes = ['E-commerce', 'Aplicação Web', 'Site Institucional', 'Integração', 'Outro'];

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Campo de formulário ──────────────────────────────────────────────────────

interface FormFieldProps {
  id: string;
  name: keyof FormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  label: string;
  type?: 'text' | 'email' | 'textarea';
  rows?: number;
  error?: string;
  disabled?: boolean;
  hint?: string;
}

const FormField = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  label,
  type = 'text',
  rows = 5,
  error,
  disabled,
  hint,
}: FormFieldProps) => {
  const isTextarea = type === 'textarea';
  const errorStyle = error ? { borderBottomColor: 'var(--color-destructive)' } : undefined;
  const shared = {
    id,
    name,
    value,
    onChange,
    placeholder,
    disabled,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-error` : undefined,
    className: 'input-cyber',
    style: errorStyle,
  };

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="mono-label">
          {label} <span className="text-accent">*</span>
        </label>
        {hint && (
          <span
            className={`font-mono text-[0.625rem] tracking-[0.1em] tabular-nums ${
              error ? 'text-destructive' : 'text-foreground-dim'
            }`}
            aria-hidden="true"
          >
            {hint}
          </span>
        )}
      </div>

      {isTextarea ? (
        <textarea {...shared} rows={rows} className="input-cyber resize-none" />
      ) : (
        <input {...shared} type={type} />
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-2 font-mono text-[0.6875rem] tracking-[0.08em] text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Estado de sucesso — editorial, no tema ───────────────────────────────────

const SuccessState = ({ firstName, onReset }: { firstName: string; onReset: () => void }) => (
  <motion.div
    key="success"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="py-6"
    aria-live="polite"
  >
    {/* Check desenhado — círculo + traço em accent */}
    <svg className="w-14 h-14 mb-8" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <motion.circle
        cx="24"
        cy="24"
        r="22"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      <motion.path
        d="M15 24.5l6.5 6.5L33 18"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
      />
    </svg>

    {/* Linhas sobem por trás da máscara */}
    <h3 className="text-[clamp(2rem,4vw,3.25rem)] font-display font-medium leading-[1.02] tracking-[-0.02em] mb-6">
      <span className="block overflow-hidden">
        <motion.span
          className="block"
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          Mensagem
        </motion.span>
      </span>
      <span className="block overflow-hidden pb-[0.1em]">
        <motion.span
          className="block serif-italic text-accent"
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.8, delay: 0.32, ease: EASE }}
        >
          enviada.
        </motion.span>
      </span>
    </h3>

    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
    >
      <p className="text-foreground-muted leading-relaxed max-w-sm mb-2">
        Obrigado{firstName ? `, ${firstName}` : ''}. Vou ler com atenção e te respondo em breve.
      </p>
      <p className="mono-label mb-10">Resposta em até 24h — direto da Bahia</p>

      <div className="hairline mb-8" />

      <button
        onClick={onReset}
        className="link-wipe link-wipe-quiet font-mono text-[0.6875rem] tracking-[0.18em] uppercase text-foreground-muted hover:text-foreground transition-colors duration-200"
      >
        Enviar outra mensagem
      </button>
    </motion.div>
  </motion.div>
);

// ─── Formulário ───────────────────────────────────────────────────────────────

export const ContactForm = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    projectType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [shakeCount, setShakeCount] = useState(0);

  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitError) setSubmitError('');
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (formData.name.trim().length < 3) {
      newErrors.name = 'O nome precisa de pelo menos 3 caracteres';
    }

    if (!EMAIL_RE.test(formData.email.trim())) {
      newErrors.email = 'Digite um email válido — ex.: nome@dominio.com';
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = 'Conte um pouco mais — pelo menos 10 caracteres';
    }

    setErrors(newErrors);

    const firstError = (['name', 'email', 'message'] as const).find((k) => newErrors[k]);
    if (firstError) {
      setShakeCount((c) => c + 1);
      document.getElementById(firstError)?.focus({ preventScroll: true });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      const contentType = response.headers.get('content-type') ?? '';
      let data: { error?: string; success?: boolean } = {};

      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        await response.text().catch(() => undefined);
        throw new Error('O servidor respondeu de forma inesperada. Tente novamente em instantes.');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar mensagem');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar:', error);
      setSubmitError(
        error instanceof Error && error.message !== 'Failed to fetch'
          ? error.message
          : 'Não consegui enviar agora. Tente de novo em instantes.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', message: '', projectType: '' });
    setErrors({});
    setSubmitError('');
  };

  const toggleProjectType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      projectType: prev.projectType === type ? '' : type,
    }));
  };

  const contactInfo = [
    { label: 'Email', value: 'kelven.souza00@gmail.com', href: 'mailto:kelven.souza00@gmail.com' },
    { label: 'Localização', value: 'Bahia, Brasil', href: '#' },
    { label: 'Disponibilidade', value: 'Imediata', href: '#' },
  ];

  const messageLength = formData.message.trim().length;

  return (
    <section ref={sectionRef} id="contact" className="section-spacing relative">
      <div className="container-futuristic">
        {/* Cabeçalho da seção */}
        <div className="flex items-baseline gap-6 mb-12 lg:mb-20">
          <span className="mono-label shrink-0">05 — Contato</span>
          <div className="hairline flex-1" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info Column */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="space-y-10"
          >
            <RevealHeading className="text-heading font-display">
              Vamos trabalhar <span className="serif-italic text-accent">juntos</span>?
            </RevealHeading>

            <p className="text-foreground-muted text-lg max-w-md leading-relaxed">
              Tem um projeto em mente? Entre em contato e vamos discutir como
              posso ajudar a transformar sua ideia em realidade.
            </p>

            {/* Linhas de contato */}
            <div>
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="group flex items-baseline justify-between gap-6 py-5 border-t last:border-b"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <span className="mono-label shrink-0">{info.label}</span>
                  <span className="text-foreground font-medium transition-[transform,color] duration-300 group-hover:-translate-x-2 group-hover:text-accent">
                    {info.value}
                  </span>
                </a>
              ))}
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
              <span className="status-dot" />
              <span className="mono-label">Disponível para projetos</span>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <div className="relative">
              {/* Erro de envio — claro, com saída de emergência */}
              <AnimatePresence>
                {submitError && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="mb-8 flex items-baseline gap-4 border-t border-b py-4"
                    style={{ borderColor: 'oklch(0.6 0.22 25 / 0.45)' }}
                  >
                    <span className="mono-label shrink-0 !text-destructive">Erro</span>
                    <div>
                      <p className="text-sm text-foreground">{submitError}</p>
                      <p className="text-xs text-foreground-dim mt-1">
                        Ou me escreva direto:{' '}
                        <a href="mailto:kelven.souza00@gmail.com" className="text-accent link-wipe link-wipe-quiet">
                          kelven.souza00@gmail.com
                        </a>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <SuccessState
                    key="success"
                    firstName={formData.name.trim().split(' ')[0]}
                    onReset={handleReset}
                  />
                ) : (
                  <motion.form
                    key="form"
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                    noValidate
                  >
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
                      <FormField
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Seu nome completo"
                        label="Nome"
                        error={errors.name}
                        disabled={isSubmitting}
                      />
                      <FormField
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        label="Email"
                        error={errors.email}
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Tipo de projeto — pills no tema, sem dropdown nativo */}
                    <div>
                      <div className="flex items-baseline justify-between gap-4 mb-3">
                        <span className="mono-label">Tipo de projeto</span>
                        <span className="font-mono text-[0.625rem] tracking-[0.1em] uppercase text-foreground-dim">
                          Opcional
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2" role="group" aria-label="Tipo de projeto">
                        {projectTypes.map((type) => {
                          const selected = formData.projectType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => toggleProjectType(type)}
                              disabled={isSubmitting}
                              aria-pressed={selected}
                              className={`px-4 py-2 rounded-full border font-mono text-[0.6875rem] tracking-[0.08em] uppercase transition-colors duration-200 ${
                                selected
                                  ? 'text-accent'
                                  : 'text-foreground-muted hover:text-foreground'
                              }`}
                              style={{
                                borderColor: selected
                                  ? 'var(--color-accent)'
                                  : 'var(--color-border)',
                              }}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <FormField
                      id="message"
                      name="message"
                      type="textarea"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Descreva seu projeto, objetivos e prazo..."
                      label="Mensagem"
                      rows={5}
                      error={errors.message}
                      disabled={isSubmitting}
                      hint={messageLength < 10 ? `${messageLength}/10` : `${messageLength}`}
                    />

                    {/* Submit — treme quando a validação barra */}
                    <motion.div
                      key={shakeCount}
                      animate={shakeCount > 0 ? { x: [0, -8, 8, -5, 5, 0] } : undefined}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                    >
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-fill btn-fill-accent w-full disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-3">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                              className="inline-block w-3.5 h-3.5 border border-current border-t-transparent rounded-full"
                            />
                            Enviando…
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Enviar mensagem <span aria-hidden="true">→</span>
                          </span>
                        )}
                      </button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
