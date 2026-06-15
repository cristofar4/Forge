/** A self contained Web Audio melody, so the robot can play a song with no assets. */

type Note = { f: number; t: number; d: number };

// A bright, looping arpeggio in A minor pentatonic.
const A = 220;
const seq: Note[] = [
  { f: A, t: 0.0, d: 0.18 },
  { f: A * 1.2, t: 0.2, d: 0.18 },
  { f: A * 1.5, t: 0.4, d: 0.18 },
  { f: A * 1.8, t: 0.6, d: 0.18 },
  { f: A * 2, t: 0.8, d: 0.22 },
  { f: A * 1.5, t: 1.05, d: 0.18 },
  { f: A * 1.8, t: 1.25, d: 0.18 },
  { f: A * 1.2, t: 1.45, d: 0.3 },
];
const BAR = 1.8;

export type SongHandle = { stop: () => void };

export function playSong(onBeat?: () => void): SongHandle {
  const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctor();
  const master = ctx.createGain();
  master.gain.value = 0.0001;
  master.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.1);
  master.connect(ctx.destination);

  let stopped = false;
  let timer = 0;

  const scheduleBar = (start: number) => {
    for (const n of seq) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = n.f;
      const t0 = start + n.t;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.9, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + n.d);
      osc.connect(g);
      g.connect(master);
      osc.start(t0);
      osc.stop(t0 + n.d + 0.05);
    }
    // soft bass pulse
    const bass = ctx.createOscillator();
    const bg = ctx.createGain();
    bass.type = "sine";
    bass.frequency.value = A / 2;
    bg.gain.setValueAtTime(0.0001, start);
    bg.gain.exponentialRampToValueAtTime(0.35, start + 0.04);
    bg.gain.exponentialRampToValueAtTime(0.0001, start + 0.5);
    bass.connect(bg);
    bg.connect(master);
    bass.start(start);
    bass.stop(start + 0.6);
  };

  const loop = () => {
    if (stopped) return;
    scheduleBar(ctx.currentTime + 0.05);
    onBeat?.();
    timer = window.setTimeout(loop, BAR * 1000);
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
