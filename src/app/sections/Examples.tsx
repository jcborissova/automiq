import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
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
  visual: "requests" | "documents" | "handoff";
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
        "Aplicación interna con estados, responsables, historial y notificaciones.",
      visual: "requests",
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
        "Automatización con reglas, revisión humana cuando aplica y registro final.",
      visual: "documents",
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
        "Flujo conectado a voz, CRM y mensajería para resumir, asignar y dejar trazabilidad.",
      visual: "handoff",
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
        "Internal app with statuses, owners, history, and notifications.",
      visual: "requests",
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
        "Automation with rules, human review when needed, and final registration.",
      visual: "documents",
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
        "Flow connected to voice, CRM, and messaging to summarize, assign, and keep a traceable record.",
      visual: "handoff",
      technologies: [
        { name: "Retell", logo: "/assets/techs/retell.png" },
        { name: "Zapier", logo: "/assets/techs/zapier.png" },
        { name: "Automation Anywhere", logo: "/assets/techs/automationanywhere.png" },
      ],
    },
  ],
};

function DemoVisual({ type, isEnglish }: { type: UseCase["visual"]; isEnglish: boolean }) {
  if (type === "documents") {
    return (
      <div className="flex h-full min-h-[300px] flex-col justify-center bg-[#f4f7fb] p-5 sm:p-6">
        <DemoLabel>{isEnglish ? "Demo view" : "Vista de demostración"}</DemoLabel>
        <div className="mt-4 rounded-lg border border-[var(--border)] bg-white p-4 shadow-[var(--shadow-xs)]">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
            <FlowStep title={isEnglish ? "Receive" : "Recibir"} detail="PDF / formulario" />
            <FlowArrow />
            <FlowStep title={isEnglish ? "Review" : "Revisar"} detail={isEnglish ? "rules + owner" : "reglas + responsable"} />
            <FlowArrow />
            <FlowStep title={isEnglish ? "Register" : "Registrar"} detail={isEnglish ? "system update" : "actualizar sistema"} />
          </div>
          <div className="mt-4 rounded-md border border-[var(--border-subtle)] bg-[#fff8f2] px-3 py-2 text-sm font-semibold text-[var(--ink-800)]">
            {isEnglish ? "Exception route: missing data -> human review" : "Ruta de excepción: datos faltantes -> revisión humana"}
          </div>
        </div>
      </div>
    );
  }

  if (type === "handoff") {
    return (
      <div className="flex h-full min-h-[300px] flex-col justify-center bg-[#f4f7fb] p-5 sm:p-6">
        <DemoLabel>{isEnglish ? "Demo view" : "Vista de demostración"}</DemoLabel>
        <div className="mt-4 grid gap-3">
          <div className="rounded-lg border border-[var(--border)] bg-white p-4 shadow-[var(--shadow-xs)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
                  {isEnglish ? "Incoming call" : "Llamada entrante"}
                </p>
                <p className="mt-2 text-lg font-semibold text-[var(--ink-950)]">
                  {isEnglish ? "Service request" : "Solicitud de servicio"}
                </p>
              </div>
              <span className="rounded-full bg-[#eaf3ff] px-3 py-1 text-sm font-semibold text-[var(--accent-text)]">
                02:14
              </span>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-[var(--ink-700)]">
              <p>{isEnglish ? "Intent: schedule follow-up" : "Intención: agendar seguimiento"}</p>
              <p>{isEnglish ? "Summary ready for assigned team" : "Resumen listo para el equipo asignado"}</p>
            </div>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-white p-4 shadow-[var(--shadow-xs)]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
              Handoff
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusPill>{isEnglish ? "Owner: Support" : "Responsable: Soporte"}</StatusPill>
              <StatusPill>{isEnglish ? "Status: Needs reply" : "Estado: requiere respuesta"}</StatusPill>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[300px] flex-col justify-center bg-[#f4f7fb] p-5 sm:p-6">
      <DemoLabel>{isEnglish ? "Demo view" : "Vista de demostración"}</DemoLabel>
      <div className="mt-4 rounded-lg border border-[var(--border)] bg-white p-4 shadow-[var(--shadow-xs)]">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-base font-semibold text-[var(--ink-950)]">
            {isEnglish ? "Requests board" : "Tablero de solicitudes"}
          </p>
          <span className="rounded-full bg-[#fff3e8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--support)]">
            {isEnglish ? "3 open" : "3 abiertas"}
          </span>
        </div>
        <div className="grid gap-2">
          <RequestRow title={isEnglish ? "New integration" : "Nueva integración"} owner={isEnglish ? "Owner: Ops" : "Resp.: Operaciones"} status={isEnglish ? "In review" : "En revisión"} />
          <RequestRow title={isEnglish ? "Data correction" : "Corrección de datos"} owner={isEnglish ? "Owner: Admin" : "Resp.: Admin"} status={isEnglish ? "Pending" : "Pendiente"} />
          <RequestRow title={isEnglish ? "Report request" : "Solicitud de reporte"} owner={isEnglish ? "Owner: Finance" : "Resp.: Finanzas"} status={isEnglish ? "Ready" : "Lista"} />
        </div>
        <button className="mt-4 w-full rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white">
          {isEnglish ? "Review next request" : "Revisar próxima solicitud"}
        </button>
      </div>
    </div>
  );
}

function DemoLabel({ children }: { children: ReactNode }) {
  return (
    <span className="w-fit rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-600)]">
      {children}
    </span>
  );
}

function RequestRow({ title, owner, status }: { title: string; owner: string; status: string }) {
  return (
    <div className="grid gap-2 rounded-md border border-[var(--border-subtle)] bg-[#fbfcfe] p-3 text-sm sm:grid-cols-[1fr_auto] sm:items-center">
      <div>
        <p className="font-semibold text-[var(--ink-950)]">{title}</p>
        <p className="mt-1 text-[var(--ink-600)]">{owner}</p>
      </div>
      <StatusPill>{status}</StatusPill>
    </div>
  );
}

function StatusPill({ children }: { children: ReactNode }) {
  return (
    <span className="w-fit rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-semibold text-[var(--ink-700)]">
      {children}
    </span>
  );
}

function FlowStep({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-md border border-[var(--border-subtle)] bg-[#fbfcfe] p-3">
      <p className="text-sm font-semibold text-[var(--ink-950)]">{title}</p>
      <p className="mt-1 text-xs font-medium text-[var(--ink-600)]">{detail}</p>
    </div>
  );
}

function FlowArrow() {
  return <div className="hidden h-px w-8 bg-[var(--accent)] sm:block" aria-hidden="true" />;
}

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
                  className={`${index % 2 === 1 ? "lg:order-2" : ""} border-b border-[var(--border)] lg:border-b-0`}
                >
                  <DemoVisual type={item.visual} isEnglish={isEnglish} />
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
