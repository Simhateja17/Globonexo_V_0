import ServiceProductPageTemplate from "@/components/ServiceProductPageTemplate";

export default async function TalentPoolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ServiceProductPageTemplate
      locale={locale}
      cmsPageKey="talent-pool"
      translationNs="talentPoolPage"
    />
  );
}
