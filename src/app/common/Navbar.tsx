"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Button from "../components/ui/Button";
import BrandLogo from "../components/BrandLogo";
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

  const menuLabel = locale === "es" ? "Abrir menú" : "Open menu";
  const closeLabel = locale === "es" ? "Cerrar menú" : "Close menu";

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
              className="group relative flex shrink-0 items-center"
              aria-label="AutomIQ"
            >
              <BrandLogo
                theme="dark"
                alt=""
                priority
                className="h-auto w-[164px] transition-transform duration-200 group-hover:scale-[1.01] sm:w-[176px] lg:w-[188px]"
                sizes="(max-width: 640px) 164px, (max-width: 1024px) 176px, 188px"
              />
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
        className={`fixed inset-0 z-[60] bg-slate-950/40 transition-opacity duration-200 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label={menuLabel}
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-xs flex-col bg-[var(--background)] shadow-[var(--shadow-xl)] transition-transform duration-200 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <Link
            href={getLocalizedPath(locale)}
            onClick={() => setOpen(false)}
            className="flex items-center"
            aria-label="AutomIQ"
          >
            <BrandLogo
              theme="dark"
              alt=""
              className="h-auto w-[148px]"
              sizes="148px"
            />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--ink-700)] transition hover:bg-[var(--surface-raised)] hover:text-[var(--ink-950)]"
            aria-label={closeLabel}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          {content.nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-[15px] font-medium text-[var(--ink-800)] transition hover:bg-[var(--surface-raised)] hover:text-[var(--ink-950)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="border-t border-[var(--border)] px-5 py-4">
          <Button
            as="a"
            href="#contact"
            onClick={() => setOpen(false)}
            size="md"
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
