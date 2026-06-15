/**
 * Self contained Web Audio songs, so the robot can perform with no asset files.
 * Each track carries a region and a dance style so the robot matches its moves
 * to the music. Melodies are original and evoke the genre, they are not the
 * copyrighted recordings.
 */

export type DanceStyle = "afro" | "amapiano" | "hiphop" | "pop";

export type Song = {
  id: string;
  name: string;
  region: "Nigeria" | "United States";
  style: DanceStyle;
  vibe: string;
};

type Pattern = { steps: number[]; tempo: number; type: OscillatorType; base: number };

const PATTERNS: Record<string, Pattern> = {
  // Nigeria
  "afro-calm": { steps: [0, 2, 4, 7, 9, 7, 4, 2], tempo: 0.2, type: "triangle", base: 220 },
  amapiano: { steps: [0, 0, 3, 5, 7, 5, 3, 0], tempo: 0.26, type: "sine", base: 165 },
  "afro-street": { steps: [0, 4, 7, 12, 7, 9, 7, 4], tempo: 0.16, type: "sawtooth", base: 247 },
  // United States
  westcoast: { steps: [0, 3, 5, 7, 10, 7, 5, 3], tempo: 0.22, type: "sawtooth", base: 196 },
  stadium: { steps: [0, 4, 7, 12, 7, 4, 0, 7], tempo: 0.15, type: "triangle", base: 262 },
  nightdrive: { steps: [0, 0, 0, 3, 0, 7, 5, 3], tempo: 0.2, type: "square", base: 175 },
};

export const SONGS: Song[] = [
  { id: "afro-calm", name: "Calm Sway", region: "Nigeria", style: "afro", vibe: "Smooth Afrobeats, the calm mood" },
  { id: "amapiano", name: "Lagos Amapiano", region: "Nigeria", style: "amapiano", vibe: "Deep log drum groove" },
  { id: "afro-street", name: "Naija Bounce", region: "Nigeria", style: "afro", vibe: "Upbeat street Afro pop" },
  { id: "westcoast", name: "West Coast", region: "United States", style: "hiphop", vibe: "Laid back hip hop" },
  { id: "stadium", name: "Stadium Lights", region: "United States", style: "pop", vibe: "Big stadium pop energy" },
  { id: "nightdrive", name: "Night Drive", region: "United States", style: "hiphop", vibe: "Moody trap" },
];

export const songById = (id: string) => SONGS.find((s) => s.id === id);

export type SongHandle = { stop: () => void };

/** Real, royalty free audio tracks. Original commercial recordings cannot be
 * embedded for copyright reasons, so these are real free music tracks. */
const TRACKS: Record<string, string> = {
  "afro-calm": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  amapiano: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  "afro-street": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  westcoast: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  stadium: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  nightdrive: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
};

/** Plays a real audio track. If it cannot load, falls back to the synth engine
 *  so there is always music for the robot to dance to. */
export function playTrack(songId = "afro-calm"): SongHandle {
  const url = TRACKS[songId];
  let fallback: SongHandle | null = null;
  let audio: HTMLAudioElement | null = null;
  const startFallback = () => {
    if (!fallback) fallback = playSong(songId);
  };
  try {
    audio = new Audio(url);
    audio.loop = true;
    audio.volume = 0.55;
    audio.addEventListener("error", startFallback);
    const p = audio.play();
    if (p && typeof p.catch === "function") p.catch(startFallback);
  } catch {
    startFallback();
  }
  return {
    stop: () => {
      try {
        audio?.pause();
        if (audio) audio.src = "";
      } catch {
        /* noop */
      }
      fallback?.stop();
    },
  };
}

const midi = (base: number, semi: number) => base * Math.pow(2, semi / 12);

export function playSong(songId = "afro-calm", onBeat?: () => void): SongHandle {
  const p = PATTERNS[songId] ?? PATTERNS["afro-calm"];
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
    // kick on each down beat
    [0, p.steps.length / 2].forEach((i) => {
      const kick = ctx.createOscillator();
      const kg = ctx.createGain();
      const t0 = start + i * p.tempo;
      kick.type = "sine";
      kick.frequency.setValueAtTime(150, t0);
      kick.frequency.exponentialRampToValueAtTime(50, t0 + 0.12);
      kg.gain.setValueAtTime(0.0001, t0);
      kg.gain.exponentialRampToValueAtTime(0.7, t0 + 0.01);
      kg.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.3);
      kick.connect(kg);
      kg.connect(master);
      kick.start(t0);
      kick.stop(t0 + 0.35);
    });
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
