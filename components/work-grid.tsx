"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WorkCard } from "@/components/work-card";
import { skillFilters, work, type Skill } from "@/lib/site";

// The full list of projects, filterable by skill.
export function WorkGrid({ items = work }: { items?: typeof work }) {
  const [filter, setFilter] = useState<Skill | "All">("All");
  const shown = filter === "All" ? items : items.filter((w) => w.skills.includes(filter));
  const counts = Object.fromEntries(skillFilters.map((s) => [s, items.filter((w) => w.skills.includes(s)).length]));

  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by skill">
        {(["All", ...skillFilters] as const).map((s) => {
          const active = filter === s;
          const n = s === "All" ? items.length : counts[s];
          if (!n) return null;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              aria-pressed={active}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                active
                  ? "border-white bg-white text-ink"
                  : "border-line text-slate-300 hover:border-white/25 hover:text-white"
              }`}
            >
              {s}
              <span className={`font-mono text-[11px] tabular ${active ? "text-ink/60" : "text-slate-500"}`}>{n}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((w) => (
            <motion.div
              key={w.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <WorkCard w={w} index={items.indexOf(w)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
