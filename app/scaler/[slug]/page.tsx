import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedBackground } from "@/components/animated-background";
import { Reveal } from "@/components/reveal";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { caseStudies } from "@/lib/scaler-case-studies";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return {};
  return {
    title: `${study.titleLead.replace(":", "")} case study | Guntuku Hariprasad`,
    description: study.metaDescription,
  };
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <Reveal>
      <p className="font-mono text-xs font-semibold tracking-[0.18em] text-accent uppercase">{kicker}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
    </Reveal>
  );
}

const linkBtn =
  "rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-white/40 hover:text-white";
const primaryBtn =
  "rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent";

export default async function ScalerCaseStudy({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) notFound();

  const report = study.reportFile ?? `${study.repo}/blob/main/${study.report}`;

  return (
    <main className="flex min-h-screen flex-col overflow-x-clip text-white">
      {/* Hero */}
      <SiteNav />
      <div className="relative -mt-16 pt-16">
        <AnimatedBackground />
        <section className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-20">
          <Link href="/work" className="text-sm text-slate-400 hover:text-white">
            ← All work
          </Link>
          <Reveal>
            <span className="mt-8 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              Scaler project {study.number} · {study.caseName}
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
              {study.titleLead}{" "}
              <span className="text-accent-gradient">
                {study.titleAccent}
              </span>
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-300">{study.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {study.repo && (
                <a href={study.repo} target="_blank" rel="noreferrer" className={primaryBtn}>
                  View the code on GitHub →
                </a>
              )}
              <a href={report} target="_blank" rel="noreferrer" className={study.repo ? linkBtn : primaryBtn}>
                Read the report (PDF) →
              </a>
              {study.repo && (
                <>
                  <a href={`${study.repo}/blob/main/${study.notebook}`} target="_blank" rel="noreferrer" className={linkBtn}>
                    Open the notebook →
                  </a>
                  <a
                    href={`${study.repo}/blob/main/reports/insights_and_recommendations.md`}
                    target="_blank"
                    rel="noreferrer"
                    className={linkBtn}
                  >
                    Insights summary →
                  </a>
                </>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {study.stats.map((s) => (
              <div key={s.label} className="card rounded-xl p-5">
                <div className="text-accent-gradient text-2xl font-bold  md:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </section>
      </div>

      <div className="mx-auto max-w-5xl space-y-24 px-6 pb-28">
        {/* Brief */}
        <section>
          <SectionTitle kicker="The brief" title="What the business case asked" />
          <Reveal className="mt-6 grid gap-6 md:grid-cols-2">
            {study.brief.map((para) => (
              <p key={para} className="text-lg leading-relaxed text-slate-300">
                {para}
              </p>
            ))}
          </Reveal>
        </section>

        {/* Findings */}
        <section>
          <SectionTitle kicker="Key findings" title="What the data showed" />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {study.findings.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.04} className="card rounded-2xl p-6">
                <div className="text-accent-gradient text-3xl font-bold">
                  {f.value}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-slate-400">{f.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Results table */}
        <section>
          <SectionTitle kicker={study.table.kicker} title={study.table.title} />
          <Reveal>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">{study.table.intro}</p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-panel-2 text-slate-300">
                  <tr>
                    {study.table.headers.map((h) => (
                      <th key={h} className="px-5 py-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-400">
                  {study.table.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, i) => (
                        <td key={i} className={`px-5 py-3 ${i === 0 ? "text-slate-200" : ""}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        {/* Charts */}
        <section>
          <SectionTitle kicker="Charts" title="The evidence" />
          <div className="mt-8 space-y-10">
            {study.charts.map((c) => (
              <Reveal key={c.src}>
                <figure className={c.narrow ? "mx-auto max-w-xl" : ""}>
                  <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-2xl shadow-black/40">
                    <Image src={c.src} alt={c.alt} width={c.width} height={c.height} className="h-auto w-full" sizes="(min-width: 1024px) 960px, 100vw" />
                  </div>
                  <figcaption className="mt-3 text-center text-sm text-slate-500">{c.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <SectionTitle kicker="Recommendations" title={study.recommendationsTitle ?? "What the business should do"} />
          <div className="mt-8 space-y-4">
            {study.recommendations.map((r, i) => (
              <Reveal key={r.title} className="flex gap-5 card rounded-2xl p-6">
                <span className="text-accent-gradient font-mono text-2xl font-bold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{r.title}</h3>
                  <p className="mt-1 text-slate-400">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Method */}
        <section>
          <SectionTitle kicker="Method" title="How I did the analysis" />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {study.method.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.04} className="card rounded-2xl p-6">
                <h3 className="font-semibold">{m.title}</h3>
                <p className="mt-2 text-slate-400">{m.desc}</p>
              </Reveal>
            ))}
          </div>
          {study.note && (
            <Reveal className="mt-5 rounded-2xl border border-accent/30 bg-accent/5 p-6">
              <h3 className="font-semibold">{study.note.title}</h3>
              <p className="mt-2 text-slate-400">{study.note.desc}</p>
            </Reveal>
          )}
        </section>

        {/* Stack */}
        <section>
          <SectionTitle kicker="Tools" title="Tools I used" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {study.stack.map((s) => (
              <Reveal key={s.group} className="card rounded-2xl p-6">
                <h3 className="font-semibold">{s.group}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span key={item} className="rounded-md border border-line bg-white/[0.02] px-2.5 py-1 text-xs text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Reveal className="rounded-3xl border border-line bg-gradient-to-br from-teal-950/40 to-panel p-10 text-center md:p-14">
          <h2 className="text-3xl font-bold md:text-4xl">See the full analysis</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            {study.repo
              ? "The notebook, data, charts and full report are all on GitHub."
              : "The code, outputs and charts are all in the full PDF report."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {study.repo && (
              <a href={study.repo} target="_blank" rel="noreferrer" className={primaryBtn}>
                View on GitHub →
              </a>
            )}
            <a href={report} target="_blank" rel="noreferrer" className={study.repo ? linkBtn : primaryBtn}>
              Read the report →
            </a>
            <Link href="/work" className={linkBtn}>
              All work →
            </Link>
          </div>
        </Reveal>
      </div>

      <SiteFooter />
    </main>
  );
}
