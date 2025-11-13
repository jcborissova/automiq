"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drawer a11y infra
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const close = useCallback(() => setOpen(false), []);
  const openDrawer = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    lastFocusedRef.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);

    const first = drawerRef.current?.querySelector<HTMLElement>(
      'button, a, [tabindex]:not([tabindex="-1"])'
    );
    first?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      lastFocusedRef.current?.focus?.();
    };
  }, [open, close]);

  const handleGo = (href: string) => {
    scrollTo(href);
    close();
  };

  // Header styles
  const headerBg =
    "supports-[backdrop-filter]:backdrop-blur-md transition-all duration-300 border-b " +
    (scrolled
      ? "bg-white/92 dark:bg-slate-950/90 border-slate-200/80 dark:border-slate-800"
      : "bg-white/80 dark:bg-slate-950/80 border-transparent");

  const linkBase =
    "relative text-[15px] font-medium tracking-[0.02em] transition-colors focus:outline-none " +
    "focus-visible:ring-2 focus-visible:ring-sky-500/60 rounded-md px-2 py-1.5";

  const linkTone =
    "text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white";

  const underline =
    "pointer-events-none absolute left-0 -bottom-0.5 h-[2px] w-0 rounded-full " +
    "bg-sky-500/80 dark:bg-sky-400/80 transition-all duration-300 group-hover:w-full";

  const ctaPrimary =
    "inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm " +
    "font-semibold text-white shadow-sm ring-1 ring-slate-900/10 transition " +
    "hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:ring-white/10 dark:hover:bg-white/90";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${headerBg}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 md:py-5">
        {/* Wordmark + tagline */}
        <button
          onClick={() => scrollTo("body")}
          className="inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 rounded-md"
          aria-label="Ir al inicio"
        >
          <div className="flex items-center gap-2">
            <span className="text-[22px] md:text-[24px] font-extrabold tracking-tight text-slate-900 dark:text-white">
              AutomIQ
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500/90 dark:bg-emerald-400/90" />
          </div>
          <span className="hidden md:inline-flex items-center text-[12px] font-medium text-slate-500 dark:text-slate-400 border-l border-slate-200/80 dark:border-slate-700 pl-3">
            Automation &amp; Web Engineering
          </span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-4 lg:gap-6">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className={`group ${linkBase} ${linkTone}`}
              >
                {l.label}
                <span className={underline} />
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("#contacto")}
            className={ctaPrimary}
          >
            Agenda una llamada
          </button>
        </div>

        {/* Mobile burger */}
        <div className="md:hidden">
          <button
            onClick={open ? close : openDrawer}
            className="p-2.5 rounded-full border border-slate-200/80 bg-white/80 shadow-sm hover:bg-slate-50 transition 
                       dark:border-slate-700 dark:bg-slate-900/80 dark:hover:bg-slate-800
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? (
              <X className="h-5 w-5 text-slate-900 dark:text-slate-100" />
            ) : (
              <Menu className="h-5 w-5 text-slate-900 dark:text-slate-100" />
            )}
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-300
          ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
        onClick={close}
      >
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
      </div>

      {/* Drawer */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        ref={drawerRef}
        className={`md:hidden fixed right-0 top-0 z-[70] h-dvh w-[86%] max-w-[420px]
          bg-white text-slate-900 shadow-2xl ring-1 ring-slate-200 transition-transform duration-300 
          dark:bg-slate-950 dark:text-slate-200 dark:ring-white/10
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header drawer */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col">
            <span className="text-base font-semibold">AutomIQ</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Automation &amp; Web Engineering
            </span>
          </div>
          <button
            onClick={close}
            className="p-2 rounded-lg hover:bg-slate-900/5 dark:hover:bg-white/10 transition
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="px-2 py-1">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => handleGo(l.href)}
                  className="w-full flex items-center justify-between px-3 py-4 text-base font-medium
                             hover:bg-slate-900/5 rounded-xl transition dark:hover:bg-white/10
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60"
                >
                  <span>{l.label}</span>
                  <ChevronRight className="h-5 w-5 opacity-70" />
                </button>
              </li>
            ))}
          </ul>

          <div className="px-3 pt-3 pb-6">
            <button
              onClick={() => handleGo("#contacto")}
              className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white 
                         shadow-sm ring-1 ring-slate-900/10 transition hover:bg-slate-800
                         dark:bg-white dark:text-slate-900 dark:ring-white/10 dark:hover:bg-white/90
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60"
            >
              Agenda una llamada
            </button>
          </div>
        </nav>

        {/* Footer mini info */}
        <div className="mt-auto px-5 py-4 text-xs text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} AutomIQ — Web · Automatizaciones · Integraciones
        </div>
      </aside>
    </header>
  );
}
