import "./globals.css";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AutomIQ — Automation & Web Engineering",
  description:
    "Desarrollo web moderno y automatizaciones que escalan tu negocio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen transition-colors duration-300 bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
