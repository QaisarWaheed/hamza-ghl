import { PortfolioForm } from "@/components/admin/PortfolioForm";

export default function NewPortfolioPage() {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-syne)] text-3xl font-semibold text-white">New portfolio item</h1>
      <p className="mt-2 text-sm text-slate-400">Use HTTPS image URLs (e.g. Cloudinary, UploadThing, or Unsplash).</p>
      <div className="mt-10">
        <PortfolioForm mode="create" />
      </div>
    </div>
  );
}
