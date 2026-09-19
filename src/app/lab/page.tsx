'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
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
  ArrowLeft,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SimulationMode = 'reforge' | 'pga';
type StepIndex = 0 | 1 | 2 | 3 | 4;
type InspectorTab = 'mechanics' | 'telemetry' | 'contracts';

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

const STEP_DETAILS: Record<
  SimulationMode,
  {
    title: string;
    stage: string;
    contractCall: string;
    description: string;
    onChainEvent: string;
    flawOrBenefit: string;
  }[]
> = {
  reforge: [
    {
      title: 'Solvency Monitoring',
      stage: 'Step 0: Monitoring',
      contractCall: 'LendingPool.getHealthFactor(account)',
      description:
        'Chainlink & Pyth oracles update collateral price. When Position Health Factor falls below 1.000, the position enters the atomic liquidation state.',
      onChainEvent: 'PriceUpdate(collateral, $2,420) → HF = 0.968',
      flawOrBenefit: 'Continuous deterministic solvency tracking prevents premature liquidations.',
    },
    {
      title: 'Batch Window Opening',
      stage: 'Step 1: Liquidation Window Triggered',
      contractCall: 'LiquidationAuction.openAuctionWindow(borrower, debt)',
      description:
        'Reforge smart contract opens a discrete 2-block sealed bidding window. All registered liquidators and searchers receive real-time liquidation signals.',
      onChainEvent: 'AuctionOpened(auctionId: 0x8f2a, debt: $20,000 USDC)',
      flawOrBenefit:
        'Discrete window eliminates priority gas wars and gives equal access to all routing solvers.',
    },
    {
      title: 'Sealed Quote Submission',
      stage: 'Step 2: Sealed Bids in Window',
      contractCall: 'LiquidationAuction.submitQuote(auctionId, commitment, routeProof)',
      description:
        'Searchers submit sealed bids containing simulated execution routes, AMM pools, expected slippage, and debt repayment commitments.',
      onChainEvent: 'QuotesCommitted(3 searchers submitted sealed routes)',
      flawOrBenefit:
        'Sealed quotes prevent mempool copycats and sandwich attacks during liquidation discovery.',
    },
    {
      title: 'Net Economic Value (NEV) Scoring',
      stage: 'Step 3: NEV Algorithmic Ranking',
      contractCall: 'HealthFactorLib.scoreNEV(grossBonus, gasEstimate, slippageEstimate)',
      description:
        'The protocol ranks quotes using NEV = Gross Bonus - Gas Cost - DEX Slippage. The liquidator offering the highest net value is deterministically selected as Winner.',
      onChainEvent: 'NEVRanked(Searcher C #1: $440 > Searcher A #2: $380 > Searcher B #3: $230)',
      flawOrBenefit:
        'Winner selection is mathematically optimal; high gas bribes provide 0 ranking advantage.',
    },
    {
      title: 'Atomic Settlement & Surplus Refund',
      stage: 'Step 4: Atomic Execution & Preservation',
      contractCall: 'LiquidationAuction.settleAuction(auctionId, searcherC)',
      description:
        'Winning liquidator repays $20,000 debt atomically. Because slippage was minimized ($22), $180 of excess borrower collateral is preserved and returned.',
      onChainEvent: 'AuctionSettled(Searcher C, NetGain: $440, BorrowerRefund: +$180.00)',
      flawOrBenefit:
        'Zero reverted transactions, zero MEV leakage to block proposers, and borrower equity is maximally protected.',
    },
  ],
  pga: [
    {
      title: 'Public Mempool Discovery',
      stage: 'Step 0: Monitoring',
      contractCall: 'LendingPool.liquidationCall(...) (Simulated)',
      description:
        'Collateral price drops, and bot mempool sniffers immediately detect vulnerable position.',
      onChainEvent: 'PendingTxPool(Liquidation detected for 10 ETH position)',
      flawOrBenefit: 'Uncoordinated discovery triggers instant public mempool race.',
    },
    {
      title: 'Gas War Bribe Escalation',
      stage: 'Step 1: Public Mempool Race',
      contractCall: 'eth_sendRawTransaction(gasPrice: 45 Gwei -> 165 Gwei)',
      description:
        'Multiple bots broadcast competing liquidation transactions to public mempool, bidding up gas prices to jump ahead in the pending block.',
      onChainEvent: 'MempoolPGA(Searcher B bids 165 Gwei, Searcher A bids 45 Gwei)',
      flawOrBenefit:
        'Liquidators burn profit margins bidding against each other in public auctions.',
    },
    {
      title: 'Validator Bribe Sniping',
      stage: 'Step 2: Priority Gas Escalation',
      contractCall: 'Flashbots.sendBundle(bribe: 165 Gwei to Proposer)',
      description:
        'Searcher B pays a 165 Gwei bribe ($230) directly to the block builder/validator to secure the top-of-block transaction position.',
      onChainEvent: 'BundleIncluded(Searcher B placed at Index 0)',
      flawOrBenefit:
        'Value is extracted away from borrowers and protocols into the pockets of validators.',
    },
    {
      title: 'Greedy Proposer Selection',
      stage: 'Step 3: Block Builder Priority',
      contractCall: 'BlockBuilder.orderTransactionsByPriorityFee()',
      description:
        'The validator simply selects the highest fee transaction without evaluating routing quality, DEX slippage, or borrower collateral impact.',
      onChainEvent: 'BlockConstructed(Highest gas bribe tx executes first)',
      flawOrBenefit:
        'Sub-optimal liquidator wins solely because of bribe size, despite having worse execution.',
    },
    {
      title: 'Wasted Gas & Collateral Haircut',
      stage: 'Step 4: Reverts & Maximal Loss',
      contractCall: 'Searcher A & C revert (TRANSFER_FAILED)',
      description:
        'Searcher B captures the liquidation with fixed 10% penalty ($0 returned to borrower). Searcher A and C transactions fail on-chain, burning $103 in reverted gas.',
      onChainEvent: 'Settlement(Searcher B: $230 profit, 2 Reverts: -$103 gas waste)',
      flawOrBenefit:
        'Massive network congestion, wasted block space, and maximal collateral loss for the borrower.',
    },
  ],
};

export default function LabPage() {
  const [mode, setMode] = useState<SimulationMode>('reforge');
  const [ethPrice, setEthPrice] = useState<number>(2420);
  const [step, setStep] = useState<StepIndex>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<InspectorTab>('mechanics');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

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
      }, 1600 / playbackSpeed);
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

  const currentStepDetail = STEP_DETAILS[mode][step];

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
      {/* Top Minimalist Lab Header (h-14) */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border/70 bg-card/80 px-4 backdrop-blur-md sm:px-6">
        {/* Left: Back */}
        <div className="flex items-center gap-3">
          <Link
            href="/#simulator"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-secondary/60 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Overview</span>
          </Link>
        </div>

        {/* Right: Segmented Mode Selector */}
        <div className="flex items-center gap-3">
          {/* Segmented Mode Toggle */}
          <div className="inline-flex items-center rounded-xl border border-border/60 bg-background/80 p-1 shadow-2xs">
            <button
              onClick={() => {
                setMode('reforge');
                setStep(0);
                setIsPlaying(false);
              }}
              className={cn(
                'flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all',
                mode === 'reforge'
                  ? 'bg-card text-foreground shadow-xs ring-1 ring-border/80'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Shield className="size-3.5 text-emerald-400" />
              <span>Reforge Batch</span>
              <span className="py-0.2 hidden rounded-full bg-emerald-500/15 px-1.5 font-mono text-[9px] font-semibold text-emerald-400 sm:inline">
                Order-Fair
              </span>
            </button>

            <button
              onClick={() => {
                setMode('pga');
                setStep(0);
                setIsPlaying(false);
              }}
              className={cn(
                'flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all',
                mode === 'pga'
                  ? 'bg-card text-foreground shadow-xs ring-1 ring-border/80'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Zap className="size-3.5 text-amber-400" />
              <span>Conventional PGA</span>
              <span className="py-0.2 hidden rounded-full bg-amber-500/15 px-1.5 font-mono text-[9px] font-semibold text-amber-400 sm:inline">
                Mempool Race
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Full-Height Workspace Stage */}
      <main className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto p-4 sm:p-5 lg:grid-cols-12 lg:overflow-hidden">
        {/* Left Side: Simulation Arena & Telemetry (7 cols) */}
        <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-xs sm:p-5 lg:col-span-7 lg:min-h-0 lg:overflow-hidden">
          {/* Top Control Strip: Price Slider + Presets */}
          <div className="grid grid-cols-1 gap-4 border-b border-border/60 pb-3.5 sm:grid-cols-12 sm:items-center">
            {/* Price Slider (8 cols) */}
            <div className="space-y-2 sm:col-span-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                  Collateral Price (ETH/USD)
                </span>
                <span className="font-mono text-base font-bold text-foreground tabular-nums">
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
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-primary"
              />
              <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                <span>$2,100 (Underwater)</span>
                <span className="font-medium text-foreground/80">$2,500 (Threshold HF = 1.00)</span>
                <span>$3,200 (Solvent)</span>
              </div>
            </div>

            {/* Health Factor KPI (4 cols) */}
            <div className="flex flex-col justify-center rounded-xl bg-secondary/40 p-3 sm:col-span-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground uppercase">
                  Health Factor
                </span>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold',
                    isLiquidatable
                      ? 'border border-rose-500/30 bg-rose-500/15 text-rose-400'
                      : 'border border-emerald-500/30 bg-emerald-500/15 text-emerald-400',
                  )}
                >
                  <span
                    className={cn(
                      'size-1.5 rounded-full',
                      isLiquidatable ? 'animate-ping bg-rose-400' : 'bg-emerald-400',
                    )}
                  />
                  {isLiquidatable ? 'LIQUIDATABLE' : 'SOLVENT'}
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span
                  className={cn(
                    'font-mono text-2xl font-bold tabular-nums',
                    isLiquidatable ? 'text-rose-400' : 'text-emerald-400',
                  )}
                >
                  {healthFactor.toFixed(3)}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">/ 1.000 Target</span>
              </div>
            </div>
          </div>

          {/* Quick Presets & Playback Action Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-border/60 pb-3">
            {/* Presets */}
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[11px] text-muted-foreground">Presets:</span>
              <button
                onClick={() => handlePreset(3000)}
                className={cn(
                  'cursor-pointer rounded-md border px-2 py-0.5 font-mono text-[11px] transition-all',
                  ethPrice === 3000
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-border/60 bg-secondary/60 text-secondary-foreground hover:bg-secondary',
                )}
              >
                Safe ($3k)
              </button>
              <button
                onClick={() => handlePreset(2550)}
                className={cn(
                  'cursor-pointer rounded-md border px-2 py-0.5 font-mono text-[11px] transition-all',
                  ethPrice === 2550
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-border/60 bg-secondary/60 text-secondary-foreground hover:bg-secondary',
                )}
              >
                Vulnerable ($2.55k)
              </button>
              <button
                onClick={() => handlePreset(2350)}
                className={cn(
                  'cursor-pointer rounded-md border px-2 py-0.5 font-mono text-[11px] transition-all',
                  ethPrice === 2350
                    ? 'border-amber-500/50 bg-amber-500/15 text-amber-300'
                    : 'border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20',
                )}
              >
                Flash Crash ($2.35k)
              </button>
            </div>

            {/* Playback Controls & Speed Toggle */}
            <div className="flex items-center gap-1.5">
              <Button
                size="sm"
                variant={isPlaying ? 'secondary' : 'default'}
                onClick={() => {
                  if (step >= 4) setStep(0);
                  setIsPlaying(!isPlaying);
                }}
                disabled={!isLiquidatable}
                className="h-7.5 cursor-pointer gap-1.5 text-xs font-medium shadow-xs"
              >
                {isPlaying ? (
                  <>
                    <Pause className="size-3 fill-current" />
                    <span>Pause</span>
                  </>
                ) : step >= 4 ? (
                  <>
                    <RotateCcw className="size-3" />
                    <span>Replay</span>
                  </>
                ) : (
                  <>
                    <Play className="size-3 fill-current" />
                    <span>Simulate</span>
                  </>
                )}
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={handleStepForward}
                disabled={step >= 4 || isPlaying || !isLiquidatable}
                className="h-7.5 cursor-pointer gap-1 bg-background text-xs hover:bg-secondary"
              >
                <StepForward className="size-3" />
                <span>Step</span>
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={handleReset}
                disabled={step === 0 && !isPlaying}
                className="h-7.5 cursor-pointer gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="size-3" />
                <span>Reset</span>
              </Button>

              <button
                onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 2 : 1)}
                className="cursor-pointer rounded border border-border/60 bg-secondary/50 px-1.5 py-1 font-mono text-[10px] text-muted-foreground hover:text-foreground"
                title="Toggle playback speed"
              >
                {playbackSpeed}x
              </button>
            </div>
          </div>

          {/* Interactive Step Milestone Progress Bar */}
          <div className="flex items-center justify-between gap-1 rounded-xl border border-border/60 bg-secondary/30 p-1.5">
            {[0, 1, 2, 3, 4].map((idx) => {
              const stepInfo = STEP_DETAILS[mode][idx as StepIndex];
              const isActive = step === idx;
              const isCompleted = step > idx;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setIsPlaying(false);
                    setStep(idx as StepIndex);
                  }}
                  className={cn(
                    'flex flex-1 cursor-pointer flex-col items-center rounded-lg px-1.5 py-1 text-center transition-all',
                    isActive
                      ? 'bg-card text-foreground shadow-xs ring-1 ring-border/80'
                      : isCompleted
                        ? 'text-foreground/80 hover:bg-secondary/60'
                        : 'text-muted-foreground/60 hover:bg-secondary/40',
                  )}
                >
                  <span className="font-mono text-[10px] font-semibold">Step {idx}</span>
                  <span className="hidden truncate text-[10px] sm:block">
                    {stepInfo.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Liquidators Telemetry Table (Scrollable flex area) */}
          <div className="flex min-h-0 flex-1 flex-col space-y-2">
            <div className="flex items-center justify-between pt-1">
              <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                Active Bidding Stream
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {mode === 'pga' ? 'PGA Mempool Priority Gas' : 'Sealed Batch Window Quotes'}
              </span>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-border/70 bg-background/50">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-secondary/40">
                  <TableRow className="border-border/60 hover:bg-transparent">
                    <TableHead className="px-4 py-3 font-mono text-[11px] text-muted-foreground sm:px-5">
                      Liquidator
                    </TableHead>
                    <TableHead className="px-4 py-3 text-right font-mono text-[11px] text-muted-foreground sm:px-5">
                      Gas Bid
                    </TableHead>
                    <TableHead className="px-4 py-3 text-right font-mono text-[11px] text-muted-foreground sm:px-5">
                      DEX Slip
                    </TableHead>
                    <TableHead className="px-4 py-3 text-right font-mono text-[11px] text-muted-foreground sm:px-5">
                      Gross
                    </TableHead>
                    <TableHead className="px-4 py-3 text-right font-mono text-[11px] text-muted-foreground sm:px-5">
                      NEV Score
                    </TableHead>
                    <TableHead className="px-4 py-3 text-right font-mono text-[11px] text-muted-foreground sm:px-5">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bots.map((bot) => {
                    const isWinner =
                      mode === 'pga' ? bot.pgaStatus === 'winner' : bot.reforgeStatus === 'winner';
                    const isReverted = mode === 'pga' && bot.pgaStatus === 'reverted';

                    return (
                      <TableRow
                        key={bot.name}
                        className={cn(
                          'border-border/40 transition-colors',
                          isWinner
                            ? 'bg-emerald-500/10 hover:bg-emerald-500/15'
                            : isReverted
                              ? 'bg-rose-500/5 opacity-80 hover:bg-rose-500/10'
                              : 'hover:bg-secondary/30',
                        )}
                      >
                        <TableCell className="px-4 py-3 sm:px-5">
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={cn(
                                  'size-1.5 rounded-full',
                                  isWinner
                                    ? 'animate-pulse bg-emerald-400'
                                    : isReverted
                                      ? 'bg-rose-400'
                                      : 'bg-muted-foreground/60',
                                )}
                              />
                              <span className="text-xs font-medium text-foreground">
                                {bot.name}
                              </span>
                            </div>
                            <span className="font-mono text-[10px] text-muted-foreground">
                              {bot.strategy}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-3 text-right font-mono text-xs tabular-nums sm:px-5">
                          <span
                            className={cn(
                              bot.gasPriceGwei > 100
                                ? 'font-bold text-amber-400'
                                : 'text-foreground',
                            )}
                          >
                            ${bot.gasCostUsd}
                          </span>
                          <span className="block text-[10px] text-muted-foreground">
                            {bot.gasPriceGwei} Gwei
                          </span>
                        </TableCell>

                        <TableCell className="px-4 py-3 text-right font-mono text-xs text-foreground tabular-nums sm:px-5">
                          ${bot.slippageCostUsd}
                        </TableCell>

                        <TableCell className="px-4 py-3 text-right font-mono text-xs text-foreground tabular-nums sm:px-5">
                          ${bot.grossProfitUsd}
                        </TableCell>

                        <TableCell className="px-4 py-3 text-right font-mono text-xs tabular-nums sm:px-5">
                          <span
                            className={cn(
                              bot.nevUsd === 440
                                ? 'font-bold text-emerald-400'
                                : 'font-medium text-foreground',
                            )}
                          >
                            ${bot.nevUsd}
                          </span>
                        </TableCell>

                        <TableCell className="px-4 py-3 text-right font-mono text-xs sm:px-5">
                          {step === 0 && <span className="text-muted-foreground">Standby</span>}
                          {step === 1 && <span className="text-blue-400">Target Acquired</span>}
                          {step === 2 && (
                            <span
                              className={cn(
                                mode === 'pga' ? 'font-semibold text-amber-400' : 'text-primary',
                              )}
                            >
                              {mode === 'pga' ? `${bot.gasPriceGwei}g Bid` : 'Sealed Quote'}
                            </span>
                          )}
                          {step === 3 && (
                            <span>
                              {mode === 'pga' ? (
                                bot.name === 'Searcher B' ? (
                                  <span className="font-bold text-amber-400">
                                    Priority Frontrun
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground">Outbid</span>
                                )
                              ) : (
                                <span className="font-bold text-emerald-400">
                                  Rank #{bot.reforgeRank}
                                </span>
                              )}
                            </span>
                          )}
                          {step === 4 && (
                            <span>
                              {isWinner ? (
                                <span className="inline-flex items-center gap-1 font-bold text-emerald-400">
                                  <CheckCircle2 className="size-3.5" />
                                  <span>WINNER</span>
                                </span>
                              ) : isReverted ? (
                                <span className="inline-flex items-center gap-1 font-medium text-rose-400">
                                  <XCircle className="size-3.5" />
                                  <span>REVERTED</span>
                                </span>
                              ) : (
                                <span className="text-muted-foreground">Unselected</span>
                              )}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Right Side: Deep-Dive Inspector & Educational Walkthrough (5 cols) */}
        <div className="flex flex-col rounded-2xl border border-border/70 bg-card p-4 shadow-xs sm:p-5 lg:col-span-5 lg:min-h-0 lg:overflow-hidden">
          {/* Inspector Segmented Tabs */}
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="inline-flex items-center rounded-xl border border-border/60 bg-background/80 p-1 shadow-2xs">
              <button
                onClick={() => setActiveTab('mechanics')}
                className={cn(
                  'cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium transition-all',
                  activeTab === 'mechanics'
                    ? 'bg-card text-foreground shadow-xs ring-1 ring-border/80'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                On-Chain Step
              </button>
              <button
                onClick={() => setActiveTab('telemetry')}
                className={cn(
                  'cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium transition-all',
                  activeTab === 'telemetry'
                    ? 'bg-card text-foreground shadow-xs ring-1 ring-border/80'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                MEV Telemetry
              </button>
              <button
                onClick={() => setActiveTab('contracts')}
                className={cn(
                  'cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium transition-all',
                  activeTab === 'contracts'
                    ? 'bg-card text-foreground shadow-xs ring-1 ring-border/80'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                Formulas &amp; Specs
              </button>
            </div>

            <Badge
              variant="outline"
              className={cn(
                'font-mono text-[10px]',
                mode === 'reforge'
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                  : 'border-amber-500/30 bg-amber-500/10 text-amber-400',
              )}
            >
              {mode === 'reforge' ? 'Reforge Invariant' : 'PGA Flaw'}
            </Badge>
          </div>

          {/* Tab Content 1: Step Mechanics Deep-Dive */}
          {activeTab === 'mechanics' && (
            <div className="flex min-h-0 flex-1 flex-col justify-between space-y-4 overflow-y-auto pt-3.5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary">
                    {currentStepDetail.stage}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    Phase {step + 1} of 5
                  </span>
                </div>

                <h3 className="text-base font-semibold text-foreground">
                  {currentStepDetail.title}
                </h3>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  {currentStepDetail.description}
                </p>

                {/* Contract Call Signature Block */}
                <div className="rounded-lg border border-border/70 bg-secondary/50 p-3 font-mono text-xs">
                  <div className="text-[10px] tracking-wider text-muted-foreground/80 uppercase">
                    Contract Function Invocation:
                  </div>
                  <div className="mt-1 text-[11px] font-semibold break-all text-foreground">
                    <code>{currentStepDetail.contractCall}</code>
                  </div>
                </div>

                {/* Emitted On-Chain Event */}
                <div className="rounded-lg border border-border/70 bg-secondary/30 p-3 font-mono text-xs">
                  <div className="text-[10px] tracking-wider text-muted-foreground/80 uppercase">
                    Emitted Event Telemetry:
                  </div>
                  <div className="mt-1 text-[11px] font-medium break-all text-emerald-400">
                    {currentStepDetail.onChainEvent}
                  </div>
                </div>
              </div>

              {/* Key Takeaway Callout */}
              <div
                className={cn(
                  'rounded-xl border p-3 text-xs leading-relaxed',
                  mode === 'reforge'
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    : 'border-amber-500/30 bg-amber-500/10 text-amber-300',
                )}
              >
                <div className="flex items-start gap-2">
                  {mode === 'reforge' ? (
                    <Shield className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-400" />
                  )}
                  <span>
                    <strong className="font-semibold text-foreground">
                      {mode === 'reforge' ? 'Protocol Guarantee: ' : 'Structural Vulnerability: '}
                    </strong>
                    {currentStepDetail.flawOrBenefit}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 2: Financial Telemetry */}
          {activeTab === 'telemetry' && (
            <div className="flex min-h-0 flex-1 flex-col justify-between space-y-4 overflow-y-auto pt-3.5">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">
                  {mode === 'pga'
                    ? 'PGA Outcome: Searcher B Wins via 165 Gwei Bribe'
                    : 'Reforge Outcome: Searcher C Wins via Optimal NEV'}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {mode === 'pga'
                    ? 'Priority gas bribes extract liquidator margins directly to proposers. Borrowers suffer full 10% penalty with zero equity preserved.'
                    : 'Reforge ranks purely on true Net Economic Value. Searcher C delivered $440 NEV, preserving +$180.00 collateral refund for the borrower.'}
                </p>

                {/* Divided Metric List */}
                <div className="divide-y divide-border/50 rounded-lg border border-border/60 bg-background/50 px-3.5 py-1 font-mono text-xs">
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-muted-foreground">Validator MEV Extracted:</span>
                    <span
                      className={cn(
                        'font-semibold tabular-nums',
                        mode === 'pga' ? 'text-amber-400' : 'text-emerald-400',
                      )}
                    >
                      {mode === 'pga' ? '$230.00 (Gas Bribe)' : '$0.00 (Pure Base Gas)'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-muted-foreground">Liquidator Net Margin:</span>
                    <span className="font-semibold text-foreground tabular-nums">
                      {mode === 'pga' ? '$230.00 (Searcher B)' : '$440.00 (Searcher C)'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-muted-foreground">Borrower Equity Preserved:</span>
                    <span
                      className={cn(
                        'font-semibold tabular-nums',
                        mode === 'reforge' ? 'text-emerald-400' : 'text-rose-400',
                      )}
                    >
                      {mode === 'pga' ? '$0.00 (Fixed 10% Haircut)' : '+$180.00 Preserved'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-muted-foreground">Wasted Reverted Gas:</span>
                    <span
                      className={cn(
                        'font-semibold tabular-nums',
                        mode === 'pga' ? 'text-rose-400' : 'text-emerald-400',
                      )}
                    >
                      {mode === 'pga' ? '$103.00 (2 Failed Tx)' : '$0.00 (Zero Reverts)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Invariant Footer */}
              <div className="rounded-xl border border-border/70 bg-secondary/40 p-3 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Efficiency Rating: </span>
                {mode === 'reforge'
                  ? '100% Capital Efficient (0 Reverts, Optimal Routing, Fair Distribution)'
                  : '34% Capital Leakage (46% MEV Bribe to Proposer, 20% Gas Waste)'}
              </div>
            </div>
          )}

          {/* Tab Content 3: Contract Formulas & Specs */}
          {activeTab === 'contracts' && (
            <div className="flex min-h-0 flex-1 flex-col justify-between space-y-4 overflow-y-auto pt-3.5">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">
                  Mathematical Scoring Invariant
                </h3>
                <div className="space-y-1 rounded-lg border border-border/70 bg-secondary/50 p-3 font-mono text-xs text-foreground">
                  <div className="text-[10px] text-muted-foreground uppercase">NEV Formula:</div>
                  <div className="text-sm font-bold text-primary">
                    NEV = B_gross &minus; C_gas &minus; C_slippage
                  </div>
                  <p className="pt-1 text-[11px] text-muted-foreground">
                    Where B_gross is liquidation bonus, C_gas is on-chain execution cost, and
                    C_slippage is the routing price impact.
                  </p>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="font-semibold text-foreground">Core Architecture Contracts:</div>
                  <ul className="list-disc space-y-1 pl-4">
                    <li>
                      <strong className="text-foreground">LiquidationAuction.sol</strong>:
                      Implements 2-block discrete batch auction windows.
                    </li>
                    <li>
                      <strong className="text-foreground">HealthFactorLib.sol</strong>: Computes
                      real-time dynamic loan solvency &amp; NEV ranking.
                    </li>
                    <li>
                      <strong className="text-foreground">AtomicSettlement.sol</strong>: Executes
                      flashloan repayment and collateral distributions in one atomic transaction.
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/docs/specs/contracts"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary px-3.5 py-2 text-xs font-medium text-foreground shadow-2xs transition-all hover:bg-secondary/80"
              >
                <BookOpen className="size-3.5 text-primary" />
                <span>Read Full Smart Contract Derivations</span>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
