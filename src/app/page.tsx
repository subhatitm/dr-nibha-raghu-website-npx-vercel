import HomeClient from "@/components/HomeClient";
import HeroSection from "@/components/sections/HeroSection";
import MetricsFlythroughSection from "@/components/sections/MetricsFlythroughSection";
import SpecialtiesShowcaseSection from "@/components/sections/SpecialtiesShowcaseSection";
import FinaleBookingSection from "@/components/sections/FinaleBookingSection";

export default function Home() {
  return (
    <HomeClient hero={<HeroSection />}>
      <MetricsFlythroughSection />
      <SpecialtiesShowcaseSection />
      <FinaleBookingSection />
    </HomeClient>
  );
}
