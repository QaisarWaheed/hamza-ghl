"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { PublicPortfolioCard } from "@/lib/portfolio-public";
import { CATEGORY_LABELS } from "@/lib/portfolio-labels";
import { RemoteImage } from "@/components/site/RemoteImage";

type Props = {
  item: PublicPortfolioCard;
  index: number;
};

export function PortfolioCard({ item, index }: Props) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 shadow-xl shadow-black/20 transition hover:border-cyan-400/25 hover:shadow-cyan-500/10"
    >
      <Link href={`/portfolio/${item.slug}`} className="relative aspect-[16/10] overflow-hidden">
        <RemoteImage
          src={item.thumbnailUrl}
          alt=""
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-200 backdrop-blur">
          {CATEGORY_LABELS[item.category]}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-[family-name:var(--font-syne)] text-lg font-semibold text-white">{item.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-slate-400">{item.shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.slice(0, 4).map((t) => (
            <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5">
          <Link
            href={`/portfolio/${item.slug}`}
            className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-slate-100 transition hover:border-white/15 hover:bg-white/10"
          >
            View details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
