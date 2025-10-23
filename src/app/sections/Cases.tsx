/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import ProjectModal from "../components/ProjectModal";

const projects = [
  {
    title: "Plataforma Web Corporativa",
    category: "Desarrollo Web / Next.js",
    description:
      "Plataforma optimizada para entidades financieras, desarrollada en Next.js y desplegada en Azure. Se mejoró la arquitectura para SEO, rendimiento y escalabilidad.",
    technologies: ["Next.js", "Tailwind CSS", "Azure", "TypeScript"],
    video: "https://www.youtube.com/embed/j0lO_0jlGxQ",
    image: "/assets/cases/Case1.png",
  },
  {
    title: "Automatización de Procesos Financieros",
    category: "Power Automate / Microsoft 365",
    description:
      "Automatización completa de reportes y validaciones contables con flujos Power Automate, reduciendo tiempos de procesamiento y errores manuales.",
    technologies: ["Power Automate", "SharePoint", "Excel Online"],
    video: "https://www.youtube.com/embed/D4q83lK6JqA",
    image: "/assets/cases/Case2.png",
  },
  {
    title: "RPA e Inteligencia Artificial Operativa",
    category: "Automation Anywhere / IA Predictiva",
    description:
      "Bots cognitivos que analizan y procesan formularios, integrando IA para clasificación inteligente y aprendizaje continuo.",
    technologies: ["Automation Anywhere", "Python", "AI Models", "APIs"],
    video: "https://www.youtube.com/embed/ksX7WUXQxnk",
    image: "/assets/cases/Case3.png",
  },
];

export default function Cases() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <section
      id="casos"
      className="relative py-20 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center overflow-hidden"
    >
      {/* Fondo sutil */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Título principal */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-8 sm:mb-10">
          Casos de <span className="text-emerald-400">Éxito</span>
        </h2>

        <p className="max-w-3xl mx-auto text-slate-300 mb-10 sm:mb-14 leading-relaxed text-sm sm:text-base">
          Soluciones reales desarrolladas por <b>AutomIQ</b> que combinan{" "}
          <b>automatización inteligente</b>, <b>IA</b> y{" "}
          <b>tecnología moderna</b> para transformar procesos empresariales.
        </p>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              onClick={() => setSelected(p)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-transparent hover:border-emerald-400/40 transition-all duration-500 min-h-[300px] flex flex-col justify-between"
            >
              {/* Imagen de fondo */}
              <div className="absolute inset-0">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-slate-950/75 group-hover:bg-slate-900/60 backdrop-blur-[1.5px] transition-all duration-500" />
              </div>

              {/* Contenido */}
              <div className="relative z-10 flex flex-col justify-between h-full text-center px-4 sm:px-5 py-5 sm:py-6">
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-wide text-emerald-400 font-semibold mb-2">
                    {p.category}
                  </p>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 leading-snug min-h-[40px] flex items-center justify-center">
                    {p.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 min-h-[60px]">
                    {p.description}
                  </p>
                </div>

                <div>
                  <div className="inline-flex items-center text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition">
                    Ver proyecto <ExternalLink className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
