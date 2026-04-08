import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/home/Navbar";
import { JoinNowForm } from "@/components/join/JoinNowForm";

export default async function JoinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <JoinNowForm />
    </>
  );
}
