import { getTeamMembers } from "@/lib/actions/cms";
import { TeamClient } from "@/components/admin/team-client";

export default async function TeamPage() {
  let members: Awaited<ReturnType<typeof getTeamMembers>> = [];
  try {
    members = await getTeamMembers(true);
  } catch {
    // Tables may not exist yet
  }

  return <TeamClient members={members} />;
}
