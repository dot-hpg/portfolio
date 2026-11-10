import Link from "next/link";
import { insights } from "@/lib/site";

// A slow, pausable marquee of headline findings. Each one links to its case study.
export function InsightTicker() {
  const row = [...insights, ...insights];
  return (
    <div className="marquee relative overflow-hidden border-y border-line bg-panel/60 py-4">
      <ul className="marquee-track flex w-max gap-3">
        {row.map((i, n) => (
          <li key={n} aria-hidden={n >= insights.length}>
            <Link
              href={i.href}
              tabIndex={n >= insights.length ? -1 : 0}
              className="flex items-center gap-3 rounded-full border border-line bg-ink/60 py-2 pr-5 pl-2 text-sm whitespace-nowrap text-slate-400 transition-colors hover:border-accent/40 hover:text-slate-200"
            >
              <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[13px] font-medium text-accent tabular">
                {i.stat}
              </span>
              {i.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
