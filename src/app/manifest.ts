import type { MetadataRoute } from 'next';
import { cookies, headers } from 'next/headers';
import { negotiateLocale } from '@/lib/negotiate-locale';
import pt from '../../messages/pt.json';
import en from '../../messages/en.json';

export const dynamic = 'force-dynamic';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const locale = negotiateLocale(
    headerStore.get('accept-language'),
    cookieStore.get('NEXT_LOCALE')?.value,
  );
  const copy = locale === 'en' ? en.meta : pt.meta;

  return {
    name: copy.manifestName,
    short_name: 'Kelven Souza',
    description: copy.manifestDescription,
    start_url: locale === 'en' ? '/en' : '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    orientation: 'portrait',
    scope: '/',
    icons: [
      {
        src: '/favicon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['portfolio', 'developer', 'web', 'technology'],
    lang: locale === 'en' ? 'en' : 'pt-BR',
    dir: 'ltr',
    prefer_related_applications: false,
  };
}
