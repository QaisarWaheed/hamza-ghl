import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 hover:brightness-105 active:scale-[0.98]",
  ghost:
    "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10 hover:border-white/15",
  danger: "bg-red-500/15 text-red-200 border border-red-500/30 hover:bg-red-500/25",
  subtle: "text-slate-300 hover:text-white hover:bg-white/5",
} as const;

type Variant = keyof typeof variants;

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm transition-all duration-200 disabled:pointer-events-none disabled:opacity-40",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
