"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import AssistantOrb from "./AssistantOrb";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Loader2, Send, X } from "lucide-react";
import { DRAFT_KEY, localAnswer, makeBrief } from "@/lib/assistant-knowledge.mjs";

type Message = { role: "user" | "model"; text: string };
const STEPS = [
  {
    key: "type",
    question: "What would you like to build?",
    choices: ["Business website", "Web application", "Shopify store", "Chrome extension", "MVP"],
  },
  { key: "goal", question: "What should this project help your business achieve?" },
  { key: "features", question: "What are the most important features or pages?" },
  { key: "budget", question: "Do you have a budget range? You can say 'To discuss'." },
  { key: "timeline", question: "When would you like it ready? You can say 'Flexible'." },
];
const ENDPOINT = process.env.NEXT_PUBLIC_ASSISTANT_URL || "";

export default function AssistantPanel({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hi, I’m Saqlain’s portfolio assistant. Ask about his work, or let’s turn your idea into a project brief.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [step, setStep] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const request = useRef<AbortController | null>(null);
  const aiHistory = useRef<Message[]>([]);
  useEffect(() => {
    inputRef.current?.focus();
    return () => {
      const pending = request.current;
      request.current = null;
      pending?.abort();
    };
  }, []);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy, ready]);

  function startBrief() {
    if (busy) return;
    setAnswers({});
    setReady(false);
    setStep(0);
    setNotice("");
    setMessages((items) => [
      ...items,
      {
        role: "model",
        text:
          "Let’s prepare a short project brief. Your answers stay in this browser and aren’t sent to Gemini. " +
          STEPS[0]!.question,
      },
    ]);
    inputRef.current?.focus();
  }
  async function send(text: string) {
    const value = text.trim().slice(0, 1500);
    if (!value || busy) return;
    setInput("");
    setNotice("");
    const next: Message[] = [...messages, { role: "user", text: value }];
    setMessages(next);
    if (step !== null) {
      const collected = { ...answers, [STEPS[step]!.key]: value };
      setAnswers(collected);
      if (step + 1 < STEPS.length) {
        setStep(step + 1);
        setMessages([...next, { role: "model", text: STEPS[step + 1]!.question }]);
      } else {
        setStep(null);
        setReady(true);
        setMessages([
          ...next,
          {
            role: "model",
            text: "Your draft is ready below. Review it, then choose Fill contact form. You can edit it there before sending. Nothing has been submitted.",
          },
        ]);
      }
      return;
    }
    if (!ENDPOINT) {
      setMessages([...next, { role: "model", text: localAnswer(value) }]);
      return;
    }
    setBusy(true);
    const controller = new AbortController();
    request.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 25000);
    try {
      // Project-brief answers never enter model history.
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...aiHistory.current.slice(-8), { role: "user", text: value }],
        }),
        signal: controller.signal,
      });
      if (!response.ok)
        throw new Error(
          response.status === 429
            ? "Too many questions. Please wait a minute."
            : "AI is temporarily unavailable.",
        );
      const data: { reply?: unknown } = await response.json();
      if (typeof data.reply !== "string" || !data.reply.trim())
        throw new Error("AI is temporarily unavailable.");
      aiHistory.current = [
        ...aiHistory.current.slice(-8),
        { role: "user", text: value },
        { role: "model", text: data.reply.slice(0, 1500) },
      ];
      setMessages((items) => [...items, { role: "model", text: data.reply as string }]);
    } catch (error) {
      if (!controller.signal.aborted || request.current === controller) {
        setNotice(
          (error instanceof Error && error.name !== "AbortError"
            ? error.message
            : "AI took too long to respond.") + " Showing a local FAQ answer instead.",
        );
        setMessages((items) => [...items, { role: "model", text: localAnswer(value) }]);
      }
    } finally {
      clearTimeout(timeout);
      setBusy(false);
      request.current = null;
    }
  }
  function fillContact() {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(makeBrief(answers)));
      window.dispatchEvent(new Event("portfolio:brief"));
      router.push("/contact?brief=1");
      onClose();
    } catch {
      setNotice(
        "Your browser could not save the draft. Copy the text below into the contact form.",
      );
    }
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    void send(input);
  }
  const current = step === null ? undefined : STEPS[step];
  return (
    <section
      ref={panelRef}
      id="portfolio-assistant"
      className="assistant-panel"
      role="dialog"
      aria-modal="false"
      aria-labelledby="assistant-heading"
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
    >
      <header className="assistant-header">
        <span className="assistant-avatar">
          <AssistantOrb active={busy} />
        </span>
        <div>
          <h2 id="assistant-heading">A little help, right here.</h2>
          <p>Saqlain’s portfolio assistant</p>
        </div>
        <button
          type="button"
          className="assistant-icon"
          onClick={onClose}
          aria-label="Close assistant"
        >
          <X size={19} />
        </button>
      </header>
      <div className="assistant-actions">
        <button type="button" onClick={startBrief} disabled={busy}>
          Plan my project <ArrowUpRight size={13} />
        </button>
        <Link href="/work" onClick={onClose}>
          Explore work
        </Link>
        <Link href="/contact" onClick={onClose}>
          Contact
        </Link>
      </div>
      <div
        ref={scrollRef}
        className="assistant-messages"
        role="log"
        aria-label="Conversation"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.map((message, index) => (
          <div key={index} className={`assistant-message assistant-message--${message.role}`}>
            <small>{message.role === "user" ? "You" : "Assistant"}</small>
            <p>{message.text}</p>
          </div>
        ))}
        {busy && (
          <p className="assistant-thinking" role="status">
            <Loader2 size={14} className="animate-spin" /> Thinking…
          </p>
        )}
        {ready && (
          <div className="assistant-brief">
            <h3>Your project brief</h3>
            <pre>{makeBrief(answers).message}</pre>
            <button type="button" onClick={fillContact}>
              Fill contact form <ArrowUpRight size={15} />
            </button>
            <button type="button" className="assistant-restart" onClick={startBrief}>
              Start again
            </button>
          </div>
        )}
      </div>
      {notice && (
        <p className="assistant-notice" role="status">
          {notice}
        </p>
      )}
      <div className="assistant-suggestions">
        {current?.choices
          ? current.choices.map((choice) => (
              <button key={choice} type="button" onClick={() => void send(choice)}>
                {choice}
              </button>
            ))
          : step === null &&
            !ready &&
            ["What can you build?", "Tell me about projects", "How much does it cost?"].map(
              (question) => (
                <button
                  key={question}
                  type="button"
                  disabled={busy}
                  onClick={() => void send(question)}
                >
                  {question}
                </button>
              ),
            )}
        {step !== null && (
          <button
            type="button"
            onClick={() => {
              setStep(null);
              setAnswers({});
              setMessages((items) => [
                ...items,
                { role: "model", text: "Project planning cancelled. What would you like to know?" },
              ]);
            }}
          >
            Cancel brief
          </button>
        )}
      </div>
      <form className="assistant-input" onSubmit={submit}>
        <label className="sr-only" htmlFor="assistant-question">
          {current?.question || "Your question"}
        </label>
        <input
          ref={inputRef}
          id="assistant-question"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength={1500}
          placeholder={step === null ? "Ask about a project or service…" : "Your answer…"}
          autoComplete="off"
          disabled={busy}
        />
        <button type="submit" disabled={busy || !input.trim()} aria-label="Send message">
          <Send size={17} />
        </button>
      </form>
      <p className="assistant-disclosure">
        {step !== null || ready
          ? "Your brief stays local until you choose to send the contact form."
          : ENDPOINT
            ? "AI replies can be inaccurate. Questions are sent to Google Gemini. Don’t share sensitive details."
            : "Answers from this portfolio. Confirm project details directly with Saqlain."}
      </p>
    </section>
  );
}
