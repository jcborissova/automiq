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
      className="relative py-24 sm:py-28 overflow-hidden border-t border-slate-200/60"
      aria-labelledby="clients-title"
    >
      {/* Fondo elegante con glow radial sutil */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50" />
        <div className="absolute inset-0 [mask-image:radial-gradient(55%_40%_at_50%_0%,black,transparent)] bg-[radial-gradient(600px_360px_at_50%_-60px,rgba(16,185,129,0.10),transparent)]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center relative">
        {/* Título */}
        <motion.h2
          id="clients-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: prefersReduced ? 0 : 0.55 }}
          className="text-[clamp(28px,4.8vw,40px)] font-extrabold tracking-tight text-slate-900"
        >
          Nuestros <span className="text-emerald-600">Clientes</span>
        </motion.h2>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: prefersReduced ? 0 : 0.12, duration: prefersReduced ? 0 : 0.55 }}
          className="mt-3 max-w-2xl mx-auto text-[15.5px] leading-relaxed text-slate-600"
        >
          Empresas que confían en <span className="text-emerald-600 font-semibold">AutomIQ</span> para
          impulsar su transformación digital con soluciones medibles y de alto impacto.
        </motion.p>

        {/* Grid de logos */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8">
          {clients.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: prefersReduced ? 0 : 0.5, delay: i * 0.08 }}
              className="group relative flex items-center justify-center rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all p-8 sm:p-10"
              aria-label={`Cliente: ${c.name}`}
            >
              {/* Glow fino en hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition
                           [background:radial-gradient(80%_60%_at_50%_10%,rgba(16,185,129,0.18),transparent)]"
              />
              <img
                src={c.logo}
                alt={c.name}
                loading="lazy"
                className="h-12 sm:h-14 md:h-16 object-contain opacity-90 group-hover:opacity-100
                           grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA opcional (elimínalo si no lo quieres) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: prefersReduced ? 0 : 0.2, duration: prefersReduced ? 0 : 0.5 }}
          className="mt-14"
        >
          <a
            href="#contacto"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 to-sky-500
                       px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:opacity-95 transition"
          >
            ¿Hablamos de tu proyecto?
          </a>
        </motion.div>
      </div>
    </section>
  );
}
