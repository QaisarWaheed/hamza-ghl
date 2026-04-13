import { NextResponse } from "next/server";
import { z } from "zod";
import { PortfolioCategory } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-api";
import { stringifyJsonArray } from "@/lib/utils";

const categorySchema = z.enum([
  PortfolioCategory.FUNNELS,
  PortfolioCategory.WEBSITES,
  PortfolioCategory.AUTOMATIONS,
  PortfolioCategory.CRM_SYSTEMS,
]);

const updateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  slug: z.string().min(1).max(200).optional(),
  category: categorySchema.optional(),
  shortDescription: z.string().min(1).max(500).optional(),
  description: z.string().max(50000).optional(),
  thumbnailUrl: z.string().url().max(2000).optional(),
  galleryUrls: z.array(z.string().url().max(2000)).optional(),
  tags: z.array(z.string().max(80)).optional(),
  tools: z.array(z.string().max(80)).optional(),
  problem: z.string().max(10000).optional(),
  solution: z.string().max(10000).optional(),
  results: z.string().max(10000).optional().nullable(),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await ctx.params;
  const item = await prisma.portfolioItem.findUnique({ where: { id } });
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PATCH(req: Request, ctx: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await ctx.params;
  const existing = await prisma.portfolioItem.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  let nextSlug: string | undefined;
  if (data.slug !== undefined) {
    const s = data.slug.trim();
    if (!s) {
      return NextResponse.json({ error: "Slug cannot be empty" }, { status: 400 });
    }
    if (s !== existing.slug) {
      const clash = await prisma.portfolioItem.findFirst({
        where: { slug: s, NOT: { id } },
      });
      if (clash) {
        return NextResponse.json({ error: "Slug already in use" }, { status: 400 });
      }
      nextSlug = s;
    }
  }

  const item = await prisma.portfolioItem.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(nextSlug !== undefined && { slug: nextSlug }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.shortDescription !== undefined && { shortDescription: data.shortDescription }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.thumbnailUrl !== undefined && { thumbnailUrl: data.thumbnailUrl }),
      ...(data.galleryUrls !== undefined && { galleryUrls: stringifyJsonArray(data.galleryUrls) }),
      ...(data.tags !== undefined && { tags: stringifyJsonArray(data.tags) }),
      ...(data.tools !== undefined && { tools: stringifyJsonArray(data.tools) }),
      ...(data.problem !== undefined && { problem: data.problem }),
      ...(data.solution !== undefined && { solution: data.solution }),
      ...(data.results !== undefined && { results: data.results }),
    },
  });

  return NextResponse.json(item);
}

export async function DELETE(_req: Request, ctx: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await ctx.params;
  try {
    await prisma.portfolioItem.delete({ where: { id } });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
