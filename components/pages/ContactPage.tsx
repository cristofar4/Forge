"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Mail, MessageSquare, Phone } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { offices, site } from "@/lib/site";
import { img } from "@/lib/media";
import { cn } from "@/lib/utils";

const pins: Record<string, { top: string; left: string }> = {
  "San Francisco": { top: "40%", left: "15%" },
  Munich: { top: "33%", left: "49%" },
  Tokyo: { top: "41%", left: "83%" },
  Singapore: { top: "61%", left: "77%" },
};

const support = [
  { icon: Mail, title: "Sales", copy: "Deployments and partnerships", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, title: "Support", copy: "Existing customers, around the clock", value: site.phone, href: site.phoneHref },
  { icon: MessageSquare, title: "Press", copy: "Media and speaking requests", value: site.press, href: `mailto:${site.press}` },
];

export function ContactPage() {
  const [active, setActive] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", company: "", interest: "General", message: "" });
  const [sent, setSent] = useState(false);
  const valid = form.name.trim() && /\S+@\S+\.\S+/.test(form.email);

  const openChat = () => window.dispatchEvent(new CustomEvent("forge:open-assistant"));

  return (
    <>
      <PageHero
        index="08"
        eyebrow="Contact"
        titleLines={["Let us build", "together."]}
        subtitle="Tell us about your environment and what you want to achieve. Our deployment team will design a path from first demo to a fleet at work."
        image={img.security}
      />

      <section className="relative bg-void py-20 md:py-28">
        <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-6">
            <SectionHeading index="01" eyebrow="Get in touch" lines={["Start a", "conversation."]} titleClassName="text-4xl sm:text-5xl" />
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-10 flex flex-col items-center rounded-2xl border border-cyan/30 bg-cyan/[0.04] p-10 text-center"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-cyan text-cyan">
                    <Check className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 font-display text-3xl text-ice">Message sent.</h3>
                  <p className="mt-3 max-w-sm text-sm text-mist">
                    Thank you, {form.name.split(" ")[0] || "there"}. A member of our team will reply within one business day.
                  </p>
                  <button onClick={() => { setSent(false); setForm({ name: "", email: "", company: "", interest: "General", message: "" }); }} className="mt-8 text-xs uppercase tracking-[0.18em] text-mist underline-offset-8 hover:text-cyan hover:underline">
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={(e) => { e.preventDefault(); if (valid) setSent(true); }}
                  className="mt-10 space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Jordan Lee" />
                    <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="jordan@company.com" />
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} placeholder="Company" />
                    <label className="block">
                      <span className="eyebrow">Interest</span>
                      <select
                        value={form.interest}
                        onChange={(e) => setForm({ ...form, interest: e.target.value })}
                        className="mt-3 w-full border-b border-ice/20 bg-transparent pb-2 text-ice outline-none transition-colors focus:border-cyan [&>option]:bg-carbon"
                      >
                        {["General", "Request a demo", "Sales", "Partnership", "Press"].map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="block">
                    <span className="eyebrow">Message</span>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      placeholder="How can we help?"
                      className="mt-3 w-full resize-none border-b border-ice/20 bg-transparent pb-2 text-ice outline-none transition-colors placeholder:text-fade focus:border-cyan"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={!valid}
                    data-cursor
                    data-cursor-text="Send"
                    className={cn(
                      "flex items-center gap-3 rounded-full px-8 py-4 text-xs uppercase tracking-[0.18em] transition-all",
                      valid ? "bg-cyan text-void hover:bg-cyan-bright" : "cursor-not-allowed bg-ice/10 text-fade",
                    )}
                  >
                    Send message <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Map + offices */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl glass">
              <div className="bg-dots absolute inset-0 opacity-60" />
              <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(40,215,251,0.08),transparent)]" />
              {offices.map((o, i) => {
                const pos = pins[o.city];
                const on = i === active;
                return (
                  <button
                    key={o.city}
                    onClick={() => setActive(i)}
                    data-cursor
                    style={{ top: pos.top, left: pos.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    aria-label={o.city}
                  >
                    {on && <span className="absolute inset-0 -m-3 animate-ping rounded-full bg-cyan/30" />}
                    <span className={cn("relative block rounded-full transition-all", on ? "h-4 w-4 bg-cyan shadow-[0_0_16px_rgba(40,215,251,0.9)]" : "h-2.5 w-2.5 bg-cyan/50")} />
                    <span className={cn("absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap font-mono text-[0.6rem] transition-colors", on ? "text-cyan" : "text-fade")}>
                      {o.city}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="mt-5 rounded-2xl glass p-6"
              >
                <div className="flex items-center justify-between">
                  <p className="font-display text-2xl text-ice">{offices[active].city}</p>
                  <span className="eyebrow">{offices[active].role}</span>
                </div>
                <p className="mt-2 text-sm text-mist">{offices[active].address.join(", ")}</p>
                <p className="mt-1 font-mono text-xs text-cyan">{offices[active].coords}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {offices.map((o, i) => (
                <button
                  key={o.city}
                  onClick={() => setActive(i)}
                  data-cursor
                  className={cn(
                    "rounded-xl border px-3 py-2.5 text-left text-xs transition-colors",
                    i === active ? "border-cyan/50 text-cyan" : "border-ice/12 text-mist hover:border-ice/30",
                  )}
                >
                  {o.city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support + live chat */}
      <section className="relative bg-abyss py-24 md:py-32">
        <div className="container-x">
          <SectionHeading index="02" eyebrow="Support" lines={["We are here", "to help."]} />
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {support.map((s) => (
              <a
                key={s.title}
                href={s.href}
                data-cursor
                className="group rounded-2xl glass p-7 transition-colors hover:border-cyan/40"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan/10 text-cyan ring-1 ring-cyan/30">
                  <s.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-lg text-ice">{s.title}</h3>
                <p className="mt-1 text-sm text-mist">{s.copy}</p>
                <p className="mt-3 text-sm text-cyan transition-colors group-hover:text-cyan-bright">{s.value}</p>
              </a>
            ))}

            {/* Live chat */}
            <button
              onClick={openChat}
              data-cursor
              data-cursor-text="Chat"
              className="group rounded-2xl border border-cyan/30 bg-cyan/[0.04] p-7 text-left transition-colors hover:bg-cyan/[0.08]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan/15 text-cyan ring-1 ring-cyan/40">
                <MessageSquare className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-display text-lg text-ice">Live chat</h3>
              <p className="mt-1 text-sm text-mist">Talk to Vex, our assistant, right now</p>
              <p className="mt-3 text-sm text-cyan">Open chat →</p>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full border-b border-ice/20 bg-transparent pb-2 text-ice outline-none transition-colors placeholder:text-fade focus:border-cyan"
      />
    </label>
  );
}
