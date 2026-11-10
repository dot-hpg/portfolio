import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Work } from "@/lib/site";

function primaryHref(w: Work) {
  return w.caseStudy ?? w.links[0]?.href ?? "#";
}

function isExternal(href: string) {
  return href.startsWith("http") || href.endsWith(".pdf");
}

// Compact card used in the grid of all work.
export function WorkCard({ w, index }: { w: Work; index: number }) {
  const href = primaryHref(w);
  const external = isExternal(href);
  const Comp = external ? "a" : Link;
  return (
    <article className="card card-hover group relative flex h-full flex-col rounded-2xl p-6">
      <div className="flex items-center justify-between font-mono text-[11px] text-slate-500">
        <span>
          {String(index + 1).padStart(2, "0")} · {w.company}
        </span>
        <span>{w.recordsLabel}</span>
      </div>

      <div className="mt-6">
        <div className="text-[2rem] leading-none font-semibold tracking-tight text-white tabular">{w.metric.value}</div>
        <div className="mt-2 text-sm text-slate-400">{w.metric.label}</div>
      </div>

      <h3 className="mt-6 text-lg font-semibold tracking-tight text-white">
        <Comp
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
        >
          {w.title}
        </Comp>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-pretty text-slate-400">{w.question}</p>

      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        <div className="flex flex-wrap gap-1.5">
          {w.skills.map((s) => (
            <span key={s} className="rounded-md border border-line px-2 py-0.5 text-[11px] text-slate-400">
              {s}
            </span>
          ))}
        </div>
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-slate-400 transition-all group-hover:border-accent/50 group-hover:bg-accent group-hover:text-ink">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </article>
  );
}

// Large, alternating layout for the three flagship case studies.
export function FeaturedWork({ w, index }: { w: Work; index: number }) {
  const href = primaryHref(w);
  const flip = index % 2 === 1;
  return (
    <article className="card group relative overflow-hidden rounded-3xl">
      <div className={`grid grid-cols-1 items-stretch lg:grid-cols-[1.05fr_1fr] ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="flex flex-col p-7 sm:p-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-wide text-slate-500 uppercase">
            <span className="text-accent">Case study {String(index + 1).padStart(2, "0")}</span>
            <span className="h-3 w-px bg-white/15" />
            <span>{w.company}</span>
            <span className="h-3 w-px bg-white/15" />
            <span>{w.recordsLabel}</span>
          </div>

          <h3 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-balance text-white sm:text-[1.9rem] sm:leading-tight">
            {w.question}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-pretty text-slate-400">{w.summary}</p>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
            {[w.metric, ...w.highlights].map((h, i) => (
              <div key={h.label} className={`bg-panel p-4 ${i === 0 ? "bg-panel-2" : ""}`}>
                <dt className="sr-only">{h.label}</dt>
                <dd>
                  <div className={`text-2xl font-semibold tracking-tight tabular ${i === 0 ? "text-accent" : "text-white"}`}>
                    {h.value}
                  </div>
                  <div className="mt-1 text-[13px] leading-snug text-slate-400">{h.label}</div>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-accent"
            >
              Read the case study <ArrowUpRight className="size-4" />
            </Link>
            {w.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-line px-4 py-2.5 text-sm text-slate-300 transition-colors hover:border-white/25 hover:text-white"
              >
                {l.label} <ArrowUpRight className="size-3.5 opacity-60" />
              </a>
            ))}
          </div>
        </div>

        {w.cover && (
          <Link
            href={href}
            className={`relative flex flex-col justify-center gap-6 border-line bg-gradient-to-br from-teal-500/[0.07] to-transparent p-5 sm:p-8 ${
              flip ? "border-b lg:border-r lg:border-b-0" : "border-t lg:border-t-0 lg:border-l"
            }`}
            aria-label={`Open the ${w.company} case study`}
          >
            <div className="bg-dot-grid absolute inset-0 opacity-40" aria-hidden />
            <figure className="relative w-full">
              <div className="overflow-hidden rounded-xl bg-white shadow-2xl ring-1 shadow-black/50 ring-white/10 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.015]">
                <Image
                  src={w.cover.src}
                  alt={w.cover.alt}
                  width={w.cover.width}
                  height={w.cover.height}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 520px, 100vw"
                />
              </div>
              <figcaption className="mt-3 flex flex-wrap gap-1.5">
                {w.tools.map((t) => (
                  <span key={t} className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[10.5px] text-slate-400">
                    {t}
                  </span>
                ))}
              </figcaption>
            </figure>
            {w.recommendation && (
              <div className="relative rounded-xl border border-accent/20 bg-ink/70 p-5 backdrop-blur">
                <p className="font-mono text-[10.5px] tracking-[0.18em] text-accent uppercase">Recommendation #1</p>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-200">{w.recommendation}</p>
              </div>
            )}
          </Link>
        )}
      </div>
    </article>
  );
}
