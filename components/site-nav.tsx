import Link from "next/link";
import { navLinks, site } from "@/lib/site";

export function SiteNav() {
  return (
    <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
      <Link href="/" className="shrink-0 text-lg font-bold tracking-tight">
        {site.shortName}
        <span className="text-indigo-400">.</span>
      </Link>
      <div className="flex gap-4 text-sm text-slate-300 sm:gap-7">
        {navLinks.map((l) => (
          <Link key={l.href} href={l.href} className="transition-colors hover:text-white">
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
      © 2026 {site.name}. All rights reserved.
    </footer>
  );
}
