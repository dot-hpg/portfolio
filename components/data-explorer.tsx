"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Table2, ChartSpline } from "lucide-react";
import { lateRate, monthLabel, monthlyOrders, reviewByDelivery, sources } from "@/lib/target-data";

const TEAL = "#0fa896";
const CORAL = "#e0703f";

type View = "orders" | "late" | "reviews";

const views: {
  id: View;
  tab: string;
  title: string;
  unit: string;
  insight: React.ReactNode;
  source: string;
  file: string;
}[] = [
  {
    id: "orders",
    tab: "Orders",
    title: "Monthly orders, Jan 2017 to Aug 2018",
    unit: "orders",
    insight: (
      <>
        Orders climbed from <strong className="text-white">800</strong> in January 2017 to a Black Friday spike of{" "}
        <strong className="text-white">7,544</strong>, then flattened at 6-7k a month. Growth from here has to
        come from bringing customers back, since <strong className="text-white">96.9%</strong> order only once.
      </>
    ),
    source: sources.monthlyOrders,
    file: "2_2_monthly_trend.csv",
  },
  {
    id: "late",
    tab: "Late deliveries",
    title: "Share of orders delivered late, by month",
    unit: "% late",
    insight: (
      <>
        Lateness sits at 3-5% in a normal month, then jumps to <strong className="text-white">12.4%</strong> after Black Friday
        and <strong className="text-white">19%</strong> in March 2018. The network runs out of capacity at peaks, so carriers
        and staff need booking <strong className="text-white">4-6 weeks</strong> ahead.
      </>
    ),
    source: sources.lateRate,
    file: "7_6_monthly_late_delivery_rate.csv",
  },
  {
    id: "reviews",
    tab: "Reviews",
    title: "Average review score by delivery timing",
    unit: "stars",
    insight: (
      <>
        Arriving early barely moves reviews, but arriving late wrecks them: <strong className="text-white">70%</strong> of
        orders 8+ days late get 1 star. That&apos;s why the first recommendation is to make{" "}
        <strong className="text-white">on-time %</strong> the headline logistics KPI.
      </>
    ),
    source: sources.reviewByDelivery,
    file: "7_1_late_delivery_vs_review_score.csv",
  },
];

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [w, setW] = useState(640);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

function niceMax(v: number) {
  const pow = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / pow;
  const step = n <= 2 ? 2 : n <= 4 ? 4 : n <= 5 ? 5 : 10;
  return step * pow;
}

function LineChart({
  data,
  color,
  format,
  annotate,
  unit,
}: {
  data: { month: string; value: number }[];
  color: string;
  format: (v: number) => string;
  annotate: string[];
  unit: string;
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const height = 300;
  const pad = { l: 46, r: 16, t: 28, b: 30 };
  const iw = Math.max(10, width - pad.l - pad.r);
  const ih = height - pad.t - pad.b;
  const max = niceMax(Math.max(...data.map((d) => d.value)) * 1.08);
  const x = (i: number) => pad.l + (i / (data.length - 1)) * iw;
  const y = (v: number) => pad.t + ih - (v / max) * ih;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);
  const line = data.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join("");
  const area = `${line}L${x(data.length - 1)},${pad.t + ih}L${x(0)},${pad.t + ih}Z`;
  const gid = `g-${unit.replace(/\W/g, "")}`;
  const labelEvery = width < 520 ? 6 : 3;

  const pick = (clientX: number, rect: DOMRect) => {
    const px = clientX - rect.left - pad.l;
    const i = Math.round((px / iw) * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, i)));
  };

  const h = hover !== null ? data[hover] : null;

  return (
    <div ref={ref} className="relative">
      <svg width={width} height={height} className="block overflow-visible" role="img" aria-label={`Line chart, ${unit} by month`}>
        <defs>
          <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.32" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={pad.l + iw} y1={y(t)} y2={y(t)} stroke="rgb(148 163 184 / 0.12)" strokeDasharray={t ? "2 4" : undefined} />
            <text x={pad.l - 10} y={y(t)} dy="0.32em" textAnchor="end" className="fill-slate-500 font-mono text-[10.5px] tabular">
              {format(t)}
            </text>
          </g>
        ))}
        {data.map((d, i) =>
          i % labelEvery === 0 ? (
            <text key={d.month} x={x(i)} y={height - 8} textAnchor="middle" className="fill-slate-500 font-mono text-[10.5px]">
              {monthLabel(d.month, false)} &apos;{d.month.slice(2, 4)}
            </text>
          ) : null,
        )}
        <motion.path
          key={`${gid}-area`}
          d={area}
          fill={`url(#${gid})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.path
          key={`${gid}-line`}
          d={line}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
        {annotate.map((m) => {
          const i = data.findIndex((d) => d.month === m);
          if (i < 0) return null;
          const d = data[i];
          const left = i > data.length * 0.7;
          return (
            <motion.g key={m} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
              <circle cx={x(i)} cy={y(d.value)} r={4.5} fill={color} stroke="#0c111a" strokeWidth={2} />
              <text
                x={x(i) + (left ? -10 : 10)}
                y={y(d.value) - 10}
                textAnchor={left ? "end" : "start"}
                className="fill-slate-200 text-[11.5px] font-medium"
              >
                {monthLabel(m)} · {format(d.value)}
              </text>
            </motion.g>
          );
        })}
        {h && hover !== null && (
          <g pointerEvents="none">
            <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={pad.t + ih} stroke="rgb(226 232 240 / 0.35)" />
            <circle cx={x(hover)} cy={y(h.value)} r={5} fill={color} stroke="#0c111a" strokeWidth={2} />
          </g>
        )}
        <rect
          x={pad.l - 8}
          y={pad.t}
          width={iw + 16}
          height={ih}
          fill="transparent"
          tabIndex={0}
          aria-label="Move with arrow keys to read each month"
          className="cursor-crosshair outline-none"
          onPointerMove={(e) => pick(e.clientX, (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect())}
          onPointerLeave={() => setHover(null)}
          onFocus={() => setHover((v) => v ?? data.length - 1)}
          onBlur={() => setHover(null)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") setHover((v) => Math.min(data.length - 1, (v ?? -1) + 1));
            if (e.key === "ArrowLeft") setHover((v) => Math.max(0, (v ?? data.length) - 1));
          }}
        />
      </svg>
      {h && hover !== null && (
        <div
          className="pointer-events-none absolute top-2 z-10 min-w-36 rounded-lg border border-white/10 bg-ink/95 px-3 py-2 shadow-xl backdrop-blur"
          style={{
            left: Math.min(Math.max(x(hover) - 72, 0), width - 148),
          }}
        >
          <div className="font-mono text-[10.5px] tracking-wide text-slate-400 uppercase">{monthLabel(h.month)}</div>
          <div className="mt-1 flex items-center gap-2">
            <span className="h-0.5 w-3 rounded-full" style={{ background: color }} />
            <span className="text-base font-semibold text-white tabular">{format(h.value)}</span>
            <span className="text-xs text-slate-400">{unit}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewBars() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="pt-2">
      <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-[3px]" style={{ background: TEAL }} />
          Delivered on time or early
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-[3px]" style={{ background: CORAL }} />
          Delivered late
        </span>
      </div>
      <div className="space-y-2.5">
        {reviewByDelivery.map((r, i) => (
          <div
            key={r.bucket}
            className="group grid grid-cols-[6.5rem_1fr] items-center gap-3 rounded-lg px-1 py-1 outline-none focus-visible:bg-white/5 sm:grid-cols-[8rem_1fr]"
            tabIndex={0}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
          >
            <span className="text-right text-xs text-slate-400 sm:text-sm">{r.bucket}</span>
            <div className="relative flex items-center gap-3">
              <div className="relative h-7 flex-1">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-r-[4px] transition-[filter]"
                  style={{ background: r.late ? CORAL : TEAL, filter: hover === i ? "brightness(1.2)" : undefined }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(r.score / 5) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="w-10 text-right text-sm font-semibold text-white tabular">{r.score.toFixed(2)}</span>
              {hover === i && (
                <div className="pointer-events-none absolute right-12 -top-12 z-10 rounded-lg border border-white/10 bg-ink/95 px-3 py-2 text-xs whitespace-nowrap shadow-xl">
                  <span className="font-semibold text-white tabular">{r.orders.toLocaleString("en-US")}</span>
                  <span className="text-slate-400"> orders · </span>
                  <span className="font-semibold text-white tabular">{r.oneStar.toFixed(1)}%</span>
                  <span className="text-slate-400"> gave 1 star</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-[6.5rem_1fr] gap-3 px-1 sm:grid-cols-[8rem_1fr]">
        <span />
        <div className="mr-[3.25rem] flex justify-between font-mono text-[10.5px] text-slate-500">
          {[0, 1, 2, 3, 4, 5].map((t) => (
            <span key={t}>{t}★</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DataTable({ view }: { view: View }) {
  const rows = useMemo(() => {
    if (view === "reviews")
      return {
        headers: ["Delivery timing", "Orders", "Avg review", "% 1-star"],
        rows: reviewByDelivery.map((r) => [r.bucket, r.orders.toLocaleString("en-US"), r.score.toFixed(2), `${r.oneStar.toFixed(2)}%`]),
      };
    const data = view === "orders" ? monthlyOrders : lateRate;
    return {
      headers: ["Month", view === "orders" ? "Orders" : "% delivered late"],
      rows: data.map((d) => [monthLabel(d.month), view === "orders" ? d.value.toLocaleString("en-US") : `${d.value.toFixed(2)}%`]),
    };
  }, [view]);
  return (
    <div className="max-h-[300px] overflow-auto rounded-lg border border-line">
      <table className="w-full text-left text-sm">
        <thead className="sticky top-0 bg-panel-2 text-xs text-slate-400">
          <tr>
            {rows.headers.map((h, i) => (
              <th key={h} className={`px-4 py-2.5 font-medium ${i ? "text-right" : ""}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.rows.map((r) => (
            <tr key={r[0]} className="hover:bg-white/[0.02]">
              {r.map((c, i) => (
                <td key={i} className={`px-4 py-2 ${i ? "text-right font-mono text-slate-200 tabular" : "text-slate-400"}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DataExplorer() {
  const [view, setView] = useState<View>("reviews");
  const [table, setTable] = useState(false);
  const v = views.find((x) => x.id === view)!;

  return (
    <div className="card overflow-hidden rounded-2xl">
      {/* Window chrome */}
      <div className="flex flex-col gap-4 border-b border-line px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <div className="hidden gap-1.5 sm:flex" aria-hidden>
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
          </div>
          <span className="font-mono text-xs text-slate-400">
            target_brazil <span className="text-slate-600">/</span> <span className="text-slate-200">{v.file}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div role="tablist" aria-label="Choose a view" className="flex rounded-lg border border-line bg-ink/60 p-0.5">
            {views.map((x) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={view === x.id}
                onClick={() => setView(x.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:text-[13px] ${
                  view === x.id ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {x.tab}
              </button>
            ))}
          </div>
          <button
            onClick={() => setTable((t) => !t)}
            className="grid size-8 place-items-center rounded-lg border border-line text-slate-400 transition-colors hover:text-white"
            aria-label={table ? "Show chart" : "Show table"}
            title={table ? "Show chart" : "Show table"}
          >
            {table ? <ChartSpline className="size-4" /> : <Table2 className="size-4" />}
          </button>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0 px-4 pt-5 pb-5 sm:px-6">
          <h3 className="text-sm font-medium text-slate-200">{v.title}</h3>
          <div className="mt-4 min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={view + String(table)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {table ? (
                  <DataTable view={view} />
                ) : view === "orders" ? (
                  <LineChart
                    data={monthlyOrders}
                    color={TEAL}
                    unit="orders"
                    format={(n) => (n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : Math.round(n).toString())}
                    annotate={["2017-11"]}
                  />
                ) : view === "late" ? (
                  <LineChart
                    data={lateRate}
                    color={CORAL}
                    unit="% late"
                    format={(n) => `${Number.isInteger(n) ? n : n.toFixed(1)}%`}
                    annotate={["2017-11", "2018-03"]}
                  />
                ) : (
                  <ReviewBars />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <aside className="flex flex-col justify-between gap-6 border-t border-line bg-white/[0.015] px-4 py-5 sm:px-6 lg:border-t-0 lg:border-l">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">So what?</p>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{v.insight}</p>
          </div>
          <div className="space-y-2 text-xs">
            <a
              href={v.source}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-slate-400 transition-colors hover:text-white"
            >
              Query output on GitHub <ArrowUpRight className="size-3.5" />
            </a>
            <Link href="/scaler/target-brazil" className="flex items-center gap-1.5 text-slate-400 transition-colors hover:text-white">
              Read the full case study <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
