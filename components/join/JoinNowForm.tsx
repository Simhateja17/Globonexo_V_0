"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { submitJobApplication } from "@/lib/actions/cms";

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

function InputField({
  label,
  required = false,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
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
        type={type}
        aria-label={label}
        placeholder={`${label}${required ? " *" : ""}`}
        className="join-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
    </label>
  );
}

export function JoinNowForm() {
  const t = useTranslations("join");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    linkedin: "",
    github: "",
    motivation: "",
    relocation: true,
    privacyAccepted: false,
  });
  const [files, setFiles] = useState({
    profilePicture: "",
    cv: "",
    additionalDocs: "",
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const updateForm = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.country || !form.city || !form.privacyAccepted) {
      setStatus("error");
      return;
    }

    setSending(true);
    setStatus("idle");
    try {
      await submitJobApplication({
        full_name: form.fullName,
        email: form.email,
        phone: form.phone || undefined,
        country: form.country || undefined,
        city: form.city || undefined,
        linkedin_url: form.linkedin || undefined,
        github_url: form.github || undefined,
        motivation: form.motivation || undefined,
        open_to_relocation: form.relocation,
        privacy_accepted: form.privacyAccepted,
        profile_picture_file_name: files.profilePicture || undefined,
        cv_file_name: files.cv || undefined,
        additional_documents_file_names: files.additionalDocs || undefined,
      });
      setStatus("success");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        linkedin: "",
        github: "",
        motivation: "",
        relocation: true,
        privacyAccepted: false,
      });
      setFiles({ profilePicture: "", cv: "", additionalDocs: "" });
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

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

        <form
          onSubmit={handleSubmit}
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
                <input
                  type="file"
                  className="sr-only"
                  onChange={(e) =>
                    setFiles((prev) => ({
                      ...prev,
                      profilePicture: e.target.files?.[0]?.name ?? "",
                    }))
                  }
                />
              </label>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <InputField
                  label={t("fullName")}
                  required
                  value={form.fullName}
                  onChange={(value) => updateForm("fullName", value)}
                />
                <InputField
                  label={t("emailAddress")}
                  required
                  type="email"
                  value={form.email}
                  onChange={(value) => updateForm("email", value)}
                />
              </div>
            </div>

            <InputField
              label={t("phoneNumber")}
              value={form.phone}
              onChange={(value) => updateForm("phone", value)}
            />
            <InputField
              label={t("country")}
              required
              value={form.country}
              onChange={(value) => updateForm("country", value)}
            />
            <InputField
              label={t("city")}
              required
              value={form.city}
              onChange={(value) => updateForm("city", value)}
            />
            <InputField
              label={t("linkedin")}
              value={form.linkedin}
              onChange={(value) => updateForm("linkedin", value)}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionTitle>{t("profilePictureHeading")}</SectionTitle>
            <label>
              <UploadBox title={t("uploadPhoto")} subtitle={t("uploadPhotoHint")} />
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="sr-only"
                onChange={(e) =>
                  setFiles((prev) => ({
                    ...prev,
                    profilePicture: e.target.files?.[0]?.name ?? "",
                  }))
                }
              />
            </label>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionTitle>{t("cvHeading")}</SectionTitle>
            <label>
              <UploadBox title={t("uploadCv")} subtitle={t("uploadCvHint")} />
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={(e) =>
                  setFiles((prev) => ({
                    ...prev,
                    cv: e.target.files?.[0]?.name ?? "",
                  }))
                }
              />
            </label>
            <label>
              <UploadBox title={t("uploadAdditional")} subtitle={t("uploadAdditionalHint")} />
              <input
                type="file"
                multiple
                className="sr-only"
                onChange={(e) =>
                  setFiles((prev) => ({
                    ...prev,
                    additionalDocs: Array.from(e.target.files ?? [])
                      .map((file) => file.name)
                      .join(", "),
                  }))
                }
              />
            </label>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionTitle>{t("githubHeading")}</SectionTitle>
            <InputField
              label={t("githubUrl")}
              value={form.github}
              onChange={(value) => updateForm("github", value)}
            />
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
                value={form.motivation}
                onChange={(e) => updateForm("motivation", e.target.value)}
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
              checked={form.relocation}
              onChange={(e) => updateForm("relocation", e.target.checked)}
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
              checked={form.privacyAccepted}
              onChange={(e) => updateForm("privacyAccepted", e.target.checked)}
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
              <Link href="/legal/privacy-policy" style={{ color: "var(--join-accent)", textDecoration: "none" }}>
                {t("privacyPolicy")}
              </Link>
              .
            </span>
          </label>

          {status === "success" ? (
            <p style={{ margin: 0, color: "var(--join-accent)", fontFamily: "Roboto, sans-serif", fontSize: 14 }}>
              Application submitted successfully.
            </p>
          ) : null}
          {status === "error" ? (
            <p style={{ margin: 0, color: "#dc2626", fontFamily: "Roboto, sans-serif", fontSize: 14 }}>
              Please complete required fields and try again.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={sending}
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
              cursor: sending ? "not-allowed" : "pointer",
              opacity: sending ? 0.7 : 1,
            }}
          >
            {sending ? "Sending..." : t("sendApplication")}
          </button>
        </form>

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
