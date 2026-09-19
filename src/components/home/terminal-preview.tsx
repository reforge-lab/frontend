'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Terminal, Copy, Check, TerminalSquare } from 'lucide-react';

interface TerminalTab {
  id: string;
  name: string;
  command: string;
  output: string[];
}

const TERMINAL_TABS: TerminalTab[] = [
  {
    id: 'forge',
    name: 'Foundry Tests',
    command: 'forge test --match-contract LiquidationAuctionTest -vv',
    output: [
      '[⠒] Compiling 24 files with Solc 0.8.24...',
      '[⠊] Running 4 tests for test/LiquidationAuctionTest.t.sol:LiquidationAuctionTest',
      '[PASS] test_BatchAuctionWindowEnforced() (gas: 148201)',
      '[PASS] test_ScoringNetEconomicValue() (gas: 219430)',
      '[PASS] test_AtomicSettlementNoReverts() (gas: 184512)',
      '[PASS] test_ZeroFrontrunningAdvantage() (gas: 201889)',
      'Suite result: ok. 4 passed; 0 failed; 0 skipped; finished in 18.42ms',
    ],
  },
  {
    id: 'sim',
    name: 'Python Simulation',
    command: 'python -m simulation.run --scenario flash_crash_2026 --runs 500',
    output: [
      'Reforge Research Simulator v0.1 • Empirical MEV Analytics',
      'Scenario: ETH Jump-Diffusion Market Shock (ETH $3,000 -> $2,200)',
      'Iterating 500 Monte Carlo liquidations...',
      '[==================================================] 100%',
      '--- EMPIRICAL FINDINGS ---',
      'Mean Gas Reduction vs PGA:  -84.21% (p < 0.001)',
      'Settlement Revert Rate:     0.00% vs 67.4% in PGA',
      'Borrower Residual Saved:    +$348.12 per position',
      'Bad Debt Incurred in Window: 0.00% across all 500 iterations',
    ],
  },
  {
    id: 'coordinator',
    name: 'Backend Service',
    command: 'npm run start:coordinator',
    output: [
      '> reforge-backend@0.1.0 start:coordinator',
      '[INFO] Fastify server listening at http://127.0.0.1:4000',
      '[INFO] WebSocket BlockListener connected to EVM node (ChainID: 11155111)',
      '[INFO] Redis BullMQ opportunity queue active (4 workers ready)',
      '[EVENT] Block #6194821 received (gasPrice: 18.4 Gwei)',
      '[READY] Reforge Opportunity Engine listening for HF < 1.0 accounts...',
    ],
  },
];

export function TerminalPreview() {
  const [activeId, setActiveId] = useState<string>('forge');
  const [copied, setCopied] = useState<boolean>(false);

  const currentTab = TERMINAL_TABS.find((t) => t.id === activeId) || TERMINAL_TABS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTab.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mx-auto w-full max-w-6xl border-t border-border/40 px-4 py-16">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <Badge
          variant="outline"
          className="mb-3 gap-2 rounded-full border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
        >
          <TerminalSquare className="size-3.5" />
          <span>Developer Quickstart</span>
        </Badge>
        <h2 className="font-serif text-2xl font-normal text-foreground sm:text-4xl">
          Built for Smart Contracts &amp; Research
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Explore the implementation across smart contracts, Monte Carlo simulation scripts, and
          high-performance backend services.
        </p>
      </div>

      {/* Terminal Window Wrapper */}
      <div className="overflow-hidden rounded-2xl border border-border/80 bg-zinc-950 text-zinc-200 shadow-2xl">
        {/* Terminal Titlebar & Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-zinc-900/90 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {/* Window Dots */}
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-rose-500/80" />
              <span className="size-2.5 rounded-full bg-amber-500/80" />
              <span className="size-2.5 rounded-full bg-emerald-500/80" />
            </div>

            {/* Tabs */}
            <div className="ml-2 flex items-center gap-1">
              {TERMINAL_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveId(tab.id)}
                  className={`cursor-pointer rounded-md px-3 py-1 text-xs font-medium transition-all ${
                    activeId === tab.id
                      ? 'border border-zinc-700/80 bg-zinc-800 font-semibold text-zinc-100 shadow-2xs'
                      : 'border border-transparent text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Copy Command Action */}
          <button
            onClick={handleCopy}
            className="flex cursor-pointer items-center gap-1.5 rounded-md border border-zinc-700/60 bg-zinc-800/70 px-2.5 py-1 text-xs font-medium text-zinc-400 shadow-2xs transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            title="Copy command"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Terminal Content Body */}
        <div className="overflow-x-auto bg-secondary/60 p-5 font-mono text-[13px] leading-relaxed selection:bg-emerald-500/20">
          {/* Command Prompt */}
          <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-3 font-mono text-zinc-100">
            <span className="font-bold text-emerald-400 select-none">$</span>
            <code className="font-mono font-medium text-zinc-100">{currentTab.command}</code>
          </div>

          {/* Command Output */}
          <div className="mt-3 space-y-1 font-mono text-xs text-zinc-400 sm:text-[12.5px]">
            {currentTab.output.map((line, idx) => {
              const isPass = line.includes('[PASS]') || line.includes('Suite result: ok');
              const isHeader = line.includes('--- EMPIRICAL FINDINGS ---');
              const isGreen = line.includes('-84.21%') || line.includes('+$348.12');

              return (
                <div
                  key={idx}
                  className={`font-mono ${
                    isPass
                      ? 'font-medium text-emerald-400'
                      : isHeader
                        ? 'pt-2 font-bold text-zinc-100'
                        : isGreen
                          ? 'font-semibold text-emerald-300'
                          : ''
                  }`}
                >
                  {line}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
