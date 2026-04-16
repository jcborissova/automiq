import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Database,
  FileText,
  Mail,
  MessageSquare,
  PanelsTopLeft,
  Search,
  Sparkles,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Eyebrow from "../components/ui/Eyebrow";
import { SectionHeader } from "../components/ui/Section";
import type { ServiceCard, SiteContent } from "../lib/site-content";

type ServicesProps = {
  content: SiteContent["services"];
};

const iconMap: Record<ServiceCard["id"], LucideIcon> = {
  agents: Bot,
  automation: Workflow,
  apps: PanelsTopLeft,
  knowledge: BrainCircuit,
};

function ServicePreview({ id }: { id: ServiceCard["id"] }) {
  if (id === "agents") {
    return (
      <div className="flex h-full flex-col justify-center gap-2.5">
        <div className="flex items-start gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--ink-950)] text-[11px] font-bold text-white shadow-[var(--shadow-xs)]">
            U
          </span>
          <div className="flex-1 rounded-2xl rounded-tl-sm border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 shadow-[var(--shadow-xs)]">
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-3 w-3 text-[var(--ink-400)]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-400)]">
                Cliente
              </span>
            </div>
            <div className="mt-1.5 space-y-1.5">
              <div className="h-1.5 w-5/6 rounded-full bg-[var(--ink-200)]" />
              <div className="h-1.5 w-3/5 rounded-full bg-[var(--ink-200)]" />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2.5 pl-6">
          <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--accent)_0%,#ea580c_100%)] text-[10px] font-bold text-white shadow-[var(--shadow-sm)]">
            <Bot className="h-4 w-4" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-[var(--surface)]" />
          </span>
          <div className="flex-1 rounded-2xl rounded-tl-sm border border-[var(--accent)]/25 bg-[var(--accent-soft)] px-3.5 py-2.5">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-[var(--accent)]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                Agente IA
              </span>
            </div>
            <div className="mt-1.5 space-y-1.5">
              <div className="h-1.5 w-11/12 rounded-full bg-[var(--accent)]/45" />
              <div className="h-1.5 w-8/12 rounded-full bg-[var(--accent)]/45" />
              <div className="h-1.5 w-6/12 rounded-full bg-[var(--accent)]/30" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === "automation") {
    const nodes = [
      { label: "Intake", Icon: Mail },
      { label: "Logic", Icon: Zap },
      { label: "Action", Icon: CheckCircle2 },
    ];
    return (
      <div className="flex h-full flex-col justify-center gap-3">
        <div className="flex items-center justify-between gap-1">
          {nodes.map((node, index) => (
            <div key={node.label} className="flex items-center gap-1">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`relative grid h-12 w-12 place-items-center rounded-xl border bg-[var(--surface)] shadow-[var(--shadow-sm)] ${
                    index === 1
                      ? "border-[var(--accent)]/50 ring-2 ring-[var(--accent)]/20"
                      : "border-[var(--border)]"
                  }`}
                >
                  <node.Icon
                    className={`h-4 w-4 ${
                      index === 1 ? "text-[var(--accent)]" : "text-[var(--ink-700)]"
                    }`}
                  />
                  <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-[var(--ink-950)] font-mono text-[8px] font-bold text-white">
                    {index + 1}
                  </span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-700)]">
                  {node.label}
                </span>
              </div>
              {index < nodes.length - 1 && (
                <div className="mb-4 flex items-center">
                  <span className="h-px w-3 bg-[var(--ink-200)] sm:w-4" />
                  <ArrowRight className="h-3 w-3 text-[var(--accent)]" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[10px] font-medium text-[var(--ink-700)] shadow-[var(--shadow-xs)]">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="font-mono">98.2%</span>
          <span>ejecuciones ok</span>
        </div>
      </div>
    );
  }

  if (id === "apps") {
    const kpis = [
      { label: "TICKETS", value: "−37%", trend: true },
      { label: "TMO", value: "4.2h", trend: false },
      { label: "SLA", value: "98%", trend: false },
    ];
    const bars = [40, 65, 52, 78, 90, 72];
    return (
      <div className="flex h-full flex-col gap-2">
        <div className="grid grid-cols-3 gap-1.5">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className={`rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2 shadow-[var(--shadow-xs)] ${
                kpi.trend ? "ring-1 ring-[var(--accent)]/40" : ""
              }`}
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-400)]">
                {kpi.label}
              </p>
              <p
                className={`mt-0.5 text-[15px] font-semibold tracking-tight ${
                  kpi.trend ? "text-[var(--accent)]" : "text-[var(--ink-950)]"
                }`}
              >
                {kpi.value}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2 shadow-[var(--shadow-xs)]">
          {bars.map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded-sm ${
                i === bars.length - 2
                  ? "bg-[var(--accent)]"
                  : "bg-[var(--ink-200)]"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full items-center">
      <div className="relative flex w-full items-center gap-2">
        <div className="relative">
          <div className="absolute left-2 top-1 h-28 w-36 rotate-[-4deg] rounded-lg border border-[var(--border)] bg-[var(--surface)] opacity-60 shadow-[var(--shadow-xs)]" />
          <div className="absolute left-1 top-0.5 h-28 w-36 rotate-[-2deg] rounded-lg border border-[var(--border)] bg-[var(--surface)] opacity-85 shadow-[var(--shadow-xs)]" />
          <div className="relative flex h-28 w-36 flex-col gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 shadow-[var(--shadow-md)]">
            <div className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-500)]">
                SOP · 01
              </span>
            </div>
            <div className="h-1.5 w-11/12 rounded-full bg-[var(--ink-200)]" />
            <div className="h-1.5 w-9/12 rounded-full bg-[var(--ink-200)]" />
            <div className="h-1.5 w-7/12 rounded-full bg-[var(--ink-100)]" />
            <div className="mt-auto inline-flex items-center gap-1 self-start rounded-full bg-[var(--accent-soft)] px-1.5 py-0.5">
              <CheckCircle2 className="h-2.5 w-2.5 text-[var(--accent)]" />
              <span className="text-[9px] font-semibold text-[var(--accent)]">
                Indexed
              </span>
            </div>
          </div>
        </div>

        <ArrowRight className="h-4 w-4 shrink-0 text-[var(--ink-400)]" />

        <div className="flex-1 space-y-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 shadow-[var(--shadow-sm)]">
          <div className="flex items-center gap-1.5">
            <Search className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-500)]">
              Consulta
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-dashed border-[var(--border)] bg-[var(--surface-raised)] px-2 py-1.5">
            <span className="h-1.5 flex-1 rounded-full bg-[var(--ink-200)]" />
            <span className="font-mono text-[9px] font-semibold text-[var(--accent)]">
              ⌘K
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
              <div className="h-1 w-3/5 rounded-full bg-[var(--ink-200)]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
              <div className="h-1 w-2/5 rounded-full bg-[var(--ink-200)]" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md bg-emerald-50 px-1.5 py-0.5">
            <span className="text-[9px] font-semibold text-emerald-700">
              Respuesta
            </span>
            <Database className="h-2.5 w-2.5 text-emerald-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services({ content }: ServicesProps) {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden bg-[var(--background)] py-16 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_0%,rgba(8,145,178,0.08),transparent_35%),radial-gradient(circle_at_90%_100%,rgba(249,115,22,0.06),transparent_32%)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-12">
          <SectionHeader
            eyebrow={
              <Eyebrow icon={<Sparkles className="h-3 w-3" />}>
                {content.eyebrow}
              </Eyebrow>
            }
            title={content.title}
          />

          <p className="max-w-2xl text-[15px] leading-7 text-[var(--ink-500)] sm:text-base sm:leading-8 lg:justify-self-end lg:text-right">
            {content.description}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-2">
          {content.cards.map((card, index) => {
            const Icon = iconMap[card.id];

            return (
              <article
                key={card.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)] transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-lg)]"
              >
                <div className="relative overflow-hidden border-b border-[var(--border)] bg-[linear-gradient(135deg,var(--surface-raised)_0%,var(--surface)_100%)] px-5 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.35]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[var(--accent)]/8 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="relative flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)] shadow-[var(--shadow-xs)]">
                      <span className="font-mono text-[var(--accent)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[var(--ink-700)]">{card.eyebrow}</span>
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--ink-950)] shadow-[var(--shadow-xs)] transition group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white sm:h-11 sm:w-11">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                  </div>

                  <div className="relative mt-5 h-[148px] sm:mt-6 sm:h-[160px]">
                    <ServicePreview id={card.id} />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-7">
                  <h3 className="max-w-md text-[1.3rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--ink-950)] sm:text-[1.5rem] lg:text-[1.65rem]">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--ink-500)] sm:mt-4 sm:leading-7">
                    {card.description}
                  </p>

                  <ul className="mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
                    {card.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="flex items-start gap-2.5 text-sm leading-6 text-[var(--ink-700)]"
                      >
                        <CheckCircle2 className="mt-[2px] h-4 w-4 shrink-0 text-[var(--accent)]" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-1.5 border-t border-[var(--border)] pt-4 sm:gap-2 sm:pt-5">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-[var(--border)] bg-[var(--surface-raised)] px-2.5 py-1 text-[11px] font-medium text-[var(--ink-700)] sm:text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
