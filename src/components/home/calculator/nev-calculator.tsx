'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Calculator, ShieldAlert, Cpu } from 'lucide-react';

export function NevCalculator() {
  const [debtLiquidated, setDebtLiquidated] = useState<number>(20000);
  const [bonusPct, setBonusPct] = useState<number>(8);
  const [gasCost, setGasCost] = useState<number>(55);
  const [slippageCost, setSlippageCost] = useState<number>(45);

  const grossBonus = (debtLiquidated * bonusPct) / 100;
  const totalCost = gasCost + slippageCost;
  const netEconomicValue = grossBonus - totalCost;

  // Comparison bidder (Competitor trying PGA gas bribery)
  const competitorGas = 240;
  const competitorSlippage = 90;
  const competitorTotalCost = competitorGas + competitorSlippage;
  const competitorNev = grossBonus - competitorTotalCost;

  const isUserWinning = netEconomicValue > competitorNev;

  return (
    <section className="mx-auto w-full max-w-6xl border-t border-border/40 px-4 py-16">
      <div className="mx-auto mb-10 max-w-2xl text-center">
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
          proposer, but by the true net economic value delivered.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 rounded-2xl bg-card p-6 shadow-sm lg:grid-cols-12">
        {/* Sliders Input Form (7 cols) */}
        <div className="space-y-6 lg:col-span-7">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                Debt Repaid by Liquidator
              </span>
              <span className="font-mono font-semibold text-foreground tabular-nums">
                ${debtLiquidated.toLocaleString()} USDC
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={50000}
              step={1000}
              value={debtLiquidated}
              onChange={(e) => setDebtLiquidated(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
            />
            <div className="flex justify-between font-mono text-[10px] text-muted-foreground tabular-nums">
              <span>$5,000</span>
              <span>$25,000</span>
              <span>$50,000</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                Liquidation Incentive / Bonus
              </span>
              <span className="font-mono font-semibold text-foreground tabular-nums">
                {bonusPct}% (${grossBonus.toLocaleString()})
              </span>
            </div>
            <input
              type="range"
              min={4}
              max={12}
              step={0.5}
              value={bonusPct}
              onChange={(e) => setBonusPct(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>
                4% <span className="text-[9px] text-muted-foreground/70">(Tight)</span>
              </span>
              <span>
                8% <span className="text-[9px] text-muted-foreground/70">(Standard)</span>
              </span>
              <span>
                12% <span className="text-[9px] text-muted-foreground/70">(Volatile)</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2 rounded-xl border border-border bg-secondary/40 p-3.5 shadow-2xs">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-muted-foreground">Gas Fee Bid</span>
                <span className="font-mono font-semibold text-foreground tabular-nums">
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
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
              />
              <span className="block text-[10px] text-muted-foreground">
                Your on-chain gas expenditure
              </span>
            </div>

            <div className="space-y-2 rounded-xl border border-border bg-secondary/40 p-3.5 shadow-2xs">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-muted-foreground">DEX Slippage Impact</span>
                <span className="font-mono font-semibold text-foreground tabular-nums">
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
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
              />
              <span className="block text-[10px] text-muted-foreground">
                Routing quality &amp; AMM depth
              </span>
            </div>
          </div>

          {/* Mathematical Equation Display */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-secondary/60 p-3.5 font-mono text-xs shadow-2xs">
            <div className="text-muted-foreground">NEV Formula:</div>
            <div className="text-foreground">
              <span className="font-semibold text-emerald-400">${grossBonus} (Gross)</span> &minus;{' '}
              <span className="text-amber-400">${gasCost} (Gas)</span> &minus;{' '}
              <span className="text-purple-400">${slippageCost} (Slippage)</span> ={' '}
              <span className="font-bold text-primary">
                ${netEconomicValue.toLocaleString()} NEV
              </span>
            </div>
          </div>
        </div>

        {/* Live Head-to-Head Scoring Card (5 cols) */}
        <div className="flex h-full flex-col justify-between space-y-5 rounded-xl border border-border bg-secondary/35 p-5 shadow-xs lg:col-span-5">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                Batch Auction Rank
              </span>
              <Badge
                variant={isUserWinning ? 'default' : 'destructive'}
                className="font-mono text-xs"
              >
                {isUserWinning ? 'Rank #1 (Optimal Winner)' : 'Rank #2 (Outperformed)'}
              </Badge>
            </div>

            {/* Score Cards */}
            <div className="space-y-3">
              {/* User Bidder */}
              <div
                className={`rounded-xl border p-3.5 transition-all ${
                  isUserWinning
                    ? 'border-emerald-500/60 bg-emerald-500/10 shadow-2xs'
                    : 'border-border bg-secondary/50 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="size-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-foreground">
                      Your Strategy (Optimized Routing)
                    </span>
                  </div>
                  {isUserWinning && (
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                      WINNER
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-baseline justify-between font-mono text-xs">
                  <span className="text-muted-foreground">Net Economic Value:</span>
                  <span className="text-base font-bold text-emerald-400">
                    ${netEconomicValue.toLocaleString()}
                  </span>
                </div>
                <div className="mt-1 flex justify-between font-mono text-[10px] text-muted-foreground">
                  <span>Gas: ${gasCost}</span>
                  <span>Slippage: ${slippageCost}</span>
                  <span>Efficiency: {((netEconomicValue / grossBonus) * 100).toFixed(1)}%</span>
                </div>
              </div>

              {/* Competitor PGA Bribe Bot */}
              <div
                className={`rounded-xl border p-3.5 transition-all ${
                  !isUserWinning
                    ? 'border-emerald-500/60 bg-emerald-500/10 shadow-2xs'
                    : 'border-border bg-secondary/50 opacity-85 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="size-4 text-amber-400" />
                    <span className="text-xs font-semibold text-foreground">
                      Competitor (PGA Gas Briber)
                    </span>
                  </div>
                  {!isUserWinning && (
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                      WINNER
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-baseline justify-between font-mono text-xs">
                  <span className="text-muted-foreground">Net Economic Value:</span>
                  <span className="text-base font-bold text-foreground">
                    ${competitorNev.toLocaleString()}
                  </span>
                </div>
                <div className="mt-1 flex justify-between font-mono text-[10px] text-muted-foreground">
                  <span>Gas: ${competitorGas} (Bribe)</span>
                  <span>Slippage: ${competitorSlippage}</span>
                  <span>Efficiency: {((competitorNev / grossBonus) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Takeaway */}
          <div className="rounded-lg border border-border/70 bg-secondary/40 p-3 text-xs leading-relaxed text-muted-foreground shadow-2xs">
            <span className="font-semibold text-foreground">Core Insight: </span>
            Even if the competitor burns{' '}
            <span className="font-mono text-amber-400">${competitorGas}</span> in gas priority fees,
            Reforge ignores raw fee bribes. Your optimized execution produces higher net value,
            securing the liquidation award.
          </div>
        </div>
      </div>
    </section>
  );
}
