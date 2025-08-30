import { Metadata } from 'next';

interface StructuredDataProps {
  metadata: Metadata;
}

const StructuredData = ({ metadata }: StructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kelven Souza",
    "jobTitle": "Desenvolvedor Full-Stack",
    "description": metadata.description,
    "url": "https://simks.com.br/",
    "image": "/logo.png",
    "sameAs": [
      "https://github.com/SimksS",
      "https://linkedin.com/in/kelvenssouza"
    ],
    "knowsAbout": [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Python",
      "VTEX",
      "E-commerce",
      "Desenvolvimento Web"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Desenvolvedor Full-Stack",
      "occupationLocation": {
        "@type": "Country",
        "name": "Brasil"
      }
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Universidade/Instituição"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
};

export default StructuredData;
