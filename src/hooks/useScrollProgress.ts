"use client";

import { useEffect, useState } from "react";

const sectionIds = ["home", "facilities", "patient-impact", "specialties", "contact"];

export function useScrollProgress() {
  const [scroll, setScroll] = useState({ progress: 0, currentScene: 1 });

  useEffect(() => {
    const sections = sectionIds.map(id => document.getElementById(id));
    let frame = 0;

    function measure() {
      frame = 0;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const progress = range > 0 ? Math.max(0, Math.min(1, window.scrollY / range)) : 0;
      let currentScene = 1;
      sections.forEach((section, i) => {
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          currentScene = i + 1;
        }
      });
      if (progress === 1) currentScene = sections.length;
      setScroll(previous =>
        previous.progress === progress && previous.currentScene === currentScene
          ? previous
          : { progress, currentScene }
      );
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(measure);
    }
    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return scroll;
}
