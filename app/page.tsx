import Link from "next/link";
import { ArrowRight, ArrowUpRight, Database, FlaskConical, LineChart, Presentation } from "lucide-react";
import { AnimatedBackground } from "@/components/animated-background";
import { ContactCta } from "@/components/contact-cta";
import { CountUp } from "@/components/count-up";
import { DataExplorer } from "@/components/data-explorer";
import { HeroConsole } from "@/components/hero-console";
import { InsightTicker } from "@/components/insight-ticker";
import { Reveal } from "@/components/reveal";
import { Em, SectionHeading } from "@/components/section-heading";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { FeaturedWork } from "@/components/work-card";
import { WorkGrid } from "@/components/work-grid";
import { caseStudies } from "@/lib/scaler-case-studies";
import { approach, beyond, site, toolkit, totals, work } from "@/lib/site";

const TARGET_RECOMMENDATIONS = 8;
const recommendations = caseStudies.reduce((s, c) => s + c.recommendations.length, 0) + TARGET_RECOMMENDATIONS;

const companies = work.filter((w) => w.caseStudy).length;

const stats = [
  { value: totals.records, label: "Records analysed", format: "M" as const },
  { value: totals.caseStudies, label: "End-to-end projects" },
  { value: recommendations, label: "Business recommendations" },
  { value: companies, label: "Company business cases" },
];

const toolIcons = [Database, FlaskConical, Presentation, LineChart];

export default function Home() {
  const featured = work.filter((w) => w.featured);
  const rest = work.filter((w) => !w.featured).slice(0, 6);

  return (
    <main className="flex min-h-screen flex-col overflow-x-clip">
      <SiteNav />

      {/* Hero */}
      <section className="relative -mt-16 pt-16">
        <AnimatedBackground />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 pt-14 pb-24 sm:px-6 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pb-32">
          <div className="min-w-0">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="pulse-dot size-1.5 rounded-full bg-emerald-400" />
                {site.availability}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-7 text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.035em] text-balance text-white sm:text-6xl lg:text-[4.1rem]">
                I turn raw data into <Em>decisions</Em> a business can act on.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-slate-400">
                Hi, I&apos;m <span className="text-white">{site.name}</span>, a data analyst. {site.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.18} className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent"
              >
                See the case studies <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#explore"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white transition-colors hover:border-white/40"
              >
                Explore the data live
              </Link>
            </Reveal>
            <Reveal delay={0.24}>
              <ul className="mt-10 flex flex-wrap gap-2">
                {["SQL", "BigQuery", "Python", "pandas", "Statistics", "Tableau", "Power BI"].map((t) => (
                  <li key={t} className="rounded-md border border-line bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-slate-400">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="min-w-0 lg:pl-4">
            <HeroConsole />
          </div>
        </div>

        {/* KPI strip */}
        <div className="relative mx-auto max-w-6xl px-5 pb-16 sm:px-6">
          <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-ink/90 px-5 py-6 sm:px-7">
                <div className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {s.format === "M" ? (
                    <>
                      <CountUp value={Math.floor(s.value / 100_000) / 10} decimals={1} />
                      <span className="text-accent">M+</span>
                    </>
                  ) : (
                    <CountUp value={s.value} />
                  )}
                </div>
                <div className="mt-1.5 text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <InsightTicker />

      {/* Featured */}
      <section id="work" className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 pt-28 sm:px-6">
        <SectionHeading
          kicker="Selected work"
          title={
            <>
              Real business questions, answered <Em>with evidence</Em>
            </>
          }
          intro="Each case study starts from a decision a company had to make and ends with ranked recommendations, a written report and code anyone can rerun."
        />
        <div className="mt-14 space-y-6">
          {featured.map((w, i) => (
            <Reveal key={w.slug}>
              <FeaturedWork w={w} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Live data explorer */}
      <section id="explore" className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 pt-32 sm:px-6">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <SectionHeading
            kicker="Try it yourself"
            title={
              <>
                Explore the data <Em>behind</Em> a finding
              </>
            }
            intro="These are the actual query outputs from my Target Brazil SQL case study. Hover the charts, switch views, or flip to the table."
          />
        </div>
        <Reveal className="mt-12">
          <DataExplorer />
        </Reveal>
      </section>

      {/* All work */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-32 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="More work"
            title={
              <>
                Statistics, forecasting and <Em>customer</Em> analytics
              </>
            }
          />
          <Reveal>
            <Link href="/work" className="group inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white">
              View all {work.length} projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
        <Reveal className="mt-12">
          <WorkGrid items={rest} />
        </Reveal>
      </section>

      {/* Approach */}
      <section id="approach" className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 pt-32 sm:px-6">
        <SectionHeading
          kicker="How I work"
          title={
            <>
              From a vague question to a <Em>clear</Em> recommendation
            </>
          }
          intro="The same five steps run through every project, so the result holds up when someone asks how I got it."
        />
        <ol className="relative mt-14 grid gap-4 md:grid-cols-5">
          <div aria-hidden className="absolute top-[1.15rem] right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent md:block" />
          {approach.map((a, i) => (
            <Reveal key={a.step} delay={i * 0.07} className="relative">
              <li className="flex h-full flex-col">
                <span className="relative z-10 grid size-9 place-items-center rounded-full border border-accent/40 bg-ink font-mono text-xs text-accent md:mx-auto">
                  {a.step}
                </span>
                <div className="card mt-5 flex flex-1 flex-col rounded-2xl p-5">
                  <h3 className="font-semibold text-white">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{a.desc}</p>
                  <p className="mt-auto border-t border-line pt-4 font-mono text-[11px] leading-relaxed text-slate-500">
                    <span className="text-accent/80">e.g.</span> {a.proof}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Toolkit */}
      <section id="toolkit" className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 pt-32 sm:px-6">
        <SectionHeading
          kicker="Toolkit"
          title={
            <>
              The tools I <Em>reach</Em> for
            </>
          }
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {toolkit.map((t, i) => {
            const Icon = toolIcons[i];
            return (
              <Reveal key={t.group} delay={i * 0.06} className="card rounded-2xl p-6">
                <Icon className="size-5 text-accent" strokeWidth={1.6} />
                <h3 className="mt-5 font-semibold text-white">{t.group}</h3>
                <p className="mt-1.5 text-sm text-slate-400">{t.blurb}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {t.items.map((item) => (
                    <li key={item} className="rounded-md border border-line bg-white/[0.02] px-2 py-1 text-xs text-slate-300">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Beyond analytics */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-32 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <SectionHeading
            kicker="Beyond analytics"
            title={
              <>
                I also <Em>build</Em> with machine learning
              </>
            }
            intro="When a question needs a model rather than a chart, I can take it from notebook to a working app."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {beyond.map((b, i) => {
              const ext = b.href.startsWith("http");
              const Comp = ext ? "a" : Link;
              return (
                <Reveal key={b.title} delay={i * 0.06}>
                  <Comp
                    href={b.href}
                    {...(ext ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="card card-hover group flex h-full flex-col rounded-2xl p-5"
                  >
                    <h3 className="text-[15px] font-semibold text-white">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{b.desc}</p>
                    <div className="mt-auto flex items-center justify-between pt-5">
                      <span className="font-mono text-[11px] text-slate-500">{b.tags.join(" · ")}</span>
                      <ArrowUpRight className="size-4 text-slate-500 transition-colors group-hover:text-accent" />
                    </div>
                  </Comp>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="pt-32">
        <ContactCta />
      </div>

      <SiteFooter />
    </main>
  );
}
