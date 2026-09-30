# MontageAqari Broker Toolkit

A small, bilingual toolkit for Saudi real-estate brokers. It includes a live broker fee calculator and a branded quote/invoice PDF generator.

Everything runs in the browser. Client and billing information is never sent to a server or stored by the app.

**Live demo:** https://montageaqari-toolkit.lovable.app

## Features

- Saudi broker fee calculations with comma-friendly decimal inputs
- Branded bilingual quote and invoice previews
- Arabic-safe A4 PDF downloads
- Light and dark themes that follow the current device by default

## Run locally

Node.js and npm are required.

```sh
npm install
npm run dev
```

If you use bun, `bun install` and `bun run dev` also work.

## Tech stack

- React, TypeScript, and TanStack Start
- Tailwind CSS and shadcn/ui
- React Hook Form and Zod
- html-to-image and jsPDF

By Mohsen Sami Angawi.
