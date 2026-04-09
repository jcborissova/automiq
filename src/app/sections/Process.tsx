import type { SiteContent } from "../lib/site-content";

type ProcessProps = {
  content: SiteContent["process"];
};

export default function Process({ content }: ProcessProps) {
  return (
    <section
      id="process"
      className="relative scroll-mt-28 bg-slate-50 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="max-w-xl">
            <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {content.eyebrow}
            </p>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.3rem)] font-semibold tracking-[-0.04em] text-slate-950">
              {content.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {content.description}
            </p>
          </div>

          <div className="space-y-5">
            {content.steps.map((step, index) => (
              <article
                key={step.title}
                className="grid gap-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_60px_-42px_rgba(15,23,42,0.38)] md:grid-cols-[84px_1fr]"
              >
                <div className="flex items-center">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-lg font-semibold text-white">
                    0{index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    {step.description}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {step.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
