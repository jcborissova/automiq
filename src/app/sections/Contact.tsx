import { Clock3, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import DemoForm from "../components/DemoForm";
import Eyebrow from "../components/ui/Eyebrow";
import { SectionHeader } from "../components/ui/Section";
import type { LeadFormLabels, Locale, SiteContent } from "../lib/site-content";

type ContactProps = {
  locale: Locale;
  content: SiteContent["contact"];
  leadForm: LeadFormLabels;
};

const detailIcons = {
  Email: Mail,
  Phone: Phone,
  Telefono: Phone,
  Base: MapPin,
  default: Clock3,
};

export default function Contact({ locale, content, leadForm }: ContactProps) {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-[var(--background)] py-16 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(8,145,178,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.06),transparent_32%)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          className="mx-auto"
          eyebrow={
            <Eyebrow icon={<Sparkles className="h-3 w-3" />}>
              {content.eyebrow}
            </Eyebrow>
          }
          title={content.title}
          description={content.description}
        />

        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-md)] sm:p-8">
            <DemoForm
              locale={locale}
              labels={leadForm}
              source="contact-section"
            />
          </div>

          <aside className="relative overflow-hidden rounded-2xl bg-[var(--surface-inverse)] p-5 text-white shadow-[var(--shadow-lg)] sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-60 w-60 rounded-full bg-[var(--accent)]/20 blur-3xl"
            />

            <h3 className="relative text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {content.panelTitle}
            </h3>
            <p className="relative mt-3 text-sm leading-6 text-slate-300 sm:mt-4 sm:leading-7">
              {content.panelDescription}
            </p>

            <ol className="relative mt-5 space-y-3 sm:mt-6 sm:space-y-3">
              {content.nextSteps.map((step, index) => (
                <li
                  key={step}
                  className="grid grid-cols-[36px_1fr] gap-3 rounded-lg border border-white/10 bg-white/5 px-3.5 py-3 sm:grid-cols-[40px_1fr] sm:gap-4 sm:px-4 sm:py-4"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--accent)]/15 text-xs font-mono font-semibold text-[var(--accent)] sm:h-9 sm:w-9 sm:rounded-lg sm:text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="self-center text-sm leading-6 text-slate-200 sm:leading-7">
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            <div className="relative mt-5 space-y-3 border-t border-white/10 pt-5 sm:mt-6 sm:pt-6">
              {content.details.map((detail) => {
                const Icon =
                  detailIcons[detail.label as keyof typeof detailIcons] ??
                  detailIcons.default;

                const value = detail.href ? (
                  <a
                    href={detail.href}
                    className="text-slate-100 transition hover:text-[var(--accent)]"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <span className="text-slate-100">{detail.value}</span>
                );

                return (
                  <div key={`${detail.label}-${detail.value}`} className="flex gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/8 text-cyan-200 sm:h-10 sm:w-10 sm:rounded-lg">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-[11px]">
                        {detail.label}
                      </p>
                      <div className="mt-0.5 text-sm leading-6 sm:mt-1">
                        {value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative mt-5 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3.5 py-3 text-sm leading-6 text-emerald-100 sm:mt-6 sm:px-4 sm:py-3.5 sm:leading-7">
              {content.responseTime}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
