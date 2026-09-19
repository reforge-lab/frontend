'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
} from 'lucide-react';

type SimulationMode = 'pga' | 'reforge';
type StepIndex = 0 | 1 | 2 | 3 | 4;

interface BotBid {
  name: string;
  strategy: string;
  gasPriceGwei: number;
  gasCostUsd: number;
  slippageCostUsd: number;
  grossProfitUsd: number;
  nevUsd: number;
  pgaStatus: 'pending' | 'reverted' | 'winner';
  reforgeStatus: 'pending' | 'ranked' | 'winner';
  reforgeRank?: number;
}

export function AuctionSimulator() {
  const [mode, setMode] = useState<SimulationMode>('reforge');
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
      name: 'Searcher A',
      strategy: 'Mempool Speed Bot',
      gasPriceGwei: 45,
      gasCostUsd: 65,
      slippageCostUsd: 55,
      grossProfitUsd: 500,
      nevUsd: 380,
      pgaStatus: step >= 4 ? 'reverted' : 'pending',
      reforgeStatus: step >= 3 ? 'ranked' : 'pending',
      reforgeRank: 2,
    },
    {
      name: 'Searcher B',
      strategy: 'Gas War Bribe Maxi',
      gasPriceGwei: 165,
      gasCostUsd: 230,
      slippageCostUsd: 40,
      grossProfitUsd: 500,
      nevUsd: 230,
      pgaStatus: step >= 4 ? 'winner' : 'pending',
      reforgeStatus: step >= 3 ? 'ranked' : 'pending',
      reforgeRank: 3,
    },
    {
      name: 'Searcher C',
      strategy: 'Optimized Route Liquidator',
      gasPriceGwei: 28,
      gasCostUsd: 38,
      slippageCostUsd: 22,
      grossProfitUsd: 500,
      nevUsd: 440,
      pgaStatus: step >= 4 ? 'reverted' : 'pending',
      reforgeStatus: step >= 4 ? 'winner' : step >= 3 ? 'ranked' : 'pending',
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
    <section id="simulator" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16">
      {/* Section Header */}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <Badge
          variant="outline"
          className="mb-3 gap-2 rounded-full border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
        >
          <Activity className="size-3.5 animate-pulse" />
          <span>Interactive Protocol Lab</span>
        </Badge>
        <h2 className="font-serif text-2xl font-normal text-foreground sm:text-4xl">
          Visualise The Liquidation Mechanism
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Drag the collateral price slider to trigger liquidation ($HF &lt; 1.0$), then toggle
          between conventional Priority Gas Auctions and Reforge&apos;s MEV-Aware Batch Auction to
          see the exact difference in execution, MEV leakage, and borrower preservation.
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Link
            href="/lab"
            className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs font-medium text-foreground shadow-2xs transition-all hover:bg-secondary/80"
          >
            <Maximize2 className="size-3 text-primary transition-transform group-hover:scale-110" />
            <span>Open Dedicated Fullscreen Lab</span>
            <ArrowRight className="size-3 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
        {/* Top Control Bar */}
        <div className="flex flex-col justify-between gap-4 border-b border-border bg-secondary/50 p-4 sm:p-5 lg:flex-row lg:items-center">
          {/* Mode Switcher Tabs */}
          <div className="flex w-fit items-center gap-1.5 rounded-xl border border-border bg-background p-1 shadow-2xs">
            <button
              onClick={() => {
                setMode('reforge');
                setStep(0);
                setIsPlaying(false);
              }}
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                mode === 'reforge'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              <Shield className="size-3.5 text-emerald-400" />
              <span>Reforge Batch Auction</span>
              <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-300">
                Order-Fair
              </span>
            </button>

            <button
              onClick={() => {
                setMode('pga');
                setStep(0);
                setIsPlaying(false);
              }}
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                mode === 'pga'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              <Zap className="size-3.5 text-amber-400" />
              <span>Conventional (PGA)</span>
              <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-amber-300">
                Mempool Race
              </span>
            </button>
          </div>

          {/* Quick Scenario Preset Chips + Fullscreen Link */}
          <div className="flex flex-wrap items-center justify-between gap-2 lg:justify-end">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 font-mono text-[11px] text-muted-foreground">Presets:</span>
              <button
                onClick={() => handlePreset(3000)}
                className="cursor-pointer rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-[11px] text-secondary-foreground shadow-2xs transition-all hover:bg-secondary/80"
              >
                Safe (ETH $3,000)
              </button>
              <button
                onClick={() => handlePreset(2550)}
                className="cursor-pointer rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-[11px] text-secondary-foreground shadow-2xs transition-all hover:bg-secondary/80"
              >
                Vulnerable ($2,550)
              </button>
              <button
                onClick={() => handlePreset(2350)}
                className="cursor-pointer rounded-md border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 font-mono text-[11px] text-amber-300 shadow-2xs transition-all hover:bg-amber-500/20"
              >
                Flash Crash ($2,350)
              </button>
            </div>

            <Link
              href="/lab"
              className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-background px-3 py-1 text-xs font-medium text-foreground shadow-2xs transition-colors hover:bg-secondary"
            >
              <Maximize2 className="size-3 text-primary" />
              <span>Full Page</span>
            </Link>
          </div>
        </div>

        {/* Position Health Factor Bar & Sliders */}
        <div className="grid grid-cols-1 items-center gap-6 border-b border-border bg-card p-4 sm:p-6 lg:grid-cols-3">
          {/* Slider Column */}
          <div className="space-y-3 lg:col-span-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                Collateral Market Price (ETH/USD)
              </span>
              <span className="font-mono text-sm font-semibold text-foreground">
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
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
            />

            <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
              <span>$2,100 (Deep Underwater)</span>
              <span>$2,500 (Threshold HF = 1.00)</span>
              <span>$3,200 (Solvent)</span>
            </div>
          </div>

          {/* Solvency Health Factor Metric Badge */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-secondary/40 p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-muted-foreground uppercase">
                Position Health Factor
              </span>
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-[11px] font-semibold ${
                  isLiquidatable
                    ? 'animate-pulse border border-rose-500/30 bg-rose-500/15 text-rose-400'
                    : 'border border-emerald-500/30 bg-emerald-500/15 text-emerald-400'
                }`}
              >
                {isLiquidatable ? 'LIQUIDATABLE' : 'SOLVENT'}
              </span>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <div
                className={`font-mono text-3xl font-bold ${
                  isLiquidatable ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {healthFactor.toFixed(3)}
              </div>
              <span className="font-mono text-xs text-muted-foreground">/ 1.000 Target</span>
            </div>

            <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
              <span>Collateral: ${collateralValue.toLocaleString()}</span>
              <span>Debt: ${debtUsdc.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Playback Step Controller */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/30 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={isPlaying ? 'secondary' : 'default'}
              onClick={() => {
                if (step >= 4) setStep(0);
                setIsPlaying(!isPlaying);
              }}
              disabled={!isLiquidatable}
              className="h-8 cursor-pointer gap-1.5 text-xs shadow-xs"
            >
              <Play className="size-3 fill-current" />
              <span>{isPlaying ? 'Pause' : step >= 4 ? 'Replay' : 'Run Simulation'}</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={handleStepForward}
              disabled={step >= 4 || isPlaying || !isLiquidatable}
              className="h-8 cursor-pointer gap-1.5 bg-background text-xs hover:bg-secondary"
            >
              <StepForward className="size-3" />
              <span>Step</span>
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={handleReset}
              disabled={step === 0 && !isPlaying}
              className="h-8 cursor-pointer gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3" />
              <span>Reset</span>
            </Button>
          </div>

          {/* Step Timeline Indicator */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-muted-foreground">Step {step}/4:</span>
            <span className="font-medium text-foreground">
              {step === 0 && (isLiquidatable ? 'Opportunity Detected' : 'Monitoring Loan Health')}
              {step === 1 && 'Triggering Liquidation Pipeline'}
              {step === 2 &&
                (mode === 'pga' ? 'Mempool Gas Escalation' : 'Discrete Batch Window Open')}
              {step === 3 &&
                (mode === 'pga' ? 'Validator Block Selection' : 'Scoring Net Economic Value')}
              {step === 4 && 'Settlement Completed'}
            </span>
          </div>
        </div>

        {/* Visual Arena / Animated Execution Board */}
        <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-12">
          {/* Bots Bidding Matrix (7 cols) */}
          <div className="space-y-3 lg:col-span-7">
            <div className="flex items-center justify-between pb-1 font-mono text-xs text-muted-foreground">
              <span>COMPETING LIQUIDATORS</span>
              <span>{mode === 'pga' ? 'PGA Mempool Bids' : 'Batch Auction Sealed Quotes'}</span>
            </div>

            {bots.map((bot) => {
              const isWinner =
                mode === 'pga' ? bot.pgaStatus === 'winner' : bot.reforgeStatus === 'winner';
              const isReverted = mode === 'pga' && bot.pgaStatus === 'reverted';

              return (
                <div
                  key={bot.name}
                  className={`rounded-xl border p-3.5 transition-all ${
                    isWinner
                      ? 'border-emerald-500/60 bg-emerald-500/10 shadow-xs'
                      : isReverted
                        ? 'border-rose-500/40 bg-rose-500/5 opacity-80'
                        : 'border-border/80 bg-secondary/35 shadow-xs hover:bg-secondary/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`size-2 rounded-full ${
                          isWinner
                            ? 'animate-pulse bg-emerald-500'
                            : isReverted
                              ? 'bg-rose-500'
                              : 'bg-muted-foreground'
                        }`}
                      />
                      <span className="text-xs font-semibold text-foreground">{bot.name}</span>
                      <span className="rounded border border-border/60 bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {bot.strategy}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="font-mono text-xs">
                      {step === 0 && <span className="text-muted-foreground">Standby</span>}
                      {step === 1 && <span className="text-blue-400">Target Acquired</span>}
                      {step === 2 && (
                        <span
                          className={
                            mode === 'pga' ? 'font-bold text-amber-400' : 'text-purple-400'
                          }
                        >
                          {mode === 'pga'
                            ? `Bid: ${bot.gasPriceGwei} Gwei`
                            : 'Sealed Quote In Window'}
                        </span>
                      )}
                      {step === 3 && (
                        <span>
                          {mode === 'pga' ? (
                            bot.name === 'Searcher B' ? (
                              <span className="font-bold text-amber-400">Priority Frontrun</span>
                            ) : (
                              <span className="text-muted-foreground">Outbid</span>
                            )
                          ) : (
                            <span className="font-bold text-emerald-400">
                              NEV Rank #{bot.reforgeRank} (${bot.nevUsd})
                            </span>
                          )}
                        </span>
                      )}
                      {step === 4 && (
                        <span>
                          {isWinner ? (
                            <span className="flex items-center gap-1 font-bold text-emerald-400">
                              <CheckCircle2 className="size-3.5" />
                              <span>WINNER (Settled)</span>
                            </span>
                          ) : isReverted ? (
                            <span className="flex items-center gap-1 font-bold text-rose-400">
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
                  <div className="mt-3 grid grid-cols-4 gap-2 border-t border-border/40 pt-2 font-mono text-[11px]">
                    <div>
                      <div className="text-[10px] text-muted-foreground/80">GAS FEE</div>
                      <div
                        className={
                          bot.gasPriceGwei > 100 ? 'font-bold text-amber-400' : 'text-foreground'
                        }
                      >
                        ${bot.gasCostUsd} <span className="text-[9px]">({bot.gasPriceGwei}g)</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground/80">DEX SLIP</div>
                      <div className="text-foreground">${bot.slippageCostUsd}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground/80">GROSS BONUS</div>
                      <div className="text-foreground">${bot.grossProfitUsd}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground/80">NET VALUE (NEV)</div>
                      <div
                        className={
                          bot.nevUsd === 440
                            ? 'font-bold text-emerald-400'
                            : 'font-semibold text-foreground'
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
          <div className="flex flex-col justify-between space-y-4 rounded-xl border border-border bg-secondary/40 p-5 shadow-xs lg:col-span-5">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                  Mechanism Outcome
                </span>
                <Badge variant="secondary" className="font-mono text-[10px]">
                  {mode === 'pga' ? 'PGA Auction' : 'Batch Auction'}
                </Badge>
              </div>

              <div className="text-sm font-semibold text-foreground">
                {mode === 'pga'
                  ? 'Winner: Searcher B (Highest Gas Bribe)'
                  : 'Winner: Searcher C (Optimal Routing & NEV)'}
              </div>
              <p className="mt-1 text-xs leading-snug text-muted-foreground">
                {mode === 'pga'
                  ? 'Searcher B paid an enormous 165 Gwei bribe to block validators. 2 competitor transactions failed on-chain, burning gas and wasting block space.'
                  : 'Searcher C routed with lowest DEX slippage and nominal gas fee, generating $440 Net Economic Value. Exactly one transaction executed with zero gas waste.'}
              </p>
            </div>

            {/* Live Metrics Comparison Grid */}
            <div className="space-y-2.5 rounded-lg border border-border/70 bg-secondary/50 p-3 font-mono text-xs shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Validator MEV Extracted:</span>
                <span
                  className={
                    mode === 'pga' ? 'font-bold text-amber-400' : 'font-semibold text-emerald-400'
                  }
                >
                  {mode === 'pga' ? '$230.00 (Gas Bribe)' : '$0.00 (Pure Gas Only)'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Liquidator Net Margin:</span>
                <span className="font-semibold text-foreground">
                  {mode === 'pga' ? '$230.00 (Searcher B)' : '$440.00 (Searcher C)'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Borrower Residual Preserved:</span>
                <span
                  className={mode === 'reforge' ? 'font-bold text-emerald-400' : 'text-rose-400'}
                >
                  {mode === 'pga' ? '$0.00 (Fixed 10% Haircut)' : '+$180.00 Preserved'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Wasted / Reverted Gas:</span>
                <span className={mode === 'pga' ? 'font-bold text-rose-400' : 'text-emerald-400'}>
                  {mode === 'pga' ? '$103.00 (Searcher A & C)' : '$0.00 (0 Reverts)'}
                </span>
              </div>
            </div>

            {/* Bottom Recommendation Alert */}
            <div
              className={`rounded-lg border bg-secondary/40 p-3 text-xs leading-relaxed ${
                mode === 'reforge'
                  ? 'border-emerald-500/30 text-emerald-300'
                  : 'border-amber-500/30 text-amber-300'
              }`}
            >
              {mode === 'reforge' ? (
                <div className="flex items-start gap-2">
                  <Shield className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                  <span>
                    <strong>Reforge Invariant:</strong> The highest Net Economic Value wins.
                    Frontrunning with gas bribes cannot alter selection priority.
                  </span>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-400" />
                  <span>
                    <strong>PGA Failure:</strong> Proposers pocket the liquidator margin while
                    borrowers suffer maximal collateral liquidation.
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
