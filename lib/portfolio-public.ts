import { parseJsonArray } from "@/lib/utils";
import type { PortfolioCategoryKey } from "@/lib/portfolio-labels";

/** Serializable DB row shape (avoid importing Prisma client into client bundles). */
export type PortfolioDbRow = {
  id: string;
  title: string;
  slug: string;
  category: PortfolioCategoryKey;
  shortDescription: string;
  description: string;
  thumbnailUrl: string;
  galleryUrls: string;
  tags: string;
  tools: string;
  problem: string;
  solution: string;
  results: string | null;
};

export type PublicPortfolioCard = {
  id: string;
  title: string;
  slug: string;
  category: PortfolioCategoryKey;
  shortDescription: string;
  thumbnailUrl: string;
  tags: string[];
};

export function toPublicCard(row: PortfolioDbRow): PublicPortfolioCard {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    shortDescription: row.shortDescription,
    thumbnailUrl: row.thumbnailUrl,
    tags: parseJsonArray(row.tags),
  };
}

export type PublicPortfolioDetail = PublicPortfolioCard & {
  description: string;
  galleryUrls: string[];
  tools: string[];
  problem: string;
  solution: string;
  results: string | null;
};

export function toPublicDetail(row: PortfolioDbRow): PublicPortfolioDetail {
  return {
    ...toPublicCard(row),
    description: row.description,
    galleryUrls: parseJsonArray(row.galleryUrls),
    tools: parseJsonArray(row.tools),
    problem: row.problem,
    solution: row.solution,
    results: row.results,
  };
}
