"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { submitJobApplication } from "@/lib/actions/cms";
import { createClient } from "@/lib/supabase/client";

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

function UploadBox({
  title,
  subtitle,
  selectedText,
}: {
  title: string;
  subtitle: string;
  selectedText?: string;
}) {
  return (
    <div
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
      {selectedText ? (
        <span
          style={{
            marginTop: 6,
            fontFamily: "Roboto, sans-serif",
            fontSize: 12,
            lineHeight: "18px",
            color: "var(--join-accent)",
            textAlign: "center",
            maxWidth: "100%",
            wordBreak: "break-word",
          }}
        >
          {selectedText}
        </span>
      ) : null}
    </div>
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
  const [selectedFiles, setSelectedFiles] = useState<{
    profilePicture: File | null;
    cv: File | null;
    additionalDocs: File[];
  }>({
    profilePicture: null,
    cv: null,
    additionalDocs: [],
  });
  const [profilePreviewUrl, setProfilePreviewUrl] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const updateForm = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    return () => {
      if (profilePreviewUrl) URL.revokeObjectURL(profilePreviewUrl);
    };
  }, [profilePreviewUrl]);

  const handleProfilePictureChange = (file: File | null) => {
    setFiles((prev) => ({
      ...prev,
      profilePicture: file?.name ?? "",
    }));
    setSelectedFiles((prev) => ({ ...prev, profilePicture: file }));
    if (profilePreviewUrl) URL.revokeObjectURL(profilePreviewUrl);
    if (file && file.type.startsWith("image/")) {
      setProfilePreviewUrl(URL.createObjectURL(file));
    } else {
      setProfilePreviewUrl(null);
    }
  };

  const uploadFileToStorage = async (
    supabase: ReturnType<typeof createClient>,
    file: File,
    folder: string
  ) => {
    const fileExt = file.name.split(".").pop() || "bin";
    const safeExt = fileExt.toLowerCase();
    const filePath = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${safeExt}`;
    const { error } = await supabase.storage.from("applications").upload(filePath, file, {
      upsert: false,
    });
    if (error) {
      throw new Error(`Upload failed for "${file.name}": ${error.message}`);
    }
    return filePath;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const missing: string[] = [];
    if (!form.fullName.trim()) missing.push(t("fullName"));
    if (!form.email.trim()) missing.push(t("emailAddress"));
    if (!form.country.trim()) missing.push(t("country"));
    if (!form.city.trim()) missing.push(t("city"));
    if (!form.privacyAccepted) missing.push(t("privacyPolicy"));

    if (missing.length > 0) {
      setMissingFields(missing);
      setErrorMessage(`Please complete required fields: ${missing.join(", ")}.`);
      setStatus("error");
      return;
    }

    setSending(true);
    setStatus("idle");
    setMissingFields([]);
    setErrorMessage("");
    const supabase = createClient();
    const uploadedPaths: string[] = [];
    try {
      let profilePicturePath: string | undefined;
      let cvPath: string | undefined;
      let additionalDocsPaths: string[] = [];

      if (selectedFiles.profilePicture) {
        profilePicturePath = await uploadFileToStorage(supabase, selectedFiles.profilePicture, "profile-pictures");
        uploadedPaths.push(profilePicturePath);
      }

      if (selectedFiles.cv) {
        cvPath = await uploadFileToStorage(supabase, selectedFiles.cv, "cv");
        uploadedPaths.push(cvPath);
      }

      if (selectedFiles.additionalDocs.length > 0) {
        additionalDocsPaths = await Promise.all(
          selectedFiles.additionalDocs.map((file) =>
            uploadFileToStorage(supabase, file, "additional-docs")
          )
        );
        uploadedPaths.push(...additionalDocsPaths);
      }

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
        profile_picture_path: profilePicturePath,
        cv_file_name: files.cv || undefined,
        cv_path: cvPath,
        additional_documents_file_names: files.additionalDocs || undefined,
        additional_documents_paths:
          additionalDocsPaths.length > 0 ? JSON.stringify(additionalDocsPaths) : undefined,
      });
      setStatus("success");
      setMissingFields([]);
      setErrorMessage("");
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
      setSelectedFiles({ profilePicture: null, cv: null, additionalDocs: [] });
      if (profilePreviewUrl) URL.revokeObjectURL(profilePreviewUrl);
      setProfilePreviewUrl(null);
    } catch (err) {
      if (uploadedPaths.length > 0) {
        await supabase.storage.from("applications").remove(uploadedPaths);
      }
      const message =
        err instanceof Error ? err.message : "Submission failed. Please try again in a moment.";
      setErrorMessage(message);
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
                  {profilePreviewUrl ? t("profilePictureHeading") : t("profilePicture")}
                </span>
                {profilePreviewUrl ? (
                  <img
                    src={profilePreviewUrl}
                    alt={t("profilePictureHeading")}
                    style={{
                      width: 56,
                      height: 56,
                      objectFit: "cover",
                      borderRadius: 999,
                      border: "1px solid var(--join-form-border)",
                    }}
                  />
                ) : (
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
                )}
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="sr-only"
                  onChange={(e) => handleProfilePictureChange(e.target.files?.[0] ?? null)}
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
            <SectionTitle>{t("cvHeading")}</SectionTitle>
            <label htmlFor="join-cv-upload">
              <UploadBox
                title={t("uploadCv")}
                subtitle={t("uploadCvHint")}
                selectedText={files.cv ? `Selected: ${files.cv}` : undefined}
              />
              <input
                id="join-cv-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setSelectedFiles((prev) => ({ ...prev, cv: file }));
                  setFiles((prev) => ({
                    ...prev,
                    cv: file?.name ?? "",
                  }));
                }}
              />
            </label>
            <label htmlFor="join-additional-upload">
              <UploadBox
                title={t("uploadAdditional")}
                subtitle={t("uploadAdditionalHint")}
                selectedText={files.additionalDocs ? `Selected: ${files.additionalDocs}` : undefined}
              />
              <input
                id="join-additional-upload"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.zip"
                className="sr-only"
                onChange={(e) => {
                  const filesArr = Array.from(e.target.files ?? []);
                  setSelectedFiles((prev) => ({ ...prev, additionalDocs: filesArr }));
                  setFiles((prev) => ({
                    ...prev,
                    additionalDocs: filesArr
                      .map((file) => file.name)
                      .join(", "),
                  }));
                }}
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
              {errorMessage}
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
      </div>
    </main>
  );
}
