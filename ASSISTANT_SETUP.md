# Portfolio assistant

The website stays statically exported. A small Cloudflare Worker calls Gemini; no database or server to manage. The UI is lazy-loaded when opened, supports local FAQ fallback, and collects project briefs entirely in the browser. It never submits a contact form automatically.

## Connect Gemini

1. Create a Gemini API key in Google AI Studio and restrict it to the Gemini API. Never paste it in chat, commit it, or prefix it with NEXT_PUBLIC.
2. Review `serverless/wrangler.jsonc`. Set ALLOWED_ORIGINS to your exact website origins (no paths/trailing slashes). Remove localhost origins for production if not needed. Set GEMINI_MODEL to an available text model in your AI Studio account (default: gemini-3.5-flash-lite; model availability can change).
3. From the project root, authenticate and set the secret:

```powershell
npx wrangler login
npx wrangler secret put GEMINI_API_KEY --config serverless/wrangler.jsonc
npx wrangler deploy --config serverless/wrangler.jsonc
```

4. In `.env.local`, set the PUBLIC endpoint URL, not the secret:

```dotenv
NEXT_PUBLIC_ASSISTANT_URL=https://saqlain-portfolio-assistant.YOUR-SUBDOMAIN.workers.dev/chat
```

Restart `npm run dev`. For static production hosting, set this variable in the build environment and rebuild/redeploy. GitHub Pages cannot run the proxy itself; it calls the separately hosted Worker. If using GitHub Actions, pass a repository variable named NEXT_PUBLIC_ASSISTANT_URL in the build step.

## Local Worker development

Create `serverless/.dev.vars` (gitignored) containing `GEMINI_API_KEY=...`. Then run:

```powershell
npx wrangler dev --config serverless/wrangler.jsonc
```

Use the displayed local Worker address plus `/chat` as NEXT_PUBLIC_ASSISTANT_URL. Do not use this HTTP endpoint in a public HTTPS site.

## Behavior and limits

- Common questions work without a key. AI questions are sent to Google Gemini only when an endpoint is configured; the widget tells visitors this.
- Guided brief answers never enter AI history. Only when the visitor chooses Fill contact form is the draft saved to sessionStorage, consumed by the contact page, and removed. The visitor adds contact details, reviews and explicitly sends using the existing contact form/Supabase integration.
- Widget contents are rendered as plain text, never HTML. Closing the widget clears the conversation and cancels requests.
- Origin allowlist, bounded JSON requests, fixed server-side instructions, timeouts and rate-limit bindings protect the proxy. Origin checks are not authentication. Cloudflare rate limits are approximate and location-local, not a hard spending cap. Set provider quotas/budget alerts and review usage before sharing widely.
- No chatbot conversation database or application logging of visitor text is implemented. Cloudflare/Google may process request data under their service policies.
- Update verified information in `src/lib/assistant-knowledge.mjs` when projects/services change. AI can make mistakes; pricing, availability and deadlines require direct confirmation.

## Validation

```powershell
node --test tests/assistant.test.mjs
npm run build
```

Mocked proxy tests do not call Gemini. A real live AI response requires your secret and a deployed or locally running Worker.

Official references: https://ai.google.dev/gemini-api/docs/api-key , https://ai.google.dev/api/generate-content , https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
