import type { Metadata } from "next";
import { AnimatedBackground } from "@/components/animated-background";
import { ContactCta } from "@/components/contact-cta";
import { Reveal } from "@/components/reveal";
import { Em } from "@/components/section-heading";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { WorkGrid } from "@/components/work-grid";
import { totals, work } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work | Guntuku Hariprasad, Data Analyst",
  description:
    "Every data analysis project by Guntuku Hariprasad: SQL, exploratory analysis, statistics, dashboards and forecasting on real business cases, filterable by skill.",
};

const upcoming = [
  { title: "OLA: driver attrition", tags: "Ensemble learning · class imbalance" },
  { title: "Scaler: learner clustering", tags: "K-means · hierarchical clustering" },
  { title: "AdEase: Wikipedia page view forecasting", tags: "ARIMA · SARIMAX · Prophet" },
];

export default function WorkPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip">
      <SiteNav />
      <section className="relative -mt-16 pt-16">
        <AnimatedBackground />
        <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-14 sm:px-6 md:pt-24">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">All work</p>
            <h1 className="mt-5 max-w-4xl text-5xl leading-[1.04] font-semibold tracking-[-0.035em] text-balance text-white md:text-7xl">
              {work.length} projects, <Em>{(totals.records / 1_000_000).toFixed(1)}M+</Em> records, one habit: end with a recommendation.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              Business case studies from my Data Science and Machine Learning programme at Scaler Academy, plus my own
              projects. Filter by the skill you&apos;re hiring for.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-6">
        <Reveal>
          <WorkGrid />
        </Reveal>

        <Reveal className="mt-16 rounded-2xl border border-dashed border-white/10 p-6 sm:p-8">
          <p className="font-mono text-[11px] tracking-[0.2em] text-slate-500 uppercase">In progress</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {upcoming.map((u) => (
              <li key={u.title}>
                <p className="text-sm font-medium text-slate-200">{u.title}</p>
                <p className="mt-1 font-mono text-[11px] text-slate-500">{u.tags}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <ContactCta />
      <SiteFooter />
    </main>
  );
}
