import { NextResponse } from "next/server";
import { z } from "zod";
import { PortfolioCategory } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-api";
import { slugify } from "@/lib/slug";
import { stringifyJsonArray } from "@/lib/utils";

const categorySchema = z.enum([
  PortfolioCategory.FUNNELS,
  PortfolioCategory.WEBSITES,
  PortfolioCategory.AUTOMATIONS,
  PortfolioCategory.CRM_SYSTEMS,
]);

const createSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).optional(),
  category: categorySchema,
  shortDescription: z.string().min(1).max(500),
  description: z.string().max(50000).default(""),
  thumbnailUrl: z.string().url().max(2000),
  galleryUrls: z.array(z.string().url().max(2000)).default([]),
  tags: z.array(z.string().max(80)).default([]),
  tools: z.array(z.string().max(80)).default([]),
  problem: z.string().max(10000).default(""),
  solution: z.string().max(10000).default(""),
  results: z.string().max(10000).optional().nullable(),
});

async function uniqueSlug(base: string) {
  let slug = base;
  let n = 0;
  while (await prisma.portfolioItem.findUnique({ where: { slug } })) {
    n += 1;
    slug = `${base}-${n}`;
  }
  return slug;
}

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const items = await prisma.portfolioItem.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const baseSlug = parsed.data.slug?.trim() || slugify(parsed.data.title);
  if (!baseSlug) {
    return NextResponse.json({ error: "Could not derive slug" }, { status: 400 });
  }
  const slug = await uniqueSlug(baseSlug);

  const item = await prisma.portfolioItem.create({
    data: {
      title: parsed.data.title,
      slug,
      category: parsed.data.category,
      shortDescription: parsed.data.shortDescription,
      description: parsed.data.description,
      thumbnailUrl: parsed.data.thumbnailUrl,
      galleryUrls: stringifyJsonArray(parsed.data.galleryUrls),
      tags: stringifyJsonArray(parsed.data.tags),
      tools: stringifyJsonArray(parsed.data.tools),
      problem: parsed.data.problem,
      solution: parsed.data.solution,
      results: parsed.data.results ?? null,
    },
  });

  return NextResponse.json(item);
}
