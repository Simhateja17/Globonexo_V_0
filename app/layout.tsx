import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CookieConsentManager } from "@/components/analytics/CookieConsentManager";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Globonexo — International IT & AI Expert Hub",
  description: "Globonexo is an international IT consulting company that helps European businesses grow through AI-driven technologies and strong engineering expertise.",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-V4CPNW74S4";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        {children}
        <CookieConsentManager measurementId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
