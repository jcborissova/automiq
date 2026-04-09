import { Plus } from "lucide-react";
import type { SiteContent } from "../lib/site-content";

type FaqProps = {
  content: SiteContent["faq"];
};

export default function Faq({ content }: FaqProps) {
  return (
    <section className="relative bg-slate-50 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
            {content.eyebrow}
          </p>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.1rem)] font-semibold tracking-[-0.04em] text-slate-950">
            {content.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            {content.description}
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {content.items.map((item) => (
            <details
              key={item.question}
              className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_14px_50px_-42px_rgba(15,23,42,0.45)]"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                <span className="text-lg font-semibold tracking-tight text-slate-950">
                  {item.question}
                </span>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition group-open:rotate-45">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
