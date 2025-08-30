import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import StructuredData from "@/components/StructuredData";
import ResourcePreloader from "@/components/ResourcePreloader";

// Otimização de fontes
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Melhor para performance
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Kelven Souza - Desenvolvedor Full-Stack | React, Node.js, Python",
  description: "Desenvolvedor Full-Stack especializado em React, Node.js e Python. Especialista em e-commerce (VTEX, Wake, Shopify) e soluções digitais modernas.",
  keywords: ["desenvolvedor full-stack", "react", "node.js", "python", "vtex", "e-commerce", "next.js", "typescript"],
  authors: [{ name: "Kelven Souza" }],
  creator: "Kelven Souza",
  publisher: "Kelven Souza",
  openGraph: {
    title: "Kelven Souza - Desenvolvedor Full-Stack",
    description: "Especialista em desenvolvimento web e e-commerce com React, Node.js e Python.",
    url: "https://simks.com.br/",
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
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ResourcePreloader />
        <StructuredData metadata={metadata} />
        <Header />
        {children}
      </body>
    </html>
  );
}
