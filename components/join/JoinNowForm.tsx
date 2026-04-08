"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        borderBottom: "1px solid var(--join-accent)",
        paddingBottom: 8,
        width: "100%",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: "Space Grotesk, Inter, sans-serif",
          fontSize: 16,
          lineHeight: "24px",
          fontWeight: 700,
          color: "var(--join-text)",
        }}
      >
        {children}
      </h2>
    </div>
  );
}

function InputField({ label, required = false }: { label: string; required?: boolean }) {
  return (
    <div
      style={{
        width: "100%",
        border: "1px solid var(--join-form-border)",
        borderRadius: 8,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        aria-label={label}
        placeholder={`${label}${required ? " *" : ""}`}
        className="join-input"
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          outline: "none",
          fontFamily: "Space Grotesk, Inter, sans-serif",
          fontSize: 16,
          lineHeight: "24px",
          color: "var(--join-muted)",
        }}
      />
    </div>
  );
}

function UploadBox({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <label
      style={{
        width: "100%",
        border: "1px dashed var(--join-form-border)",
        borderRadius: 8,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        cursor: "pointer",
      }}
    >
      <span
        style={{
          fontFamily: "Space Grotesk, Inter, sans-serif",
          fontSize: 16,
          lineHeight: "24px",
          color: "var(--join-muted)",
          textAlign: "center",
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontFamily: "Space Grotesk, Inter, sans-serif",
          fontSize: 12,
          lineHeight: "20px",
          color: "var(--join-muted)",
          textAlign: "center",
        }}
      >
        {subtitle}
      </span>
      <input type="file" className="sr-only" />
    </label>
  );
}

export function JoinNowForm() {
  const t = useTranslations("join");

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--join-bg)",
        color: "var(--join-text)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/stars-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: "var(--join-stars-opacity)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 120,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(70vw, 920px)",
          aspectRatio: "1 / 1",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--join-glow) 0%, rgba(57,125,79,0.0) 78%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "120px 20px 90px",
        }}
      >
        <header style={{ marginBottom: 36 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
              fontFamily: "Roboto, sans-serif",
              fontSize: 14,
              lineHeight: "22px",
            }}
          >
            <Link href="/" style={{ color: "var(--join-breadcrumb-muted)", textDecoration: "none" }}>
              {t("breadcrumbHome")}
            </Link>
            <span style={{ color: "var(--join-breadcrumb-muted)" }}>/</span>
            <span style={{ color: "var(--join-accent)" }}>{t("breadcrumbCurrent")}</span>
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: "Space Grotesk, Inter, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(34px, 5vw, 38px)",
              lineHeight: "clamp(40px, 6vw, 46px)",
              letterSpacing: "-0.02em",
              textAlign: "left",
              background:
                "linear-gradient(180deg, var(--join-heading-start) 0%, var(--join-heading-end) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("title")}
          </h1>
          <p
            style={{
              margin: "16px 0 0",
              maxWidth: 1040,
              fontFamily: "Space Grotesk, Inter, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(16px, 2.3vw, 20px)",
              lineHeight: "clamp(24px, 3vw, 30px)",
              color: "var(--join-muted)",
            }}
          >
            {t("subtitle")}
          </p>
        </header>

        <section
          style={{
            width: "min(100%, 560px)",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            background: "var(--join-form-bg)",
            border: "1px solid var(--join-form-border)",
            borderRadius: 12,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            padding: "24px clamp(16px, 4vw, 28px)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionTitle>{t("personalInfo")}</SectionTitle>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(110px,130px)_minmax(0,1fr)]">
              <label
                style={{
                  border: "1px dashed var(--join-form-border)",
                  borderRadius: 8,
                  padding: 16,
                  minHeight: 112,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    fontFamily: "Space Grotesk, Inter, sans-serif",
                    fontSize: 14,
                    lineHeight: "22px",
                    color: "var(--join-muted)",
                  }}
                >
                  {t("profilePicture")}
                </span>
                <span
                  style={{
                    fontFamily: "Space Grotesk, Inter, sans-serif",
                    fontSize: 12,
                    lineHeight: "20px",
                    color: "var(--join-muted)",
                  }}
                >
                  {t("upload")}
                </span>
                <input type="file" className="sr-only" />
              </label>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <InputField label={t("fullName")} required />
                <InputField label={t("emailAddress")} required />
              </div>
            </div>

            <InputField label={t("phoneNumber")} />
            <InputField label={t("country")} required />
            <InputField label={t("city")} required />
            <InputField label={t("linkedin")} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionTitle>{t("profilePictureHeading")}</SectionTitle>
            <UploadBox title={t("uploadPhoto")} subtitle={t("uploadPhotoHint")} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionTitle>{t("cvHeading")}</SectionTitle>
            <UploadBox title={t("uploadCv")} subtitle={t("uploadCvHint")} />
            <UploadBox title={t("uploadAdditional")} subtitle={t("uploadAdditionalHint")} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionTitle>{t("githubHeading")}</SectionTitle>
            <InputField label={t("githubUrl")} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionTitle>{t("motivationHeading")}</SectionTitle>
            <div
              style={{
                width: "100%",
                border: "1px solid var(--join-form-border)",
                borderRadius: 8,
                padding: "12px 16px",
              }}
            >
              <textarea
                aria-label={t("motivationHeading")}
                placeholder={t("motivationPrompt")}
                className="join-textarea"
                style={{
                  width: "100%",
                  minHeight: 96,
                  resize: "vertical",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontFamily: "Space Grotesk, Inter, sans-serif",
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "var(--join-muted)",
                }}
              />
            </div>
          </div>

          <label style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <input
              type="checkbox"
              defaultChecked
              style={{ accentColor: "var(--join-accent)", marginTop: 4, width: 18, height: 18 }}
            />
            <span
              style={{
                fontFamily: "Space Grotesk, Inter, sans-serif",
                fontSize: 16,
                lineHeight: "24px",
                color: "var(--join-muted)",
              }}
            >
              {t("relocation")}
            </span>
          </label>

          <label style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <input
              type="checkbox"
              style={{ accentColor: "var(--join-accent)", marginTop: 4, width: 18, height: 18 }}
            />
            <span
              style={{
                fontFamily: "Space Grotesk, Inter, sans-serif",
                fontSize: 16,
                lineHeight: "24px",
                color: "var(--join-muted)",
              }}
            >
              {t("privacyPrefix")}{" "}
              <Link href="/" style={{ color: "var(--join-accent)", textDecoration: "none" }}>
                {t("privacyPolicy")}
              </Link>
              .
            </span>
          </label>

          <button
            type="button"
            style={{
              width: "100%",
              border: "none",
              borderRadius: 8,
              height: 48,
              background: "var(--join-accent)",
              color: "#FFFFFF",
              fontFamily: "Space Grotesk, Inter, sans-serif",
              fontSize: 14,
              lineHeight: "22px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {t("sendApplication")}
          </button>
        </section>

        <footer
          style={{
            marginTop: 100,
            borderTop: "1px solid var(--join-footer-border)",
            paddingTop: 26,
            display: "grid",
            gap: 24,
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontFamily: "Roboto, sans-serif",
                fontSize: 12,
                lineHeight: "20px",
                color: "var(--join-footer-body)",
              }}
            >
              {t("footerAbout")}
            </p>
          </div>

          <div>
            <h3
              style={{
                margin: "0 0 12px",
                fontFamily: "Roboto, sans-serif",
                fontSize: 20,
                lineHeight: "28px",
                fontWeight: 500,
                color: "var(--join-footer-title)",
              }}
            >
              {t("footerLegal")}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link
                href="/legal/privacy-policy"
                style={{
                  margin: 0,
                  fontFamily: "Roboto, sans-serif",
                  fontSize: 14,
                  lineHeight: "22px",
                  color: "var(--join-footer-body)",
                  textDecoration: "none",
                }}
              >
                {t("privacyPolicy")}
              </Link>
              <Link
                href="/legal/terms-of-service"
                style={{
                  margin: 0,
                  fontFamily: "Roboto, sans-serif",
                  fontSize: 14,
                  lineHeight: "22px",
                  color: "var(--join-footer-body)",
                  textDecoration: "none",
                }}
              >
                {t("terms")}
              </Link>
              <Link
                href="/legal/gdpr-compliance"
                style={{
                  margin: 0,
                  fontFamily: "Roboto, sans-serif",
                  fontSize: 14,
                  lineHeight: "22px",
                  color: "var(--join-footer-body)",
                  textDecoration: "none",
                }}
              >
                {t("gdpr")}
              </Link>
              <Link
                href="/legal/cookies-policy"
                style={{
                  margin: 0,
                  fontFamily: "Roboto, sans-serif",
                  fontSize: 14,
                  lineHeight: "22px",
                  color: "var(--join-footer-body)",
                  textDecoration: "none",
                }}
              >
                {t("cookies")}
              </Link>
              <Link
                href="/legal/sitemap"
                style={{
                  margin: 0,
                  fontFamily: "Roboto, sans-serif",
                  fontSize: 14,
                  lineHeight: "22px",
                  color: "var(--join-footer-body)",
                  textDecoration: "none",
                }}
              >
                {t("sitemap")}
              </Link>
              <Link
                href="/legal/imprint"
                style={{
                  margin: 0,
                  fontFamily: "Roboto, sans-serif",
                  fontSize: 14,
                  lineHeight: "22px",
                  color: "var(--join-footer-body)",
                  textDecoration: "none",
                }}
              >
                {t("imprint")}
              </Link>
            </div>
          </div>

          <div>
            <h3
              style={{
                margin: "0 0 12px",
                fontFamily: "Roboto, sans-serif",
                fontSize: 20,
                lineHeight: "28px",
                fontWeight: 500,
                color: "var(--join-footer-title)",
              }}
            >
              {t("footerServices")}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: "Roboto, sans-serif",
                  fontSize: 14,
                  lineHeight: "22px",
                  color: "var(--join-footer-body)",
                }}
              >
                {t("services")}
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: "Roboto, sans-serif",
                  fontSize: 14,
                  lineHeight: "22px",
                  color: "var(--join-footer-body)",
                }}
              >
                {t("industries")}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
