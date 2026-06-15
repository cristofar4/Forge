"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Mic, MicOff, Send, Volume2, VolumeX, X } from "lucide-react";
import { respond, welcome, suggestions } from "@/lib/assistant";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "bot"; text: string; link?: { label: string; href: string } };

export function RobotAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [speakOn, setSpeakOn] = useState(true);
  const [voiceSupported, setVoiceSupported] = useState(false);

  const recognitionRef = useRef<any>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Set up speech recognition once
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR) {
      const rec = new SR();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";
      rec.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setListening(false);
        send(text);
      };
      rec.onend = () => setListening(false);
      rec.onerror = () => setListening(false);
      recognitionRef.current = rec;
      setVoiceSupported(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Allow other parts of the site (e.g. the contact page live chat) to open Vex
  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setMessages((m) => (m.length === 0 ? [{ role: "bot", text: welcome }] : m));
    };
    window.addEventListener("forge:open-assistant", handler);
    return () => window.removeEventListener("forge:open-assistant", handler);
  }, []);

  // Autoscroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const speak = (text: string) => {
    if (!speakOn || typeof window === "undefined" || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.02;
      u.pitch = 1.05;
      const voices = window.speechSynthesis.getVoices();
      const v = voices.find((x) => /en[-_]?(US|GB)/i.test(x.lang) && /female|google|samantha|zira/i.test(x.name)) || voices.find((x) => /^en/i.test(x.lang));
      if (v) u.voice = v;
      window.speechSynthesis.speak(u);
    } catch {
      /* speech unavailable */
    }
  };

  const pushBot = (text: string, link?: Msg["link"]) => {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "bot", text, link }]);
      speak(text);
    }, 650);
  };

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    const intent = respond(text);
    pushBot(intent.answer, intent.link);
  };

  const openAssistant = () => {
    setOpen(true);
    if (messages.length === 0) {
      setMessages([{ role: "bot", text: welcome }]);
      // greet aloud after the click gesture
      window.setTimeout(() => speak(welcome), 250);
    }
  };

  const toggleListen = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (listening) {
      rec.stop();
      setListening(false);
    } else {
      try {
        rec.start();
        setListening(true);
      } catch {
        setListening(false);
      }
    }
  };

  const toggleSpeak = () => {
    setSpeakOn((s) => {
      if (s && typeof window !== "undefined") window.speechSynthesis?.cancel();
      return !s;
    });
  };

  return (
    <>
      {/* Floating trigger */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={openAssistant}
            data-cursor
            data-cursor-text="Ask Vex"
            aria-label="Open the Forge assistant"
            className="fixed bottom-5 right-5 z-[75] flex h-16 w-16 items-center justify-center rounded-full glow-cyan"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-cyan/20" />
            <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-b from-steel to-carbon ring-1 ring-cyan/50">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(40,215,251,0.9)] animate-pulse-glow" />
                <span className="h-2.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(40,215,251,0.9)] animate-pulse-glow" />
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 right-5 z-[75] flex h-[32rem] w-[min(94vw,24rem)] flex-col overflow-hidden rounded-2xl glass-strong"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ice/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-b from-steel to-carbon ring-1 ring-cyan/50">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1 rounded-full bg-cyan animate-pulse-glow" />
                    <span className="h-1.5 w-1 rounded-full bg-cyan animate-pulse-glow" />
                  </span>
                </span>
                <div>
                  <p className="text-sm font-medium text-ice">Vex</p>
                  <p className="flex items-center gap-1.5 text-[0.65rem] text-mist">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online · Forge Assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={toggleSpeak} aria-label="Toggle voice" className="grid h-8 w-8 place-items-center rounded-full text-mist hover:text-cyan">
                  {speakOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>
                <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full text-mist hover:text-ice">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-cyan text-void"
                        : "bg-ice/5 text-ice ring-1 ring-ice/10",
                    )}
                  >
                    {m.text}
                    {m.link && (
                      <Link
                        href={m.link.href}
                        onClick={() => setOpen(false)}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-cyan underline-offset-2 hover:underline"
                      >
                        {m.link.label} →
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl bg-ice/5 px-3.5 py-3 ring-1 ring-ice/10">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan" style={{ animationDelay: `${d * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}

              {messages.length <= 1 && !typing && (
                <div className="space-y-2 pt-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full rounded-xl border border-ice/10 bg-ice/[0.03] px-3 py-2 text-left text-xs text-mist transition-colors hover:border-cyan/40 hover:text-ice"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="border-t border-ice/10 p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2"
              >
                {voiceSupported && (
                  <button
                    type="button"
                    onClick={toggleListen}
                    aria-label="Voice input"
                    className={cn(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-full ring-1 transition-colors",
                      listening ? "bg-cyan text-void ring-cyan" : "text-mist ring-ice/15 hover:text-cyan",
                    )}
                  >
                    {listening ? <Mic className="h-4 w-4 animate-pulse" /> : <MicOff className="h-4 w-4" />}
                  </button>
                )}
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={listening ? "Listening…" : "Ask about Forge…"}
                  className="h-10 flex-1 rounded-full bg-ice/5 px-4 text-sm text-ice outline-none ring-1 ring-ice/10 placeholder:text-fade focus:ring-cyan/50"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cyan text-void transition-colors hover:bg-cyan-bright"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
