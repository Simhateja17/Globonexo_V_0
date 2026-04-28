import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import type { HeroSection as HeroSectionType } from "@/lib/types/cms";

interface HeroSectionProps {
  data?: HeroSectionType | null;
  cloudPartnersData?: HeroSectionType | null;
}

export async function HeroSection({ data, cloudPartnersData }: HeroSectionProps) {
  const t = await getTranslations("hero");

  const title = data?.title ?? t("defaultTitle");
  const description = data?.description ?? t("defaultDescription");
  const ctaText = data?.cta_text ?? t("joinUs");
  const ctaLink = data?.cta_link ?? "/join";
  const extra = data?.extra_data as Record<string, string> | null;
  const cta2Text = extra?.cta2_text ?? t("scheduleConsultation");
  const cta2Link = extra?.cta2_link ?? "/#contact";

  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{ background: "transparent" }}
    >

      {/* ── Content ── */}
      <div
        className="relative z-10 w-full flex justify-center px-5 sm:px-6 md:px-8 lg:px-10"
        style={{
          paddingTop: "clamp(100px, 12vh, 160px)",
          paddingBottom: "clamp(60px, 8vh, 120px)",
        }}
      >
        <div
          className="flex flex-col items-center w-full"
          style={{ maxWidth: "min(1400px, 96vw)" }}
        >

          <h1
            className="w-full text-center gradient-text"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(28px, 3.5vw + 1rem, 55px)",
              lineHeight: "1.2",
              letterSpacing: "-0.05em",
            }}
          >
            {title.includes("For") ? (
              <>
                {title.split("For")[0]}For{" "}
                <br className="hidden sm:block" />
                {title.split("For").slice(1).join("For")}
              </>
            ) : (
              title
            )}
          </h1>

          <p
            className="text-center w-full"
            style={{
              marginTop: "clamp(20px, 2.5vw, 36px)",
              maxWidth: "100%",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(14px, 1.25vw + 0.5rem, 20px)",
              lineHeight: "1.55",
              letterSpacing: "-0.01em",
              color: "var(--text-primary)",
            }}
          >
            {description}
          </p>

          <div
            className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center"
            style={{ marginTop: "clamp(24px, 3vw, 48px)" }}
          >
            <div
              className="relative"
              style={{
                padding: "1px",
                borderRadius: "clamp(24px, 2.5vw, 36px)",
                background: "conic-gradient(from 179.78deg at 50% 50%, rgba(255,255,255,0.07) -54.98deg, #397D4F 52.13deg, rgba(255,255,255,0.04) 125.06deg, #FFFFFF 235.09deg, rgba(255,255,255,0.07) 305.02deg, #397D4F 412.13deg)",
                boxShadow: "0px 16px 64px 0px rgba(104, 1, 255, 0.12)",
              }}
            >
              <Link
                href={ctaLink}
                className="relative flex items-center justify-center overflow-hidden px-6"
                style={{
                  minWidth: "clamp(110px, 10vw, 160px)",
                  height: "clamp(36px, 3.2vw, 50px)",
                  paddingLeft: "clamp(16px, 1.5vw, 24px)",
                  paddingRight: "clamp(16px, 1.5vw, 24px)",
                  borderRadius: "clamp(22px, 2.2vw, 35px)",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-card)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(13px, 1.1vw, 17px)",
                  letterSpacing: "-0.01em",
                  color: "var(--text-primary)",
                  textDecoration: "none",
                }}
              >
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    borderRadius: "inherit",
                    background: "radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.15) 0%, transparent 50%)",
                  }}
                />
                <span className="relative z-10">{ctaText}</span>
              </Link>
            </div>

            <Link
              href={cta2Link}
              className="flex items-center justify-center px-5"
              style={{
                minWidth: "clamp(160px, 14vw, 230px)",
                height: "clamp(36px, 3.2vw, 50px)",
                paddingLeft: "clamp(16px, 1.5vw, 20px)",
                paddingRight: "clamp(16px, 1.5vw, 20px)",
                borderRadius: "clamp(24px, 2.5vw, 36px)",
                background: "#FFFFFF",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(13px, 1.1vw, 17px)",
                letterSpacing: "-0.01em",
                color: "#000000",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              {cta2Text}
            </Link>
          </div>

          {/* Cloud Partners Strip */}
          {(() => {
            const cpExtra = cloudPartnersData?.extra_data as Record<string, unknown> | null;
            const cpLabel = cloudPartnersData?.title ?? "We specialise in";
            const defaultPartners = [
              { name: "Microsoft Azure", logo: "/images/microsoft-logo.svg", logoOnly: false },
              { name: "AWS", logo: "/images/aws-logo.svg", logoOnly: true },
              { name: "Google Cloud", logo: "/images/google-cloud-logo.svg", logoOnly: true },
            ];
            const partners = (cpExtra?.partners as Array<{ name: string; logo: string; logoOnly: boolean }>) ?? defaultPartners;
            return (
              <div
                className="w-full flex flex-col items-center"
                style={{
                  marginTop: "clamp(48px, 6vw, 80px)",
                  gap: "clamp(16px, 2vw, 24px)",
                }}
              >
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(13px, 1vw, 16px)",
                    color: "var(--text-tertiary)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {cpLabel}
                </p>
                <div
                  className="flex items-center justify-center flex-wrap"
                  style={{ gap: "clamp(36px, 5vw, 80px)" }}
                >
                  {partners.map((partner) => (
                    <div key={partner.name} className="flex items-center" style={{ gap: "10px", opacity: 0.6 }}>
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={partner.logoOnly ? 100 : 20}
                        height={partner.logoOnly ? 30 : 20}
                        style={partner.logoOnly
                          ? { height: "clamp(20px, 1.8vw, 28px)", width: "auto" }
                          : { flexShrink: 0 }
                        }
                      />
                      {!partner.logoOnly && (
                        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "clamp(14px, 1.3vw, 18px)", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                          {partner.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

        </div>
      </div>
    </section>
  );
}
