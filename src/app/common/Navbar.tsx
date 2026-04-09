"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  getLocaleFromPathname,
  getLocalizedPath,
  getSiteContent,
  type Locale,
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

  const headerClassName = scrolled
    ? "border-slate-200/80 bg-white/88 shadow-[0_14px_40px_-28px_rgba(15,23,42,0.4)] backdrop-blur-xl"
    : "border-transparent bg-white/72 backdrop-blur-md";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all sm:px-6 lg:px-8 ${headerClassName}`}
      >
        <Link href={getLocalizedPath(locale)} className="flex items-center gap-3">
          <div>
            <span className="text-xl font-semibold tracking-[-0.04em] text-slate-950">
              AutomIQ
            </span>
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              {content.nav.brandTagline}
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          <div className="flex items-center gap-6">
            {content.nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-700 transition hover:text-slate-950"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LocaleSwitch
              locale={locale}
              label={content.nav.localeLabel}
            />
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {content.nav.primaryCta}
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={`lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className={`fixed inset-0 top-0 z-40 bg-slate-950/35 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
          aria-hidden={!open}
        />

        <div
          id="mobile-navigation"
          className={`fixed inset-x-4 top-20 z-50 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.38)] transition-all ${open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
        >
          <div className="space-y-2">
            {content.nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-slate-800 transition hover:bg-slate-50"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
            <LocaleSwitch
              locale={locale}
              label={content.nav.localeLabel}
              onNavigate={() => setOpen(false)}
            />
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {content.nav.primaryCta}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function LocaleSwitch({
  locale,
  label,
  onNavigate,
}: {
  locale: Locale;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 sm:inline">
        {label}
      </span>
      <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
        <Link
          href="/"
          onClick={onNavigate}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            locale === "es"
              ? "bg-white text-slate-950 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          ES
        </Link>
        <Link
          href="/en"
          onClick={onNavigate}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            locale === "en"
              ? "bg-white text-slate-950 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          EN
        </Link>
      </div>
    </div>
  );
}
