import type { Metadata } from "next";
import { getLocalizedPath, getSiteContent, type Locale } from "./site-content";

const OG_IMAGE = "/og-image.svg";

export function buildMetadata(locale: Locale): Metadata {
  const content = getSiteContent(locale);
  const pathname = getLocalizedPath(locale);

  return {
    title: {
      absolute: content.meta.title,
    },
    description: content.meta.description,
    keywords: content.meta.keywords,
    alternates: {
      canonical: pathname,
      languages: {
        es: "/es",
        "es-DO": "/es",
        en: "/en",
        "en-US": "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      url: pathname,
      siteName: "AutomIQ",
      title: content.meta.title,
      description: content.meta.description,
      locale: locale === "es" ? "es_DO" : "en_US",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: content.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
      images: [OG_IMAGE],
    },
  };
}
