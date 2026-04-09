import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "../lib/site-content";

type UseCasesProps = {
  content: SiteContent["useCases"];
};

export default function UseCases({ content }: UseCasesProps) {
  return (
    <section
      id="use-cases"
      className="relative scroll-mt-28 bg-slate-950 py-20 text-white sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_0%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(16,185,129,0.18),transparent_30%)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            {content.eyebrow}
          </p>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.3rem)] font-semibold tracking-[-0.04em] text-white">
            {content.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            {content.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {content.cards.map((card) => (
            <article
              key={card.title}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.9)] backdrop-blur"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-semibold text-cyan-200">
                  {card.audience}
                </p>
                <ArrowUpRight className="h-5 w-5 text-emerald-300" />
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {card.description}
              </p>
              <div className="mt-6 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 px-4 py-4 text-sm leading-7 text-emerald-100">
                {card.impact}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
