"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calculator, ShieldAlert, Cpu } from "lucide-react";

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
    <section className="w-full max-w-6xl mx-auto px-4 py-16 border-t border-border/40">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <Badge
          variant="outline"
          className="gap-2 px-3 py-1 rounded-full border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono mb-3"
        >
          <Calculator className="size-3.5" />
          <span>Scoring Function Lab</span>
        </Badge>
        <h2 className="text-2xl sm:text-4xl font-normal font-serif text-foreground">
          Interactive Net Economic Value (NEV) Calculator
        </h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          In Reforge, liquidators are ranked not by the size of their gas bribe to the block proposer,
          but by the true net economic value delivered.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-card shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Input Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-muted-foreground uppercase">Debt Repaid by Liquidator</span>
              <span className="text-foreground font-semibold">${debtLiquidated.toLocaleString()} USDC</span>
            </div>
            <input
              type="range"
              min={5000}
              max={50000}
              step={1000}
              value={debtLiquidated}
              onChange={(e) => setDebtLiquidated(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
              <span>$5,000</span>
              <span>$25,000</span>
              <span>$50,000</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-muted-foreground uppercase">Liquidation Incentive / Bonus</span>
              <span className="text-foreground font-semibold">{bonusPct}% (${grossBonus.toLocaleString()})</span>
            </div>
            <input
              type="range"
              min={4}
              max={12}
              step={0.5}
              value={bonusPct}
              onChange={(e) => setBonusPct(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
              <span>4% (Tight Market)</span>
              <span>8% (Standard)</span>
              <span>12% (Volatile)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 p-3.5 rounded-xl border border-border bg-secondary/40 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground">Gas Fee Bid</span>
                <span className="text-foreground font-semibold">${gasCost}</span>
              </div>
              <input
                type="range"
                min={15}
                max={300}
                step={5}
                value={gasCost}
                onChange={(e) => setGasCost(Number(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="text-[10px] text-muted-foreground font-mono block">
                Your on-chain gas expenditure
              </span>
            </div>

            <div className="space-y-2 p-3.5 rounded-xl border border-border bg-secondary/40 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground">DEX Slippage Impact</span>
                <span className="text-foreground font-semibold">${slippageCost}</span>
              </div>
              <input
                type="range"
                min={10}
                max={250}
                step={5}
                value={slippageCost}
                onChange={(e) => setSlippageCost(Number(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="text-[10px] text-muted-foreground font-mono block">
                Routing quality &amp; AMM depth
              </span>
            </div>
          </div>

          {/* Mathematical Equation Display */}
          <div className="p-3.5 rounded-xl border border-border bg-secondary/60 font-mono text-xs flex items-center justify-between flex-wrap gap-2 shadow-2xs">
            <div className="text-muted-foreground">NEV Formula:</div>
            <div className="text-foreground">
              <span className="text-emerald-400 font-semibold">${grossBonus} (Gross)</span> &minus;{" "}
              <span className="text-amber-400">${gasCost} (Gas)</span> &minus;{" "}
              <span className="text-purple-400">${slippageCost} (Slippage)</span> ={" "}
              <span className="text-primary font-bold">${netEconomicValue.toLocaleString()} NEV</span>
            </div>
          </div>
        </div>

        {/* Live Head-to-Head Scoring Card (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-xl border border-border bg-secondary/35 flex flex-col justify-between h-full space-y-5 shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Batch Auction Rank
              </span>
              <Badge
                variant={isUserWinning ? "default" : "destructive"}
                className="text-xs font-mono"
              >
                {isUserWinning ? "Rank #1 (Optimal Winner)" : "Rank #2 (Outperformed)"}
              </Badge>
            </div>

            {/* Score Cards */}
            <div className="space-y-3">
              {/* User Bidder */}
              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  isUserWinning
                    ? "border-emerald-500/60 bg-emerald-500/10 shadow-2xs"
                    : "border-border bg-secondary/50 shadow-2xs"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="size-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-foreground">Your Strategy (Optimized Routing)</span>
                  </div>
                  {isUserWinning && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                      WINNER
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-baseline justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Net Economic Value:</span>
                  <span className="text-base font-bold text-emerald-400">
                    ${netEconomicValue.toLocaleString()}
                  </span>
                </div>
                <div className="mt-1 text-[10px] text-muted-foreground font-mono flex justify-between">
                  <span>Gas: ${gasCost}</span>
                  <span>Slippage: ${slippageCost}</span>
                  <span>Efficiency: {(((netEconomicValue) / grossBonus) * 100).toFixed(1)}%</span>
                </div>
              </div>

              {/* Competitor PGA Bribe Bot */}
              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  !isUserWinning
                    ? "border-emerald-500/60 bg-emerald-500/10 shadow-2xs"
                    : "border-border bg-secondary/50 opacity-85 shadow-2xs"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="size-4 text-amber-400" />
                    <span className="text-xs font-semibold text-foreground">Competitor (PGA Gas Briber)</span>
                  </div>
                  {!isUserWinning && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                      WINNER
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-baseline justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Net Economic Value:</span>
                  <span className="text-base font-bold text-foreground">
                    ${competitorNev.toLocaleString()}
                  </span>
                </div>
                <div className="mt-1 text-[10px] text-muted-foreground font-mono flex justify-between">
                  <span>Gas: ${competitorGas} (Bribe)</span>
                  <span>Slippage: ${competitorSlippage}</span>
                  <span>Efficiency: {(((competitorNev) / grossBonus) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Takeaway */}
          <div className="p-3 rounded-lg border border-border/70 bg-secondary/40 text-xs text-muted-foreground leading-relaxed shadow-2xs">
            <span className="font-semibold text-foreground">Core Insight: </span>
            Even if the competitor burns <span className="text-amber-400 font-mono">${competitorGas}</span> in gas priority fees, Reforge ignores raw fee bribes. Your optimized execution produces higher net value, securing the liquidation award.
          </div>
        </div>
      </div>
    </section>
  );
}
