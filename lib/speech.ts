/** Shared browser speech synthesis helpers, used by Vex and the hero robot. */

export function speak(text: string, opts?: { rate?: number; pitch?: number }) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = opts?.rate ?? 1.02;
    u.pitch = opts?.pitch ?? 1.05;
    const voices = window.speechSynthesis.getVoices();
    const v =
      voices.find((x) => /en[-_]?(US|GB)/i.test(x.lang) && /google|female|samantha|zira|aria/i.test(x.name)) ||
      voices.find((x) => /^en/i.test(x.lang));
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
