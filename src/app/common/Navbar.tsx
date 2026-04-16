"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Button from "../components/ui/Button";
import {
  getLocaleFromPathname,
  getLocalizedPath,
  getSiteContent,
} from "../lib/site-content";

export default function Navbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const content = useMemo(() => getSiteContent(locale), [locale]);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const menuLabel = locale === "es" ? "Abrir menu" : "Open menu";
  const closeLabel = locale === "es" ? "Cerrar menu" : "Close menu";
  const navSectionLabel = locale === "es" ? "Navegacion" : "Navigation";
  const contactHint =
    locale === "es"
      ? "Respondemos en menos de 24 horas habiles."
      : "We reply within one business day.";

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-[var(--border)] bg-white/90 shadow-[var(--shadow-sm)] backdrop-blur-xl"
            : "border-transparent bg-[var(--background)]/70 backdrop-blur-sm"
        }`}
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex min-h-[68px] items-center justify-between gap-4 sm:min-h-[76px] lg:min-h-[84px] lg:gap-8">
            <Link
              href={getLocalizedPath(locale)}
              className="group relative flex shrink-0 items-center gap-2.5"
              aria-label="AutomIQ"
            >
              <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-lg bg-[var(--ink-950)] shadow-[var(--shadow-sm)] transition group-hover:shadow-[var(--shadow-md)] sm:h-10 sm:w-10">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,145,178,0.25),transparent_55%,rgba(249,115,22,0.18))] opacity-70"
                />
                <span className="relative text-[0.95rem] font-bold leading-none tracking-tight text-white sm:text-base">
                  A
                </span>
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[var(--accent)] ring-2 ring-[var(--background)]"
                />
              </span>
              <span className="text-[1.45rem] font-semibold leading-none tracking-[-0.025em] text-[var(--ink-950)] sm:text-[1.65rem] lg:text-[1.75rem]">
                AutomIQ
              </span>
            </Link>

            <div className="hidden flex-1 items-center justify-center gap-8 xl:gap-10 lg:flex">
              {content.nav.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group relative py-2 text-[14px] font-semibold tracking-tight text-[var(--ink-700)] transition hover:text-[var(--ink-950)]"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-[var(--accent)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </a>
              ))}
            </div>

            <div className="hidden lg:flex">
              <Button
                as="a"
                href="#contact"
                size="md"
                rightIcon={<ArrowUpRight className="h-4 w-4" />}
                className="shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]"
              >
                {content.nav.primaryCta}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--ink-950)] shadow-[var(--shadow-xs)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-raised)] lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? closeLabel : menuLabel}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </nav>
        </div>
      </header>

      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-md transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label={menuLabel}
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col overflow-hidden bg-[var(--surface-inverse)] text-white shadow-[var(--shadow-xl)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-[var(--accent)]/20 blur-3xl"
        />

        <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-5">
          <Link
            href={getLocalizedPath(locale)}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
            aria-label="AutomIQ"
          >
            <span className="text-xl font-semibold leading-none tracking-tight">
              AutomIQ
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10"
            aria-label={closeLabel}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative flex-1 overflow-y-auto px-6 pb-6 pt-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            {navSectionLabel}
          </p>

          <nav className="mt-4 flex flex-col divide-y divide-white/5 border-y border-white/5">
            {content.nav.items.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  transitionDelay: open ? `${120 + index * 55}ms` : "0ms",
                }}
                className={`group flex items-center justify-between py-4 transition-all duration-500 ease-out ${
                  open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
              >
                <span className="flex items-baseline gap-4">
                  <span className="w-6 text-[11px] font-mono font-medium text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-semibold tracking-tight text-white transition group-hover:text-[var(--accent)]">
                    {item.label}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" />
              </a>
            ))}
          </nav>

          <p className="mt-8 text-sm leading-relaxed text-white/55">
            {content.nav.brandTagline}. {contactHint}
          </p>
        </div>

        <div className="relative border-t border-white/10 bg-black/20 px-6 py-5">
          <Button
            as="a"
            href="#contact"
            onClick={() => setOpen(false)}
            size="lg"
            full
            rightIcon={<ArrowUpRight className="h-4 w-4" />}
          >
            {content.nav.primaryCta}
          </Button>
        </div>
      </aside>
    </>
  );
}
