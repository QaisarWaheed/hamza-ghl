import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CATEGORY_LABELS } from "@/lib/portfolio-labels";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioListPage() {
  const items = await prisma.portfolioItem.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-syne)] text-3xl font-semibold text-white">Portfolio</h1>
          <p className="mt-2 text-sm text-slate-400">Create, edit, or remove case studies shown on the public site.</p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20"
        >
          New item
        </Link>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-slate-900/80 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items.map((row) => (
              <tr key={row.id} className="bg-slate-950/40 hover:bg-slate-900/50">
                <td className="px-4 py-3 font-medium text-white">{row.title}</td>
                <td className="px-4 py-3 text-slate-400">{CATEGORY_LABELS[row.category]}</td>
                <td className="px-4 py-3 text-slate-500">{row.slug}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/portfolio/${row.id}/edit`} className="text-cyan-300 hover:text-cyan-200">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <p className="p-8 text-center text-slate-500">No portfolio items yet.</p>}
      </div>
    </div>
  );
}
