"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollTo = useSmoothScroll();

  const links = [
    { href: "#servicios", label: "Servicios" },
    { href: "#casos", label: "Casos" },
    { href: "#contacto", label: "Contacto" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? "backdrop-blur-xl bg-white/80 dark:bg-slate-900/70 border-b border-slate-200/30 dark:border-slate-700/30 shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
          : "bg-transparent backdrop-blur-none border-transparent"
      }`}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        {/* ✨ Logo */}
        <button
          onClick={() => scrollTo("body")}
          className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text 
                     bg-gradient-to-r from-sky-400 via-emerald-400 to-sky-400 
                     bg-[length:200%_auto] animate-gradient hover:opacity-90 transition"
        >
          AutomIQ
        </button>

        {/* 🧭 Links Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`relative text-[15px] font-medium transition group ${
                scrolled
                  ? "text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-emerald-400"
                  : "text-slate-100 dark:text-slate-300 hover:text-emerald-400"
              }`}
            >
              {link.label}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-300 group-hover:w-full rounded-full" />
            </button>
          ))}

          {/* CTA principal */}
          <button
            onClick={() => scrollTo("#contacto")}
            className="ml-4 inline-flex items-center rounded-full bg-gradient-to-tr from-sky-500 to-emerald-500 
                       px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 
                       hover:opacity-90 hover:shadow-emerald-500/25 transition-all duration-300"
          >
            Empezar
          </button>

          <ThemeToggle />
        </div>

        {/* 📱 Toggle Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-200/40 dark:hover:bg-slate-800/40 transition"
          aria-label="Abrir menú"
        >
          {open ? (
            <X
              className={`h-6 w-6 ${
                scrolled
                  ? "text-slate-800 dark:text-slate-100"
                  : "text-slate-100"
              }`}
            />
          ) : (
            <Menu
              className={`h-6 w-6 ${
                scrolled
                  ? "text-slate-800 dark:text-slate-100"
                  : "text-slate-100"
              }`}
            />
          )}
        </button>
      </nav>

      {/* 📱 Menú Mobile */}
      {open && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-2xl border-t border-slate-800/50 px-6 py-6 space-y-5 animate-fade-in">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => {
                scrollTo(link.href);
                setOpen(false);
              }}
              className="block w-full text-left text-base font-medium text-slate-200 hover:text-emerald-400 transition"
            >
              {link.label}
            </button>
          ))}

          <div className="flex justify-between items-center pt-4 border-t border-slate-800/60">
            <button
              onClick={() => {
                scrollTo("#contacto");
                setOpen(false);
              }}
              className="w-full text-center rounded-full bg-gradient-to-tr from-sky-500 to-emerald-500 
                         px-5 py-2 text-sm font-semibold text-white shadow-md 
                         hover:opacity-90 transition"
            >
              Empezar Proyecto
            </button>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
