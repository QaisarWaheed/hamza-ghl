"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { PublicPortfolioCard } from "@/lib/portfolio-public";
import { CATEGORY_LABELS, CATEGORY_ORDER, type PortfolioCategoryKey } from "@/lib/portfolio-labels";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";

type Props = {
  items: PublicPortfolioCard[];
};

export function PortfolioSection({ items }: Props) {
  const [filter, setFilter] = useState<PortfolioCategoryKey | "ALL">("ALL");

  const filtered = useMemo(() => {
    if (filter === "ALL") return items;
    return items.filter((i) => i.category === filter);
  }, [items, filter]);

  return (
    <section id="portfolio" className="scroll-mt-24 border-t border-white/5 bg-slate-950/40 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-300">Portfolio</p>
          <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-semibold text-white sm:text-4xl">
            Funnel-first case studies
          </h2>
          <p className="mt-4 text-slate-400">
            Browse by category—like an Octafunnel-style library—then open any build for the full story, stack, and outcomes.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap gap-2">
          <FilterChip active={filter === "ALL"} onClick={() => setFilter("ALL")} label="All work" />
          {CATEGORY_ORDER.map((key) => (
            <FilterChip key={key} active={filter === key} onClick={() => setFilter(key)} label={CATEGORY_LABELS[key]} />
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <PortfolioCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-slate-500">Nothing in this category yet—check back soon.</p>
        )}
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition ${
        active
          ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-100 shadow-lg shadow-cyan-500/10"
          : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/5"
      }`}
    >
      {label}
    </button>
  );
}
