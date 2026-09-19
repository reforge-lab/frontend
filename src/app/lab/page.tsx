"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import {
  Play,
  Pause,
  RotateCcw,
  StepForward,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Shield,
  Zap,
  Activity,
  ArrowLeft,
  BookOpen,
  Sliders,
  Cpu,
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

export default function ProtocolLabPage() {
  const [mode, setMode] = useState<SimulationMode>("reforge");
  const [ethPrice, setEthPrice] = useState<number>(2420);
  const [step, setStep] = useState<StepIndex>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed] = useState<number>(1400);

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
      }, playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

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
    <div className="h-screen w-screen max-h-screen bg-background text-foreground flex flex-col overflow-hidden selection:bg-primary/20 selection:text-primary">
      {/* Top Distraction-Free Workbench Bar */}
      <header className="h-14 shrink-0 border-b border-border bg-card/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 z-20">
        {/* Brand & Mode Identification */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
          >
            <Logo className="size-6 rounded-md shadow-2xs" size={24} />
            <span className="font-semibold text-sm tracking-tight hidden sm:inline">Reforge</span>
          </Link>

          <span className="text-muted-foreground/40 hidden sm:inline">•</span>

          <Badge
            variant="outline"
            className="gap-1.5 px-2.5 py-0.5 rounded-full border-primary/30 bg-primary/10 text-primary text-xs font-mono"
          >
            <Activity className="size-3 animate-pulse" />
            <span>Protocol Lab</span>
          </Badge>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-background border border-border">
            <button
              onClick={() => {
                setMode("reforge");
                setStep(0);
                setIsPlaying(false);
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                mode === "reforge"
                  ? "bg-primary text-primary-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              <Shield className="size-3 text-emerald-400" />
              <span>Batch Auction</span>
            </button>
            <button
              onClick={() => {
                setMode("pga");
                setStep(0);
                setIsPlaying(false);
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                mode === "pga"
                  ? "bg-primary text-primary-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              <Zap className="size-3 text-amber-400" />
              <span>PGA Mempool</span>
            </button>
          </div>
        </div>

        {/* Center: Scenario Presets */}
        <div className="hidden md:flex items-center gap-1.5">
          <span className="text-[11px] font-mono text-muted-foreground mr-1">Presets:</span>
          <button
            onClick={() => handlePreset(3000)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all cursor-pointer ${
              ethPrice === 3000
                ? "border-primary bg-primary/10 text-foreground font-bold"
                : "border-border bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
            }`}
          >
            Safe ($3k)
          </button>
          <button
            onClick={() => handlePreset(2550)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all cursor-pointer ${
              ethPrice === 2550
                ? "border-primary bg-primary/10 text-foreground font-bold"
                : "border-border bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
            }`}
          >
            Vulnerable ($2.55k)
          </button>
          <button
            onClick={() => handlePreset(2350)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all cursor-pointer ${
              ethPrice === 2350
                ? "border-amber-500 bg-amber-500/20 text-amber-300 font-bold"
                : "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
            }`}
          >
            Flash Crash ($2.35k)
          </button>
        </div>

        {/* Right: Exit / Navigation Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/docs"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <BookOpen className="size-3.5" />
            <span>Docs</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-foreground border border-border transition-all"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Full-Screen Workbench Layout */}
      <main className="flex-1 min-h-0 p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 overflow-y-auto lg:overflow-hidden">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: PARAMETERS, HEALTH FACTOR & TIMELINE CONTROLS (4 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 flex flex-col gap-3 min-h-0">
          {/* Position Parameters & Slider */}
          <div className="p-4 rounded-xl border border-border bg-card shadow-xs space-y-3 shrink-0">
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Sliders className="size-3.5 text-primary" />
                <span>Loan Collateral State</span>
              </span>
              <span className="text-sm font-mono font-bold text-foreground">
                ${ethPrice.toLocaleString()} <span className="text-xs text-muted-foreground font-normal">ETH/USD</span>
              </span>
            </div>

            <div className="space-y-1.5">
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
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span>$2,100 (Underwater)</span>
                <span className="text-amber-400 font-medium">$2,500 (Threshold)</span>
                <span>$3,200 (Solvent)</span>
              </div>
            </div>

            {/* Health Factor Gauge */}
            <div className="p-3 rounded-lg border border-border/70 bg-secondary/50 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase text-muted-foreground">Position Health Factor</div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <div
                    className={`text-2xl font-bold font-mono ${
                      isLiquidatable ? "text-rose-400" : "text-emerald-400"
                    }`}
                  >
                    {healthFactor.toFixed(3)}
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground">/ 1.000 Target</span>
                </div>
              </div>

              <span
                className={`text-[11px] font-mono px-2.5 py-1 rounded-full font-bold border ${
                  isLiquidatable
                    ? "bg-rose-500/15 text-rose-400 border-rose-500/30 animate-pulse"
                    : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                }`}
              >
                {isLiquidatable ? "LIQUIDATABLE" : "SOLVENT"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1 text-muted-foreground">
              <div className="p-2 rounded bg-secondary/30 border border-border/40">
                <div className="text-[10px] text-muted-foreground/80">COLLATERAL</div>
                <div className="text-foreground font-semibold">${collateralValue.toLocaleString()} (10 ETH)</div>
              </div>
              <div className="p-2 rounded bg-secondary/30 border border-border/40">
                <div className="text-[10px] text-muted-foreground/80">DEBT OBLIGATION</div>
                <div className="text-foreground font-semibold">${debtUsdc.toLocaleString()} USDC</div>
              </div>
            </div>
          </div>

          {/* Execution Timeline & Step Playback */}
          <div className="p-4 rounded-xl border border-border bg-card shadow-xs flex-1 flex flex-col justify-between gap-3 min-h-0">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Cpu className="size-3.5 text-primary" />
                  <span>Playback Controller</span>
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  Step <span className="text-foreground font-bold">{step}</span> of 4
                </span>
              </div>

              {/* Progress Steps List */}
              <div className="space-y-1.5">
                {[
                  { idx: 0, label: "0. Loan Monitoring", desc: isLiquidatable ? "Liquidation opportunity detected" : "Loan is currently solvent" },
                  { idx: 1, label: "1. Trigger Pipeline", desc: "Borrower debt flagged for liquidator auction" },
                  { idx: 2, label: mode === "pga" ? "2. Mempool Gas Race" : "2. Discrete Batch Window", desc: mode === "pga" ? "Searchers bid toxic priority gas fees" : "Sealed quotes collected off-mempool" },
                  { idx: 3, label: mode === "pga" ? "3. Proposer Block Order" : "3. NEV Scoring Engine", desc: mode === "pga" ? "Validator orders by highest bribe" : "Engine selects highest Net Economic Value" },
                  { idx: 4, label: "4. Settlement", desc: mode === "pga" ? "Winner takes margin, losers revert" : "Order-fair settlement with zero reverts" },
                ].map((s) => (
                  <div
                    key={s.idx}
                    className={`p-2 rounded-lg text-xs font-mono transition-all flex items-start justify-between gap-2 ${
                      step === s.idx
                        ? "bg-primary/10 border border-primary/40 text-foreground font-semibold"
                        : step > s.idx
                        ? "bg-secondary/30 border border-border/40 text-muted-foreground"
                        : "opacity-40 border border-transparent text-muted-foreground"
                    }`}
                  >
                    <div>
                      <div className="text-[11px] flex items-center gap-1.5">
                        {step > s.idx && <CheckCircle2 className="size-3 text-emerald-400" />}
                        {step === s.idx && <span className="size-2 rounded-full bg-primary animate-pulse" />}
                        <span>{s.label}</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground/80 font-normal leading-tight mt-0.5">
                        {s.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-border/50 flex items-center gap-2">
              <Button
                size="sm"
                variant={isPlaying ? "secondary" : "default"}
                onClick={() => {
                  if (step >= 4) setStep(0);
                  setIsPlaying(!isPlaying);
                }}
                disabled={!isLiquidatable}
                className="gap-1.5 flex-1 cursor-pointer text-xs h-9 shadow-xs"
              >
                {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5 fill-current" />}
                <span>{isPlaying ? "Pause" : step >= 4 ? "Replay Pipeline" : "Run Simulation"}</span>
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={handleStepForward}
                disabled={step >= 4 || isPlaying || !isLiquidatable}
                className="gap-1.5 cursor-pointer text-xs h-9 bg-background hover:bg-secondary px-3"
              >
                <StepForward className="size-3.5" />
                <span>Next</span>
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={handleReset}
                disabled={step === 0 && !isPlaying}
                className="gap-1 cursor-pointer text-xs h-9 text-muted-foreground hover:text-foreground px-2.5"
              >
                <RotateCcw className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTER COLUMN: COMPETING LIQUIDATORS ARENA (5 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col gap-3 min-h-0">
          <div className="p-4 rounded-xl border border-border bg-card shadow-xs flex-1 flex flex-col justify-between gap-3 min-h-0">
            <div>
              <div className="flex items-center justify-between border-b border-border/50 pb-2.5 mb-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                  Competing Liquidators Arena
                </span>
                <Badge variant="secondary" className="text-[10px] font-mono">
                  {mode === "pga" ? "Mempool Bids" : "Batch Sealed Quotes"}
                </Badge>
              </div>

              {/* Bot Cards */}
              <div className="space-y-2.5">
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
                            className={`size-2.5 rounded-full ${
                              isWinner
                                ? "bg-emerald-500 animate-pulse"
                                : isReverted
                                ? "bg-rose-500"
                                : "bg-muted-foreground"
                            }`}
                          />
                          <span className="text-xs font-bold text-foreground">{bot.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-background border border-border/60 text-muted-foreground font-mono">
                            {bot.strategy}
                          </span>
                        </div>

                        {/* Status Output */}
                        <div className="text-xs font-mono">
                          {step === 0 && <span className="text-muted-foreground">Standby</span>}
                          {step === 1 && <span className="text-blue-400">Target Acquired</span>}
                          {step === 2 && (
                            <span className={mode === "pga" ? "text-amber-400 font-bold" : "text-purple-400"}>
                              {mode === "pga" ? `Bid: ${bot.gasPriceGwei} Gwei` : "Sealed Quote Submitted"}
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

                      {/* Bot Financial Specs */}
                      <div className="mt-2.5 grid grid-cols-4 gap-2 pt-2 border-t border-border/40 text-[11px] font-mono">
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
            </div>

            {/* Invariant Rule Callout */}
            <div
              className={`p-3 rounded-lg border text-xs leading-relaxed ${
                mode === "reforge"
                  ? "border-emerald-500/30 bg-secondary/50 text-emerald-300"
                  : "border-amber-500/30 bg-secondary/50 text-amber-300"
              }`}
            >
              {mode === "reforge" ? (
                <div className="flex items-start gap-2">
                  <Shield className="size-4 shrink-0 mt-0.5 text-emerald-400" />
                  <span>
                    <strong>Reforge Invariant:</strong> Bids are scored by Net Economic Value ($NEV$). Gas
                    priority bribes to block proposers cannot alter auction selection.
                  </span>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <AlertTriangle className="size-4 shrink-0 mt-0.5 text-amber-400" />
                  <span>
                    <strong>PGA Vulnerability:</strong> Searcher B burns $230 in proposer bribes to frontrun
                    competitors, extracting margin that should belong to borrowers.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: OUTCOME & FINANCIAL TELEMETRY (3 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-3 flex flex-col gap-3 min-h-0">
          <div className="p-4 rounded-xl border border-border bg-card shadow-xs flex-1 flex flex-col justify-between gap-3 min-h-0">
            <div>
              <div className="flex items-center justify-between border-b border-border/50 pb-2.5 mb-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                  Mechanism Telemetry
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">Live Outcome</span>
              </div>

              {/* Settlement Summary */}
              <div className="p-3 rounded-lg border border-border/60 bg-secondary/40 space-y-1 mb-3">
                <div className="text-xs font-bold text-foreground">
                  {mode === "pga"
                    ? "Winner: Searcher B (Gas War)"
                    : "Winner: Searcher C (Optimal Routing)"}
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  {mode === "pga"
                    ? "165 Gwei bribe won block inclusion. 2 competitor transactions failed on-chain."
                    : "Lowest DEX slippage generated $440 NEV. Deterministic single-tx execution."}
                </p>
              </div>

              {/* Comparative Metrics Grid */}
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg border border-border/60 bg-secondary/50 flex flex-col gap-1">
                  <div className="text-muted-foreground text-[10px] uppercase">Validator MEV Extracted</div>
                  <div className={`font-bold ${mode === "pga" ? "text-amber-400" : "text-emerald-400"}`}>
                    {mode === "pga" ? "$230.00 (Gas Bribe)" : "$0.00 (Pure Gas Only)"}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg border border-border/60 bg-secondary/50 flex flex-col gap-1">
                  <div className="text-muted-foreground text-[10px] uppercase">Liquidator Net Margin</div>
                  <div className="font-bold text-foreground">
                    {mode === "pga" ? "$230.00 (Searcher B)" : "$440.00 (Searcher C)"}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg border border-border/60 bg-secondary/50 flex flex-col gap-1">
                  <div className="text-muted-foreground text-[10px] uppercase">Borrower Residual Preserved</div>
                  <div className={`font-bold ${mode === "reforge" ? "text-emerald-400" : "text-rose-400"}`}>
                    {mode === "reforge" ? "+$180.00 Preserved" : "$0.00 (Fixed 10% Haircut)"}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg border border-border/60 bg-secondary/50 flex flex-col gap-1">
                  <div className="text-muted-foreground text-[10px] uppercase">Wasted / Reverted Gas</div>
                  <div className={`font-bold ${mode === "pga" ? "text-rose-400" : "text-emerald-400"}`}>
                    {mode === "pga" ? "$103.00 (Searcher A & C)" : "$0.00 (0 Reverts)"}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <Link href="/docs/specs/backend/scoring-function" className="hover:text-primary transition-colors">
                NEV Scoring Spec &rarr;
              </Link>
              <Link href="/design" className="hover:text-primary transition-colors">
                Design Spec &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
