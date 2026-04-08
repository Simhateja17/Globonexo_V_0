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

const LEGACY_ILLUSTRATIONS = new Set([
  "/images/first_illustration.webp",
  "/images/second_illustration.webp",
  "/images/third_illustration.webp",
]);

const DIVISION_PAGE_KEYS = new Set([
  "consulting",
  "solutions",
  "talent-pool",
  "defense",
  "research",
  "advertising",
]);

const DIVISION_SECTION_KEYS = new Set([
  "end-to-end",
  "automated-left",
  "automated-right",
]);

function resolveDivisionIllustrationPath(
  rawIllustration: string | undefined,
  pageKey: string,
  sectionKey: string,
  fallback: string
) {
  if (
    DIVISION_PAGE_KEYS.has(pageKey) &&
    DIVISION_SECTION_KEYS.has(sectionKey) &&
    (!rawIllustration || LEGACY_ILLUSTRATIONS.has(rawIllustration))
  ) {
    return `/images/divisions/${pageKey}-${sectionKey}.svg`;
  }
  return rawIllustration ?? fallback;
}

/* ─── gradient heading helper ──────────────────────────────────────────── */
const gradientHeadingStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: "clamp(28px, 3.2vw, 50px)",
  lineHeight: "clamp(40px, 5vw, 65px)",
  letterSpacing: "-0.05em",
  background:
    "linear-gradient(180deg, var(--gradient-heading-start) 54%, #95DE64 100%)",
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
  color: "var(--text-primary)",
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
  boxShadow: "0px 16px 64px var(--glow-green)",
};

/* ═══════════════════════════════════════════════════════════════════════════
   Section 1 – Hero
   ═══════════════════════════════════════════════════════════════════════ */
async function PageHeroSection({
  data,
  ns,
}: {
  data?: HeroSection | null;
  ns: string;
}) {
  const t = await getTranslations(ns);
  const title = data?.title ?? t("heroTitle");
  const description = data?.description ?? t("heroDescription");

  return (
    <section
      className="relative flex justify-center"
      style={{ background: "transparent" }}
    >
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
        className="relative z-10 mx-auto px-5 sm:px-6 md:px-8 lg:px-10"
        style={{
          maxWidth: "min(1400px, 96vw)",
          paddingTop: "calc(clamp(80px, 10vh, 120px) + 7px)",
          paddingBottom: "clamp(40px, 5vw, 80px)",
        }}
      >
        <div
          className="flex flex-col items-start w-full"
        >
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(32px, 3.5vw + 1rem, 55px)",
              lineHeight: "clamp(40px, 5vw, 65px)",
              letterSpacing: "-0.05em",
              background:
                "linear-gradient(180deg, var(--gradient-heading-start) 54%, #95DE64 100%)",
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
   Section 2 – Text left, illustration right
   ═══════════════════════════════════════════════════════════════════════ */
async function TextLeftSection({
  data,
  ns,
  pageKey,
}: {
  data?: HeroSection | null;
  ns: string;
  pageKey: string;
}) {
  const t = await getTranslations(ns);
  const title = data?.title ?? t("endToEndTitle");
  const description = data?.description ?? t("endToEndDesc");
  const extra = data?.extra_data as Record<string, string> | null;
  const body2 = extra?.body2 ?? t("endToEndBody2");
  const illustration = resolveDivisionIllustrationPath(
    extra?.illustration,
    pageKey,
    "end-to-end",
    "/images/first_illustration.webp"
  );
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
          <div className="flex flex-col" style={{ flex: "1 1 60%" }}>
            <h2
              style={{
                ...gradientHeadingStyle,
                textAlign: "left",
              }}
            >
              {title}
            </h2>

            <p
              style={{
                ...bodyTextStyle,
                marginTop: "clamp(16px, 2vw, 28px)",
              }}
            >
              {description}
            </p>

            <p style={{ ...bodyTextStyle, marginTop: "16px" }}>{body2}</p>

            <div style={{ marginTop: "clamp(24px, 3vw, 40px)" }}>
              <button style={greenButtonStyle}>{ctaText}</button>
            </div>
          </div>

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
              className="illustration-theme"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Section 3 – Illustration left, text right
   ═══════════════════════════════════════════════════════════════════════ */
async function IllustrationLeftSection({
  data,
  ns,
  pageKey,
}: {
  data?: HeroSection | null;
  ns: string;
  pageKey: string;
}) {
  const t = await getTranslations(ns);
  const title = data?.title ?? t("automatedLeftTitle");
  const description = data?.description ?? t("automatedLeftDesc");
  const extra = data?.extra_data as Record<string, string> | null;
  const body2 = extra?.body2 ?? t("automatedLeftBody2");
  const illustration = resolveDivisionIllustrationPath(
    extra?.illustration,
    pageKey,
    "automated-left",
    "/images/second_illustration.webp"
  );
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
              className="illustration-theme"
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          <div
            className="flex flex-col text-left md:text-right"
            style={{ flex: "1 1 60%" }}
          >
            <p style={{ ...bodyTextStyle, marginTop: 0 }}>{description}</p>

            <p style={{ ...bodyTextStyle, marginTop: "16px" }}>{body2}</p>

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
   Section 4 – Text left, illustration right (variant 2)
   ═══════════════════════════════════════════════════════════════════════ */
async function TextLeftSectionAlt({
  data,
  ns,
  pageKey,
}: {
  data?: HeroSection | null;
  ns: string;
  pageKey: string;
}) {
  const t = await getTranslations(ns);
  const title = data?.title ?? t("automatedRightTitle");
  const description = data?.description ?? t("automatedRightDesc");
  const extra = data?.extra_data as Record<string, string> | null;
  const body2 = extra?.body2 ?? t("automatedRightBody2");
  const illustration = resolveDivisionIllustrationPath(
    extra?.illustration,
    pageKey,
    "automated-right",
    "/images/third_illustration.webp"
  );
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
          <div className="flex flex-col" style={{ flex: "1 1 60%" }}>
            <h2
              style={{
                ...gradientHeadingStyle,
                textAlign: "left",
              }}
            >
              {title}
            </h2>

            <p
              style={{
                ...bodyTextStyle,
                marginTop: "clamp(16px, 2vw, 28px)",
              }}
            >
              {description}
            </p>

            <p style={{ ...bodyTextStyle, marginTop: "16px" }}>{body2}</p>

            <div style={{ marginTop: "clamp(24px, 3vw, 40px)" }}>
              <button style={greenButtonStyle}>{ctaText}</button>
            </div>
          </div>

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
              className="illustration-theme"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Async data-fetching content wrapper
   ═══════════════════════════════════════════════════════════════════════ */
async function PageContent({
  locale,
  cmsPageKey,
  translationNs,
}: {
  locale: Locale;
  cmsPageKey: string;
  translationNs: string;
}) {
  const [heroSections, testimonials, faqs, pageWhyChoose, homeWhyChoose, companySetting] =
    await Promise.all([
      fetchHeroSections(cmsPageKey, locale),
      fetchTestimonials(locale),
      fetchFAQs(locale),
      fetchHeroSection(cmsPageKey, "why-choose", locale),
      fetchHeroSection("home", "why-choose", locale),
      fetchSiteSetting("company"),
    ]);

  const whyChooseData = pageWhyChoose ?? homeWhyChoose;

  const heroData =
    heroSections.find((s) => s.section_key === "hero") ?? null;
  const endToEndData =
    heroSections.find((s) => s.section_key === "end-to-end") ?? null;
  const automatedLeftData =
    heroSections.find((s) => s.section_key === "automated-left") ?? null;
  const automatedRightData =
    heroSections.find((s) => s.section_key === "automated-right") ?? null;

  const companyValue = companySetting?.value as
    | Record<string, string>
    | undefined;

  return (
    <>
      <PageHeroSection data={heroData} ns={translationNs} />
      <TextLeftSection
        data={endToEndData}
        ns={translationNs}
        pageKey={cmsPageKey}
      />
      <IllustrationLeftSection
        data={automatedLeftData}
        ns={translationNs}
        pageKey={cmsPageKey}
      />
      <TextLeftSectionAlt
        data={automatedRightData}
        ns={translationNs}
        pageKey={cmsPageKey}
      />
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
   Exported page template
   ═══════════════════════════════════════════════════════════════════════ */
export default async function ServiceProductPageTemplate({
  locale,
  cmsPageKey,
  translationNs,
}: {
  locale: string;
  cmsPageKey: string;
  translationNs: string;
}) {
  setRequestLocale(locale);
  const cmsLocale = locale as Locale;

  return (
    <main
      className="relative min-h-screen"
      style={{
        overflowX: "hidden",
        overflowY: "visible",
        backgroundColor: "var(--page-bg)",
      }}
    >
      {/* Page-level green glow */}
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
        <PageContent
          locale={cmsLocale}
          cmsPageKey={cmsPageKey}
          translationNs={translationNs}
        />
      </Suspense>
    </main>
  );
}
