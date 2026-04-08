import { setRequestLocale } from "next-intl/server";
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";

export default async function TermsOfServicePage({
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
      title={isDe ? "Nutzungsbedingungen" : "Terms of Service"}
      description={
        isDe
          ? "Diese Bedingungen regeln die Nutzung unserer Website und digitalen Dienste."
          : "These terms govern the use of our website and digital services."
      }
      updatedAt={isDe ? "Letzte Aktualisierung: 8. April 2026" : "Last updated: April 8, 2026"}
      sections={[
        {
          heading: isDe ? "1. Geltungsbereich" : "1. Scope",
          paragraphs: [
            isDe
              ? "Diese Nutzungsbedingungen gelten fuer alle Besucher und Nutzer der Website."
              : "These terms apply to all visitors and users of the website.",
          ],
        },
        {
          heading: isDe ? "2. Leistungsbeschreibung" : "2. Service Description",
          paragraphs: [
            isDe
              ? "Die Inhalte dienen der Information ueber unsere Leistungen. Ein verbindliches Vertragsangebot entsteht erst durch gesonderte Vereinbarung."
              : "Content is provided to describe our services. Binding contractual obligations arise only through separate agreements.",
          ],
        },
        {
          heading: isDe ? "3. Geistiges Eigentum" : "3. Intellectual Property",
          paragraphs: [
            isDe
              ? "Texte, Grafiken, Marken und Softwarebestandteile sind urheber- und markenrechtlich geschuetzt."
              : "Texts, graphics, trademarks, and software components are protected by copyright and trademark laws.",
          ],
        },
        {
          heading: isDe ? "4. Haftung" : "4. Liability",
          paragraphs: [
            isDe
              ? "Wir haften nur nach den gesetzlichen Vorschriften, insbesondere bei Vorsatz und grober Fahrlaessigkeit. Zwingende Haftungstatbestaende bleiben unberuehrt."
              : "Liability is governed by applicable law, especially in cases of intent or gross negligence. Mandatory statutory liability remains unaffected.",
          ],
        },
        {
          heading: isDe ? "5. Anwendbares Recht" : "5. Governing Law",
          paragraphs: [
            isDe
              ? "Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts, soweit gesetzlich zulaessig."
              : "German law applies, excluding the UN Convention on Contracts for the International Sale of Goods, where legally permissible.",
          ],
        },
        {
          heading: isDe ? "6. Hinweis" : "6. Notice",
          paragraphs: [
            isDe
              ? "Diese Vorlage ersetzt keine individuelle Rechtsberatung und sollte juristisch geprueft werden."
              : "This template does not replace individualized legal advice and should be reviewed by counsel.",
          ],
        },
      ]}
    />
  );
}
