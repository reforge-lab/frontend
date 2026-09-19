"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Layers,
  Palette,
  Type,
  Component,
  ShieldCheck,
  ArrowRight,
  Copy,
  Check,
  Terminal,
  Activity,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Home,
  BookOpen,
} from "lucide-react";

interface ColorToken {
  name: string;
  variable: string;
  tailwind: string;
  hsl: string;
  hex: string;
  description: string;
  category: "surface" | "text" | "semantic";
}

const COLOR_TOKENS: ColorToken[] = [
  // Surface Hierarchy
  {
    name: "Background",
    variable: "--background",
    tailwind: "bg-background",
    hsl: "hsl(0 0% 4%)",
    hex: "#0a0a0a",
    description: "Level 0: Base viewport canvas (darkest layer).",
    category: "surface",
  },
  {
    name: "Card Surface",
    variable: "--card",
    tailwind: "bg-card",
    hsl: "hsl(0 0% 9.5%)",
    hex: "#18181b",
    description: "Level 1: Primary elevated container surface.",
    category: "surface",
  },
  {
    name: "Secondary Panel",
    variable: "--secondary",
    tailwind: "bg-secondary",
    hsl: "hsl(0 0% 14.5%)",
    hex: "#252528",
    description: "Level 2: Nested control bars, banners, table headers & badges.",
    category: "surface",
  },
  {
    name: "Accent / Active",
    variable: "--accent",
    tailwind: "bg-accent",
    hsl: "hsl(0 0% 18%)",
    hex: "#2e2e33",
    description: "Level 3: Active states, elevated chips, and interactive hover surfaces.",
    category: "surface",
  },
  // Text & Hairline
  {
    name: "Foreground",
    variable: "--foreground",
    tailwind: "text-foreground",
    hsl: "hsl(0 0% 95%)",
    hex: "#f2f2f2",
    description: "High-contrast primary headline and body text (15.5:1 ratio).",
    category: "text",
  },
  {
    name: "Muted Foreground",
    variable: "--muted-foreground",
    tailwind: "text-muted-foreground",
    hsl: "hsl(0 0% 64%)",
    hex: "#a1a1aa",
    description: "Secondary descriptions, subtitles, and non-critical metadata.",
    category: "text",
  },
  {
    name: "Border Hairline",
    variable: "--border",
    tailwind: "border-border",
    hsl: "hsla(0 0% 100% / 0.08)",
    hex: "rgba(255,255,255,0.08)",
    description: "Crisp 8% white hairline for component perimeters.",
    category: "text",
  },
  // Semantic Tokens
  {
    name: "Order-Fair (Emerald)",
    variable: "emerald-400 / 500",
    tailwind: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    hsl: "hsl(158 64% 52%)",
    hex: "#34d399",
    description: "Solvent positions, winning Reforge batch auctions, and preserved equity.",
    category: "semantic",
  },
  {
    name: "Warning (Amber)",
    variable: "amber-400 / 500",
    tailwind: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    hsl: "hsl(38 92% 50%)",
    hex: "#fbbf24",
    description: "Vulnerable loans, borderline health factor (1.0 < HF < 1.1), and mempool race.",
    category: "semantic",
  },
  {
    name: "Extraction / PGA (Rose)",
    variable: "rose-400 / 500",
    tailwind: "text-rose-400 bg-rose-500/10 border-rose-500/30",
    hsl: "hsl(351 95% 71%)",
    hex: "#fb7185",
    description: "PGA value extraction, reverted transactions, and borrower penalties.",
    category: "semantic",
  },
  {
    name: "Telemetry / Math (Cyan)",
    variable: "cyan-400 / 500",
    tailwind: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    hsl: "hsl(188 86% 53%)",
    hex: "#22d3ee",
    description: "Quantitative formulas, NEV scoring, and Monte Carlo telemetry.",
    category: "semantic",
  },
];

export default function DesignSystemPage() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Top Floating Island Header */}
      <header className="sticky top-3 z-50 max-w-5xl mx-auto px-4">
        <div className="rounded-full border border-border/80 bg-card/85 backdrop-blur-xl px-5 py-2.5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-bold tracking-tight text-foreground hover:text-primary transition-colors"
            >
              <div className="size-6 rounded-md bg-foreground text-background flex items-center justify-center font-mono text-xs font-black">
                R
              </div>
              <span>Reforge</span>
            </Link>
            <span className="text-muted-foreground/40">•</span>
            <span className="text-xs font-mono text-muted-foreground">Design Spec</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Home className="size-3.5" />
              <span>Landing Page</span>
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <BookOpen className="size-3.5" />
              <span>Docs</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-12 pb-24 space-y-20">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge
            variant="outline"
            className="gap-2 px-3 py-1 rounded-full border-primary/30 bg-primary/10 text-primary text-xs font-mono"
          >
            <Palette className="size-3.5" />
            <span>Agent Design System &amp; Elevation Spec</span>
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-normal font-serif text-foreground">
            Surface Elevation &amp; Color Hierarchy
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The canonical design specification for Reforge interfaces. This page serves as an
            interactive visual benchmark for human developers and autonomous AI agents to ensure
            uncompromising visual depth, contrast hierarchy, and semantic component selection.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: SURFACE ELEVATION STACK (LEVEL 0 -> LEVEL 4) */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border/60 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary font-semibold mb-1">
                <Layers className="size-3.5" />
                <span>SPEC 01</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal font-serif text-foreground">
                4-Level Surface Elevation Architecture
              </h2>
            </div>
            <p className="text-xs text-muted-foreground sm:text-right max-w-md">
              Eliminating flat black collapses by establishing strict luminance deltas between canvas, cards, sub-panels, and active controls.
            </p>
          </div>

          {/* Interactive Visual Nested Stack */}
          <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-background space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground border-b border-border/60 pb-3">
              <span>LEVEL 0: Base Canvas (`bg-background` • #0a0a0a)</span>
              <span className="text-emerald-400">Lightness: 4.0%</span>
            </div>

            {/* Level 1: Elevated Card */}
            <div className="p-5 sm:p-7 rounded-xl border border-border/70 bg-card space-y-5 shadow-md">
              <div className="flex items-center justify-between text-xs font-mono text-foreground border-b border-border/50 pb-2.5">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="size-2 rounded-full bg-primary" />
                  <span>LEVEL 1: Elevated Card Container (`bg-card` • #18181b)</span>
                </div>
                <span className="text-emerald-400">+5.5% Luminance Delta above Canvas</span>
              </div>

              {/* Level 2: Nested Sub-Panel / Control Bar */}
              <div className="p-4 sm:p-5 rounded-lg border border-border/60 bg-secondary space-y-4 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono text-foreground/90 border-b border-border/40 pb-2">
                  <span className="font-semibold">
                    LEVEL 2: Nested Control Bar / Sub-Panel (`bg-secondary` • #252528)
                  </span>
                  <span className="text-emerald-400">+5.0% Delta above Card</span>
                </div>

                {/* Level 3: Interactive Accent & Active Controls */}
                <div className="p-4 rounded-md border border-border/60 bg-accent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                  <div className="space-y-1">
                    <div className="text-xs font-mono font-semibold text-accent-foreground flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-primary" />
                      <span>LEVEL 3: Interactive Accent / Active Element (`bg-accent` • #2e2e33)</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Tactile interactive surface: active pills, segmented toggles, hover states, and popovers.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-background text-foreground border border-border">
                      Active State
                    </span>
                    <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary bg-primary/10">
                      +3.5% Delta
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: COLOR TOKEN MATRIX & CLICK-TO-COPY */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border/60 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary font-semibold mb-1">
                <Palette className="size-3.5" />
                <span>SPEC 02</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal font-serif text-foreground">
                Token Palette &amp; Contrast Specs
              </h2>
            </div>
            <p className="text-xs text-muted-foreground sm:text-right max-w-md">
              Click any token card to copy its Tailwind utility class or CSS custom property.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLOR_TOKENS.map((token) => (
              <div
                key={token.name}
                onClick={() => handleCopy(token.tailwind)}
                className="group p-4 rounded-xl border border-border/70 bg-card hover:border-border transition-all cursor-pointer shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="size-5 rounded-md border border-border/80 shadow-xs shrink-0"
                      style={{ backgroundColor: token.hex }}
                    />
                    <div>
                      <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                        <span>{token.name}</span>
                        {copiedToken === token.tailwind && (
                          <Check className="size-3 text-emerald-400 animate-in fade-in" />
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground">{token.tailwind}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[10px] font-mono shrink-0">
                    {token.category}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground leading-snug">{token.description}</p>

                <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-muted-foreground/80">
                  <span>{token.hex}</span>
                  <span className="group-hover:text-foreground transition-colors flex items-center gap-1">
                    <Copy className="size-3" />
                    <span>Copy</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: TYPOGRAPHY HIERARCHY */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border/60 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary font-semibold mb-1">
                <Type className="size-3.5" />
                <span>SPEC 03</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal font-serif text-foreground">
                Three-Axis Typography System
              </h2>
            </div>
            <p className="text-xs text-muted-foreground sm:text-right max-w-md">
              Clear distinction between Display Serif headings, Narrative Sans copy, and Technical Mono telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Serif */}
            <div className="p-5 rounded-xl border border-border/70 bg-card space-y-3">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
                  Display Serif
                </Badge>
                <span className="text-xs font-mono text-muted-foreground">Instrument Serif</span>
              </div>
              <div className="text-2xl sm:text-3xl font-normal font-serif text-foreground leading-tight">
                Order-fair liquidations
                <br />
                <span className="italic text-muted-foreground">for DeFi lending.</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Used exclusively on <code className="text-foreground">h1</code>, <code className="text-foreground">h2</code>, <code className="text-foreground">h3</code> headings. Centrally governed by <code className="text-foreground">--tracking-serif: 0.025em</code> (tracking-wide) in <code className="text-foreground">global.css</code>.
              </p>
            </div>

            {/* Sans */}
            <div className="p-5 rounded-xl border border-border/70 bg-card space-y-3">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <Badge variant="outline" className="text-[10px] font-mono">
                  Narrative Sans
                </Badge>
                <span className="text-xs font-mono text-muted-foreground">Geist Sans</span>
              </div>
              <div className="text-sm font-medium text-foreground space-y-1">
                <p>Replacing toxic Priority Gas Auctions with discrete batch auctions scored by Net Economic Value.</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Used for narrative descriptions, body copy, interactive buttons, and FAQ question rows. Crisp and highly legible.
              </p>
            </div>

            {/* Mono */}
            <div className="p-5 rounded-xl border border-border/70 bg-card space-y-3">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <Badge variant="outline" className="text-[10px] font-mono text-cyan-400 border-cyan-500/30">
                  Technical Mono
                </Badge>
                <span className="text-xs font-mono text-muted-foreground">Geist Mono</span>
              </div>
              <div className="font-mono text-xs text-foreground space-y-1 bg-secondary/60 p-3 rounded-lg border border-border/60">
                <div className="text-emerald-400 font-bold">HF = 1.042 (Solvent)</div>
                <div className="text-muted-foreground">NEV = Bonus − Gas − Slippage</div>
                <div className="text-primary font-semibold tabular-nums">+34.8% Preserved</div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Paired with <code className="text-foreground">tabular-nums</code> for financial amounts, gas numbers, equations, and CLI routes.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: COMPONENT PRIMITIVE SPECIMENS */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border/60 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary font-semibold mb-1">
                <Component className="size-3.5" />
                <span>SPEC 04</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal font-serif text-foreground">
                Semantic Component Specimens
              </h2>
            </div>
            <p className="text-xs text-muted-foreground sm:text-right max-w-md">
              Live specimens verifying proper semantic primitive selection over generic card dumping.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Specimen 1: Minimalist Accordion */}
            <div className="p-5 rounded-xl border border-border/70 bg-card space-y-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
                  Specimen A: Accordion (No Active Border Flash)
                </span>
                <Badge variant="secondary" className="text-[10px] font-mono">
                  &lt;Accordion&gt;
                </Badge>
              </div>
              <Accordion defaultValue={["demo-0"]} className="w-full space-y-2">
                <AccordionItem
                  value="demo-0"
                  className="rounded-lg border border-border/70 bg-card/60 overflow-hidden data-open:bg-card"
                >
                  <AccordionTrigger
                    hideChevron
                    className="px-4 py-3 flex items-center justify-between gap-3 text-left w-full cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-muted-foreground/60">01</span>
                      <span className="font-sans text-sm font-medium text-foreground">
                        Why doesn&apos;t the 1–2 block delay cause bad debt?
                      </span>
                    </div>
                    <span className="size-6 rounded-full bg-secondary border border-border/60 flex items-center justify-center text-muted-foreground transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180 group-aria-expanded/accordion-trigger:bg-primary group-aria-expanded/accordion-trigger:text-primary-foreground shrink-0">
                      <ArrowRight className="size-3 rotate-90" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-0">
                    <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                      Liquidation thresholds maintain a 15%–25% safety buffer. Monte Carlo stress tests show &lt;0.04% marginal default risk.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Specimen 2: High-Density Table */}
            <div className="p-5 rounded-xl border border-border/70 bg-card space-y-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
                  Specimen B: Technical Specification Registry
                </span>
                <Badge variant="secondary" className="text-[10px] font-mono">
                  &lt;Table&gt;
                </Badge>
              </div>
              <div className="rounded-lg border border-border/60 overflow-hidden bg-background/50">
                <Table>
                  <TableHeader className="bg-secondary/40 border-b border-border/60">
                    <TableRow className="border-border/60">
                      <TableHead className="py-2 pl-3 text-[11px] font-mono uppercase">Module</TableHead>
                      <TableHead className="py-2 text-[11px] font-mono uppercase">Domain</TableHead>
                      <TableHead className="py-2 pr-3 text-[11px] font-mono uppercase text-right">Route</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-border/50">
                    <TableRow className="border-border/50">
                      <TableCell className="py-2.5 pl-3 text-xs font-medium text-foreground">
                        Technical Specs
                      </TableCell>
                      <TableCell className="py-2.5">
                        <Badge variant="secondary" className="text-[10px] font-mono">
                          Smart Contracts
                        </Badge>
                      </TableCell>
                      <TableCell className="py-2.5 pr-3 text-right font-mono text-[11px] text-muted-foreground">
                        /docs/specs
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-border/50">
                      <TableCell className="py-2.5 pl-3 text-xs font-medium text-foreground">
                        Empirical Research
                      </TableCell>
                      <TableCell className="py-2.5">
                        <Badge variant="secondary" className="text-[10px] font-mono">
                          Simulation
                        </Badge>
                      </TableCell>
                      <TableCell className="py-2.5 pr-3 text-right font-mono text-[11px] text-muted-foreground">
                        /docs/research
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: AGENT ENGINEERING INVARIANTS */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border/60 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary font-semibold mb-1">
                <ShieldCheck className="size-3.5 text-emerald-400" />
                <span>SPEC 05</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal font-serif text-foreground">
                Autonomous Agent Invariants (AGENTS.md)
              </h2>
            </div>
            <p className="text-xs text-muted-foreground sm:text-right max-w-md">
              Hard rules enforced in the codebase before any commit or pull request.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border/70 bg-card space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
                <CheckCircle2 className="size-4" />
                <span>INVARIANT 1: No Default Card Dumping</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Never wrap every UI element in a generic &lt;Card&gt;. Always match patterns to dedicated primitives: FAQs &rarr; &lt;Accordion&gt;, Data &rarr; &lt;Table&gt;, Modes &rarr; &lt;Tabs&gt;.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border/70 bg-card space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
                <CheckCircle2 className="size-4" />
                <span>INVARIANT 2: Frameless Outer Boundaries</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Outermost containers use <code className="text-foreground">border-0 ring-0 bg-card</code> to preserve canvas depth. Internal borders are kept on nested interactive bars and inputs.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border/70 bg-card space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
                <CheckCircle2 className="size-4" />
                <span>INVARIANT 3: Prohibition of Low-Opacity Grey Collapses</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Never use <code className="text-foreground">bg-card/20</code> or <code className="text-foreground">bg-card/30</code> on dark backgrounds as they collapse into flat black. Use explicit semantic tokens.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border/70 bg-card space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
                <CheckCircle2 className="size-4" />
                <span>INVARIANT 4: Zero TypeScript Error Threshold</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Always verify changes with <code className="text-foreground">npx tsc --noEmit</code> directly to guarantee zero compilation errors before concluding a task.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
