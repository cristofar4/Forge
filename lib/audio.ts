/**
 * A self contained beat engine. It synthesizes real hip hop, trap, Afrobeats and
 * Amapiano grooves in the browser (kick, snare, hats, 808 bass and melody), so
 * there is always genre matched music with no external files and no copyright
 * concerns. Actual commercial recordings cannot be embedded for legal reasons.
 */

export type DanceStyle = "afro" | "amapiano" | "hiphop" | "trap";

export type Song = {
  id: string;
  name: string;
  region: "Nigeria" | "United States";
  style: DanceStyle;
  vibe: string;
};

export const SONGS: Song[] = [
  { id: "boombap", name: "Boom Bap", region: "United States", style: "hiphop", vibe: "Classic head nod hip hop" },
  { id: "all-my-life", name: "All My Life", region: "United States", style: "hiphop", vibe: "Soulful rap anthem" },
  { id: "trap", name: "Trap Mode", region: "United States", style: "trap", vibe: "808s and rolling hats" },
  { id: "westcoast", name: "West Coast", region: "United States", style: "hiphop", vibe: "G funk bounce" },
  { id: "naija", name: "Naija Hip Hop", region: "Nigeria", style: "afro", vibe: "Afro rap energy" },
  { id: "afrobeats", name: "Afrobeats", region: "Nigeria", style: "afro", vibe: "Lagos street groove" },
  { id: "amapiano", name: "Amapiano", region: "Nigeria", style: "amapiano", vibe: "Deep log drum" },
];

export const songById = (id: string) => SONGS.find((s) => s.id === id);

type Pattern = {
  bpm: number; swing: number; bassWave: OscillatorType; leadWave: OscillatorType;
  bassRoot: number; leadRoot: number;
  kick: number[]; snare: number[]; hat: number[]; bass: (number | null)[]; lead: (number | null)[];
};

const PATTERNS: Record<DanceStyle, Pattern> = {
  hiphop: {
    bpm: 90, swing: 0.16, bassWave: "sine", leadWave: "triangle", bassRoot: 55, leadRoot: 220,
    kick:  [1,0,0,0, 0,0,1,0, 0,0,1,0, 0,0,0,0],
    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
    hat:   [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,2,0],
    bass:  [0,null,null,null, null,null,7,null, null,null,5,null, 3,null,null,null],
    lead:  [0,null,null,7, null,null,null,null, 12,null,null,7, null,null,5,null],
  },
  trap: {
    bpm: 140, swing: 0, bassWave: "sine", leadWave: "square", bassRoot: 55, leadRoot: 220,
    kick:  [1,0,0,0, 0,0,0,1, 0,0,1,0, 0,0,0,0],
    snare: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
    hat:   [1,1,1,1, 1,1,2,1, 1,1,1,2, 1,1,1,1],
    bass:  [0,null,null,null, null,null,null,null, 3,null,null,null, 5,null,null,3],
    lead:  [0,null,null,null, null,null,3,null, null,null,null,null, null,null,null,null],
  },
  afro: {
    bpm: 108, swing: 0.1, bassWave: "triangle", leadWave: "triangle", bassRoot: 55, leadRoot: 220,
    kick:  [1,0,0,1, 0,0,1,0, 1,0,0,1, 0,0,1,0],
    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1],
    hat:   [0,1,0,1, 0,1,0,1, 0,1,0,1, 0,1,0,1],
    bass:  [0,null,3,null, 5,null,3,null, 0,null,5,null, 7,null,5,null],
    lead:  [12,null,null,10, null,9,null,null, 7,null,null,9, null,10,null,null],
  },
  amapiano: {
    bpm: 112, swing: 0.12, bassWave: "sine", leadWave: "triangle", bassRoot: 46, leadRoot: 196,
    kick:  [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
    hat:   [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,2],
    bass:  [0,null,null,7, null,5,null,null, 0,null,null,3, null,7,null,5],
    lead:  [0,null,null,null, 7,null,null,null, 5,null,null,null, 3,null,null,null],
  },
};

export type SongHandle = { stop: () => void };

const freq = (root: number, semi: number) => root * Math.pow(2, semi / 12);

export function playBeat(style: DanceStyle): SongHandle {
  const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctor();
  const master = ctx.createGain();
  master.gain.value = 0.0001;
  master.gain.exponentialRampToValueAtTime(0.34, ctx.currentTime + 0.15);
  master.connect(ctx.destination);

  const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const nd = noise.getChannelData(0);
  for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;

  const p = PATTERNS[style];
  const stepDur = 60 / p.bpm / 4;

  const kick = (t: number) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(48, t + 0.12);
    g.gain.setValueAtTime(1, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
    o.connect(g).connect(master); o.start(t); o.stop(t + 0.34);
  };
  const snare = (t: number) => {
    const s = ctx.createBufferSource(); s.buffer = noise;
    const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 1400;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.7, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    s.connect(hp).connect(g).connect(master); s.start(t); s.stop(t + 0.2);
    const o = ctx.createOscillator(), og = ctx.createGain();
    o.type = "triangle"; o.frequency.setValueAtTime(180, t); og.gain.setValueAtTime(0.35, t); og.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    o.connect(og).connect(master); o.start(t); o.stop(t + 0.13);
  };
  const hat = (t: number) => {
    const s = ctx.createBufferSource(); s.buffer = noise;
    const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 7500;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.4, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
    s.connect(hp).connect(g).connect(master); s.start(t); s.stop(t + 0.06);
  };
  const bass = (t: number, f: number, dur: number) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = p.bassWave; o.frequency.setValueAtTime(f * 1.5, t); o.frequency.exponentialRampToValueAtTime(f, t + 0.06);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.85, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(master); o.start(t); o.stop(t + dur + 0.02);
  };
  const lead = (t: number, f: number) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = p.leadWave; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.22, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    o.connect(g).connect(master); o.start(t); o.stop(t + 0.24);
  };

  let step = 0;
  let next = ctx.currentTime + 0.1;
  let stopped = false;
  let timer = 0;

  const trigger = (i: number, t0: number) => {
    const t = t0 + (i % 2 === 1 ? p.swing * stepDur : 0);
    if (p.kick[i]) kick(t);
    if (p.snare[i]) snare(t);
    if (p.hat[i] === 1) hat(t);
    else if (p.hat[i] === 2) { hat(t); hat(t + stepDur / 2); }
    if (p.bass[i] != null) bass(t, freq(p.bassRoot, p.bass[i] as number), stepDur * 2);
    if (p.lead[i] != null) lead(t, freq(p.leadRoot, p.lead[i] as number));
  };

  const schedule = () => {
    if (stopped) return;
    while (next < ctx.currentTime + 0.25) {
      trigger(step, next);
      next += stepDur;
      step = (step + 1) % 16;
    }
    timer = window.setTimeout(schedule, 25);
  };
  schedule();

  return {
    stop: () => {
      stopped = true;
      window.clearTimeout(timer);
      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
        master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
        setTimeout(() => ctx.close(), 350);
      } catch {
        /* noop */
      }
    },
  };
}

/**
 * Plays a song. If you drop a licensed file at /public/audio/<id>.mp3 it plays
 * the real track. Otherwise it falls back to the genre matched beat engine, so
 * there is always music with no copyright concern.
 */
export function playTrack(songId = "boombap"): SongHandle {
  const style = songById(songId)?.style ?? "hiphop";
  let stopped = false;
  let beat: SongHandle | null = null;
  let audio: HTMLAudioElement | null = null;
  const startBeat = () => {
    if (stopped || beat) return;
    beat = playBeat(style);
  };
  try {
    audio = new Audio(`/audio/${songId}.mp3`);
    audio.loop = true;
    audio.volume = 0.7;
    audio.addEventListener("error", startBeat, { once: true });
    const pr = audio.play();
    if (pr && typeof pr.catch === "function") pr.catch(startBeat);
  } catch {
    startBeat();
  }
  return {
    stop: () => {
      stopped = true;
      if (audio) {
        audio.removeEventListener("error", startBeat);
        try { audio.pause(); } catch { /* noop */ }
        audio = null;
      }
      beat?.stop();
      beat = null;
    },
  };
}
