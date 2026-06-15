"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { ParallaxImage } from "@/components/media/ParallaxImage";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { positions, benefits, culture, hiringSteps } from "@/lib/careers";
import { img } from "@/lib/media";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CareersPage() {
  const { scrollTo } = useSmoothScroll();
  const [role, setRole] = useState("");
  const [form, setForm] = useState({ name: "", email: "", links: "", message: "" });
  const [sent, setSent] = useState(false);

  const valid = form.name.trim() && /\S+@\S+\.\S+/.test(form.email);

  const apply = (title: string) => {
    setRole(title);
    setSent(false);
    scrollTo("#apply", -90);
  };

  return (
    <>
      <PageHero
        index="07"
        eyebrow="Careers"
        titleLines={["Build robots", "that matter."]}
        subtitle="We are a team of roboticists, researchers and builders shipping machines that change how the world works. If that sounds like your kind of hard problem, we should talk."
        image={img.workshop}
      />

      {/* Culture */}
      <section className="relative bg-void py-24 md:py-32">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <ParallaxImage src={img.culture} alt="Life at Forge" className="aspect-[4/3] w-full rounded-2xl" amount={0.12} />
          </div>
          <div className="lg:col-span-6">
            <SectionHeading index="01" eyebrow="Our culture" lines={["How we work", "together."]} />
            <ul className="mt-10 space-y-px overflow-hidden rounded-2xl border border-ice/10">
              {culture.map((c, i) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex items-center gap-4 bg-ice/[0.03] px-5 py-4"
                >
                  <span className="font-mono text-xs text-cyan">0{i + 1}</span>
                  <span className="text-base text-ice">{c}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative bg-abyss py-24 md:py-32">
        <div className="container-x">
          <SectionHeading index="02" eyebrow="Benefits" lines={["More than", "a job."]} />
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ice/10 bg-ice/[0.06] sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                className="bg-abyss p-7"
              >
                <h3 className="font-display text-xl text-ice">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{b.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment timeline */}
      <section className="relative bg-void py-24 md:py-32">
        <div className="container-x">
          <SectionHeading index="03" eyebrow="The process" lines={["From hello", "to hello again."]} />
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {hiringSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className="group relative rounded-2xl glass p-6"
              >
                <span className="font-mono text-2xl text-cyan/40 transition-colors group-hover:text-cyan">{s.step}</span>
                <h3 className="mt-4 font-display text-lg text-ice">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{s.copy}</p>
                {i < hiringSteps.length - 1 && (
                  <span className="absolute -right-2 top-1/2 hidden h-px w-4 bg-cyan/40 lg:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="relative bg-abyss py-24 md:py-32">
        <div className="container-x">
          <SectionHeading index="04" eyebrow="Open roles" lines={["Find your", "place."]} />
          <div className="mt-12 overflow-hidden rounded-2xl border border-ice/10">
            {positions.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
                className="group flex flex-col gap-4 border-b border-ice/10 bg-ice/[0.02] px-6 py-6 transition-colors last:border-0 hover:bg-ice/[0.05] sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-display text-xl text-ice transition-colors group-hover:text-cyan">{p.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-mist">
                    <span>{p.team}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-cyan" /> {p.location}</span>
                    <span>{p.type}</span>
                  </div>
                </div>
                <button
                  onClick={() => apply(p.title)}
                  data-cursor
                  data-cursor-text="Apply"
                  className="flex shrink-0 items-center gap-2 self-start rounded-full border border-ice/20 px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-ice transition-colors hover:border-cyan hover:text-cyan sm:self-auto"
                >
                  Apply <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="relative scroll-mt-28 bg-void py-24 md:py-32">
        <div className="container-x max-w-3xl">
          <SectionHeading index="05" eyebrow="Apply" lines={["Tell us your", "story."]} align="center" />
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-12 flex flex-col items-center rounded-2xl border border-cyan/30 bg-cyan/[0.04] p-12 text-center"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full border border-cyan text-cyan">
                  <Check className="h-7 w-7" />
                </span>
                <h3 className="mt-6 font-display text-3xl text-ice">Application received.</h3>
                <p className="mt-3 max-w-md text-sm text-mist">
                  Thank you, {form.name.split(" ")[0] || "there"}. Our team reviews every application from a real person. We will be in touch soon.
                </p>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", links: "", message: "" }); setRole(""); }} className="mt-8 text-xs uppercase tracking-[0.18em] text-mist underline-offset-8 hover:text-cyan hover:underline">
                  Submit another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={(e) => { e.preventDefault(); if (valid) setSent(true); }}
                className="mt-12 space-y-7"
              >
                <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Ada Okafor" />
                <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="ada@email.com" />
                <label className="block">
                  <span className="eyebrow">Role</span>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-3 w-full border-b border-ice/20 bg-transparent pb-2 text-ice outline-none transition-colors focus:border-cyan [&>option]:bg-carbon"
                  >
                    <option value="">Select a role</option>
                    {positions.map((p) => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                    <option value="Open application">Open application</option>
                  </select>
                </label>
                <Field label="Portfolio or LinkedIn" value={form.links} onChange={(v) => setForm({ ...form, links: v })} placeholder="https://" />
                <label className="block">
                  <span className="eyebrow">Why Forge</span>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    placeholder="Tell us what you want to build."
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
                  Submit application <ArrowRight className="h-4 w-4" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
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
