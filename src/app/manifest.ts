import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kelven Souza - Desenvolvedor Full-Stack',
    short_name: 'Kelven Souza',
    description: 'Portfólio de Kelven Souza - Desenvolvedor Full-Stack especializado em e-commerce',
    start_url: '/',
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
    lang: 'pt-BR',
    dir: 'ltr',
    prefer_related_applications: false,
  };
}
