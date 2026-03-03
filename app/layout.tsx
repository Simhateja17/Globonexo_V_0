import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <footer className="w-full border-t border-white/10 py-4 px-6 flex items-center justify-end bg-black">
            <Link
              href="/admin"
              className="text-xs text-muted-foreground hover:text-white transition-colors"
            >
              Admin
            </Link>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
