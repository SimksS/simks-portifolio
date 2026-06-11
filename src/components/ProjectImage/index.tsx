"use client";

import { useState } from "react";
import { encode } from "qss";

interface ProjectImageProps {
  url: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
}

// Configuração de serviços de screenshot (prioridade por ordem)
const getScreenshotUrl = (
  siteUrl: string,
  width: number = 1200,
  height: number = 630,
): string => {
  const params = encode({
    url: siteUrl,
    screenshot: true,
    meta: false,
    embed: "screenshot.url",
    colorScheme: "dark",
    "viewport.isMobile": true,
    "viewport.deviceScaleFactor": 1,
    "viewport.width": width * 3,
    "viewport.height": height * 3,
  });
  const src = `https://api.microlink.io/?${params}`;

  // Thum.io (grátis sem API key, com watermark)
  return  src;
};

export const ProjectImage = ({
  url,
  alt,
  fill = false,
  className = "",
  sizes,
}: ProjectImageProps) => {
  // Compute URL synchronously so browser lazy-loading applies from first render.
  // Previously this was done in a useEffect which defeated loading="lazy".
  const imageUrl = getScreenshotUrl(url);
  const [error, setError] = useState(false);

  if (error) {
    // Fallback: mostra site em texto ou um placeholder
    return (
      <div
        className={`w-full h-full flex items-center justify-center bg-secondary ${className}`}
        style={{ minHeight: "100%" }}
      >
        <div className="text-center p-4">
          <span className="text-4xl mb-2 block">🌐</span>
          <span className="text-sm text-muted-foreground">
            {new URL(url).hostname}
          </span>
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <img
        src={imageUrl}
        alt={alt}
        className={`object-cover w-full h-full ${className}`}
        sizes={sizes}
        loading="lazy"
        onError={() => setError(true)}
      />
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      width={800}
      height={600}
      className={`object-cover ${className}`}
      loading="lazy"
      onError={() => setError(true)}
    />
  );
};

export default ProjectImage;
