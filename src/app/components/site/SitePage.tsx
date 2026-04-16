import { getSiteContent, type Locale } from "@/app/lib/site-content";
import Hero from "@/app/sections/Hero";
import Services from "@/app/sections/Services";
import Tools from "@/app/sections/Tools";
import Contact from "@/app/sections/Contact";

type SitePageProps = {
  locale: Locale;
};

export default function SitePage({ locale }: SitePageProps) {
  const content = getSiteContent(locale);

  return (
    <>
      <Hero locale={locale} hero={content.hero} leadForm={content.leadForm} />
      <Services content={content.services} />
      <Tools content={content.tools} />
      <Contact
        locale={locale}
        content={content.contact}
        leadForm={content.leadForm}
      />
    </>
  );
}
