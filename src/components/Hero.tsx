"use client";

import Navbar, { PillButton } from "@/components/Navbar";
import Link from "next/link";
import portrait from "@/assets/me-Photoroom.png";

const FOCUS = ["Business Websites", "Web Applications", "E-Commerce", "MVP Development"];

export default function Hero({ services = false }: { services?: boolean }) {
  return (
    <div id="top" className="hero-card relative">
      <Navbar />

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

        <div className="hero-portrait-frame">
          <img
            src={portrait.src}
            fetchPriority="high"
            decoding="async"
            alt="Portrait of Ghulam Saqlain"
            width={portrait.width}
            height={portrait.height}
            className="hero-portrait"
          />
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
