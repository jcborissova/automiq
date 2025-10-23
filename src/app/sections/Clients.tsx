/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";

const clients = [
  {
    name: "Datalize",
    logo: "/assets/logos/clients/datalize.png",
  },
  {
    name: "Henko",
    logo: "/assets/logos/clients/henko.png",
  },
];

export default function Clients() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 border-t border-slate-200/40 dark:border-slate-800/50 overflow-hidden">
      {/* fondo suave con brillo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6"
        >
          Nuestros <span className="text-emerald-500">Clientes</span>
        </motion.h2>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 mb-20"
        >
          Empresas que confían en{" "}
          <span className="text-emerald-500 font-semibold">AutomIQ</span> para
          impulsar su transformación digital y automatizar sus procesos con
          inteligencia y precisión.
        </motion.p>

        {/* Logos */}
        <div className="flex flex-wrap justify-center items-center gap-20 md:gap-28">
          {clients.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-slate-700 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 flex items-center justify-center p-10 md:p-12 w-64 md:w-80"
            >
              <img
                src={c.logo}
                alt={c.name}
                className="h-16 md:h-20 object-contain opacity-85 hover:opacity-100 transition duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
