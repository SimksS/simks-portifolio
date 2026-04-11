import { siteConfig } from '@/lib/site-config';

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.url}/#person`,
  "name": "Kelven Souza",
  "givenName": "Kelven",
  "familyName": "Souza",
  "jobTitle": "Desenvolvedor Full-Stack",
  "description": "Desenvolvedor Full-Stack especializado em React, Node.js e Python. Especialista em e-commerce (VTEX, Wake, Shopify) e soluções digitais modernas.",
  "url": siteConfig.url,
  "image": {
    "@type": "ImageObject",
    "url": `${siteConfig.url}/logo.png`,
    "width": 1200,
    "height": 630,
    "caption": "Kelven Souza - Desenvolvedor Full-Stack"
  },
  "sameAs": [
    "https://github.com/SimksS",
    "https://linkedin.com/in/kelvensouza"
  ],
  "knowsAbout": [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Python",
    "VTEX",
    "Wake Commerce",
    "Shopify",
    "E-commerce",
    "Desenvolvimento Web",
    "Full-Stack Development"
  ],
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Desenvolvedor Full-Stack",
    "description": "Desenvolvimento de aplicações web e e-commerce",
    "occupationLocation": {
      "@type": "Place",
      "name": "Brasil",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "BR",
        "addressLocality": "Alagoinhas",
        "addressRegion": "BA"
      }
    },
    "estimatedSalary": {
      "@type": "MonetaryAmountDistribution",
      "name": "Remuneração Desenvolvedor Full-Stack",
      "currency": "BRL"
    }
  },
  "worksFor": {
    "@type": "Organization",
    "name": "Wicomm",
    "url": "https://www.wicomm.com.br/",
    "description": "Empresa de tecnologia especializada em soluções de e-commerce"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Instituições de Ensino",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR"
    }
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BR",
    "addressLocality": "Alagoinhas",
    "addressRegion": "BA"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Professional",
    "email": "kelven.souza00@gmail.com",
    "availableLanguage": ["Portuguese", "English"],
    "areaServed": "BR"
  },
  "nationality": {
    "@type": "Country",
    "name": "Brasil"
  }
};

// Structured data para o WebSite
export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  "name": "Kelven Souza Portfolio",
  "url": siteConfig.url,
  "description": "Portfólio de Kelven Souza - Desenvolvedor Full-Stack especializado em e-commerce",
  "publisher": {
    "@id": `${siteConfig.url}/#person`
  },
  "inLanguage": "pt-BR",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteConfig.url}/?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

// Structured data para Professional Service
export const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}/#service`,
  "name": "Kelven Souza - Desenvolvimento Web",
  "description": "Serviços de desenvolvimento full-stack, e-commerce e soluções digitais",
  "provider": {
    "@id": `${siteConfig.url}/#person`
  },
  "areaServed": {
    "@type": "Country",
    "name": "Brasil"
  },
  "serviceType": [
    "Desenvolvimento Web",
    "E-commerce",
    "Aplicações React",
    "APIs Node.js",
    "Integrações VTEX",
    "Integrações Wake Commerce",
    "Integrações Shopify"
  ],
  "url": siteConfig.url,
  "telephone": "",
  "email": "kelven.souza00@gmail.com"
};

const StructuredData = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceStructuredData),
        }}
      />
    </>
  );
};

export default StructuredData;
