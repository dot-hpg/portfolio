"use client";

import { motion } from "framer-motion";

// Slowly drifting gradient blobs over a faint grid, in the style of 21st.dev hero backgrounds.
const blobs = [
  { className: "bg-indigo-500/30 left-[10%] top-[10%] size-[28rem]", x: [0, 80, -40, 0], y: [0, 40, 80, 0], duration: 18 },
  { className: "bg-pink-500/25 right-[5%] top-[20%] size-[24rem]", x: [0, -60, 30, 0], y: [0, 60, -30, 0], duration: 22 },
  { className: "bg-cyan-500/20 left-[35%] bottom-[0%] size-[26rem]", x: [0, 50, -60, 0], y: [0, -50, 20, 0], duration: 26 },
];

export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(148_163_184/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.07)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${b.className}`}
          animate={{ x: b.x, y: b.y }}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
