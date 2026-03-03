import { getTestimonials } from "@/lib/actions/cms";
import { TestimonialsClient } from "@/components/admin/testimonials-client";

export default async function TestimonialsPage() {
  let testimonials: Awaited<ReturnType<typeof getTestimonials>> = [];
  try {
    testimonials = await getTestimonials(true);
  } catch {
    // Tables may not exist yet
  }

  return <TestimonialsClient testimonials={testimonials} />;
}
