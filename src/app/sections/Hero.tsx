/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { ArrowRight, Code2, Workflow, Gauge } from "lucide-react";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import Modal from "../components/ui/Modal";
import DemoForm from "../components/DemoForm";

/* ============================
   Card derecha — más grande y colorida (más ligera en mobile)
============================ */
function RightCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-none">
      {/* Glow suave detrás: solo en sm+ para no recargar mobile */}
      <div className="pointer-events-none absolute inset-x-2 top-4 -z-10 hidden h-44 rounded-[40px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.30),transparent_55%),radial-gradient(circle_at_bottom,_rgba(34,197,94,0.24),transparent_55%)] blur-2xl sm:block" />

      <div className="relative rounded-2xl bg-white/95 p-3 shadow-lg ring-1 ring-slate-100 sm:rounded-[30px] sm:p-4 lg:p-6 sm:shadow-[0_26px_80px_rgba(15,23,42,0.18)]">
        {/* Header */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 sm:mb-4">
          <div>
            <p className="text-[11.5px] sm:text-[12px] font-semibold text-slate-900">
              Tablero de operación unificado
            </p>
            <p className="text-[11px] text-slate-500">
              Web, automatizaciones y APIs visibles en un solo panel.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10.5px] sm:text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            En producción
          </span>
        </div>

        {/* “Dashboard” */}
        <div className="overflow-hidden rounded-2xl bg-slate-50/90 p-2.5 sm:p-3.5 ring-1 ring-slate-100">
          {/* KPIs */}
          <div className="grid grid-cols-3 gap-2 text-[10.5px] sm:text-[11.5px]">
            <div className="rounded-xl bg-white px-2 py-2 ring-1 ring-slate-100">
              <p className="text-slate-500">Horas manuales</p>
              <p className="mt-1 text-[12.5px] sm:text-[13.5px] font-semibold text-emerald-500">
                -68%
              </p>
            </div>
            <div className="rounded-xl bg-white px-2 py-2 ring-1 ring-slate-100">
              <p className="text-slate-500">Errores repetidos</p>
              <p className="mt-1 text-[12.5px] sm:text-[13.5px] font-semibold text-sky-500">
                -45%
              </p>
            </div>
            <div className="rounded-xl bg-white px-2 py-2 ring-1 ring-slate-100">
              <p className="text-slate-500">Tiempo de cierre</p>
              <p className="mt-1 text-[12.5px] sm:text-[13.5px] font-semibold text-slate-900">
                x2 más rápido
              </p>
            </div>
          </div>

          {/* Gráfico simple */}
          <div className="mt-3 rounded-xl bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-2.5 sm:mt-4 sm:p-3.5 ring-1 ring-slate-100">
            <div className="mb-2 flex items-center justify-between text-[10.5px] sm:text-[11px] text-slate-500">
              <span>Adopción del flujo automatizado</span>
              <span>Últimos 6 meses</span>
            </div>

            <svg
              viewBox="0 0 260 90"
              className="w-full"
              role="img"
              aria-label="Curva de adopción creciente en el tiempo"
            >
              <defs>
                <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              <rect
                x="14"
                y="14"
                width="230"
                height="60"
                rx="12"
                fill="url(#heroArea)"
              />

              {/* línea de guía */}
              <g stroke="#e2e8f0" strokeWidth="0.7">
                <line x1="26" x2="228" y1="42" y2="42" />
              </g>

              {/* Línea principal */}
              {(() => {
                const pts = [
                  [26, 68],
                  [70, 54],
                  [114, 46],
                  [158, 36],
                  [202, 30],
                  [228, 24],
                ];

                const d =
                  "M " +
                  pts
                    .map(([x, y], i) => {
                      if (i === 0) return `${x} ${y}`;
                      const [px, py] = pts[i - 1];
                      const cx1 = px + (x - px) * 0.35;
                      const cy1 = py;
                      const cx2 = px + (x - px) * 0.65;
                      const cy2 = y;
                      return `C ${cx1} ${cy1} ${cx2} ${cy2} ${x} ${y}`;
                    })
                    .join(" ");

                return (
                  <>
                    <path
                      d={d}
                      fill="none"
                      stroke="#0ea5e9"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    {pts.map(([x, y], i) => (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={3.2}
                        fill="#22c55e"
                        stroke="#f8fafc"
                        strokeWidth="1.4"
                      />
                    ))}
                  </>
                );
              })()}
            </svg>

            {/* Texto SLA: solo en sm+ para no abrumar mobile */}
            <p className="mt-3 hidden items-center gap-1.5 text-[11px] sm:flex sm:text-[11.5px] text-slate-500">
              <Gauge className="h-3.5 w-3.5 text-emerald-500" />
              <span>
                SLA 99.9% · cada paso queda trazado con logs, alertas y
                reportes.
              </span>
            </p>
          </div>
        </div>

        {/* Fila final: solo en sm+ */}
        <div className="mt-3 hidden gap-2 rounded-2xl bg-slate-900 px-3 py-3 text-[11px] sm:mt-4 sm:flex sm:text-[12px] text-slate-100 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Equipos de{" "}
            <span className="font-semibold">Operaciones, Finanzas e IT</span>{" "}
            trabajando sobre la misma solución.
          </p>
          <span className="inline-flex items-center justify-center rounded-full bg-slate-800 px-3 py-1 text-[10px]">
            24/7 · Observabilidad &amp; soporte
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================
   HERO — ocupa siempre la primera vista
============================ */
export default function Hero() {
  const [openDemo, setOpenDemo] = useState(false);
  const scrollTo = useSmoothScroll();

  return (
    <section
      aria-label="AutomIQ — Soluciones de software y automatización"
      className="relative overflow-hidden bg-[#f9fafb]"
    >
      {/* Fondo con color pero limpio */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),transparent_60%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),transparent_60%)]"
      />
      {/* banda suave abajo para pantallas grandes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-120px] h-[220px] bg-gradient-to-t from-slate-100/80 to-transparent"
      />

      {/* Contenedor principal: siempre al menos 100vh - navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="
            flex flex-col gap-8 md:gap-12 lg:flex-row lg:items-center
            py-12 md:py-16 lg:py-20
            min-h-[calc(100vh-80px)]   /* ajusta 80px si tu navbar mide otra cosa */
          "
        >
          {/* Columna izquierda */}
          <div className="flex-1 w-full max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-medium text-slate-600 shadow-sm ring-1 ring-slate-100">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-semibold text-emerald-800">
                AIQ
              </span>
              Automation &amp; Web Engineering · AutomIQ
            </div>

            <h1 className="mt-4 text-[clamp(30px,6vw,46px)] font-semibold leading-tight tracking-tight text-slate-900">
              Soluciones de software y automatización
              <br />
              que tu equipo{" "}
              <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent">
                realmente usa
              </span>
              .
            </h1>

            <p className="mt-4 text-[15px] md:text-[15.5px] leading-relaxed text-slate-600">
              Unimos <strong>desarrollo web moderno</strong> con{" "}
              <strong>RPA e integraciones</strong> para que tus procesos clave
              no dependan de hojas de cálculo, correos reenviados ni pasos que
              nadie documenta. Todo medible, trazable y listo para escalar.
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setOpenDemo(true)}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-slate-900/10 transition hover:bg-slate-800"
              >
                Agendar una llamada
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo("#servicios")}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                Ver servicios
              </button>
            </div>

            {/* Barra de confianza */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[12.5px] text-slate-500">
              <div className="inline-flex items-center gap-1.5">
                <Code2 className="h-4 w-4 text-sky-500" />
                <span>Next.js, TypeScript, APIs diseñadas para crecer</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <Workflow className="h-4 w-4 text-emerald-500" />
                <span>Power Automate, RPA, orquestación end-to-end</span>
              </div>
            </div>
          </div>

          {/* Columna derecha — card crece en pantallas grandes */}
          <div className="flex-1 w-full lg:max-w-xl xl:max-w-2xl mt-3 sm:mt-4 lg:mt-0">
            <RightCard />
          </div>
        </div>
      </div>

      <Modal
        open={openDemo}
        onClose={() => setOpenDemo(false)}
        title="Agendar llamada con AutomIQ"
      >
        <DemoForm />
      </Modal>
    </section>
  );
}
