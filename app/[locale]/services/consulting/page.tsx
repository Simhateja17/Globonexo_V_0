import ServiceProductPageTemplate from "@/components/ServiceProductPageTemplate";

export default async function ConsultingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ServiceProductPageTemplate
      locale={locale}
      cmsPageKey="consulting"
      translationNs="servicesPage"
    />
  );
}
