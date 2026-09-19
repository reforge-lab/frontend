'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Calculator, CheckCircle2, Shield, Cpu, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NevCalculator() {
  const [debtLiquidated, setDebtLiquidated] = useState<number>(20000);
  const [bonusPct, setBonusPct] = useState<number>(8);
  const [gasCost, setGasCost] = useState<number>(55);
  const [slippageCost, setSlippageCost] = useState<number>(45);

  const grossBonus = (debtLiquidated * bonusPct) / 100;
  const totalCost = gasCost + slippageCost;
  const netEconomicValue = grossBonus - totalCost;

  // Competitor trying PGA gas bribery
  const competitorGas = 240;
  const competitorSlippage = 90;
  const competitorTotalCost = competitorGas + competitorSlippage;
  const competitorNev = grossBonus - competitorTotalCost;

  const isUserWinning = netEconomicValue > competitorNev;
  const nevAdvantage = netEconomicValue - competitorNev;
  const userEfficiency = ((netEconomicValue / grossBonus) * 100).toFixed(1);
  const competitorEfficiency = ((competitorNev / grossBonus) * 100).toFixed(1);

  return (
    <section id="calculator" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16">
      {/* Section Header */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <Badge
          variant="outline"
          className="mb-3 gap-2 rounded-full border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400"
        >
          <Calculator className="size-3.5" />
          <span>Scoring Function Lab</span>
        </Badge>
        <h2 className="font-serif text-2xl font-normal text-foreground sm:text-4xl">
          Interactive Net Economic Value (NEV) Calculator
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          In Reforge, liquidators are ranked not by the size of their gas bribe to the block
          proposer, but by the true net economic value delivered to the protocol and borrower.
        </p>
      </div>

      {/* Main Single-Canvas Grid (No nested cards, no horizontal scrollbars) */}
      <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Parameter Sliders (6 cols) */}
          <div className="space-y-6 lg:col-span-6">
            <div>
              <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                1. Liquidation Parameters
              </span>
              <p className="mt-1 text-xs text-muted-foreground">
                Adjust debt size, liquidation incentive, and routing friction.
              </p>
            </div>

            {/* Debt Repaid */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-muted-foreground">Debt Repaid (USDC)</span>
                <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
                  ${debtLiquidated.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={50000}
                step={1000}
                value={debtLiquidated}
                onChange={(e) => setDebtLiquidated(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-primary"
              />
              <div className="flex justify-between font-mono text-[10px] text-muted-foreground tabular-nums">
                <span>$5,000</span>
                <span>$25,000</span>
                <span>$50,000</span>
              </div>
            </div>

            {/* Liquidation Bonus */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-muted-foreground">Liquidation Bonus (%)</span>
                <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
                  {bonusPct}% &mdash;{' '}
                  <span className="font-normal text-muted-foreground">
                    ${grossBonus.toLocaleString()} Gross
                  </span>
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={12}
                step={0.5}
                value={bonusPct}
                onChange={(e) => setBonusPct(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-primary"
              />
              <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
                <span>4% (Tight)</span>
                <span>8% (Standard)</span>
                <span>12% (Volatile)</span>
              </div>
            </div>

            {/* Gas & Slippage Sliders */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-muted-foreground">Execution Gas Fee</span>
                  <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
                    ${gasCost}
                  </span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={300}
                  step={5}
                  value={gasCost}
                  onChange={(e) => setGasCost(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-primary"
                />
                <span className="block font-mono text-[10px] text-muted-foreground">
                  Nominal execution cost
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-muted-foreground">DEX Slippage Impact</span>
                  <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
                    ${slippageCost}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={250}
                  step={5}
                  value={slippageCost}
                  onChange={(e) => setSlippageCost(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-primary"
                />
                <span className="block font-mono text-[10px] text-muted-foreground">
                  AMM price impact &amp; routing depth
                </span>
              </div>
            </div>

            {/* NEV Formula Display Pill */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-border/80 bg-secondary/60 p-3.5 font-mono text-xs shadow-2xs sm:px-4">
              <div className="font-medium text-muted-foreground">NEV Formula:</div>
              <div className="flex flex-wrap items-center gap-1.5 text-foreground sm:gap-2">
                <span className="font-semibold text-emerald-400">
                  ${grossBonus.toLocaleString()} (Gross)
                </span>
                <span className="font-bold text-muted-foreground">&minus;</span>
                <span className="font-semibold text-amber-400">${gasCost} (Gas)</span>
                <span className="font-bold text-muted-foreground">&minus;</span>
                <span className="font-semibold text-purple-400">${slippageCost} (Slippage)</span>
                <span className="font-bold text-muted-foreground">=</span>
                <span className="font-bold text-foreground tabular-nums sm:text-sm">
                  ${netEconomicValue.toLocaleString()} NEV
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Head-to-Head Comparison Ledger (6 cols, 100% width, no scrollbars) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-6">
            <div>
              <div className="flex items-center justify-between pb-1">
                <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                  2. Head-to-Head Scoring
                </span>
                <Badge
                  variant="outline"
                  className={cn(
                    'font-mono text-[10px] uppercase',
                    isUserWinning
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      : 'border-rose-500/30 bg-rose-500/10 text-rose-400',
                  )}
                >
                  {isUserWinning ? 'Rank #1 Winner' : 'Rank #2 Outbid'}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Reforge scores solely on Net Economic Value, ignoring raw gas bribes to proposers.
              </p>
            </div>

            {/* Comparison Rows (Clean fluid rows, never scrolls) */}
            <div className="space-y-3">
              {/* Reforge Route-Optimized Solver Row */}
              <div
                className={cn(
                  'flex items-center justify-between rounded-xl border p-4 transition-all',
                  isUserWinning
                    ? 'border-emerald-500/50 bg-emerald-500/10 shadow-xs'
                    : 'border-border/60 bg-secondary/30',
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Cpu className="size-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-foreground">
                      Reforge Batch Solver
                    </span>
                    {isUserWinning && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                        <CheckCircle2 className="size-3" />
                        <span>WINNER</span>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 font-mono text-xs text-muted-foreground">
                    <span>
                      Gas: <strong className="text-foreground">${gasCost}</strong>
                    </span>
                    <span>&bull;</span>
                    <span>
                      Slip: <strong className="text-foreground">${slippageCost}</strong>
                    </span>
                    <span>&bull;</span>
                    <span>
                      Eff: <strong className="text-foreground">{userEfficiency}%</strong>
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-[10px] text-muted-foreground uppercase">Net Value</div>
                  <div className="text-xl font-bold text-emerald-400 tabular-nums">
                    ${netEconomicValue.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Conventional PGA Bribe Row */}
              <div
                className={cn(
                  'flex items-center justify-between rounded-xl border p-4 transition-all',
                  !isUserWinning
                    ? 'border-emerald-500/50 bg-emerald-500/10 shadow-xs'
                    : 'border-border/60 bg-secondary/20 opacity-80',
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Flame className="size-4 text-amber-400" />
                    <span className="text-sm font-semibold text-foreground">
                      Conventional PGA Bot
                    </span>
                    {!isUserWinning && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                        <CheckCircle2 className="size-3" />
                        <span>WINNER</span>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 font-mono text-xs text-muted-foreground">
                    <span>
                      Gas: <strong className="text-amber-400">${competitorGas} (Bribe)</strong>
                    </span>
                    <span>&bull;</span>
                    <span>
                      Slip: <strong className="text-foreground">${competitorSlippage}</strong>
                    </span>
                    <span>&bull;</span>
                    <span>
                      Eff: <strong className="text-foreground">{competitorEfficiency}%</strong>
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-[10px] text-muted-foreground uppercase">Net Value</div>
                  <div className="text-xl font-bold text-foreground tabular-nums">
                    ${competitorNev.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Clean KPI Telemetry Blocks */}
            <div className="grid grid-cols-3 gap-4 border-y border-border/50 py-4 text-center font-mono">
              <div>
                <div className="text-[10px] text-muted-foreground uppercase">Net Surplus</div>
                <div
                  className={cn(
                    'mt-1 text-base font-bold tabular-nums',
                    nevAdvantage >= 0 ? 'text-emerald-400' : 'text-rose-400',
                  )}
                >
                  {nevAdvantage >= 0
                    ? `+$${nevAdvantage.toLocaleString()}`
                    : `-$${Math.abs(nevAdvantage).toLocaleString()}`}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-muted-foreground uppercase">Bribe Ignored</div>
                <div className="mt-1 text-base font-bold text-amber-400 tabular-nums">
                  ${competitorGas}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-muted-foreground uppercase">Efficiency</div>
                <div className="mt-1 text-base font-bold text-primary tabular-nums">
                  {userEfficiency}%
                </div>
              </div>
            </div>

            {/* Protocol Invariant Callout */}
            <div className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
              <Shield className="mt-0.5 size-4 shrink-0 text-emerald-400" />
              <span>
                <strong className="font-semibold text-foreground">Invariant:</strong> Reforge
                ignores raw fee bribes. Liquidators who optimize DEX routing and minimize slippage
                achieve higher NEV and secure the liquidation award.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
