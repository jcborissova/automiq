// src/app/layout.tsx
import "./globals.css";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  // URL base de tu sitio
  metadataBase: new URL("https://automiq.click"),

  // Títulos
  title: {
    default: "AutomIQ — Automatización & Web Engineering",
    template: "%s | AutomIQ",
  },

  description:
    "AutomIQ ayuda a empresas a modernizar sus procesos con automatización (RPA, Power Automate) y desarrollo web profesional en Next.js. Menos tareas repetitivas, más foco en el crecimiento de tu negocio.",

  keywords: [
    "AutomIQ",
    "automatización",
    "RPA",
    "Power Automate",
    "automatización de procesos",
    "desarrollo web",
    "Next.js",
    "integraciones",
    "automatización empresarial",
    "automatización Dominicana",
  ],

  authors: [{ name: "AutomIQ" }],
  creator: "AutomIQ",
  publisher: "AutomIQ",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    },
  },

  alternates: {
    canonical: "https://automiq.click/",
  },

  openGraph: {
    type: "website",
    url: "https://automiq.click/",
    siteName: "AutomIQ",
    title: "AutomIQ — Automatización & Web Engineering",
    description:
      "Automatiza procesos críticos y moderniza tu presencia digital con soluciones en RPA, Power Automate y desarrollo web en Next.js.",
    locale: "es_DO",
    images: [
      {
        url: "https://automiq.click/og-image.png",
        width: 1200,
        height: 630,
        alt: "AutomIQ — Automatización & Web Engineering",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AutomIQ — Automatización & Web Engineering",
    description:
      "Soluciones de automatización y desarrollo web para empresas que quieren escalar sin fricción.",
    images: ["https://automiq.click/og-image.png"],
  },

  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className="
          flex flex-col min-h-screen
          bg-white text-slate-900
          transition-colors duration-300
          antialiased overflow-x-hidden
        "
      >
        <Navbar />
        <main id="__main" className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <Footer />

        <div id="portal-root" />
      </body>
    </html>
  );
}
