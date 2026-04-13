"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { CATEGORY_LABELS, CATEGORY_ORDER, type PortfolioCategoryKey } from "@/lib/portfolio-labels";
import { parseJsonArray } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";

export type PortfolioFormInitial = {
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

function linesFromJson(json: string) {
  return parseJsonArray(json).join("\n");
}

function tagsFromJson(json: string) {
  return parseJsonArray(json).join(", ");
}

function parseLines(text: string): string[] {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseCommaList(text: string): string[] {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

type Props =
  | { mode: "create" }
  | {
      mode: "edit";
      initial: PortfolioFormInitial;
    };

export function PortfolioForm(props: Props) {
  const router = useRouter();
  const initial = props.mode === "edit" ? props.initial : null;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(props.mode === "edit");
  const [category, setCategory] = useState<PortfolioCategoryKey>(initial?.category ?? "FUNNELS");
  const [shortDescription, setShortDescription] = useState(initial?.shortDescription ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [thumbnailUrl, setThumbnailUrl] = useState(initial?.thumbnailUrl ?? "");
  const [galleryLines, setGalleryLines] = useState(initial ? linesFromJson(initial.galleryUrls) : "");
  const [tagsText, setTagsText] = useState(initial ? tagsFromJson(initial.tags) : "");
  const [toolsText, setToolsText] = useState(initial ? tagsFromJson(initial.tools) : "");
  const [problem, setProblem] = useState(initial?.problem ?? "");
  const [solution, setSolution] = useState(initial?.solution ?? "");
  const [results, setResults] = useState(initial?.results ?? "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const slugHint = useMemo(() => {
    if (slugTouched) return null;
    return "Leave blank to auto-generate from title on create.";
  }, [slugTouched]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const galleryUrls = parseLines(galleryLines);
    const tags = parseCommaList(tagsText);
    const tools = parseCommaList(toolsText);

    const body = {
      title,
      slug: slug.trim() || undefined,
      category,
      shortDescription,
      description,
      thumbnailUrl,
      galleryUrls,
      tags,
      tools,
      problem,
      solution,
      results: results.trim() || null,
    };

    try {
      if (props.mode === "create") {
        const res = await fetch("/api/admin/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError((data as { error?: string }).error || "Failed to create");
          setLoading(false);
          return;
        }
        router.push("/admin/portfolio");
        router.refresh();
      } else {
        const res = await fetch(`/api/admin/portfolio/${props.initial.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...body,
            slug: slug.trim(),
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError((data as { error?: string }).error || "Failed to save");
          setLoading(false);
          return;
        }
        router.push("/admin/portfolio");
        router.refresh();
      }
    } catch {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              placeholder="e.g. coaching-funnel"
              required={props.mode === "edit"}
            />
            {slugHint && <p className="mt-1 text-xs text-slate-500">{slugHint}</p>}
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select id="category" value={category} onChange={(e) => setCategory(e.target.value as PortfolioCategoryKey)}>
              {CATEGORY_ORDER.map((key) => (
                <option key={key} value={key}>
                  {CATEGORY_LABELS[key]}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="short">Short description</Label>
            <Textarea id="short" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required rows={3} />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="thumb">Thumbnail URL</Label>
            <Input
              id="thumb"
              type="url"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              required
              placeholder="https://…"
            />
          </div>
          <div>
            <Label htmlFor="gallery">Gallery image URLs (one per line)</Label>
            <Textarea id="gallery" value={galleryLines} onChange={(e) => setGalleryLines(e.target.value)} rows={5} placeholder="https://…" />
          </div>
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input id="tags" value={tagsText} onChange={(e) => setTagsText(e.target.value)} placeholder="Lead Gen, GHL, SaaS" />
          </div>
          <div>
            <Label htmlFor="tools">Tools used (comma-separated)</Label>
            <Input id="tools" value={toolsText} onChange={(e) => setToolsText(e.target.value)} placeholder="GoHighLevel, Zapier" />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Full description (Markdown)</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={12} className="font-mono text-xs" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <Label htmlFor="problem">Problem</Label>
          <Textarea id="problem" value={problem} onChange={(e) => setProblem(e.target.value)} rows={5} />
        </div>
        <div>
          <Label htmlFor="solution">Solution</Label>
          <Textarea id="solution" value={solution} onChange={(e) => setSolution(e.target.value)} rows={5} />
        </div>
      </div>

      <div>
        <Label htmlFor="results">Results (Markdown, optional)</Label>
        <Textarea id="results" value={results} onChange={(e) => setResults(e.target.value)} rows={4} />
      </div>

      {error && <p className="text-sm text-red-300">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : props.mode === "create" ? "Create" : "Save changes"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} disabled={loading}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
