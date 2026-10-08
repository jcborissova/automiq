import type { SiteContent } from "../lib/site-content";

type ServicesProps = {
  content: SiteContent["services"];
};

export default function Services({ content }: ServicesProps) {
  const cards = content.cards.slice(0, 3);
  const isEnglish = content.eyebrow.toLowerCase().includes("what");
  const labels = {
    problem: isEnglish ? "Today" : "Hoy",
    result: isEnglish ? "With AutomIQ" : "Con AutomIQ",
    approach: isEnglish ? "Working rhythm" : "Ritmo de trabajo",
    approachText: isEnglish
      ? "We map the current workflow, define the first useful flow, and connect it with the tools the team already uses."
      : "Mapeamos el proceso actual, definimos el primer flujo útil y lo conectamos con las herramientas que ya usa el equipo.",
  };

  return (
    <section
      id="services"
      className="scroll-mt-24 bg-[var(--background)] py-14 text-[var(--ink-950)] sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-t border-[var(--border-strong)] pt-10 lg:grid-cols-[0.76fr_1.24fr] lg:gap-16 lg:pt-12">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--support)]">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] tracking-normal text-[var(--ink-950)] sm:text-[2.6rem] lg:text-[3rem]">
              {content.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--ink-700)] sm:text-lg sm:leading-9">
              {content.description}
            </p>
          </div>

          <div className="border-t border-[var(--border-strong)] lg:border-t-0">
            {cards.map((card, index) => {
              return (
                <article
                  key={card.id}
                  className="grid gap-4 border-b border-[var(--border-strong)] py-6 sm:grid-cols-[120px_1fr] sm:gap-8 lg:py-7"
                >
                  <div className="flex items-center justify-between gap-4 sm:block">
                    <span className="font-mono text-xs font-semibold text-[var(--support)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)] sm:mt-4">
                      {card.eyebrow}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold tracking-normal text-[var(--ink-950)] sm:text-2xl">
                      {card.title}
                    </h3>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-500)]">
                          {labels.problem}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[var(--ink-700)]">
                          {card.description}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-500)]">
                          {labels.result}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[var(--ink-800)]">
                          {card.outcomes[0]}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            <div className="py-6 lg:py-7">
              <p className="text-sm font-semibold text-[var(--ink-950)]">
                {labels.approach}
              </p>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--ink-700)]">
                {labels.approachText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
