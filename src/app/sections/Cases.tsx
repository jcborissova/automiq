/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useState, useMemo } from "react";
import { ExternalLink } from "lucide-react";
import ProjectModal from "../components/ProjectModal";

type Project = {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  video: string;
  image: string;
};

const projects: Project[] = [
  {
    title: "Plataforma Web Corporativa",
    category: "Desarrollo Web / Next.js",
    description:
      "Plataforma optimizada para entidades financieras (SEO, rendimiento y escalabilidad) en Next.js desplegada en Azure.",
    technologies: ["Next.js", "Tailwind CSS", "Azure", "TypeScript"],
    video: "https://www.youtube.com/embed/j0lO_0jlGxQ",
    image: "/assets/cases/Case1.png",
  },
  {
    title: "Automatización de Procesos Financieros",
    category: "Power Automate / Microsoft 365",
    description:
      "Automatización de reportes y validaciones contables con Power Automate, reduciendo tiempos y errores manuales.",
    technologies: ["Power Automate", "SharePoint", "Excel Online"],
    video: "https://www.youtube.com/embed/D4q83lK6JqA",
    image: "/assets/cases/Case2.png",
  },
  {
    title: "RPA e Inteligencia Artificial Operativa",
    category: "Automation Anywhere / IA Predictiva",
    description:
      "Bots cognitivos con clasificación inteligente y aprendizaje continuo para procesar formularios a escala.",
    technologies: ["Automation Anywhere", "Python", "AI Models", "APIs"],
    video: "https://www.youtube.com/embed/ksX7WUXQxnk",
    image: "/assets/cases/Case3.png",
  },
];

export default function Cases() {
  const [selected, setSelected] = useState<Project | null>(null);
  const prefersReduced = useReducedMotion();

  const easeOutExpo = [0.22, 1, 0.36, 1] as const;

  // Padre del grid (no reanima al tocar el header)
  const container: Variants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.12, when: "beforeChildren" },
      },
    }),
    []
  );

  // Tarjetas
  const card: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 28, scale: 0.985 },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.55, ease: easeOutExpo },
      },
      hover: prefersReduced
        ? {}
        : { y: -2, scale: 1.01, transition: { duration: 0.25, ease: easeOutExpo } },
      tap: prefersReduced ? {} : { scale: 0.995, transition: { duration: 0.12, ease: easeOutExpo } },
    }),
    [prefersReduced]
  );

  return (
    <section
      id="casos"
      className="relative py-20 sm:py-24 md:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center overflow-hidden"
      aria-labelledby="cases-heading"
    >
      {/* Fondo sutil, sin filtros caros detrás del header */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_0%,rgba(56,189,248,0.10),rgba(16,185,129,0.08)_35%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(2,6,23,0.6)_70%,rgba(2,6,23,0.9)_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <h2
          id="cases-heading"
          className="text-[clamp(28px,4.5vw,44px)] font-extrabold text-white tracking-tight"
        >
          Casos de <span className="text-emerald-400">Éxito</span>
        </h2>

        <p className="mt-3 sm:mt-4 max-w-3xl mx-auto text-slate-300 leading-relaxed text-[clamp(14px,2.3vw,18px)]">
          Proyectos reales de <b>AutomIQ</b> combinando <b>automatización</b>, <b>IA</b> y{" "}
          <b>desarrollo web moderno</b> para transformar procesos empresariales.
        </p>

        {/* Grid (no vuelve a animar al topar con el header) */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.18,
            // margen negativo superior: considera el header fijo y evita re-entradas
            margin: "0px 0px -140px 0px",
          }}
          className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7"
        >
          {projects.map((p, i) => (
            <motion.article
              key={p.title + i}
              variants={card}
              whileHover="hover"
              whileTap="tap"
              tabIndex={0}
              role="button"
              aria-label={`Ver ${p.title}`}
              onClick={() => setSelected(p)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelected(p)}
              className="group relative overflow-hidden rounded-2xl text-left
                         ring-1 ring-white/5 hover:ring-emerald-400/40 transition
                         bg-white/5 dark:bg-white/[0.04]
                         shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]
                         min-h-[320px] flex flex-col
                         transform-gpu will-change-transform"
            >
              {/* Imagen y overlays (sin blur de fondo para evitar repaints con header) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover scale-105 opacity-80 
                             transition-transform duration-[900ms] ease-out 
                             group-hover:scale-110 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_120%,rgba(0,0,0,0.55),transparent_60%)]" />
              </div>

              {/* Contenido */}
              <div className="relative flex-1 px-4 sm:px-5 pt-4 pb-5">
                <p className="text-[11px] sm:text-xs uppercase tracking-wider text-emerald-400/90 font-semibold">
                  {p.category}
                </p>

                <h3 className="mt-1 text-[clamp(16px,2.5vw,20px)] font-bold text-white leading-snug">
                  {p.title}
                </h3>

                <p className="mt-2 text-slate-300/95 text-[13.5px] sm:text-[14.5px] leading-relaxed line-clamp-3">
                  {p.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.technologies.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-2.5 py-1 text-[11.5px] tracking-wide
                                 text-slate-200 bg-white/[0.06] ring-1 ring-white/10
                                 group-hover:bg-white/[0.10] group-hover:ring-white/20 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex">
                  <span className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold
                                   text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    Ver proyecto
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </div>
              </div>

              {/* Glow hover sutil */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 
                           transition-opacity duration-500
                           [background:radial-gradient(80%_60%_at_50%_20%,rgba(16,185,129,0.18),transparent)]"
              />
            </motion.article>
          ))}
        </motion.div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
