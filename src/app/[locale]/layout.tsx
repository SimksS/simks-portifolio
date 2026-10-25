import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import StructuredData from "@/components/StructuredData";
import ResourcePreloader from "@/components/ResourcePreloader";
import LenisProvider from "@/providers/LenisProvider";
import { HtmlLang } from "@/components/HtmlLang";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  const path = locale === "en" ? "/en" : "";
  const canonical = `${siteConfig.url}${path}`;
  const ogLocale = locale === "en" ? "en_US" : "pt_BR";

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: "%s | Kelven Souza",
    },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
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
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonical,
      siteName: "Kelven Souza Portfolio",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: t("ogAlt"),
        },
      ],
      locale: ogLocale,
      alternateLocale: locale === "en" ? ["pt_BR"] : ["en_US"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("twitterDescription"),
      images: [siteConfig.ogImage],
      creator: "@kelvensouza",
      site: "@kelvensouza",
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
    alternates: {
      canonical,
      languages: {
        "pt-BR": siteConfig.url,
        en: `${siteConfig.url}/en`,
        "x-default": siteConfig.url,
      },
    },
    other: {
      "linkedin:author": siteConfig.social.linkedin,
      "github:author": siteConfig.social.github,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const alternates = `<link rel="alternate" hreflang="pt-BR" href="${siteConfig.url}" /><link rel="alternate" hreflang="en" href="${siteConfig.url}/en" /><link rel="alternate" hreflang="x-default" href="${siteConfig.url}" />`;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div hidden dangerouslySetInnerHTML={{ __html: alternates }} />
      <HtmlLang />
      <StructuredData />
      <ResourcePreloader />
      <LenisProvider>
        <Header />
        {children}
      </LenisProvider>
    </NextIntlClientProvider>
  );
}
