"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import {
  getLocaleFromPathname,
  getLocalizedPath,
  getSiteContent,
} from "../lib/site-content";

export default function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const alternateLocale = locale === "es" ? "en" : "es";
  const content = getSiteContent(locale);
  const alternatePath = getLocalizedPath(alternateLocale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div>
            <p className="text-2xl font-semibold tracking-[-0.04em] text-white">
              {content.footer.title}
            </p>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              {content.footer.summary}
            </p>
            <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
              {content.footer.secondarySummary}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                {content.footer.cta}
              </a>
              <Link
                href={alternatePath}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {content.footer.localeCta}
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              {content.footer.navTitle}
            </p>
            <ul className="mt-5 space-y-3">
              {content.nav.items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-300 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <FooterDetail
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value="info@automiq.dev"
              href="mailto:info@automiq.dev"
            />
            <FooterDetail
              icon={<Phone className="h-4 w-4" />}
              label={locale === "es" ? "Teléfono" : "Phone"}
              value="+1 (829) 707-1293"
              href="tel:+18297071293"
            />
            <FooterDetail
              icon={<MapPin className="h-4 w-4" />}
              label={locale === "es" ? "Base" : "Base"}
              value={
                locale === "es"
                  ? "Santo Domingo, República Dominicana"
                  : "Santo Domingo, Dominican Republic"
              }
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {content.footer.title}. {content.footer.rights}
          </p>
          <a
            href="#__main"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            {locale === "es" ? "Volver arriba" : "Back to top"}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterDetail({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          {label}
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-100">{value}</p>
      </div>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <a href={href} className="block transition hover:translate-x-0.5">
      {content}
    </a>
  );
}
