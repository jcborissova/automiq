/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, useReducedMotion } from "framer-motion";

type Tech = {
  name: string;
  url: string;
  logo: string; // ruta en /public/assets/techs
};

const AUTOMATION_TECH: Tech[] = [
  {
    name: "Power Platform",
    url: "https://learn.microsoft.com/power-platform/",
    logo: "/assets/techs/powerplatform.png",
  },
  {
    name: "n8n",
    url: "https://n8n.io/",
    logo: "/assets/techs/n8n.png",
  },
  {
    name: "Make",
    url: "https://www.make.com/",
    logo: "/assets/techs/make.png",
  },
  {
    name: "Zapier",
    url: "https://zapier.com/",
    logo: "/assets/techs/zapier.png",
  },
  {
    name: "Automation Anywhere",
    url: "https://www.automationanywhere.com/",
    logo: "/assets/techs/automationanywhere.png",
  },
];

const WEB_TECH: Tech[] = [
  {
    name: "React",
    url: "https://react.dev/",
    logo: "/assets/techs/react.png",
  },
  {
    name: "Next.js",
    url: "https://nextjs.org/",
    logo: "/assets/techs/nextjs.png",
  },
  {
    name: "TypeScript",
    url: "https://www.typescriptlang.org/",
    logo: "/assets/techs/typescript.png",
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com/",
    logo: "/assets/techs/tailwind.png",
  },
  {
    name: "Framer Motion",
    url: "https://www.framer.com/motion/",
    logo: "/assets/techs/motion.png",
  },
];

function TechBlock({
  title,
  accentLabel,
  subtitle,
  techs,
  accent,
}: {
  title: string;
  accentLabel: string;
  subtitle: string;
  techs: Tech[];
  accent: "automation" | "web";
}) {
  const prefersReduced = useReducedMotion();

  const accentChipClasses =
    accent === "automation"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-200 dark:ring-emerald-500/30"
      : "bg-sky-50 text-sky-700 ring-sky-100 dark:bg-sky-500/10 dark:text-sky-200 dark:ring-sky-500/30";

  const accentBorder =
    accent === "automation"
      ? "border-emerald-100/70 dark:border-emerald-500/25"
      : "border-slate-100 dark:border-slate-700/60";

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: prefersReduced ? 0 : 0.45 }}
      className={`relative overflow-hidden rounded-3xl bg-white/95 p-6 sm:p-7 lg:p-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] ring-1 ${accentBorder} dark:bg-slate-950/95`}
    >
      {/* Glow muy sutil en el borde superior, similar al hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-16 rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),transparent_60%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.12),transparent_60%)] opacity-60"
      />

      <div className="relative">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5 max-w-md">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ring-1 ${accentChipClasses}`}
            >
              {accentLabel}
            </span>
            <h3 className="text-[16px] sm:text-[17px] font-semibold text-slate-900 dark:text-white">
              {title}
            </h3>
            <p className="text-[13.5px] text-slate-600 dark:text-slate-300">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Logos */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {techs.map((tech, i) => (
            <motion.a
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: prefersReduced ? 0 : 0.3,
                delay: prefersReduced ? 0 : i * 0.03,
              }}
              className="group flex flex-col items-center gap-2 rounded-2xl bg-slate-50/90 px-3 py-3 ring-1 ring-slate-100 hover:bg-white hover:ring-emerald-200/80 transition-all dark:bg-slate-900/70 dark:ring-slate-700 dark:hover:bg-slate-900 dark:hover:ring-emerald-400/60"
              aria-label={`Tecnología: ${tech.name}`}
            >
              <div className="flex h-14 sm:h-16 items-center justify-center">
                <img
                  src={tech.logo}
                  alt={tech.name}
                  loading="lazy"
                  className="max-h-12 sm:max-h-14 w-auto object-contain opacity-90 group-hover:opacity-100 transition"
                />
              </div>
              <span className="text-[12px] sm:text-[12.5px] font-medium text-slate-700 text-center dark:text-slate-200">
                {tech.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default function Stack() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="tecnologias"
      aria-labelledby="stack-heading"
      className="relative overflow-hidden bg-[#f9fafb] py-20 sm:py-24 border-t border-slate-200/70 dark:border-slate-800 dark:bg-slate-950"
    >
      {/* Fondo en la misma línea del Hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.10),transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.10),transparent_55%)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: prefersReduced ? 0 : 0.45 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] uppercase text-emerald-600/90 dark:text-emerald-400/90">
            Stack centrado en automatización
          </p>
          <h2
            id="stack-heading"
            className="mt-3 text-[clamp(26px,4.4vw,36px)] font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white"
          >
            Primero automatizar, luego la web que lo hace usable
          </h2>
          <p className="mt-3 text-[14.5px] sm:text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            Diseñamos los flujos que eliminan trabajo manual y después construimos las interfaces
            en React que tu equipo usa todos los días para ver, controlar y disparar esos procesos.
          </p>
        </motion.div>

        {/* Bloques de stack */}
        <div className="mt-12 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
          <TechBlock
            accent="automation"
            accentLabel="Automatización"
            title="Capa de automatización como prioridad"
            subtitle="Power Platform, n8n, Make, Zapier y RPA para orquestar tareas, aprobaciones y sincronización de datos alrededor de tu operación."
            techs={AUTOMATION_TECH}
          />

          <TechBlock
            accent="web"
            accentLabel="Web en React"
            title="Interfaces que exponen y controlan esos flujos"
            subtitle="Frontends en React/Next.js, tipados con TypeScript y diseñados con Tailwind y Framer Motion para sentirse rápidos, claros y modernos."
            techs={WEB_TECH}
          />
        </div>

        {/* Mini-CTA alineada al resto del sitio */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: prefersReduced ? 0 : 0.4, delay: prefersReduced ? 0 : 0.05 }}
          className="mt-10 text-center"
        >
          <p className="text-[13.5px] text-slate-600 dark:text-slate-300 mb-3">
            Partimos de tus procesos y elegimos la combinación de tecnología que tenga más impacto
            en menos tiempo.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-slate-900/10 transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:ring-white/10 dark:hover:bg-white/90"
          >
            Ver qué podríamos automatizar primero
          </a>
        </motion.div>
      </div>
    </section>
  );
}
