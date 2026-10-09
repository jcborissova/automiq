import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Button from "../components/ui/Button";
import Eyebrow from "../components/ui/Eyebrow";
import type { LeadFormLabels, Locale, SiteContent } from "../lib/site-content";

type HeroProps = {
  locale: Locale;
  hero: SiteContent["hero"];
  leadForm: LeadFormLabels;
};

export default function Hero({ locale, hero }: HeroProps) {
  return (
    <section
      id="home"
      aria-label={locale === "es" ? "Hero de AutomIQ" : "AutomIQ hero"}
      className="relative min-h-[590px] scroll-mt-24 overflow-hidden bg-[var(--surface-inverse)] text-white sm:min-h-[700px] lg:min-h-[760px]"
    >
      <Image
        src="/assets/hero/operations-laptop-optimized.jpg"
        alt=""
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover object-[55%_52%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,27,46,0.94)_0%,rgba(13,27,46,0.88)_42%,rgba(13,27,46,0.58)_72%,rgba(13,27,46,0.26)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,27,46,0.20)_0%,rgba(13,27,46,0.20)_100%)]"
      />

        <div className="relative mx-auto flex min-h-[590px] max-w-7xl flex-col justify-center px-4 pb-12 pt-8 sm:min-h-[700px] sm:px-6 sm:pb-24 sm:pt-20 lg:min-h-[760px] lg:px-8 lg:pb-32">
          <div className="max-w-4xl min-w-0">
              <Eyebrow
                tone="dark"
                icon={<Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
                className="max-w-[calc(100vw-2rem)]"
              >
                {hero.badge}
              </Eyebrow>

              <h1 className="mt-5 max-w-[22rem] text-[2.24rem] font-semibold leading-[1.02] tracking-normal text-white sm:max-w-5xl sm:text-[4.35rem] sm:leading-[0.98] lg:text-[5.45rem]">
                <span className="sm:hidden">
                  {locale === "es"
                    ? "Automatizamos procesos y conectamos tus sistemas."
                    : "We automate workflows and connect your systems."}
                </span>
                <span className="hidden sm:inline">{hero.title}</span>
                <span className="hidden text-white sm:block">{hero.highlight}</span>
              </h1>

              <span
                aria-hidden
                className="mt-5 block h-1.5 w-20 rounded-full bg-[#f97316] sm:mt-6"
              />

              <p className="mt-5 max-w-[22rem] text-[16px] font-medium leading-7 text-white sm:mt-7 sm:max-w-2xl sm:text-[20px] sm:leading-9">
                {hero.description}
              </p>

              <div className="mt-5 flex max-w-[22rem] flex-col gap-2 sm:mt-7 sm:max-w-none sm:flex-row sm:items-center sm:gap-3">
                <Button
                  as="a"
                  href="#contact"
                  size="lg"
                  full
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="sm:w-auto"
                >
                  {hero.primaryCta}
                </Button>
                <Button
                  as="a"
                  href={`mailto:hola@automiq.click?subject=${encodeURIComponent(
                    locale === "es"
                      ? "Quiero conversar sobre un proceso"
                      : "I want to discuss a workflow",
                  )}`}
                  size="lg"
                  variant="inverse"
                  full
                  className="sm:hidden"
                >
                  hola@automiq.click
                </Button>
                <Button
                  as="a"
                  href="#services"
                  size="lg"
                  variant="inverse"
                  full
                  className="!hidden sm:!inline-flex sm:w-auto"
                >
                  {hero.secondaryCta}
                </Button>
              </div>

          </div>
        </div>
    </section>
  );
}
