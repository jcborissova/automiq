"use client";

import { usePathname } from "next/navigation";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Button from "../components/ui/Button";
import { getLocaleFromPathname, getSiteContent } from "../lib/site-content";

export default function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const content = getSiteContent(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[var(--surface-inverse)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(8,145,178,0.12),transparent_30%),radial-gradient(circle_at_85%_0%,rgba(249,115,22,0.1),transparent_30%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
                {content.footer.title}
              </p>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            </div>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-300 sm:mt-4 sm:leading-7">
              {content.footer.summary}
            </p>
            <p className="mt-2 hidden max-w-md text-sm leading-7 text-slate-400 sm:mt-3 sm:block">
              {content.footer.secondarySummary}
            </p>

            <div className="mt-5 sm:mt-6">
              <Button
                as="a"
                href="#contact"
                size="md"
                rightIcon={<ArrowUpRight className="h-4 w-4" />}
                full
                className="sm:w-auto"
              >
                {content.footer.cta}
              </Button>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-[11px]">
              {content.footer.navTitle}
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:grid-cols-1 sm:gap-0 sm:space-y-2.5">
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

          <div className="space-y-3 sm:space-y-3.5">
            <FooterDetail
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value="info@automiq.dev"
              href="mailto:info@automiq.dev"
            />
            <FooterDetail
              icon={<Phone className="h-4 w-4" />}
              label={locale === "es" ? "Telefono" : "Phone"}
              value="+1 (829) 707-1293"
              href="tel:+18297071293"
            />
            <FooterDetail
              icon={<MapPin className="h-4 w-4" />}
              label="Base"
              value={
                locale === "es"
                  ? "Santo Domingo, Republica Dominicana"
                  : "Santo Domingo, Dominican Republic"
              }
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>
            © {year} {content.footer.title}. {content.footer.rights}
          </p>
          <a
            href="#__main"
            className="inline-flex items-center gap-1.5 transition hover:text-white"
          >
            {locale === "es" ? "Volver arriba" : "Back to top"}
            <ArrowUpRight className="h-3.5 w-3.5" />
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
    <div className="flex gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-3 transition hover:border-white/20 hover:bg-white/8 sm:px-4 sm:py-3.5">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/10 text-cyan-200 sm:h-10 sm:w-10">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-[11px]">
          {label}
        </p>
        <p className="mt-0.5 text-sm leading-6 text-slate-100 sm:mt-1">
          {value}
        </p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} className="block">
      {content}
    </a>
  );
}
