import { setRequestLocale } from "next-intl/server";
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";

export default async function ImprintPage({
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
      title={isDe ? "Impressum" : "Imprint"}
      description={
        isDe
          ? "Pflichtangaben gemaess deutschem Telemedienrecht."
          : "Mandatory provider information under German telemedia law."
      }
      updatedAt={isDe ? "Letzte Aktualisierung: 8. April 2026" : "Last updated: April 8, 2026"}
      sections={[
        {
          heading: isDe ? "1. Anbieter" : "1. Provider",
          paragraphs: [
            "Globonexo International IT Consulting GmbH",
            isDe
              ? "Musterstrasse 1, 10115 Berlin, Deutschland (Platzhalter)"
              : "Sample Street 1, 10115 Berlin, Germany (placeholder)",
          ],
        },
        {
          heading: isDe ? "2. Vertretungsberechtigte Person" : "2. Authorized Representative",
          paragraphs: [
            isDe ? "Samuel Burth (Geschaeftsfuehrer / CEO)" : "Samuel Burth (Managing Director / CEO)",
          ],
        },
        {
          heading: isDe ? "3. Registereintrag" : "3. Commercial Register",
          paragraphs: [
            isDe ? "Amtsgericht: [eintragen]" : "Register court: [to be completed]",
            isDe ? "Handelsregisternummer: [eintragen]" : "Commercial register number: [to be completed]",
          ],
        },
        {
          heading: isDe ? "4. Umsatzsteuer-ID" : "4. VAT ID",
          paragraphs: [isDe ? "USt-IdNr.: [eintragen]" : "VAT ID: [to be completed]"],
        },
        {
          heading: isDe ? "5. Kontakt" : "5. Contact",
          paragraphs: [
            isDe ? "E-Mail: legal@globonexo.com (Platzhalter)" : "Email: legal@globonexo.com (placeholder)",
            isDe ? "Telefon: +49 [eintragen]" : "Phone: +49 [to be completed]",
          ],
        },
        {
          heading: isDe ? "6. Hinweis" : "6. Notice",
          paragraphs: [
            isDe
              ? "Bitte alle Platzhalter mit den offiziellen Unternehmensangaben ersetzen."
              : "Please replace all placeholders with official company details.",
          ],
        },
      ]}
    />
  );
}
