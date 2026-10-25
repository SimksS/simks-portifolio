import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

const languages = {
  'pt-BR': siteConfig.url,
  en: `${siteConfig.url}/en`,
  'x-default': siteConfig.url,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const anchors = ['', '/#home', '/#about', '/#technologies', '/#ecommerce', '/#projects', '/#contact'];

  return anchors.flatMap((anchor) => {
    const shared = {
      lastModified: new Date(),
      changeFrequency: anchor === '/#projects' ? 'weekly' : 'monthly',
      priority: anchor === '' ? 1 : 0.8,
      alternates: { languages },
    } as const;

    return [
      { url: `${siteConfig.url}${anchor}`, ...shared },
      { url: `${siteConfig.url}/en${anchor}`, ...shared },
    ];
  });
}
