import { getServices } from "@/lib/actions/cms";
import { ServicesClient } from "@/components/admin/services-client";

export default async function ServicesPage() {
  let services: Awaited<ReturnType<typeof getServices>> = [];
  try {
    services = await getServices(true);
  } catch {
    // Tables may not exist yet
  }

  return <ServicesClient services={services} />;
}
