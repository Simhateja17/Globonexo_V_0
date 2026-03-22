import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/home/Navbar";
import { HeroSection, ServicesSection, GlobalPresenceSection, FeaturesSection, WhyChooseSection, TestimonialsSection, FaqSection, ContactSection } from "@/components/home";
import {
  fetchServices,
  fetchTestimonials,
  fetchFAQs,
  fetchHeroSection,
  fetchSiteSetting,
} from "@/lib/queries/cms";
import type { Locale } from "@/lib/types/cms";

async function HomeContent({ locale }: { locale: Locale }) {
  const [
    heroData,
    servicesHeader,
    services,
    globalPresenceData,
    featuresData,
    whyChooseData,
    testimonialsHeader,
    testimonials,
    faqHeader,
    faqs,
    contactHeader,
    companySetting,
  ] = await Promise.all([
    fetchHeroSection("home", "hero", locale),
    fetchHeroSection("home", "services", locale),
    fetchServices(locale),
    fetchHeroSection("home", "global-presence", locale),
    fetchHeroSection("home", "features", locale),
    fetchHeroSection("home", "why-choose", locale),
    fetchHeroSection("home", "testimonials", locale),
    fetchTestimonials(locale),
    fetchHeroSection("home", "faq", locale),
    fetchFAQs(locale),
    fetchHeroSection("home", "contact", locale),
    fetchSiteSetting("company"),
  ]);

  const companyValue = companySetting?.value as Record<string, string> | undefined;

  return (
    <>
      <HeroSection data={heroData} />
      <ServicesSection services={services} header={servicesHeader} />
      <GlobalPresenceSection data={globalPresenceData} />
      <FeaturesSection data={featuresData} />
      <WhyChooseSection data={whyChooseData} />
      <TestimonialsSection
        testimonials={testimonials}
        heading={testimonialsHeader?.title ?? undefined}
      />
      <FaqSection
        faqs={faqs}
        heading={faqHeader?.title ?? undefined}
      />
      <ContactSection
        contactInfo={
          companyValue
            ? {
                email: companyValue.email,
                phone: companyValue.phone,
                address: companyValue.address,
              }
            : undefined
        }
        heading={contactHeader?.title ?? undefined}
      />
    </>
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const cmsLocale = locale as Locale;

  return (
    <main className="relative min-h-screen" style={{ overflowX: "hidden", overflowY: "visible", backgroundColor: "var(--page-bg)" }}>

      {/* Page-level green glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width:        "68.75vw",
          aspectRatio:  "825.69 / 793.13",
          top:          "0",
          left:         "50%",
          transform:    "translateX(-50%)",
          borderRadius: "50%",
          background: [
            "radial-gradient(ellipse at 45% 20%,",
            "  rgba(85,255,173,0.92)   0%,",
            "  rgba(85,255,173,0.76)  14%,",
            "  rgba(85,255,173,0.56)  30%,",
            "  rgba(85,255,173,0.33)  48%,",
            "  rgba(85,255,173,0.16)  64%,",
            "  rgba(85,255,173,0.06)  80%,",
            "  rgba(85,255,173,0)    100%",
            ")",
          ].join(""),
          filter: "blur(clamp(200px, 37vw, 534px))",
          zIndex: 0,
        }}
      />

      {/* Secondary green glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width:        "19.8vw",
          aspectRatio:  "238 / 231",
          top:          "49.8vh",
          left:         "65%",
          transform:    "translateX(-50%)",
          borderRadius: "50%",
          background:   "radial-gradient(ellipse at 50% 50%, rgba(149,222,100,1) 0%, rgba(149,222,100,0) 100%)",
          filter:       "blur(200px)",
          zIndex:       0,
        }}
      />

      <Navbar />
      <Suspense>
        <HomeContent locale={cmsLocale} />
      </Suspense>
    </main>
  );
}
