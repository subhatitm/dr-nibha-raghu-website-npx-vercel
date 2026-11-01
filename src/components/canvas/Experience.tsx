"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  Environment,
  ContactShadows,
  useGLTF,
  Preload,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
  Noise,
  ChromaticAberration,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { SCENE_CONFIG } from "@/hooks/useScrollProgress";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// TYPES & CONSTANTS
// ============================================

// Camera spline points for scroll-driven camera path
const CAMERA_SPLINE_POINTS = [
  // Scene 1: Zoomed into monolith
  new THREE.Vector3(0, 1.5, 8),
  new THREE.Vector3(-2, 2, 10),
  // Scene 2: Transition to diorama
  new THREE.Vector3(-5, 4, 12),
  new THREE.Vector3(-8, 5, 8),
  // Scene 3: Orbit around monolith
  new THREE.Vector3(-10, 6, 0),
  new THREE.Vector3(-8, 5, -8),
  new THREE.Vector3(-2, 3, -12),
  // Scene 4: Specialties view
  new THREE.Vector3(0, 4, -15),
  new THREE.Vector3(5, 5, -12),
  // Scene 5: Wide horizon finale
  new THREE.Vector3(10, 8, -5),
  new THREE.Vector3(15, 12, 0),
];

const CAMERA_LOOK_AT_POINTS = [
  new THREE.Vector3(0, 1, 0),   // Monolith center
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, 0, 0),   // Diorama center
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 1, 0),   // Monolith orbit
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, 0, 0),   // Specialties
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 2, -20), // Horizon
  new THREE.Vector3(0, 2, -50),
];

// ============================================
// 3D COMPONENTS
// ============================================

// --- Terrain / Landscape ---
function Terrain() {
  const geometry = useRef<THREE.PlaneGeometry | null>(null);
  const material = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    geometry.current = new THREE.PlaneGeometry(200, 200, 200, 200);
    const positions = geometry.current.attributes.position;
    const count = positions.count;

    for (let i = 0; i < count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      // Create organic terrain with noise
      const noise = 
        Math.sin(x * 0.1) * Math.cos(y * 0.1) * 2 +
        Math.sin(x * 0.05 + y * 0.05) * 1.5 +
        Math.sin(x * 0.2) * 0.5;
      positions.setZ(i, noise);
    }
    geometry.current.computeVertexNormals();

    material.current = new THREE.MeshStandardMaterial({
      color: 0x031612,
      roughness: 0.9,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
  }, []);

  return (
    <mesh
      ref={(el) => {
        if (el) {
          el.geometry = geometry.current!;
          el.material = material.current!;
          el.rotation.x = -Math.PI / 2;
          el.position.y = -2;
          el.receiveShadow = true;
        }
      }}
    />
  );
}

// --- Monolith (Central Hero Element) ---
function Monolith({ 
  progress, 
  scene,
  mouse = { x: 0, y: 0 } 
}: { 
  progress: number; 
  scene: number;
  mouse?: { x: number; y: number };
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scene: threeScene } = useThree();

  // Morph from solid to particle helix in scene 5
  const [morphProgress, setMorphProgress] = useState(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;
    const sceneProgress = progress;

    // Scene 1: Subtle float and cursor tilt
    if (scene === 1) {
      mesh.position.y = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      mesh.rotation.y = state.clock.elapsedTime * 0.05;
      // Cursor parallax
      mesh.rotation.x += (mouse.y * 0.15 - mesh.rotation.x) * 0.05;
      mesh.rotation.z += (-mouse.x * 0.15 - mesh.rotation.z) * 0.05;
    }

    // Scene 3: Orbit around monolith
    if (scene === 3) {
      const angle = sceneProgress * Math.PI * 2;
      mesh.position.x = Math.sin(angle) * 8;
      mesh.position.z = Math.cos(angle) * 8;
      mesh.rotation.y = angle + Math.PI / 2;
    }

    // Scene 5: Morph to particle helix
    if (scene === 5) {
      const localProgress = (sceneProgress - SCENE_CONFIG.scene5.start) / (SCENE_CONFIG.scene5.end - SCENE_CONFIG.scene5.start);
      setMorphProgress(Math.min(1, Math.max(0, localProgress * 1.2)));
    }
  });

  // Core refractive glass material
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transmission: 0.95,
    thickness: 2,
    roughness: 0,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
    ior: 1.5,
    envMapIntensity: 1.5,
    color: new THREE.Color(0x072a24),
    side: THREE.DoubleSide,
  });

  // Emissive core material
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x10f5b8,
    transparent: true,
    opacity: 0.6,
    side: THREE.DoubleSide,
  });

  return (
    <group ref={meshRef} position={[0, 1.5, 0]}>
      {/* Outer glass prism */}
      <mesh
        castShadow
        receiveShadow
        geometry={new THREE.BoxGeometry(1.2, 6, 0.3)}
        material={glassMaterial}
      />
      {/* Inner glowing core - acoustic/DNA wave */}
      <mesh
        geometry={new THREE.CapsuleGeometry(0.15, 4, 8, 16)}
        material={coreMaterial}
      />
      {/* Emerald edge glow strips */}
      <mesh
        geometry={new THREE.BoxGeometry(1.22, 6.2, 0.32)}
        material={new THREE.MeshBasicMaterial({
          color: 0x10f5b8,
          transparent: true,
          opacity: 0.15,
          side: THREE.BackSide,
        })}
      />
      {/* Particle helix morph - Scene 5 */}
      {morphProgress > 0 && (
        <ParticleHelix progress={morphProgress} />
      )}
    </group>
  );
}

// --- Particle Helix (Scene 5 Finale) ---
function ParticleHelix({ progress }: { progress: number }) {
  const pointsRef = useRef<THREE.Vector3[]>([]);
  const colorsRef = useRef<THREE.Color[]>([]);

  useEffect(() => {
    // Generate helix points
    const count = 2000;
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const radius = 2 + t * 4;
      const height = t * 12;
      const angle = t * Math.PI * 6;

      pointsRef.current.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          height - 6,
          Math.sin(angle) * radius
        )
      );

      colorsRef.current.push(
        new THREE.Color().setHSL(0.45, 1, 0.5 + t * 0.3)
      );
    }
  }, []);

  useFrame((state) => {
    // Animate particles
  });

  return (
    <points
      geometry={(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(pointsRef.current.flatMap((p) => p.toArray()), 3)
        );
        geo.setAttribute(
          "color",
          new THREE.Float32BufferAttribute(colorsRef.current.flatMap((c) => c.toArray()), 3)
        );
        geo.setAttribute(
          "size",
          new THREE.Float32BufferAttribute(
            pointsRef.current.map(() => 0.08 + Math.random() * 0.04),
            1
          )
        );
        return geo;
      })()}
      material={new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: progress,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })}
    />
  );
}

// --- Hospital Diorama (Scene 2) ---
function HospitalDiorama({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [activeDepartment, setActiveDepartment] = useState(0);

  const departments = [
    { name: "ENT Outpatient Suite", position: new THREE.Vector3(-3, 1, 2), color: 0x10f5b8 },
    { name: "Endoscopic Sinus Lab", position: new THREE.Vector3(3, 1, 2), color: 0x2ceaa3 },
    { name: "Head & Neck Oncology Wing", position: new THREE.Vector3(0, 1, -3), color: 0x0cd494 },
    { name: "Micro-Ear Surgery Theater", position: new THREE.Vector3(-3, 1, -2), color: 0x10f5b8 },
    { name: "Diagnostics Center", position: new THREE.Vector3(3, 1, -2), color: 0x2ceaa3 },
  ];

  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;

      // Camera tween to active department
      const target = departments[activeDepartment].position;
      groupRef.current.position.lerp(
        new THREE.Vector3(-target.x * 0.5, 0, -target.z * 0.5),
        0.02
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Circular tiered pedestal */}
      <mesh
        position={[0, -0.5, 0]}
        castShadow
        receiveShadow
        geometry={new THREE.CylinderGeometry(8, 10, 1, 32)}
        material={new THREE.MeshStandardMaterial({
          color: 0xe8b5a8,
          roughness: 0.7,
          metalness: 0.1,
        })}
      />
      <mesh
        position={[0, 0, 0]}
        castShadow
        receiveShadow
        geometry={new THREE.CylinderGeometry(6, 8, 1.5, 32)}
        material={new THREE.MeshStandardMaterial({
          color: 0xdf8e7b,
          roughness: 0.6,
          metalness: 0.1,
        })}
      />

      {/* Hospital building */}
      <group position={[0, 1, 0]}>
        {/* Main building */}
        <mesh
          castShadow
          geometry={new THREE.BoxGeometry(8, 6, 6)}
          material={new THREE.MeshStandardMaterial({
            color: 0xf4c6b8,
            roughness: 0.4,
            metalness: 0.1,
          })}
        />
        {/* Central tower */}
        <mesh
          position={[0, 4, 0]}
          castShadow
          geometry={new THREE.CylinderGeometry(1.5, 2, 4, 8)}
          material={new THREE.MeshStandardMaterial({
            color: 0xdf8e7b,
            roughness: 0.3,
            metalness: 0.2,
          })}
        />
        {/* Roof */}
        <mesh
          position={[0, 7, 0]}
          castShadow
          geometry={new THREE.ConeGeometry(4.5, 2, 8)}
          material={new THREE.MeshStandardMaterial({
            color: 0x8b5a4a,
            roughness: 0.5,
            metalness: 0.1,
          })}
        />

        {/* Department wings - highlighted based on active */}
        {departments.map((dept, i) => (
          <mesh
            key={dept.name}
            position={dept.position}
            castShadow
            geometry={new THREE.BoxGeometry(2.5, 2, 2.5)}
            material={new THREE.MeshStandardMaterial({
              color: activeDepartment === i ? dept.color : 0xf3c7ba,
              roughness: 0.4,
              metalness: 0.1,
              emissive: activeDepartment === i ? new THREE.Color(dept.color) : 0x000000,
              emissiveIntensity: activeDepartment === i ? 0.3 : 0,
            })}
          />
        ))}
      </group>

      {/* Stylized trees */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Tree
          key={i}
          position={[
            Math.cos(i * 0.785) * 12,
            0,
            Math.sin(i * 0.785) * 12,
          ]}
          scale={0.8 + Math.random() * 0.4}
        />
      ))}

      {/* Street lamps */}
      {Array.from({ length: 6 }).map((_, i) => (
        <StreetLamp
          key={i}
          position={[
            Math.cos(i * 1.047 + 0.5) * 10,
            0,
            Math.sin(i * 1.047 + 0.5) * 10,
          ]}
        />
      ))}

      {/* Lounge seating */}
      {Array.from({ length: 4 }).map((_, i) => (
        <Bench
          key={i}
          position={[
            Math.cos(i * 1.57 + 0.7) * 9,
            0.2,
            Math.sin(i * 1.57 + 0.7) * 9,
          ]}
          rotation={[0, i * 1.57 + 0.7 + Math.PI / 2, 0]}
        />
      ))}
    </group>
  );
}

// --- Tree Component ---
function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh
        castShadow
        geometry={new THREE.CylinderGeometry(0.15, 0.25, 1.5, 6)}
        material={new THREE.MeshStandardMaterial({ color: 0x5a4a3a, roughness: 0.9 })}
      />
      {/* Foliage layers */}
      <mesh
        position={[0, 1.2, 0]}
        castShadow
        geometry={new THREE.ConeGeometry(0.8, 1.5, 6)}
        material={new THREE.MeshStandardMaterial({ color: 0x2d5a3d, roughness: 0.8 })}
      />
      <mesh
        position={[0, 2, 0]}
        castShadow
        geometry={new THREE.ConeGeometry(0.6, 1.2, 6)}
        material={new THREE.MeshStandardMaterial({ color: 0x3a7a4a, roughness: 0.8 })}
      />
    </group>
  );
}

// --- Street Lamp ---
function StreetLamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh
        castShadow
        geometry={new THREE.CylinderGeometry(0.05, 0.08, 3, 8)}
        material={new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.5, metalness: 0.5 })}
      />
      <mesh
        position={[0, 1.5, 0]}
        geometry={new THREE.SphereGeometry(0.3, 8, 8)}
        material={new THREE.MeshBasicMaterial({
          color: 0xffd700,
          transparent: true,
          opacity: 0.8,
        })}
      />
      <pointLight
        position={[0, 1.5, 0]}
        color={0xffd700}
        intensity={2}
        distance={8}
        decay={2}
      />
    </group>
  );
}

// --- Bench ---
function Bench({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh
        castShadow
        position={[0, 0.2, 0]}
        geometry={new THREE.BoxGeometry(2, 0.1, 0.6)}
        material={new THREE.MeshStandardMaterial({ color: 0x8b7a6a, roughness: 0.7 })}
      />
      <mesh
        castShadow
        position={[0, 0.6, -0.2]}
        geometry={new THREE.BoxGeometry(2, 0.5, 0.1)}
        material={new THREE.MeshStandardMaterial({ color: 0x8b7a6a, roughness: 0.7 })}
      />
    </group>
  );
}

// --- Monoliths / Pillars (Background) ---
function BackgroundMonoliths() {
  const positions: [number, number, number][] = [
    [-25, 0, -20], [25, 0, -20], [-20, 0, 25], [20, 0, 25],
    [-30, 0, 0], [30, 0, 0], [0, 0, -30], [0, 0, 30],
  ];

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          castShadow
          geometry={new THREE.BoxGeometry(1.5, 15 + Math.random() * 10, 1.5)}
          material={new THREE.MeshStandardMaterial({
            color: 0x05201b,
            roughness: 0.8,
            metalness: 0.1,
            emissive: new THREE.Color(0x10f5b8),
            emissiveIntensity: 0.05,
          })}
        />
      ))}
    </group>
  );
}

// --- Volumetric Fog ---
function VolumetricFog() {
  return (
    <mesh
      geometry={new THREE.BoxGeometry(200, 50, 200)}
      material={new THREE.MeshBasicMaterial({
        color: 0x031612,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
        depthWrite: false,
      })}
      position={[0, 20, 0]}
    />
  );
}

// --- Floating Particles (Ambient) ---
function AmbientParticles() {
  const count = 500;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const alphas = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = Math.random() * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    sizes[i] = Math.random() * 0.5 + 0.1;
    alphas[i] = Math.random() * 0.5 + 0.1;
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-alpha" args={[alphas, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={`
          attribute float size;
          attribute float alpha;
          varying float vAlpha;
          void main() {
            vAlpha = alpha;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying float vAlpha;
          void main() {
            float dist = length(gl_PointCoord - 0.5);
            if (dist > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
            gl_FragColor = vec4(0.06, 0.96, 0.72, alpha);
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// --- Camera Controller (Scroll-driven) ---
function CameraController({ progress }: { progress: number }) {
  const { camera } = useThree();
  const splineRef = useRef<THREE.CatmullRomCurve3 | null>(null);
  const lookAtSplineRef = useRef<THREE.CatmullRomCurve3 | null>(null);

  useEffect(() => {
    splineRef.current = new THREE.CatmullRomCurve3(CAMERA_SPLINE_POINTS);
    splineRef.current.closed = false;
    splineRef.current.tension = 0.5;

    lookAtSplineRef.current = new THREE.CatmullRomCurve3(CAMERA_LOOK_AT_POINTS);
    lookAtSplineRef.current.closed = false;
    lookAtSplineRef.current.tension = 0.5;
  }, []);

  useFrame(() => {
    if (splineRef.current && lookAtSplineRef.current) {
      const pos = splineRef.current.getPointAt(progress);
      const lookAt = lookAtSplineRef.current.getPointAt(progress);

      camera.position.lerp(pos, 0.1);
      camera.lookAt(lookAt);
    }
  });

  return null;
}

// --- Mouse Parallax ---
function MouseParallax() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    targetRef.current.x += (mouseRef.current.x * 0.5 - targetRef.current.x) * 0.05;
    targetRef.current.y += (mouseRef.current.y * 0.5 - targetRef.current.y) * 0.05;

    camera.position.x += (targetRef.current.x - camera.position.x) * 0.02;
    camera.position.y += (targetRef.current.y - camera.position.y) * 0.02;
  });

  return null;
}

// ============================================
// MAIN EXPERIENCE COMPONENT
// ============================================

interface ExperienceCanvasProps {
  progress: number;
  currentScene: number;
}

export function ExperienceCanvas({ progress, currentScene }: ExperienceCanvasProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Canvas
      id="canvas-container"
      gl={{
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 1.5, 8], fov: 50, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      shadows
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.2;
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <color attach="background" args={[0x031612]} />
      <fog attach="fog" args={[0x031612, 10, 80]} />

      {/* Lighting */}
      <ambientLight intensity={0.3} color={0x10f5b8} />
      <directionalLight
        position={[20, 30, 20]}
        intensity={2}
        color={0xffffff}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.001}
      />
      <directionalLight
        position={[-20, 20, -20]}
        intensity={0.5}
        color={0x10f5b8}
      />
      <hemisphereLight color={0x10f5b8} groundColor={0x031612} intensity={0.5} />

      {/* Environment for reflections */}
      <Environment
        preset="city"
        background={false}
        ground={false}
      />

      {/* Scene Elements */}
      <Terrain />
      <BackgroundMonoliths />
      <VolumetricFog />
      <AmbientParticles />

      {/* Main Monolith - visible in scenes 1, 3, 5 */}
      {(currentScene === 1 || currentScene === 3 || currentScene === 5) && (
        <Monolith progress={progress} scene={currentScene} mouse={mouse} />
      )}

      {/* Hospital Diorama - Scene 2 */}
      {currentScene === 2 && <HospitalDiorama progress={progress} />}

      {/* Contact shadows for grounding */}
      <ContactShadows
        position={[0, -1.9, 0]}
        opacity={0.3}
        scale={20}
        blur={2}
        far={10}
        resolution={256}
      />

      {/* Camera & Mouse Controllers */}
      <CameraController progress={progress} />
      <MouseParallax />

      {/* Post Processing */}
      <EffectComposer multisampling={8}>
        <Bloom
          luminanceThreshold={0.8}
          luminanceSmoothing={0.025}
          height={0.3}
          intensity={0.5}
        />
        <DepthOfField
          focusDistance={10}
          focalLength={0.05}
          bokehScale={2}
          height={480}
        />
        <Vignette offset={0.3} darkness={0.4} />
        <Noise opacity={0.02} />
        <ChromaticAberration offset={[0.0003, 0.0003]} />
      </EffectComposer>
    </Canvas>
  );
}

// ============================================
// EXPORT FOR PRELOADING
// ============================================

export function ExperiencePreload() {
  return <Preload all />;
}

export default ExperienceCanvas;