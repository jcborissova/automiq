/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, useReducedMotion } from "framer-motion";

type Client = { name: string; logo: string };

const clients: Client[] = [
  { name: "Datalize", logo: "/assets/logos/clients/datalize.png" },
  { name: "Henko", logo: "/assets/logos/clients/henko.png" },
  // { name: "Otra Marca", logo: "/assets/logos/clients/otra.png" },
];

export default function Clients() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="clientes"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 sm:py-20 lg:py-24 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 scroll-mt-24"
      aria-labelledby="clients-title"
    >
      {/* Fondo sutil con mismo lenguaje que otras secciones */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-40"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_0%_0%,rgba(56,189,248,0.10),transparent_60%),radial-gradient(900px_500px_at_100%_0%,rgba(16,185,129,0.10),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: prefersReduced ? 0 : 0.5 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            Clientes &amp; aliados
          </p>

          <h2
            id="clients-title"
            className="mt-4 text-[clamp(26px,4.4vw,38px)] font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Empresas que confían en{" "}
            <span className="bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
              AutomIQ
            </span>
          </h2>

          <p className="mt-3 mx-auto max-w-2xl text-[14.5px] sm:text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            Colaboramos con equipos que buscan soluciones{" "}
            <span className="font-semibold">medibles</span> en web y
            automatización, con foco en operación real y resultados de negocio.
          </p>
        </motion.div>

        {/* Grid de logos */}
        <div className="mt-10 sm:mt-12">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
              {clients.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: prefersReduced ? 0 : 0.45,
                    delay: prefersReduced ? 0 : i * 0.06,
                  }}
                  className="group relative flex items-center justify-center rounded-2xl border border-slate-200/80 bg-white/90 p-5 sm:p-6 lg:p-7
                             shadow-sm ring-1 ring-slate-100/70
                             transition-all duration-200
                             hover:-translate-y-[2px] hover:border-emerald-400/70 hover:ring-emerald-400/40 hover:shadow-[0_18px_45px_-28px_rgba(16,185,129,0.55)]
                             dark:border-white/10 dark:bg-slate-900/70 dark:ring-slate-800 dark:hover:border-emerald-400/60 dark:hover:ring-emerald-400/40"
                  aria-label={`Cliente: ${c.name}`}
                >
                  <img
                    src={c.logo}
                    alt={c.name}
                    loading="lazy"
                    className="h-9 sm:h-10 lg:h-12 object-contain opacity-85 contrast-125 grayscale
                               transition-all duration-300
                               group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            delay: prefersReduced ? 0 : 0.15,
            duration: prefersReduced ? 0 : 0.4,
          }}
          className="mt-12 sm:mt-14"
        >
          <p className="mb-3 text-[13px] text-slate-500 dark:text-slate-400">
            ¿Te gustaría ver un caso parecido a tu contexto?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center rounded-full
                       bg-slate-900 px-6 py-3 text-sm font-semibold text-white
                       shadow-sm ring-1 ring-slate-900/10 transition
                       hover:bg-slate-800
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50
                       dark:bg-white dark:text-slate-900 dark:ring-white/10 dark:hover:bg-white/90 dark:focus-visible:ring-white dark:focus-visible:ring-offset-slate-900"
          >
            Hablemos de tu proyecto
          </a>
        </motion.div>
      </div>
    </section>
  );
}
