'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { TerminalSquare, Copy, Check } from 'lucide-react';

interface TerminalTab {
  id: string;
  name: string;
  category: string;
  command: string;
  output: string[];
}

const TERMINAL_TABS: TerminalTab[] = [
  {
    id: 'forge',
    name: 'Foundry Tests',
    category: 'Contracts',
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
    category: 'Research',
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
    category: 'Coordination',
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

  const renderLine = (line: string, idx: number) => {
    if (line.includes('[PASS]')) {
      const parts = line.split('[PASS]');
      return (
        <div key={idx} className="font-mono text-xs text-zinc-300 sm:text-[13px]">
          <span className="font-semibold text-emerald-400">[PASS]</span>
          {parts[1]}
        </div>
      );
    }
    if (line.includes('Suite result: ok')) {
      return (
        <div
          key={idx}
          className="pt-1.5 font-mono text-xs font-semibold text-emerald-400 sm:text-[13px]"
        >
          {line}
        </div>
      );
    }
    if (line.includes('[INFO]')) {
      const parts = line.split('[INFO]');
      return (
        <div key={idx} className="font-mono text-xs text-zinc-300 sm:text-[13px]">
          <span className="font-semibold text-sky-400">[INFO]</span>
          {parts[1]}
        </div>
      );
    }
    if (line.includes('[EVENT]')) {
      const parts = line.split('[EVENT]');
      return (
        <div key={idx} className="font-mono text-xs text-zinc-300 sm:text-[13px]">
          <span className="font-semibold text-amber-400">[EVENT]</span>
          {parts[1]}
        </div>
      );
    }
    if (line.includes('[READY]')) {
      const parts = line.split('[READY]');
      return (
        <div key={idx} className="font-mono text-xs text-zinc-300 sm:text-[13px]">
          <span className="font-semibold text-emerald-400">[READY]</span>
          {parts[1]}
        </div>
      );
    }
    if (line.includes('--- EMPIRICAL FINDINGS ---')) {
      return (
        <div
          key={idx}
          className="pt-2.5 pb-1 font-mono text-xs font-bold tracking-wider text-zinc-100 sm:text-[13px]"
        >
          {line}
        </div>
      );
    }
    if (line.includes('-84.21%') || line.includes('+$348.12') || line.includes('0.00%')) {
      return (
        <div key={idx} className="font-mono text-xs text-zinc-300 sm:text-[13px]">
          {line
            .split(
              /(-\d+\.\d+%\s*\(p < 0\.001\)|0\.00% vs 67\.4% in PGA|\+\$348\.12 per position|0\.00% across all 500 iterations)/,
            )
            .map((part, pIdx) => {
              if (part.includes('-84.21%') || part.includes('+$348.12') || part.includes('0.00%')) {
                return (
                  <span key={pIdx} className="font-semibold text-emerald-400">
                    {part}
                  </span>
                );
              }
              return <span key={pIdx}>{part}</span>;
            })}
        </div>
      );
    }
    if (line.includes('[==================================================]')) {
      return (
        <div key={idx} className="font-mono text-xs font-medium text-emerald-400 sm:text-[13px]">
          {line}
        </div>
      );
    }
    if (line.startsWith('[⠒]') || line.startsWith('[⠊]')) {
      return (
        <div key={idx} className="font-mono text-xs text-zinc-400 sm:text-[13px]">
          <span className="text-zinc-500">{line.slice(0, 3)}</span>
          {line.slice(3)}
        </div>
      );
    }
    return (
      <div key={idx} className="font-mono text-xs text-zinc-400 sm:text-[13px]">
        {line}
      </div>
    );
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

      {/* Terminal Window Wrapper - Always High-Contrast Dark Console */}
      <div className="overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-950 text-zinc-200 shadow-2xl">
        {/* Terminal Titlebar & Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/90 bg-zinc-900/95 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {/* Window Dots */}
            <div className="flex items-center gap-1.5 select-none" aria-hidden="true">
              <span className="size-3 rounded-full bg-rose-500/80 transition-opacity hover:opacity-100" />
              <span className="size-3 rounded-full bg-amber-500/80 transition-opacity hover:opacity-100" />
              <span className="size-3 rounded-full bg-emerald-500/80 transition-opacity hover:opacity-100" />
            </div>

            {/* Tabs */}
            <div className="ml-2 flex items-center gap-1.5">
              {TERMINAL_TABS.map((tab) => {
                const isActive = activeId === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveId(tab.id)}
                    className={`cursor-pointer rounded-lg px-3 py-1 font-mono text-xs transition-all ${
                      isActive
                        ? 'border border-zinc-700/80 bg-zinc-800 font-semibold text-zinc-100 shadow-xs'
                        : 'border border-transparent text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                    }`}
                  >
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Copy Command Action */}
          <button
            onClick={handleCopy}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-zinc-700/70 bg-zinc-800/80 px-2.5 py-1 font-mono text-xs font-medium text-zinc-300 shadow-xs transition-all hover:bg-zinc-700 hover:text-white"
            title="Copy command to clipboard"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5 text-zinc-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Terminal Content Body */}
        <div className="overflow-x-auto bg-zinc-950 p-5 font-mono text-[13px] leading-relaxed selection:bg-emerald-500/25 sm:p-6">
          {/* Command Prompt */}
          <div className="flex items-center gap-2.5 border-b border-zinc-800/80 pb-3.5 font-mono">
            <span className="font-bold text-emerald-400 select-none">$</span>
            <code className="font-mono font-medium text-zinc-100">{currentTab.command}</code>
          </div>

          {/* Command Output */}
          <div className="mt-3.5 space-y-1 font-mono">
            {currentTab.output.map((line, idx) => renderLine(line, idx))}
          </div>
        </div>

        {/* Terminal Status Bar Footer */}
        <div className="flex items-center justify-between border-t border-zinc-900 bg-zinc-900/60 px-4 py-2 font-mono text-[11px] text-zinc-400 select-none">
          <div className="flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-emerald-400" />
            <span>Ready • ChainID: 11155111 (Sepolia)</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{currentTab.category}</span>
            <span>UTF-8</span>
          </div>
        </div>
      </div>
    </section>
  );
}
