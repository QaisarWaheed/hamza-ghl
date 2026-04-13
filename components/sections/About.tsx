"use client";

import { motion } from "framer-motion";

const skills = [
  "GoHighLevel",
  "Funnel architecture",
  "SMS & email nurture",
  "Calendar & payments",
  "Zapier / Make",
  "Webhooks & APIs",
  "CRM pipelines",
  "Reporting",
];

const timeline = [
  { year: "2019–21", title: "Growth & ops", desc: "Ran paid acquisition and RevOps for SMB and mid-market teams." },
  { year: "2021–24", title: "GHL specialist", desc: "Deep implementation work: multi-location brands, agencies, and SaaS." },
  { year: "Today", title: "Systems partner", desc: "End-to-end funnel builds with premium UX and measurable pipeline impact." },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-white/5 bg-gradient-to-b from-slate-950/0 to-slate-950/80 py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 lg:grid-cols-2 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-300">About</p>
          <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-semibold text-white sm:text-4xl">
            GHL expert, funnel-obsessed
          </h2>
          <p className="mt-5 text-slate-400">
            I sit at the intersection of marketing narrative and backend automation—so your funnel doesn’t just look good, it
            behaves like a product: resilient tracking, clean data, and workflows your team can maintain.
          </p>
          <p className="mt-4 text-slate-400">
            Whether you need a flagship funnel, a website tied to GHL, or routing logic across tools, you get an agency-level
            experience without the chaos.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-200">
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Experience</p>
          <ul className="space-y-6">
            {timeline.map((row) => (
              <li key={row.year} className="relative border-l border-white/10 pl-6">
                <span className="absolute -left-1 top-1.5 h-2 w-2 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500" />
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300/90">{row.year}</p>
                <p className="mt-1 font-[family-name:var(--font-syne)] text-lg text-white">{row.title}</p>
                <p className="mt-1 text-sm text-slate-400">{row.desc}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
