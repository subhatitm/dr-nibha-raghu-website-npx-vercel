"use client";

import { useEffect, useState } from "react";

const SCENE_CONFIG = {
  scene1: { start: 0, end: 0.18 },
  scene2: { start: 0.18, end: 0.35 },
  scene3: { start: 0.35, end: 0.6 },
  scene4: { start: 0.6, end: 0.82 },
  scene5: { start: 0.82, end: 1.0 },
};

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [currentScene, setCurrentScene] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Dynamic imports for client-only libraries
    const initScroll = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.1,
      });

      lenis.on("scroll", (e) => {
        const scrollProgress = e.progress;
        setProgress(scrollProgress);

        if (scrollProgress < SCENE_CONFIG.scene1.end) setCurrentScene(1);
        else if (scrollProgress < SCENE_CONFIG.scene2.end) setCurrentScene(2);
        else if (scrollProgress < SCENE_CONFIG.scene3.end) setCurrentScene(3);
        else if (scrollProgress < SCENE_CONFIG.scene4.end) setCurrentScene(4);
        else setCurrentScene(5);
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      ScrollTrigger.refresh();

      return () => {
        lenis.destroy();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    };

    const cleanup = initScroll();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, []);

  // Return default values during SSR
  if (!isClient) {
    return { progress: 0, currentScene: 1 };
  }

  return { progress, currentScene };
}

export { SCENE_CONFIG };