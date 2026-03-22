import ServiceProductPageTemplate from "@/components/ServiceProductPageTemplate";

export default async function DefensePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ServiceProductPageTemplate
      locale={locale}
      cmsPageKey="defense"
      translationNs="defensePage"
    />
  );
}
