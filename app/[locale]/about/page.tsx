import { Suspense } from "react";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar, FaqSection, ContactSection } from "@/components/home";
import { ProcessSection } from "@/components/about/ProcessSection";
import {
  fetchTeamMembers,
  fetchFAQs,
  fetchHeroSections,
  fetchSiteSetting,
} from "@/lib/queries/cms";
import type { HeroSection, TeamMember, Locale } from "@/lib/types/cms";

/* ─── gradient heading  helper ──────────────────────────────────────────── */
const gradientHeadingStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: "clamp(28px, 3.2vw, 50px)",
  lineHeight: "clamp(40px, 5vw, 65px)",
  letterSpacing: "-0.05em",
  background:
    "linear-gradient(179deg, var(--gradient-heading-start) 23%, var(--gradient-heading-end) 85%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textAlign: "center",
};

/* ═══════════════════════════════════════════════════════════════════════════
   Section 1 – About Hero
   ═══════════════════════════════════════════════════════════════════════ */
async function AboutHero({ data }: { data?: HeroSection | null }) {
  const t = await getTranslations("about");
  const title = data?.title ?? t("defaultTitle");
  const description =
    data?.description ?? t("defaultDescription");
  const subtitle = data?.subtitle ?? t("defaultSubtitle");
  const extra = data?.extra_data as Record<string, string> | null;
  const body2 = extra?.body2 ?? t("defaultBody2");
  const rawIllustration = typeof extra?.illustration === "string" ? extra.illustration.trim() : "";
  const illustration =
    !rawIllustration ||
    rawIllustration === "/images/about-illustration.webp" ||
    rawIllustration === "/images/first_illustration.webp"
      ? "/images/about-illustration.svg"
      : rawIllustration;
  const ctaText = data?.cta_text ?? t("joinNow");

  return (
    <section
      className="relative flex justify-center"
      style={{
        background: "transparent",
      }}
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
          paddingBottom: "0px",
        }}
      >
        <div
          className="flex flex-col md:flex-row items-start w-full"
          style={{
            maxWidth: "min(1400px, 96vw)",
            gap: "clamp(32px, 4vw, 64px)",
          }}
        >
          {/* Left text ~60% */}
          <div className="flex flex-col" style={{ flex: "1 1 60%" }}>
            <h1
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(32px, 3.5vw + 1rem, 55px)",
                lineHeight: "clamp(40px, 5vw, 65px)",
                letterSpacing: "-0.05em",
                background:
                  "linear-gradient(179deg, var(--gradient-heading-start) 23%, var(--gradient-heading-end) 85%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {title}
            </h1>

            <p
              style={{
                marginTop: "clamp(12px, 1.5vw, 20px)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 1.25vw + 0.25rem, 20px)",
                lineHeight: "31px",
                color: "var(--text-primary)",
              }}
            >
              {description}
            </p>

            <h2
              style={{
                marginTop: "clamp(24px, 3vw, 40px)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(28px, 3.5vw + 0.5rem, 55px)",
                lineHeight: "40px",
                color: "var(--text-primary)",
              }}
            >
              {subtitle}
            </h2>

            <p
              style={{
                marginTop: "clamp(16px, 2vw, 28px)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 1.25vw + 0.25rem, 20px)",
                lineHeight: "31px",
                color: "var(--text-primary)",
              }}
            >
              {body2}
            </p>

            <div style={{ marginTop: "clamp(24px, 3vw, 40px)" }}>
              <button
                style={{
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
                }}
              >
                {ctaText}
              </button>
            </div>
          </div>

          {/* Right illustration ~40% */}
          <div
            className="flex items-end justify-center"
            style={{ flex: "1 1 40%", maxWidth: "323px", marginTop: "clamp(40px, 15vw, 200px)" }}
          >
            <Image
              src={illustration}
              alt={t("illustrationAlt")}
              width={800}
              height={1038}
              sizes="(max-width: 768px) 80vw, 323px"
              className="illustration-theme"
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Section 2 – Journey & Background
   ═══════════════════════════════════════════════════════════════════════ */
async function JourneySection({ data }: { data?: HeroSection | null }) {
  const t = await getTranslations("about");
  const heading = data?.title ?? t("journeyHeading");
  const extra = data?.extra_data as Record<string, unknown> | null;
  const paragraphs = (extra?.paragraphs as string[]) ?? [
    t("journeyP1"),
    t("journeyP2"),
    t("journeyP3"),
    t("journeyP4"),
    t("journeyP5"),
  ];

  return (
    <section
      className="relative"
      style={{
        paddingTop: "0px",
        paddingBottom: "clamp(60px, 8vw, 120px)",
        overflow: "hidden",
      }}
    >
      <div
        className="relative z-10 mx-auto px-4 sm:px-6"
        style={{ maxWidth: "min(1300px, 96vw)" }}
      >
        <h2 style={{ ...gradientHeadingStyle, marginBottom: "clamp(32px, 4vw, 56px)" }}>
          {heading}
        </h2>

        <div
          className="mx-auto"
          style={{
            maxWidth: "1100px",
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(14px, 1.25vw + 0.25rem, 20px)",
            lineHeight: "32px",
            letterSpacing: "-0.008px",
            color: "var(--text-primary)",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {paragraphs.map((p, i) => (
            <p key={i} style={{ margin: 0 }}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Section 3 – Executives
   ═══════════════════════════════════════════════════════════════════════ */
async function ExecutivesSection({
  data,
  teamMembers,
}: {
  data?: HeroSection | null;
  teamMembers: TeamMember[];
}) {
  const t = await getTranslations("about");
  const heading = data?.title ?? t("executivesHeading");
  const subtitle =
    data?.subtitle ?? t("executivesSubtitle");

  const executives =
    teamMembers.length > 0
      ? teamMembers.map((m) => ({
          name: m.name,
          title: m.role ?? "",
          photo: m.photo_url ?? "/images/bodhi-dymas.webp",
        }))
      : [
          { name: t("defaultExecName"), title: t("defaultExecTitle"), photo: "/images/bodhi-dymas.webp" },
          { name: t("defaultExecName"), title: t("defaultExecTitle"), photo: "/images/bodhi-dymas.webp" },
          { name: t("defaultExecName"), title: t("defaultExecTitle"), photo: "/images/bodhi-dymas.webp" },
        ];

  return (
    <section
      className="relative"
      style={{
        paddingTop: "clamp(40px, 5vw, 80px)",
        paddingBottom: "clamp(60px, 8vw, 120px)",
        overflow: "hidden",
      }}
    >
      {/* Green radial glow behind cards */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: "80%",
          height: "80%",
          top: "10%",
          left: "10%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(57,125,79,0.35) 0%, transparent 70%)",
          filter: "blur(120px)",
          zIndex: 0,
        }}
      />

      <div
        className="relative z-10 mx-auto px-4 sm:px-6"
        style={{ maxWidth: "min(1300px, 96vw)" }}
      >
        <h2 style={{ ...gradientHeadingStyle, marginBottom: "16px" }}>
          {heading}
        </h2>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(14px, 1.1vw + 0.2rem, 18px)",
            lineHeight: "1.6",
            color: "var(--text-tertiary)",
            textAlign: "center",
            maxWidth: "720px",
            margin: "0 auto",
            marginBottom: "clamp(32px, 4vw, 56px)",
          }}
        >
          {subtitle}
        </p>

        {/* Bordered container with inner glow */}
        <div
          className="relative"
          style={{
            border: "1px solid var(--border-subtle)",
            borderRadius: "10px",
            padding: "clamp(32px, 4vw, 60px) clamp(24px, 3vw, 48px)",
          }}
        >
          {/* Inner green glow */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              width: "60%",
              height: "80%",
              top: "10%",
              left: "20%",
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(57,125,79,0.3) 0%, transparent 70%)",
              filter: "blur(80px)",
              zIndex: 0,
            }}
          />

          <div
            className="relative z-10 flex flex-wrap justify-center"
            style={{ gap: "clamp(24px, 3vw, 48px)" }}
          >
            {executives.map((exec, i) => (
              <div
                key={i}
                className="flex flex-col items-start"
                style={{ width: "min(100%, 300px)" }}
              >
                {/* Executive photo with glow */}
                <div
                  className="relative"
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    marginBottom: "16px",
                  }}
                >
                  {/* Green glow behind photo */}
                  <div
                    aria-hidden
                    className="absolute pointer-events-none"
                    style={{
                      width: "140%",
                      height: "140%",
                      top: "-20%",
                      left: "-20%",
                      background:
                        "radial-gradient(ellipse at 50% 50%, rgba(57,200,79,0.5) 0%, rgba(57,125,79,0.3) 30%, transparent 65%)",
                      filter: "blur(30px)",
                      zIndex: 0,
                    }}
                  />
                  <Image
                    src={exec.photo}
                    alt={exec.name}
                    width={600}
                    height={762}
                    sizes="(max-width: 768px) 80vw, min(300px, 22vw)"
                    loading="lazy"
                    className="relative z-10"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "1.4",
                    color: "var(--text-primary)",
                  }}
                >
                  {exec.name}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "1.4",
                    color: "var(--text-tertiary)",
                    marginTop: "4px",
                  }}
                >
                  {exec.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Async data-fetching component wrapped in Suspense
   ═══════════════════════════════════════════════════════════════════════ */
async function AboutContent({ locale }: { locale: Locale }) {
  const [heroSections, teamMembers, faqs, companySetting] = await Promise.all([
    fetchHeroSections("about", locale),
    fetchTeamMembers(locale),
    fetchFAQs(locale),
    fetchSiteSetting("company"),
  ]);

  const heroData = heroSections.find((s) => s.section_key === "hero") ?? null;
  const journeyData = heroSections.find((s) => s.section_key === "journey") ?? null;
  const executivesData = heroSections.find((s) => s.section_key === "executives") ?? null;

  const companyValue = companySetting?.value as Record<string, string> | undefined;

  return (
    <>
      <AboutHero data={heroData} />
      <JourneySection data={journeyData} />
      <ExecutivesSection data={executivesData} teamMembers={teamMembers} />
      <ProcessSection />
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
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const cmsLocale = locale as Locale;

  return (
    <main
      className="relative min-h-screen"
      style={{ overflowX: "hidden", overflowY: "visible", backgroundColor: "var(--page-bg)" }}
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
        <AboutContent locale={cmsLocale} />
      </Suspense>
    </main>
  );
}
