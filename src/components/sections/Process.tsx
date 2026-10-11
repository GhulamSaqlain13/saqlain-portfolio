"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

const STAGES = [
  { n: "01", title: "Understand", text: "What are we actually trying to solve?" },
  { n: "02", title: "Define", text: "Turn the idea into a clear digital strategy." },
  { n: "03", title: "Build", text: "Design and develop the actual product." },
  { n: "04", title: "Refine", text: "Test, improve, optimize, and remove friction." },
  { n: "05", title: "Launch", text: "Put the product in front of real people." },
];

function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.6;
      const passed = vh * 0.8 - rect.top;
      setProgress(Math.min(1, Math.max(0, passed / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { ref, progress };
}

export default function Process() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <section id="process" className="border-t border-border py-24 md:py-40">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="label-xs">How we will work</p>
          <h2 className="mt-8 max-w-[14ch] text-[clamp(2.6rem,7vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.05em]">
            From problem to <span className="text-outline">product.</span>
          </h2>
          <p className="mt-8 text-base text-muted-foreground">
            A simple process. A serious approach.
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-20 md:mt-32">
          <div className="absolute left-[7px] top-0 h-full w-px bg-border md:left-1/2" />
          <div
            className="absolute left-[7px] top-0 w-px origin-top bg-foreground md:left-1/2"
            style={{ height: `${progress * 100}%` }}
          />
          <span
            className="absolute left-[3px] h-2.5 w-2.5 rounded-full bg-accent md:left-1/2 md:-translate-x-1/2"
            style={{ top: `calc(${progress * 100}% - 5px)` }}
            aria-hidden="true"
          />

          <ol className="space-y-20 md:space-y-32">
            {STAGES.map((s, i) => (
              <Reveal as="li" key={s.n} delay={40}>
                <div
                  className={`grid grid-cols-[auto_minmax(0,1fr)] gap-x-8 md:grid-cols-2 md:gap-x-24 ${
                    i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  <div
                    className={`md:pr-0 ${i % 2 === 0 ? "md:text-right" : "md:col-start-2 md:text-left"}`}
                  >
                    <span className="text-[clamp(3rem,9vw,8rem)] font-bold leading-none tracking-[-0.06em] text-outline">
                      {s.n}
                    </span>
                  </div>
                  <div
                    className={`self-center ${i % 2 === 0 ? "md:col-start-2" : "md:col-start-1 md:row-start-1 md:text-right"}`}
                  >
                    <h3 className="text-[clamp(1.7rem,3.4vw,3rem)] font-bold leading-none tracking-[-0.04em]">
                      {s.title}
                    </h3>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
                      {s.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
