"use client";

import { useEffect, useRef } from "react";

function fmt(n: number, decimals: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// Counts from 0 to `value` the first time it scrolls into view.
// The final value is rendered on the server, so it reads correctly without JavaScript.
export function CountUp({ value, decimals = 0, duration = 1600 }: { value: number; decimals?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          el.textContent = fmt(value * (1 - Math.pow(1 - p, 4)), decimals);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, decimals, duration]);

  return (
    <span ref={ref} className="tabular">
      {fmt(value, decimals)}
    </span>
  );
}
