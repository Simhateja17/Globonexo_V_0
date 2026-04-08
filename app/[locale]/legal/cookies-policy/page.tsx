import { setRequestLocale } from "next-intl/server";
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";

export default async function CookiesPolicyPage({
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
      title={isDe ? "Cookie-Richtlinie" : "Cookies Policy"}
      description={
        isDe
          ? "Diese Richtlinie erklaert, wie wir Cookies und vergleichbare Technologien einsetzen."
          : "This policy explains how we use cookies and similar technologies."
      }
      updatedAt={isDe ? "Letzte Aktualisierung: 8. April 2026" : "Last updated: April 8, 2026"}
      sections={[
        {
          heading: isDe ? "1. Was sind Cookies?" : "1. What Are Cookies?",
          paragraphs: [
            isDe
              ? "Cookies sind kleine Textdateien, die auf Ihrem Endgeraet gespeichert werden, um Funktionen und Analysen zu ermoeglichen."
              : "Cookies are small text files stored on your device to enable functionality and analytics.",
          ],
        },
        {
          heading: isDe ? "2. Welche Cookie-Kategorien wir verwenden" : "2. Cookie Categories We Use",
          paragraphs: [],
          list: isDe
            ? [
                "Notwendige Cookies (Betrieb und Sicherheit der Website)",
                "Analyse-Cookies (Nutzungsstatistiken, Reichweitenmessung)",
                "Praeferenz-Cookies (z. B. Spracheinstellungen)",
              ]
            : [
                "Necessary cookies (site operation and security)",
                "Analytics cookies (usage statistics and measurement)",
                "Preference cookies (for example language settings)",
              ],
        },
        {
          heading: isDe ? "3. Einwilligung und Widerruf" : "3. Consent and Withdrawal",
          paragraphs: [
            isDe
              ? "Nicht notwendige Cookies werden nur mit Einwilligung gesetzt. Eine erteilte Einwilligung kann jederzeit mit Wirkung fuer die Zukunft widerrufen werden."
              : "Non-essential cookies are set only with consent. Consent can be withdrawn at any time with future effect.",
          ],
        },
        {
          heading: isDe ? "4. Browser-Einstellungen" : "4. Browser Controls",
          paragraphs: [
            isDe
              ? "Sie koennen Cookies ueber Ihre Browser-Einstellungen blockieren oder loeschen. Dies kann die Funktionalitaet der Website beeintraechtigen."
              : "You can block or delete cookies via browser settings. This may reduce site functionality.",
          ],
        },
        {
          heading: isDe ? "5. Hinweis" : "5. Notice",
          paragraphs: [
            isDe
              ? "Bitte ergaenzen Sie diese Richtlinie um Ihren konkreten Consent-Manager, Cookie-Laufzeiten und Drittanbieter."
              : "Please extend this policy with your actual consent manager, cookie lifetimes, and third-party providers.",
          ],
        },
      ]}
    />
  );
}
