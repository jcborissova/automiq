"use client";
import { Code2, Workflow, Cpu, Zap, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { JSX } from "react/jsx-dev-runtime";

type Service = {
  icon: JSX.Element;
  title: string;
  description: string;
  bullets: string[];
  href?: string;
};

const services: Service[] = [
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "Desarrollo Web y Aplicaciones",
    description:
      "Experiencias rápidas, seguras y escalables que se sienten premium desde el primer click.",
    bullets: ["Next.js/React", "SEO & rendimiento (Core Web Vitals)", "Escalabilidad en la nube"],
    href: "#contacto",
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: "Automatización Inteligente (RPA)",
    description:
      "Robots que eliminan lo repetitivo, reducen errores y aceleran entregables críticos.",
    bullets: ["Power Automate / UiPath / AA", "Ahorro de tiempo medible", "Gobernanza y trazabilidad"],
    href: "#contacto",
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "Integraciones Empresariales",
    description:
      "Sistemas que hablan el mismo idioma: datos confiables y flujos sin fricción.",
    bullets: ["APIs & Webhooks", "SSO / Azure AD / OAuth2", "Data pipelines robustos"],
    href: "#contacto",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Optimización y Consultoría Digital",
    description:
      "Diagnóstico, priorización y ejecución con foco en impacto y ROI real.",
    bullets: ["Discovery y Roadmap", "KPIs y OKRs claros", "Entrega iterativa"],
    href: "#contacto",
  },
];

export default function Services() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="servicios"
      className="relative py-24 sm:py-28"
      aria-labelledby="services-title"
    >
      {/* Fondo elegante con glow sutil */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50" />
        <div className="absolute inset-0 [mask-image:radial-gradient(55%_40%_at_50%_0%,black,transparent)] bg-[radial-gradient(600px_360px_at_50%_-60px,rgba(16,185,129,0.12),transparent)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Encabezado */}
        <div className="mx-auto max-w-3xl text-center mb-14 sm:mb-16">
          <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50/60 px-3 py-1 text-[12px] font-semibold tracking-wide text-emerald-700">
            Soluciones que mueven la aguja
          </span>
          <h2
            id="services-title"
            className="mt-4 text-[clamp(28px,4.8vw,40px)] font-extrabold tracking-tight text-slate-900"
          >
            Nuestros <span className="text-emerald-600">Servicios</span>
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-slate-600">
            En <b>AutomIQ</b> combinamos ingeniería web, automatización e
            integraciones para desbloquear eficiencia operativa y resultados medibles.
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: prefersReduced ? 0 : 0.55, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_6px_24px_-12px_rgba(2,6,23,0.15)] transition-all"
            >
              {/* Borde reactivo */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-emerald-400/40 transition"
              />

              {/* Icono + título */}
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
                  {s.icon}
                </div>
                <h3 className="text-[17px] font-semibold text-slate-900">
                  <span className="inline-block bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    {s.title}
                  </span>
                </h3>
              </div>

              {/* Descripción */}
              <p className="text-[14.5px] leading-relaxed text-slate-600">
                {s.description}
              </p>

              {/* Bullets de valor */}
              <ul className="mt-4 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[13.5px] text-slate-700">
                    <span className="mt-[6px] inline-block h-[6px] w-[6px] rounded-full bg-emerald-500/80" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* CTA discreto */}
              {s.href && (
                <a
                  href={s.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-emerald-700 hover:text-emerald-600"
                  aria-label={`Conocer más sobre ${s.title}`}
                >
                  Conocer más
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              )}

              {/* Subrayado animado en hover */}
              <span
                aria-hidden
                className="absolute left-6 right-6 bottom-6 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.article>
          ))}
        </div>

        {/* CTA general */}
        <div className="mt-14 flex items-center justify-center">
          <a
            href="#contacto"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:opacity-95 transition"
          >
            Agendar una reunión
          </a>
        </div>
      </div>
    </section>
  );
}
