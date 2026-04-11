'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView } from 'motion/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FormData {
  name: string;
  email: string;
  message: string;
  projectType: string;
}

interface FormFieldProps {
  id: string;
  name: keyof FormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder: string;
  label: string;
  type?: 'text' | 'email' | 'textarea' | 'select';
  rows?: number;
  options?: { value: string; label: string }[];
  error?: string;
  disabled?: boolean;
}

// Animated form field component
const FormField = ({ id, name, value, onChange, placeholder, label, type = 'text', rows = 4, options = [], error, disabled }: FormFieldProps) => {
  const isTextarea = type === 'textarea';
  const isSelect = type === 'select';

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-medium text-foreground">
        <span>{label}</span>
        <span className="text-neon-cyan">*</span>
      </label>

      {isSelect ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="input-cyber appearance-none cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : isTextarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          disabled={disabled}
          placeholder={placeholder}
          className="input-cyber resize-none"
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className="input-cyber"
        />
      )}

      {/* Focus glow effect */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: error ? 1 : value ? 1 : 0 }}
        className={`h-[1px] ${error ? 'bg-destructive' : 'bg-neon-cyan'} origin-left`}
      />

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-destructive flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  );
};

// Success state component
const SuccessState = ({ onReset }: { onReset: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-12"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', delay: 0.2 }}
      className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-green/20 flex items-center justify-center relative"
    >
      {/* Animated rings */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 border-2 border-neon-green rounded-full"
      />
      <svg className="w-10 h-10 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </motion.div>

    <motion.h3
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-2xl font-bold text-foreground mb-2"
    >
      Mensagem enviada!
    </motion.h3>

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="text-muted-foreground mb-6"
    >
      Obrigado pelo contato. Responderei em breve.
    </motion.p>

    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      onClick={onReset}
      className="btn-cyber-outline"
    >
      Enviar outra mensagem
    </motion.button>
  </motion.div>
);

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
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const projectTypes = [
    { value: '', label: 'Selecione o tipo de projeto' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'webapp', label: 'Aplicação Web' },
    { value: 'website', label: 'Site Institucional' },
    { value: 'integration', label: 'Integração' },
    { value: 'other', label: 'Outro' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitError) setSubmitError('');
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (formData.name.length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (!/^[^s@]+@[^s@]+.[^s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.message.length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar mensagem');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar:', error);
      setSubmitError(error instanceof Error ? error.message : 'Erro ao enviar mensagem. Tente novamente.');
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

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'kelven.souza00@gmail.com',
      href: 'mailto:kelven.souza00@gmail.com',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Localização',
      value: 'Bahia, Brasil',
      href: '#',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Disponibilidade',
      value: 'Imediata',
      href: '#',
    },
  ];

  return (
    <section ref={sectionRef} id="contact" className="section-spacing relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neon-purple/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="container-futuristic relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="w-12 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple" />
                <span className="text-neon-cyan font-medium text-sm tracking-wider uppercase">Contato</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
              >
                Vamos trabalhar{' '}
                <span className="gradient-text-animated">juntos</span>?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-lg max-w-md"
              >
                Tem um projeto em mente? Entre em contato e vamos discutir como
                posso ajudar a transformar sua ideia em realidade.
              </motion.p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 8, scale: 1.01 }}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-neon-cyan/30 hover:bg-neon-cyan/5 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-muted group-hover:bg-neon-cyan/10 group-hover:text-neon-cyan transition-colors flex items-center justify-center">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="text-foreground group-hover:text-neon-cyan transition-colors font-medium">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Status indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green" />
              </span>
              <span className="text-sm text-muted-foreground">Disponível para projetos</span>
            </motion.div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="card-futuristic relative overflow-hidden">
              {/* Submit error */}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {submitError}
                  </div>
                </motion.div>
              )}

              {isSubmitted ? (
                <SuccessState onReset={handleReset} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
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

                  <FormField
                    id="projectType"
                    name="projectType"
                    type="select"
                    value={formData.projectType}
                    onChange={handleChange}
                    placeholder=""
                    label="Tipo de Projeto"
                    options={projectTypes}
                    error={errors.projectType}
                    disabled={isSubmitting}
                  />

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
                  />

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="btn-cyber-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                        />
                        Enviando mensagem...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Enviar Mensagem
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </span>
                    )}
                  </motion.button>

                 
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
