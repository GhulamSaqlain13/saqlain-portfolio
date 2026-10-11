"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
];

export function PillButton({
  href,
  children,
  variant = "light",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "light" | "green";
  className?: string;
}) {
  return (
    <Link href={href} className={`pill-btn pill-btn--${variant} ${className}`}>
      <span>{children}</span>
      <span className="pill-btn__icon" aria-hidden="true">
        <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname()?.replace(/\/+$/, "") || "/";
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header relative z-30 w-full px-6 pt-6 md:px-10 md:pt-8">
      <nav aria-label="Main navigation" className="flex items-center justify-between gap-4">
        <Logo />

        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.to}
                  aria-current={pathname === link.to ? "page" : undefined}
                  className="nav-link text-sm text-white/85 aria-[current=page]:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <PillButton href="/contact">Get in touch</PillButton>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          ref={menuButton}
          aria-controls="mobile-navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 text-white md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-navigation"
          className="mobile-navigation mt-5 rounded-3xl border border-white/15 bg-black/40 p-5 backdrop-blur-md md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.to}
                  aria-current={pathname === link.to ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="block text-lg font-medium tracking-tight text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <PillButton href="/contact" className="mt-5">
            Get in touch
          </PillButton>
        </div>
      )}
    </header>
  );
}
