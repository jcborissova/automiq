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
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drawer infra
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const close = useCallback(() => setOpen(false), []);
  const openDrawer = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    lastFocusedRef.current = document.activeElement as HTMLElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);

    const first = drawerRef.current?.querySelector<HTMLElement>(
      'button, a, [tabindex]:not([tabindex="-1"])'
    );
    first?.focus();

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      lastFocusedRef.current?.focus?.();
    };
  }, [open, close]);

  const handleGo = (href: string) => {
    scrollTo(href);
    close();
  };

  // Header states (sin dark:)
  const headerBg = scrolled
    ? "bg-white/90 shadow-[0_6px_24px_rgba(0,0,0,0.05)]"
    : "bg-transparent";

  const desktopShell = scrolled
    ? ""
    : "lg:bg-white/75 lg:backdrop-blur-xl lg:rounded-full lg:px-3 lg:py-1";

  const linkTone = scrolled
    ? "text-slate-800 hover:text-sky-600"
    : "lg:text-slate-900 lg:hover:text-sky-700 text-slate-100";

  const burgerTopState =
    "text-white mix-blend-difference drop-shadow-[0_0_1px_rgba(0,0,0,0.35)]";
  const burgerScrolledState = "text-slate-900";

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${headerBg}`}>
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
        {/* Logo */}
        <button
          onClick={() => scrollTo("body")}
          className="text-xl md:text-2xl font-extrabold tracking-tight text-transparent bg-clip-text 
                     bg-gradient-to-r from-sky-400 via-emerald-400 to-sky-400 
                     bg-[length:200%_auto] animate-gradient hover:opacity-90 transition"
        >
          AutomIQ
        </button>

        {/* Desktop */}
        <div className={`hidden md:flex items-center gap-6 ${desktopShell}`}>
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`relative text-[15px] font-medium transition group ${linkTone}`}
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-300 group-hover:w-full rounded-full" />
            </button>
          ))}

          <button
            onClick={() => scrollTo("#contacto")}
            className="inline-flex items-center rounded-full bg-gradient-to-tr from-sky-500 to-emerald-500 
                       px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 
                       hover:opacity-90 hover:shadow-emerald-500/25 transition-all duration-300"
          >
            Empezar
          </button>
        </div>

        {/* Mobile: solo hamburguesa */}
        <div className="md:hidden flex items-center">
          <button
            onClick={open ? close : openDrawer}
            className="p-2 rounded-lg hover:bg-black/10 transition"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? (
              <X className={`h-6 w-6 ${scrolled ? burgerScrolledState : burgerTopState}`} />
            ) : (
              <Menu className={`h-6 w-6 ${scrolled ? burgerScrolledState : burgerTopState}`} />
            )}
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        onClick={close}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Drawer (puede ser oscuro fijo por diseño) */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        ref={drawerRef}
        className={`md:hidden fixed right-0 top-0 h-dvh w-[86%] max-w-[420px] z-[70]
          bg-slate-950 text-slate-200 shadow-2xl transition-transform duration-300 will-change-transform
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-base font-semibold">Menú</span>
          <button onClick={close} className="p-2 rounded-lg hover:bg-slate-800/60" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="px-2 py-1">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => handleGo(l.href)}
                  className="w-full flex items-center justify-between px-3 py-4 text-base font-medium
                             hover:bg-slate-800/50 rounded-xl transition"
                >
                  <span>{l.label}</span>
                  <ChevronRight className="h-5 w-5 opacity-70" />
                </button>
              </li>
            ))}
          </ul>

          <div className="px-3 pt-2 pb-6">
            <button
              onClick={() => handleGo("#contacto")}
              className="w-full rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-500 
                         px-5 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition"
            >
              Empezar Proyecto
            </button>
          </div>
        </nav>
      </aside>
    </header>
  );
}
