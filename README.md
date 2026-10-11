# Ghulam Saqlain Portfolio

A portfolio and business website for a full-stack developer focused on building digital products that solve real business problems.

## Tech stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Supabase for contact form submissions

## Requirements

- Node.js 20.9 or newer
- npm

## Local development

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The portfolio pages run without environment variables. To enable contact form submissions, copy `.env.example` to `.env.local` and fill in the public URL and anon key from your Supabase project. The Supabase project needs a `contacts` table that accepts the fields submitted by the form.

## Production build

```bash
npm run build
```

The build statically exports the site to `out/` for deployment to a static host such as GitHub Pages. `NEXT_PUBLIC_BASE_PATH` can be set at build time when the site is served from a subpath (the GitHub Pages workflow sets it for this repository).

## Routes

- `/` — Home
- `/about` — About
- `/services` — Services
- `/work` — Work
- `/contact` — Contact
