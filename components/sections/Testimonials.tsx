"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const items = [
  {
    name: "Alex Rivera",
    role: "Founder, B2B SaaS",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    quote:
      "Finally a GHL build that matches our brand. Funnel structure was clear, handoffs were automated, and our SDRs stopped living in spreadsheets.",
  },
  {
    name: "Priya Shah",
    role: "CMO, Coaching Collective",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    quote:
      "The attention to UX and motion made our funnel feel expensive—in the best way. Booking rate jumped within the first month.",
  },
  {
    name: "Marcus Chen",
    role: "Ops Lead, Agency",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    quote:
      "Integrations were bulletproof: Slack triage, dedupe logic, and reporting that leadership actually trusts.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Testimonials</p>
          <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-semibold text-white sm:text-4xl">
            Trusted by operators who ship
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="glass flex h-full flex-col rounded-2xl p-6"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-cyan-400/30">
                  <Image src={t.image} alt="" fill className="object-cover" sizes="48px" unoptimized />
                </div>
                <div>
                  <figcaption className="text-sm font-semibold text-white">{t.name}</figcaption>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-slate-300">&ldquo;{t.quote}&rdquo;</blockquote>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
