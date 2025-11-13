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
    category: "Desarrollo Web · Next.js",
    description:
      "Sitio corporativo para entidad financiera con enfoque en velocidad, SEO técnico y despliegue continuo en Azure.",
    technologies: ["Next.js", "Tailwind CSS", "Azure", "TypeScript"],
    video: "https://www.youtube.com/embed/j0lO_0jlGxQ",
    image: "/assets/cases/Case1.png",
  },
  {
    title: "Automatización de Procesos Financieros",
    category: "Power Automate · Microsoft 365",
    description:
      "Orquestación de reportes y validaciones contables con Power Automate, reduciendo tiempos de cierre y errores manuales.",
    technologies: ["Power Automate", "SharePoint", "Excel Online"],
    video: "https://www.youtube.com/embed/D4q83lK6JqA",
    image: "/assets/cases/Case2.png",
  },
  {
    title: "RPA e Inteligencia Artificial Operativa",
    category: "Automation Anywhere · IA",
    description:
      "Bots cognitivos que clasifican y procesan formularios a escala, integrados vía APIs con sistemas internos.",
    technologies: ["Automation Anywhere", "Python", "Modelos IA", "APIs"],
    video: "https://www.youtube.com/embed/ksX7WUXQxnk",
    image: "/assets/cases/Case3.png",
  },
];

/* =========================
   UI helpers (alineado a Services)
========================= */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-400/40">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
      {children}
    </span>
  );
}

/* =========================
   COMPONENTE
========================= */
export default function Cases() {
  const [selected, setSelected] = useState<Project | null>(null);
  const prefersReduced = useReducedMotion();
  const year = new Date().getFullYear();

  const easeOutExpo = [0.22, 1, 0.36, 1] as const;

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

  const card: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: easeOutExpo },
      },
      hover: prefersReduced
        ? {}
        : {
            y: -4,
            transition: { duration: 0.18, ease: easeOutExpo },
          },
      tap: prefersReduced
        ? {}
        : {
            scale: 0.99,
            transition: { duration: 0.12, ease: easeOutExpo },
          },
    }),
    [prefersReduced]
  );

  return (
    <section
      id="casos"
      className="relative scroll-mt-24 py-20 sm:py-24 md:py-24 text-slate-50"
      aria-labelledby="cases-heading"
    >
      {/* Fondo oscuro pero con el mismo lenguaje de degradados/textura que el sitio */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_0%_0%,rgba(56,189,248,0.18),transparent_60%),radial-gradient(900px_500px_at_100%_0%,rgba(16,185,129,0.18),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.9)_0.6px,transparent_0.6px)] [background-size:22px_22px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* HEADER (similar estructura a Services pero en dark) */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-xl">
            <Pill>AutomIQ · Casos de éxito</Pill>
            <h2
              id="cases-heading"
              className="mt-4 text-[clamp(26px,4vw,38px)] font-extrabold leading-[1.08] tracking-tight text-white"
            >
              Proyectos donde{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
                negocio, web y automatización
              </span>{" "}
              se conectan.
            </h2>
            <p className="mt-3 text-[14.5px] sm:text-[15px] leading-relaxed text-slate-300">
              Una muestra de implementaciones donde combinamos{" "}
              <span className="font-semibold">arquitectura web moderna</span>,{" "}
              <span className="font-semibold">RPA</span> e{" "}
              <span className="font-semibold">integraciones</span> para eliminar fricción
              operativa y dejar una base lista para seguir construyendo.
            </p>
          </div>

          <div className="max-w-md w-full space-y-2 text-[13px] text-slate-300/90 lg:text-right">
            <p>
              <span className="font-semibold text-slate-100">
                Qué medimos en cada caso:
              </span>
            </p>
            <ul className="space-y-1.5">
              <li>· Reducción de tiempo en tareas clave.</li>
              <li>· Estabilidad y monitoreo de punta a punta.</li>
              <li>· Capacidad del equipo interno para iterar sobre lo entregado.</li>
            </ul>
            <p className="mt-3 text-[12px] text-slate-400">
              Muchos de estos proyectos siguen evolucionando junto al cliente en {year}.
            </p>
          </div>
        </div>

        {/* GRID de casos: lenguaje de “tarjeta” similar a Services (bordes, ring, rounded) */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.25,
            margin: "0px 0px -140px 0px",
          }}
          className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7 xl:gap-8"
        >
          {projects.map((p, i) => (
            <motion.article
              key={p.title + i}
              variants={card}
              whileHover="hover"
              whileTap="tap"
              tabIndex={0}
              role="button"
              aria-label={`Ver más detalles de ${p.title}`}
              onClick={() => setSelected(p)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && setSelected(p)
              }
              className="
                group relative flex min-h-[320px] flex-col overflow-hidden
                rounded-3xl border border-slate-800/80 bg-slate-900/80
                ring-1 ring-slate-800/80
                shadow-[0_18px_40px_-22px_rgba(0,0,0,0.9)]
                transition-all duration-200
                hover:border-emerald-400/70 hover:ring-emerald-400/40 hover:bg-slate-900
                hover:shadow-[0_26px_60px_-28px_rgba(16,185,129,0.6)]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80
                cursor-pointer
              "
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                {/* Overlay suave */}
                <div
                  className="pointer-events-none absolute inset-0 
                             bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent
                             opacity-80 mix-blend-soft-light
                             transition-opacity duration-300
                             group-hover:opacity-95"
                />
              </div>

              {/* Contenido */}
              <div className="flex flex-1 flex-col px-4 pt-4 pb-5 sm:px-5 sm:pb-6">
                {/* Tag categoría (similar a chips de Services pero en dark) */}
                <p className="inline-flex max-w-full items-center rounded-full bg-slate-900/90 px-2.5 py-1 text-[11px] font-medium text-emerald-300 ring-1 ring-slate-700/90">
                  {p.category}
                </p>

                <h3 className="mt-2 text-[clamp(15px,1.1vw,17px)] font-semibold text-white leading-snug">
                  {p.title}
                </h3>

                <p className="mt-2 text-[13.5px] sm:text-[14px] text-slate-300 leading-relaxed line-clamp-3">
                  {p.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.technologies.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-2.5 py-1 text-[11.5px]
                                 text-slate-100 bg-slate-800/90 border border-slate-700/80
                                 group-hover:border-emerald-400/50 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between text-[12.5px] text-slate-400">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400 transition-colors group-hover:text-emerald-300">
                    Ver caso
                    <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                  <span className="hidden md:inline text-slate-500">
                    Detalle · video · stack técnico
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
