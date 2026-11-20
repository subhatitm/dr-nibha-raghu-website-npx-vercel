"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
  Noise,
  ChromaticAberration,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { departments } from "../departments";

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
function shapeTerrain(geometry: THREE.PlaneGeometry) {
  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    positions.setZ(i, Math.sin(x * 0.1) * Math.cos(y * 0.1) * 2 +
      Math.sin((x + y) * 0.05) * 1.5 + Math.sin(x * 0.2) * 0.5);
  }
  positions.needsUpdate = true;
  geometry.computeVertexNormals();
}

function Terrain() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[200, 200, 100, 100]} onUpdate={shapeTerrain} />
      <meshStandardMaterial color={0x031612} roughness={0.9} metalness={0.1} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Monolith({ progress, scene }: { progress: number; scene: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const morph = scene === 5 ? THREE.MathUtils.clamp((progress - 0.82) / 0.18, 0, 1) : 0;
  useFrame(({ clock, pointer }) => {
    const group = groupRef.current;
    if (!group) return;
    if (scene === 1) {
      group.position.set(0, 1 + Math.sin(clock.elapsedTime * 0.5) * 0.15, 0);
      group.rotation.set(pointer.y * 0.1, clock.elapsedTime * 0.05, -pointer.x * 0.1);
    } else if (scene === 3) {
      const angle = progress * Math.PI * 2;
      group.position.set(Math.sin(angle) * 8, 1.5, Math.cos(angle) * 8);
      group.rotation.y = angle + Math.PI / 2;
    }
  });
  return (
    <group ref={groupRef} position={[0, 1.5, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 6, 0.3]} />
        <meshPhysicalMaterial transmission={0.95} thickness={2} roughness={0} clearcoat={1}
          ior={1.5} envMapIntensity={1.5} color={0x072a24} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <capsuleGeometry args={[0.15, 4, 8, 16]} />
        <meshBasicMaterial color={0x10f5b8} transparent opacity={0.6} />
      </mesh>
      <mesh>
        <boxGeometry args={[1.22, 6.2, 0.32]} />
        <meshBasicMaterial color={0x10f5b8} transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>
      {morph > 0 && <ParticleHelix progress={morph} />}
    </group>
  );
}

function ParticleHelix({ progress }: { progress: number }) {
  const { positions, colors } = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 6;
      const radius = 2 + t * 4;
      positions.set([Math.cos(angle) * radius, t * 12 - 6, Math.sin(angle) * radius], i * 3);
      color.setHSL(0.45, 1, 0.5 + t * 0.3).toArray(colors, i * 3);
    }
    return { positions, colors };
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={progress}
        blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

// --- Hospital Diorama (Scene 2) ---
function HospitalDiorama({ activeDepartment }: { activeDepartment: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const { x, z } = departments[activeDepartment].position;
  const targetPosition = useMemo(() => new THREE.Vector3(-x * 0.5, 0, -z * 0.5), [x, z]);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;

      // Camera tween to active department
      groupRef.current.position.lerp(targetPosition, 0.02);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Circular tiered pedestal */}
      <mesh position={[0, -0.5, 0]}
        castShadow
        receiveShadow>
        <cylinderGeometry args={[8, 10, 1, 32]} />
        <meshStandardMaterial color={0xe8b5a8} roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0]}
        castShadow
        receiveShadow>
        <cylinderGeometry args={[6, 8, 1.5, 32]} />
        <meshStandardMaterial color={0xdf8e7b} roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Hospital building */}
      <group position={[0, 1, 0]}>
        {/* Main building */}
        <mesh castShadow>
          <boxGeometry args={[8, 6, 6]} />
          <meshStandardMaterial color={0xf4c6b8} roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Central tower */}
        <mesh position={[0, 4, 0]}
          castShadow>
          <cylinderGeometry args={[1.5, 2, 4, 8]} />
          <meshStandardMaterial color={0xdf8e7b} roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 7, 0]}
          castShadow>
          <coneGeometry args={[4.5, 2, 8]} />
          <meshStandardMaterial color={0x8b5a4a} roughness={0.5} metalness={0.1} />
        </mesh>

        {/* Department wings - highlighted based on active */}
        {departments.map((dept, i) => (
          <mesh key={dept.name}
            position={[dept.position.x, 1, dept.position.z]}
            castShadow>
            <boxGeometry args={[2.5, 2, 2.5]} />
            <meshStandardMaterial color={activeDepartment === i ? 0x10f5b8 : 0xf3c7ba} roughness={0.4} metalness={0.1} emissive={activeDepartment === i ? new THREE.Color(0x10f5b8) : 0x000000} emissiveIntensity={activeDepartment === i ? 0.3 : 0} />
          </mesh>
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
          scale={1 + Math.sin(i * 13) * 0.2}
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
      <mesh castShadow>
        <cylinderGeometry args={[0.15, 0.25, 1.5, 6]} />
        <meshStandardMaterial color={0x5a4a3a} roughness={0.9} />
      </mesh>
      {/* Foliage layers */}
      <mesh position={[0, 1.2, 0]}
        castShadow>
        <coneGeometry args={[0.8, 1.5, 6]} />
        <meshStandardMaterial color={0x2d5a3d} roughness={0.8} />
      </mesh>
      <mesh position={[0, 2, 0]}
        castShadow>
        <coneGeometry args={[0.6, 1.2, 6]} />
        <meshStandardMaterial color={0x3a7a4a} roughness={0.8} />
      </mesh>
    </group>
  );
}

// --- Street Lamp ---
function StreetLamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.05, 0.08, 3, 8]} />
        <meshStandardMaterial color={0x4a4a4a} roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshBasicMaterial color={0xffd700} transparent={true} opacity={0.8} />
      </mesh>
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
      <mesh castShadow
        position={[0, 0.2, 0]}>
        <boxGeometry args={[2, 0.1, 0.6]} />
        <meshStandardMaterial color={0x8b7a6a} roughness={0.7} />
      </mesh>
      <mesh castShadow
        position={[0, 0.6, -0.2]}>
        <boxGeometry args={[2, 0.5, 0.1]} />
        <meshStandardMaterial color={0x8b7a6a} roughness={0.7} />
      </mesh>
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
        <mesh key={i}
          position={pos}
          castShadow>
          <boxGeometry args={[1.5, 20 + Math.sin(i * 13) * 5, 1.5]} />
          <meshStandardMaterial color={0x05201b} roughness={0.8} metalness={0.1} emissive={new THREE.Color(0x10f5b8)} emissiveIntensity={0.05} />
        </mesh>
      ))}
    </group>
  );
}

// --- Volumetric Fog ---
function VolumetricFog() {
  return (
    <mesh position={[0, 20, 0]}>
      <boxGeometry args={[200, 50, 200]} />
      <meshBasicMaterial color={0x031612} transparent={true} opacity={0.15} side={THREE.BackSide} depthWrite={false} />
    </mesh>
  );
}

// --- Floating Particles (Ambient) ---
function AmbientParticles() {
  const { positions, sizes, alphas } = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);
    const sample = (i: number) => {
      const value = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      return value - Math.floor(value);
    };
    for (let i = 0; i < count; i++) {
      positions.set([(sample(i * 5) - 0.5) * 100, sample(i * 5 + 1) * 50,
        (sample(i * 5 + 2) - 0.5) * 100], i * 3);
      sizes[i] = sample(i * 5 + 3) * 0.5 + 0.1;
      alphas[i] = sample(i * 5 + 4) * 0.5 + 0.1;
    }
    return { positions, sizes, alphas };
  }, []);

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
const positionCurve = new THREE.CatmullRomCurve3(CAMERA_SPLINE_POINTS);
const targetCurve = new THREE.CatmullRomCurve3(CAMERA_LOOK_AT_POINTS);

function CameraController({ progress }: { progress: number }) {
  const position = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3());
  useFrame(({ camera, pointer }) => {
    positionCurve.getPointAt(progress, position.current);
    position.current.x += pointer.x * 0.35;
    position.current.y += pointer.y * 0.2;
    camera.position.lerp(position.current, 0.1);
    camera.lookAt(targetCurve.getPointAt(progress, target.current));
  });
  return null;
}

interface ExperienceCanvasProps {
  progress: number;
  currentScene: number;
  department: number;
}

export function ExperienceCanvas({ progress, currentScene, department }: ExperienceCanvasProps) {

  return (
    <Canvas
      eventSource={document.body}
      eventPrefix="client"
      gl={{
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: false,
        powerPreference: "default",
      }}
      camera={{ position: [0, 1.5, 8], fov: 50, near: 0.1, far: 200 }}
      dpr={[1, 1.5]}
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
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
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
      <Environment resolution={64} frames={1}>
        <Lightformer position={[0, 6, -6]} scale={[10, 4, 1]} intensity={2} />
        <Lightformer position={[-5, 2, 3]} scale={[3, 8, 1]} intensity={2} color="#9fffe0" />
      </Environment>

      {/* Scene Elements */}
      <Terrain />
      <BackgroundMonoliths />
      <VolumetricFog />
      <AmbientParticles />

      {/* Main Monolith - visible in scenes 1, 3, 5 */}
      {(currentScene === 1 || currentScene === 3 || currentScene === 5) && (
        <Monolith progress={progress} scene={currentScene} />
      )}

      {/* Hospital Diorama - Scene 2 */}
      {currentScene === 2 && <HospitalDiorama activeDepartment={department} />}

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

      {/* Post Processing */}
      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={0.8}
          luminanceSmoothing={0.025}
          resolutionScale={0.5}
          intensity={0.5}
        />
        <DepthOfField
          focusDistance={0.05}
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

export default ExperienceCanvas;
