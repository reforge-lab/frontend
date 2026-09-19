"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Terminal, Copy, Check, TerminalSquare } from "lucide-react";

interface TerminalTab {
  id: string;
  name: string;
  command: string;
  output: string[];
}

const TERMINAL_TABS: TerminalTab[] = [
  {
    id: "forge",
    name: "Foundry Tests",
    command: "forge test --match-contract LiquidationAuctionTest -vv",
    output: [
      "[⠒] Compiling 24 files with Solc 0.8.24...",
      "[⠊] Running 4 tests for test/LiquidationAuctionTest.t.sol:LiquidationAuctionTest",
      "[PASS] test_BatchAuctionWindowEnforced() (gas: 148201)",
      "[PASS] test_ScoringNetEconomicValue() (gas: 219430)",
      "[PASS] test_AtomicSettlementNoReverts() (gas: 184512)",
      "[PASS] test_ZeroFrontrunningAdvantage() (gas: 201889)",
      "Suite result: ok. 4 passed; 0 failed; 0 skipped; finished in 18.42ms",
    ],
  },
  {
    id: "sim",
    name: "Python Simulation",
    command: "python -m simulation.run --scenario flash_crash_2026 --runs 500",
    output: [
      "Reforge Research Simulator v0.1 • Empirical MEV Analytics",
      "Scenario: ETH Jump-Diffusion Market Shock (ETH $3,000 -> $2,200)",
      "Iterating 500 Monte Carlo liquidations...",
      "[==================================================] 100%",
      "--- EMPIRICAL FINDINGS ---",
      "Mean Gas Reduction vs PGA:  -84.21% (p < 0.001)",
      "Settlement Revert Rate:     0.00% vs 67.4% in PGA",
      "Borrower Residual Saved:    +$348.12 per position",
      "Bad Debt Incurred in Window: 0.00% across all 500 iterations",
    ],
  },
  {
    id: "coordinator",
    name: "Backend Service",
    command: "npm run start:coordinator",
    output: [
      "> reforge-backend@0.1.0 start:coordinator",
      "[INFO] Fastify server listening at http://127.0.0.1:4000",
      "[INFO] WebSocket BlockListener connected to EVM node (ChainID: 11155111)",
      "[INFO] Redis BullMQ opportunity queue active (4 workers ready)",
      "[EVENT] Block #6194821 received (gasPrice: 18.4 Gwei)",
      "[READY] Reforge Opportunity Engine listening for HF < 1.0 accounts...",
    ],
  },
];

export function TerminalPreview() {
  const [activeId, setActiveId] = useState<string>("forge");
  const [copied, setCopied] = useState<boolean>(false);

  const currentTab = TERMINAL_TABS.find((t) => t.id === activeId) || TERMINAL_TABS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTab.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 border-t border-border/40">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <Badge
          variant="outline"
          className="gap-2 px-3 py-1 rounded-full border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-3"
        >
          <TerminalSquare className="size-3.5" />
          <span>Developer Quickstart</span>
        </Badge>
        <h2 className="text-2xl sm:text-4xl font-normal font-serif text-foreground">
          Built for Smart Contracts &amp; Research
        </h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Explore the implementation across smart contracts, Monte Carlo simulation scripts, and
          high-performance backend services.
        </p>
      </div>

      {/* Terminal Window Wrapper */}
      <div className="rounded-2xl border border-border bg-secondary/50 text-zinc-200 overflow-hidden shadow-xl font-mono">
        {/* Terminal Titlebar & Tabs */}
        <div className="px-4 py-3 border-b border-border bg-secondary/80 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            {/* Window Dots */}
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-rose-500/80" />
              <span className="size-2.5 rounded-full bg-amber-500/80" />
              <span className="size-2.5 rounded-full bg-emerald-500/80" />
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 ml-2">
              {TERMINAL_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveId(tab.id)}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                    activeId === tab.id
                      ? "bg-secondary text-foreground font-semibold shadow-2xs border border-border/70"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
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
            className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground px-2.5 py-1 rounded-md bg-secondary/60 hover:bg-secondary border border-border/60 transition-colors cursor-pointer shadow-2xs"
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
        <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto">
          {/* Command Prompt */}
          <div className="flex items-center gap-2 text-zinc-100 pb-3 border-b border-zinc-800/80">
            <span className="text-emerald-400 font-bold">$</span>
            <span className="text-zinc-100">{currentTab.command}</span>
          </div>

          {/* Command Output */}
          <div className="mt-3 space-y-1 text-zinc-400">
            {currentTab.output.map((line, idx) => {
              const isPass = line.includes("[PASS]") || line.includes("Suite result: ok");
              const isHeader = line.includes("--- EMPIRICAL FINDINGS ---");
              const isGreen = line.includes("-84.21%") || line.includes("+$348.12");

              return (
                <div
                  key={idx}
                  className={`${
                    isPass
                      ? "text-emerald-400 font-medium"
                      : isHeader
                      ? "text-zinc-100 font-bold pt-2"
                      : isGreen
                      ? "text-emerald-300 font-semibold"
                      : ""
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
