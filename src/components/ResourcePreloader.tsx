"use client";

import { useEffect } from 'react';

const ResourcePreloader = () => {
  useEffect(() => {
    // Preload da imagem principal do avatar
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = '/avatar.jpeg';
    link.as = 'image';
    link.type = 'image/jpeg';
    document.head.appendChild(link);

    // Preload do PDF do currículo
    const pdfLink = document.createElement('link');
    pdfLink.rel = 'preload';
    pdfLink.href = '/curriculo-kelven-souza.pdf';
    pdfLink.as = 'document';
    document.head.appendChild(pdfLink);

    // Cleanup
    return () => {
      if (link.parentNode) link.parentNode.removeChild(link);
      if (pdfLink.parentNode) pdfLink.parentNode.removeChild(pdfLink);
    };
  }, []);

  return null;
};

export default ResourcePreloader;
