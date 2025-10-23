"use client";
import { Code2, Workflow, Cpu, Zap } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: <Code2 className="h-7 w-7 text-emerald-500" />,
    title: "Desarrollo Web y Aplicaciones",
    description:
      "Diseñamos experiencias digitales de alto nivel, enfocadas en eficiencia, escalabilidad y un impacto tangible en tus operaciones.",
  },
  {
    icon: <Workflow className="h-7 w-7 text-emerald-500" />,
    title: "Automatización Inteligente (RPA)",
    description:
      "Transformamos procesos empresariales con soluciones que reducen errores, aceleran resultados y liberan el potencial de tu equipo.",
  },
  {
    icon: <Cpu className="h-7 w-7 text-emerald-500" />,
    title: "Integraciones Empresariales",
    description:
      "Conectamos ecosistemas digitales para garantizar una comunicación fluida, segura y unificada entre tus sistemas y plataformas.",
  },
  {
    icon: <Zap className="h-7 w-7 text-emerald-500" />,
    title: "Optimización y Consultoría Digital",
    description:
      "Analizamos, rediseñamos y mejoramos tus procesos clave para aumentar la eficiencia operativa y maximizar el retorno tecnológico.",
  },
];

export default function Services() {
  return (
    <section
      id="servicios"
      className="py-28 bg-white dark:bg-slate-950 text-center"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Encabezado */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
          Nuestros <span className="text-emerald-500">Servicios</span>
        </h2>
        <p className="max-w-3xl mx-auto text-slate-600 dark:text-slate-400 mb-20">
          En <b>AutomIQ</b> acompañamos a las organizaciones en su evolución digital, 
          combinando estrategia, tecnología y automatización para lograr resultados medibles y sostenibles.
        </p>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white/90 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800 rounded-2xl p-8 text-left hover:shadow-[0_6px_24px_rgba(16,185,129,0.15)] hover:border-emerald-500/40 transition-all duration-500"
            >
              <div className="mb-6 flex items-center justify-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
                  {s.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                {s.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
