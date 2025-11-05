/* eslint-disable react-hooks/purity */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import Modal from "../components/ui/Modal";
import DemoForm from "../components/DemoForm";
import RobotAnimation from "../components/ui/RobotAnimation";

export default function Hero() {
  const scrollTo = useSmoothScroll();
  const [openDemo, setOpenDemo] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <section
      aria-label="Automatiza, escala y crece con inteligencia"
      className="relative min-h-[92svh] flex items-center overflow-hidden isolate"
    >
      {/* Fondo */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-slate-950" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_35%,rgba(56,189,248,0.20),rgba(16,185,129,0.16)_40%,transparent_70%)]"
      />
      <img
        src="/assets/FondoCode.png"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.18] mix-blend-soft-light dark:opacity-[0.10]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/70 via-slate-950/40 to-emerald-900/25"
      />

      {/* Contenido */}
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 pt-24 md:pt-36 pb-12 md:pb-16">
        {/* En mobile comprimimos los espacios para aprovechar pantalla */}
        <div className="grid grid-cols-1 place-items-center gap-0 md:gap-1">
          {/* Halo (ligeramente más arriba en mobile) */}
          <motion.div
            aria-hidden
            className="absolute top-[33%] h-[300px] w-[300px] sm:h-[340px] sm:w-[340px] md:h-[480px] md:w-[480px] rounded-full blur-3xl bg-gradient-to-tr from-sky-500/20 to-emerald-500/20"
            animate={prefersReduced ? undefined : { scale: [1, 1.05, 1] }}
            transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
          />

          {/* Robot: más grande en mobile y pegado al título */}
          <motion.div
            className="relative z-10 -mb-5 sm:-mb-5 md:-mb-4"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            whileHover={prefersReduced ? undefined : { scale: 1.02 }}
          >
            <RobotAnimation
              className="w-[clamp(190px,64vw,320px)] h-[clamp(190px,64vw,320px)]"
              poster="/animations/robot_poster.jpg"
            />
          </motion.div>

          {/* Título: tipografía y leading optimizados para XS/SM */}
          <motion.h1
            className="relative z-10 -mt-[clamp(18px,5.5vw,44px)] text-center leading-[1.02] tracking-tight font-extrabold
                       text-[clamp(30px,9vw,56px)] text-white"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          >
            <span className="block">Automatiza. Escala.</span>
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-tr from-sky-400 via-emerald-400 to-sky-300"
              animate={
                prefersReduced
                  ? undefined
                  : { backgroundPosition: ["0% 50%", "100% 50%"] }
              }
              transition={{ duration: 7, ease: "linear", repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Crece con Inteligencia
            </motion.span>
          </motion.h1>

          {/* Descripción: breve en XS, completa desde sm */}
          <motion.p
            className="relative z-10 max-w-[38rem] text-center text-[clamp(14px,3.6vw,20px)] text-slate-300 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.7 }}
          >
            <span className="sm:hidden">
              <span className="font-semibold text-white">AutomIQ</span> une{" "}
              <span className="text-emerald-400 font-medium">RPA</span>,{" "}
              <span className="text-sky-400 font-medium">IA</span> y web moderna para optimizar tus procesos.
            </span>
            <span className="hidden sm:inline">
              En <span className="font-semibold text-white">AutomIQ</span>{" "}
              combinamos <span className="text-emerald-400">RPA</span>,{" "}
              <span className="text-sky-400">IA</span> y desarrollo web moderno
              para transformar procesos y reducir costos.
            </span>
          </motion.p>

          {/* CTAs: full-width en mobile, inline en sm+ */}
          <motion.div
            className="relative z-10 mt-6 flex w-full max-w-[34rem] flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            <button
              onClick={() => setOpenDemo(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full
                         px-8 py-3 text-[15px] font-semibold text-white
                         bg-gradient-to-tr from-emerald-500 to-sky-500
                         shadow-lg shadow-sky-500/20 hover:opacity-95
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                         focus-visible:ring-emerald-400 focus-visible:ring-offset-slate-900 transition"
            >
              Solicitar demo gratuita
            </button>
            <button
              onClick={() => scrollTo('#servicios')}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full
                         px-8 py-3 text-[15px] font-semibold
                         text-slate-200 hover:text-white
                         bg-white/5 hover:bg-white/10
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                         focus-visible:ring-sky-400 focus-visible:ring-offset-slate-900 transition"
            >
              Ver servicios
            </button>
          </motion.div>

          {/* Indicador de scroll (margen más corto en mobile) */}
          <motion.button
            onClick={() => scrollTo("#servicios")}
            aria-label="Desplazarse a servicios"
            className="mt-6 sm:mt-8 text-slate-400 hover:text-slate-200 transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            whileHover={prefersReduced ? undefined : { y: 2, opacity: 1 }}
          >
            <svg width="20" height="28" viewBox="0 0 20 28" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="18" height="26" rx="9" className="stroke-current" strokeWidth="1.5" />
              <circle cx="10" cy="8" r="2" className="fill-current" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Modal */}
      <Modal open={openDemo} onClose={() => setOpenDemo(false)} title="Solicitar demo gratuita">
        <DemoForm />
      </Modal>
    </section>
  );
}
