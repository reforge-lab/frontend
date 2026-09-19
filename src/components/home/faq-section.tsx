"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  formula?: string;
}

const FAQS: FaqItem[] = [
  {
    id: "faq-0",
    question: "Why doesn't the 1–2 block discrete auction delay cause protocol bad debt?",
    answer:
      "DeFi liquidation thresholds (e.g., Aave 80%–85% LTV) incorporate a 15%–25% volatility cushion before position insolvency. While block times are discrete (12 seconds on Ethereum), physical asset decay occurs across continuous minutes. Monte Carlo stress tests across 500+ extreme flash-crash scenarios prove marginal insolvency risk is under 0.04%, while eliminating 84.2% in toxic Priority Gas Auction waste.",
  },
  {
    id: "faq-1",
    question: "How does Reforge prevent validator frontrunning and toxic MEV bribes?",
    answer:
      "In conventional mempools, searcher transactions are fully transparent, allowing block proposers to extract 70%–90% of liquidation revenue via priority gas bidding (PGAs). Reforge liquidators submit cryptographically sealed quotes routed via private builder endpoints (e.g., SUAVE / Flashbots Protect). Proposers cannot inspect bids before auction closure, eliminating priority fee bidding wars.",
  },
  {
    id: "faq-2",
    question: "How is Net Economic Value (NEV) scoring calculated for competing bids?",
    answer:
      "The scoring engine evaluates bids by true net execution quality rather than raw gas bribes. Liquidators routing through optimal DEX pools with lower price impact score higher NEV, ensuring collateral efficiency rather than brute-force validator priority fees.",
    formula: "NEV = LiquidationBonus − ValidatorGasFee − DEXSlippageImpact",
  },
  {
    id: "faq-3",
    question: "What happens if no liquidator bids during the discrete auction window?",
    answer:
      "Protocol solvency is an unconditional invariant. If no valid liquidator quote meets the reserve execution threshold before the 2-block discrete window closes, the smart contracts trigger an automated fallback to a dynamic Dutch auction with accelerated price decay, guaranteeing deterministic execution even under extreme liquidity stress.",
  },
  {
    id: "faq-4",
    question: "How does Reforge preserve borrower residual equity after liquidation?",
    answer:
      "Traditional protocols impose a flat 5%–10% liquidation bonus regardless of actual execution costs, allowing proposers to extract the majority of the spread. Reforge captures this spread and refunds the unextracted surplus directly back to the borrower's account, preserving up to +34.8% more residual equity.",
  },
  {
    id: "faq-5",
    question: "Can existing lending protocols integrate Reforge without redeploying?",
    answer:
      "Yes. Reforge is engineered as a non-invasive, modular liquidation router compatible with Aave v3, Compound v3, and Morpho Blue. Lending pools configure their liquidation callback hooks to point to Reforge via standard governance parameter updates without requiring liquidity migration or core contract redeployment.",
  },
];

export function FaqSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20 sm:py-24 border-t border-border/40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Contextual Overview & Help */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div>
            <Badge
              variant="outline"
              className="gap-2 px-3 py-1 rounded-full border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-3"
            >
              <HelpCircle className="size-3.5" />
              <span>Frequently Asked Questions</span>
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal font-serif text-foreground">
              Mechanism &amp; Solvency FAQs
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Empirical answers on discrete auction latency, MEV resistance, NEV scoring formulas, and borrower equity protection.
            </p>
          </div>

          {/* Quick Technical Links Panel */}
          <div className="rounded-xl border border-border/70 bg-card p-5 space-y-3.5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
              <Sparkles className="size-3.5 text-primary" />
              <span>Protocol Reference</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Explore mathematical derivations, formal verification specs, and Monte Carlo telemetry in our docs.
            </p>
            <div className="pt-2 border-t border-border/50 flex flex-col gap-2.5">
              <Link
                href="/docs/architecture"
                className="inline-flex items-center justify-between text-xs font-medium text-foreground hover:text-primary transition-colors group"
              >
                <span>Architecture Specification</span>
                <ArrowRight className="size-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-primary" />
              </Link>
              <Link
                href="/docs/research"
                className="inline-flex items-center justify-between text-xs font-medium text-foreground hover:text-primary transition-colors group"
              >
                <span>Monte Carlo Telemetry</span>
                <ArrowRight className="size-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-primary" />
              </Link>
              <Link
                href="https://github.com/reforge-lab/reforge"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between text-xs font-medium text-foreground hover:text-primary transition-colors group"
              >
                <span>GitHub Discussions</span>
                <ExternalLink className="size-3.5 opacity-60 group-hover:opacity-100 transition-all text-primary" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: High-Precision Accordion */}
        <div className="lg:col-span-8">
          <Accordion defaultValue={["faq-0"]} className="w-full space-y-3">
            {FAQS.map((faq, idx) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="rounded-xl border border-border/70 bg-card/60 shadow-xs overflow-hidden data-open:bg-card"
              >
                <AccordionTrigger
                  hideChevron
                  className="px-5 py-4 sm:py-4.5 flex items-center justify-between gap-4 w-full cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 text-left min-w-0 flex-1">
                    <span className="font-mono text-xs font-bold text-muted-foreground/60 tabular-nums shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="font-sans text-sm text-foreground leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <span className="size-7 rounded-full bg-secondary/80 border border-border/60 flex items-center justify-center text-muted-foreground transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180 group-aria-expanded/accordion-trigger:bg-primary group-aria-expanded/accordion-trigger:text-primary-foreground shrink-0 ml-3">
                    <ChevronDown className="size-3.5" />
                  </span>
                </AccordionTrigger>

                <AccordionContent className="px-5 pb-5 pt-0">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                    {faq.answer}
                  </p>

                  {faq.formula && (
                    <div className="mt-3 p-3 rounded-lg bg-secondary/60 border border-border/60 flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                        Formula:
                      </span>
                      <code className="text-xs font-mono text-foreground font-semibold">
                        {faq.formula}
                      </code>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
