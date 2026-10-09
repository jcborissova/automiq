import { ArrowRight, Bot, FileCheck2, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import type { Locale } from "../lib/site-content";

type Example = {
  title: string;
  description: string;
  image: string;
  technologies: {
    name: string;
    logo: string;
  }[];
  Icon: typeof LayoutDashboard;
};

const examples: Record<Locale, Example[]> = {
  es: [
    {
      title: "Panel operativo para solicitudes",
      description:
        "Entrada de casos, estados, responsables y seguimiento en una sola vista para el equipo.",
      image: "/assets/services/web.png",
      technologies: [
        { name: "Next.js", logo: "/assets/techs/nextjs.png" },
        { name: "React", logo: "/assets/techs/react.png" },
        { name: "TypeScript", logo: "/assets/techs/typescript.png" },
      ],
      Icon: LayoutDashboard,
    },
    {
      title: "Flujo documental con revisión",
      description:
        "Recepción, validación y escalamiento de documentos antes de registrar o reportar.",
      image: "/assets/services/auto.png",
      technologies: [
        { name: "n8n", logo: "/assets/techs/n8n.png" },
        { name: "Make", logo: "/assets/techs/make.png" },
        { name: "Tailwind", logo: "/assets/techs/tailwind.png" },
      ],
      Icon: FileCheck2,
    },
    {
      title: "Asistente de llamadas y handoff",
      description:
        "Captura de intención, resumen de conversación y traspaso a equipo humano cuando aplica.",
      image: "/assets/cases/Case2.png",
      technologies: [
        { name: "Retell", logo: "/assets/techs/retell.png" },
        { name: "Zapier", logo: "/assets/techs/zapier.png" },
        { name: "Automation Anywhere", logo: "/assets/techs/automationanywhere.png" },
      ],
      Icon: Bot,
    },
  ],
  en: [
    {
      title: "Operations dashboard for requests",
      description:
        "Case intake, statuses, owners, and follow-up in one clear view for the team.",
      image: "/assets/services/web.png",
      technologies: [
        { name: "Next.js", logo: "/assets/techs/nextjs.png" },
        { name: "React", logo: "/assets/techs/react.png" },
        { name: "TypeScript", logo: "/assets/techs/typescript.png" },
      ],
      Icon: LayoutDashboard,
    },
    {
      title: "Document workflow with review",
      description:
        "Document intake, validation, and escalation before recording or reporting.",
      image: "/assets/services/auto.png",
      technologies: [
        { name: "n8n", logo: "/assets/techs/n8n.png" },
        { name: "Make", logo: "/assets/techs/make.png" },
        { name: "Tailwind", logo: "/assets/techs/tailwind.png" },
      ],
      Icon: FileCheck2,
    },
    {
      title: "Call assistant and handoff",
      description:
        "Intent capture, conversation summary, and handoff to a human team when needed.",
      image: "/assets/cases/Case2.png",
      technologies: [
        { name: "Retell", logo: "/assets/techs/retell.png" },
        { name: "Zapier", logo: "/assets/techs/zapier.png" },
        { name: "Automation Anywhere", logo: "/assets/techs/automationanywhere.png" },
      ],
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
        <div className="border-t border-[var(--border-strong)] pt-8 sm:pt-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--support)]">
              {isEnglish ? "Solution examples" : "Ejemplos de soluciones"}
            </p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-[1.05] tracking-normal sm:text-[2.4rem] lg:text-[2.75rem]">
              {isEnglish ? "Work that feels concrete" : "Trabajo que se entiende rápido"}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--ink-700)]">
              {isEnglish
                ? "Visual examples with the technologies that usually sit behind each flow."
                : "Ejemplos visuales con las tecnologías que suelen sostener cada flujo."}
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {items.map(({ title, description, image, technologies, Icon }) => (
              <article
                key={title}
                className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--background)] shadow-[var(--shadow-xs)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--border)] bg-[var(--ink-950)]">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover opacity-76"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,27,46,0.04),rgba(13,27,46,0.42))]" />
                  <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/12 text-white backdrop-blur">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg font-semibold tracking-normal text-[var(--ink-950)]">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--ink-700)]">
                    {description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span
                        key={tech.name}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-white px-2.5 py-1 text-[11px] font-semibold text-[var(--ink-700)]"
                      >
                        <Image
                          src={tech.logo}
                          alt=""
                          width={18}
                          height={18}
                          className="h-3.5 w-3.5 object-contain"
                        />
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-text)]"
                  >
                    {isEnglish ? "Discuss this" : "Conversar esto"}
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
