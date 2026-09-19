"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Play,
  RotateCcw,
  StepForward,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Shield,
  Zap,
  Activity,
  Maximize2,
  ArrowRight,
} from "lucide-react";

type SimulationMode = "pga" | "reforge";
type StepIndex = 0 | 1 | 2 | 3 | 4;

interface BotBid {
  name: string;
  strategy: string;
  gasPriceGwei: number;
  gasCostUsd: number;
  slippageCostUsd: number;
  grossProfitUsd: number;
  nevUsd: number;
  pgaStatus: "pending" | "reverted" | "winner";
  reforgeStatus: "pending" | "ranked" | "winner";
  reforgeRank?: number;
}

export function AuctionSimulator() {
  const [mode, setMode] = useState<SimulationMode>("reforge");
  const [ethPrice, setEthPrice] = useState<number>(2420);
  const [step, setStep] = useState<StepIndex>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Constants for sample loan
  const collateralEth = 10;
  const debtUsdc = 20000;
  const liquidationThreshold = 0.8; // 80%

  // Live calculated metrics
  const collateralValue = collateralEth * ethPrice;
  const healthFactor = (collateralValue * liquidationThreshold) / debtUsdc;
  const isLiquidatable = healthFactor < 1.0;

  // Bot states
  const bots: BotBid[] = [
    {
      name: "Searcher A",
      strategy: "Mempool Speed Bot",
      gasPriceGwei: 45,
      gasCostUsd: 65,
      slippageCostUsd: 55,
      grossProfitUsd: 500,
      nevUsd: 380,
      pgaStatus: step >= 4 ? "reverted" : "pending",
      reforgeStatus: step >= 3 ? "ranked" : "pending",
      reforgeRank: 2,
    },
    {
      name: "Searcher B",
      strategy: "Gas War Bribe Maxi",
      gasPriceGwei: 165,
      gasCostUsd: 230,
      slippageCostUsd: 40,
      grossProfitUsd: 500,
      nevUsd: 230,
      pgaStatus: step >= 4 ? "winner" : "pending",
      reforgeStatus: step >= 3 ? "ranked" : "pending",
      reforgeRank: 3,
    },
    {
      name: "Searcher C",
      strategy: "Optimized Route Liquidator",
      gasPriceGwei: 28,
      gasCostUsd: 38,
      slippageCostUsd: 22,
      grossProfitUsd: 500,
      nevUsd: 440,
      pgaStatus: step >= 4 ? "reverted" : "pending",
      reforgeStatus: step >= 4 ? "winner" : step >= 3 ? "ranked" : "pending",
      reforgeRank: 1,
    },
  ];

  // Auto-play timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep((prev) => {
          if (prev >= 4) {
            setIsPlaying(false);
            return 4;
          }
          return (prev + 1) as StepIndex;
        });
      }, 1600);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleReset = () => {
    setIsPlaying(false);
    setStep(0);
  };

  const handleStepForward = () => {
    if (step < 4) {
      setStep((prev) => (prev + 1) as StepIndex);
    }
  };

  const handlePreset = (price: number) => {
    setEthPrice(price);
    setStep(0);
    setIsPlaying(false);
  };

  return (
    <section id="simulator" className="w-full max-w-6xl mx-auto px-4 py-16 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <Badge
          variant="outline"
          className="gap-2 px-3 py-1 rounded-full border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-3"
        >
          <Activity className="size-3.5 animate-pulse" />
          <span>Interactive Protocol Lab</span>
        </Badge>
        <h2 className="text-2xl sm:text-4xl font-normal font-serif text-foreground">
          Visualise The Liquidation Mechanism
        </h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Drag the collateral price slider to trigger liquidation ($HF &lt; 1.0$), then toggle between
          conventional Priority Gas Auctions and Reforge&apos;s MEV-Aware Batch Auction to see the exact
          difference in execution, MEV leakage, and borrower preservation.
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Link
            href="/lab"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-all shadow-2xs group"
          >
            <Maximize2 className="size-3 text-primary group-hover:scale-110 transition-transform" />
            <span>Open Dedicated Fullscreen Lab</span>
            <ArrowRight className="size-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="rounded-2xl bg-card overflow-hidden shadow-sm">
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 border-b border-border bg-secondary/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-background border border-border w-fit shadow-2xs">
            <button
              onClick={() => {
                setMode("reforge");
                setStep(0);
                setIsPlaying(false);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                mode === "reforge"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Shield className="size-3.5 text-emerald-400" />
              <span>Reforge Batch Auction</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-semibold">
                Order-Fair
              </span>
            </button>

            <button
              onClick={() => {
                setMode("pga");
                setStep(0);
                setIsPlaying(false);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                mode === "pga"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Zap className="size-3.5 text-amber-400" />
              <span>Conventional (PGA)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-semibold">
                Mempool Race
              </span>
            </button>
          </div>

          {/* Quick Scenario Preset Chips + Fullscreen Link */}
          <div className="flex items-center gap-2 flex-wrap justify-between lg:justify-end">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-mono text-muted-foreground mr-1">Presets:</span>
              <button
                onClick={() => handlePreset(3000)}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-border bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all cursor-pointer shadow-2xs"
              >
                Safe (ETH $3,000)
              </button>
              <button
                onClick={() => handlePreset(2550)}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-border bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all cursor-pointer shadow-2xs"
              >
                Vulnerable ($2,550)
              </button>
              <button
                onClick={() => handlePreset(2350)}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer shadow-2xs"
              >
                Flash Crash ($2,350)
              </button>
            </div>

            <Link
              href="/lab"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium border border-border/80 bg-background hover:bg-secondary text-foreground transition-colors shadow-2xs"
            >
              <Maximize2 className="size-3 text-primary" />
              <span>Full Page</span>
            </Link>
          </div>
        </div>

        {/* Position Health Factor Bar & Sliders */}
        <div className="p-4 sm:p-6 border-b border-border bg-card grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Slider Column */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Collateral Market Price (ETH/USD)
              </span>
              <span className="text-sm font-mono font-semibold text-foreground">
                ${ethPrice.toLocaleString()}
              </span>
            </div>

            <input
              type="range"
              min={2100}
              max={3200}
              step={10}
              value={ethPrice}
              onChange={(e) => {
                setEthPrice(Number(e.target.value));
                if (step > 0) setStep(0);
              }}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />

            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <span>$2,100 (Deep Underwater)</span>
              <span>$2,500 (Threshold HF = 1.00)</span>
              <span>$3,200 (Solvent)</span>
            </div>
          </div>

          {/* Solvency Health Factor Metric Badge */}
          <div className="p-4 rounded-xl border border-border bg-secondary/40 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-muted-foreground">
                Position Health Factor
              </span>
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                  isLiquidatable
                    ? "bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-pulse"
                    : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                }`}
              >
                {isLiquidatable ? "LIQUIDATABLE" : "SOLVENT"}
              </span>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <div
                className={`text-3xl font-bold font-mono ${
                  isLiquidatable ? "text-rose-400" : "text-emerald-400"
                }`}
              >
                {healthFactor.toFixed(3)}
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                / 1.000 Target
              </span>
            </div>

            <div className="mt-2 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
              <span>Collateral: ${collateralValue.toLocaleString()}</span>
              <span>Debt: ${debtUsdc.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Playback Step Controller */}
        <div className="px-4 sm:px-6 py-3 border-b border-border bg-secondary/30 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={isPlaying ? "secondary" : "default"}
              onClick={() => {
                if (step >= 4) setStep(0);
                setIsPlaying(!isPlaying);
              }}
              disabled={!isLiquidatable}
              className="gap-1.5 cursor-pointer text-xs h-8 shadow-xs"
            >
              <Play className="size-3 fill-current" />
              <span>{isPlaying ? "Pause" : step >= 4 ? "Replay" : "Run Simulation"}</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={handleStepForward}
              disabled={step >= 4 || isPlaying || !isLiquidatable}
              className="gap-1.5 cursor-pointer text-xs h-8 bg-background hover:bg-secondary"
            >
              <StepForward className="size-3" />
              <span>Step</span>
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={handleReset}
              disabled={step === 0 && !isPlaying}
              className="gap-1 cursor-pointer text-xs h-8 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3" />
              <span>Reset</span>
            </Button>
          </div>

          {/* Step Timeline Indicator */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-muted-foreground">Step {step}/4:</span>
            <span className="text-foreground font-medium">
              {step === 0 && (isLiquidatable ? "Opportunity Detected" : "Monitoring Loan Health")}
              {step === 1 && "Triggering Liquidation Pipeline"}
              {step === 2 && (mode === "pga" ? "Mempool Gas Escalation" : "Discrete Batch Window Open")}
              {step === 3 && (mode === "pga" ? "Validator Block Selection" : "Scoring Net Economic Value")}
              {step === 4 && "Settlement Completed"}
            </span>
          </div>
        </div>

        {/* Visual Arena / Animated Execution Board */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bots Bidding Matrix (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pb-1">
              <span>COMPETING LIQUIDATORS</span>
              <span>{mode === "pga" ? "PGA Mempool Bids" : "Batch Auction Sealed Quotes"}</span>
            </div>

            {bots.map((bot) => {
              const isWinner =
                mode === "pga" ? bot.pgaStatus === "winner" : bot.reforgeStatus === "winner";
              const isReverted = mode === "pga" && bot.pgaStatus === "reverted";

              return (
                <div
                  key={bot.name}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isWinner
                      ? "border-emerald-500/60 bg-emerald-500/10 shadow-xs"
                      : isReverted
                      ? "border-rose-500/40 bg-rose-500/5 opacity-80"
                      : "border-border/80 bg-secondary/35 hover:bg-secondary/60 shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`size-2 rounded-full ${
                          isWinner
                            ? "bg-emerald-500 animate-pulse"
                            : isReverted
                            ? "bg-rose-500"
                            : "bg-muted-foreground"
                        }`}
                      />
                      <span className="text-xs font-semibold text-foreground">{bot.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-background border border-border/60 text-muted-foreground font-mono">
                        {bot.strategy}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="text-xs font-mono">
                      {step === 0 && <span className="text-muted-foreground">Standby</span>}
                      {step === 1 && <span className="text-blue-400">Target Acquired</span>}
                      {step === 2 && (
                        <span className={mode === "pga" ? "text-amber-400 font-bold" : "text-purple-400"}>
                          {mode === "pga" ? `Bid: ${bot.gasPriceGwei} Gwei` : "Sealed Quote In Window"}
                        </span>
                      )}
                      {step === 3 && (
                        <span>
                          {mode === "pga" ? (
                            bot.name === "Searcher B" ? (
                              <span className="text-amber-400 font-bold">Priority Frontrun</span>
                            ) : (
                              <span className="text-muted-foreground">Outbid</span>
                            )
                          ) : (
                            <span className="text-emerald-400 font-bold">
                              NEV Rank #{bot.reforgeRank} (${bot.nevUsd})
                            </span>
                          )}
                        </span>
                      )}
                      {step === 4 && (
                        <span>
                          {isWinner ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <CheckCircle2 className="size-3.5" />
                              <span>WINNER (Settled)</span>
                            </span>
                          ) : isReverted ? (
                            <span className="text-rose-400 font-bold flex items-center gap-1">
                              <XCircle className="size-3.5" />
                              <span>REVERTED (-${bot.gasCostUsd})</span>
                            </span>
                          ) : (
                            <span className="text-muted-foreground">Unselected</span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Financial Breakdown per Bidder */}
                  <div className="mt-3 grid grid-cols-4 gap-2 pt-2 border-t border-border/40 text-[11px] font-mono">
                    <div>
                      <div className="text-muted-foreground/80 text-[10px]">GAS FEE</div>
                      <div className={bot.gasPriceGwei > 100 ? "text-amber-400 font-bold" : "text-foreground"}>
                        ${bot.gasCostUsd} <span className="text-[9px]">({bot.gasPriceGwei}g)</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground/80 text-[10px]">DEX SLIP</div>
                      <div className="text-foreground">${bot.slippageCostUsd}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground/80 text-[10px]">GROSS BONUS</div>
                      <div className="text-foreground">${bot.grossProfitUsd}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground/80 text-[10px]">NET VALUE (NEV)</div>
                      <div
                        className={
                          bot.nevUsd === 440 ? "text-emerald-400 font-bold" : "text-foreground font-semibold"
                        }
                      >
                        ${bot.nevUsd}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Outcome & Comparison Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-xl border border-border bg-secondary/40 space-y-4 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Mechanism Outcome
                </span>
                <Badge variant="secondary" className="text-[10px] font-mono">
                  {mode === "pga" ? "PGA Auction" : "Batch Auction"}
                </Badge>
              </div>

              <div className="text-sm font-semibold text-foreground">
                {mode === "pga"
                  ? "Winner: Searcher B (Highest Gas Bribe)"
                  : "Winner: Searcher C (Optimal Routing & NEV)"}
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-snug">
                {mode === "pga"
                  ? "Searcher B paid an enormous 165 Gwei bribe to block validators. 2 competitor transactions failed on-chain, burning gas and wasting block space."
                  : "Searcher C routed with lowest DEX slippage and nominal gas fee, generating $440 Net Economic Value. Exactly one transaction executed with zero gas waste."}
              </p>
            </div>

            {/* Live Metrics Comparison Grid */}
            <div className="p-3 rounded-lg border border-border/70 bg-secondary/50 space-y-2.5 text-xs font-mono shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Validator MEV Extracted:</span>
                <span className={mode === "pga" ? "text-amber-400 font-bold" : "text-emerald-400 font-semibold"}>
                  {mode === "pga" ? "$230.00 (Gas Bribe)" : "$0.00 (Pure Gas Only)"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Liquidator Net Margin:</span>
                <span className="text-foreground font-semibold">
                  {mode === "pga" ? "$230.00 (Searcher B)" : "$440.00 (Searcher C)"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Borrower Residual Preserved:</span>
                <span className={mode === "reforge" ? "text-emerald-400 font-bold" : "text-rose-400"}>
                  {mode === "pga" ? "$0.00 (Fixed 10% Haircut)" : "+$180.00 Preserved"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Wasted / Reverted Gas:</span>
                <span className={mode === "pga" ? "text-rose-400 font-bold" : "text-emerald-400"}>
                  {mode === "pga" ? "$103.00 (Searcher A & C)" : "$0.00 (0 Reverts)"}
                </span>
              </div>
            </div>

            {/* Bottom Recommendation Alert */}
            <div
              className={`p-3 rounded-lg border text-xs leading-relaxed bg-secondary/40 ${
                mode === "reforge"
                  ? "border-emerald-500/30 text-emerald-300"
                  : "border-amber-500/30 text-amber-300"
              }`}
            >
              {mode === "reforge" ? (
                <div className="flex items-start gap-2">
                  <Shield className="size-4 shrink-0 mt-0.5 text-emerald-400" />
                  <span>
                    <strong>Reforge Invariant:</strong> The highest Net Economic Value wins. Frontrunning
                    with gas bribes cannot alter selection priority.
                  </span>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <AlertTriangle className="size-4 shrink-0 mt-0.5 text-amber-400" />
                  <span>
                    <strong>PGA Failure:</strong> Proposers pocket the liquidator margin while borrowers
                    suffer maximal collateral liquidation.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
