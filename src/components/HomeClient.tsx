"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import HudOverlay from "@/components/canvas/HudOverlay";
import ExperienceCanvas, { ExperiencePreload } from "@/components/canvas/Experience";
import HeroSection from "@/components/sections/HeroSection";
import DioramaSection from "@/components/sections/DioramaSection";
import MetricsFlythroughSection from "@/components/sections/MetricsFlythroughSection";
import SpecialtiesShowcaseSection from "@/components/sections/SpecialtiesShowcaseSection";
import FinaleBookingSection from "@/components/sections/FinaleBookingSection";

export default function HomeClient() {
  const { progress, currentScene } = useScrollProgress();

  return (
    <>
      {/* Preload 3D assets */}
      <ExperiencePreload />

      {/* Fixed 3D Canvas - Full Viewport */}
      <ExperienceCanvas progress={progress} currentScene={currentScene} />

      {/* Fixed HUD Overlay */}
      <HudOverlay />

      {/* Scrollable Content Sections - Overlaid on Canvas */}
      <main id="main-content" className="relative z-10 min-h-screen">
        {/* Scene 1: Hero Section (0% - 18%) */}
        <HeroSection
          isActive={currentScene === 1}
          sceneProgress={progress <= 0.18 ? progress / 0.18 : 1}
        />

        {/* Scene 2: Diorama Section (18% - 35%) */}
        <DioramaSection
          isActive={currentScene === 2}
          sceneProgress={progress > 0.18 && progress <= 0.35 ? (progress - 0.18) / 0.17 : progress <= 0.18 ? 0 : 1}
        />

        {/* Scene 3: Metrics Flythrough (35% - 60%) */}
        <MetricsFlythroughSection
          isActive={currentScene === 3}
          sceneProgress={progress > 0.35 && progress <= 0.6 ? (progress - 0.35) / 0.25 : progress <= 0.35 ? 0 : 1}
        />

        {/* Scene 4: Specialties Showcase (60% - 82%) */}
        <SpecialtiesShowcaseSection
          isActive={currentScene === 4}
          sceneProgress={progress > 0.6 && progress <= 0.82 ? (progress - 0.6) / 0.22 : progress <= 0.6 ? 0 : 1}
        />

        {/* Scene 5: Finale Booking (82% - 100%) */}
        <FinaleBookingSection
          isActive={currentScene === 5}
          sceneProgress={progress > 0.82 ? (progress - 0.82) / 0.18 : 0}
        />
      </main>

      {/* Debug indicator (remove in production) */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 left-4 z-50 glass p-3 text-xs font-mono pointer-events-none" style={{ zIndex: 60 }}>
          <div>Scene: {currentScene}</div>
          <div>Progress: {(progress * 100).toFixed(1)}%</div>
        </div>
      )}
    </>
  );
}