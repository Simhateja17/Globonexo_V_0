import { getJobApplications } from "@/lib/actions/cms";
import { ApplicationsClient } from "@/components/admin/applications-client";

export default async function ApplicationsPage() {
  let applications: Awaited<ReturnType<typeof getJobApplications>> = [];
  try {
    applications = await getJobApplications();
  } catch {
    // Table may not exist yet
  }

  return <ApplicationsClient applications={applications} />;
}
