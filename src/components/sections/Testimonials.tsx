"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

// Placeholder testimonials — replace with real client quotes when available.
const QUOTES = [
  {
    quote:
      "Ghulam understood what we were trying to achieve and turned the idea into something we could actually use.",
    author: "Client / Founder",
    note: "Placeholder testimonial",
  },
  {
    quote:
      "The process was clear from the first conversation, and the final product made our business easier to explain.",
    author: "Client / Business Owner",
    note: "Placeholder testimonial",
  },
  {
    quote:
      "He asked the right questions before writing a single line of code — that changed the outcome completely.",
    author: "Client / Product Lead",
    note: "Placeholder testimonial",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const q = QUOTES[i]!;
  const go = (d: number) => setI((v) => (v + d + QUOTES.length) % QUOTES.length);

  return (
    <section className="border-t border-border py-24 md:py-40">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="label-xs">08 — Social proof</p>
        </Reveal>

        <Reveal delay={80}>
          <figure className="mt-14 md:mt-24">
            <blockquote
              key={i}
              className="reveal max-w-[22ch] text-[clamp(1.9rem,5.2vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.05em] md:max-w-[20ch]"
            >
              <span className="text-outline">&ldquo;</span>
              {q.quote}
              <span className="text-outline">&rdquo;</span>
            </blockquote>
            <figcaption className="mt-12 flex flex-wrap items-end justify-between gap-8 border-t border-border pt-8">
              <div>
                <p className="text-base font-medium tracking-[-0.02em]">{q.author}</p>
                <p className="label-xs mt-2">{q.note}</p>
              </div>

              <div className="flex items-center gap-8">
                <span className="text-sm tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} / {String(QUOTES.length).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={() => go(-1)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={() => go(1)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
