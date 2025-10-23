"use client";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Gratis",
    description: "Ideal para pequeños proyectos o validaciones iniciales.",
    features: [
      "Landing page profesional",
      "Integración básica",
      "Soporte por correo",
    ],
    button: "Empezar ahora",
  },
  {
    name: "Pro",
    price: "$499",
    description: "Perfecto para negocios que buscan escalar digitalmente.",
    features: [
      "Web + Automatización personalizada",
      "Integración API",
      "Soporte prioritario",
    ],
    button: "Solicitar demo",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "A medida",
    description: "Soluciones avanzadas adaptadas a grandes empresas.",
    features: [
      "Flujos RPA complejos",
      "Integraciones multi-sistema",
      "Consultoría continua",
    ],
    button: "Contactar ventas",
  },
];

export default function Pricing() {
  return (
    <section
      id="precios"
      className="py-24 bg-white dark:bg-slate-950 text-center"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-12">
          Planes <span className="text-grad">AutomIQ</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-2xl p-8 shadow-sm hover:shadow-lg transition border ${
                plan.highlight
                  ? "bg-gradient-to-tr from-sky-500 to-emerald-500 text-white border-transparent"
                  : "bg-slate-50 dark:bg-slate-900 border-slate-200/50 dark:border-slate-700"
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-4xl font-extrabold mb-2">{plan.price}</p>
              <p
                className={`mb-6 text-sm ${
                  plan.highlight
                    ? "text-white/90"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {plan.description}
              </p>

              <ul className="space-y-2 text-sm mb-8">
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-center justify-center gap-2"
                  >
                    <CheckCircle
                      className={`h-4 w-4 ${
                        plan.highlight
                          ? "text-white"
                          : "text-emerald-500 dark:text-emerald-400"
                      }`}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className={`inline-block px-5 py-2 rounded-2xl font-semibold text-sm transition ${
                  plan.highlight
                    ? "bg-white text-slate-900 hover:opacity-90"
                    : "bg-gradient-to-tr from-sky-500 to-emerald-500 text-white hover:opacity-90"
                }`}
              >
                {plan.button}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
