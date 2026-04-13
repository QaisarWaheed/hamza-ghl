import { MessagesTable, type MessageRow } from "@/components/admin/MessagesTable";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  const rows: MessageRow[] = messages.map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    projectType: m.projectType,
    message: m.message,
    createdAt: m.createdAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="font-[family-name:var(--font-syne)] text-3xl font-semibold text-white">Messages</h1>
      <p className="mt-2 text-sm text-slate-400">Submissions from the public contact form.</p>
      <div className="mt-10">
        <MessagesTable rows={rows} />
      </div>
    </div>
  );
}
