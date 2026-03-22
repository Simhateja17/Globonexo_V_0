import ServiceProductPageTemplate from "@/components/ServiceProductPageTemplate";

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ServiceProductPageTemplate
      locale={locale}
      cmsPageKey="research"
      translationNs="researchPage"
    />
  );
}
