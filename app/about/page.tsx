"use client";

import { motion } from "framer-motion";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { site } from "@/lib/site";

export default function About() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <SiteNav />

      <section className="mx-auto max-w-3xl px-6 pt-16 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold tracking-tight md:text-6xl"
        >
          About{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">me</span>
        </motion.h1>

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate-300">
          {site.about.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-14 text-2xl font-bold"
        >
          Skills
        </motion.h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {site.skills.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.08 }}
              className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
