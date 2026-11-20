"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent } from "react";
import styles from "./ClinicModel.module.css";

type Size = [number, number, number];
type Material = "stone" | "plinth" | "glass" | "roof" | "tower" | "terrace" | "tree" | "trunk";
type BlockProps = { size: Size; at: Size; material: Material; highlighted?: boolean };
type ModelStyle = CSSProperties & Record<`--${string}`, string>;

function Block({ size: [w, h, d], at: [x, y, z], material, highlighted }: BlockProps) {
  const style: ModelStyle = {
    "--w": w + "em", "--h": h + "em", "--d": d + "em",
    transform: `translate3d(${x}em, ${y}em, ${z}em)`,
  };
  return (
    <div className={styles.block} data-material={material} data-highlighted={highlighted || undefined} style={style}>
      {["front", "back", "right", "left", "top"].map(side => <i key={side} data-face={side} />)}
    </div>
  );
}

// Building coordinates are in model units. Floor level is at y = 0.
const wings: { id: string; x: number; z: number; width: number; depth: number; height: number }[] = [
  { id: "opd", x: -51, z: 20, width: 51, depth: 48, height: 44 },
  { id: "sinus", x: 51, z: 20, width: 51, depth: 48, height: 44 },
  { id: "oncology", x: 0, z: -31, width: 56, depth: 44, height: 65 },
  { id: "ear", x: -52, z: -25, width: 45, depth: 34, height: 38 },
  { id: "diagnostics", x: 52, z: -25, width: 45, depth: 34, height: 38 },
];

const reducedMotion = "(prefers-reduced-motion: reduce)";
function subscribeMotion(notify: () => void) {
  const query = window.matchMedia(reducedMotion);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}
const prefersReducedMotion = () => window.matchMedia(reducedMotion).matches;
const serverMotionPreference = () => true;

export default function ClinicModel({ selected }: { selected?: string }) {
  const scene = useRef<HTMLDivElement>(null);
  const manualOrbit = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; start: number } | null>(null);
  const angle = useRef(0);
  const reduce = useSyncExternalStore(subscribeMotion, prefersReducedMotion, serverMotionPreference);
  const [play, setPlay] = useState<boolean | null>(null);
  const [inView, setInView] = useState(true);
  const playing = play ?? !reduce;

  useEffect(() => {
    const node = scene.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    drag.current = { id: event.pointerId, x: event.clientX, start: angle.current };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const active = drag.current;
    if (!active || active.id !== event.pointerId) return;
    const offset = event.clientX - active.x;
    if (Math.abs(offset) < 3) return;
    angle.current = active.start + offset * 0.7;
    if (manualOrbit.current) manualOrbit.current.style.transform = `rotateY(${angle.current}deg)`;
  }

  return (
    <div className={styles.frame} ref={scene}>
      <div className={styles.viewport} role="img" aria-label="Rotating architectural illustration of a clinic with five wings"
        onPointerDown={startDrag} onPointerMove={moveDrag}
        onLostPointerCapture={() => { drag.current = null; }}>
        <div className={styles.camera} aria-hidden="true">
          <div className={styles.tilt}>
            <div className={styles.orbit} style={{ animationPlayState: playing && inView ? "running" : "paused" }}>
              <div className={styles.manual} ref={manualOrbit}>
                <Block size={[232, 9, 163]} at={[0, 7, 0]} material="plinth" />
                <Block size={[222, 4, 153]} at={[0, 0.5, 0]} material="terrace" />
                {wings.map(wing => (
                  <div className={styles.assembly} key={wing.id}>
                    <Block size={[wing.width, wing.height, wing.depth]} at={[wing.x, -wing.height / 2, wing.z]}
                      material="glass" highlighted={selected === wing.id} />
                    <Block size={[wing.width + 3, 4, wing.depth + 3]} at={[wing.x, -wing.height - 2, wing.z]} material="roof" />
                  </div>
                ))}
                <Block size={[54, 74, 52]} at={[0, -37, 15]} material="stone" />
                <Block size={[57, 4, 55]} at={[0, -76, 15]} material="roof" />
                <Block size={[25, 85, 17]} at={[1, -42.5, 37]} material="tower" />
                <Block size={[46, 3, 21]} at={[0, -16, 49]} material="roof" />
                {[-18, 18].map(x => <Block key={x} size={[2, 16, 2]} at={[x, -8, 56]} material="stone" />)}
                {[[-93, 44], [90, 11], [-92, -40], [85, -55]].map(([x, z]) => (
                  <div className={styles.assembly} key={x}>
                    <Block size={[3, 16, 3]} at={[x, -8, z]} material="trunk" />
                    <Block size={[13, 14, 13]} at={[x, -19, z]} material="tree" />
                    <Block size={[9, 6, 9]} at={[x, -28, z]} material="tree" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.caption}>
        <span>Clinic illustration</span>
        <button type="button" onClick={() => setPlay(!playing)}>{playing ? "Pause rotation" : "Play rotation"}</button>
      </div>
    </div>
  );
}
