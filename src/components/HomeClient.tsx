"use client";

import dynamic from "next/dynamic";
import { Component, useState, useSyncExternalStore, type ReactNode } from "react";
import DioramaSection from "./sections/DioramaSection";
import HudOverlay from "@/components/canvas/HudOverlay";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const ExperienceCanvas = dynamic(() => import("./canvas/Experience"), { ssr: false });
const scenePreference = "(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

// Some browsers expose the WebGL API even when no graphics context is available.
let webglAvailable: boolean | undefined;
function checkWebGL() {
  try {
    const gl = document.createElement("canvas").getContext("webgl2");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(gl);
  } catch {
    return false;
  }
}

function subscribeToPreference(notify: () => void) {
  const media = window.matchMedia(scenePreference);
  function update() {
    if (media.matches && webglAvailable === undefined) webglAvailable = checkWebGL();
    notify();
  }
  media.addEventListener("change", update);
  update();
  return () => media.removeEventListener("change", update);
}

function canShowScene() {
  return webglAvailable === true && window.matchMedia(scenePreference).matches;
}

// Renderer and chunk failures must be contained in the decorative layer.
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function HomeClient({ hero, children }: { hero: ReactNode; children: ReactNode }) {
  const [department, setDepartment] = useState(0);
  const { progress, currentScene } = useScrollProgress();
  const showScene = useSyncExternalStore(subscribeToPreference, canShowScene, () => false);

  return (
    <>
      {showScene && (
        <SceneBoundary>
          <div id="canvas-container" aria-hidden="true">
            <ExperienceCanvas department={department} progress={progress} currentScene={currentScene} />
          </div>
        </SceneBoundary>
      )}
      <HudOverlay progress={progress} currentScene={currentScene} />
      <main id="main-content" className="relative z-10">
        {hero}
        <DioramaSection selected={department} onSelect={setDepartment} />
        {children}
      </main>
    </>
  );
}
