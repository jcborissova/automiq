import { ArrowRight, Bot, FileCheck2, LayoutDashboard } from "lucide-react";
import type { Locale } from "../lib/site-content";

type Example = {
  title: string;
  description: string;
  technologies: string[];
  Icon: typeof LayoutDashboard;
};

const examples: Record<Locale, Example[]> = {
  es: [
    {
      title: "Panel operativo para solicitudes",
      description:
        "Entrada de casos, estados, responsables y seguimiento en una sola vista para el equipo.",
      technologies: ["Next.js", "React", "TypeScript", "Power Platform"],
      Icon: LayoutDashboard,
    },
    {
      title: "Flujo documental con revisión",
      description:
        "Recepción, validación y escalamiento de documentos antes de registrar o reportar.",
      technologies: ["n8n", "Make", "APIs", "Tailwind"],
      Icon: FileCheck2,
    },
    {
      title: "Asistente de llamadas y handoff",
      description:
        "Captura de intención, resumen de conversación y traspaso a equipo humano cuando aplica.",
      technologies: ["Retell", "OpenAI", "Zapier", "CRM"],
      Icon: Bot,
    },
  ],
  en: [
    {
      title: "Operations dashboard for requests",
      description:
        "Case intake, statuses, owners, and follow-up in one clear view for the team.",
      technologies: ["Next.js", "React", "TypeScript", "Power Platform"],
      Icon: LayoutDashboard,
    },
    {
      title: "Document workflow with review",
      description:
        "Document intake, validation, and escalation before recording or reporting.",
      technologies: ["n8n", "Make", "APIs", "Tailwind"],
      Icon: FileCheck2,
    },
    {
      title: "Call assistant and handoff",
      description:
        "Intent capture, conversation summary, and handoff to a human team when needed.",
      technologies: ["Retell", "OpenAI", "Zapier", "CRM"],
      Icon: Bot,
    },
  ],
};

export default function Examples({ locale }: { locale: Locale }) {
  const isEnglish = locale === "en";
  const items = examples[locale];

  return (
    <section
      id="examples"
      className="scroll-mt-24 bg-[var(--surface)] py-14 text-[var(--ink-950)] sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-t border-[var(--border-strong)] pt-8 sm:pt-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--support)]">
              {isEnglish ? "Work examples" : "Ejemplos de trabajo"}
            </p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-[1.05] tracking-normal sm:text-[2.4rem] lg:text-[2.75rem]">
              {isEnglish ? "What this looks like in practice" : "Cómo se ve en la práctica"}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--ink-700)]">
              {isEnglish
                ? "Concrete delivery patterns, shown without invented clients or inflated metrics."
                : "Patrones concretos de entrega, sin inventar clientes ni métricas infladas."}
            </p>
          </div>

          <div className="grid gap-3">
            {items.map(({ title, description, technologies, Icon }) => (
              <article
                key={title}
                className="grid gap-4 rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 shadow-[var(--shadow-xs)] sm:grid-cols-[48px_1fr_auto] sm:items-center sm:p-5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-[var(--accent-text)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-normal text-[var(--ink-950)]">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--ink-700)]">
                    {description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[var(--border-subtle)] bg-white px-2.5 py-1 text-[11px] font-semibold text-[var(--ink-700)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-text)]"
                >
                  {isEnglish ? "Discuss this" : "Conversar esto"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
