"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#portfolio", label: "Portfolio" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Get a quote" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["rgba(3, 7, 18, 0.55)", "rgba(3, 7, 18, 0.92)"]);
  const border = useTransform(scrollY, [0, 80], ["rgba(148,163,184,0)", "rgba(148,163,184,0.12)"]);

  return (
    <motion.header
      style={{ backgroundColor: bg, borderBottomColor: border }}
      className="fixed inset-x-0 top-0 z-[100] border-b border-transparent backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25">
            G
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-[family-name:var(--font-syne)] text-sm font-semibold tracking-tight text-white">
              GHL Architect
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Funnels · Automations</span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/#portfolio"
            className="ml-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-cyan-500/20 transition hover:brightness-105"
          >
            View work
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-300 md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      <div
        className={cn(
          "border-t border-white/10 bg-slate-950/95 px-4 py-4 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm text-slate-200 hover:bg-white/5"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </motion.header>
  );
}
