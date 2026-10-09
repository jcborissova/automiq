import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { Locale } from "../lib/site-content";

type Technology = {
  name: string;
  logo: string;
};

type UseCase = {
  eyebrow: string;
  title: string;
  summary: string;
  problemLabel: string;
  problem: string;
  buildLabel: string;
  build: string;
  image: string;
  visual: "screenshot" | "photo";
  technologies: Technology[];
};

const useCases: Record<Locale, UseCase[]> = {
  es: [
    {
      eyebrow: "Operaciones internas",
      title: "Panel para solicitudes, estados y responsables",
      summary:
        "Una vista central para que el equipo vea qué entró, quién lo tiene, en qué estado está y qué falta por resolver.",
      problemLabel: "Problema",
      problem:
        "La información vive en correos, hojas o chats; el seguimiento depende de preguntar y copiar datos manualmente.",
      buildLabel: "Construcción",
      build:
        "Aplicación interna con estados, responsables, historial, filtros y notificaciones para mantener el flujo visible.",
      image: "/assets/services/web.png",
      visual: "screenshot",
      technologies: [
        { name: "Next.js", logo: "/assets/techs/nextjs.png" },
        { name: "React", logo: "/assets/techs/react.png" },
        { name: "TypeScript", logo: "/assets/techs/typescript.png" },
      ],
    },
    {
      eyebrow: "Documentos y aprobaciones",
      title: "Flujo de validación antes de registrar o reportar",
      summary:
        "Un proceso que recibe documentos, revisa condiciones, pide datos faltantes y escala excepciones al equipo correcto.",
      problemLabel: "Problema",
      problem:
        "Los archivos llegan por distintos canales y alguien debe revisar, renombrar, copiar y avisar cada paso.",
      buildLabel: "Construcción",
      build:
        "Automatización con reglas, lectura de datos, rutas de revisión y registro final en las herramientas existentes.",
      image: "/assets/services/auto.png",
      visual: "screenshot",
      technologies: [
        { name: "n8n", logo: "/assets/techs/n8n.png" },
        { name: "Make", logo: "/assets/techs/make.png" },
        { name: "Power Platform", logo: "/assets/techs/powerplatform.png" },
      ],
    },
    {
      eyebrow: "Atención y seguimiento",
      title: "Asistente para llamadas, resumen y handoff",
      summary:
        "Un asistente que captura intención, resume la conversación y entrega el contexto al equipo humano cuando corresponde.",
      problemLabel: "Problema",
      problem:
        "Las llamadas o mensajes quedan dispersos; el equipo recibe poco contexto y repite preguntas al cliente.",
      buildLabel: "Construcción",
      build:
        "Flujo conectado a voz, CRM y mensajería para clasificar, resumir, asignar y dejar trazabilidad.",
      image: "/assets/cases/Case2.png",
      visual: "photo",
      technologies: [
        { name: "Retell", logo: "/assets/techs/retell.png" },
        { name: "Zapier", logo: "/assets/techs/zapier.png" },
        { name: "Automation Anywhere", logo: "/assets/techs/automationanywhere.png" },
      ],
    },
  ],
  en: [
    {
      eyebrow: "Internal operations",
      title: "Dashboard for requests, statuses, and owners",
      summary:
        "A central view for teams to see what came in, who owns it, where it stands, and what still needs attention.",
      problemLabel: "Problem",
      problem:
        "Information lives across email, sheets, or chat; follow-up depends on asking around and copying data manually.",
      buildLabel: "Build",
      build:
        "Internal app with statuses, owners, history, filters, and notifications to keep the workflow visible.",
      image: "/assets/services/web.png",
      visual: "screenshot",
      technologies: [
        { name: "Next.js", logo: "/assets/techs/nextjs.png" },
        { name: "React", logo: "/assets/techs/react.png" },
        { name: "TypeScript", logo: "/assets/techs/typescript.png" },
      ],
    },
    {
      eyebrow: "Documents and approvals",
      title: "Validation flow before recording or reporting",
      summary:
        "A process that receives documents, checks conditions, asks for missing data, and escalates exceptions to the right team.",
      problemLabel: "Problem",
      problem:
        "Files arrive through different channels and someone has to review, rename, copy, and notify every step.",
      buildLabel: "Build",
      build:
        "Automation with rules, data extraction, review routes, and final registration in the existing tools.",
      image: "/assets/services/auto.png",
      visual: "screenshot",
      technologies: [
        { name: "n8n", logo: "/assets/techs/n8n.png" },
        { name: "Make", logo: "/assets/techs/make.png" },
        { name: "Power Platform", logo: "/assets/techs/powerplatform.png" },
      ],
    },
    {
      eyebrow: "Support and follow-up",
      title: "Assistant for calls, summaries, and handoff",
      summary:
        "An assistant that captures intent, summarizes the conversation, and hands context to the human team when needed.",
      problemLabel: "Problem",
      problem:
        "Calls or messages stay scattered; the team receives little context and repeats questions with the customer.",
      buildLabel: "Build",
      build:
        "Flow connected to voice, CRM, and messaging to classify, summarize, assign, and keep a traceable record.",
      image: "/assets/cases/Case2.png",
      visual: "photo",
      technologies: [
        { name: "Retell", logo: "/assets/techs/retell.png" },
        { name: "Zapier", logo: "/assets/techs/zapier.png" },
        { name: "Automation Anywhere", logo: "/assets/techs/automationanywhere.png" },
      ],
    },
  ],
};

export default function Examples({ locale }: { locale: Locale }) {
  const isEnglish = locale === "en";
  const items = useCases[locale];

  return (
    <section
      id="examples"
      className="scroll-mt-24 bg-[var(--surface)] py-14 text-[var(--ink-950)] sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-[var(--border-strong)] pt-8 sm:pt-10">
          <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--support)]">
                {isEnglish ? "Use cases" : "Casos de uso"}
              </p>
              <h2 className="mt-3 text-[2rem] font-semibold leading-[1.05] tracking-normal sm:text-[2.4rem] lg:text-[2.75rem]">
                {isEnglish ? "How the work takes shape" : "Cómo toma forma el trabajo"}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--ink-700)] lg:justify-self-end">
              {isEnglish
                ? "Reference patterns for conversations with clients: honest, specific, and grounded in the systems usually involved."
                : "Patrones de referencia para conversar con clientes: honestos, concretos y aterrizados en los sistemas que suelen intervenir."}
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {items.map((item, index) => (
              <article
                key={item.title}
                className="grid overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--background)] shadow-[var(--shadow-xs)] lg:grid-cols-[0.92fr_1.08fr]"
              >
                <div
                  className={`${index % 2 === 1 ? "lg:order-2" : ""} relative min-h-[260px] border-b border-[var(--border)] ${
                    item.visual === "screenshot" ? "bg-[#f4f7fb]" : "bg-[var(--ink-950)]"
                  } lg:min-h-full lg:border-b-0`}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className={
                      item.visual === "screenshot"
                        ? "object-contain p-4 sm:p-6"
                        : "object-cover opacity-92"
                    }
                  />
                  {item.visual === "photo" && (
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,27,46,0.02),rgba(13,27,46,0.3))]" />
                  )}
                </div>

                <div className="p-5 sm:p-6 lg:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--support)]">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-3 max-w-2xl text-2xl font-semibold leading-tight tracking-normal text-[var(--ink-950)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--ink-700)]">
                    {item.summary}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="border-l-2 border-[var(--accent)] pl-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
                        {item.problemLabel}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                        {item.problem}
                      </p>
                    </div>
                    <div className="border-l-2 border-[var(--accent)] pl-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
                        {item.buildLabel}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                        {item.build}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech.name}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-white px-3 py-1.5 text-[12px] font-semibold text-[var(--ink-700)]"
                      >
                        <Image
                          src={tech.logo}
                          alt=""
                          width={20}
                          height={20}
                          className="h-4 w-4 object-contain"
                        />
                        {tech.name}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-text)]"
                  >
                    {isEnglish ? "Scope a similar flow" : "Diseñar un flujo similar"}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
