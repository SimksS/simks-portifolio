import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/site-config';

export default async function StructuredData() {
  const t = await getTranslations('schema');
  const topics = t.raw('topics') as string[];
  const serviceTypes = t.raw('serviceTypes') as string[];

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: 'Kelven Souza',
    givenName: 'Kelven',
    familyName: 'Souza',
    jobTitle: t('jobTitle'),
    description: t('description'),
    url: siteConfig.url,
    image: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}${siteConfig.ogImage}`,
      width: 1200,
      height: 630,
      caption: t('imageCaption'),
    },
    sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
    knowsAbout: topics,
    hasOccupation: {
      '@type': 'Occupation',
      name: t('occupationName'),
      description: t('occupationDescription'),
      occupationLocation: {
        '@type': 'Place',
        name: t('country'),
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'BR',
          addressLocality: 'Alagoinhas',
          addressRegion: 'BA',
        },
      },
      estimatedSalary: {
        '@type': 'MonetaryAmountDistribution',
        name: t('salaryName'),
        currency: 'BRL',
      },
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Wicomm',
      url: 'https://www.wicomm.com.br/',
      description: t('worksForDescription'),
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressLocality: 'Alagoinhas',
      addressRegion: 'BA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Professional',
      email: siteConfig.email,
      availableLanguage: ['Portuguese', 'English'],
      areaServed: 'BR',
    },
    nationality: {
      '@type': 'Country',
      name: t('country'),
    },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: 'Kelven Souza Portfolio',
    url: siteConfig.url,
    description: t('websiteDescription'),
    publisher: { '@id': `${siteConfig.url}/#person` },
    inLanguage: t('inLanguage'),
  };

  const service = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}/#service`,
    name: t('serviceName'),
    description: t('serviceDescription'),
    provider: { '@id': `${siteConfig.url}/#person` },
    areaServed: {
      '@type': 'Country',
      name: t('serviceArea'),
    },
    serviceType: serviceTypes,
    url: siteConfig.url,
    email: siteConfig.email,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
    </>
  );
}
