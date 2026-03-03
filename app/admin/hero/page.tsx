import { getHeroSections } from "@/lib/actions/cms";
import { HeroClient } from "@/components/admin/hero-client";

export default async function HeroPage() {
  let sections: Awaited<ReturnType<typeof getHeroSections>> = [];
  try {
    sections = await getHeroSections();
  } catch {
    // Tables may not exist yet
  }

  return <HeroClient sections={sections} />;
}
