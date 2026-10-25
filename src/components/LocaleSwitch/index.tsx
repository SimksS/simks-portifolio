'use client';

import {useLocale, useTranslations} from 'next-intl';
import {getPathname} from '@/i18n/navigation';
import type {AppLocale} from '@/i18n/routing';

const LOCALES = ['pt', 'en'] as const;

export function LocaleSwitch() {
  const locale = useLocale();
  const t = useTranslations('nav');

  const go = (next: AppLocale) => {
    if (next === locale) return;
    const hash = window.location.hash;
    document.cookie = `NEXT_LOCALE=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
    const base = getPathname({href: '/', locale: next});
    window.location.assign(`${base}${hash}`);
  };

  return (
    <div className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.18em] uppercase">
      {LOCALES.map((code, index) => {
        const active = locale === code;
        return (
          <span key={code} className="flex items-center gap-3">
            {index > 0 && <span className="text-foreground-dim">/</span>}
            <button
              type="button"
              onClick={() => go(code)}
              aria-pressed={active}
              aria-label={code === 'en' ? t('switchToEn') : t('switchToPt')}
              className={`transition-colors duration-200 ${
                active ? 'text-accent' : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              {code === 'pt' ? 'PT' : 'EN'}
            </button>
          </span>
        );
      })}
    </div>
  );
}
