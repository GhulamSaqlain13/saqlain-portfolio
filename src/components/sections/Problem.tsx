import Reveal from "@/components/Reveal";

const STEPS = ["Idea", "Strategy", "Design", "Development", "Launch"];

function MarqueeRow() {
  const items = [...STEPS, ...STEPS, ...STEPS, ...STEPS];
  return (
    <div className="marquee border-y border-border py-6">
      <div className="marquee-track">
        {items.map((step, i) => (
          <span
            key={`${step}-${i}`}
            className="flex items-center gap-8 whitespace-nowrap px-8 text-sm uppercase tracking-[0.32em] text-muted-foreground"
          >
            {step}
            <span className="text-accent">→</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Problem() {
  return (
    <section id="problem" className="border-t border-border bg-background py-24 md:py-40">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <Reveal className="max-w-[16ch]">
          <p className="label-xs">01 — The problem I solve</p>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-10 max-w-[18ch] text-[clamp(2.4rem,6.4vw,6.2rem)] font-bold leading-[0.94] tracking-[-0.045em]">
            Good ideas deserve to become <span className="text-outline">real products.</span>
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-16 md:mt-32 md:grid-cols-12">
          <Reveal delay={60} className="md:col-span-7 md:col-start-6">
            <p className="text-[clamp(1.25rem,2.4vw,2.1rem)] font-medium leading-[1.25] tracking-[-0.03em]">
              Most businesses don&apos;t need another complicated website. They need a digital
              experience that makes their business{" "}
              <span className="text-muted-foreground">easier to understand,</span>{" "}
              <span className="text-muted-foreground">easier to trust,</span> and easier to choose.
            </p>
          </Reveal>

          <Reveal delay={120} className="md:col-span-6">
            <p className="text-[clamp(1.25rem,2.4vw,2.1rem)] font-medium leading-[1.25] tracking-[-0.03em]">
              I turn ideas, business problems, and outdated digital experiences into modern products
              designed to attract <span className="text-accent">the right customers.</span>
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-24 md:mt-36">
        <MarqueeRow />
      </div>
    </section>
  );
}
