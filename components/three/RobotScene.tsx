"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { lerp, clamp } from "@/lib/utils";

type Tracks = { mx: MotionValue<number>; my: MotionValue<number>; progress: MotionValue<number> };

/* ------------------------------- Robot bust ------------------------------- */
function Robot({ mx, my, progress }: Tracks) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);

  const shell = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#20283a", metalness: 0.92, roughness: 0.28, envMapIntensity: 1.4 }),
    [],
  );
  const plate = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#05070b", metalness: 0.7, roughness: 0.12, envMapIntensity: 1.2 }),
    [],
  );
  const accent = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#0a1622", metalness: 1, roughness: 0.3, envMapIntensity: 1.6 }),
    [],
  );
  const glow = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#28d7fb", emissive: "#28d7fb", emissiveIntensity: 4, toneMapped: false }),
    [],
  );

  useFrame((state, delta) => {
    const px = mx.get();
    const py = my.get();
    const p = progress.get();

    if (head.current) {
      const ty = clamp(px * 0.6, -0.7, 0.7);
      const tx = clamp(-py * 0.4, -0.4, 0.45);
      head.current.rotation.y = lerp(head.current.rotation.y, ty, 0.08);
      head.current.rotation.x = lerp(head.current.rotation.x, tx, 0.08);
    }
    if (root.current) {
      root.current.rotation.y = lerp(root.current.rotation.y, px * 0.18, 0.05);
      root.current.position.y = lerp(-0.3, -1.8, p);
      const s = lerp(1, 0.86, p);
      root.current.scale.setScalar(s);
    }
    const t = state.clock.elapsedTime;
    if (ringA.current) ringA.current.rotation.z = t * 0.3;
    if (ringB.current) {
      ringB.current.rotation.x = Math.PI / 2.4;
      ringB.current.rotation.y = t * 0.4;
    }
    if (ringC.current) {
      ringC.current.rotation.x = Math.PI / 3;
      ringC.current.rotation.z = -t * 0.22;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={root} position={[0, -0.3, 0]}>
        {/* Holographic rings */}
        <mesh ref={ringA}>
          <torusGeometry args={[1.85, 0.008, 16, 120]} />
          <meshBasicMaterial color="#28d7fb" transparent opacity={0.5} toneMapped={false} />
        </mesh>
        <mesh ref={ringB}>
          <torusGeometry args={[2.15, 0.006, 16, 120]} />
          <meshBasicMaterial color="#3b9dff" transparent opacity={0.35} toneMapped={false} />
        </mesh>
        <mesh ref={ringC}>
          <torusGeometry args={[1.6, 0.01, 16, 120]} />
          <meshBasicMaterial color="#8af2ff" transparent opacity={0.28} toneMapped={false} />
        </mesh>

        {/* Head */}
        <group ref={head} position={[0, 0.75, 0]}>
          <RoundedBox args={[1.45, 1.55, 1.35]} radius={0.42} smoothness={6} material={shell} />
          {/* faceplate */}
          <RoundedBox args={[1.12, 1.22, 0.4]} radius={0.32} smoothness={6} position={[0, -0.02, 0.62]} material={plate} />
          {/* eyes */}
          <mesh position={[-0.3, 0.08, 0.86]} rotation={[0, 0, Math.PI / 2]} material={glow}>
            <capsuleGeometry args={[0.07, 0.18, 8, 16]} />
          </mesh>
          <mesh position={[0.3, 0.08, 0.86]} rotation={[0, 0, Math.PI / 2]} material={glow}>
            <capsuleGeometry args={[0.07, 0.18, 8, 16]} />
          </mesh>
          {/* voice bar */}
          <mesh position={[0, -0.42, 0.84]} material={glow}>
            <boxGeometry args={[0.4, 0.03, 0.03]} />
          </mesh>
          {/* side units */}
          <mesh position={[-0.78, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={accent}>
            <cylinderGeometry args={[0.22, 0.22, 0.16, 24]} />
          </mesh>
          <mesh position={[0.78, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={accent}>
            <cylinderGeometry args={[0.22, 0.22, 0.16, 24]} />
          </mesh>
          <pointLight position={[0, 0.1, 1]} intensity={6} distance={3} color="#28d7fb" />
        </group>

        {/* Neck */}
        <mesh position={[0, -0.15, 0]} material={accent}>
          <cylinderGeometry args={[0.28, 0.34, 0.5, 24]} />
        </mesh>

        {/* Torso / shoulders */}
        <group position={[0, -1.25, 0]}>
          <RoundedBox args={[2.5, 1.4, 1.25]} radius={0.4} smoothness={5} material={shell} />
          {/* chest core */}
          <mesh position={[0, 0.05, 0.66]} material={glow}>
            <torusGeometry args={[0.24, 0.04, 16, 48]} />
          </mesh>
          <mesh position={[0, 0.05, 0.64]}>
            <circleGeometry args={[0.2, 32]} />
            <meshBasicMaterial color="#0a7ea4" transparent opacity={0.6} toneMapped={false} />
          </mesh>
          {/* collar lines */}
          <RoundedBox args={[2.52, 0.06, 1.27]} radius={0.03} smoothness={4} position={[0, 0.45, 0]} material={glow} />
        </group>
      </group>
    </Float>
  );
}

/* ------------------------------- Energy dust ------------------------------ */
function Dust({ count = 400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#28d7fb" transparent opacity={0.8} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={3} position={[3, 4, 4]} scale={[7, 9, 1]} color="#bfe9ff" />
      <Lightformer form="rect" intensity={2.4} position={[-5, 1, 3]} scale={[6, 9, 1]} color="#28d7fb" />
      <Lightformer form="rect" intensity={1.6} position={[0, -4, 4]} scale={[9, 4, 1]} color="#3b9dff" />
      <Lightformer form="ring" intensity={2.6} position={[-3, 3, -5]} scale={4} color="#ffffff" />
    </Environment>
  );
}

export default function RobotScene(tracks: Tracks) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.2, 6], fov: 36 }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 7, 6]} angle={0.5} penumbra={1} intensity={120} color="#bfe9ff" />
        <spotLight position={[-7, 2, 4]} angle={0.6} penumbra={1} intensity={70} color="#28d7fb" />
        <Robot {...tracks} />
        <Dust />
        <Studio />
      </Suspense>
    </Canvas>
  );
}
