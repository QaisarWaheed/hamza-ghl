import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ProseMarkdown } from "@/components/content/ProseMarkdown";
import { RemoteImage } from "@/components/site/RemoteImage";
import { prisma } from "@/lib/prisma";
import { getDemoPortfolioRowBySlug } from "@/lib/portfolio-demo-rows";
import { toPublicDetail } from "@/lib/portfolio-public";
import { CATEGORY_LABELS } from "@/lib/portfolio-labels";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const row =
    (await prisma.portfolioItem.findUnique({ where: { slug } })) ?? getDemoPortfolioRowBySlug(slug);
  if (!row) return { title: "Not found" };
  return {
    title: row.title,
    description: row.shortDescription,
    openGraph: { title: row.title, description: row.shortDescription, images: [{ url: row.thumbnailUrl }] },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const row =
    (await prisma.portfolioItem.findUnique({ where: { slug } })) ?? getDemoPortfolioRowBySlug(slug);
  if (!row) notFound();

  const item = toPublicDetail(row);

  return (
    <>
      <Navbar />
      <article className="flex-1 pt-24">
        <header className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <Link href="/#portfolio" className="text-sm text-cyan-300/90 hover:text-cyan-200">
              ← Back to portfolio
            </Link>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-violet-300">
              {CATEGORY_LABELS[item.category]}
            </p>
            <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {item.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-400">{item.shortDescription}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-white/10">
            <RemoteImage src={item.thumbnailUrl} alt="" fill className="object-cover" sizes="100vw" priority />
          </div>

          {item.galleryUrls.length > 0 && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {item.galleryUrls.map((url) => (
                <div key={url} className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
                  <RemoteImage src={url} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                </div>
              ))}
            </div>
          )}

          <div className="mt-14 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h2 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-white">Overview</h2>
                <div className="mt-4">
                  <ProseMarkdown
                  content={item.description.trim() ? item.description : "**No detailed description yet.**"}
                />
                </div>
              </section>
              <section className="grid gap-8 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300/90">Problem</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.problem || "—"}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-violet-300/90">Solution</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.solution || "—"}</p>
                </div>
              </section>
              {item.results && (
                <section>
                  <h2 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-white">Results</h2>
                  <div className="mt-4">
                    <ProseMarkdown content={item.results} />
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Tools used</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-200">
                  {item.tools.length ? item.tools.map((t) => <li key={t}>— {t}</li>) : <li className="text-slate-500">—</li>}
                </ul>
              </div>
              <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-violet-600/10 p-6">
                <p className="font-[family-name:var(--font-syne)] text-lg font-semibold text-white">Want something similar?</p>
                <p className="mt-2 text-sm text-slate-300">Tell me about your offer and I’ll propose a funnel structure and build plan.</p>
                <Link
                  href="/#contact"
                  className={cn(
                    "mt-5 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-105",
                  )}
                >
                  Get a quote
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
