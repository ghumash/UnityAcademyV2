import { getDictionary } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";

export async function getTeamSectionConfig(locale: Locale) {
  const dict = await getDictionary(locale);
  const teamSection = dict.about.teamSection;

  return {
    title: teamSection.title,
    emptyState: teamSection.emptyState,
    members: teamSection.members,
  } as const;
}
