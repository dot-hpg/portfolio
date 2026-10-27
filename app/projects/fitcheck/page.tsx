import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnimatedBackground } from "@/components/animated-background";
import { Reveal } from "@/components/reveal";
import { SiteFooter, SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "FitCheck case study | Guntuku Hariprasad",
  description:
    "FitCheck: a private resume and job match checker with on-device AI (all-MiniLM-L6-v2 via Transformers.js). Built for AI Engineer roles.",
};

const LIVE = "https://dot-hpg.github.io/fitcheck/";
const REPO = "https://github.com/dot-hpg/fitcheck";

const stats = [
  { value: "0", label: "Bytes of your resume uploaded" },
  { value: "~23 MB", label: "Quantised AI model, cached after first use" },
  { value: "~90 KB", label: "Gzipped JavaScript on first load" },
  { value: "~97%", label: "Unit-test coverage of the engine" },
];

// Common AI Engineer job requirements, each paired with where FitCheck shows it.
const requirements = [
  {
    need: "Ship ML models into real products",
    proof:
      "The embedding model runs in production on a public site, inside a Web Worker, with caching, a 60-second watchdog for stalled downloads and graceful fallback when AI is off.",
  },
  {
    need: "Work with embeddings, semantic search and NLP",
    proof:
      "Job requirements and resume lines are embedded with all-MiniLM-L6-v2 and matched by cosine similarity, with tuned thresholds for Strong (≥ 0.55), Partial (≥ 0.40) and Gap.",
  },
  {
    need: "Optimise model inference and performance",
    proof:
      "A quantised ONNX model (~23 MB) on ONNX Runtime Web (WASM), self-hosted runtime files, inference off the main thread, and lazy-loaded AI and PDF code for a ~90 KB first load.",
  },
  {
    need: "Build explainable, trustworthy AI",
    proof:
      "Every point of the score traces back to a visible component and weight. Results are tied to the exact text they came from, and marked stale when inputs change.",
  },
  {
    need: "Privacy and responsible use of data",
    proof:
      "Privacy by design: no backend, no account, no tracking. The only third-party request is the one-time model download from Hugging Face.",
  },
  {
    need: "Test and evaluate AI systems",
    proof:
      "Vitest unit tests (~97% engine coverage) plus Playwright end-to-end tests, including a test that runs the real model through the full worker → ONNX Runtime → UI path offline.",
  },
  {
    need: "Production software engineering and CI/CD",
    proof:
      "Strict TypeScript, a pure and fully tested engine, and GitHub Actions that lint, typecheck, test, build and deploy on every push.",
  },
  {
    need: "Turn messy real-world text into structured data",
    proof:
      "Parses job posts into required vs nice-to-have sections, rebuilds reading order from PDF text positions, and merges overlapping date ranges to estimate experience.",
  },
];

const features = [
  { title: "Match score out of 100", desc: "A weighted score with a plain-English verdict and a breakdown of every part." },
  { title: "Skill gap analysis", desc: "Detects ~100 skills through 350+ aliases (k8s → Kubernetes, Postgres → PostgreSQL) and separates core skills from nice-to-haves." },
  { title: "On-device AI evidence", desc: "Pairs each job requirement with the resume line that means the same thing, even when the words are different." },
  { title: "“Only listed” detection", desc: "Flags skills that appear in a skills list but are never shown in experience or projects." },
  { title: "Bullet coach", desc: "Scores each bullet for action verbs, measurable results, length and passive voice, then suggests a rewrite." },
  { title: "PDF upload", desc: "Extracts resume text in the browser with pdf.js, rebuilding reading order from text positions." },
  { title: "Experience estimate", desc: "Parses date ranges such as “Jan 2021 – Present” and merges overlapping roles." },
  { title: "Markdown report", desc: "Download the full analysis to keep with each job application." },
];

const pipeline = [
  { step: "Parse", desc: "Split the job post into required, nice-to-have, intro and info sections. Split the resume into sections and bullets, including bullets that wrap across PDF lines." },
  { step: "Match skills", desc: "Each skill compiles to one regex with custom word boundaries, so C++, C# and Node.js match while “java” never matches inside “javascript”. Ambiguous names like Go and R only match in exact case." },
  { step: "Cover keywords", desc: "Stem the job post's most repeated domain words so “payments” matches “payment”, and drop filler words and proper nouns such as company names." },
  { step: "Find evidence with AI", desc: "Embed requirement and resume lines with all-MiniLM-L6-v2 in a Web Worker. Each requirement takes its best cosine match and is labelled Strong, Partial or Gap." },
  { step: "Score and explain", desc: "Combine the weighted components. Anything with nothing to measure is left out and the other weights are renormalised, so one missing input never drags the score to zero." },
];

const weights = [
  { name: "Core skills", weight: 35 },
  { name: "Requirement evidence (AI)", weight: 20 },
  { name: "Domain keywords", weight: 15 },
  { name: "Bullet impact", weight: 12 },
  { name: "Experience", weight: 10 },
  { name: "Nice-to-haves", weight: 8 },
];

const engineering = [
  { title: "Off the main thread", desc: "Model download and inference run in a Web Worker, with a request-id protocol so concurrent calls resolve correctly." },
  { title: "Fails fast, not forever", desc: "A watchdog fails a stalled model download after 60 seconds instead of spinning endlessly." },
  { title: "Self-hosted runtime", desc: "ONNX Runtime WebAssembly files ship with the app rather than loading from a CDN." },
  { title: "Lazy loading", desc: "pdf.js (~430 KB) loads only on PDF upload, and the AI worker only when the AI check runs." },
  { title: "Stale-result safety", desc: "AI results are tied to the exact text they were computed for, and marked stale when either input changes." },
  { title: "Resilient storage", desc: "Wrapped localStorage access, so private browsing or blocked storage never breaks the app." },
];

const stack = [
  { group: "AI / ML", items: ["Transformers.js", "ONNX Runtime Web (WASM)", "all-MiniLM-L6-v2", "Sentence embeddings", "Cosine similarity"] },
  { group: "App", items: ["React 19", "TypeScript (strict)", "Vite", "Web Workers", "pdf.js"] },
  { group: "Quality", items: ["Vitest", "Testing Library", "Playwright", "oxlint"] },
  { group: "Delivery", items: ["GitHub Actions", "GitHub Pages"] },
];

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <Reveal>
      <p className="font-mono text-xs font-semibold tracking-[0.18em] text-pink-400 uppercase">{kicker}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
    </Reveal>
  );
}

function Shot({ src, alt, width, height, caption }: { src: string; alt: string; width: number; height: number; caption: string }) {
  return (
    <Reveal>
      <figure>
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-white shadow-2xl shadow-indigo-950/40">
          <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" sizes="(min-width: 1024px) 960px, 100vw" />
        </div>
        <figcaption className="mt-3 text-center text-sm text-slate-500">{caption}</figcaption>
      </figure>
    </Reveal>
  );
}

const linkBtn =
  "rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 hover:text-white";
const primaryBtn =
  "rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-200";

export default function FitCheckCaseStudy() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <div className="relative">
        <AnimatedBackground />
        <SiteNav />
        <section className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-20">
          <Link href="/#projects" className="text-sm text-slate-400 hover:text-white">
            ← All projects
          </Link>
          <Reveal>
            <span className="mt-8 inline-block rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-1.5 text-sm font-medium text-pink-300">
              Built for my AI Engineer applications
            </span>
            <h1 className="mt-6 text-5xl font-extrabold tracking-tight md:text-7xl">
              Fit<span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">Check</span>
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-300 md:text-2xl">
              Will your resume pass for this job? An explainable match score, a skill-gap report and bullet rewrites,
              powered by an AI model that runs entirely on your device.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={LIVE} target="_blank" rel="noreferrer" className={primaryBtn}>
                Try the live app →
              </a>
              <a href={REPO} target="_blank" rel="noreferrer" className={linkBtn}>
                View the code on GitHub →
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
                <div className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </section>
      </div>

      <div className="mx-auto max-w-5xl space-y-24 px-6 pb-28">
        <Shot
          src="/projects/fitcheck/hero.png"
          alt="FitCheck home screen with a job post and a resume filled in"
          width={2560}
          height={1720}
          caption="Paste a job post and a resume, or upload a PDF. Everything stays in the browser."
        />

        {/* Why */}
        <section>
          <SectionTitle kicker="The problem" title="Why I built FitCheck" />
          <Reveal className="mt-6 grid gap-6 md:grid-cols-2">
            <p className="text-lg leading-relaxed text-slate-300">
              Most companies filter resumes with an applicant tracking system (ATS) before a person ever reads them.
              Online “resume scanners” usually want an account, an upload of your personal data and money, and then
              give you a number without saying how they got it.
            </p>
            <p className="text-lg leading-relaxed text-slate-300">
              I wanted the opposite: a checker that is <b className="text-white">explainable</b> (every point traces
              to a visible reason), <b className="text-white">actionable</b> (it says what to fix) and{" "}
              <b className="text-white">private</b> (your resume never leaves your device). I built it while
              preparing my own AI Engineer applications.
            </p>
          </Reveal>
        </section>

        {/* AI Engineer requirements */}
        <section>
          <SectionTitle kicker="For hiring teams" title="What this project shows for AI Engineer roles" />
          <Reveal>
            <p className="mt-4 max-w-3xl text-lg text-slate-400">
              Common requirements in AI Engineer job posts, and where FitCheck demonstrates each one.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {requirements.map((r, i) => (
              <Reveal key={r.need} delay={(i % 2) * 0.08}>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-sm text-emerald-400">
                      ✓
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">{r.need}</h3>
                      <p className="mt-2 text-slate-400">{r.proof}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Features */}
        <section>
          <SectionTitle kicker="Features" title="What it does" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 4) * 0.06}>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* AI evidence */}
        <section>
          <SectionTitle kicker="The AI part" title="Matching meaning, not just words" />
          <Reveal className="mt-6 grid gap-6 md:grid-cols-2">
            <p className="text-lg leading-relaxed text-slate-300">
              Keyword matching misses a resume line like “Designed RESTful APIs backed by PostgreSQL” for a
              requirement that says “Experience designing APIs and working with Postgres”. FitCheck embeds every
              requirement and every resume line with <b className="text-white">all-MiniLM-L6-v2</b>, a sentence-embedding
              model, and compares them by cosine similarity.
            </p>
            <ul className="space-y-3 text-slate-300">
              <li className="flex gap-3"><span className="mt-2 size-2.5 shrink-0 rounded-full bg-emerald-400" /><span><b className="text-white">Strong</b> — similarity ≥ 0.55</span></li>
              <li className="flex gap-3"><span className="mt-2 size-2.5 shrink-0 rounded-full bg-amber-400" /><span><b className="text-white">Partial</b> — similarity ≥ 0.40</span></li>
              <li className="flex gap-3"><span className="mt-2 size-2.5 shrink-0 rounded-full bg-rose-400" /><span><b className="text-white">Gap</b> — no resume line means the same thing</span></li>
              <li className="pt-2 text-slate-400">
                The quantised model (~23 MB) runs through Transformers.js and ONNX Runtime Web in a Web Worker, and the
                browser caches it after the first download.
              </li>
            </ul>
          </Reveal>
          <div className="mt-10">
            <Shot
              src="/projects/fitcheck/ai-evidence.png"
              alt="Requirement evidence table pairing each job requirement with the best matching resume line and a similarity score"
              width={2176}
              height={2056}
              caption="Each job requirement paired with the resume line that means the same thing, with its similarity score."
            />
          </div>
        </section>

        {/* Pipeline */}
        <section>
          <SectionTitle kicker="How it works" title="From two blocks of text to an explained score" />
          <ol className="mt-8 space-y-4">
            {pipeline.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.05}>
                <li className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                  <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text font-mono text-2xl font-bold text-transparent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{p.step}</h3>
                    <p className="mt-1 text-slate-400">{p.desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Scoring */}
        <section>
          <SectionTitle kicker="Scoring" title="Every point has a reason" />
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_1.4fr]">
            <Reveal className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="font-semibold">Component weights</h3>
              <div className="mt-5 space-y-4">
                {weights.map((w) => (
                  <div key={w.name}>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{w.name}</span>
                      <span className="font-mono text-slate-400">{w.weight}</span>
                    </div>
                    <div className="mt-1.5 h-2 rounded-full bg-slate-800">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-indigo-400 to-pink-400"
                        style={{ width: `${(w.weight / 35) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-slate-500">
                Weights total 100. Components with nothing to measure are dropped and the rest renormalised.
              </p>
            </Reveal>
            <Shot
              src="/projects/fitcheck/score.png"
              alt="Score breakdown showing 69 out of 100 with each component's percentage"
              width={2176}
              height={1012}
              caption="The score breakdown a user sees."
            />
          </div>
        </section>

        {/* Bullets + mobile */}
        <section>
          <SectionTitle kicker="Actionable" title="It tells you what to fix" />
          <div className="mt-8 grid items-start gap-8 md:grid-cols-[1.8fr_1fr]">
            <Shot
              src="/projects/fitcheck/bullets.png"
              alt="Bullet coach scoring resume bullets and suggesting rewrites"
              width={2176}
              height={1546}
              caption="The bullet coach flags weak bullets and suggests stronger rewrites."
            />
            <Shot
              src="/projects/fitcheck/mobile.png"
              alt="FitCheck on a phone"
              width={780}
              height={1688}
              caption="Works on phones too."
            />
          </div>
        </section>

        {/* Engineering */}
        <section>
          <SectionTitle kicker="Engineering" title="Built like production software" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {engineering.map((e, i) => (
              <Reveal key={e.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                  <h3 className="font-semibold">{e.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-slate-300">
            <b className="text-white">Testing:</b> the matching engine is plain TypeScript with no UI or browser
            dependencies, so it is fully unit tested (~97% coverage with Vitest). Playwright covers the app end to end,
            including a real-model test that serves the model from disk and runs it through the worker, ONNX Runtime and
            UI with no network. GitHub Actions lints, typechecks, tests, builds and deploys every push.
          </Reveal>
        </section>

        {/* Stack */}
        <section>
          <SectionTitle kicker="Tech stack" title="Tools I used" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {stack.map((s) => (
              <Reveal key={s.group} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <h3 className="font-mono text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">{s.group}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((t) => (
                    <span key={t} className="rounded-full bg-slate-800 px-3 py-1.5 text-sm text-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Limits + roadmap */}
        <section className="grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-xl font-semibold">Honest limitations</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-400">
              <li>The skill list targets software, data and DevOps roles; other fields get fewer skill matches.</li>
              <li>Scanned, image-only PDFs have no text layer, so the text must be pasted.</li>
              <li>The score estimates fit with the post; it does not copy any specific company&apos;s ATS.</li>
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-xl font-semibold">What&apos;s next</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-400">
              <li>Shareable result links, still with no server</li>
              <li>Skill lists for product, design and finance roles</li>
              <li>WebGPU acceleration where available</li>
              <li>A cover-letter outline built from the evidence table</li>
            </ul>
          </Reveal>
        </section>

        {/* CTA */}
        <Reveal className="rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-950/60 to-slate-900 p-10 text-center md:p-14">
          <h2 className="text-3xl font-bold md:text-4xl">Try it with your own resume</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Free, no sign-up, and nothing leaves your browser. Hiring for an AI Engineer? I&apos;d love to talk.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={LIVE} target="_blank" rel="noreferrer" className={primaryBtn}>
              Open FitCheck →
            </a>
            <a href={REPO} target="_blank" rel="noreferrer" className={linkBtn}>
              Read the code →
            </a>
            <Link href="/#contact" className={linkBtn}>
              Get in touch →
            </Link>
          </div>
        </Reveal>
      </div>

      <SiteFooter />
    </main>
  );
}
