import { getSiteContent, type Locale } from "@/app/lib/site-content";
import Hero from "@/app/sections/Hero";
import Services from "@/app/sections/Services";
import UseCases from "@/app/sections/UseCases";
import Process from "@/app/sections/Process";
import Cases from "@/app/sections/Cases";
import Stack from "@/app/sections/Stack";
import Faq from "@/app/sections/Faq";
import Contact from "@/app/sections/Contact";
import TrustBar from "@/app/sections/TrustBar";

type SitePageProps = {
  locale: Locale;
};

export default function SitePage({ locale }: SitePageProps) {
  const content = getSiteContent(locale);

  return (
    <>
      <Hero locale={locale} hero={content.hero} leadForm={content.leadForm} />
      <TrustBar content={content.trustBar} />
      <Services content={content.services} />
      <UseCases content={content.useCases} />
      <Process content={content.process} />
      <Cases content={content.cases} />
      <Stack content={content.capabilities} />
      <Faq content={content.faq} />
      <Contact locale={locale} content={content.contact} leadForm={content.leadForm} />
    </>
  );
}
