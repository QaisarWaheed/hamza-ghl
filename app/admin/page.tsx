import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [portfolioCount, messageCount] = await Promise.all([
    prisma.portfolioItem.count(),
    prisma.contactMessage.count(),
  ]);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-syne)] text-3xl font-semibold text-white">Dashboard</h1>
      <p className="mt-2 text-sm text-slate-400">Overview of your portfolio site content.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Portfolio items</p>
          <p className="mt-2 font-[family-name:var(--font-syne)] text-4xl font-semibold text-white">{portfolioCount}</p>
          <Link href="/admin/portfolio" className="mt-4 inline-block text-sm text-cyan-300 hover:text-cyan-200">
            Manage portfolio →
          </Link>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contact messages</p>
          <p className="mt-2 font-[family-name:var(--font-syne)] text-4xl font-semibold text-white">{messageCount}</p>
          <Link href="/admin/messages" className="mt-4 inline-block text-sm text-cyan-300 hover:text-cyan-200">
            View messages →
          </Link>
        </div>
      </div>
    </div>
  );
}
