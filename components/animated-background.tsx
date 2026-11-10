// A quiet backdrop for hero sections: a dot grid that fades out, and a soft teal glow.
export function AnimatedBackground({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="bg-dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_30%,transparent_80%)]" />
      <div className="absolute -top-40 left-1/2 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-teal-500/[0.09] blur-[120px]" />
      <div className="absolute top-10 right-[-10rem] h-[22rem] w-[22rem] rounded-full bg-emerald-400/[0.05] blur-[100px]" />
    </div>
  );
}
