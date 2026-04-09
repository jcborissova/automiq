import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import LeadForm from "../components/LeadForm";
import type { LeadFormLabels, Locale, SiteContent } from "../lib/site-content";

type ContactProps = {
  locale: Locale;
  content: SiteContent["contact"];
  leadForm: LeadFormLabels;
};

const detailIcons = {
  Email: Mail,
  Phone: Phone,
  Teléfono: Phone,
  Base: MapPin,
  default: Clock3,
};

export default function Contact({ locale, content, leadForm }: ContactProps) {
  return (
    <section
      id="contact"
      className="relative scroll-mt-28 overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),transparent_36%)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
            {content.eyebrow}
          </p>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.3rem)] font-semibold tracking-[-0.04em] text-slate-950">
            {content.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            {content.description}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-46px_rgba(15,23,42,0.34)] sm:p-8">
            <LeadForm locale={locale} labels={leadForm} source="contact-section" />
          </div>

          <aside className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_24px_80px_-46px_rgba(15,23,42,0.5)] sm:p-8">
            <h3 className="text-2xl font-semibold tracking-tight text-white">
              {content.panelTitle}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {content.panelDescription}
            </p>

            <ol className="mt-6 space-y-4">
              {content.nextSteps.map((step, index) => (
                <li
                  key={step}
                  className="grid grid-cols-[42px_1fr] gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/10 text-sm font-semibold text-cyan-200">
                    0{index + 1}
                  </span>
                  <span className="text-sm leading-7 text-slate-200">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-6 space-y-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              {content.details.map((detail) => {
                const Icon =
                  detailIcons[detail.label as keyof typeof detailIcons] ??
                  detailIcons.default;

                const value = detail.href ? (
                  <a
                    href={detail.href}
                    className="text-slate-100 transition hover:text-cyan-200"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <span className="text-slate-100">{detail.value}</span>
                );

                return (
                  <div key={`${detail.label}-${detail.value}`} className="flex gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {detail.label}
                      </p>
                      <div className="mt-1 text-sm leading-6">{value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 px-4 py-4 text-sm leading-7 text-emerald-100">
              {content.responseTime}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
