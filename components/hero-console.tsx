"use client";

import { motion } from "framer-motion";
import { reviewByDelivery } from "@/lib/target-data";

const sql = `SELECT delivery_bucket,
       COUNT(*)                  AS orders,
       ROUND(AVG(review_score), 2) AS avg_review
FROM   delivered_orders
JOIN   reviews USING (order_id)
GROUP  BY delivery_bucket
ORDER  BY delivery_bucket;`;

const KEYWORDS = /\b(SELECT|FROM|JOIN|USING|GROUP|BY|ORDER|AS|COUNT|ROUND|AVG)\b/g;

function highlight(line: string) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of line.matchAll(KEYWORDS)) {
    if (m.index! > last) parts.push(line.slice(last, m.index));
    const fn = ["COUNT", "ROUND", "AVG"].includes(m[0]);
    parts.push(
      <span key={m.index} className={fn ? "text-amber-200/90" : "text-accent"}>
        {m[0]}
      </span>,
    );
    last = m.index! + m[0].length;
  }
  parts.push(line.slice(last));
  return parts;
}

const TEAL = "#0fa896";
const CORAL = "#e0703f";
const total = reviewByDelivery.reduce((s, r) => s + r.orders, 0);

export function HeroConsole() {
  const lines = sql.split("\n");
  const resultDelay = 0.35 + lines.length * 0.09 + 0.35;
  return (
    <div className="relative">
      {/* Glow behind the card */}
      <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-teal-500/10 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 24, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="card relative overflow-hidden rounded-2xl shadow-2xl shadow-black/50"
        style={{ transformPerspective: 1200 }}
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="size-2.5 rounded-full bg-[#28c840]/80" />
          </div>
          <span className="font-mono text-[11px] text-slate-500">late_vs_reviews.sql · BigQuery</span>
          <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent">RUN ▸</span>
        </div>

        <pre className="overflow-x-auto px-4 py-4 font-mono text-[11.5px] leading-[1.7] text-slate-300 sm:text-[12.5px]">
          {lines.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.09, duration: 0.3 }}
              className="flex"
            >
              <span className="mr-4 w-4 shrink-0 text-right text-slate-600 select-none">{i + 1}</span>
              <span className="whitespace-pre">{highlight(l)}</span>
            </motion.div>
          ))}
        </pre>

        <div className="border-t border-line bg-ink/40 px-4 py-4">
          <div className="mb-3 flex items-center justify-between font-mono text-[10.5px] text-slate-500">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: resultDelay }}>
              <span className="text-emerald-400">✓</span> 6 rows · {total.toLocaleString("en-US")} delivered orders
            </motion.span>
            <span>avg review ★</span>
          </div>
          <div className="space-y-1.5">
            {reviewByDelivery.map((r, i) => (
              <div key={r.bucket} className="grid grid-cols-[6.4rem_1fr_2.4rem] items-center gap-3 text-[11.5px]">
                <span className="truncate text-slate-400">{r.bucket}</span>
                <div className="h-3.5">
                  <motion.div
                    className="h-full rounded-r-[3px]"
                    style={{ background: r.late ? CORAL : TEAL }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(r.score / 5) * 100}%` }}
                    transition={{ delay: resultDelay + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <motion.span
                  className="text-right font-mono text-slate-200 tabular"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: resultDelay + 0.4 + i * 0.08 }}
                >
                  {r.score.toFixed(2)}
                </motion.span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex h-11 items-center border-t border-line px-4 font-mono text-[10.5px] text-slate-600">
          outputs/results/7_1_late_delivery_vs_review_score.csv
        </div>
      </motion.div>

      {/* Floating insight chip */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: resultDelay + 1, duration: 0.5 }}
        className="absolute -right-2 -bottom-9 max-w-[15rem] rounded-xl border border-white/10 bg-panel-2/95 px-4 py-3 shadow-2xl shadow-black/60 backdrop-blur sm:-right-6"
      >
        <p className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase">Insight</p>
        <p className="mt-1 text-[13px] leading-snug text-slate-200">
          Late orders lose up to <span className="font-semibold text-white">2.6 stars</span>. Fix reliability before speed.
        </p>
      </motion.div>
    </div>
  );
}
