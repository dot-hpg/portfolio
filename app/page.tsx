"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/animated-background";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { site } from "@/lib/site";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <div className="relative">
        <AnimatedBackground />
        <SiteNav />
        <section className="relative z-10 flex flex-col items-center px-6 pt-24 pb-36 text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-full border border-slate-700 bg-slate-900/60 px-4 py-1 text-sm text-slate-300"
          >
            {site.role}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-6 text-5xl font-extrabold tracking-tight md:text-7xl"
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              {site.shortName}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-6 max-w-xl text-lg text-slate-400"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-10 flex gap-4"
          >
            <Button
              size="lg"
              className="h-11 bg-white px-6 text-slate-950 hover:bg-slate-200"
              nativeButton={false}
              render={<Link href="/#projects" />}
            >
              View my work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 border-slate-700 bg-transparent px-6 text-white hover:bg-slate-800 hover:text-white"
              nativeButton={false}
              render={<Link href="/about" />}
            >
              About me
            </Button>
          </motion.div>
        </section>
      </div>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-24">
        <motion.h2 {...fadeUp} transition={{ duration: 0.5 }} className="text-3xl font-bold md:text-4xl">
          Projects
        </motion.h2>
        <p className="mt-3 text-slate-400">A few things I&apos;ve built recently.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {site.projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              {...fadeUp}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-7 transition-colors hover:border-indigo-500/60"
            >
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-slate-400">{p.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl scroll-mt-8 px-6 pb-28">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-950/60 to-slate-900 p-10 text-center md:p-16"
        >
          <h2 className="text-3xl font-bold md:text-4xl">Let&apos;s work together</h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-400">
            Have an idea or a project in mind? I&apos;d love to hear about it.
          </p>
          <Button
            size="lg"
            className="mt-8 h-11 bg-white px-6 text-slate-950 hover:bg-slate-200"
            nativeButton={false}
            render={<a href={`mailto:${site.email}`} />}
          >
            Say hello
          </Button>
          <div className="mt-8 flex justify-center gap-6 text-sm text-slate-400">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-white">
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      <SiteFooter />
    </main>
  );
}
