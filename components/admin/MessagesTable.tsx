"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export type MessageRow = {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  createdAt: string;
};

export function MessagesTable({ rows }: { rows: MessageRow[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      alert("Delete failed");
    } finally {
      setDeleting(null);
    }
  }

  if (!rows.length) {
    return <p className="text-slate-500">No messages yet.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-white/10 bg-slate-900/80 text-xs uppercase tracking-wider text-slate-500">
          <tr>
            <th className="px-4 py-3">From</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((m) => (
            <tr key={m.id} className="bg-slate-950/40 align-top hover:bg-slate-900/50">
              <td className="px-4 py-4">
                <p className="font-medium text-white">{m.name}</p>
                <a href={`mailto:${m.email}`} className="text-xs text-cyan-300 hover:text-cyan-200">
                  {m.email}
                </a>
                <p className="mt-2 max-w-md whitespace-pre-wrap text-xs text-slate-400">{m.message}</p>
              </td>
              <td className="px-4 py-4 text-slate-300">{m.projectType}</td>
              <td className="px-4 py-4 text-xs text-slate-500">{new Date(m.createdAt).toLocaleString()}</td>
              <td className="px-4 py-4 text-right">
                <Button type="button" variant="danger" disabled={deleting === m.id} onClick={() => void remove(m.id)}>
                  {deleting === m.id ? "…" : "Delete"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
