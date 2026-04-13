"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ctaPrimary =
  "inline-flex min-w-[160px] items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-105 active:scale-[0.98]";
const ctaGhost =
  "inline-flex min-w-[160px] items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:border-white/15 hover:bg-white/10 active:scale-[0.98]";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 top-0 h-[520px] w-[520px] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[480px] w-[480px] rounded-full bg-violet-600/25 blur-[120px]" />
        <div className="absolute left-1/2 top-1/3 h-px w-[min(80vw,720px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col justify-center px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pt-20">
        <motion.p
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/90"
        >
          GoHighLevel · Funnels · Automations
        </motion.p>

        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="max-w-4xl font-[family-name:var(--font-syne)] text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Funnels that feel{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">premium</span>
          . Systems that scale.
        </motion.h1>

        <motion.p
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-2xl text-lg text-slate-400"
        >
          I design and build acquisition systems in GHL—structured like a funnel portfolio, polished like a flagship agency
          site. From lead capture to nurture, booking, and revenue ops.
        </motion.p>

        <motion.div
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link href="#portfolio" className={cn(ctaPrimary)}>
            View portfolio
          </Link>
          <Link href="#contact" className={cn(ctaGhost)}>
            Get a quote
          </Link>
        </motion.div>

        <motion.div
          custom={4}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-16 grid gap-4 sm:grid-cols-3"
        >
          {[
            { k: "Pipeline clarity", v: "Stages that match how you actually sell." },
            { k: "Motion & UX", v: "Interfaces that feel intentional—not template-y." },
            { k: "Integrations", v: "Zapier, webhooks, calendars, payments—wired right." },
          ].map((item) => (
            <div key={item.k} className="gradient-border">
              <div className="inner p-5">
                <p className="font-[family-name:var(--font-syne)] text-sm font-semibold text-white">{item.k}</p>
                <p className="mt-2 text-sm text-slate-400">{item.v}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
