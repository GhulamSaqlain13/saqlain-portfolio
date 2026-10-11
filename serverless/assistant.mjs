import { SYSTEM_PROMPT } from "../src/lib/assistant-knowledge.mjs";

const MAX_BODY = 24000;
async function readBody(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Empty body");
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) {
        await reader.cancel();
        throw new Error("Body too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGINS || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    if (!origin || !allowed.includes(origin)) return new Response("Forbidden", { status: 403 });
    const headers = {
      "Access-Control-Allow-Origin": origin,
      Vary: "Origin",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    };
    const json = (body, status = 200) => Response.json(body, { status, headers });
    if (new URL(request.url).pathname !== "/chat") return json({ error: "Not found" }, 404);
    if (request.method === "OPTIONS")
      return new Response(null, {
        status: 204,
        headers: {
          ...headers,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "3600",
        },
      });
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
    if (!request.headers.get("Content-Type")?.includes("application/json"))
      return json({ error: "Expected JSON" }, 415);
    if (Number(request.headers.get("Content-Length")) > MAX_BODY)
      return json({ error: "Request too large" }, 413);
    if (!env.GEMINI_API_KEY || !env.GEMINI_MODEL || !env.CHAT_LIMITER)
      return json({ error: "Assistant is not configured" }, 503);
    let body;
    try {
      body = await readBody(request);
    } catch {
      return json({ error: "Invalid or oversized request" }, 400);
    }
    const messages = body?.messages;
    if (
      !Array.isArray(messages) ||
      messages.length < 1 ||
      messages.length > 12 ||
      messages.at(-1)?.role !== "user" ||
      messages.some(
        (message) =>
          !message ||
          !["user", "model"].includes(message.role) ||
          typeof message.text !== "string" ||
          !message.text.trim() ||
          message.text.length > 1500,
      )
    )
      return json({ error: "Invalid conversation" }, 400);
    try {
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const perVisitor = await env.CHAT_LIMITER.limit({ key: `visitor:${ip}` });
      const siteWide = env.SITE_LIMITER
        ? await env.SITE_LIMITER.limit({ key: "all-visitors" })
        : { success: true };
      if (!perVisitor.success || !siteWide.success)
        return json({ error: "Please wait before asking another question" }, 429);
      const upstream = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(env.GEMINI_MODEL)}:generateContent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: messages.map((message) => ({
              role: message.role,
              parts: [{ text: message.text }],
            })),
            generationConfig: { temperature: 0.35, maxOutputTokens: 700 },
          }),
          signal: AbortSignal.timeout(20000),
        },
      );
      if (!upstream.ok)
        return json(
          { error: "AI is temporarily unavailable" },
          upstream.status === 429 ? 429 : 502,
        );
      const data = await upstream.json();
      const reply = data.candidates?.[0]?.content?.parts
        ?.filter((part) => !part.thought && typeof part.text === "string")
        .map((part) => part.text)
        .join("\n")
        .trim();
      if (!reply) return json({ error: "No answer available" }, 502);
      return json({ reply: reply.slice(0, 6000) });
    } catch {
      return json({ error: "AI is temporarily unavailable" }, 502);
    }
  },
};
