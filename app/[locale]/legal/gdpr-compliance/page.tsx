import { setRequestLocale } from "next-intl/server";
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";

export default async function GdprCompliancePage({
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
      title={isDe ? "DSGVO-Konformitaet" : "GDPR Compliance"}
      description={
        isDe
          ? "Uebersicht ueber unsere organisatorischen und technischen Datenschutzmassnahmen."
          : "Overview of our organizational and technical data protection measures."
      }
      updatedAt={isDe ? "Letzte Aktualisierung: 8. April 2026" : "Last updated: April 8, 2026"}
      sections={[
        {
          heading: isDe ? "1. Datenschutzmanagement" : "1. Privacy Governance",
          paragraphs: [
            isDe
              ? "Wir etablieren interne Prozesse zur DSGVO-konformen Datenverarbeitung, inklusive Rollen, Verantwortlichkeiten und regelmaessiger Ueberpruefungen."
              : "We maintain internal processes for GDPR-aligned data processing, including roles, responsibilities, and regular reviews.",
          ],
        },
        {
          heading: isDe ? "2. Technische und organisatorische Massnahmen" : "2. Technical and Organizational Measures",
          paragraphs: [
            isDe
              ? "Wir setzen angemessene Sicherheitsmassnahmen nach Art. 32 DSGVO ein."
              : "We apply appropriate security controls pursuant to GDPR Article 32.",
          ],
          list: isDe
            ? [
                "Zugriffskontrollen und rollenbasierte Berechtigungen",
                "Verschluesselung waehrend der Uebertragung und Speicherung",
                "Protokollierung sicherheitsrelevanter Ereignisse",
                "Regelmaessige Backups und Wiederherstellungsverfahren",
              ]
            : [
                "Access controls and role-based permissions",
                "Encryption in transit and at rest",
                "Logging of security-relevant events",
                "Regular backups and recovery procedures",
              ],
        },
        {
          heading: isDe ? "3. Auftragsverarbeitung" : "3. Processor Management",
          paragraphs: [
            isDe
              ? "Mit externen Dienstleistern werden, soweit erforderlich, Auftragsverarbeitungsvertraege abgeschlossen."
              : "Where required, data processing agreements are concluded with external service providers.",
          ],
        },
        {
          heading: isDe ? "4. Internationale Datentransfers" : "4. International Data Transfers",
          paragraphs: [
            isDe
              ? "Bei Uebermittlungen in Drittländer werden geeignete Garantien genutzt (z. B. Standardvertragsklauseln)."
              : "When transferring data outside the EEA, appropriate safeguards are used (for example Standard Contractual Clauses).",
          ],
        },
        {
          heading: isDe ? "5. Incident- und Anfrageprozesse" : "5. Incident and Rights Request Processes",
          paragraphs: [
            isDe
              ? "Wir haben Verfahren fuer Datenschutzvorfaelle und Betroffenenanfragen eingerichtet."
              : "We operate procedures for personal data incidents and data subject rights requests.",
          ],
        },
        {
          heading: isDe ? "6. Hinweis" : "6. Notice",
          paragraphs: [
            isDe
              ? "Diese Seite ist eine allgemeine Darstellung und muss auf Ihre konkrete Datenverarbeitung abgestimmt werden."
              : "This page is a general overview and must be tailored to your actual data processing activities.",
          ],
        },
      ]}
    />
  );
}
