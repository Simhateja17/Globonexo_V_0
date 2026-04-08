import { setRequestLocale } from "next-intl/server";
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isDe = locale === "de";

  return (
    <LegalPageTemplate
      locale={locale}
      title={isDe ? "Datenschutzerklaerung" : "Privacy Policy"}
      description={
        isDe
          ? "Diese Seite beschreibt, wie wir personenbezogene Daten verarbeiten, speichern und schuetzen."
          : "This page explains how we process, store, and protect personal data."
      }
      updatedAt={isDe ? "Letzte Aktualisierung: 8. April 2026" : "Last updated: April 8, 2026"}
      sections={[
        {
          heading: isDe ? "1. Verantwortlicher" : "1. Data Controller",
          paragraphs: [
            isDe
              ? "Globonexo International IT Consulting GmbH ist Verantwortlicher im Sinne der DSGVO."
              : "Globonexo International IT Consulting GmbH is the controller under the GDPR.",
            isDe
              ? "Bitte hinterlegen Sie die vollstaendige Firmenadresse, Handelsregisterdaten und eine Kontakt-E-Mail fuer Datenschutzanfragen."
              : "Please fill in your full company address, registration details, and privacy contact email.",
          ],
        },
        {
          heading: isDe ? "2. Kategorien personenbezogener Daten" : "2. Categories of Personal Data",
          paragraphs: [
            isDe
              ? "Wir verarbeiten Daten, die Sie uns aktiv bereitstellen (z. B. Kontaktformular, Bewerbungen) sowie technische Nutzungsdaten."
              : "We process data you actively provide (for example contact forms and applications), plus technical usage data.",
          ],
          list: isDe
            ? [
                "Kontaktdaten (Name, E-Mail, Telefonnummer)",
                "Bewerbungsdaten (Lebenslauf, Dokumente, Profil-Links)",
                "Technische Daten (IP-Adresse, Browser, geraetebezogene Informationen)",
              ]
            : [
                "Contact data (name, email, phone number)",
                "Application data (CV, documents, profile links)",
                "Technical data (IP address, browser, device information)",
              ],
        },
        {
          heading: isDe ? "3. Zwecke und Rechtsgrundlagen" : "3. Purposes and Legal Bases",
          paragraphs: [
            isDe
              ? "Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a, b, c und f DSGVO sowie ggf. Art. 9 Abs. 2 lit. b DSGVO fuer Bewerbungsprozesse."
              : "Processing is based on GDPR Article 6(1)(a), (b), (c), and (f), and where applicable Article 9(2)(b) for recruiting processes.",
          ],
        },
        {
          heading: isDe ? "4. Speicherdauer" : "4. Retention Period",
          paragraphs: [
            isDe
              ? "Wir speichern personenbezogene Daten nur solange, wie dies fuer den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen."
              : "We retain personal data only as long as required for the relevant purpose or legal retention obligations.",
          ],
        },
        {
          heading: isDe ? "5. Betroffenenrechte" : "5. Data Subject Rights",
          paragraphs: [
            isDe
              ? "Sie haben das Recht auf Auskunft, Berichtigung, Loeschung, Einschraenkung, Datenuebertragbarkeit und Widerspruch."
              : "You have rights of access, rectification, erasure, restriction, portability, and objection.",
            isDe
              ? "Anfragen richten Sie bitte an die in dieser Datenschutzerklaerung genannte Kontaktadresse."
              : "Please direct requests to the contact address listed in this policy.",
          ],
        },
        {
          heading: isDe ? "6. Hinweis" : "6. Notice",
          paragraphs: [
            isDe
              ? "Diese Vorlage muss vor produktivem Einsatz rechtlich geprueft und auf Ihre konkreten Prozesse angepasst werden."
              : "This template must be legally reviewed and adapted to your actual processing operations before production use.",
          ],
        },
      ]}
    />
  );
}
