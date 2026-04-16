"use client";

import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Clock3,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import DemoForm from "../components/DemoForm";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import Eyebrow from "../components/ui/Eyebrow";
import type { LeadFormLabels, Locale, SiteContent } from "../lib/site-content";

type HeroProps = {
  locale: Locale;
  hero: SiteContent["hero"];
  leadForm: LeadFormLabels;
};

const statusTone: Record<string, string> = {
  Live: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/30",
  QA: "bg-amber-400/15 text-amber-300 ring-amber-400/30",
  Required: "bg-[var(--accent)]/15 text-[var(--accent)] ring-[var(--accent)]/30",
};

export default function Hero({ locale, hero, leadForm }: HeroProps) {
  const [openLeadForm, setOpenLeadForm] = useState(false);

  return (
    <>
      <section
        id="home"
        aria-label={locale === "es" ? "Hero de AutomIQ" : "AutomIQ hero"}
        className="relative isolate scroll-mt-24 overflow-hidden bg-[var(--surface-inverse)] py-16 text-white sm:py-24 lg:py-28"
      >
        <Image
          src="/assets/FondoCode.png"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-30 h-full w-full object-cover opacity-20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(110deg,rgba(2,6,23,0.98)_0%,rgba(2,6,23,0.88)_46%,rgba(2,6,23,0.72)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/3 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/10 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[32rem] w-[32rem] translate-x-1/4 rounded-full bg-cyan-500/10 blur-[120px]"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-14">
            <div className="max-w-2xl">
              <Eyebrow
                tone="dark"
                icon={<Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
              >
                {hero.badge}
              </Eyebrow>

              <h1 className="mt-5 text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:mt-6 sm:text-[3rem] lg:text-[3.5rem] xl:text-[4rem]">
                {hero.title}{" "}
                <span className="bg-gradient-to-r from-cyan-200 via-cyan-300 to-cyan-100 bg-clip-text text-transparent">
                  {hero.highlight}
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-[15px] leading-7 text-slate-300 sm:mt-6 sm:text-[17px] sm:leading-8">
                {hero.description}
              </p>

              <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
                <Button
                  onClick={() => setOpenLeadForm(true)}
                  size="lg"
                  full
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="sm:w-auto"
                >
                  {hero.primaryCta}
                </Button>
                <Button
                  as="a"
                  href="#services"
                  size="lg"
                  variant="inverse"
                  full
                  className="sm:w-auto"
                >
                  {hero.secondaryCta}
                </Button>
              </div>

              <dl className="mt-10 hidden max-w-lg border-t border-white/10 pt-6 sm:grid sm:grid-cols-2 sm:gap-8">
                {hero.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">
                      {stat.value}
                    </dt>
                    <dd className="mt-2 max-w-xs text-sm leading-6 text-slate-400">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <HeroPanel panel={hero.panel} />
          </div>
        </div>
      </section>

      <Modal
        open={openLeadForm}
        onClose={() => setOpenLeadForm(false)}
        title={hero.primaryCta}
      >
        <DemoForm locale={locale} labels={leadForm} source="hero-modal" compact />
      </Modal>
    </>
  );
}

function HeroPanel({ panel }: { panel: SiteContent["hero"]["panel"] }) {
  return (
    <div className="relative hidden lg:block">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(8,145,178,0.18),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.14),transparent_55%)] blur-2xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(155deg,rgba(15,23,42,0.92)_0%,rgba(2,6,23,0.95)_100%)] p-6 shadow-[0_30px_80px_-20px_rgba(8,145,178,0.35)] backdrop-blur-xl xl:p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--accent)]/20 blur-3xl"
        />

        <div className="relative flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
              {panel.eyebrow}
            </p>
            <h3 className="mt-1 text-[1.1rem] font-semibold tracking-tight text-white sm:text-[1.25rem]">
              {panel.title}
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-400/25">
            <CircleDot className="h-3 w-3 animate-pulse" />
            {panel.status}
          </span>
        </div>

        <p className="relative mt-2 text-xs leading-5 text-slate-400">
          {panel.subtitle}
        </p>

        <div className="relative mt-5 grid grid-cols-3 gap-2">
          {panel.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-2.5"
            >
              <p className="text-lg font-semibold tracking-tight text-white">
                {metric.value}
              </p>
              <p className="mt-0.5 text-[10px] leading-4 text-slate-400">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="relative mt-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              {panel.workflowTitle}
            </p>
            <Clock3 className="h-3.5 w-3.5 text-slate-500" />
          </div>
          <div className="mt-2.5 space-y-2">
            {panel.workflowItems.map((item, index) => (
              <div
                key={item.label}
                className="group flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-white/10 bg-white/5 font-mono text-[10px] font-semibold text-cyan-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-white">
                      {item.label}
                    </p>
                    <p className="truncate text-[11px] text-slate-400">
                      {item.detail}
                    </p>
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${
                    statusTone[item.status] ??
                    "bg-white/10 text-slate-300 ring-white/20"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-5 flex items-start gap-2 border-t border-white/10 pt-4">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
          <p className="text-[11px] leading-5 text-slate-400">{panel.footer}</p>
        </div>
      </div>
    </div>
  );
}
