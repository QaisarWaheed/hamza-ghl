"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/messages", label: "Messages" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <aside className="fixed inset-y-0 left-0 z-40 w-56 border-r border-white/10 bg-slate-900/80 backdrop-blur">
        <div className="flex h-16 items-center border-b border-white/10 px-4">
          <Link href="/admin" className="font-[family-name:var(--font-syne)] text-sm font-semibold text-white">
            Admin
          </Link>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm ${
                pathname === item.href ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-3">
          <Link href="/" className="block rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white">
            View site
          </Link>
          <button
            type="button"
            onClick={() => void logout()}
            className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-200"
          >
            Log out
          </button>
        </div>
      </aside>
      <div className="pl-56">
        <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
      </div>
    </div>
  );
}
