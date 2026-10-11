"use client";

import { useEffect, useRef } from "react";
import Navbar, { PillButton } from "@/components/Navbar";
import Link from "next/link";
import portrait from "@/assets/me-Photoroom.png";

const FOCUS = ["Business Websites", "Web Applications", "E-Commerce", "MVP Development"];

function useParallax() {
  const portraitRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const onMove = (event: MouseEvent) => {
      x = event.clientX / window.innerWidth - 0.5;
      y = event.clientY / window.innerHeight - 0.5;
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          if (portraitRef.current)
            portraitRef.current.style.transform = `translate3d(calc(-50% + ${x * 10}px), ${y * 6}px, 0)`;
        });
    };
    const hero = portraitRef.current?.parentElement;
    hero?.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      hero?.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  return portraitRef;
}
export default function Hero({ services = false }: { services?: boolean }) {
  const portraitRef = useParallax();

  return (
    <div id="top" className="hero-card relative">
      <Navbar />

      <img
        ref={portraitRef}
        src={portrait.src}
        fetchPriority="high"
        decoding="async"
        alt="Portrait of Ghulam Saqlain"
        width={1024}
        height={1280}
        className="hero-portrait parallax"
        style={{ transform: "translate3d(-50%, 0, 0)" }}
      />

      <section className="hero-content relative z-10">
        <div>
          <p
            className="reveal text-xl font-medium text-white/90 md:text-2xl"
            style={{ animationDelay: "60ms" }}
          >
            {services ? "Built for your next chapter" : "Hey, I am Saqlain"}
          </p>
          <h1 className="reveal hero-title mt-5 text-white" style={{ animationDelay: "140ms" }}>
            {services ? "Digital" : "Full-Stack"}
            <br />
            {services ? "Solutions." : "Product"}
            <br />
            {services ? "Real Impact." : "Developer"}
          </h1>
        </div>

        <div className="reveal hero-description" style={{ animationDelay: "260ms" }}>
          <p className="text-2xl font-semibold leading-tight tracking-tight text-white">
            I turn ideas into
            <br />
            {services ? "business growth." : "working products."}
          </p>
          <p className="mt-5 text-sm leading-relaxed text-white/65">
            Fast, modern, conversion-focused websites and web apps that solve real business
            problems.
          </p>
          <div className="hero-actions">
            <PillButton href="/contact">Discuss your project</PillButton>
            <Link href="/work" className="hero-work-link">
              Explore my work <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <ol
        className="hero-focus reveal relative z-10 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4"
        style={{ animationDelay: "360ms" }}
      >
        {FOCUS.map((item, i) => (
          <li key={item}>
            <span className="text-sm font-medium text-white">
              <span className="text-brand-soft">#</span>
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 text-sm text-white/85">{item}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
