import { ArrowUpRight, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { Reveal } from "@/components/reveal";
import { Em } from "@/components/section-heading";
import { site } from "@/lib/site";

export function ContactCta() {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 pb-24 sm:px-6">
      <Reveal className="card relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12 sm:py-20">
        <div aria-hidden className="bg-dot-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        <div aria-hidden className="absolute -bottom-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-teal-500/15 blur-[100px]" />
        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <span className="pulse-dot size-1.5 rounded-full bg-emerald-400" />
            {site.availability}
          </p>
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-balance text-white sm:text-6xl">
            Have a question your data <Em>should</Em> be able to answer?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            I&apos;m looking for a data analyst role where I can own questions end to end, from the first query to the
            recommendation. Let&apos;s talk.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href="https://www.linkedin.com/in/dot-hpg"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent"
            >
              <LinkedInIcon className="size-4" /> Connect on LinkedIn
            </a>
            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white transition-colors hover:border-white/40"
              >
                <Mail className="size-4" /> Email me
              </a>
            )}
            <a
              href="https://github.com/dot-hpg"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white transition-colors hover:border-white/40"
            >
              <GitHubIcon className="size-4" /> See the code <ArrowUpRight className="size-3.5 opacity-60" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
