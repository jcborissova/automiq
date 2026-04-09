"use client";

import { ArrowRight, Bot, Sparkles, Workflow } from "lucide-react";
import { useState } from "react";
import LeadForm from "../components/LeadForm";
import Modal from "../components/ui/Modal";
import type { LeadFormLabels, Locale, SiteContent } from "../lib/site-content";

type HeroProps = {
  locale: Locale;
  hero: SiteContent["hero"];
  leadForm: LeadFormLabels;
};

export default function Hero({ locale, hero, leadForm }: HeroProps) {
  const [openLeadForm, setOpenLeadForm] = useState(false);

  return (
    <>
      <section
        aria-label="AutomIQ hero"
        className="relative overflow-hidden bg-[var(--background)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.14),transparent_32%),linear-gradient(180deg,rgba(248,250,252,0.96)_0%,rgba(255,255,255,1)_55%,rgba(241,245,249,0.96)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]"
        />

        <div className="mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/80 bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              {hero.badge}
            </div>

            <h1 className="mt-6 max-w-3xl text-[clamp(2.7rem,7vw,5.35rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-slate-950">
              {hero.title}{" "}
              <span className="bg-[linear-gradient(120deg,#0f172a_0%,#0891b2_46%,#10b981_100%)] bg-clip-text text-transparent">
                {hero.highlight}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-[1.04rem] leading-8 text-slate-600">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setOpenLeadForm(true)}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {hero.primaryCta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                {hero.secondaryCta}
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {hero.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-slate-200/80 bg-white/75 px-4 py-4 shadow-sm backdrop-blur"
                >
                  <p className="text-sm font-semibold text-slate-950">{stat.value}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>

            <ul className="mt-8 space-y-3">
              {hero.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                >
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                    <Bot className="h-3.5 w-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute inset-x-6 top-8 -z-10 h-56 rounded-[2.5rem] bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.28),transparent_58%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.20),transparent_62%)] blur-3xl" />

            <div className="rounded-[2rem] border border-slate-200/70 bg-white/85 p-4 shadow-[0_28px_90px_-36px_rgba(15,23,42,0.38)] backdrop-blur sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                    {hero.panel.eyebrow}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    {hero.panel.title}
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                    {hero.panel.subtitle}
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {hero.panel.status}
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {hero.panel.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4"
                  >
                    <p className="text-xl font-semibold tracking-tight text-slate-950">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[1.75rem] bg-slate-950 p-5 text-white">
                <div className="flex items-center gap-2 text-sm font-semibold text-cyan-300">
                  <Workflow className="h-4 w-4" />
                  {hero.panel.workflowTitle}
                </div>
                <div className="mt-4 space-y-3">
                  {hero.panel.workflowItems.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-white">{item.label}</p>
                        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {hero.panel.footer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        open={openLeadForm}
        onClose={() => setOpenLeadForm(false)}
        title={hero.primaryCta}
      >
        <LeadForm locale={locale} labels={leadForm} source="hero-modal" compact />
      </Modal>
    </>
  );
}
