import ServiceProductPageTemplate from "@/components/ServiceProductPageTemplate";

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ServiceProductPageTemplate
      locale={locale}
      cmsPageKey="solutions"
      translationNs="outstaffingPage"
    />
  );
}
