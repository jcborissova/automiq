/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Code2, Workflow } from "lucide-react";
import { type JSX } from "react";

/* =========================
   DATA
========================= */
type Service = {
  icon: JSX.Element;
  title: string;
  subtitle: string;
  copy: string;
  bullets: string[];
  accent: "sky" | "emerald";
  cta: { label: string; href: string };
  image: { src: string; alt: string; chip: string };
};

const SERVICES: Service[] = [
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "Desarrollo Web",
    subtitle: "Next.js · React · SEO técnico",
    copy:
      "Aplicaciones y sitios corporativos pensados para rendimiento, SEO y mantenibilidad. Arquitectura moderna (SSR/SSG) y diseño responsive alineado a tu marca.",
    bullets: [
      "Core Web Vitals en verde (performance, accesibilidad y SEO)",
      "SSR/SSG, edge y CDN con estrategia de caché clara",
      "UI limpia, accesible y lista para iterar",
    ],
    accent: "sky",
    cta: { label: "Hablar del proyecto", href: "#contacto" },
    image: {
      src: "/assets/services/web.png",
      alt: "Dashboard y métricas web",
      chip: "Next.js · SEO · UX",
    },
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: "Automatizaciones Digitales",
    subtitle: "Power Automate · Make · Zapier · RPA",
    copy:
      "Diseñamos y orquestamos flujos entre tus sistemas (APIs, webhooks, bots y RPA) para reducir tareas repetitivas y tener visibilidad de punta a punta.",
    bullets: [
      "Reducción de 60–80% en tareas manuales repetitivas",
      "Bots, flujos y reportes con logs y alertas",
      "Automatizaciones con SLAs claros y monitoreo continuo",
    ],
    accent: "emerald",
    cta: { label: "Evaluar un proceso", href: "#contacto" },
    image: {
      src: "/assets/services/auto.png",
      alt: "Flujos y orquestación",
      chip: "RPA · Power Automate",
    },
  },
];

/* =========================
   UI helpers
========================= */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/30">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
      {children}
    </span>
  );
}

function Bullet({
  tone,
  children,
}: {
  tone: "sky" | "emerald";
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2 text-[13.5px] text-slate-700 dark:text-slate-200">
      <CheckCircle2
        className={`mt-[1px] h-4 w-4 ${
          tone === "emerald" ? "text-emerald-500" : "text-sky-500"
        }`}
      />
      <span>{children}</span>
    </li>
  );
}

/* =========================
   STEP
   - Mobile: tarjeta (imagen arriba, texto abajo)
   - Desktop: layout lado a lado alternando y más grande
========================= */
function Step({ s, index }: { s: Service; index: number }) {
  const prefersReduced = useReducedMotion();
  const reverse = index % 2 === 1;

  return (
    <motion.div
      initial={prefersReduced ? undefined : { opacity: 0, y: 18 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: prefersReduced ? 0.25 : 0.45,
        delay: 0.06 + index * 0.04,
      }}
      className="relative overflow-hidden rounded-3xl bg-white/95 p-4 sm:p-5 ring-1 ring-slate-100 shadow-sm dark:bg-slate-900/95 dark:ring-slate-800 md:p-6 lg:p-8 xl:p-9"
    >
      <div className="grid gap-5 md:gap-7 lg:gap-10 xl:gap-16 md:grid-cols-12 md:items-center">
        {/* IMAGEN — siempre primero en mobile, alterna orden en lg */}
        <div
          className={[
            "relative md:col-span-6",
            reverse ? "lg:order-2" : "lg:order-1",
          ].join(" ")}
        >
          {/* Glow ligero solo en md+ */}
          <div className="pointer-events-none absolute inset-0 -z-10 hidden rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),transparent_60%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.14),transparent_65%)] blur-xl md:block" />

          <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-white dark:ring-slate-700 dark:bg-slate-900">
            <div className="relative aspect-[16/11] md:aspect-[16/9] xl:aspect-[16/7]">
              <Image
                src={s.image.src}
                alt={s.image.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Chip */}
          <div className="absolute right-3 top-3">
            <span className="inline-flex items-center rounded-full bg-white/95 px-2.5 py-1 text-[10.5px] font-semibold text-slate-700 ring-1 ring-slate-200 backdrop-blur-sm dark:bg-slate-900/95 dark:text-slate-100 dark:ring-slate-700">
              {s.image.chip}
            </span>
          </div>
        </div>

        {/* TEXTO */}
        <div
          className={[
            "mt-4 md:mt-0 md:col-span-6",
            reverse ? "lg:order-1" : "lg:order-2",
          ].join(" ")}
        >
          <div className="mb-3 flex items-center gap-3 md:mb-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm ring-1 ring-slate-900/10 dark:bg-white dark:text-slate-900 dark:ring-white/20 md:h-12 md:w-12">
              {s.icon}
            </div>
            <div className="text-left">
              <h3 className="text-[18.5px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-semibold tracking-tight text-slate-900 dark:text-white">
                {s.title}
              </h3>
              <p className="text-[12.5px] lg:text-[13px] text-slate-500 dark:text-slate-400">
                {s.subtitle}
              </p>
            </div>
          </div>

          <p className="text-[14px] md:text-[14.5px] lg:text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            {s.copy}
          </p>

          <ul className="mt-3 space-y-2 md:mt-4">
            {s.bullets.map((b) => (
              <Bullet key={b} tone={s.accent}>
                {b}
              </Bullet>
            ))}
          </ul>

          <a
            href={s.cta.href}
            className="mt-5 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-slate-900/10 transition hover:translate-y-[-1px] hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg.white dark:text-slate-900 dark:ring-white/10 dark:hover:bg-white/90 md:mt-6"
            aria-label={`${s.cta.label} — ${s.title}`}
          >
            {s.cta.label}
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================
   SECTION
========================= */
export default function Services() {
  return (
    <section
      id="servicios"
      className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 sm:py-20 lg:py-28 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      aria-labelledby="services-title"
    >
      {/* Fondo sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-40"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_10%_0%,rgba(56,189,248,0.10),transparent_60%),radial-gradient(900px_500px_at_90%_0%,rgba(16,185,129,0.10),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* header */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <Pill>AutomIQ · Web · Automatizaciones</Pill>
          <h2
            id="services-title"
            className="mt-4 text-[clamp(26px,4.6vw,44px)] font-extrabold leading-[1.08] tracking-tight text-slate-900 dark:text-white"
          >
            Web + Automatización con foco en negocio
          </h2>
          <p className="mt-3 text-[14.5px] sm:text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            Definimos servicios en torno a resultados concretos: menos tareas
            manuales, productos digitales más rápidos y equipos que pueden
            seguir iterando sin depender de terceros.
          </p>
        </div>

        {/* lista de servicios */}
        <div className="space-y-10 sm:space-y-12 lg:space-y-16">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className={
                i > 0
                  ? "pt-4 sm:pt-6 lg:pt-0 lg:border-t lg:border-slate-200/70 lg:pt-10 dark:lg:border-slate-800"
                  : ""
              }
            >
              <Step s={s} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
