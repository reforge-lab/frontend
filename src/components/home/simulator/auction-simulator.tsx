'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Shield,
  Zap,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Cpu,
  Flame,
  Bot,
  Activity,
  Maximize2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SimulationMode = 'reforge' | 'pga';
type FlowStep = 1 | 2 | 3;

export function AuctionSimulator() {
  const [mode, setMode] = useState<SimulationMode>('reforge');
  const [currentStep, setCurrentStep] = useState<FlowStep>(1);
  const [ethPrice, setEthPrice] = useState<number>(2420);

  // Constants for sample loan
  const collateralEth = 10;
  const debtUsdc = 20000;
  const liquidationThreshold = 0.8; // 80%

  // Live calculated metrics
  const collateralValue = collateralEth * ethPrice;
  const healthFactor = (collateralValue * liquidationThreshold) / debtUsdc;
  const isLiquidatable = healthFactor < 1.0;

  const isReforge = mode === 'reforge';

  const handlePreset = (price: number) => {
    setEthPrice(price);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setEthPrice(2420);
  };

  return (
    <section id="simulator" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16">
      {/* Section Header */}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <Badge
          variant="outline"
          className="mb-3 gap-2 rounded-full border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
        >
          <Activity className="size-3.5 animate-pulse" />
          <span>Interactive 3-Step Walkthrough</span>
        </Badge>
        <h2 className="font-serif text-2xl font-normal text-foreground sm:text-4xl">
          How Reforge Works in 3 Simple Steps
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Follow the step-by-step interactive simulator to see how Reforge protects borrowers and
          eliminates gas wars when a loan becomes vulnerable.
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Link
            href="/lab"
            className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/80 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-2xs transition-all hover:bg-secondary"
          >
            <Maximize2 className="size-3 text-primary transition-transform group-hover:scale-110" />
            <span>Open Dedicated Fullscreen Lab</span>
            <ArrowRight className="size-3 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Main Single-Canvas Surface (Clean Level 1 Card with Level 2 Top/Bottom Bars, Zero Nested Box Clutter) */}
      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
        {/* Top Control Bar (Level 2 Elevation) */}
        <div className="flex flex-col justify-between gap-4 border-b border-border/60 bg-secondary px-5 py-4 sm:flex-row sm:items-center sm:px-6">
          {/* Step Stepper Tabs */}
          <div className="flex items-center gap-1.5">
            {[
              { num: 1, label: '1. Price Trigger' },
              { num: 2, label: '2. Bidding Window' },
              { num: 3, label: '3. Final Settlement' },
            ].map((s) => {
              const isActive = currentStep === s.num;
              const isPast = currentStep > s.num;
              return (
                <button
                  key={s.num}
                  onClick={() => setCurrentStep(s.num as FlowStep)}
                  className={cn(
                    'cursor-pointer rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-all',
                    isActive
                      ? 'bg-card font-bold text-foreground shadow-xs ring-1 ring-border/80'
                      : isPast
                        ? 'text-primary hover:bg-accent/50'
                        : 'text-muted-foreground hover:bg-accent/40',
                  )}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* Mode Switcher & Full Screen Lab Link */}
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center rounded-xl border border-border/60 bg-background/80 p-1 shadow-2xs">
              <button
                onClick={() => setMode('reforge')}
                className={cn(
                  'flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all',
                  isReforge
                    ? 'bg-card font-semibold text-foreground shadow-xs ring-1 ring-border/80'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <Shield className="size-3.5 text-emerald-400" />
                <span>Reforge</span>
              </button>

              <button
                onClick={() => setMode('pga')}
                className={cn(
                  'flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all',
                  !isReforge
                    ? 'bg-card font-semibold text-foreground shadow-xs ring-1 ring-border/80'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <Zap className="size-3.5 text-amber-400" />
                <span>Conventional PGA</span>
              </button>
            </div>
          </div>
        </div>

        {/* STEP 1: PRICE TRIGGER */}
        {currentStep === 1 && (
          <div className="flex flex-col justify-between">
            {/* Unboxed Content Body */}
            <div className="space-y-6 p-6 sm:p-8">
              <div className="space-y-1">
                <span className="font-mono text-xs font-semibold tracking-wider text-primary uppercase">
                  Step 1 of 3
                </span>
                <h3 className="text-sm font-medium text-foreground">
                  Set Collateral Price to Trigger Liquidation
                </h3>
                <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
                  A loan of <strong className="font-semibold text-foreground">10 ETH</strong>{' '}
                  collateral backing{' '}
                  <strong className="font-semibold text-foreground">$20,000 USDC</strong> debt
                  requires a health factor above 1.000 (at least $2,500/ETH).
                </p>
              </div>

              {/* Price Slider (Directly on canvas, no grey card-in-card) */}
              <div className="space-y-4 pt-2">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    Collateral Market Price:
                  </span>
                  <span className="font-mono text-2xl font-bold text-foreground tabular-nums">
                    ${ethPrice.toLocaleString()} USD
                  </span>
                </div>

                <input
                  type="range"
                  min={2100}
                  max={3200}
                  step={10}
                  value={ethPrice}
                  onChange={(e) => setEthPrice(Number(e.target.value))}
                  className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-primary"
                />

                <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                  <span>$2,100 (Deep Underwater)</span>
                  <span className="font-semibold text-foreground">
                    $2,500 (Liquidation Threshold)
                  </span>
                  <span>$3,200 (Safe)</span>
                </div>

                {/* Presets Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="mr-1 font-mono text-xs text-muted-foreground">
                    Quick Presets:
                  </span>
                  <button
                    onClick={() => handlePreset(3000)}
                    className={cn(
                      'cursor-pointer rounded-lg border px-3 py-1 font-mono text-xs transition-all',
                      ethPrice === 3000
                        ? 'border-primary/50 bg-primary/15 font-bold text-primary shadow-2xs'
                        : 'border-border/60 bg-secondary text-secondary-foreground hover:bg-accent',
                    )}
                  >
                    Safe ($3,000)
                  </button>
                  <button
                    onClick={() => handlePreset(2550)}
                    className={cn(
                      'cursor-pointer rounded-lg border px-3 py-1 font-mono text-xs transition-all',
                      ethPrice === 2550
                        ? 'border-primary/50 bg-primary/15 font-bold text-primary shadow-2xs'
                        : 'border-border/60 bg-secondary text-secondary-foreground hover:bg-accent',
                    )}
                  >
                    Vulnerable ($2,550)
                  </button>
                  <button
                    onClick={() => handlePreset(2350)}
                    className={cn(
                      'cursor-pointer rounded-lg border px-3 py-1 font-mono text-xs transition-all',
                      ethPrice === 2350
                        ? 'border-amber-500/50 bg-amber-500/15 font-bold text-amber-300 shadow-2xs'
                        : 'border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20',
                    )}
                  >
                    Flash Crash ($2,350)
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Status & Next Bar (Level 2 Surface) */}
            <div className="flex flex-col justify-between gap-4 border-t border-border/60 bg-secondary px-6 py-5 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 font-mono text-xs">
                  <span className="text-muted-foreground">Health Factor:</span>
                  <span
                    className={cn(
                      'text-xl font-bold tabular-nums',
                      isLiquidatable ? 'text-rose-400' : 'text-emerald-400',
                    )}
                  >
                    {healthFactor.toFixed(3)}
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-[10px] font-semibold',
                      isLiquidatable
                        ? 'border border-rose-500/30 bg-rose-500/15 text-rose-400'
                        : 'border border-emerald-500/30 bg-emerald-500/15 text-emerald-400',
                    )}
                  >
                    {isLiquidatable ? 'LIQUIDATABLE ($HF < 1.0)' : 'SOLVENT ($HF ≥ 1.0)'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {isLiquidatable
                    ? 'The loan is under-collateralized! Click Next to watch liquidators compete.'
                    : 'The loan is healthy. Lower the price below $2,500 to trigger liquidation.'}
                </p>
              </div>

              <Button
                onClick={() => setCurrentStep(2)}
                disabled={!isLiquidatable}
                className="shrink-0 cursor-pointer gap-2 font-medium"
              >
                <span>Next: Watch Bidding Window</span>
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: BIDDING WINDOW */}
        {currentStep === 2 && (
          <div className="flex flex-col justify-between">
            {/* Content Body */}
            <div className="space-y-6 p-6 sm:p-8">
              <div className="space-y-1">
                <span className="font-mono text-xs font-semibold tracking-wider text-primary uppercase">
                  Step 2 of 3
                </span>
                <h3 className="text-sm font-medium text-foreground">
                  {isReforge
                    ? 'Reforge Scores True Net Economic Value (NEV)'
                    : 'Conventional PGA Rewards Highest Gas Bribe'}
                </h3>
                <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
                  {isReforge
                    ? 'In Reforge, 3 searchers submit sealed routing quotes during a 2-block window. The highest NEV (Gross Bonus - Gas - Slippage) wins.'
                    : 'In conventional PGA, searchers spam public mempools and bid up priority gas fees to bribe block proposers.'}
                </p>
              </div>

              {/* Liquidator Competitor List (Clean Divided Rows) */}
              <div className="divide-y divide-border/50 border-y border-border/60">
                {/* Searcher C (Route Optimizer) */}
                <div
                  className={cn(
                    'flex items-center justify-between rounded-lg px-3 py-4 transition-colors',
                    isReforge ? 'bg-emerald-500/10' : 'hover:bg-secondary/30',
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Cpu className="size-4 text-emerald-400" />
                      <span className="text-sm font-semibold text-foreground">
                        Searcher C (Optimized Route)
                      </span>
                      {isReforge && (
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                          RANK #1 (SELECTED WINNER)
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                      <span>
                        Gas: <strong className="text-foreground">$38 (28g)</strong>
                      </span>
                      <span>&bull;</span>
                      <span>
                        DEX Slippage: <strong className="text-foreground">$22</strong>
                      </span>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-[10px] text-muted-foreground uppercase">
                      Net Economic Value
                    </div>
                    <div className="text-lg font-bold text-emerald-400 tabular-nums">$440 NEV</div>
                  </div>
                </div>

                {/* Searcher B (Gas Briber) */}
                <div
                  className={cn(
                    'flex items-center justify-between rounded-lg px-3 py-4 transition-colors',
                    !isReforge ? 'bg-amber-500/10' : 'opacity-80 hover:bg-secondary/30',
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Flame className="size-4 text-amber-400" />
                      <span className="text-sm font-semibold text-foreground">
                        Searcher B (Gas War Briber)
                      </span>
                      {!isReforge && (
                        <span className="rounded-full bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-300">
                          HIGHEST BRIBE (SELECTED)
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                      <span>
                        Gas Bribe: <strong className="text-amber-400">$230 (165g)</strong>
                      </span>
                      <span>&bull;</span>
                      <span>
                        DEX Slippage: <strong className="text-foreground">$40</strong>
                      </span>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-[10px] text-muted-foreground uppercase">
                      Net Economic Value
                    </div>
                    <div className="text-lg font-bold text-foreground tabular-nums">$230 NEV</div>
                  </div>
                </div>

                {/* Searcher A (Speed Bot) */}
                <div className="flex items-center justify-between px-3 py-4 opacity-75">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Bot className="size-4 text-muted-foreground" />
                      <span className="text-sm font-semibold text-foreground">
                        Searcher A (Mempool Speed Bot)
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">Outbid</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                      <span>Gas: $65 (45g)</span>
                      <span>&bull;</span>
                      <span>DEX Slippage: $55</span>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-[10px] text-muted-foreground uppercase">
                      Net Economic Value
                    </div>
                    <div className="text-lg font-medium text-muted-foreground tabular-nums">
                      $380 NEV
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Footer (Level 2 Surface) */}
            <div className="flex items-center justify-between border-t border-border/60 bg-secondary px-6 py-5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep(1)}
                className="cursor-pointer gap-1.5 bg-card text-xs hover:bg-accent"
              >
                <ArrowLeft className="size-3.5" />
                <span>Back to Price Trigger</span>
              </Button>

              <Button
                onClick={() => setCurrentStep(3)}
                className="cursor-pointer gap-1.5 text-xs font-medium"
              >
                <span>Next: See Final Settlement</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: FINAL SETTLEMENT */}
        {currentStep === 3 && (
          <div className="flex flex-col justify-between">
            {/* Content Body */}
            <div className="space-y-6 p-6 sm:p-8">
              <div className="space-y-1">
                <span className="font-mono text-xs font-semibold tracking-wider text-primary uppercase">
                  Step 3 of 3
                </span>
                <h3 className="text-sm font-medium text-foreground">
                  {isReforge
                    ? 'Reforge Outcome: Zero Gas Waste & +$180 Borrower Refund'
                    : 'PGA Outcome: $230 MEV Leaked & $103 Burned in Reverts'}
                </h3>
                <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
                  {isReforge
                    ? 'Because Searcher C had the lowest slippage ($22), the excess collateral value was preserved and returned to the borrower.'
                    : 'Searcher B paid an enormous gas bribe to block validators. Losing transactions reverted on-chain, and the borrower lost maximal collateral.'}
                </p>
              </div>

              {/* 3 Metric Columns (Clean vertical dividers, no nested gray boxes) */}
              <div className="grid grid-cols-1 divide-y divide-border/60 border-y border-border/60 py-2 font-mono sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <div className="space-y-1 p-4 sm:px-6">
                  <span className="text-[11px] text-muted-foreground uppercase">
                    Validator MEV Bribes
                  </span>
                  <div
                    className={cn(
                      'text-3xl font-bold tabular-nums',
                      isReforge ? 'text-emerald-400' : 'text-amber-400',
                    )}
                  >
                    {isReforge ? '$0.00' : '$230.00'}
                  </div>
                  <span className="block text-[11px] text-muted-foreground">
                    {isReforge ? 'Zero bribe leakage' : 'Paid to block proposer'}
                  </span>
                </div>

                <div className="space-y-1 p-4 sm:px-6">
                  <span className="text-[11px] text-muted-foreground uppercase">
                    Borrower Equity Preserved
                  </span>
                  <div
                    className={cn(
                      'text-3xl font-bold tabular-nums',
                      isReforge ? 'text-emerald-400' : 'text-rose-400',
                    )}
                  >
                    {isReforge ? '+$180.00' : '$0.00'}
                  </div>
                  <span className="block text-[11px] text-muted-foreground">
                    {isReforge ? 'Returned to borrower' : 'Lost to fixed 10% penalty'}
                  </span>
                </div>

                <div className="space-y-1 p-4 sm:px-6">
                  <span className="text-[11px] text-muted-foreground uppercase">
                    Wasted / Reverted Gas
                  </span>
                  <div
                    className={cn(
                      'text-3xl font-bold tabular-nums',
                      isReforge ? 'text-emerald-400' : 'text-rose-400',
                    )}
                  >
                    {isReforge ? '$0.00' : '$103.00'}
                  </div>
                  <span className="block text-[11px] text-muted-foreground">
                    {isReforge ? '0 failed transactions' : '2 failed mempool txs'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Footer (Level 2 Surface) */}
            <div className="flex flex-col justify-between gap-4 border-t border-border/60 bg-secondary px-6 py-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="cursor-pointer gap-1.5 bg-card text-xs hover:bg-accent"
                >
                  <RotateCcw className="size-3.5" />
                  <span>Start Over</span>
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setMode(isReforge ? 'pga' : 'reforge')}
                  className="cursor-pointer gap-1.5 bg-card text-xs hover:bg-accent"
                >
                  {isReforge ? (
                    <Zap className="size-3 text-amber-400" />
                  ) : (
                    <Shield className="size-3 text-emerald-400" />
                  )}
                  <span>Switch to {isReforge ? 'Conventional PGA' : 'Reforge'}</span>
                </Button>
              </div>

              <Link
                href="/lab"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary hover:underline"
              >
                <span>Open Full Protocol Lab Sandbox</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
