import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import NextLink from "next/link";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "en" | "de")) {
    notFound();
  }

  setRequestLocale(locale);

  // Get messages for this locale
  const messages = await getMessages();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <NextIntlClientProvider messages={messages}>
        {children}
        <footer className="w-full border-t py-4 px-6 flex items-center justify-end" style={{ borderColor: "var(--border-card)", backgroundColor: "var(--page-bg)" }}>
          <NextLink
            href="/admin"
            className="text-xs text-muted-foreground hover:text-white transition-colors"
          >
            Admin
          </NextLink>
        </footer>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
