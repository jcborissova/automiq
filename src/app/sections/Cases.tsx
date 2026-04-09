import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import type { SiteContent } from "../lib/site-content";

type CasesProps = {
  content: SiteContent["cases"];
};

export default function Cases({ content }: CasesProps) {
  return (
    <section
      id="cases"
      className="relative scroll-mt-28 bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
            {content.eyebrow}
          </p>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.3rem)] font-semibold tracking-[-0.04em] text-slate-950">
            {content.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            {content.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {content.cards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_-42px_rgba(15,23,42,0.42)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>

              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                  {card.sector}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {card.summary}
                </p>

                <ul className="mt-5 space-y-3">
                  {card.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                    >
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {card.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
