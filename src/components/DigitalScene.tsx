"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Pause, Play } from "lucide-react";

export default function DigitalScene() {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--scene-x",
      `${((event.clientY - bounds.top) / bounds.height - 0.5) * -8}deg`,
    );
    event.currentTarget.style.setProperty(
      "--scene-y",
      `${((event.clientX - bounds.left) / bounds.width - 0.5) * 10}deg`,
    );
  }

  function resetPointer() {
    container.current?.style.setProperty("--scene-x", "0deg");
    container.current?.style.setProperty("--scene-y", "0deg");
  }

  return (
    <div
      ref={container}
      className="digital-scene"
      data-running={visible && !paused}
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="digital-scene__art" aria-hidden="true">
        <div className="digital-scene__halo" />
        <div className="digital-scene__tilt">
          <div className="digital-scene__assembly">
            <div className="digital-scene__layer digital-scene__layer--base">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="digital-scene__layer digital-scene__layer--data">
              <div className="scene-database">
                <i />
                <i />
                <i />
              </div>
              <div className="scene-data-lines">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="digital-scene__layer digital-scene__layer--interface">
              <div className="scene-toolbar">
                <i />
                <i />
                <i />
                <span />
              </div>
              <div className="scene-interface">
                <div className="scene-code">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="scene-preview">
                  <i />
                  <span />
                  <span />
                </div>
              </div>
            </div>
            <span className="scene-connector scene-connector--one" />
            <span className="scene-connector scene-connector--two" />
          </div>
        </div>
      </div>
      <div className="digital-scene__caption">
        <span>Design. Develop. Connect.</span>
        <button
          type="button"
          className="digital-scene__toggle"
          aria-label={paused ? "Play decorative animation" : "Pause decorative animation"}
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
