'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  Layers,
  Palette,
  Type,
  Component,
  ShieldCheck,
  ArrowRight,
  Copy,
  Check,
  Home,
  BookOpen,
  Award,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Shield,
  DollarSign,
  Layers3,
  TrendingDown,
  Boxes,
  SlidersHorizontal,
  CircleDot,
  Maximize2,
  Minimize2,
  MousePointerClick,
} from 'lucide-react';

interface ColorToken {
  name: string;
  variable: string;
  tailwind: string;
  hsl: string;
  hex: string;
  description: string;
  category: 'surface' | 'text' | 'semantic';
}

const COLOR_TOKENS: ColorToken[] = [
  // Surface Hierarchy
  {
    name: 'Background',
    variable: '--background',
    tailwind: 'bg-background',
    hsl: 'hsl(0 0% 8%)',
    hex: '#141414',
    description: 'Level 0: Base viewport canvas (darkest layer).',
    category: 'surface',
  },
  {
    name: 'Card Surface',
    variable: '--card',
    tailwind: 'bg-card',
    hsl: 'hsl(0 0% 12%)',
    hex: '#1f1f1f',
    description: 'Level 1: Primary elevated container surface (frameless, border-0 ring-0).',
    category: 'surface',
  },
  {
    name: 'Secondary Panel',
    variable: '--secondary',
    tailwind: 'bg-secondary',
    hsl: 'hsl(0 0% 15.5%)',
    hex: '#272727',
    description: 'Level 2: Nested control bars, banners, sub-panels & table headers.',
    category: 'surface',
  },
  {
    name: 'Accent / Active',
    variable: '--accent',
    tailwind: 'bg-accent',
    hsl: 'hsl(0 0% 19%)',
    hex: '#303030',
    description: 'Level 3: Active states, elevated chips, and interactive hover surfaces.',
    category: 'surface',
  },
  // Text & Hairline
  {
    name: 'Foreground',
    variable: '--foreground',
    tailwind: 'text-foreground',
    hsl: 'hsl(0 0% 95%)',
    hex: '#f2f2f2',
    description: 'High-contrast primary headline and body text (15.5:1 ratio).',
    category: 'text',
  },
  {
    name: 'Muted Foreground',
    variable: '--muted-foreground',
    tailwind: 'text-muted-foreground',
    hsl: 'hsl(0 0% 64%)',
    hex: '#a1a1aa',
    description: 'Secondary descriptions, subtitles, and non-critical metadata.',
    category: 'text',
  },
  {
    name: 'Border Hairline',
    variable: '--border',
    tailwind: 'border-border',
    hsl: 'hsla(0 0% 100% / 0.09)',
    hex: 'rgba(255,255,255,0.09)',
    description: 'Crisp 9% white hairline for component perimeters and dividers.',
    category: 'text',
  },
  // Semantic Tokens
  {
    name: 'Order-Fair (Emerald)',
    variable: 'emerald-400 / 500',
    tailwind: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    hsl: 'hsl(158 64% 52%)',
    hex: '#34d399',
    description: 'Solvent positions, winning Reforge batch auctions, and preserved equity.',
    category: 'semantic',
  },
  {
    name: 'Warning (Amber)',
    variable: 'amber-400 / 500',
    tailwind: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    hsl: 'hsl(38 92% 50%)',
    hex: '#fbbf24',
    description: 'Vulnerable loans, borderline health factor (1.0 < HF < 1.1), and mempool race.',
    category: 'semantic',
  },
  {
    name: 'Extraction / PGA (Rose)',
    variable: 'rose-400 / 500',
    tailwind: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    hsl: 'hsl(351 95% 71%)',
    hex: '#fb7185',
    description: 'PGA value extraction, reverted transactions, and borrower equity haircuts.',
    category: 'semantic',
  },
  {
    name: 'Telemetry / Math (Cyan)',
    variable: 'cyan-400 / 500',
    tailwind: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    hsl: 'hsl(188 86% 53%)',
    hex: '#22d3ee',
    description: 'Quantitative formulas, NEV scoring, and Monte Carlo telemetry.',
    category: 'semantic',
  },
  {
    name: 'Searcher Yield (Purple)',
    variable: 'purple-400 / 500',
    tailwind: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    hsl: 'hsl(270 95% 75%)',
    hex: '#c084fc',
    description: 'DEX arbitrage routing, predictable searcher margins, and zero-bribe execution.',
    category: 'semantic',
  },
];

const RADIUS_HIERARCHY = [
  {
    tier: 'Tier 1: Container Frame',
    token: 'rounded-3xl',
    pixels: '24px (1.5rem)',
    usage: 'Outermost section cards, hero containers, metric strips, and interactive simulators.',
    specimenClass: 'rounded-3xl',
  },
  {
    tier: 'Tier 2: Icon & Sub-Panel',
    token: 'rounded-2xl',
    pixels: '16px (1.0rem)',
    usage: 'Icon plate badges, nested control sub-panels, and accordion card items.',
    specimenClass: 'rounded-2xl',
  },
  {
    tier: 'Tier 3: Inner Component',
    token: 'rounded-xl',
    pixels: '12px (0.75rem)',
    usage: 'Nested telemetry cards, terminal windows, table containers, and tab groups.',
    specimenClass: 'rounded-xl',
  },
  {
    tier: 'Tier 4: Micro-Control',
    token: 'rounded-lg / rounded-md',
    pixels: '8px / 6px',
    usage: 'Segmented switch options, input fields, and action buttons.',
    specimenClass: 'rounded-lg',
  },
  {
    tier: 'Tier 5: Status Pill & Floating Bar',
    token: 'rounded-full',
    pixels: '9999px (Pill)',
    usage: 'Status badges, metadata tags, metric chips, and sticky floating island navbars.',
    specimenClass: 'rounded-full',
  },
];

export default function DesignSystemPage() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeScenario, setActiveScenario] = useState<'pga' | 'reforge'>('reforge');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Top Floating Island Header */}
      <header className="sticky top-3 z-50 mx-auto max-w-5xl px-4">
        <div className="flex items-center justify-between rounded-full border border-border/80 bg-card/85 px-5 py-2.5 shadow-lg backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-bold tracking-tight text-foreground transition-colors hover:text-primary"
            >
              <div className="flex size-6 items-center justify-center rounded-md bg-foreground font-mono text-xs font-black text-background">
                R
              </div>
              <span>Reforge</span>
            </Link>
            <span className="text-muted-foreground/40">•</span>
            <span className="font-mono text-xs text-muted-foreground">Design Spec</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Home className="size-3.5" />
              <span>Landing Page</span>
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <BookOpen className="size-3.5" />
              <span>Docs</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-20 px-4 pt-12 pb-24">
        {/* Page Hero */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <Badge
            variant="outline"
            className="gap-2 rounded-full border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary"
          >
            <Palette className="size-3.5" />
            <span>Reforge Design Specification &amp; Architectural System</span>
          </Badge>
          <h1 className="font-serif text-3xl font-normal text-foreground sm:text-5xl">
            Surface Elevation, Geometry &amp; Semantic Architecture
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            The canonical design specification for Reforge interfaces. This page serves as an
            interactive visual benchmark for human developers and autonomous AI agents to ensure
            uncompromising visual depth, contrast hierarchy, geometric harmony, and semantic
            component selection.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: SURFACE ELEVATION STACK (LEVEL 0 -> LEVEL 3) */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col justify-between gap-2 border-b border-border/60 pb-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-1 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary">
                <Layers className="size-3.5" />
                <span>SPEC 01</span>
              </div>
              <h2 className="font-serif text-2xl font-normal text-foreground sm:text-3xl">
                4-Level Surface Elevation Architecture
              </h2>
            </div>
            <p className="max-w-md text-xs text-muted-foreground sm:text-right">
              Eliminating flat black collapses by establishing strict luminance deltas between
              canvas, cards, sub-panels, and active controls.
            </p>
          </div>

          {/* Interactive Visual Nested Stack */}
          <div className="space-y-6 rounded-3xl border border-border/80 bg-background p-6 shadow-xs sm:p-8">
            <div className="flex items-center justify-between border-b border-border/60 pb-3 font-mono text-xs text-muted-foreground">
              <span>LEVEL 0: Base Canvas (`bg-background` • #141414 / #0a0a0a)</span>
              <span className="text-emerald-400">Base Viewport Canvas</span>
            </div>

            {/* Level 1: Elevated Card */}
            <div className="space-y-5 rounded-3xl border-0 bg-card p-6 shadow-md ring-0 sm:p-8">
              <div className="flex items-center justify-between border-b border-border/50 pb-3 font-mono text-xs text-foreground">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="size-2 rounded-full bg-primary" />
                  <span>
                    LEVEL 1: Elevated Frameless Container (`bg-card` • #1f1f1f • rounded-3xl
                    border-0 ring-0)
                  </span>
                </div>
                <span className="text-emerald-400">+4.0% Luminance Step</span>
              </div>

              {/* Level 2: Nested Sub-Panel / Control Bar */}
              <div className="space-y-4 rounded-2xl border border-border/60 bg-secondary/80 p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between border-b border-border/40 pb-2.5 font-mono text-xs text-foreground/90">
                  <span className="font-semibold">
                    LEVEL 2: Nested Control Bar / Sub-Panel (`bg-secondary` • #272727 • rounded-2xl)
                  </span>
                  <span className="text-emerald-400">+3.5% Step Delta</span>
                </div>

                {/* Level 3: Interactive Accent & Active Controls */}
                <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-border/60 bg-accent p-4 shadow-xs sm:flex-row sm:items-center">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold text-accent-foreground">
                      <span className="size-1.5 rounded-full bg-primary" />
                      <span>
                        LEVEL 3: Interactive Accent / Active Surface (`bg-accent` • #303030 •
                        rounded-xl)
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Tactile interactive surface: active pills, segmented toggles, hover states,
                      and popovers.
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="rounded-full border border-border bg-background px-3 py-1 font-mono text-xs font-medium text-foreground">
                      Active State
                    </span>
                    <Badge
                      variant="outline"
                      className="rounded-full border-primary/30 bg-primary/10 font-mono text-[10px] text-primary"
                    >
                      +3.5% Delta
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: CORNER RADIUS & GEOMETRIC HIERARCHY */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col justify-between gap-2 border-b border-border/60 pb-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-1 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary">
                <Boxes className="size-3.5" />
                <span>SPEC 02</span>
              </div>
              <h2 className="font-serif text-2xl font-normal text-foreground sm:text-3xl">
                Corner Radius &amp; Geometric Scale
              </h2>
            </div>
            <p className="max-w-md text-xs text-muted-foreground sm:text-right">
              A 5-tier curvature hierarchy pairing spacious 24px outer boundaries with tactile 16px
              plates and pill micro-indicators.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {RADIUS_HIERARCHY.map((item) => (
              <div
                key={item.token}
                className="flex flex-col justify-between space-y-4 rounded-3xl border-0 bg-card p-5 shadow-xs ring-0"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-foreground">{item.tier}</span>
                    <Badge variant="secondary" className="rounded-full font-mono text-[10px]">
                      {item.pixels}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="rounded-md border border-border/50 bg-secondary/80 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
                      {item.token}
                    </code>
                  </div>
                  <p className="pt-1 text-xs leading-relaxed text-muted-foreground">{item.usage}</p>
                </div>

                {/* Visual Specimen Box */}
                <div className="border-t border-border/40 pt-2">
                  <div
                    className={`flex h-12 w-full items-center justify-center border border-border/70 bg-secondary/80 font-mono text-xs text-muted-foreground ${item.specimenClass}`}
                  >
                    <span>{item.token}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: CONTAINER DE-BOXING & MICRO-BORDER PATTERNS */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col justify-between gap-2 border-b border-border/60 pb-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-1 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary">
                <SlidersHorizontal className="size-3.5" />
                <span>SPEC 03</span>
              </div>
              <h2 className="font-serif text-2xl font-normal text-foreground sm:text-3xl">
                Container De-Boxing &amp; Micro-Border Patterns
              </h2>
            </div>
            <p className="max-w-md text-xs text-muted-foreground sm:text-right">
              Eliminating nested card fatigue by replacing heavy box wrappers with sleek left accent
              bars, subtle background shifts, and typographic dividers.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Anti-Pattern: Heavy Box Nesting */}
            <div className="space-y-4 rounded-3xl border-0 bg-card p-6 opacity-75 ring-0">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <span className="flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-rose-400 uppercase">
                  <AlertTriangle className="size-3.5" />
                  <span>Anti-Pattern: Nested Box Fatigue</span>
                </span>
                <Badge
                  variant="outline"
                  className="border-rose-500/30 font-mono text-[10px] text-rose-400"
                >
                  Avoid
                </Badge>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1 rounded-lg border border-border/80 bg-secondary/60 p-3">
                  <div className="font-mono text-[10px] font-semibold tracking-wider text-rose-400 uppercase">
                    Nested Card Wrapper
                  </div>
                  <p className="text-muted-foreground">
                    Multiple bordered card boxes inside a card create jarring visual noise and
                    border clutter.
                  </p>
                </div>
                <div className="space-y-1 rounded-lg border border-border/80 bg-secondary/80 p-3">
                  <div className="font-mono text-[10px] font-semibold tracking-wider text-emerald-400 uppercase">
                    Second Nested Card
                  </div>
                  <p className="text-muted-foreground">
                    Excessive borderlines trap eye movement instead of creating fluid readability.
                  </p>
                </div>
              </div>
            </div>

            {/* Recommended Pattern: Sleek De-Boxed Accent Layout */}
            <div className="space-y-4 rounded-3xl border-0 bg-card p-6 shadow-sm ring-0">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <span className="flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-emerald-400 uppercase">
                  <CheckCircle2 className="size-3.5" />
                  <span>Reforge Standard: De-Boxed Accent Layout</span>
                </span>
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 font-mono text-[10px] text-emerald-400"
                >
                  Recommended
                </Badge>
              </div>

              <div className="space-y-4 pt-1 text-xs">
                <div className="space-y-1 border-l-2 border-rose-500/40 pl-3">
                  <div className="text-[10px] font-semibold tracking-wider text-rose-400 uppercase">
                    Status Quo (PGA)
                  </div>
                  <p className="leading-relaxed text-muted-foreground">
                    Up to 90% of profits surrendered to block builders; losing calls burn gas on
                    reverts.
                  </p>
                </div>

                <div className="space-y-1 border-l-2 border-emerald-500/60 pl-3">
                  <div className="text-[10px] font-semibold tracking-wider text-emerald-400 uppercase">
                    Reforge Batch Auction
                  </div>
                  <p className="leading-relaxed text-foreground/90">
                    Searchers earn predictable returns based on DEX routing and capital efficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: COLOR TOKEN MATRIX & CLICK-TO-COPY */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col justify-between gap-2 border-b border-border/60 pb-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-1 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary">
                <Palette className="size-3.5" />
                <span>SPEC 04</span>
              </div>
              <h2 className="font-serif text-2xl font-normal text-foreground sm:text-3xl">
                Token Palette &amp; Contrast Specs
              </h2>
            </div>
            <p className="max-w-md text-xs text-muted-foreground sm:text-right">
              Click any token card to copy its Tailwind utility class or CSS custom property.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {COLOR_TOKENS.map((token) => (
              <div
                key={token.name}
                onClick={() => handleCopy(token.tailwind)}
                className="group flex cursor-pointer flex-col justify-between space-y-3 rounded-3xl border-0 bg-card p-5 shadow-xs ring-0 transition-all hover:bg-secondary/40"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-6 shrink-0 rounded-xl border border-border/80 shadow-xs"
                      style={{ backgroundColor: token.hex }}
                    />
                    <div>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                        <span>{token.name}</span>
                        {copiedToken === token.tailwind && (
                          <Check className="size-3 animate-in text-emerald-400 fade-in" />
                        )}
                      </div>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {token.tailwind}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="shrink-0 rounded-full font-mono text-[10px]"
                  >
                    {token.category}
                  </Badge>
                </div>

                <p className="text-xs leading-snug text-muted-foreground">{token.description}</p>

                <div className="flex items-center justify-between border-t border-border/40 pt-2 font-mono text-[11px] text-muted-foreground/80">
                  <span>{token.hex}</span>
                  <span className="flex items-center gap-1 transition-colors group-hover:text-foreground">
                    <Copy className="size-3" />
                    <span>Copy</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: TYPOGRAPHY HIERARCHY */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col justify-between gap-2 border-b border-border/60 pb-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-1 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary">
                <Type className="size-3.5" />
                <span>SPEC 05</span>
              </div>
              <h2 className="font-serif text-2xl font-normal text-foreground sm:text-3xl">
                Three-Axis Typography System
              </h2>
            </div>
            <p className="max-w-md text-xs text-muted-foreground sm:text-right">
              Clear distinction between Display Serif headings, Narrative Sans copy, and Technical
              Mono telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {/* Serif */}
            <div className="space-y-3 rounded-3xl border-0 bg-card p-6 shadow-xs ring-0">
              <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                <Badge
                  variant="outline"
                  className="rounded-full border-primary/30 font-mono text-[10px] text-primary"
                >
                  Display Serif
                </Badge>
                <span className="font-mono text-xs text-muted-foreground">Instrument Serif</span>
              </div>
              <div className="font-serif text-2xl leading-tight font-normal text-foreground sm:text-3xl">
                Order-fair liquidations
                <br />
                <span className="text-muted-foreground italic">for DeFi lending.</span>
              </div>
              <p className="pt-2 text-xs leading-relaxed text-muted-foreground">
                Used exclusively on <code className="text-foreground">h1</code>,{' '}
                <code className="text-foreground">h2</code>,{' '}
                <code className="text-foreground">h3</code> headings. Centrally governed by{' '}
                <code className="text-foreground">--tracking-serif: 0.025em</code> (tracking-wide)
                in <code className="text-foreground">global.css</code>. Never on Docs.
              </p>
            </div>

            {/* Sans */}
            <div className="space-y-3 rounded-3xl border-0 bg-card p-6 shadow-xs ring-0">
              <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                <Badge variant="outline" className="rounded-full font-mono text-[10px]">
                  Narrative Sans
                </Badge>
                <span className="font-mono text-xs text-muted-foreground">Geist Sans</span>
              </div>
              <div className="space-y-1 text-sm font-medium text-foreground">
                <p>
                  Replacing toxic Priority Gas Auctions with discrete batch auctions scored by Net
                  Economic Value.
                </p>
              </div>
              <p className="pt-2 text-xs leading-relaxed text-muted-foreground">
                Used for narrative descriptions, body copy, interactive buttons, and FAQ question
                rows. Crisp, neutral, and highly legible across all viewport sizes.
              </p>
            </div>

            {/* Mono */}
            <div className="space-y-3 rounded-3xl border-0 bg-card p-6 shadow-xs ring-0">
              <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                <Badge
                  variant="outline"
                  className="rounded-full border-cyan-500/30 font-mono text-[10px] text-cyan-400"
                >
                  Technical Mono
                </Badge>
                <span className="font-mono text-xs text-muted-foreground">JetBrains Mono</span>
              </div>
              <div className="space-y-1 rounded-2xl border border-border/60 bg-secondary/60 p-3.5 font-mono text-xs text-foreground">
                <div className="font-bold text-emerald-400">HF = 1.042 (Solvent)</div>
                <div className="text-muted-foreground">NEV = Bonus − Gas − Slippage</div>
                <div className="font-semibold text-primary tabular-nums">+34.8% Preserved</div>
              </div>
              <p className="pt-2 text-xs leading-relaxed text-muted-foreground">
                Paired with <code className="text-foreground">tabular-nums</code> for financial
                amounts, gas numbers, equations, and CLI routes.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: COMPONENT PRIMITIVE SPECIMENS */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col justify-between gap-2 border-b border-border/60 pb-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-1 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary">
                <Component className="size-3.5" />
                <span>SPEC 06</span>
              </div>
              <h2 className="font-serif text-2xl font-normal text-foreground sm:text-3xl">
                Semantic Component Specimens
              </h2>
            </div>
            <p className="max-w-md text-xs text-muted-foreground sm:text-right">
              Live specimens verifying proper semantic primitive selection over generic card
              dumping.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Specimen 1: Minimalist Accordion */}
            <div className="space-y-4 rounded-3xl border-0 bg-card p-6 shadow-xs ring-0">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <span className="font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
                  Specimen A: Accordion (No Active Border Flash)
                </span>
                <Badge variant="secondary" className="rounded-full font-mono text-[10px]">
                  &lt;Accordion&gt;
                </Badge>
              </div>
              <Accordion defaultValue={['demo-0']} className="w-full space-y-2">
                <AccordionItem
                  value="demo-0"
                  className="overflow-hidden rounded-2xl border border-border/70 bg-secondary/40 data-open:bg-secondary/70"
                >
                  <AccordionTrigger
                    hideChevron
                    className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-muted-foreground/60">
                        01
                      </span>
                      <span className="font-sans text-sm font-medium text-foreground">
                        Why doesn&apos;t the 1–2 block delay cause bad debt?
                      </span>
                    </div>
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border/60 bg-secondary text-muted-foreground transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180 group-aria-expanded/accordion-trigger:bg-primary group-aria-expanded/accordion-trigger:text-primary-foreground">
                      <ArrowRight className="size-3 rotate-90" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-0 pb-4">
                    <p className="pt-1 text-xs leading-relaxed text-muted-foreground">
                      Liquidation thresholds maintain a 15%–25% safety buffer. Monte Carlo stress
                      tests show &lt;0.04% marginal default risk.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Specimen 2: High-Density Table */}
            <div className="space-y-4 rounded-3xl border-0 bg-card p-6 shadow-xs ring-0">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <span className="font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
                  Specimen B: Technical Specification Registry
                </span>
                <Badge variant="secondary" className="rounded-full font-mono text-[10px]">
                  &lt;Table&gt;
                </Badge>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/50">
                <Table>
                  <TableHeader className="border-b border-border/60 bg-secondary/40">
                    <TableRow className="border-border/60">
                      <TableHead className="py-2.5 pl-3 font-mono text-[11px] uppercase">
                        Module
                      </TableHead>
                      <TableHead className="py-2.5 font-mono text-[11px] uppercase">
                        Domain
                      </TableHead>
                      <TableHead className="py-2.5 pr-3 text-right font-mono text-[11px] uppercase">
                        Route
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-border/50">
                    <TableRow className="border-border/50">
                      <TableCell className="py-2.5 pl-3 text-xs font-medium text-foreground">
                        Technical Specs
                      </TableCell>
                      <TableCell className="py-2.5">
                        <Badge variant="secondary" className="rounded-full font-mono text-[10px]">
                          Smart Contracts
                        </Badge>
                      </TableCell>
                      <TableCell className="py-2.5 pr-3 text-right font-mono text-[11px] text-muted-foreground tabular-nums">
                        /docs/specs
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-border/50">
                      <TableCell className="py-2.5 pl-3 text-xs font-medium text-foreground">
                        Empirical Research
                      </TableCell>
                      <TableCell className="py-2.5">
                        <Badge variant="secondary" className="rounded-full font-mono text-[10px]">
                          Simulation
                        </Badge>
                      </TableCell>
                      <TableCell className="py-2.5 pr-3 text-right font-mono text-[11px] text-muted-foreground tabular-nums">
                        /docs/research
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Specimen 3: Segmented Option Control / Radiogroup */}
            <div className="space-y-4 rounded-3xl border-0 bg-card p-6 shadow-xs ring-0">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <span className="font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
                  Specimen C: Segmented Option Control
                </span>
                <Badge variant="secondary" className="rounded-full font-mono text-[10px]">
                  &lt;ToggleGroup&gt;
                </Badge>
              </div>

              <div className="space-y-3">
                <div
                  role="radiogroup"
                  aria-label="Simulation Mode"
                  className="inline-flex w-full items-center gap-1 rounded-xl border border-border/70 bg-secondary/50 p-1 shadow-2xs sm:w-auto"
                >
                  <button
                    type="button"
                    onClick={() => setActiveScenario('reforge')}
                    className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs transition-all select-none sm:flex-initial ${
                      activeScenario === 'reforge'
                        ? 'border border-border/80 bg-background font-semibold text-emerald-400 shadow-2xs'
                        : 'border border-transparent text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                    }`}
                  >
                    <Shield className="size-3.5" />
                    <span>Reforge Batch</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveScenario('pga')}
                    className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs transition-all select-none sm:flex-initial ${
                      activeScenario === 'pga'
                        ? 'border border-border/80 bg-background font-semibold text-rose-400 shadow-2xs'
                        : 'border border-transparent text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                    }`}
                  >
                    <Flame className="size-3.5" />
                    <span>PGA Race</span>
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-secondary/40 p-3 font-mono text-xs text-muted-foreground">
                  <span>Selected Scenario:</span>
                  <span
                    className={
                      activeScenario === 'reforge'
                        ? 'font-bold text-emerald-400'
                        : 'font-bold text-rose-400'
                    }
                  >
                    {activeScenario === 'reforge'
                      ? 'Order-Fair Batch Auction (NEV)'
                      : 'Priority Gas Auction (Bribes)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Specimen 4: Icon Plate & Status Badges */}
            <div className="space-y-4 rounded-3xl border-0 bg-card p-6 shadow-xs ring-0">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <span className="font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
                  Specimen D: Icon Plates &amp; Status Badges
                </span>
                <Badge variant="secondary" className="rounded-full font-mono text-[10px]">
                  Micro-Primitives
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="group flex items-center gap-3 rounded-2xl border border-border/50 bg-secondary/30 p-3.5">
                  <div className="rounded-2xl border border-border/60 bg-secondary p-2.5 text-amber-400 transition-transform group-hover:scale-105">
                    <Flame className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">PGA Warning</div>
                    <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] text-amber-400">
                      300+ Gwei
                    </span>
                  </div>
                </div>

                <div className="group flex items-center gap-3 rounded-2xl border border-border/50 bg-secondary/30 p-3.5">
                  <div className="rounded-2xl border border-border/60 bg-secondary p-2.5 text-purple-400 transition-transform group-hover:scale-105">
                    <Award className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">Predictable</div>
                    <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 font-mono text-[10px] text-purple-400">
                      Zero Bribes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specimen 5: Solvency Invariant / KPI Banner */}
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border-0 bg-secondary/40 p-6 shadow-xs ring-0 sm:p-8 md:flex-row md:items-center">
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                <span>Solvency Invariant Banner Specimen</span>
                <span className="size-1.5 rounded-full bg-emerald-500" />
                <span className="font-semibold text-foreground">HF &lt; 1.0 = Liquidatable</span>
              </div>
              <div className="max-w-lg text-xs text-muted-foreground sm:text-sm">
                Loans trigger immediate batch auction the instant collateral value falls below the
                debt threshold.
              </div>
            </div>

            <div className="shrink-0 space-y-1 font-mono text-xs sm:text-sm md:border-l md:border-border/50 md:pl-6">
              <div className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                Health Factor Metric
              </div>
              <div className="text-foreground">
                <span className="font-bold text-primary">HF</span> ={' '}
                <span className="font-semibold text-emerald-400">
                  &Sigma;(Collateral &times; Price &times; LT)
                </span>{' '}
                / <span className="font-semibold text-rose-400">&Sigma;(Debt &times; Price)</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7: AGENT ENGINEERING INVARIANTS */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col justify-between gap-2 border-b border-border/60 pb-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-1 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary">
                <ShieldCheck className="size-3.5 text-emerald-400" />
                <span>SPEC 07</span>
              </div>
              <h2 className="font-serif text-2xl font-normal text-foreground sm:text-3xl">
                Autonomous Agent Invariants (AGENTS.md)
              </h2>
            </div>
            <p className="max-w-md text-xs text-muted-foreground sm:text-right">
              Hard rules enforced in the codebase before any commit or pull request.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2 rounded-3xl border-0 bg-card p-5 shadow-xs ring-0">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>INVARIANT 1: No Default Card Dumping</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Never wrap every UI element in a generic &lt;Card&gt;. Always match patterns to
                dedicated primitives: FAQs &rarr; &lt;Accordion&gt;, Data &rarr; &lt;Table&gt;,
                Modes &rarr; &lt;Tabs&gt; / Segmented Controls.
              </p>
            </div>

            <div className="space-y-2 rounded-3xl border-0 bg-card p-5 shadow-xs ring-0">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>INVARIANT 2: Frameless Outer Boundaries</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Outermost containers use{' '}
                <code className="text-foreground">rounded-3xl border-0 ring-0 bg-card</code> to
                preserve canvas depth. Internal borders are kept on nested interactive bars, table
                cells, and inputs.
              </p>
            </div>

            <div className="space-y-2 rounded-3xl border-0 bg-card p-5 shadow-xs ring-0">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>INVARIANT 3: De-Boxing &amp; Micro-Border Hierarchy</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Avoid nested box fatigue. Replace internal boxed cards with clean left accent
                borders (<code className="text-foreground">border-l-2</code>), subtle{' '}
                <code className="text-foreground">bg-secondary/40</code> tone shifts, and clean
                dividers.
              </p>
            </div>

            <div className="space-y-2 rounded-3xl border-0 bg-card p-5 shadow-xs ring-0">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>INVARIANT 4: Prohibition of Low-Opacity Grey Collapses</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Never use <code className="text-foreground">bg-card/20</code> or{' '}
                <code className="text-foreground">bg-card/30</code> on dark backgrounds as they
                collapse into flat black. Use explicit semantic tokens.
              </p>
            </div>

            <div className="space-y-2 rounded-3xl border-0 bg-card p-5 shadow-xs ring-0">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>INVARIANT 5: Three-Tier Typography System</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Instrument Serif (<code className="text-foreground">font-serif</code>) exclusively
                for landing display headings with{' '}
                <code className="text-foreground">--tracking-serif: 0.025em</code>. Geist Sans for
                narrative/docs body. JetBrains Mono for telemetry, math, and status pills.
              </p>
            </div>

            <div className="space-y-2 rounded-3xl border-0 bg-card p-5 shadow-xs ring-0">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>INVARIANT 6: Zero TypeScript Error Threshold</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Always verify changes with <code className="text-foreground">npx tsc --noEmit</code>{' '}
                directly to guarantee zero compilation errors before concluding any task.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
