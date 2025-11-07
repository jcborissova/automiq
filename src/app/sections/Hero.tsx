/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import Modal from "../components/ui/Modal";
import DemoForm from "../components/DemoForm";

export default function Hero() {
  const scrollTo = useSmoothScroll();
  const [openDemo, setOpenDemo] = useState(false);

  return (
    <section
      aria-label="Automatiza, escala y crece con inteligencia"
      className="relative min-h-[92svh] flex items-center overflow-hidden isolate bg-gradient-to-b from-slate-900 to-slate-950"
    >
      {/* Fondo de código SOLO en desktop */}
      <img
        src="/assets/FondoCode.png"
        alt=""
        aria-hidden
        className="hidden md:block absolute inset-0 -z-10 h-full w-full object-cover opacity-10 mix-blend-soft-light select-none pointer-events-none"
      />

      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 pt-24 md:pt-36 pb-12 md:pb-16">
        <div className="grid grid-cols-1 place-items-center">
          {/* Badge simple */}
          <p className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[12px] font-medium text-slate-300 ring-1 ring-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            RPA · IA · Web Engineering
          </p>

          {/* Título principal (sin animaciones) */}
          <h1 className="mt-3 text-center font-extrabold tracking-tight leading-[1.04] text-white text-[clamp(32px,9.6vw,56px)]">
            <span className="block">Automatiza. Escala.</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
              Crece con Inteligencia
            </span>
          </h1>

          {/* Descripción concisa y legible en mobile */}
          <p className="mt-3 mx-auto max-w-[36rem] text-center text-[15px] md:text-[16px] text-slate-300 leading-relaxed">
            En <span className="font-semibold text-white">AutomIQ</span> combinamos{" "}
            <span className="text-emerald-400">RPA</span>,{" "}
            <span className="text-sky-400">IA</span> y desarrollo web moderno para
            optimizar procesos y reducir costos.
          </p>

          {/* CTAs */}
          <div className="mt-7 flex w-full max-w-[34rem] flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4">
            <button
              type="button"
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
              type="button"
              onClick={() => scrollTo("#servicios")}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full
                         px-8 py-3 text-[15px] font-semibold
                         text-slate-200 hover:text-white
                         bg-white/5 hover:bg-white/10
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                         focus-visible:ring-sky-400 focus-visible:ring-offset-slate-900 transition"
            >
              Ver servicios
            </button>
          </div>

          {/* Línea sutil separadora en mobile para dar estructura visual */}
          <div className="mt-8 h-px w-28 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

          {/* Mini “confianza” */}
          <p className="mt-4 text-center text-xs text-slate-400">
            Implementaciones ágiles, medibles y escalables.
          </p>
        </div>
      </div>

      {/* Modal (portal + z-[9999] ya manejado dentro del componente) */}
      <Modal open={openDemo} onClose={() => setOpenDemo(false)} title="Solicitar demo gratuita">
        <DemoForm />
      </Modal>
    </section>
  );
}
