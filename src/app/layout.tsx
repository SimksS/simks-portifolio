import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import StructuredData from "@/components/StructuredData";
import ResourcePreloader from "@/components/ResourcePreloader";

// Otimização de fontes
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://simks.com.br";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kelven Souza - Desenvolvedor Full-Stack | React, Node.js, Python",
    template: "%s | Kelven Souza",
  },
  description: "Desenvolvedor Full-Stack especializado em React, Node.js e Python. Especialista em e-commerce (VTEX, Wake, Shopify) e soluções digitais modernas.",
  keywords: ["desenvolvedor full-stack", "react", "node.js", "python", "vtex", "e-commerce", "next.js", "typescript", "kelven souza", "desenvolvedor", "programador"],
  authors: [{ name: "Kelven Souza", url: siteUrl }],
  creator: "Kelven Souza",
  publisher: "Kelven Souza",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Kelven Souza - Desenvolvedor Full-Stack",
    description: "Especialista em desenvolvimento web e e-commerce com React, Node.js e Python.",
    url: siteUrl,
    siteName: "Kelven Souza Portfolio",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Kelven Souza - Desenvolvedor Full-Stack",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kelven Souza - Desenvolvedor Full-Stack",
    description: "Especialista em desenvolvimento web e e-commerce com React, Node.js e Python.",
    images: ["/logo.png"],
    creator: "@kelvensouza",
    site: "@kelvensouza",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  alternates: {
    canonical: siteUrl,
  },
  other: {
    "linkedin:author": "https://linkedin.com/in/kelvensouza",
    "github:author": "https://github.com/SimksS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ResourcePreloader />
        <Header />
        {children}
      </body>
    </html>
  );
}
