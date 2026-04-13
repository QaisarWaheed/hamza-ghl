import { notFound } from "next/navigation";
import { PortfolioForm, type PortfolioFormInitial } from "@/components/admin/PortfolioForm";
import { prisma } from "@/lib/prisma";
import { DeletePortfolioButton } from "@/components/admin/DeletePortfolioButton";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function EditPortfolioPage({ params }: Props) {
  const { id } = await params;
  const row = await prisma.portfolioItem.findUnique({ where: { id } });
  if (!row) notFound();

  const initial: PortfolioFormInitial = {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    shortDescription: row.shortDescription,
    description: row.description,
    thumbnailUrl: row.thumbnailUrl,
    galleryUrls: row.galleryUrls,
    tags: row.tags,
    tools: row.tools,
    problem: row.problem,
    solution: row.solution,
    results: row.results,
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-syne)] text-3xl font-semibold text-white">Edit portfolio</h1>
          <p className="mt-2 text-sm text-slate-400">{row.title}</p>
        </div>
        <DeletePortfolioButton id={row.id} />
      </div>
      <div className="mt-10">
        <PortfolioForm mode="edit" initial={initial} />
      </div>
    </div>
  );
}
