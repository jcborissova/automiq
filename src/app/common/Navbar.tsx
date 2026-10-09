"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setOpen(false);
    window.setTimeout(() => menuButtonRef.current?.focus(), 0);
  };

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
    body.classList.add("mobile-nav-open");
    closeButtonRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      body.style.overflow = previousOverflow;
      body.classList.remove("mobile-nav-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const menuLabel = locale === "es" ? "Abrir menú" : "Open menu";
  const closeLabel = locale === "es" ? "Cerrar menú" : "Close menu";

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-[#091829]/95 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.7)]"
            : "border-white/10 bg-[#091829]/92"
        }`}
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex min-h-[64px] items-center justify-between gap-4 sm:min-h-[68px] lg:min-h-[72px] lg:gap-8">
            <Link
              href={getLocalizedPath(locale)}
              className="group relative flex shrink-0 items-center"
              aria-label="AutomIQ"
            >
              <BrandLogo
                theme="light"
                alt=""
                priority
                className="h-auto w-[136px] transition-opacity duration-200 group-hover:opacity-90 sm:w-[148px] lg:w-[158px]"
                sizes="(max-width: 640px) 136px, (max-width: 1024px) 148px, 158px"
              />
            </Link>

            <div className="hidden flex-1 items-center justify-center gap-7 xl:gap-9 lg:flex">
              {content.nav.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group relative py-2 text-[13px] font-semibold tracking-normal !text-white/78 transition hover:!text-white"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 rounded-full bg-[var(--support)] transition-transform duration-300 ease-out group-hover:scale-x-100"
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
                className="h-10 px-4 text-[13px] shadow-none"
              >
                {content.nav.primaryCta}
              </Button>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((current) => !current)}
              className="z-10 ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/8 !text-white shadow-[var(--shadow-xs)] transition hover:border-white/25 hover:bg-white/12 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? closeLabel : menuLabel}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </nav>
        </div>
      </header>

      {open && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-[60] bg-slate-950/40 transition-opacity duration-200 lg:hidden"
        />
      )}

      {open && (
        <aside
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label={closeLabel}
          className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-xs flex-col bg-[var(--surface-inverse)] text-white shadow-[var(--shadow-xl)] transition-transform duration-200 ease-out lg:hidden"
        >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <Link
            href={getLocalizedPath(locale)}
            onClick={closeMenu}
            className="flex items-center"
            aria-label="AutomIQ"
          >
            <BrandLogo
              theme="light"
              alt=""
              className="h-auto w-[136px]"
              sizes="136px"
            />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMenu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg !text-white/70 transition hover:bg-white/10 hover:!text-white"
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
              onClick={closeMenu}
              className="block rounded-lg px-3 py-3 text-[15px] font-medium !text-white transition hover:bg-white/10 hover:!text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="border-t border-white/10 px-5 py-4">
          <Button
            as="a"
            href="#contact"
            onClick={closeMenu}
            size="md"
            full
            rightIcon={<ArrowUpRight className="h-4 w-4" />}
          >
            {content.nav.primaryCta}
          </Button>
        </div>
        </aside>
      )}
    </>
  );
}
