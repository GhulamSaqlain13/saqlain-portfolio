"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li" | "section";
};

// Share one observer across all sections and reveal before they reach the viewport.
let observer: IntersectionObserver | undefined;
let observed = 0;

export default function Reveal({ children, className = "", as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    if (element.getBoundingClientRect().top <= window.innerHeight + 600) return;
    observer ??= new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: "600px 0px" },
    );
    element.classList.remove("is-visible");
    observer.observe(element);
    observed++;
    return () => {
      observer?.unobserve(element);
      if (--observed === 0) {
        observer?.disconnect();
        observer = undefined;
      }
    };
  }, []);
  const Tag = as as "div";
  return (
    <Tag
      ref={ref}
      className={`reveal-on-scroll is-visible ${className}`}
    >
      {children}
    </Tag>
  );
}
