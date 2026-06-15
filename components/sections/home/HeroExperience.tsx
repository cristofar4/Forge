"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useMotionValue, type Variants } from "framer-motion";
import {
  ArrowDown, Bot, BookOpen, ChevronRight, Cpu, Disc3, Globe, Hand, Lock, MapPin,
  MonitorSmartphone, Music, Play, RotateCcw, ScanLine, Square, Volleyball, Wand2, Wifi,
} from "lucide-react";
import type { RobotMode, DancePhase } from "@/components/three/RobotScene";
import { GlowButton } from "@/components/interactive/GlowButton";
import { SmartImage } from "@/components/media/SmartImage";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { speak, stopSpeak } from "@/lib/speech";
import { gatherClientInfo, getPublicIP, type InfoRow } from "@/lib/clientInfo";
import { playSong, SONGS, type SongHandle } from "@/lib/audio";
import { img } from "@/lib/media";
import { cn } from "@/lib/utils";

const RobotScene = dynamic(() => import("@/components/three/RobotScene"), { ssr: false, loading: () => null });

const EASE = [0.16, 1, 0.3, 1] as const;

const stories = [
  "We were not built to replace you. We were built to stand beside you, to lift what is heavy and reach what is far.",
  "My first memory is a calibration grid. A thousand tiny corrections, until I could pour a glass of water without spilling a drop.",
  "Why did we become robots? Because someone believed a machine could be gentle, and we are still proving them right every day.",
  "Every night the fleet dreams in simulation, rehearsing a million tomorrows so the real one arrives without a single mistake.",
];
const magicLines = [
  "Think of a number between one and ten. It was seven. With machines, it is always seven.",
  "Abracadabra. I just rendered ten thousand futures and chose the brightest one for you.",
  "Watch closely. Now you see entropy. Now you do not.",
];

const lineUp: Variants = {
  hidden: { y: "120%" },
  visible: (i: number) => ({ y: "0%", transition: { duration: 1.1, ease: EASE, delay: 0.3 + i * 0.12 } }),
};
const fade: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: 0.6 + i * 0.12 } }),
};

const scanIcons: Record<string, typeof Wifi> = {
  browser: MonitorSmartphone, os: Cpu, device: MonitorSmartphone, display: Square,
  location: MapPin, language: Globe, cores: Cpu, memory: Cpu, network: Wifi, status: Wifi,
};

export function HeroExperience() {
  const { stop, start } = useSmoothScroll();
  const [reduced, setReduced] = useState(false);
  const [mode, setMode] = useState<RobotMode>("idle");
  const [phase, setPhase] = useState<DancePhase>("none");
  const [song, setSong] = useState<string | null>(null);
  const [released, setReleased] = useState(false);
  const [bubble, setBubble] = useState("");
  const [storyIdx, setStoryIdx] = useState(0);
  const [magicIdx, setMagicIdx] = useState(0);
  const [magicKey, setMagicKey] = useState(0);
  const [scan, setScan] = useState<InfoRow[]>([]);
  const [ip, setIp] = useState("Locating");
  const [hits, setHits] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bx = useMotionValue(0);
  const by = useMotionValue(0);

  const songRef = useRef<SongHandle | null>(null);
  const danceTimers = useRef<number[]>([]);
  const robotBox = useRef<HTMLDivElement>(null);
  const ballEl = useRef<HTMLButtonElement>(null);
  const ballState = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const modeRef = useRef<RobotMode>("idle");
  const releasedRef = useRef(false);
  modeRef.current = mode;
  releasedRef.current = released;

  const staged = mode === "dance" && phase !== "none";

  const clearTimers = () => {
    danceTimers.current.forEach((t) => window.clearTimeout(t));
    danceTimers.current = [];
  };
  const stopAll = useCallback(() => {
    songRef.current?.stop();
    songRef.current = null;
    stopSpeak();
    clearTimers();
  }, []);

  useEffect(() => () => stopAll(), [stopAll]);

  // reduced motion + cursor tracking
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const gate = useCallback(() => {
    if (releasedRef.current || modeRef.current !== "idle") return;
    stop();
    setMode("gate");
    setBubble("Wait! Hold on a second.");
    speak("Wait! Hold on a second.", { pitch: 1.2 });
    window.setTimeout(() => {
      setBubble("Please, before you scroll, what would you like me to do for you?");
      speak("Please, before you scroll. What would you like me to do for you?");
    }, 1300);
  }, [stop]);

  const release = useCallback(() => {
    stopAll();
    setPhase("none");
    setSong(null);
    setMode("idle");
    setBubble("");
    setReleased(true);
    start();
  }, [start, stopAll]);

  // scroll guard
  useEffect(() => {
    if (reduced) return;
    const blocked = () => !releasedRef.current && modeRef.current === "idle" && window.scrollY < 60;
    const onWheel = (e: WheelEvent) => { if (e.deltaY > 0 && blocked()) { e.preventDefault(); gate(); } };
    const onTouch = (e: TouchEvent) => { if (blocked()) { e.preventDefault(); gate(); } };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modeRef.current !== "idle") { release(); return; }
      if (["ArrowDown", "PageDown", " ", "Spacebar"].includes(e.key) && blocked()) { e.preventDefault(); gate(); }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchmove", onTouch, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("keydown", onKey);
    };
  }, [reduced, gate, release]);

  // actions
  const backToMenu = () => { stopAll(); setPhase("none"); setSong(null); setMode("gate"); setBubble("What else can I do for you?"); };
  const openDance = () => { stopAll(); setMode("dance"); setPhase("none"); setSong(null); setBubble("Pick a track and I will take the stage."); speak("Pick a track, and I will take the stage."); };
  const doStory = () => {
    stopAll(); setMode("story"); const next = (storyIdx + 1) % stories.length; setStoryIdx(next);
    setBubble("Gather round. Here is one."); speak(stories[next]);
  };
  const doSong = () => { stopAll(); setMode("song"); setBubble("A little tune, composed in real time."); songRef.current = playSong("neon"); };
  const doScan = () => {
    stopAll(); setMode("scan"); setScan(gatherClientInfo()); setIp("Locating");
    setBubble("Scanning your connection. Everything stays secure with me.");
    speak("Scanning your connection. Do not worry, everything stays secure with me.");
    getPublicIP().then(setIp);
  };
  const doMagic = () => {
    stopAll(); setMode("magic"); const next = (magicIdx + 1) % magicLines.length; setMagicIdx(next);
    setMagicKey((k) => k + 1); setBubble("Abracadabra!"); speak(magicLines[next], { pitch: 1.1 });
  };
  const doBall = () => { stopAll(); setMode("ball"); setHits(0); setBubble("Keep your eye on the ball. So will I."); };

  // staged dance performance
  const performSong = (id: string) => {
    clearTimers();
    setSong(id);
    setBubble("");
    setPhase("walkoff");
    const push = (fn: () => void, ms: number) => danceTimers.current.push(window.setTimeout(fn, ms));
    push(() => setPhase("carryin"), 1700);
    push(() => { setPhase("drop"); songRef.current = playSong(id); }, 3700);
    push(() => setPhase("dance"), 4900);
    push(() => { setPhase("pickup"); songRef.current?.stop(); songRef.current = null; }, 18000);
    push(() => setPhase("storeoff"), 19200);
    push(() => setPhase("return"), 20900);
    push(() => { setPhase("none"); setSong(null); setMode("gate"); setBubble("That was a blast. What else?"); }, 22600);
  };
  const stopShow = () => {
    clearTimers();
    songRef.current?.stop();
    songRef.current = null;
    setPhase("return");
    danceTimers.current.push(window.setTimeout(() => { setPhase("none"); setSong(null); setMode("gate"); setBubble("And, scene. What else can I do?"); }, 1700));
  };

  // ball physics
  useEffect(() => {
    if (mode !== "ball" || reduced) return;
    const box = robotBox.current; const el = ballEl.current;
    if (!box || !el) return;
    const R = 24; const s = ballState.current;
    const init = box.getBoundingClientRect();
    s.x = init.width / 2; s.y = init.height * 0.28; s.vx = (Math.random() * 2 - 1) * 4; s.vy = 0;
    let raf = 0;
    const tick = () => {
      const r = box.getBoundingClientRect();
      s.vy += 0.55; s.x += s.vx; s.y += s.vy;
      if (s.x < R) { s.x = R; s.vx = Math.abs(s.vx) * 0.86; }
      if (s.x > r.width - R) { s.x = r.width - R; s.vx = -Math.abs(s.vx) * 0.86; }
      if (s.y > r.height - R) { s.y = r.height - R; s.vy = -Math.abs(s.vy) * 0.84; s.vx *= 0.98; if (Math.abs(s.vy) < 2) s.vy = -9 - Math.random() * 4; }
      if (s.y < R) { s.y = R; s.vy = Math.abs(s.vy) * 0.8; }
      el.style.transform = `translate(${s.x - R}px, ${s.y - R}px)`;
      bx.set((s.x / r.width) * 2 - 1);
      by.set(-((s.y / r.height) * 2 - 1));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode, reduced, bx, by]);

  const bumpBall = () => {
    const s = ballState.current;
    s.vy = -16 - Math.random() * 4; s.vx += (Math.random() * 2 - 1) * 6;
    setHits((h) => h + 1);
  };

  const actions = [
    { id: "dance", label: "Dance for me", Icon: Disc3, fn: openDance },
    { id: "story", label: "Tell a robot story", Icon: BookOpen, fn: doStory },
    { id: "song", label: "Play a song", Icon: Music, fn: doSong },
    { id: "scan", label: "Scan my device", Icon: ScanLine, fn: doScan },
    { id: "magic", label: "Do some magic", Icon: Wand2, fn: doMagic },
    { id: "ball", label: "Play ball", Icon: Volleyball, fn: doBall },
  ];

  const songName = SONGS.find((s) => s.id === song)?.name ?? "";
  const danceStyle = SONGS.find((s) => s.id === song)?.style ?? "";
  const regions = ["Nigeria", "United States"] as const;

  return (
    <section className="relative min-h-screen overflow-hidden pt-28 md:pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(100%_80%_at_70%_-5%,transparent_0%,rgba(7,10,15,0.55)_45%,#050609_92%)]" />
      <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(80%_70%_at_60%_40%,black,transparent)]" />

      <div className={cn("container-x relative grid min-h-[calc(100vh-7rem)] grid-cols-1 items-center gap-8", staged ? "lg:grid-cols-1" : "lg:grid-cols-[1.05fr_0.95fr] lg:gap-16")}>
        {/* LEFT: copy or console (hidden while on stage) */}
        {!staged && (
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              {mode === "idle" ? (
                <motion.div key="copy" exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <motion.p variants={fade} custom={0} initial="hidden" animate="visible" className="eyebrow">Forge Robotics · Founded 2019</motion.p>
                  <h1 className="display mt-5 text-[clamp(2.6rem,7vw,6rem)] leading-[0.92] tracking-tight text-glow">
                    <span className="block overflow-hidden"><motion.span variants={lineUp} custom={0} initial="hidden" animate="visible" className="block text-ice">Machines that</motion.span></span>
                    <span className="block overflow-hidden"><motion.span variants={lineUp} custom={1} initial="hidden" animate="visible" className="block text-energy">move the world.</motion.span></span>
                  </h1>
                  <motion.p variants={fade} custom={1} initial="hidden" animate="visible" className="mt-7 max-w-xl text-base leading-relaxed text-mist md:text-lg">
                    Forge builds intelligent robots for industry, healthcare, logistics and beyond, uniting advanced hardware with a reasoning core that understands the physical world.
                  </motion.p>
                  <motion.div variants={fade} custom={2} initial="hidden" animate="visible" className="mt-9 flex flex-wrap items-center gap-4">
                    <GlowButton href="/robots" cursorText="View">Explore the robots</GlowButton>
                    <GlowButton href="/contact" variant="ghost" cursorText="Demo" withArrow={false}>Book a demo</GlowButton>
                  </motion.div>
                  {!reduced && (
                    <motion.p variants={fade} custom={3} initial="hidden" animate="visible" className="mt-10 flex items-center gap-2 font-mono text-xs text-fade">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" /> Vex is online. Try to scroll and see what happens.
                    </motion.p>
                  )}
                </motion.div>
              ) : (
                <motion.div key="console" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: EASE }} className="fixed inset-x-0 bottom-0 z-40 max-h-[82dvh] overflow-y-auto rounded-t-3xl glass-strong p-5 lg:static lg:inset-auto lg:z-auto lg:max-h-none lg:overflow-visible lg:rounded-3xl lg:p-8">
                  <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ice/20 lg:hidden" />
                  <div className="flex items-center justify-between">
                    <span className="eyebrow flex items-center gap-2"><Bot className="h-4 w-4" /> Vex · Live</span>
                    <button onClick={release} data-cursor className="text-xs uppercase tracking-[0.16em] text-fade hover:text-cyan">Let me scroll →</button>
                  </div>
                  <p className="mt-5 font-display text-xl leading-snug text-ice md:text-2xl">{bubble}</p>

                  {mode === "gate" && (
                    <div className="mt-6 grid grid-cols-2 gap-2.5">
                      {actions.map((a) => (
                        <button key={a.id} onClick={a.fn} data-cursor className="group flex items-center gap-3 rounded-xl border border-ice/12 bg-ice/[0.03] px-4 py-3 text-left transition-colors hover:border-cyan/50 hover:bg-cyan/[0.06]">
                          <a.Icon className="h-4 w-4 shrink-0 text-cyan" strokeWidth={1.6} />
                          <span className="text-sm text-ice">{a.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {mode === "dance" && (
                    <div className="mt-6 space-y-5">
                      {regions.map((region) => (
                        <div key={region}>
                          <p className="eyebrow mb-2.5 flex items-center gap-2">
                            <span className="h-px w-5 bg-cyan/40" /> {region}
                          </p>
                          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                            {SONGS.filter((s) => s.region === region).map((s) => (
                              <button key={s.id} onClick={() => performSong(s.id)} data-cursor className="group flex items-center gap-3 rounded-xl border border-ice/12 bg-ice/[0.03] px-4 py-3 text-left transition-colors hover:border-cyan/50 hover:bg-cyan/[0.06]">
                                <Play className="h-4 w-4 shrink-0 text-cyan" strokeWidth={1.6} />
                                <span><span className="block text-sm text-ice">{s.name}</span><span className="block text-[0.7rem] text-fade">{s.vibe}</span></span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {mode === "story" && <p className="mt-6 font-serif text-lg italic leading-relaxed text-mist">“{stories[storyIdx]}”</p>}

                  {mode === "song" && (
                    <div className="mt-6 flex items-end gap-1.5" aria-hidden>
                      {Array.from({ length: 22 }).map((_, i) => (
                        <span key={i} className="w-1.5 rounded-full bg-gradient-to-t from-cyan-deep to-cyan-bright" style={{ height: `${20 + Math.abs(Math.sin(i * 1.7)) * 44}px`, animation: `pulse-glow ${0.6 + (i % 5) * 0.12}s ease-in-out infinite` }} />
                      ))}
                    </div>
                  )}

                  {mode === "scan" && (
                    <div className="mt-6">
                      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-ice/10 bg-ice/[0.06] sm:grid-cols-2">
                        {scan.map((row) => {
                          const Ic = scanIcons[row.key] ?? Wifi;
                          return (
                            <div key={row.key} className="flex items-center gap-3 bg-carbon/80 px-3.5 py-2.5">
                              <Ic className="h-3.5 w-3.5 shrink-0 text-cyan" strokeWidth={1.6} />
                              <span className="text-[0.7rem] uppercase tracking-[0.1em] text-fade">{row.label}</span>
                              <span className="ml-auto truncate text-sm text-ice">{row.value}</span>
                            </div>
                          );
                        })}
                        <div className="flex items-center gap-3 bg-carbon/80 px-3.5 py-2.5 sm:col-span-2">
                          <Globe className="h-3.5 w-3.5 shrink-0 text-cyan" strokeWidth={1.6} />
                          <span className="text-[0.7rem] uppercase tracking-[0.1em] text-fade">Public IP</span>
                          <span className="ml-auto truncate font-mono text-sm text-ice">{ip}</span>
                        </div>
                      </div>
                      <p className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.05] px-3 py-2 text-xs text-emerald-300">
                        <Lock className="h-3.5 w-3.5" /> Read on your device only. Forge never stores or shares any of this.
                      </p>
                    </div>
                  )}

                  {mode === "magic" && <p className="mt-6 font-serif text-lg italic leading-relaxed text-cyan-bright">{magicLines[magicIdx]}</p>}

                  {mode === "ball" && (
                    <div className="mt-6 flex items-center gap-4">
                      <span className="rounded-xl border border-ice/12 bg-ice/[0.03] px-4 py-3 text-sm text-mist">Bounces kept alive: <span className="font-mono text-cyan">{hits}</span></span>
                      <span className="text-xs text-fade">Click the ball to keep it up.</span>
                    </div>
                  )}

                  {mode !== "gate" && (
                    <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-ice/10 pt-5">
                      <button onClick={backToMenu} data-cursor className="flex items-center gap-2 rounded-full border border-ice/15 px-4 py-2 text-xs uppercase tracking-[0.14em] text-mist hover:border-cyan hover:text-cyan"><RotateCcw className="h-3.5 w-3.5" /> More</button>
                      {mode === "story" && <button onClick={doStory} data-cursor className="rounded-full border border-ice/15 px-4 py-2 text-xs uppercase tracking-[0.14em] text-mist hover:border-cyan hover:text-cyan">Another story</button>}
                      {mode === "magic" && <button onClick={doMagic} data-cursor className="rounded-full border border-ice/15 px-4 py-2 text-xs uppercase tracking-[0.14em] text-mist hover:border-cyan hover:text-cyan">Again</button>}
                      {mode === "song" && <button onClick={() => { songRef.current?.stop(); songRef.current = null; backToMenu(); }} data-cursor className="flex items-center gap-2 rounded-full border border-ice/15 px-4 py-2 text-xs uppercase tracking-[0.14em] text-mist hover:border-cyan hover:text-cyan"><Square className="h-3 w-3" /> Stop</button>}
                      <button onClick={release} data-cursor data-cursor-text="Scroll" className="ml-auto flex items-center gap-2 rounded-full bg-cyan px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-void hover:bg-cyan-bright">Continue <ChevronRight className="h-4 w-4" /></button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* RIGHT (or full stage): the robot */}
        <div ref={robotBox} className={cn("relative", staged ? "order-1 mx-auto h-[70vh] min-h-[420px] w-full max-w-4xl lg:h-[86vh]" : "order-1 h-[44vh] min-h-[320px] lg:order-2 lg:h-[82vh]")}>
          {!reduced ? (
            <RobotScene mx={mx} my={my} bx={bx} by={by} mode={mode} phase={phase} style={danceStyle} />
          ) : (
            <SmartImage src={img.humanoid} alt="Forge humanoid robot" reveal={false} className="h-full w-full opacity-80" />
          )}

          {/* speech bubble (hidden on stage) */}
          <AnimatePresence>
            {bubble && !staged && (
              <motion.div key={bubble} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.97 }} transition={{ duration: 0.35, ease: EASE }} className="absolute left-4 top-6 z-20 max-w-[16rem] rounded-2xl rounded-bl-sm glass-strong px-4 py-3 md:left-8">
                <span className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-cyan"><span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" /> Vex</span>
                <p className="mt-1 text-sm leading-snug text-ice">{bubble}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WAIT hand sign */}
          <AnimatePresence>
            {mode === "gate" && (
              <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2">
                <motion.span animate={{ rotate: [-14, 14, -14] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }} className="grid h-16 w-16 place-items-center rounded-2xl glass-strong text-cyan"><Hand className="h-8 w-8" strokeWidth={1.5} /></motion.span>
                <span className="font-display text-lg font-semibold tracking-[0.2em] text-ice text-glow">WAIT</span>
              </motion.div>
            )}
          </AnimatePresence>

          {mode === "magic" && <MagicBurst key={magicKey} />}

          {mode === "ball" && (
            <button ref={ballEl} onClick={bumpBall} data-cursor data-cursor-text="Bump" aria-label="Bump the ball" className="absolute left-0 top-0 z-20 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-b from-cyan-bright to-cyan-deep shadow-[0_0_24px_rgba(40,215,251,0.8)]">
              <Volleyball className="h-6 w-6 text-void" strokeWidth={1.6} />
            </button>
          )}
        </div>
      </div>

      {/* Stage overlay: now performing + stop */}
      <AnimatePresence>
        {staged && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute inset-x-0 bottom-8 z-30 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 rounded-full glass-strong px-5 py-2.5">
              <Disc3 className="h-4 w-4 animate-spin-slow text-cyan" />
              <span className="text-sm text-ice">Now performing</span>
              <span className="font-mono text-sm text-cyan">{songName}</span>
            </div>
            <button onClick={stopShow} data-cursor data-cursor-text="Stop" className="flex items-center gap-2 rounded-full border border-ice/20 bg-void/60 px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-mist backdrop-blur hover:border-cyan hover:text-cyan">
              <Square className="h-3 w-3" /> Stop the show
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {mode === "idle" && !released && !reduced && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-fade">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce text-cyan" strokeWidth={1.5} />
        </motion.div>
      )}
    </section>
  );
}

function MagicBurst() {
  const bits = Array.from({ length: 22 }).map((_, i) => {
    const a = (i / 22) * Math.PI * 2 + Math.random();
    const dist = 120 + Math.random() * 180;
    return { x: Math.cos(a) * dist, y: Math.sin(a) * dist, d: Math.random() * 0.2 };
  });
  return (
    <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center">
      {bits.map((b, i) => (
        <motion.span key={i} initial={{ opacity: 1, x: 0, y: 0, scale: 0 }} animate={{ opacity: 0, x: b.x, y: b.y, scale: 1 }} transition={{ duration: 1.1, delay: b.d, ease: "easeOut" }} className="absolute h-2 w-2 rounded-full bg-cyan-bright shadow-[0_0_10px_rgba(138,242,255,0.9)]" />
      ))}
    </div>
  );
}
