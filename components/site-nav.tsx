"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";

export function Logo() {
  return (
    <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label={`${site.name}, home`}>
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-lg border border-white/10 bg-panel-2 font-mono text-[11px] font-semibold tracking-tight text-accent">
        {/* A tiny bar chart doubles as the monogram's backdrop. */}
        <span aria-hidden className="absolute inset-x-1.5 bottom-1 flex items-end gap-[2px] opacity-30">
          <span className="h-1.5 flex-1 rounded-[1px] bg-accent" />
          <span className="h-3 flex-1 rounded-[1px] bg-accent" />
          <span className="h-2 flex-1 rounded-[1px] bg-accent" />
          <span className="h-4 flex-1 rounded-[1px] bg-accent" />
        </span>
        <span className="relative">{site.initials}</span>
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-white">
        {site.shortName}
        <span className="ml-1.5 hidden font-normal text-slate-400 sm:inline">· {site.role}</span>
      </span>
    </Link>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  // The menu remembers which page it was opened on, so it closes itself after navigating.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const active = l.href === pathname || (l.href === "/work" && pathname.startsWith("/scaler"));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  active ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/#contact"
            className="ml-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent"
          >
            Get in touch
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpenOn(open ? null : pathname)}
          className="grid size-10 place-items-center rounded-lg border border-line text-slate-300 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line px-5 pt-2 pb-5 md:hidden">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="block border-b border-line py-3.5 text-base text-slate-200">
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-white px-4 py-3 text-sm font-medium text-ink"
          >
            Get in touch <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-slate-500">
            Every number on this site links back to the code, query or report it came from.
          </p>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/dot-hpg"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid size-9 place-items-center rounded-lg border border-line text-slate-400 transition-colors hover:border-white/25 hover:text-white"
            >
              <GitHubIcon className="size-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/dot-hpg"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid size-9 place-items-center rounded-lg border border-line text-slate-400 transition-colors hover:border-white/25 hover:text-white"
            >
              <LinkedInIcon className="size-4" />
            </a>
          </div>
          <p className="font-mono text-xs text-slate-600">© 2026 {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
