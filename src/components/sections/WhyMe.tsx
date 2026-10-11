import Reveal from "@/components/Reveal";

const POINTS = [
  {
    n: "01",
    title: "I think in problems.",
    text: "I don't start with technology. I start by understanding what needs to be solved.",
  },
  {
    n: "02",
    title: "I build end-to-end.",
    text: "From frontend experience to backend architecture, I can build the complete product.",
  },
  {
    n: "03",
    title: "I care about the details.",
    text: "Performance, responsiveness, usability, and visual quality all matter.",
  },
  {
    n: "04",
    title: "I build for business.",
    text: "The goal isn't simply to launch a website. The goal is to create something that helps your business.",
  },
];

export default function WhyMe() {
  return (
    <section className="border-t border-border py-24 md:py-40">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="label-xs">07 — Why work with me</p>
          <h2 className="mt-8 text-[clamp(3rem,10vw,10rem)] font-bold leading-[0.86] tracking-[-0.06em]">
            Why me<span className="text-accent">?</span>
          </h2>
        </Reveal>

        <div className="mt-20 md:mt-32">
          {POINTS.map((p, i) => (
            <Reveal key={p.n} delay={i * 60}>
              <div className="grid gap-6 border-t border-border py-14 md:grid-cols-12 md:gap-12 md:py-20">
                <span className="text-sm tabular-nums text-muted-foreground md:col-span-1">
                  {p.n}
                </span>
                <h3 className="text-[clamp(1.8rem,4.6vw,4.2rem)] font-bold leading-[0.95] tracking-[-0.05em] md:col-span-6">
                  {p.title}
                </h3>
                <p className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9 md:self-end">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
