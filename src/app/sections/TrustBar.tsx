import { ArrowRightLeft } from "lucide-react";
import type { SiteContent } from "../lib/site-content";

type TrustBarProps = {
  content: SiteContent["trustBar"];
};

export default function TrustBar({ content }: TrustBarProps) {
  return (
    <section className="border-y border-slate-200 bg-slate-50/80">
      <div className="mx-auto grid max-w-7xl gap-3 px-4 py-5 sm:px-6 lg:grid-cols-4 lg:px-8">
        {content.items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-700 shadow-sm"
          >
            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-700">
              <ArrowRightLeft className="h-4 w-4" />
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
