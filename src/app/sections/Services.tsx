import { ArrowRight, Blocks, Plug, Workflow } from "lucide-react";
import Image from "next/image";
import type { SiteContent } from "../lib/site-content";
import Button from "../components/ui/Button";

type ServicesProps = {
  content: SiteContent["services"];
};

export default function Services({ content }: ServicesProps) {
  const cards = content.cards.slice(0, 3);
  const icons = [Blocks, Plug, Workflow];
  const isEnglish = content.eyebrow.toLowerCase().includes("what");
  const toolsLabel = isEnglish ? "Tools we work with" : "Herramientas que usamos";
  const tools = [
    { name: "n8n", src: "/assets/techs/n8n.png" },
    { name: "Make", src: "/assets/techs/make.png" },
    { name: "Retell", src: "/assets/techs/retell.png" },
    { name: "Automation Anywhere", src: "/assets/techs/automationanywhere.png" },
    { name: "Power Platform", src: "/assets/techs/powerplatform.png" },
    { name: "Zapier", src: "/assets/techs/zapier.png" },
    { name: "Next.js", src: "/assets/techs/nextjs.png" },
    { name: "React", src: "/assets/techs/react.png" },
    { name: "TypeScript", src: "/assets/techs/typescript.png" },
    { name: "Tailwind", src: "/assets/techs/tailwind.png" },
  ];
  const carouselTools = [...tools, ...tools];

  return (
    <section
      id="services"
      className="scroll-mt-24 bg-[var(--background)] py-12 text-[var(--ink-950)] sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-[var(--border-strong)] pt-8 sm:pt-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--support)]">
                {content.eyebrow}
              </p>
              <h2 className="mt-3 text-[2rem] font-semibold leading-[1.05] tracking-normal text-[var(--ink-950)] sm:text-[2.4rem] lg:text-[2.75rem]">
                {content.title}
              </h2>
            </div>

            <Button
              as="a"
              href="#contact"
              size="lg"
              rightIcon={<ArrowRight size={18} aria-hidden="true" />}
              className="w-fit"
            >
              {content.cta}
            </Button>
          </div>

          <div className="mt-7 -mx-4 flex snap-x gap-3 overflow-x-auto border-y border-[var(--border)] px-4 py-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:mt-8 lg:grid lg:gap-0 lg:overflow-visible lg:border-t lg:border-b-0 lg:px-0 lg:py-0 lg:grid-cols-3">
            {cards.map((card, index) => {
              const Icon = icons[index] ?? Blocks;

              return (
                <article
                  key={card.id}
                  className="flex min-h-[164px] w-[82vw] max-w-[320px] shrink-0 snap-start flex-col justify-between rounded-lg border border-[var(--border)] bg-white p-4 shadow-[var(--shadow-xs)] lg:w-auto lg:max-w-none lg:flex-row lg:justify-start lg:gap-4 lg:rounded-none lg:border-0 lg:border-b lg:border-r lg:bg-transparent lg:px-6 lg:py-7 lg:last:border-r-0"
                >
                  <div className="flex items-start gap-3 lg:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--support)]">
                      <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <div className="pt-1">
                      <h3 className="text-lg font-semibold tracking-normal text-[var(--ink-950)]">
                        {card.title}
                      </h3>
                      <p className="mt-2 max-w-[24rem] text-sm leading-6 text-[var(--ink-700)]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="overflow-hidden border-b border-[var(--border)] py-6 lg:py-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-500)]">
              {toolsLabel}
            </p>
            <div className="relative mt-4 overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--background)] to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--background)] to-transparent"
              />
              <div className="flex w-max animate-[tool-marquee_34s_linear_infinite] gap-2 hover:[animation-play-state:paused] motion-reduce:animate-none">
                {carouselTools.map((tool, index) => (
                  <div
                    key={`${tool.name}-${index}`}
                    className="flex h-[72px] w-[176px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-white/62 px-4 shadow-[var(--shadow-xs)]"
                    title={tool.name}
                  >
                    <Image
                      src={tool.src}
                      alt={tool.name}
                      width={150}
                      height={54}
                      sizes="150px"
                      className="max-h-7 w-auto max-w-[118px] object-contain opacity-85 saturate-[0.95] transition hover:opacity-100 hover:saturate-100"
                    />
                    <span className="text-[11px] font-semibold leading-none text-[var(--ink-500)]">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
