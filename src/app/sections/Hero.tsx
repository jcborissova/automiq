"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import DemoForm from "../components/DemoForm";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import Eyebrow from "../components/ui/Eyebrow";
import type { LeadFormLabels, Locale, SiteContent } from "../lib/site-content";

type HeroProps = {
  locale: Locale;
  hero: SiteContent["hero"];
  leadForm: LeadFormLabels;
};

export default function Hero({ locale, hero, leadForm }: HeroProps) {
  const [openLeadForm, setOpenLeadForm] = useState(false);

  return (
    <>
      <section
        id="home"
        aria-label={locale === "es" ? "Hero de AutomIQ" : "AutomIQ hero"}
        className="relative min-h-[660px] scroll-mt-24 overflow-hidden bg-[var(--surface-inverse)] text-white sm:min-h-[700px] lg:min-h-[760px]"
      >
        <Image
          src="/assets/hero/operations-laptop-cc0.jpg"
          alt=""
          fill
          priority
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

        <div className="relative mx-auto flex min-h-[660px] max-w-7xl flex-col justify-center px-4 pb-20 pt-14 sm:min-h-[700px] sm:px-6 sm:pb-24 sm:pt-20 lg:min-h-[760px] lg:px-8 lg:pb-32">
          <div className="max-w-4xl min-w-0">
              <Eyebrow
                tone="dark"
                icon={<Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
                className="max-w-[calc(100vw-2rem)]"
              >
                {hero.badge}
              </Eyebrow>

              <h1 className="mt-5 max-w-[22rem] text-[2.24rem] font-semibold leading-[1.02] tracking-normal text-white sm:max-w-5xl sm:text-[4.35rem] sm:leading-[0.98] lg:text-[5.45rem]">
                {hero.title}
                <span className="block text-white">{hero.highlight}</span>
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
                  onClick={() => setOpenLeadForm(true)}
                  size="lg"
                  full
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="sm:w-auto"
                >
                  {hero.primaryCta}
                </Button>
                <Button
                  as="a"
                  href="#services"
                  size="lg"
                  variant="inverse"
                  full
                  className="sm:w-auto"
                >
                  {hero.secondaryCta}
                </Button>
              </div>

          </div>
        </div>
      </section>

      <Modal
        open={openLeadForm}
        onClose={() => setOpenLeadForm(false)}
        title={hero.primaryCta}
      >
        <DemoForm locale={locale} labels={leadForm} source="hero-modal" compact />
      </Modal>
    </>
  );
}
