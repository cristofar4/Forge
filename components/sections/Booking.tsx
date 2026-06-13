"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { SmartImage } from "@/components/media/SmartImage";
import { services, masters } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const STEPS = ["Service", "Master", "Schedule", "Details"];
const TIMES = ["09:30", "11:00", "13:30", "15:00", "16:30", "18:00"];

type Form = {
  service: number | null;
  master: string | null;
  date: string | null;
  time: string | null;
  name: string;
  email: string;
  phone: string;
};

export function Booking() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<Form>({
    service: 0,
    master: null,
    date: null,
    time: null,
    name: "",
    email: "",
    phone: "",
  });
  const [days, setDays] = useState<{ key: string; wd: string; d: string }[]>([]);

  useEffect(() => {
    const out: { key: string; wd: string; d: string }[] = [];
    const base = new Date();
    for (let i = 1; i <= 6; i++) {
      const dt = new Date(base);
      dt.setDate(base.getDate() + i);
      out.push({
        key: dt.toISOString().slice(0, 10),
        wd: dt.toLocaleDateString("en-GB", { weekday: "short" }),
        d: dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
      });
    }
    setDays(out);
  }, []);

  const svc = form.service !== null ? services[form.service] : null;

  const canContinue = useMemo(() => {
    if (step === 0) return form.service !== null;
    if (step === 1) return form.master !== null;
    if (step === 2) return !!form.date && !!form.time;
    if (step === 3) return form.name.trim() && /\S+@\S+\.\S+/.test(form.email);
    return false;
  }, [step, form]);

  const next = () => (step < 3 ? setStep(step + 1) : setDone(true));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const set = (patch: Partial<Form>) => setForm((f) => ({ ...f, ...patch }));

  return (
    <section id="booking" className="relative overflow-clip bg-obsidian py-28 md:py-40">
      <div className="container-luxe">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Reserve"
            lines={["The booking", "experience."]}
          />
          <p className="max-w-xs text-sm leading-relaxed text-bone-dim">
            Four considered steps. No accounts, no friction — just the chair,
            reserved for you.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Flow */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {done ? (
                <Confirmation form={form} svc={svc} onReset={() => { setDone(false); setStep(0); }} />
              ) : (
                <motion.div
                  key="flow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Step rail */}
                  <div className="flex items-center gap-2">
                    {STEPS.map((label, i) => (
                      <div key={label} className="flex flex-1 items-center gap-2">
                        <button
                          onClick={() => i < step && setStep(i)}
                          className="flex items-center gap-2"
                          data-cursor
                        >
                          <span
                            className={cn(
                              "grid h-7 w-7 place-items-center rounded-full border text-xs transition-colors",
                              i === step
                                ? "border-gold bg-gold text-obsidian"
                                : i < step
                                  ? "border-gold/60 text-gold"
                                  : "border-bone/20 text-bone-dim",
                            )}
                          >
                            {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                          </span>
                          <span
                            className={cn(
                              "hidden text-xs uppercase tracking-[0.16em] sm:block",
                              i === step ? "text-bone" : "text-bone-dim",
                            )}
                          >
                            {label}
                          </span>
                        </button>
                        {i < STEPS.length - 1 && (
                          <span className="h-px flex-1 bg-bone/15" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Step content */}
                  <div className="mt-10 min-h-[320px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.45, ease: EASE }}
                      >
                        {step === 0 && (
                          <div className="space-y-3">
                            {services.map((s, i) => (
                              <Selectable
                                key={s.index}
                                active={form.service === i}
                                onClick={() => set({ service: i })}
                              >
                                <div>
                                  <p className="font-display text-xl text-bone">{s.title}</p>
                                  <p className="text-xs text-bone-dim">{s.duration} · {s.tagline}</p>
                                </div>
                                <span className="font-display text-xl text-gold">{s.price}</span>
                              </Selectable>
                            ))}
                          </div>
                        )}

                        {step === 1 && (
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <Selectable
                              active={form.master === "Any master"}
                              onClick={() => set({ master: "Any master" })}
                              className="col-span-2 sm:col-span-3"
                            >
                              <div>
                                <p className="font-display text-lg text-bone">No preference</p>
                                <p className="text-xs text-bone-dim">We&apos;ll pair you with the right hands</p>
                              </div>
                            </Selectable>
                            {masters.map((m) => (
                              <button
                                key={m.name}
                                data-cursor
                                onClick={() => set({ master: m.name })}
                                className={cn(
                                  "overflow-hidden rounded-[2px] border text-left transition-colors",
                                  form.master === m.name
                                    ? "border-gold"
                                    : "border-bone/12 hover:border-bone/30",
                                )}
                              >
                                <div className="relative aspect-square">
                                  <SmartImage src={m.image} alt={m.name} reveal={false} className="h-full w-full" position="center 25%" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent" />
                                </div>
                                <div className="p-3">
                                  <p className="font-display text-base text-bone">{m.name}</p>
                                  <p className="text-[0.65rem] uppercase tracking-[0.12em] text-gold">{m.specialty}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {step === 2 && (
                          <div className="space-y-8">
                            <div>
                              <p className="eyebrow mb-4">Select a day</p>
                              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                                {days.map((d) => (
                                  <Chip key={d.key} active={form.date === d.key} onClick={() => set({ date: d.key })}>
                                    <span className="block text-[0.65rem] uppercase tracking-widest text-current/70">{d.wd}</span>
                                    <span className="mt-1 block font-display text-base">{d.d}</span>
                                  </Chip>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="eyebrow mb-4">Select a time</p>
                              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                                {TIMES.map((t) => (
                                  <Chip key={t} active={form.time === t} onClick={() => set({ time: t })}>
                                    <span className="font-display text-base">{t}</span>
                                  </Chip>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 3 && (
                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <Field label="Full name" value={form.name} onChange={(v) => set({ name: v })} placeholder="James Sinclair" />
                            <Field label="Email" value={form.email} onChange={(v) => set({ email: v })} placeholder="james@email.com" type="email" />
                            <Field label="Phone" value={form.phone} onChange={(v) => set({ phone: v })} placeholder="+44 …" className="sm:col-span-2" />
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Nav */}
                  <div className="mt-10 flex items-center justify-between">
                    <button
                      onClick={back}
                      disabled={step === 0}
                      data-cursor
                      className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-bone-dim transition-colors enabled:hover:text-bone disabled:opacity-30"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                    <button
                      onClick={next}
                      disabled={!canContinue}
                      data-cursor
                      data-cursor-text={step === 3 ? "Confirm" : "Next"}
                      className={cn(
                        "group flex items-center gap-3 rounded-full px-7 py-3.5 text-xs uppercase tracking-[0.18em] transition-all",
                        canContinue
                          ? "bg-gold text-obsidian hover:bg-gold-light"
                          : "cursor-not-allowed bg-bone/10 text-bone-dim",
                      )}
                    >
                      {step === 3 ? "Confirm reservation" : "Continue"}
                      <ArrowRight className="h-4 w-4 transition-transform group-enabled:group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 overflow-hidden rounded-[2px] border border-bone/10 bg-obsidian-soft">
              <div className="relative h-40">
                <SmartImage src={svc?.image ?? services[0].image} alt="" reveal={false} className="h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-soft to-transparent" />
                <span className="absolute bottom-4 left-6 eyebrow text-gold">Your reservation</span>
              </div>
              <dl className="space-y-4 p-6">
                <Row k="Service" v={svc?.title ?? "—"} />
                <Row k="Master" v={form.master ?? "—"} />
                <Row k="When" v={form.date ? `${days.find((d) => d.key === form.date)?.d ?? form.date} · ${form.time ?? ""}` : "—"} />
                <div className="hairline my-2" />
                <div className="flex items-end justify-between">
                  <dt className="eyebrow">Total</dt>
                  <dd className="font-display text-3xl text-gold">{svc?.price ?? "—"}</dd>
                </div>
                <p className="text-[0.7rem] leading-relaxed text-bone-dim">
                  No payment today. A card is taken on arrival; cancellations are
                  free up to 24 hours before your appointment.
                </p>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- small components ---------------------------- */
function Selectable({
  active,
  onClick,
  children,
  className,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      data-cursor
      className={cn(
        "flex w-full items-center justify-between rounded-[2px] border px-5 py-4 text-left transition-colors",
        active ? "border-gold bg-gold/5" : "border-bone/12 hover:border-bone/30",
        className,
      )}
    >
      {children}
    </button>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      data-cursor
      className={cn(
        "rounded-[2px] border px-3 py-3 text-center transition-colors",
        active
          ? "border-gold bg-gold text-obsidian"
          : "border-bone/12 text-bone hover:border-bone/30",
      )}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="eyebrow">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full border-b border-bone/20 bg-transparent pb-2 text-bone outline-none transition-colors placeholder:text-bone-dim/50 focus:border-gold"
      />
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-xs uppercase tracking-[0.14em] text-bone-dim">{k}</dt>
      <dd className="font-serif text-base text-bone">{v}</dd>
    </div>
  );
}

function Confirmation({
  form,
  svc,
  onReset,
}: {
  form: Form;
  svc: (typeof services)[number] | null;
  onReset: () => void;
}) {
  return (
    <motion.div
      key="done"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex min-h-[460px] flex-col items-center justify-center rounded-[2px] border border-gold/30 bg-gold/[0.03] p-10 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 14 }}
        className="grid h-20 w-20 place-items-center rounded-full border border-gold"
      >
        <Check className="h-9 w-9 text-gold" strokeWidth={1.5} />
      </motion.div>
      <h3 className="mt-8 font-display text-4xl text-bone">Reserved.</h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone-soft">
        Thank you, {form.name.split(" ")[0] || "sir"}. Your {svc?.title} is held.
        A confirmation is on its way to{" "}
        <span className="text-gold">{form.email}</span>.
      </p>
      <button
        onClick={onReset}
        data-cursor
        className="mt-8 text-xs uppercase tracking-[0.2em] text-bone-dim underline-offset-8 hover:text-gold hover:underline"
      >
        Make another reservation
      </button>
    </motion.div>
  );
}
