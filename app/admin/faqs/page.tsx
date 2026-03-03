import { getFAQs } from "@/lib/actions/cms";
import { FAQsClient } from "@/components/admin/faqs-client";

export default async function FAQsPage() {
  let faqs: Awaited<ReturnType<typeof getFAQs>> = [];
  try {
    faqs = await getFAQs(true);
  } catch {
    // Tables may not exist yet
  }

  return <FAQsClient faqs={faqs} />;
}
