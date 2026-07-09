# Smasduq Portfolio

Next.js portfolio built with the App Router, deployed on Vercel.

## Local development

```bash
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

> Do not open HTML files directly from the folder. This is a Next.js app — it must run through the dev server.

### Production preview (optional)

```bash
npm run preview
```

Then open **http://localhost:3000**.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Next.js — no extra configuration required.
4. Deploy.

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Project structure

```
app/
  layout.js          # Root layout + global styles
  page.js            # Home page
  globals.css        # Global CSS
  projects/page.js # Projects page
components/          # Reusable UI components
public/              # Static assets (images, etc.)
data/                # Shared content data
```
