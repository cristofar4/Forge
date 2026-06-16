"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { lerp, clamp } from "@/lib/utils";

export type RobotMode = "idle" | "gate" | "dance" | "song" | "magic" | "ball" | "story" | "scan" | "diagnostics";
export type DancePhase = "none" | "walkoff" | "carryin" | "drop" | "dance" | "pickup" | "storeoff" | "return";

type Props = {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  bx: MotionValue<number>;
  by: MotionValue<number>;
  mode: RobotMode;
  phase: DancePhase;
  style?: string;
};

const BASE_Y = -0.1;

function Robot({ mx, my, bx, by, mode, phase, style }: Props) {
  const root = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const shA = useRef<THREE.Group>(null);
  const shB = useRef<THREE.Group>(null);
  const elA = useRef<THREE.Group>(null);
  const elB = useRef<THREE.Group>(null);
  const hipA = useRef<THREE.Group>(null);
  const hipB = useRef<THREE.Group>(null);
  const knA = useRef<THREE.Group>(null);
  const knB = useRef<THREE.Group>(null);
  const speaker = useRef<THREE.Group>(null);

  const panel = useMemo(() => new THREE.MeshStandardMaterial({ color: "#c7d2e0", metalness: 0.55, roughness: 0.45, envMapIntensity: 1.2 }), []);
  const dark = useMemo(() => new THREE.MeshStandardMaterial({ color: "#0f1320", metalness: 0.85, roughness: 0.4, envMapIntensity: 1.3 }), []);
  const glow = useMemo(() => new THREE.MeshStandardMaterial({ color: "#28d7fb", emissive: "#28d7fb", emissiveIntensity: 4, toneMapped: false }), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const r = root.current, ts = torso.current, hd = head.current;
    const A = shA.current, B = shB.current, EA = elA.current, EB = elB.current;
    const HA = hipA.current, HB = hipB.current, KA = knA.current, KB = knB.current;
    const sp = speaker.current;
    if (!r || !ts || !hd || !A || !B || !EA || !EB || !HA || !HB || !KA || !KB || !sp) return;

    const lp = (o: THREE.Euler | THREE.Vector3, k: "x" | "y" | "z", target: number, f = 0.12) => {
      o[k] = lerp(o[k], target, f);
    };

    const isDance = mode === "dance" && phase !== "none";
    let sVis = false, sx = 0, sy = 0, sz = 0, sRotY = 0;

    if (!isDance) {
      // ----- idle / interactive poses -----
      let hy: number, hx: number;
      if (mode === "ball") { hy = clamp(bx.get() * 0.8, -0.85, 0.85); hx = clamp(by.get() * 0.6, -0.5, 0.6); }
      else { hy = clamp(mx.get() * 0.5, -0.6, 0.6); hx = clamp(-my.get() * 0.35, -0.35, 0.4); }
      lp(hd.rotation, "y", hy, 0.1); lp(hd.rotation, "x", hx, 0.1); lp(hd.rotation, "z", 0, 0.1);

      lp(A.rotation, "x", 0.06, 0.1); lp(B.rotation, "x", 0.06, 0.1);
      lp(A.rotation, "z", 0.14, 0.1); lp(B.rotation, "z", -0.14, 0.1);
      lp(EA.rotation, "x", -0.16, 0.1); lp(EB.rotation, "x", -0.16, 0.1);
      lp(HA.rotation, "x", 0, 0.1); lp(HB.rotation, "x", 0, 0.1);
      lp(KA.rotation, "x", 0.02, 0.1); lp(KB.rotation, "x", 0.02, 0.1);
      lp(ts.rotation, "x", 0, 0.1);
      lp(r.position, "x", 0, 0.08);

      let yTarget = BASE_Y + Math.sin(t * 1.4) * 0.02;
      if (mode === "song") yTarget = BASE_Y + Math.sin(t * 5) * 0.08;
      r.position.y = lerp(r.position.y, yTarget, 0.1);

      if (mode === "magic") r.rotation.y += delta * 1.4;
      else lp(r.rotation, "y", mode === "song" ? Math.sin(t * 2) * 0.2 : mx.get() * 0.14, 0.05);
      lp(r.rotation, "z", 0, 0.1);
    } else {
      // ----- staged dance choreography -----
      const walking = phase === "walkoff" || phase === "carryin" || phase === "storeoff" || phase === "return";
      const holding = phase === "carryin" || phase === "storeoff";
      const xTarget = phase === "walkoff" || phase === "storeoff" ? 5 : 0;
      lp(r.position, "x", xTarget, 0.045);

      if (walking) {
        const w = t * 9, sw = Math.sin(w);
        HA.rotation.x = sw * 0.6; HB.rotation.x = -sw * 0.6;
        KA.rotation.x = Math.max(0, -sw) * 0.8; KB.rotation.x = Math.max(0, sw) * 0.8;
        if (holding) {
          lp(A.rotation, "x", -1.15, 0.2); lp(B.rotation, "x", -1.15, 0.2);
          lp(EA.rotation, "x", -0.7, 0.2); lp(EB.rotation, "x", -0.7, 0.2);
          lp(A.rotation, "z", 0.18, 0.2); lp(B.rotation, "z", -0.18, 0.2);
        } else {
          A.rotation.x = -sw * 0.5; B.rotation.x = sw * 0.5;
          lp(EA.rotation, "x", -0.2, 0.2); lp(EB.rotation, "x", -0.2, 0.2);
          lp(A.rotation, "z", 0.1, 0.2); lp(B.rotation, "z", -0.1, 0.2);
        }
        r.position.y = BASE_Y + Math.abs(Math.sin(w)) * 0.05;
        lp(ts.rotation, "x", 0, 0.1);
        lp(r.rotation, "z", 0, 0.1);
        lp(r.rotation, "y", phase === "walkoff" || phase === "storeoff" ? 0.25 : 0, 0.06);
        lp(hd.rotation, "x", 0, 0.1); lp(hd.rotation, "y", 0, 0.1); lp(hd.rotation, "z", 0, 0.1);
      } else if (phase === "drop" || phase === "pickup") {
        lp(ts.rotation, "x", 0.5, 0.12);
        lp(A.rotation, "x", -0.5, 0.12); lp(B.rotation, "x", -0.5, 0.12);
        lp(EA.rotation, "x", -0.45, 0.12); lp(EB.rotation, "x", -0.45, 0.12);
        lp(A.rotation, "z", 0.28, 0.12); lp(B.rotation, "z", -0.28, 0.12);
        lp(HA.rotation, "x", 0.25, 0.12); lp(HB.rotation, "x", 0.25, 0.12);
        lp(KA.rotation, "x", 0.45, 0.12); lp(KB.rotation, "x", 0.45, 0.12);
        r.position.y = lerp(r.position.y, BASE_Y - 0.08, 0.12);
        lp(r.rotation, "y", 0, 0.1); lp(r.rotation, "z", 0, 0.1);
        lp(hd.rotation, "x", 0.32, 0.1);
      } else {
        // the dance, matched to the song style
        const sty = style === "trap" ? "hiphop" : style || "afro";
        const P =
          sty === "amapiano" ? { tempo: 4.0, sway: 0.55, hipZ: 0.14, bounce: 0.07, low: true, spin: false, knee: 0.6, nod: 0.12, lean: 0.12 }
          : sty === "hiphop" ? { tempo: 5.6, sway: 0.34, hipZ: 0.1, bounce: 0.15, low: false, spin: false, knee: 0.55, nod: 0.24, lean: 0 }
          : sty === "pop" ? { tempo: 6.6, sway: 0.42, hipZ: 0.12, bounce: 0.18, low: false, spin: true, knee: 0.5, nod: 0.16, lean: 0 }
          : { tempo: 5.0, sway: 0.5, hipZ: 0.17, bounce: 0.1, low: true, spin: false, knee: 0.5, nod: 0.18, lean: 0 }; // afro
        const beat = t * P.tempo, cyc = t % 8;

        r.rotation.z = Math.sin(beat * 0.5) * P.hipZ;
        r.position.x = lerp(r.position.x, Math.sin(beat * 0.25) * P.sway, 0.1);
        r.position.y = BASE_Y + Math.abs(Math.sin(beat)) * P.bounce;
        if (P.spin && cyc > 6.3) r.rotation.y += delta * 3.4;
        else lp(r.rotation, "y", 0, 0.08);

        const raise = sty === "pop" ? cyc > 3.4 && cyc < 4.8 : sty === "hiphop" ? cyc > 5.6 && cyc < 6.4 : false;
        if (raise) {
          A.rotation.x = -2.5; B.rotation.x = -2.5; A.rotation.z = 0.5; B.rotation.z = -0.5;
          EA.rotation.x = -0.2; EB.rotation.x = -0.2;
        } else if (P.low) {
          // afro / amapiano: relaxed arms out to the sides, swaying
          A.rotation.x = 0.2 + Math.sin(beat) * 0.25; B.rotation.x = 0.2 - Math.sin(beat) * 0.25;
          A.rotation.z = 0.55 + Math.sin(beat * 0.5) * 0.2; B.rotation.z = -0.55 - Math.sin(beat * 0.5) * 0.2;
          EA.rotation.x = -0.5; EB.rotation.x = -0.5;
        } else {
          // hiphop / pop: arm pumps
          A.rotation.x = Math.sin(beat) * -1.0 - 0.2; B.rotation.x = Math.sin(beat + Math.PI) * -1.0 - 0.2;
          A.rotation.z = 0.2 + Math.sin(beat * 0.5) * 0.3; B.rotation.z = -0.2 - Math.sin(beat * 0.5) * 0.3;
          EA.rotation.x = -0.8 - Math.abs(Math.sin(beat)) * 0.4; EB.rotation.x = -0.8 - Math.abs(Math.cos(beat)) * 0.4;
        }

        const hipAmp = sty === "hiphop" ? 0.4 : 0.3;
        HA.rotation.x = Math.sin(beat) * hipAmp; HB.rotation.x = Math.sin(beat + Math.PI) * hipAmp;
        KA.rotation.x = Math.abs(Math.sin(beat)) * P.knee; KB.rotation.x = Math.abs(Math.cos(beat)) * P.knee;
        hd.rotation.x = Math.sin(beat) * P.nod; hd.rotation.y = Math.sin(beat * 0.5) * 0.18; hd.rotation.z = Math.sin(beat * 0.5) * 0.08;
        lp(ts.rotation, "x", P.lean, 0.1);
      }

      // speaker placement
      if (phase === "carryin" || phase === "storeoff" || phase === "pickup") {
        sVis = true; sx = r.position.x; sy = 0.5; sz = 1.05; sRotY = r.rotation.y;
      } else if (phase === "drop" || phase === "dance") {
        sVis = true; sx = 1.7; sy = -1.42; sz = 0.7; sRotY = 0;
      }
    }

    // apply speaker transform
    sp.position.x = lerp(sp.position.x, sx, 0.12);
    sp.position.y = lerp(sp.position.y, sVis ? sy : sp.position.y, 0.12);
    sp.position.z = lerp(sp.position.z, sz, 0.12);
    sp.rotation.y = lerp(sp.rotation.y, sRotY, 0.12);
    const targetScale = sVis ? 1 : 0;
    const s = lerp(sp.scale.x, targetScale, 0.15);
    sp.scale.setScalar(s);
  });

  return (
    <>
      <group ref={root} position={[0, BASE_Y, 0]}>
        {/* pelvis */}
        <RoundedBox args={[0.72, 0.42, 0.5]} radius={0.12} smoothness={4} position={[0, 0.06, 0]} material={dark} />

        {/* torso (leans at waist) */}
        <group ref={torso} position={[0, 0.1, 0]}>
          <RoundedBox args={[0.92, 1.04, 0.56]} radius={0.18} smoothness={5} position={[0, 0.66, 0]} material={panel} />
          {/* chest core */}
          <mesh position={[0, 0.78, 0.3]} material={glow}>
            <torusGeometry args={[0.14, 0.035, 16, 40]} />
          </mesh>
          <mesh position={[0, 0.78, 0.29]}>
            <circleGeometry args={[0.11, 32]} />
            <meshBasicMaterial color="#0a7ea4" transparent opacity={0.7} toneMapped={false} />
          </mesh>
          {/* neck */}
          <mesh position={[0, 1.24, 0]} material={dark}>
            <cylinderGeometry args={[0.13, 0.16, 0.18, 20]} />
          </mesh>

          {/* head */}
          <group ref={head} position={[0, 1.6, 0]}>
            <RoundedBox args={[0.74, 0.74, 0.7]} radius={0.22} smoothness={6} material={panel} />
            <RoundedBox args={[0.58, 0.6, 0.2]} radius={0.16} smoothness={6} position={[0, 0, 0.34]} material={dark} />
            <mesh position={[-0.15, 0.04, 0.45]} rotation={[0, 0, Math.PI / 2]} material={glow}>
              <capsuleGeometry args={[0.035, 0.12, 6, 12]} />
            </mesh>
            <mesh position={[0.15, 0.04, 0.45]} rotation={[0, 0, Math.PI / 2]} material={glow}>
              <capsuleGeometry args={[0.035, 0.12, 6, 12]} />
            </mesh>
            <mesh position={[-0.4, 0.05, 0]} rotation={[0, 0, Math.PI / 2]} material={dark}>
              <cylinderGeometry args={[0.1, 0.1, 0.1, 20]} />
            </mesh>
            <mesh position={[0.4, 0.05, 0]} rotation={[0, 0, Math.PI / 2]} material={dark}>
              <cylinderGeometry args={[0.1, 0.1, 0.1, 20]} />
            </mesh>
            <pointLight position={[0, 0.05, 0.6]} intensity={4} distance={2.4} color="#28d7fb" />
          </group>

          {/* arms */}
          <group ref={shA} position={[0.58, 1.04, 0]}>
            <mesh position={[0, -0.05, 0]} material={dark}><sphereGeometry args={[0.16, 20, 20]} /></mesh>
            <RoundedBox args={[0.2, 0.62, 0.2]} radius={0.08} smoothness={4} position={[0, -0.36, 0]} material={panel} />
            <group ref={elA} position={[0, -0.66, 0]}>
              <RoundedBox args={[0.17, 0.56, 0.17]} radius={0.07} smoothness={4} position={[0, -0.28, 0]} material={dark} />
              <RoundedBox args={[0.2, 0.22, 0.12]} radius={0.05} smoothness={4} position={[0, -0.6, 0.02]} material={panel} />
            </group>
          </group>
          <group ref={shB} position={[-0.58, 1.04, 0]}>
            <mesh position={[0, -0.05, 0]} material={dark}><sphereGeometry args={[0.16, 20, 20]} /></mesh>
            <RoundedBox args={[0.2, 0.62, 0.2]} radius={0.08} smoothness={4} position={[0, -0.36, 0]} material={panel} />
            <group ref={elB} position={[0, -0.66, 0]}>
              <RoundedBox args={[0.17, 0.56, 0.17]} radius={0.07} smoothness={4} position={[0, -0.28, 0]} material={dark} />
              <RoundedBox args={[0.2, 0.22, 0.12]} radius={0.05} smoothness={4} position={[0, -0.6, 0.02]} material={panel} />
            </group>
          </group>
        </group>

        {/* legs */}
        <group ref={hipA} position={[0.24, 0, 0]}>
          <mesh material={dark}><sphereGeometry args={[0.17, 20, 20]} /></mesh>
          <RoundedBox args={[0.24, 0.74, 0.26]} radius={0.1} smoothness={4} position={[0, -0.42, 0]} material={panel} />
          <group ref={knA} position={[0, -0.8, 0]}>
            <RoundedBox args={[0.2, 0.68, 0.22]} radius={0.08} smoothness={4} position={[0, -0.36, 0]} material={dark} />
            <RoundedBox args={[0.26, 0.16, 0.44]} radius={0.06} smoothness={4} position={[0, -0.72, 0.1]} material={panel} />
          </group>
        </group>
        <group ref={hipB} position={[-0.24, 0, 0]}>
          <mesh material={dark}><sphereGeometry args={[0.17, 20, 20]} /></mesh>
          <RoundedBox args={[0.24, 0.74, 0.26]} radius={0.1} smoothness={4} position={[0, -0.42, 0]} material={panel} />
          <group ref={knB} position={[0, -0.8, 0]}>
            <RoundedBox args={[0.2, 0.68, 0.22]} radius={0.08} smoothness={4} position={[0, -0.36, 0]} material={dark} />
            <RoundedBox args={[0.26, 0.16, 0.44]} radius={0.06} smoothness={4} position={[0, -0.72, 0.1]} material={panel} />
          </group>
        </group>
      </group>

      {/* the speaker prop */}
      <group ref={speaker} position={[0, -1.42, 0.7]} scale={0}>
        <RoundedBox args={[0.6, 0.8, 0.5]} radius={0.06} smoothness={4} material={dark} />
        <mesh position={[0, 0.16, 0.26]}><circleGeometry args={[0.18, 32]} /><meshStandardMaterial color="#05070b" metalness={0.6} roughness={0.4} /></mesh>
        <mesh position={[0, 0.16, 0.27]} material={glow}><torusGeometry args={[0.16, 0.02, 12, 40]} /></mesh>
        <mesh position={[0, -0.18, 0.26]}><circleGeometry args={[0.12, 32]} /><meshStandardMaterial color="#05070b" metalness={0.6} roughness={0.4} /></mesh>
        <mesh position={[0, -0.18, 0.27]} material={glow}><torusGeometry args={[0.1, 0.015, 12, 40]} /></mesh>
      </group>
    </>
  );
}

function Dust({ count = 320 }: { count?: number }) {
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
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.03; });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={0.03} color="#28d7fb" transparent opacity={0.7} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
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

export default function RobotScene(props: Props) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.4, 9], fov: 38 }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 8, 6]} angle={0.5} penumbra={1} intensity={140} color="#bfe9ff" />
        <spotLight position={[-7, 3, 4]} angle={0.6} penumbra={1} intensity={80} color="#28d7fb" />
        <Robot {...props} />
        <ContactShadows position={[0, -1.55, 0]} opacity={0.55} scale={14} blur={2.6} far={4.5} color="#000000" />
        <Dust />
        <Studio />
      </Suspense>
    </Canvas>
  );
}
