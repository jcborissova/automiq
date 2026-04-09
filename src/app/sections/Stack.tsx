import { DatabaseZap, LayoutDashboard, ShieldCheck } from "lucide-react";
import type { SiteContent } from "../lib/site-content";

type StackProps = {
  content: SiteContent["capabilities"];
};

const iconMap = [DatabaseZap, ShieldCheck, LayoutDashboard];

export default function Stack({ content }: StackProps) {
  return (
    <section className="relative bg-slate-950 py-20 text-white sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.14),transparent_28%)]"
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

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {content.groups.map((group, index) => {
            const Icon = iconMap[index] ?? LayoutDashboard;

            return (
              <article
                key={group.title}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {group.description}
                </p>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-200"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-7 text-slate-300">
          {content.footer}
        </p>
      </div>
    </section>
  );
}
