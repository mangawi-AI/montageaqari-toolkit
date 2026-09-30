# MontageAqari Broker Toolkit

## What I’ll build
- A mobile-first, bilingual toolkit at the home page with the exact MontageAqari navy, gold, paper, and typography system.
- A sticky bilingual wordmark header, in-memory system-aware theme switch, two full-width tabs, and a restrained credit footer.
- A live broker-fee calculator with comma-friendly decimal inputs, quick percentage choices, bilingual validation, formatted results, and clipboard feedback.
- A quote/invoice generator with editable fields, automatic date/document number, bilingual validation, a faithful live A4 preview, and branded PDF download.

## PDF approach
- Render the same styled A4 document shown in the live preview to a high-resolution canvas after fonts finish loading, then place it into an A4 PDF.
- This preserves joined Arabic text, right-to-left layout, mixed Arabic/English content, and works through a normal browser download on mobile.
- The exported filename will follow `MontageAqari_Quote_MA-2026-001.pdf` or the invoice equivalent.

## Quality and verification
- Use semantic design tokens and existing shadcn controls, with 44px touch targets, visible focus, and layouts checked at 360px and desktop widths.
- Add route-specific title, description, Open Graph, and Twitter metadata without a favicon entry.
- Verify calculator edge cases, disabled/enabled PDF states, theme switching, clipboard output, and Arabic rendering in both preview and a downloaded PDF.
- Replace the root README with concise setup, feature, privacy, technology, and credit details.

## Technical details
- React 19, TanStack Start, Tailwind CSS v4, shadcn/ui, React Hook Form, and Zod.
- `html2canvas` and `jsPDF` will be used only for local browser-side document export; no information leaves the device.
- Theme selection remains in React state for the current page session only and defaults to the operating system preference.
