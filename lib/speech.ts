/** Shared browser speech synthesis helpers. The robot speaks with a male voice. */

let cached: SpeechSynthesisVoice | null = null;

function pickMaleVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  if (cached) return cached;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const male = /male|david|daniel|alex|fred|george|james|guy|arthur|aaron|rishi|oliver|thomas|tom|mark/i;
  const female = /female|samantha|zira|victoria|karen|moira|tessa|fiona|susan|google uk english female/i;
  cached =
    voices.find((v) => /^en/i.test(v.lang) && male.test(v.name)) ||
    voices.find((v) => /^en/i.test(v.lang) && !female.test(v.name)) ||
    voices.find((v) => /^en/i.test(v.lang)) ||
    voices[0];
  return cached;
}

export function speak(text: string, opts?: { rate?: number; pitch?: number }) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = opts?.rate ?? 1.05; // medium pace, the same on mobile and desktop
    u.pitch = opts?.pitch ?? 0.8; // lower pitch reads as a male voice
    const v = pickMaleVoice();
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
  } catch {
    /* speech unavailable */
  }
}

export function stopSpeak() {
  try {
    window.speechSynthesis?.cancel();
  } catch {
    /* noop */
  }
}

// Voices can load asynchronously; refresh the cached pick when they arrive.
if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    cached = null;
    pickMaleVoice();
  };
}
