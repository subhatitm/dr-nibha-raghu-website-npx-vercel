import { clinicContact, departments, searchSpecialties } from "@/server/catalog";
import HomeClient from "@/components/HomeClient";
import HeroSection from "@/components/sections/HeroSection";
import MetricsFlythroughSection from "@/components/sections/MetricsFlythroughSection";
import SpecialtiesShowcaseSection from "@/components/sections/SpecialtiesShowcaseSection";
import FinaleBookingSection from "@/components/sections/FinaleBookingSection";

export const runtime = "nodejs";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const result = searchSpecialties((await searchParams).q);
  return (
    <HomeClient departments={departments()} hero={<HeroSection />}>
      <MetricsFlythroughSection />
      <SpecialtiesShowcaseSection items={result.ok ? result.items : []} query={result.ok ? result.query : ""} error={result.ok ? undefined : result.error} />
      <FinaleBookingSection contact={clinicContact()} />
    </HomeClient>
  );
}
