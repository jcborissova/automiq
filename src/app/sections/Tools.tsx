import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Database,
  Inbox,
  ServerCog,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Eyebrow from "../components/ui/Eyebrow";
import { SectionHeader } from "../components/ui/Section";
import type { SiteContent } from "../lib/site-content";

type ToolsProps = {
  content: SiteContent["tools"];
};

function ArchitectureNode({
  block,
  Icon,
  index,
}: {
  block: SiteContent["tools"]["architecture"]["context"];
  Icon: LucideIcon;
  index: number;
}) {
  return (
    <article className="relative rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-sm)] transition hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)] sm:p-5">
      <div className="grid gap-3 sm:grid-cols-[44px_1fr] sm:gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] text-[var(--ink-950)] sm:h-11 sm:w-11">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-semibold text-[var(--ink-400)]">
              {String(index).padStart(2, "0")}
            </span>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--support)]">
              {block.label}
            </p>
          </div>
          <h3 className="mt-1.5 text-lg font-semibold leading-tight tracking-[-0.01em] text-[var(--ink-950)] sm:text-xl">
            {block.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--ink-500)] sm:mt-2.5 sm:leading-7">
            {block.detail}
          </p>
        </div>
      </div>
    </article>
  );
}

function EngineCard({
  architecture,
  note,
}: {
  architecture: SiteContent["tools"]["architecture"];
  note: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-xl border border-white/10 bg-[var(--surface-inverse)] p-5 text-white shadow-[var(--shadow-xl)] sm:p-7 lg:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(8,145,178,0.18),rgba(255,255,255,0)_38%,rgba(249,115,22,0.1))]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 h-60 w-60 rounded-full bg-[var(--accent)]/20 blur-3xl"
      />

      <div className="relative flex items-start gap-3 sm:gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-white sm:h-12 sm:w-12">
          <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
            {architecture.core.label}
          </p>
          <h3 className="mt-1.5 text-2xl font-semibold leading-tight tracking-[-0.02em] text-white sm:mt-2 sm:text-3xl lg:text-[2.25rem]">
            {architecture.core.title}
          </h3>
        </div>
      </div>

      <p className="relative mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:mt-5 sm:text-base sm:leading-7">
        {architecture.core.detail}
      </p>

      <div className="relative mt-6 grid gap-x-6 gap-y-4 sm:mt-7 sm:gap-y-5 sm:grid-cols-2">
        {architecture.core.modules.map((module, index) => (
          <div key={module.title} className="border-t border-white/10 pt-3 sm:pt-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] font-semibold text-cyan-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-sm font-semibold text-white">{module.title}</p>
            </div>
            <p className="mt-1.5 text-sm leading-6 text-slate-400 sm:mt-2">
              {module.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="relative mt-6 flex items-start gap-3 border-t border-white/10 pt-4 sm:mt-7 sm:pt-5">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400 sm:h-5 sm:w-5" />
        <p className="text-sm leading-6 text-slate-300 sm:leading-7">{note}</p>
      </div>
    </article>
  );
}

export default function Tools({ content }: ToolsProps) {
  const { architecture } = content;
  const flow = [
    { Icon: Database, block: architecture.context },
    { Icon: Inbox, block: architecture.input },
    { Icon: ServerCog, block: architecture.output },
    { Icon: ShieldCheck, block: architecture.control },
  ];

  return (
    <section
      id="tools"
      className="relative scroll-mt-24 overflow-hidden bg-[var(--surface)] py-16 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_50%,#ffffff_100%)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 xl:grid-cols-[1.04fr_0.96fr] xl:items-stretch">
          <EngineCard architecture={architecture} note={content.note} />

          <div className="grid gap-3 sm:gap-4">
            {flow.map((item, index) => (
              <div key={item.block.label} className="relative">
                <ArchitectureNode
                  Icon={item.Icon}
                  block={item.block}
                  index={index + 1}
                />
                {index < flow.length - 1 ? (
                  <div className="mx-auto flex h-3 w-full items-center justify-center text-[var(--ink-300)] xl:hidden">
                    <ArrowRight className="h-3.5 w-3.5 rotate-90" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
