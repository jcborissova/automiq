// src/app/layout.tsx
import "./globals.css";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AutomIQ — Automation & Web Engineering",
  description: "Desarrollo web moderno y automatizaciones que escalan tu negocio.",
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
        {/* Skip link */}
        <a
          href="#__main"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[1000] focus:top-3 focus:left-3
                     focus:bg-slate-900 focus:text-white focus:px-3 focus:py-2 focus:rounded-md"
        >
          Saltar al contenido
        </a>

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
