# Agent Guidelines & Engineering Standards

This document establishes the design principles, architectural conventions, and component selection rules for AI agents working in this repository.

---

## 1. Component Selection: Do Not Default to Cards

> **Core Directive**: Use proper semantic components for user interfaces. **Never dump everything inside a `<Card>` component.**

Match each UX pattern to its dedicated primitive:

| UI / UX Pattern | Recommended Primitive | Do NOT Use |
| :--- | :--- | :--- |
| **FAQs / Collapsible Q&As** | `<Accordion>` (`AccordionItem`, `AccordionTrigger`, `AccordionContent`) | Static card grids, boxed paragraphs |
| **Tabular Data / Telemetry** | `<Table>` (`TableHeader`, `TableRow`, `TableCell`) | Multiple nested cards |
| **Mode Switching / Scenarios** | `<Tabs>` (`TabsList`, `TabsTrigger`) or `<ToggleGroup>` | Raw loops of styled buttons |
| **Important Warnings / Invariants** | `<Alert>` (`AlertTitle`, `AlertDescription`) or semantic callout | Generic card containers |
| **Value Display / KPIs** | Metric blocks with clean typography | Over-bordered multi-nested cards |
| **Options (2–5 choices)** | `<ToggleGroup>` / segmented controls | Custom active state divs |

---

## 2. Surface & Color Hierarchy

- **Outermost Cards / Containers**: Prefer frameless outer boundaries (`border-0 ring-0`) unless an explicit window frame is needed (e.g., CLI terminal preview). Keep borders on inner interactive components and nested panels.
- **Elevation System**:
  - `bg-background`: Level 0 — Base canvas (darkest layer).
  - `bg-card`: Level 1 — Primary elevated surface.
  - `bg-secondary` / `bg-secondary/40-60`: Level 2 — Nested control bars, banners, sub-panels, and table headers.
  - `bg-accent`: Level 3 — Interactive controls, active chips, and focused surfaces.
- **No Low-Opacity Greys**: Avoid `bg-card/20` or `bg-card/30` on dark backgrounds as they collapse into indistinguishable flat black. Use explicit semantic tokens.

---

## 3. Typography & Hierarchy

- **Serif (`Instrument_Serif` / `var(--font-serif)` / `font-serif`)**: Display headings on landing / marketing sections (`.font-serif`) with high-fashion character and delicate italic accents. **Letter-spacing is centrally controlled by `--tracking-serif: 0.025em` in `global.css`. Never apply serif to Docs (`/docs`).**
- **Sans (`Geist` / `var(--font-sans)`)**: All documentation headings & body (`/docs`), narrative explanations, body copy, descriptions, buttons, and subtext.
- **Mono (`Geist_Mono` / `var(--font-mono)`)**: Health factors, financial amounts, gas numbers, NEV formulas, route codes (`/docs/specs`), terminal commands, and status pills (paired with `tabular-nums`).

---

## 4. Copywriting for Landing Pages vs. Docs

- **Landing Pages**: Keep copy punchy, concise, and scannable (1–2 sentences per takeaway). Focus on empirical results, value propositions, and interactive visualizers.
- **Docs Pages (`/docs`)**: Full mathematical derivations, architecture specifications, literature reviews, and research methodologies belong here, not on the home page.

---

## 5. Verification & Code Quality

- Always run `npx tsc --noEmit` directly to ensure zero TypeScript errors before concluding a task.
- Component filenames must use `kebab-case.tsx`.
- Follow strict shadcn composition rules (use subcomponents, avoid manual space-y/space-x, use gap-*).
