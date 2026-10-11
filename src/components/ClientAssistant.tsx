"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import AssistantOrb from "./AssistantOrb";

const AssistantPanel = dynamic(() => import("./AssistantPanel"), {
  ssr: false,
  loading: () => (
    <div className="assistant-loading" role="status">
      Opening assistant…
    </div>
  ),
});

export default function ClientAssistant() {
  const [open, setOpen] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  return (
    <>
      {open && (
        <AssistantPanel
          onClose={() => {
            setOpen(false);
            launcher.current?.focus();
          }}
        />
      )}
      <button
        ref={launcher}
        type="button"
        className="assistant-launcher"
        aria-expanded={open}
        aria-controls="portfolio-assistant"
        aria-label={open ? "Close portfolio assistant" : "Ask the portfolio assistant"}
        onClick={() => setOpen(!open)}
      >
        <AssistantOrb active={open} />
        <span>Ask me</span>
      </button>
    </>
  );
}
