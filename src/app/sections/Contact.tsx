import { Mail, MapPin, Phone } from "lucide-react";
import DemoForm from "../components/DemoForm";
import type { LeadFormLabels, Locale, SiteContent } from "../lib/site-content";

type ContactProps = {
  locale: Locale;
  content: SiteContent["contact"];
  leadForm: LeadFormLabels;
};

const detailIcons = {
  Email: Mail,
  Phone: Phone,
  "Teléfono": Phone,
  Base: MapPin,
};

export default function Contact({ locale, content, leadForm }: ContactProps) {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-[var(--surface-raised)] py-14 text-[var(--ink-950)] sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-text)]">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] tracking-normal text-[var(--ink-950)] sm:text-[2.75rem]">
              {content.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-[var(--ink-700)]">
              {content.description}
            </p>

            <div className="mt-7 grid gap-3">
              {content.details.map((detail) => {
                const Icon =
                  detailIcons[detail.label as keyof typeof detailIcons] ?? Mail;
                const value = detail.href ? (
                  <a
                    href={detail.href}
                    className="font-medium text-[var(--ink-950)] transition hover:text-[var(--accent-text)]"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <span className="font-medium text-[var(--ink-950)]">
                    {detail.value}
                  </span>
                );

                return (
                  <div key={`${detail.label}-${detail.value}`} className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-white text-[var(--support)]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-500)]">
                        {detail.label}
                      </p>
                      <div className="mt-0.5 text-sm leading-6">{value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 border-t border-[var(--border)] pt-4 text-sm leading-7 text-[var(--ink-700)]">
              {content.responseTime}
            </p>
          </div>

          <details className="rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)] lg:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 text-base font-semibold text-[var(--ink-950)]">
              {content.panelTitle}
              <span className="text-sm font-semibold text-[var(--accent-text)]">
                {locale === "es" ? "Abrir" : "Open"}
              </span>
            </summary>
            <div className="border-t border-[var(--border)] p-5">
              <DemoForm
                locale={locale}
                labels={leadForm}
                source="contact-section"
              />
            </div>
          </details>

          <div className="hidden border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] sm:p-7 lg:block lg:p-8">
            <DemoForm
              locale={locale}
              labels={leadForm}
              source="contact-section"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
