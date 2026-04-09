import {
  Bot,
  BrainCircuit,
  PanelsTopLeft,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { SiteContent } from "../lib/site-content";

type ServicesProps = {
  content: SiteContent["services"];
};

const iconMap = {
  agents: Bot,
  automation: Workflow,
  apps: PanelsTopLeft,
  knowledge: BrainCircuit,
} as const;

export default function Services({ content }: ServicesProps) {
  return (
    <section
      id="services"
      className="relative scroll-mt-28 bg-white py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.10),transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.10),transparent_34%)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
            <Sparkles className="h-3.5 w-3.5" />
            {content.eyebrow}
          </p>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.4rem)] font-semibold tracking-[-0.04em] text-slate-950">
            {content.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            {content.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {content.cards.map((card) => {
            const Icon = iconMap[card.id as keyof typeof iconMap] ?? Sparkles;

            return (
              <article
                key={card.id}
                className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.4)] transition hover:-translate-y-1 hover:border-cyan-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                      {card.eyebrow}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                      {card.title}
                    </h3>
                  </div>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {card.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {card.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
