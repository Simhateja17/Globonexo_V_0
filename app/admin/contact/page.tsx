import { getContactSubmissions } from "@/lib/actions/cms";
import { ContactClient } from "@/components/admin/contact-client";

export default async function ContactPage() {
  let submissions: Awaited<ReturnType<typeof getContactSubmissions>> = [];
  try {
    submissions = await getContactSubmissions();
  } catch {
    // Tables may not exist yet
  }

  return <ContactClient submissions={submissions} />;
}
