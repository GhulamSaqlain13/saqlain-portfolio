"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Pause, Play } from "lucide-react";

const TARGETS = ".work-preview, .service-card, .skill-card, .feature-card, .about-portrait-frame";

export default function SiteMotion() {
  const pathname = usePathname();
  const [paused, setPaused] = useState(false);
  const atmosphere = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const root = document.documentElement;
    let cleanup = () => {};

    function configure() {
      cleanup();
      const enabled = !paused && !reduced.matches && !document.hidden;
      root.dataset["siteMotion"] = enabled ? "on" : "off";
      if (!enabled) return;

      let frame = 0;
      let pointerFrame = 0;
      let active: HTMLElement | null = null;
      const visible = new Set<HTMLElement>();
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visible.add(entry.target as HTMLElement);
            else visible.delete(entry.target as HTMLElement);
          }
          requestUpdate();
        },
        { rootMargin: "80px" },
      );
      const targets = Array.from(document.querySelectorAll<HTMLElement>(TARGETS));
      targets.forEach((target) => observer.observe(target));

      function update() {
        frame = 0;
        const viewport = window.innerHeight;
        const travel = window.scrollY;
        // Read all card positions before writing styles to avoid repeated layout flushes.
        const positions = Array.from(visible, (element) => {
          const bounds = element.getBoundingClientRect();
          const position = Math.max(
            -1,
            Math.min(1, (bounds.top + bounds.height / 2 - viewport / 2) / viewport),
          );
          return { element, position };
        });
        atmosphere.current?.style.setProperty("--travel", `${travel * 0.025}deg`);
        for (const { element, position } of positions) {
          element.style.setProperty("--scroll-lift", `${position * (coarse.matches ? 6 : 18)}px`);
          element.style.setProperty("--scroll-turn", `${position * (coarse.matches ? 1 : 3)}deg`);
        }
      }
      function requestUpdate() {
        if (!frame) frame = requestAnimationFrame(update);
      }
      function resetActive() {
        active?.style.setProperty("--tilt-x", "0deg");
        active?.style.setProperty("--tilt-y", "0deg");
        active = null;
      }
      function move(event: PointerEvent) {
        if (event.pointerType !== "mouse" || coarse.matches) return;
        const card = (event.target as Element).closest<HTMLElement>(TARGETS);
        if (card !== active) {
          resetActive();
          active = card;
        }
        if (!card) return;
        cancelAnimationFrame(pointerFrame);
        const { clientX, clientY } = event;
        pointerFrame = requestAnimationFrame(() => {
          const bounds = card.getBoundingClientRect();
          const x = (clientX - bounds.left) / bounds.width - 0.5;
          const y = (clientY - bounds.top) / bounds.height - 0.5;
          card.style.setProperty("--tilt-x", `${y * -5}deg`);
          card.style.setProperty("--tilt-y", `${x * 7}deg`);
        });
      }
      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate);
      document.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerleave", resetActive);
      requestUpdate();
      cleanup = () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
        cancelAnimationFrame(pointerFrame);
        resetActive();
        window.removeEventListener("scroll", requestUpdate);
        window.removeEventListener("resize", requestUpdate);
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerleave", resetActive);
        targets.forEach((target) => {
          target.style.removeProperty("--scroll-lift");
          target.style.removeProperty("--scroll-turn");
        });
      };
    }
    configure();
    reduced.addEventListener("change", configure);
    document.addEventListener("visibilitychange", configure);
    return () => {
      cleanup();
      reduced.removeEventListener("change", configure);
      document.removeEventListener("visibilitychange", configure);
      delete root.dataset["siteMotion"];
    };
  }, [pathname, paused]);

  return (
    <>
      <div className="motion-atmosphere" ref={atmosphere} aria-hidden="true">
        <div className="motion-scroll-progress" />
        <div className="ambient-scene">
          <div className="ambient-light ambient-light--one" />
          <div className="ambient-light ambient-light--two" />
          <div className="ambient-grid">
            <div />
          </div>
          {["one", "two"].map((variant) => (
            <div className={`ambient-orb ambient-orb--${variant}`} key={variant}>
              <div className="ambient-orb__spin">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          ))}
          {[0, 1, 2, 3, 4].map((index) => (
            <div className={`ambient-plane ambient-plane--${index}`} key={index}>
              <span />
              <span />
              <span />
            </div>
          ))}
          {Array.from({ length: 14 }, (_, index) => (
            <i
              className="ambient-particle"
              key={index}
              style={{
                left: `${(index * 37 + 13) % 100}%`,
                top: `${(index * 23 + 7) % 100}%`,
                animationDelay: `${index * -1.7}s`,
              }}
            />
          ))}
        </div>
      </div>{" "}
      <button
        type="button"
        className="motion-toggle"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        aria-label={paused ? "Enable site 3D motion" : "Pause site 3D motion"}
      >
        {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
        <span>3D motion</span>
      </button>
    </>
  );
}
