import Reveal from "@/components/Reveal";
import { PillButton } from "@/components/Navbar";
import ApproachVisual from "@/components/ApproachVisual";

const CAPABILITIES = [
  {
    title: "Digital products",
    text: "Turn an idea into a clear, useful experience that people can understand and trust.",
  },
  {
    title: "Growth systems",
    text: "Build scalable websites and web apps around real workflows, users, and business goals.",
  },
  {
    title: "Data-driven decisions",
    text: "Connect the right technology to the problem so the final product supports better decisions.",
  },
];

const STACK = [
  { label: "React", icon: "react", color: "#61DAFB" },
  { label: "Next.js", icon: "nextdotjs", color: "#FFFFFF" },
  { label: "Node.js", icon: "nodedotjs", color: "#5FA04E" },
  { label: "MongoDB", icon: "mongodb", color: "#47A248" },
  { label: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
  { label: "Tailwind", icon: "tailwindcss", color: "#06B6D4" },
];

export default function SignalStrip({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <div className="trust-panel">
        <div className="trust-panel__inner flex flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:gap-12 md:px-10 md:py-14">
          <p className="shrink-0 text-sm font-medium leading-snug text-white">
            Built with tools
            <br />
            trusted worldwide
          </p>
          <ul className="trust-logos" aria-label="Core technologies">
            {STACK.map(({ label, icon, color }) => (
              <li key={label}>
                <span
                  className="technology-logo"
                  style={{
                    backgroundColor: color,
                    maskImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icons/${icon}.svg)`,
                    WebkitMaskImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icons/${icon}.svg)`,
                  }}
                  aria-hidden="true"
                />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {!compact && (
        <section className="approach-section py-24 md:py-32">
          <div className="approach-section__inner">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <Reveal>
                <p className="text-xl font-medium text-brand md:text-2xl">My Approach</p>
                <h2 className="mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-bold leading-[1.08] tracking-[-0.035em]">
                  Smart Strategy
                  <br />
                  Clean Code
                  <br />
                  Meaningful Growth
                </h2>
              </Reveal>

              <Reveal delay={100} className="md:pt-3">
                <p className="text-[clamp(1.2rem,1.9vw,1.6rem)] font-medium leading-snug tracking-[-0.015em]">
                  I combine product thinking, design, and full-stack engineering to help your
                  business grow sustainably.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                  <p className="text-sm leading-snug text-muted-foreground">
                    Let&apos;s build your
                    <br />
                    product together
                  </p>
                  <PillButton href="/contact" variant="green">
                    Get in touch
                  </PillButton>
                </div>
              </Reveal>
            </div>

            <div className="mt-16 grid gap-5 md:mt-20 md:grid-cols-3">
              {CAPABILITIES.map(({ title, text }, index) => (
                <Reveal key={title} delay={index * 80}>
                  <article className="feature-card">
                    <ApproachVisual variant={index} />
                    <div className="p-6">
                      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
