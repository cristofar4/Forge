/** Self contained Web Audio songs, so the robot can perform with no asset files. */

type Pattern = { steps: number[]; tempo: number; type: OscillatorType; base: number };

// Each song is a loop of semitone offsets over a base frequency, at its own tempo.
const PATTERNS: Record<string, Pattern> = {
  neon: { steps: [0, 7, 12, 7, 15, 12, 19, 12], tempo: 0.2, type: "triangle", base: 220 },
  circuit: { steps: [0, 3, 7, 10, 12, 10, 7, 3], tempo: 0.17, type: "sawtooth", base: 196 },
  gravity: { steps: [0, 0, 12, 0, 10, 0, 7, 5], tempo: 0.24, type: "square", base: 165 },
  voltage: { steps: [0, 12, 7, 12, 15, 19, 15, 12], tempo: 0.15, type: "triangle", base: 247 },
};

export type SongHandle = { stop: () => void };

const midi = (base: number, semi: number) => base * Math.pow(2, semi / 12);

export function playSong(songId = "neon", onBeat?: () => void): SongHandle {
  const p = PATTERNS[songId] ?? PATTERNS.neon;
  const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctor();
  const master = ctx.createGain();
  master.gain.value = 0.0001;
  master.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 0.1);
  master.connect(ctx.destination);

  let stopped = false;
  let timer = 0;
  const bar = p.steps.length * p.tempo;

  const scheduleBar = (start: number) => {
    p.steps.forEach((semi, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = p.type;
      osc.frequency.value = midi(p.base, semi + 12);
      const t0 = start + i * p.tempo;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.8, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + p.tempo * 0.9);
      osc.connect(g);
      g.connect(master);
      osc.start(t0);
      osc.stop(t0 + p.tempo);
    });
    // kick on the down beat
    const kick = ctx.createOscillator();
    const kg = ctx.createGain();
    kick.type = "sine";
    kick.frequency.setValueAtTime(140, start);
    kick.frequency.exponentialRampToValueAtTime(50, start + 0.12);
    kg.gain.setValueAtTime(0.0001, start);
    kg.gain.exponentialRampToValueAtTime(0.6, start + 0.01);
    kg.gain.exponentialRampToValueAtTime(0.0001, start + 0.3);
    kick.connect(kg);
    kg.connect(master);
    kick.start(start);
    kick.stop(start + 0.35);
  };

  const loop = () => {
    if (stopped) return;
    scheduleBar(ctx.currentTime + 0.05);
    onBeat?.();
    timer = window.setTimeout(loop, bar * 1000);
  };
  loop();

  return {
    stop: () => {
      stopped = true;
      window.clearTimeout(timer);
      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
        setTimeout(() => ctx.close(), 300);
      } catch {
        /* noop */
      }
    },
  };
}

export const SONGS: { id: string; name: string; vibe: string }[] = [
  { id: "neon", name: "Neon Pulse", vibe: "Uplifting synth" },
  { id: "circuit", name: "Circuit Funk", vibe: "Groovy bassline" },
  { id: "gravity", name: "Gravity Drop", vibe: "Heavy and slow" },
  { id: "voltage", name: "Voltage", vibe: "Fast and bright" },
];
