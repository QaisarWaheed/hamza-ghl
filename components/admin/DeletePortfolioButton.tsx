"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function DeletePortfolioButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (!confirm("Delete this portfolio item permanently?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.push("/admin/portfolio");
      router.refresh();
    } catch {
      setLoading(false);
      alert("Could not delete");
    }
  }

  return (
    <Button type="button" variant="danger" onClick={() => void onDelete()} disabled={loading}>
      {loading ? "Deleting…" : "Delete"}
    </Button>
  );
}
