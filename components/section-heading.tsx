import { Reveal } from "@/components/reveal";

export function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
}: {
  kicker: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      <p className="flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.2em] text-accent uppercase">
        <span className={`h-px w-6 bg-accent/60 ${align === "center" ? "hidden" : ""}`} />
        {kicker}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-balance text-white md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-pretty text-slate-400 md:text-lg">{intro}</p>}
    </Reveal>
  );
}

// Italic serif accent used for one or two words in a heading.
export function Em({ children }: { children: React.ReactNode }) {
  return <span className="font-serif font-normal tracking-normal text-accent italic">{children}</span>;
}
