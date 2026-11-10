import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedBackground } from "@/components/animated-background";
import { ContactCta } from "@/components/contact-cta";
import { Reveal } from "@/components/reveal";
import { Em } from "@/components/section-heading";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { approach, site, toolkit, work } from "@/lib/site";

export const metadata: Metadata = {
  title: "About | Guntuku Hariprasad, Data Analyst",
  description: "Guntuku Hariprasad is a data analyst who works with SQL, Python and statistics to turn business questions into clear recommendations.",
};

const principles = [
  { title: "Question first", desc: "I start from the decision someone has to make. The dataset comes second." },
  { title: "Definitions matter", desc: "A customer, a late order, a day: every metric gets one precise meaning before I count it." },
  { title: "Prove it's real", desc: "Assumptions checked, the right test run, and effect sizes reported alongside p-values." },
  { title: "Reproducible by default", desc: "One command reruns the analysis. Anyone should get the same numbers I did." },
];

const companies = Array.from(new Set(work.map((w) => w.company))).filter((c) => !/stores|retail/i.test(c));

export default function About() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip">
      <SiteNav />
      <section className="relative -mt-16 pt-16">
        <AnimatedBackground />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-5 pt-16 pb-20 sm:px-6 md:pt-24 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">About</p>
              <h1 className="mt-5 text-5xl leading-[1.04] font-semibold tracking-[-0.035em] text-balance text-white md:text-7xl">
                Curious about the <Em>why</Em> behind the numbers.
              </h1>
            </Reveal>
            <div className="mt-10 space-y-5 text-lg leading-relaxed text-pretty text-slate-300">
              {site.about.map((para, i) => (
                <Reveal key={i} delay={0.08 + i * 0.06}>
                  <p>{para}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent"
              >
                See my work <ArrowRight className="size-4" />
              </Link>
              <a
                href="https://github.com/dot-hpg"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white transition-colors hover:border-white/40"
              >
                GitHub
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="space-y-4 lg:pt-28">
            <div className="card rounded-2xl p-6">
              <p className="font-mono text-[11px] tracking-[0.18em] text-slate-500 uppercase">Training</p>
              <p className="mt-3 font-semibold text-white">Scaler Academy</p>
              <p className="text-sm text-slate-400">Data Science &amp; Machine Learning programme</p>
            </div>
            <div className="card rounded-2xl p-6">
              <p className="font-mono text-[11px] tracking-[0.18em] text-slate-500 uppercase">Business cases worked on</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {companies.map((c) => (
                  <li key={c} className="rounded-md border border-line px-2.5 py-1 text-sm text-slate-300">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card rounded-2xl p-6">
              <p className="font-mono text-[11px] tracking-[0.18em] text-slate-500 uppercase">Looking for</p>
              <p className="mt-3 flex items-center gap-2 text-white">
                <span className="pulse-dot size-1.5 rounded-full bg-emerald-400" />
                {site.availability}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">How I think about analysis</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="card rounded-2xl p-6">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Toolkit</h2>
        </Reveal>
        <div className="mt-8 divide-y divide-white/5 rounded-2xl border border-line">
          {toolkit.map((t) => (
            <Reveal key={t.group} className="grid gap-3 p-6 md:grid-cols-[14rem_1fr] md:items-center">
              <div>
                <h3 className="font-semibold text-white">{t.group}</h3>
                <p className="text-sm text-slate-500">{t.blurb}</p>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {t.items.map((item) => (
                  <li key={item} className="rounded-md border border-line bg-white/[0.02] px-2.5 py-1 text-sm text-slate-300">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">The process</h2>
        </Reveal>
        <ol className="mt-8 space-y-3">
          {approach.map((a) => (
            <Reveal key={a.step} className="card grid gap-2 rounded-2xl p-6 md:grid-cols-[4rem_14rem_1fr] md:items-baseline">
              <span className="font-mono text-sm text-accent">{a.step}</span>
              <h3 className="font-semibold text-white">{a.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {a.desc} <span className="text-slate-500">({a.proof})</span>
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      <ContactCta />
      <SiteFooter />
    </main>
  );
}
