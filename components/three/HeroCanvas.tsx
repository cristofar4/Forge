"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { lerp } from "@/lib/utils";

/* ------------------------------- The Razor ------------------------------- */
function Razor({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const blade = useRef<THREE.Group>(null);
  const t = useRef(0);

  const steel = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c7ccd4"),
        metalness: 1,
        roughness: 0.17,
        envMapIntensity: 1.5,
      }),
    [],
  );
  const gold = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#caa44e"),
        metalness: 1,
        roughness: 0.22,
        envMapIntensity: 1.6,
        emissive: new THREE.Color("#3a2c0e"),
        emissiveIntensity: 0.35,
      }),
    [],
  );
  const horn = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#111014"),
        metalness: 0.45,
        roughness: 0.42,
        envMapIntensity: 0.8,
      }),
    [],
  );

  useFrame((state, delta) => {
    t.current += delta;
    const p = progress.get(); // 0 (top of hero) → 1 (hero exits)
    const { x: px, y: py } = state.pointer;

    if (group.current) {
      // continuous slow turn + pointer parallax, easing toward target
      const targetY = t.current * 0.18 + px * 0.5;
      const targetX = -py * 0.22 + 0.05;
      group.current.rotation.y = lerp(group.current.rotation.y, targetY, 0.06);
      group.current.rotation.x = lerp(group.current.rotation.x, targetX, 0.06);
      // recede & sink as the hero scrolls away
      group.current.position.y = lerp(0.1, -1.4, p);
      const s = lerp(1, 0.82, p);
      group.current.scale.setScalar(s);
    }
    if (blade.current) {
      // open at rest, fold closed as you scroll through the hero
      const open = lerp(-0.12, Math.PI * 0.92, p);
      blade.current.rotation.z = lerp(blade.current.rotation.z, open, 0.08);
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
      <group ref={group} rotation={[0.05, 0.4, 0]}>
        {/* Handle (two horn scales + gold collar) */}
        <group position={[-1.55, 0, 0]}>
          <RoundedBox args={[2.9, 0.36, 0.09]} radius={0.13} smoothness={5} position={[0, 0, 0.07]} material={horn} />
          <RoundedBox args={[2.9, 0.36, 0.09]} radius={0.13} smoothness={5} position={[0, 0, -0.07]} material={horn} />
          {/* end cap */}
          <mesh position={[-1.45, 0, 0]} material={gold}>
            <cylinderGeometry args={[0.13, 0.13, 0.22, 24]} />
          </mesh>
        </group>

        {/* Pivot pin */}
        <mesh rotation={[Math.PI / 2, 0, 0]} material={gold}>
          <cylinderGeometry args={[0.12, 0.12, 0.28, 24]} />
        </mesh>

        {/* Blade — pivots about origin */}
        <group ref={blade} rotation={[0, 0, -0.12]}>
          <group position={[1.45, 0.04, 0]}>
            {/* blade body */}
            <RoundedBox args={[2.7, 0.5, 0.045]} radius={0.03} smoothness={5} material={steel} />
            {/* gilded spine */}
            <RoundedBox args={[2.74, 0.07, 0.07]} radius={0.03} smoothness={4} position={[0, 0.235, 0]} material={gold} />
            {/* tang */}
            <RoundedBox args={[0.55, 0.16, 0.05]} radius={0.04} smoothness={4} position={[-1.55, -0.18, 0]} rotation={[0, 0, -0.5]} material={steel} />
          </group>
        </group>
      </group>
    </Float>
  );
}

/* ------------------------------- Gold dust ------------------------------- */
function GoldDust({ count = 700 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#e7cf91"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ----------------------------- Studio lights ----------------------------- */
function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={["#050506"]} />
      <Lightformer form="rect" intensity={3} position={[3, 4, 4]} scale={[6, 8, 1]} color="#fff4dd" />
      <Lightformer form="rect" intensity={2} position={[-5, 1, 2]} scale={[5, 8, 1]} color="#cdd6e6" />
      <Lightformer form="rect" intensity={1.4} position={[0, -3, 3]} scale={[8, 3, 1]} color="#caa44e" />
      <Lightformer form="ring" intensity={2.2} position={[-2, 3, -4]} scale={3} color="#ffffff" />
    </Environment>
  );
}

/* ------------------------------- The Canvas ------------------------------ */
export default function HeroCanvas({ progress }: { progress: MotionValue<number> }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.2, 8.5], fov: 32 }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <spotLight position={[6, 8, 6]} angle={0.5} penumbra={1} intensity={120} color="#fff4dd" />
        <spotLight position={[-8, 2, 4]} angle={0.6} penumbra={1} intensity={50} color="#caa44e" />
        <Razor progress={progress} />
        <GoldDust />
        <Studio />
      </Suspense>
    </Canvas>
  );
}
