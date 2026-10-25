'use client';

import {useEffect} from 'react';
import {useLocale} from 'next-intl';
import {htmlLang} from '@/lib/negotiate-locale';

export function HtmlLang() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = htmlLang(locale);
  }, [locale]);

  return null;
}
