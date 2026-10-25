export type SiteLocale = 'pt' | 'en';

export function htmlLang(locale: string) {
  return locale === 'en' ? 'en' : 'pt-BR';
}

/** Picks pt or en from a cookie, then from Accept-Language. Anything else stays Portuguese. */
export function negotiateLocale(acceptLanguage: string | null, cookieLocale?: string): SiteLocale {
  if (cookieLocale === 'en' || cookieLocale === 'pt') return cookieLocale;

  const ranges = (acceptLanguage ?? '')
    .split(',')
    .map((part) => {
      const [tagRaw, ...params] = part.trim().split(';');
      const qParam = params.find((param) => param.trim().startsWith('q='));
      const q = qParam ? Number(qParam.trim().slice(2)) : 1;
      return {tag: tagRaw.trim().toLowerCase(), q: Number.isFinite(q) ? q : 0};
    })
    .filter((range) => range.tag && range.tag !== '*')
    .sort((a, b) => b.q - a.q);

  for (const {tag} of ranges) {
    if (tag === 'en' || tag.startsWith('en-')) return 'en';
    if (tag === 'pt' || tag.startsWith('pt-')) return 'pt';
  }

  return 'pt';
}
