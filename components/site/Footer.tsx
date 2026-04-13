import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-[family-name:var(--font-syne)] text-lg font-semibold text-white">GHL Architect</p>
          <p className="mt-1 max-w-sm text-sm text-slate-400">
            GoHighLevel systems, funnels, and automations for teams that want pipeline without chaos.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-slate-400">
          <Link href="/#portfolio" className="hover:text-cyan-300">
            Portfolio
          </Link>
          <Link href="/#contact" className="hover:text-cyan-300">
            Contact
          </Link>
          <Link href="/admin/login" className="hover:text-slate-300">
            Admin
          </Link>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-slate-600">© {new Date().getFullYear()} GHL Architect. All rights reserved.</p>
    </footer>
  );
}
