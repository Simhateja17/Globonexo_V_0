import { Suspense } from "react";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  Navbar,
  WhyChooseSection,
  TestimonialsSection,
  FaqSection,
  ContactSection,
} from "@/components/home";
import {
  fetchTestimonials,
  fetchFAQs,
  fetchHeroSections,
  fetchHeroSection,
  fetchSiteSetting,
} from "@/lib/queries/cms";
import type { HeroSection, Locale } from "@/lib/types/cms";

/* ─── gradient heading helper ──────────────────────────────────────────── */
const gradientHeadingStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: "clamp(28px, 3.2vw, 50px)",
  lineHeight: "clamp(40px, 5vw, 65px)",
  letterSpacing: "-0.05em",
  background:
    "linear-gradient(180deg, #FFF 54%, #95DE64 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/* ─── shared body text style ───────────────────────────────────────────── */
const bodyTextStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 400,
  fontSize: "clamp(14px, 1.25vw + 0.25rem, 20px)",
  lineHeight: "31px",
  color: "#FFFFFF",
  letterSpacing: "-0.002px",
};

/* ─── shared green button style ────────────────────────────────────────── */
const greenButtonStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: "15px",
  lineHeight: "31px",
  color: "white",
  background: "#397D4F",
  borderRadius: "36px",
  border: "none",
  padding: "10px 32px",
  cursor: "pointer",
  boxShadow: "0px 16px 64px rgba(57,125,79,0.5)",
};

/* ═══════════════════════════════════════════════════════════════════════════
   Section 1 – Hero
   ═══════════════════════════════════════════════════════════════════════ */
async function ServicesHeroSection({ data }: { data?: HeroSection | null }) {
  const t = await getTranslations("servicesPage");
  const title = data?.title ?? t("heroTitle");
  const description =
    data?.description ?? t("heroDescription");

  return (
    <section
      className="relative flex justify-center"
      style={{ background: "transparent" }}
    >
      {/* Stars overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/stars-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
          zIndex: 1,
        }}
      />

      <div
        className="relative z-10 w-full flex justify-center px-5 sm:px-6 md:px-8 lg:px-10"
        style={{
          paddingTop: "calc(clamp(80px, 10vh, 120px) + 7px)",
          paddingBottom: "clamp(40px, 5vw, 80px)",
        }}
      >
        <div
          className="flex flex-col items-start w-full"
          style={{ maxWidth: "min(1400px, 96vw)" }}
        >
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(32px, 3.5vw + 1rem, 55px)",
              lineHeight: "clamp(40px, 5vw, 65px)",
              letterSpacing: "-0.05em",
              background:
                "linear-gradient(180deg, #FFF 54%, #95DE64 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              ...bodyTextStyle,
              marginTop: "clamp(12px, 1.5vw, 20px)",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Section 2 – End-to-End Software Testing Solutions
   ═══════════════════════════════════════════════════════════════════════ */
async function EndToEndSection({ data }: { data?: HeroSection | null }) {
  const t = await getTranslations("servicesPage");
  const title = data?.title ?? t("endToEndTitle");
  const description =
    data?.description ?? t("endToEndDesc");
  const extra = data?.extra_data as Record<string, string> | null;
  const body2 = extra?.body2 ?? t("endToEndBody2");
  const illustration = extra?.illustration ?? "/images/first_illustration.webp";
  const ctaText = data?.cta_text ?? t("getStarted");

  return (
    <section
      className="relative"
      style={{
        paddingTop: "clamp(40px, 5vw, 80px)",
        paddingBottom: "clamp(60px, 8vw, 120px)",
        overflow: "hidden",
      }}
    >
      <div
        className="relative z-10 mx-auto px-5 sm:px-6 md:px-8 lg:px-10"
        style={{ maxWidth: "min(1400px, 96vw)" }}
      >
        <div
          className="flex flex-col md:flex-row items-center w-full"
          style={{ gap: "clamp(32px, 4vw, 64px)" }}
        >
          {/* Left text ~60% */}
          <div className="flex flex-col" style={{ flex: "1 1 60%" }}>
            <h2
              style={{
                ...gradientHeadingStyle,
                textAlign: "left",
              }}
            >
              {title}
            </h2>

            <p style={{ ...bodyTextStyle, marginTop: "clamp(16px, 2vw, 28px)" }}>
              {description}
            </p>

            <p style={{ ...bodyTextStyle, marginTop: "16px" }}>
              {body2}
            </p>

            <div style={{ marginTop: "clamp(24px, 3vw, 40px)" }}>
              <button style={greenButtonStyle}>{ctaText}</button>
            </div>
          </div>

          {/* Right illustration ~40% */}
          <div
            className="flex items-center justify-center"
            style={{ flex: "1 1 40%", maxWidth: "407px" }}
          >
            <Image
              src={illustration}
              alt={t("endToEndIllAlt")}
              width={1000}
              height={885}
              sizes="(max-width: 768px) 96vw, 40vw"
              loading="lazy"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Section 3 – Automated Testing (illustration left, text right)
   ═══════════════════════════════════════════════════════════════════════ */
async function AutomatedSectionLeft({ data }: { data?: HeroSection | null }) {
  const t = await getTranslations("servicesPage");
  const title = data?.title ?? t("automatedLeftTitle");
  const description =
    data?.description ?? t("automatedLeftDesc");
  const extra = data?.extra_data as Record<string, string> | null;
  const body2 = extra?.body2 ?? t("automatedLeftBody2");
  const illustration = extra?.illustration ?? "/images/second_illustration.webp";
  const ctaText = data?.cta_text ?? t("learnNow");

  return (
    <section
      className="relative"
      style={{
        paddingTop: "clamp(40px, 5vw, 80px)",
        paddingBottom: "clamp(60px, 8vw, 120px)",
        overflow: "hidden",
      }}
    >
      <div
        className="relative z-10 mx-auto px-5 sm:px-6 md:px-8 lg:px-10"
        style={{ maxWidth: "min(1400px, 96vw)" }}
      >
        <h2
          style={{
            ...gradientHeadingStyle,
            textAlign: "center",
            marginBottom: "clamp(32px, 4vw, 56px)",
          }}
        >
          {title}
        </h2>

        <div
          className="flex flex-col md:flex-row items-center w-full"
          style={{ gap: "clamp(32px, 4vw, 64px)" }}
        >
          {/* Left illustration ~40% */}
          <div
            className="flex items-center justify-center"
            style={{ flex: "1 1 40%", maxWidth: "407px" }}
          >
            <Image
              src={illustration}
              alt={t("automatedLeftIllAlt")}
              width={1000}
              height={944}
              sizes="(max-width: 768px) 96vw, 40vw"
              loading="lazy"
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          {/* Right text ~60% */}
          <div
            className="flex flex-col text-left md:text-right"
            style={{ flex: "1 1 60%" }}
          >
            <p style={{ ...bodyTextStyle, marginTop: 0 }}>
              {description}
            </p>

            <p style={{ ...bodyTextStyle, marginTop: "16px" }}>
              {body2}
            </p>

            <div
              style={{
                marginTop: "clamp(24px, 3vw, 40px)",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button style={greenButtonStyle}>{ctaText}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Section 4 – Automated Testing (text left, illustration right)
   ═══════════════════════════════════════════════════════════════════════ */
async function AutomatedSectionRight({ data }: { data?: HeroSection | null }) {
  const t = await getTranslations("servicesPage");
  const title = data?.title ?? t("automatedRightTitle");
  const description =
    data?.description ?? t("automatedRightDesc");
  const extra = data?.extra_data as Record<string, string> | null;
  const body2 = extra?.body2 ?? t("automatedRightBody2");
  const illustration = extra?.illustration ?? "/images/third_illustration.webp";
  const ctaText = data?.cta_text ?? t("learnNow");

  return (
    <section
      className="relative"
      style={{
        paddingTop: "clamp(40px, 5vw, 80px)",
        paddingBottom: "clamp(60px, 8vw, 120px)",
        overflow: "hidden",
      }}
    >
      <div
        className="relative z-10 mx-auto px-5 sm:px-6 md:px-8 lg:px-10"
        style={{ maxWidth: "min(1400px, 96vw)" }}
      >
        <div
          className="flex flex-col md:flex-row items-center w-full"
          style={{ gap: "clamp(32px, 4vw, 64px)" }}
        >
          {/* Left text ~60% */}
          <div className="flex flex-col" style={{ flex: "1 1 60%" }}>
            <h2
              style={{
                ...gradientHeadingStyle,
                textAlign: "left",
              }}
            >
              {title}
            </h2>

            <p style={{ ...bodyTextStyle, marginTop: "clamp(16px, 2vw, 28px)" }}>
              {description}
            </p>

            <p style={{ ...bodyTextStyle, marginTop: "16px" }}>
              {body2}
            </p>

            <div style={{ marginTop: "clamp(24px, 3vw, 40px)" }}>
              <button style={greenButtonStyle}>{ctaText}</button>
            </div>
          </div>

          {/* Right illustration ~40% */}
          <div
            className="flex items-center justify-center"
            style={{ flex: "1 1 40%", maxWidth: "407px" }}
          >
            <Image
              src={illustration}
              alt={t("automatedRightIllAlt")}
              width={1000}
              height={1062}
              sizes="(max-width: 768px) 96vw, 40vw"
              loading="lazy"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Async data-fetching component wrapped in Suspense
   ═══════════════════════════════════════════════════════════════════════ */
async function ServicesContent({ locale }: { locale: Locale }) {
  const [heroSections, testimonials, faqs, whyChooseData, companySetting] =
    await Promise.all([
      fetchHeroSections("services", locale),
      fetchTestimonials(locale),
      fetchFAQs(locale),
      fetchHeroSection("home", "why-choose", locale),
      fetchSiteSetting("company"),
    ]);

  const heroData = heroSections.find((s) => s.section_key === "hero") ?? null;
  const endToEndData = heroSections.find((s) => s.section_key === "end-to-end") ?? null;
  const automatedLeftData = heroSections.find((s) => s.section_key === "automated-left") ?? null;
  const automatedRightData = heroSections.find((s) => s.section_key === "automated-right") ?? null;

  const companyValue = companySetting?.value as Record<string, string> | undefined;

  return (
    <>
      <ServicesHeroSection data={heroData} />
      <EndToEndSection data={endToEndData} />
      <AutomatedSectionLeft data={automatedLeftData} />
      <AutomatedSectionRight data={automatedRightData} />
      <WhyChooseSection data={whyChooseData} />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection faqs={faqs} />
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
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════════════════ */
export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const cmsLocale = locale as Locale;

  return (
    <main
      className="relative min-h-screen bg-[#000000]"
      style={{ overflowX: "hidden", overflowY: "visible" }}
    >
      {/* Page-level green glow (matches homepage pattern) */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: "68.75vw",
          aspectRatio: "825.69 / 793.13",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
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
          width: "19.8vw",
          aspectRatio: "238 / 231",
          top: "49.8vh",
          left: "65%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(149,222,100,1) 0%, rgba(149,222,100,0) 100%)",
          filter: "blur(200px)",
          zIndex: 0,
        }}
      />

      <Navbar />
      <Suspense>
        <ServicesContent locale={cmsLocale} />
      </Suspense>
    </main>
  );
}
