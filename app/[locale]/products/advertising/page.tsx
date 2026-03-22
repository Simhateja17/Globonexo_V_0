import ServiceProductPageTemplate from "@/components/ServiceProductPageTemplate";

export default async function AdvertisingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ServiceProductPageTemplate
      locale={locale}
      cmsPageKey="advertising"
      translationNs="advertisingPage"
    />
  );
}
