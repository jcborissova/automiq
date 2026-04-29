import "./globals.css";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import type { Metadata, Viewport } from "next";
import LocaleHtmlController from "./components/LocaleHtmlController";

export const metadata: Metadata = {
  metadataBase: new URL("https://automiq.click"),
  applicationName: "AutomIQ",
  title: {
    default: "AutomIQ",
    template: "%s | AutomIQ",
  },
  authors: [{ name: "AutomIQ" }],
  creator: "AutomIQ",
  publisher: "AutomIQ",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className="
          flex flex-col min-h-screen
          bg-[var(--background)] text-[var(--foreground)]
          transition-colors duration-300
          antialiased overflow-x-hidden
        "
      >
        <LocaleHtmlController />
        <Navbar />
        <main id="__main" className="flex-1">
          {children}
        </main>
        <Footer />
        <div id="portal-root" />
      </body>
    </html>
  );
}
